#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <system> [--profile local|prod]" >&2
  echo "Example: $0 mwd-pickup" >&2
  echo "Example: $0 mwd-pickup --profile prod" >&2
  exit 1
fi

system="$1"
shift || true

profile="${IMAGES_PROFILE:-local}"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --profile) profile="${2:-}"; shift 2;;
    -h|--help) exit 0;;
    *) echo "Unknown arg: $1" >&2; exit 2;;
  esac
done

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

  imgenv="instances/${instance}/.images.${profile}.env"
  if [[ ! -f "$imgenv" ]]; then
    echo "Missing images env file: $imgenv" >&2
    exit 4
  fi

  merged=".tmp/system-env/${system}.${instance}.${profile}.env"
  {
    cat "$instenv"
    echo
    cat "$imgenv"
    echo
    cat "$sysenv"
  } >"$merged"

  echo "==> ${system}: ${instance} (profile=${profile})"
  docker compose -f compose.yml --env-file "$merged" ps
  echo

done <"$listfile"
