#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  echo "Usage: $0 <instance|pair>"
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

stop_one() {
  local name="$1"
  local envfile="instances/${name}/.env"
  if [[ ! -f "$envfile" ]]; then
    echo "Missing env file: $envfile" >&2
    exit 2
  fi
  echo "==> Stopping: $name"
  docker compose -f compose.yml --env-file "$envfile" down
}

case "$1" in
  pair)
    stop_one storer
    stop_one retriever
    ;;
  *)
    stop_one "$1"
    ;;
esac
