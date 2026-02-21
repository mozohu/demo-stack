#!/usr/bin/env bash
set -euo pipefail

# Rebuild mw/rest/smc images with updated deb packages from debs/ directory.
# Usage:
#   ./scripts/upgrade_debs.sh [--variant storer|retriever]
#
# Default (storer):
#   demo-stack/mw:clean, demo-stack/rest:clean, mozohu/demo-stack-smc:clean
#
# Retriever:
#   demo-stack/mw-retriever:clean, demo-stack/rest-retriever:clean, mozohu/demo-stack-smc-retriever:clean

cd "$(dirname "$0")/.."

variant="storer"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --variant) variant="${2:-}"; shift 2;;
    -h|--help)
      echo "Usage: $0 [--variant storer|retriever]" >&2
      exit 0;;
    *) echo "Unknown arg: $1" >&2; exit 2;;
  esac
done

if [[ ! -d debs ]] || ! ls debs/*.deb >/dev/null 2>&1; then
  echo "No deb files found in debs/ directory." >&2
  exit 1
fi

echo "==> Deb files:"
ls -1 debs/*.deb

if [[ "$variant" == "retriever" ]]; then
  suffix="-retriever"
  smc_prefix="mozohu/demo-stack-smc-retriever"
else
  suffix=""
  smc_prefix="mozohu/demo-stack-smc"
fi

images=(
  "demo-stack/mw${suffix}:clean"
  "demo-stack/rest${suffix}:clean"
  "${smc_prefix}:clean"
)

for img in "${images[@]}"; do
  echo ""
  echo "==> Rebuilding: $img"
  docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE="$img" -t "$img" .
done

echo ""
echo "==> Done. Updated images:"
for img in "${images[@]}"; do
  echo "  $img"
done
echo ""
echo "Restart your instance to apply:"
echo "  ./scripts/down.sh <instance>"
echo "  ./scripts/up.sh <instance>"
