#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  cat >&2 <<'EOF'
Build a derived image that includes liblogger-syslog-perl.

Usage:
  ./scripts/build_derived_image.sh --kind <cron|mw|rest> --base <base-image> --tag <new-tag>

Examples:
  ./scripts/build_derived_image.sh --kind cron --base mwd-storer-mwd-storer-cron:latest --tag demo-stack/cron:with-syslog
  ./scripts/build_derived_image.sh --kind mw   --base mwd-storer-mwd-storer-mw:latest   --tag demo-stack/mw:with-syslog
  ./scripts/build_derived_image.sh --kind rest --base mwd-storer-mwd-storer-rest:latest --tag demo-stack/rest:with-syslog

Notes:
  - Dockerfiles live under images/<kind>/Dockerfile
  - After building, set *_IMAGE=<new-tag> in instances/<name>/.env (or in a system.env).
EOF
}

kind=""
base=""
tag=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --kind)
      kind="${2:-}"; shift 2;;
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

if [[ -z "$kind" || -z "$base" || -z "$tag" ]]; then
  usage
  exit 2
fi

df="images/${kind}/Dockerfile"
ctx="images/${kind}"
if [[ ! -f "$df" ]]; then
  echo "Missing Dockerfile: $df" >&2
  exit 3
fi

echo "==> building derived image"
echo "    kind: $kind"
echo "    base: $base"
echo "    tag:  $tag"

docker build \
  -f "$df" \
  --build-arg BASE_IMAGE="$base" \
  -t "$tag" \
  "$ctx"

echo "==> verify Logger::Syslog"
docker run --rm "$tag" bash -lc 'perl -MLogger::Syslog -e 1 && echo OK'

echo OK
