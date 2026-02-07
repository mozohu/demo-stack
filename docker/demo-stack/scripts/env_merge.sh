#!/usr/bin/env bash
set -euo pipefail

# Merge env files for an instance into a single env-file for docker compose.
#
# Usage:
#   ./scripts/env_merge.sh <instance> [--profile local|prod]
#
# Output:
#   prints path to merged env file under .tmp/merged-env/

cd "$(dirname "$0")/.."

usage() {
  echo "Usage: $0 <instance> [--profile local|prod]" >&2
}

if [[ $# -lt 1 ]]; then
  usage
  exit 2
fi

instance="$1"; shift
profile="${IMAGES_PROFILE:-local}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --profile) profile="${2:-}"; shift 2;;
    -h|--help) usage; exit 0;;
    *) echo "Unknown arg: $1" >&2; usage; exit 2;;
  esac
done

instenv="instances/${instance}/.env"
imgenv="instances/${instance}/.images.${profile}.env"

if [[ ! -f "$instenv" ]]; then
  echo "Missing env file: $instenv" >&2
  exit 3
fi
if [[ ! -f "$imgenv" ]]; then
  echo "Missing images env file: $imgenv" >&2
  echo "Hint: create instances/${instance}/.images.local.env and .images.prod.env" >&2
  exit 4
fi

mkdir -p .tmp/merged-env
merged=".tmp/merged-env/${instance}.${profile}.env"

{
  cat "$instenv"
  echo
  cat "$imgenv"
} >"$merged"

echo "$merged"
