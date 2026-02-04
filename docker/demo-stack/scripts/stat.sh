#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <instance> [--watch|-c]" >&2
  echo "Example: $0 storer" >&2
  echo "Example: $0 storer --watch" >&2
  exit 1
fi

name="$1"
shift || true

envfile="instances/${name}/.env"
if [[ ! -f "$envfile" ]]; then
  echo "Missing env file: $envfile" >&2
  exit 2
fi

# stat.pl 支援 -c 連續刷新
watch_flag=""
if [[ ${1:-} == "--watch" || ${1:-} == "-c" ]]; then
  watch_flag="-c"
fi

# 直接在 mw 容器內執行（需有 /usr/local/bin/stat.pl）
docker compose -f compose.yml --env-file "$envfile" exec -T mw bash -lc "stat.pl ${watch_flag}" 
