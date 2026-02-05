#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <system>" >&2
  echo "Example: $0 mwd-pickup" >&2
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

  echo "==> ${system}: ${instance}"
  docker compose -f compose.yml --env-file "$merged" ps
  echo

done <"$listfile"
