#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  echo "Usage: $0 <system>" >&2
  echo "Example: $0 mwd-pickup" >&2
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

system="$1"
sysdir="systems/${system}"
listfile="${sysdir}/instances.txt"
sysenv="${sysdir}/system.env"

if [[ ! -f "$listfile" ]]; then
  echo "Missing: $listfile" >&2
  exit 2
fi
if [[ ! -f "$sysenv" ]]; then
  echo "Missing: $sysenv" >&2
  exit 2
fi

mkdir -p .tmp/system-env

# After stopping, clear mesh-related keys in config.5 but preserve other settings.
reset_config5() {
  local instance="$1"
  local cfg="instances/${instance}/mw/config.5"
  [[ -f "$cfg" ]] || return 0
  
  # Only clear the 4 mesh-related keys, preserve everything else
  local keys=(MASTER_EBUS MASTER_IP RETRIEVER_EBUS RETRIEVER_IP)
  for key in "${keys[@]}"; do
    sed -i "/^${key}=/d" "$cfg"
  done
}

while IFS= read -r instance; do
  [[ -z "$instance" ]] && continue
  [[ "$instance" =~ ^# ]] && continue

  instenv="instances/${instance}/.env"
  if [[ ! -f "$instenv" ]]; then
    echo "Missing env file: $instenv" >&2
    exit 3
  fi

  merged=".tmp/system-env/${system}.${instance}.env"
  {
    cat "$instenv"
    echo
    cat "$sysenv"
  } >"$merged"

  echo "==> Stopping system ${system}: ${instance}"
  docker compose -f compose.yml --env-file "$merged" down

  reset_config5 "$instance"

done <"$listfile"
