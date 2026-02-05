#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  cat >&2 <<'EOF'
Listen to MQTT topics on an instance via the mesh network.

Usage:
  ./scripts/mqtt_listen.sh <instance> [--topic <t>] [--port <p>] [--net <meshnet>]
  ./scripts/mqtt_listen.sh --system <system> <instance> [--topic <t>] [--port <p>]

Examples:
  # Listen to everything from storer (most common)
  ./scripts/mqtt_listen.sh storer --topic '#'

  # Listen to a specific prefix
  ./scripts/mqtt_listen.sh retriever --topic 'ivm/#'

  # Use system meshnet settings
  ./scripts/mqtt_listen.sh --system mwd-pickup storer --topic '#'

Notes:
  - Uses a temporary container with mosquitto_sub.
  - Requires the instance gateway to be reachable on meshnet (mqtt://<instance>:1883).
EOF
}

net=""
system=""
topic="#"
port="1883"
instance=""

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

# Parse args
args=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --net)
      net="${2:-}"; shift 2;;
    --system)
      system="${2:-}"; shift 2;;
    --topic|-t)
      topic="${2:-}"; shift 2;;
    --port|-p)
      port="${2:-}"; shift 2;;
    -h|--help)
      usage; exit 0;;
    *)
      args+=("$1"); shift;;
  esac
done

if [[ -n "$system" ]]; then
  sysdir="systems/${system}"
  sysenv="${sysdir}/system.env"
  if [[ ! -f "$sysenv" ]]; then
    echo "Missing: $sysenv" >&2
    exit 2
  fi
  # shellcheck disable=SC1090
  source "$sysenv"
  net="${net:-${MESHNET_NAME:-}}"
fi

if [[ -z "$net" ]]; then
  net="${MESHNET_NAME:-demo-mesh}"
fi

if [[ ${#args[@]} -lt 1 ]]; then
  echo "Missing <instance>" >&2
  usage
  exit 2
fi
instance="${args[0]}"

if ! docker network inspect "$net" >/dev/null 2>&1; then
  echo "Docker network not found: $net" >&2
  echo "Create it with: docker network create $net" >&2
  exit 3
fi

echo "==> meshnet: $net"
echo "==> instance: $instance"
echo "==> mqtt: mqtt://${instance}:${port}"
echo "==> topic: $topic"
echo "==> (Ctrl+C to stop)"
echo

# Use mosquitto_sub from a lightweight image.
# eclipse-mosquitto:2 contains mosquitto_sub.
docker run --rm -i --network "$net" eclipse-mosquitto:2 \
  mosquitto_sub -h "$instance" -p "$port" -t "$topic" -v \
| while IFS= read -r line; do
    ts="$(date +'%Y-%m-%d %H:%M:%S%z')"
    printf '%s\t%s\t%s\n' "$ts" "$instance" "$line"
  done
