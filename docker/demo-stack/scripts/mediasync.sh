#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <instance>" >&2
  echo "Example: $0 storer" >&2
  exit 1
fi

name="$1"
envfile="instances/${name}/.env"
if [[ ! -f "$envfile" ]]; then
  echo "Missing env file: $envfile" >&2
  exit 2
fi

# Run mediasync once inside cron container.
# Note: mediasync may print 'another mediasync running' if the periodic job is in progress.

docker compose -f compose.yml --env-file "$envfile" exec -T cron bash -lc 'python3 /opt/ltms-client/bin/mediasync.py'
