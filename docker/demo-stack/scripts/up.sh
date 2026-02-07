#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  echo "Usage: $0 <instance|pair> [--profile local|prod]" >&2
  echo "  profile: local (default) uses instances/<name>/.images.local.env" >&2
  echo "           prod          uses instances/<name>/.images.prod.env" >&2
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

profile="${IMAGES_PROFILE:-local}"
arg1="$1"; shift

# parse optional flags
while [[ $# -gt 0 ]]; do
  case "$1" in
    --profile) profile="${2:-}"; shift 2;;
    -h|--help) usage; exit 0;;
    *) echo "Unknown arg: $1" >&2; usage; exit 2;;
  esac
done

start_one() {
  local name="$1"
  local merged
  merged="$(./scripts/env_merge.sh "$name" --profile "$profile")"
  echo "==> Starting: $name (profile=$profile)"
  docker compose -f compose.yml --env-file "$merged" up -d
}

case "$arg1" in
  pair)
    start_one storer
    start_one retriever
    ;;
  *)
    start_one "$arg1"
    ;;
esac
