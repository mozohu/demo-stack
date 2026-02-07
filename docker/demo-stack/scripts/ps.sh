#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  echo "Usage: $0 <instance> [--profile local|prod]" >&2
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

profile="${IMAGES_PROFILE:-local}"
name="$1"; shift

while [[ $# -gt 0 ]]; do
  case "$1" in
    --profile) profile="${2:-}"; shift 2;;
    -h|--help) usage; exit 0;;
    *) echo "Unknown arg: $1" >&2; usage; exit 2;;
  esac
done

merged="$(./scripts/env_merge.sh "$name" --profile "$profile")"

docker compose -f compose.yml --env-file "$merged" ps
