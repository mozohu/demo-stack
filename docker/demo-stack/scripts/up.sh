#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  echo "Usage: $0 <instance|pair>"
  echo "  instance: storer | retriever | temple | ... (must have instances/<name>/.env)"
  echo "  pair: start storer + retriever"
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

start_one() {
  local name="$1"
  local envfile="instances/${name}/.env"
  if [[ ! -f "$envfile" ]]; then
    echo "Missing env file: $envfile" >&2
    exit 2
  fi
  echo "==> Starting: $name"
  docker compose -f compose.yml --env-file "$envfile" up -d
}

case "$1" in
  pair)
    start_one storer
    start_one retriever
    ;;
  *)
    start_one "$1"
    ;;
esac
