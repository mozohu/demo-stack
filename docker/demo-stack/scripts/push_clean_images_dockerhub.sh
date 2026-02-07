#!/usr/bin/env bash
set -euo pipefail

# Push demo-stack *clean* images to Docker Hub.
#
# Repos (default DOCKERHUB_USER=mozohu):
#   mozohu/demo-stack-mw:clean
#   mozohu/demo-stack-rest:clean
#   mozohu/demo-stack-cron:clean
#   mozohu/demo-stack-smc:clean
#   mozohu/demo-stack-mw-retriever:clean
#   mozohu/demo-stack-rest-retriever:clean
#   mozohu/demo-stack-cron-retriever:clean
#   mozohu/demo-stack-smc-retriever:clean
#
# Usage:
#   ./scripts/push_clean_images_dockerhub.sh
#   DOCKERHUB_USER=youruser ./scripts/push_clean_images_dockerhub.sh
#   ./scripts/push_clean_images_dockerhub.sh --only smc
#   ./scripts/push_clean_images_dockerhub.sh --only smc-retriever
#   ./scripts/push_clean_images_dockerhub.sh --only all

cd "$(dirname "$0")/.."

DOCKERHUB_USER="${DOCKERHUB_USER:-mozohu}"
TAG="${TAG:-clean}"

usage() {
  cat >&2 <<EOF
Usage: $0 [--only <name>]

Options:
  --only all|mw|rest|cron|smc|mw-retriever|rest-retriever|cron-retriever|smc-retriever

Env:
  DOCKERHUB_USER=mozohu   Docker Hub namespace
  TAG=clean               tag name to push

Pre-req:
  docker login
  Local images must exist, e.g. demo-stack/smc:clean
EOF
}

only="all"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --only) only="${2:-}"; shift 2;;
    -h|--help) usage; exit 0;;
    *) echo "Unknown arg: $1" >&2; usage; exit 2;;
  esac
done

need_bins=(docker)
for b in "${need_bins[@]}"; do
  command -v "$b" >/dev/null 2>&1 || { echo "Missing: $b" >&2; exit 1; }
done

push_one() {
  local src="$1" dst_repo="$2"

  if ! docker image inspect "$src" >/dev/null 2>&1; then
    echo "Local image not found: $src" >&2
    echo "Hint: build them first: ./scripts/build_secure_images.sh [--variant retriever]" >&2
    exit 3
  fi

  local dst="${DOCKERHUB_USER}/${dst_repo}:${TAG}"
  echo "--> $src  =>  $dst"
  docker tag "$src" "$dst"
  docker push "$dst"
}

case "$only" in
  all)
    push_one "demo-stack/mw:${TAG}"             "demo-stack-mw"
    push_one "demo-stack/rest:${TAG}"           "demo-stack-rest"
    push_one "demo-stack/cron:${TAG}"           "demo-stack-cron"
    push_one "demo-stack/smc:${TAG}"            "demo-stack-smc"
    push_one "demo-stack/mw-retriever:${TAG}"   "demo-stack-mw-retriever"
    push_one "demo-stack/rest-retriever:${TAG}" "demo-stack-rest-retriever"
    push_one "demo-stack/cron-retriever:${TAG}" "demo-stack-cron-retriever"
    push_one "demo-stack/smc-retriever:${TAG}"  "demo-stack-smc-retriever"
    ;;
  mw) push_one "demo-stack/mw:${TAG}" "demo-stack-mw";;
  rest) push_one "demo-stack/rest:${TAG}" "demo-stack-rest";;
  cron) push_one "demo-stack/cron:${TAG}" "demo-stack-cron";;
  smc) push_one "demo-stack/smc:${TAG}" "demo-stack-smc";;
  mw-retriever) push_one "demo-stack/mw-retriever:${TAG}" "demo-stack-mw-retriever";;
  rest-retriever) push_one "demo-stack/rest-retriever:${TAG}" "demo-stack-rest-retriever";;
  cron-retriever) push_one "demo-stack/cron-retriever:${TAG}" "demo-stack-cron-retriever";;
  smc-retriever) push_one "demo-stack/smc-retriever:${TAG}" "demo-stack-smc-retriever";;
  *) echo "Unknown --only: $only" >&2; usage; exit 2;;
esac

echo "==> Done. Example pulls on a fresh host:"
cat <<EOF
  docker pull ${DOCKERHUB_USER}/demo-stack-smc:${TAG}
  docker pull ${DOCKERHUB_USER}/demo-stack-smc-retriever:${TAG}
EOF
