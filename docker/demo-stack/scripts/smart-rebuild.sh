#!/usr/bin/env bash
set -euo pipefail

# Smart rebuild: only rebuild images whose debs actually changed.
#
# Mapping:
#   smc  image ← ivm-smc
#   cron image ← libivm-perl, ivm-scripts
#   mw   image ← libivm-perl, ivm-scripts
#   rest image ← ivm-rest
#
# Usage:
#   ./scripts/smart-rebuild.sh                    # dry-run (show what would rebuild)
#   ./scripts/smart-rebuild.sh --apply            # actually rebuild
#   INSTANCE=zgovend ./scripts/smart-rebuild.sh --apply   # rebuild + restart instance

cd "$(dirname "$0")/.."
DEBS_DIR="./debs"
DOCKERFILE="./Dockerfile.upgrade"

APPLY=false
for arg in "$@"; do
  [[ "$arg" == "--apply" ]] && APPLY=true
done

# Image mapping: image_name -> deb packages it cares about
declare -A IMAGE_DEBS=(
  ["smc"]="ivm-smc"
  ["cron"]="libivm-perl ivm-scripts"
  ["mw"]="libivm-perl ivm-scripts"
  ["rest"]="ivm-rest"
)

# Resolve image tag from .images.local.env (or use defaults)
resolve_image_tag() {
  local role="$1"
  local instance="${INSTANCE:-}"
  local env_file=""

  if [[ -n "$instance" && -f "instances/${instance}/.images.local.env" ]]; then
    env_file="instances/${instance}/.images.local.env"
  fi

  local var_name=""
  case "$role" in
    smc)  var_name="SMC_IMAGE" ;;
    cron) var_name="CRON_IMAGE" ;;
    mw)   var_name="MW_IMAGE" ;;
    rest) var_name="REST_IMAGE" ;;
  esac

  if [[ -n "$env_file" && -n "$var_name" ]]; then
    local val
    val=$(grep "^${var_name}=" "$env_file" 2>/dev/null | head -1 | cut -d= -f2-)
    if [[ -n "$val" ]]; then
      echo "$val"
      return
    fi
  fi

  # Fallback defaults (match compose.yml)
  case "$role" in
    smc)  echo "mozohu/demo-stack-smc:clean" ;;
    cron) echo "demo-stack/cron:clean" ;;
    mw)   echo "demo-stack/mw:clean" ;;
    rest) echo "demo-stack/rest:clean" ;;
  esac
}

# Get installed deb version from a docker image
get_image_pkg_version() {
  local image="$1"
  local pkg="$2"
  docker run --rm --entrypoint dpkg-query "$image" -W -f='${Version}' "$pkg" 2>/dev/null || echo ""
}

# Get version from a local .deb file
get_deb_version() {
  local pkg="$1"
  local deb_file
  deb_file=$(ls "${DEBS_DIR}/${pkg}_"*.deb 2>/dev/null | head -1)
  if [[ -z "$deb_file" ]]; then
    echo ""
    return
  fi
  dpkg-deb -f "$deb_file" Version 2>/dev/null || echo ""
}

echo "=== Smart Rebuild ==="
echo ""

needs_rebuild=()

for role in smc cron mw rest; do
  image=$(resolve_image_tag "$role")
  pkgs="${IMAGE_DEBS[$role]}"
  changed=false
  changes=""

  for pkg in $pkgs; do
    deb_ver=$(get_deb_version "$pkg")
    if [[ -z "$deb_ver" ]]; then
      continue
    fi

    img_ver=$(get_image_pkg_version "$image" "$pkg")

    if [[ "$deb_ver" != "$img_ver" ]]; then
      changed=true
      changes+="  ${pkg}: ${img_ver:-<not installed>} → ${deb_ver}\n"
    else
      changes+="  ${pkg}: ${img_ver} (unchanged)\n"
    fi
  done

  if $changed; then
    echo "🔄 ${role} (${image}) — NEEDS REBUILD"
    echo -e "$changes"
    needs_rebuild+=("$role")
  else
    echo "✅ ${role} (${image}) — up to date"
    echo -e "$changes"
  fi
done

if [[ ${#needs_rebuild[@]} -eq 0 ]]; then
  echo "Nothing to rebuild."
  exit 0
fi

echo "---"

if ! $APPLY; then
  echo "Dry run. Use --apply to rebuild: ${needs_rebuild[*]}"
  exit 0
fi

echo "Rebuilding: ${needs_rebuild[*]}"
echo ""

for role in "${needs_rebuild[@]}"; do
  image=$(resolve_image_tag "$role")
  echo ">>> Building ${role} (${image})..."
  docker build -f "$DOCKERFILE" --build-arg BASE_IMAGE="$image" -t "$image" . 2>&1 | grep -E "^(#|===|Error)" | tail -5
  echo "    ✅ ${role} done"
  echo ""
done

echo "=== All rebuilds complete ==="

# Restart instance if specified
INSTANCE="${INSTANCE:-}"
if [[ -n "$INSTANCE" ]]; then
  echo ""
  echo "Restarting instance: ${INSTANCE}..."
  env_files="--env-file instances/${INSTANCE}/.env"
  [[ -f "instances/${INSTANCE}/.images.local.env" ]] && env_files+=" --env-file instances/${INSTANCE}/.images.local.env"

  # Only recreate services whose images were rebuilt
  services=()
  for role in "${needs_rebuild[@]}"; do
    services+=("$role")
  done

  docker compose $env_files up -d --force-recreate "${services[@]}" 2>&1
  echo ""
  echo "✅ Instance ${INSTANCE} restarted (services: ${services[*]})"
fi
