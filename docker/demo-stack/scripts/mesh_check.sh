#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  cat >&2 <<'EOF'
Check which containers are attached to the mesh network (meshnet).

Usage:
  ./scripts/mesh_check.sh --system <system>
  ./scripts/mesh_check.sh --net <meshnet> [--filter <regex>]

Examples:
  ./scripts/mesh_check.sh --system mwd-pickup
  ./scripts/mesh_check.sh --net demo-mesh --filter 'storer|retriever'

Output:
  - Lists containers connected to the mesh network.
  - For each container, prints IP + whether it can resolve peer names.
EOF
}

net=""
system=""
filter=""

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

while [[ $# -gt 0 ]]; do
  case "$1" in
    --net)
      net="${2:-}"; shift 2;;
    --system)
      system="${2:-}"; shift 2;;
    --filter)
      filter="${2:-}"; shift 2;;
    -h|--help)
      usage; exit 0;;
    *)
      echo "Unknown arg: $1" >&2
      usage
      exit 2;;
  esac
done

names=()
if [[ -n "$system" ]]; then
  sysdir="systems/${system}"
  sysenv="${sysdir}/system.env"
  listfile="${sysdir}/instances.txt"
  if [[ ! -f "$sysenv" ]]; then
    echo "Missing: $sysenv" >&2
    exit 2
  fi
  if [[ ! -f "$listfile" ]]; then
    echo "Missing: $listfile" >&2
    exit 2
  fi
  # shellcheck disable=SC1090
  source "$sysenv"
  net="${net:-${MESHNET_NAME:-}}"

  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    [[ "$line" =~ ^# ]] && continue
    names+=("$line")
  done <"$listfile"

  if [[ -z "$filter" && ${#names[@]} -gt 0 ]]; then
    # Default filter to system instances
    filter="$(IFS='|'; echo "${names[*]}")"
  fi
fi

if [[ -z "$net" ]]; then
  net="${MESHNET_NAME:-demo-mesh}"
fi

if ! docker network inspect "$net" >/dev/null 2>&1; then
  echo "Docker network not found: $net" >&2
  echo "Create it with: docker network create $net" >&2
  exit 3
fi

echo "==> meshnet: $net"
if [[ -n "$filter" ]]; then
  echo "==> filter: $filter"
fi

# Print containers attached to this network
# Uses docker's Go template to get Name + IPv4.
mapfile -t lines < <(docker network inspect "$net" --format '{{range $id, $c := .Containers}}{{printf "%s\t%s\n" $c.Name $c.IPv4Address}}{{end}}' | sort)

if [[ ${#lines[@]} -eq 0 ]]; then
  echo "(no containers attached)"
  exit 0
fi

printf '\n%-28s %-18s %-10s %-10s\n' "CONTAINER" "MESH_IP" "RESOLVE?" "NOTES"
printf '%-28s %-18s %-10s %-10s\n' "--------" "-------" "--------" "-----"

for line in "${lines[@]}"; do
  name="${line%%$'\t'*}"
  ipcidr="${line#*$'\t'}"
  ip="${ipcidr%%/*}"

  if [[ -n "$filter" ]]; then
    if ! [[ "$name" =~ $filter ]]; then
      continue
    fi
  fi

  # Quick peer-name resolution test from inside the container, if possible.
  # We only check that at least one of the system instance names resolves.
  resolve="n/a"
  notes=""

  if [[ ${#names[@]} -gt 0 ]]; then
    ok=0
    for peer in "${names[@]}"; do
      if docker exec -t "$name" sh -lc "getent hosts '$peer' >/dev/null 2>&1" >/dev/null 2>&1; then
        ok=1
        break
      fi
    done
    if [[ $ok -eq 1 ]]; then
      resolve="OK"
    else
      resolve="FAIL"
      notes="cannot-resolve-peers"
    fi
  fi

  printf '%-28s %-18s %-10s %-10s\n' "$name" "$ip" "$resolve" "$notes"
done

