#!/usr/bin/env bash
set -euo pipefail

# Build demo-stack derived images (mw/rest/cron) with:
# - Logger::Syslog
# - AWS CLI v2
# Then sanitize (flatten) to ensure /root/.aws is NOT present in any layer.
#
# Outputs tags:
#   demo-stack/mw:clean
#   demo-stack/rest:clean
#   demo-stack/cron:clean
#   demo-stack/mw-retriever:clean
#   demo-stack/rest-retriever:clean
#   demo-stack/cron-retriever:clean
#
# Usage:
#   ./scripts/build_secure_images.sh                 # build storer images
#   ./scripts/build_secure_images.sh --variant retriever
#   ./scripts/build_secure_images.sh --mw-base ... --rest-base ... --cron-base ...

cd "$(dirname "$0")/.."

usage() {
  cat >&2 <<'EOF'
Usage:
  build_secure_images.sh [--variant storer|retriever] [--mw-base IMG] [--rest-base IMG] [--cron-base IMG] [--awscli-version VER]

Defaults:
  --mw-base   mwd-storer-mwd-storer-mw:latest
  --rest-base mwd-storer-mwd-storer-rest:latest
  --cron-base mwd-storer-mwd-storer-cron:latest
  --awscli-version 2.17.57

What it does:
  1) docker build demo-stack/<kind>:tmp-secure (from images/<kind>/Dockerfile)
  2) sanitize+flatten -> demo-stack/<kind>:clean (removes /root/.aws entirely)
  3) verifies `aws --version` and that `/root/.aws` does not exist
EOF
}

variant="storer"

mw_base="mwd-storer-mwd-storer-mw:latest"
rest_base="mwd-storer-mwd-storer-rest:latest"
cron_base="mwd-storer-mwd-storer-cron:latest"
awscli_version="2.17.57"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --variant) variant="${2:-}"; shift 2;;
    --mw-base) mw_base="${2:-}"; shift 2;;
    --rest-base) rest_base="${2:-}"; shift 2;;
    --cron-base) cron_base="${2:-}"; shift 2;;
    --awscli-version) awscli_version="${2:-}"; shift 2;;
    -h|--help) usage; exit 0;;
    *) echo "Unknown arg: $1" >&2; usage; exit 2;;
  esac
done

if [[ "$variant" == "retriever" ]]; then
  # Switch defaults to retriever base images unless explicitly overridden via args.
  if [[ "$mw_base" == "mwd-storer-mwd-storer-mw:latest" ]]; then mw_base="mwd-retriever-mwd-retriever-mw:latest"; fi
  if [[ "$rest_base" == "mwd-storer-mwd-storer-rest:latest" ]]; then rest_base="mwd-retriever-mwd-retriever-rest:latest"; fi
  if [[ "$cron_base" == "mwd-storer-mwd-storer-cron:latest" ]]; then cron_base="mwd-retriever-mwd-retriever-cron:latest"; fi
elif [[ "$variant" != "storer" ]]; then
  echo "Unknown --variant: $variant (use storer|retriever)" >&2
  exit 2
fi

for bin in docker jq tar; do
  command -v "$bin" >/dev/null 2>&1 || { echo "Missing required binary: $bin" >&2; exit 1; }
done

sanitize="./scripts/sanitize_image_remove_root_aws.sh"
if [[ ! -x "$sanitize" ]]; then
  echo "Missing sanitize script: $sanitize" >&2
  exit 3
fi

build_one() {
  local kind="$1" base="$2" tmp_tag="$3" final_tag="$4"

  echo "==> Build: $kind"
  docker build \
    -f "images/${kind}/Dockerfile" \
    --build-arg BASE_IMAGE="$base" \
    --build-arg AWSCLI_VERSION="$awscli_version" \
    -t "$tmp_tag" \
    "images/${kind}"

  echo "==> Sanitize/flatten: $tmp_tag -> $final_tag"
  "$sanitize" --src "$tmp_tag" --dst "$final_tag"

  echo "==> Verify awscli present in $final_tag"
  docker run --rm --entrypoint sh "$final_tag" -lc 'aws --version'
}

if [[ "$variant" == "retriever" ]]; then
  build_one mw   "$mw_base"   demo-stack/mw-retriever:tmp-secure   demo-stack/mw-retriever:clean
  build_one rest "$rest_base" demo-stack/rest-retriever:tmp-secure demo-stack/rest-retriever:clean
  build_one cron "$cron_base" demo-stack/cron-retriever:tmp-secure demo-stack/cron-retriever:clean

  echo "==> DONE"
  echo "Set in your instance envs:"
  echo "  MW_IMAGE=demo-stack/mw-retriever:clean"
  echo "  REST_IMAGE=demo-stack/rest-retriever:clean"
  echo "  CRON_IMAGE=demo-stack/cron-retriever:clean"
else
  build_one mw   "$mw_base"   demo-stack/mw:tmp-secure   demo-stack/mw:clean
  build_one rest "$rest_base" demo-stack/rest:tmp-secure demo-stack/rest:clean
  build_one cron "$cron_base" demo-stack/cron:tmp-secure demo-stack/cron:clean

  echo "==> DONE"
  echo "Set in your instance envs:"
  echo "  MW_IMAGE=demo-stack/mw:clean"
  echo "  REST_IMAGE=demo-stack/rest:clean"
  echo "  CRON_IMAGE=demo-stack/cron:clean"
fi
