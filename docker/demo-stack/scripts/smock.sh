#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <instance> <event> [jsonArg]" >&2
  echo "Example: $0 storer 'sess/session_begin'" >&2
  echo "Example: $0 storer 'reader/read' '{\"type\":\"keypad\",\"data\":\"1234\"}'" >&2
  exit 1
fi

name="$1"; shift

envfile="instances/${name}/.env"
if [[ ! -f "$envfile" ]]; then
  echo "Missing env file: $envfile" >&2
  exit 2
fi

event="$1"; shift
jsonArg="${1:-}"

# 在 mw 容器內執行 smock.pl (symlink to smc_send.pl)
if [[ -n "$jsonArg" ]]; then
  docker compose -f compose.yml --env-file "$envfile" exec -T mw bash -lc "smock.pl '$event' '$jsonArg'"
else
  docker compose -f compose.yml --env-file "$envfile" exec -T mw bash -lc "smock.pl '$event'"
fi
