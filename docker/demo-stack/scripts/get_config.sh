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

# Run get_config.pl inside mw container
# (exists as /usr/local/bin/get_config.pl -> /opt/app/scripts/test/get_config.pl)

docker compose -f compose.yml --env-file "$envfile" exec -T mw bash -lc 'get_config.pl' 2>&1 | grep -v 'mesg: ttyname failed'
