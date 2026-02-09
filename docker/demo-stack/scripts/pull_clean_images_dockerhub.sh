#!/usr/bin/env bash
set -euo pipefail

# Pull demo-stack clean images from Docker Hub.
#
# Usage:
#   ./scripts/pull_clean_images_dockerhub.sh
#   DOCKERHUB_USER=mozohu ./scripts/pull_clean_images_dockerhub.sh
#   ./scripts/pull_clean_images_dockerhub.sh --only smc
#

cd "$(dirname "$0")/.."

DOCKERHUB_USER="${DOCKERHUB_USER:-mozohu}"
TAG="${TAG:-clean}"

usage() {
  cat >&2 <<EOF
Usage: $0 [--only <name>]

Options:
  --only all|mw|rest|cron|smc|mw-retriever|rest-retriever|cron-retriever|smc-retriever

Env:
  DOCKERHUB_USER=mozohu
  TAG=clean
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

pull_one() {
  local repo="$1"
  local img="${DOCKERHUB_USER}/${repo}:${TAG}"
  echo "--> docker pull $img"
  docker pull "$img"
}

case "$only" in
  all)
    pull_one demo-stack-mw
    pull_one demo-stack-rest
    pull_one demo-stack-cron
    pull_one demo-stack-smc
    pull_one demo-stack-mw-retriever
    pull_one demo-stack-rest-retriever
    pull_one demo-stack-cron-retriever
    pull_one demo-stack-smc-retriever
    ;;
  mw) pull_one demo-stack-mw;;
  rest) pull_one demo-stack-rest;;
  cron) pull_one demo-stack-cron;;
  smc) pull_one demo-stack-smc;;
  mw-retriever) pull_one demo-stack-mw-retriever;;
  rest-retriever) pull_one demo-stack-rest-retriever;;
  cron-retriever) pull_one demo-stack-cron-retriever;;
  smc-retriever) pull_one demo-stack-smc-retriever;;
  *) echo "Unknown --only: $only" >&2; usage; exit 2;;
esac
