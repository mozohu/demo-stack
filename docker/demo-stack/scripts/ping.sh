#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  cat >&2 <<'EOF'
Usage:
  ./scripts/ping.sh <name...>
  ./scripts/ping.sh --net <meshnet> <name...>
  ./scripts/ping.sh --system <system>

Examples:
  ./scripts/ping.sh storer retriever
  ./scripts/ping.sh --net demo-mesh storer retriever
  ./scripts/ping.sh --system mwd-pickup

Defaults:
  - If you don't pass --net/--system, meshnet defaults to $MESHNET_NAME or "demo-mesh".

Notes:
  - This uses a temporary busybox container attached to the mesh network.
  - It tests name resolution + ICMP reachability on the Docker mesh network.
EOF
}

net=""
system=""

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

# Parse args
names=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --net)
      net="${2:-}"; shift 2;;
    --system)
      system="${2:-}"; shift 2;;
    -h|--help)
      usage; exit 0;;
    *)
      names+=("$1"); shift;;
  esac
done

# If user didn't specify --net/--system, treat remaining args as names and
# default meshnet to $MESHNET_NAME or demo-mesh.
if [[ -z "$system" && -z "$net" && ${#names[@]} -gt 0 ]]; then
  net="${MESHNET_NAME:-demo-mesh}"
fi

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
  net="${MESHNET_NAME:-}";

  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    [[ "$line" =~ ^# ]] && continue
    names+=("$line")
  done <"$listfile"
fi

if [[ -z "$net" ]]; then
  echo "Missing --net (or --system with MESHNET_NAME in system.env)" >&2
  exit 2
fi

if [[ ${#names[@]} -lt 2 ]]; then
  echo "Need at least two names to test (e.g. storer retriever)" >&2
  exit 2
fi

if ! docker network inspect "$net" >/dev/null 2>&1; then
  echo "Docker network not found: $net" >&2
  echo "Create it with: docker network create $net" >&2
  exit 3
fi

echo "==> Mesh network: $net"

echo "==> Names: ${names[*]}"

# Resolve + ping each name from a probe container
for src in "${names[@]}"; do
  for dst in "${names[@]}"; do
    [[ "$src" == "$dst" ]] && continue
    echo
    echo "--- ${src} -> ${dst} ---"

    # We can't easily force the source IP to be exactly '$src' without entering the gateway container
    # (which may not have ping installed). For now we validate:
    #  1) DNS resolution of $dst on the mesh network
    #  2) ICMP ping reachability to $dst on the mesh network

    docker run --rm --network "$net" busybox:1.36 sh -lc '
      set -e
      out=$(ping -c 2 -W 2 "'""$dst""'" 2>&1) || {
        echo "FAIL: cannot reach '""$dst""' on ${net}";
        echo "$out";
        exit 1;
      }
      ip=$(echo "$out" | sed -n "s/^PING .* (\([0-9.]\+\)).*$/\1/p" | head -n1)
      echo "OK: '""$dst""' resolves to ${ip:-?} and replies to ping"
      # Uncomment for verbose output:
      # echo "$out"
    '
  done
done

echo
echo "OK"
