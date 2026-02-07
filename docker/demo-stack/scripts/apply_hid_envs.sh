#!/usr/bin/env bash
set -euo pipefail

# Apply deterministic HID (derived from hostname + instance name) into instance env files.
#
# Default behavior:
#   - If HID is already set in instances/<name>/.env (non-empty), KEEP it.
#   - If HID is missing/empty, generate and write it.
#
# Use --force to overwrite existing HID values.
#
# Usage:
#   ./scripts/apply_hid_envs.sh                 # apply to all instances/*/.env
#   ./scripts/apply_hid_envs.sh storer temple   # apply to specific instances
#   ./scripts/apply_hid_envs.sh --force         # overwrite all
#   ./scripts/apply_hid_envs.sh --force storer  # overwrite only storer

cd "$(dirname "$0")/.."

gen="./scripts/gen_hid.sh"
if [[ ! -x "$gen" ]]; then
  echo "Missing generator: $gen" >&2
  exit 2
fi

force=0
args=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --force) force=1; shift;;
    -h|--help)
      cat <<'EOF'
Usage:
  apply_hid_envs.sh [--force] [instance...]

Behavior:
  - Without --force: only fills HID if missing/empty.
  - With --force: overwrites existing HID.
EOF
      exit 0
      ;;
    *) args+=("$1"); shift;;
  esac
done

pick_instances() {
  if [[ ${#args[@]} -gt 0 ]]; then
    printf '%s\n' "${args[@]}"
  else
    find instances -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort
  fi
}

mapfile -t instances < <(pick_instances)

for inst in "${instances[@]}"; do
  envf="instances/${inst}/.env"
  if [[ ! -f "$envf" ]]; then
    echo "[SKIP] $inst: no $envf" >&2
    continue
  fi

  existing=""
  if grep -q '^HID=' "$envf"; then
    existing="$(grep '^HID=' "$envf" | head -n1 | cut -d= -f2- || true)"
  fi

  if [[ $force -ne 1 && -n "$existing" ]]; then
    echo "[KEEP] $inst -> HID=$existing"
    continue
  fi

  hid="$($gen "$inst")"

  if grep -q '^HID=' "$envf"; then
    sed -i -E "s/^HID=.*/HID=${hid}/" "$envf"
  else
    printf '\nHID=%s\n' "$hid" >> "$envf"
  fi

  echo "[SET]  $inst -> HID=$hid"
done
