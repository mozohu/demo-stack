#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <instance>" >&2
  exit 1
fi

name="$1"
envfile="instances/${name}/.env"
if [[ ! -f "$envfile" ]]; then
  echo "Missing env file: $envfile" >&2
  exit 2
fi

docker compose -f compose.yml --env-file "$envfile" ps
