#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  cat >&2 <<'EOF'
Build a derived cron image that includes liblogger-syslog-perl.

Usage:
  ./scripts/build_cron_image.sh --base <base-image> --tag <new-tag>

Examples:
  ./scripts/build_cron_image.sh --base mwd-storer-mwd-storer-cron:latest --tag demo-stack/cron:latest
  ./scripts/build_cron_image.sh --base mwd-retriever-mwd-retriever-cron:latest --tag demo-stack/cron-retriever:latest

Notes:
  - Dockerfile: images/cron/Dockerfile
  - After building, set CRON_IMAGE=<new-tag> in instances/<name>/.env (or in a system.env).
EOF
}

base=""
tag=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --base)
      base="${2:-}"; shift 2;;
    --tag)
      tag="${2:-}"; shift 2;;
    -h|--help)
      usage; exit 0;;
    *)
      echo "Unknown arg: $1" >&2
      usage
      exit 2;;
  esac
done

if [[ -z "$base" || -z "$tag" ]]; then
  usage
  exit 2
fi

echo "==> building cron image"
echo "    base: $base"
echo "    tag:  $tag"

docker build \
  -f images/cron/Dockerfile \
  --build-arg BASE_IMAGE="$base" \
  -t "$tag" \
  images/cron

echo "==> verify Logger::Syslog"
docker run --rm "$tag" bash -lc 'perl -MLogger::Syslog -e 1 && echo OK'

echo "OK"
