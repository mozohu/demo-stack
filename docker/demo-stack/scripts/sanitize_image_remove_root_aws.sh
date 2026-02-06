#!/usr/bin/env bash
set -euo pipefail

# Sanitize an image by REMOVING /root/.aws from the filesystem and FLATTENING layers.
# This avoids leaving credentials in earlier layers (a plain `RUN rm -rf` is NOT sufficient).
#
# Requirements: docker, jq, tar
#
# Usage:
#   ./scripts/sanitize_image_remove_root_aws.sh --src demo-stack/mw:with-syslog --dst demo-stack/mw:clean
#

usage() {
  cat >&2 <<'EOF'
Usage:
  sanitize_image_remove_root_aws.sh --src <image:tag> --dst <image:tag>

What it does:
  - docker create <src>
  - docker export the container filesystem
  - removes root/.aws from the exported filesystem
  - docker import back as <dst>, preserving ENTRYPOINT/CMD/ENV/WORKDIR/USER/EXPOSE

Notes:
  - This produces a new single-layer image (flattened).
  - It does NOT preserve image history/labels perfectly; we re-apply common config.
  - After sanitizing, you should rotate/revoke any leaked AWS creds anyway.
EOF
}

src=""
dst=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --src)
      src="${2:-}"; shift 2;;
    --dst)
      dst="${2:-}"; shift 2;;
    -h|--help)
      usage; exit 0;;
    *)
      echo "Unknown arg: $1" >&2
      usage
      exit 2;;
  esac
done

if [[ -z "$src" || -z "$dst" ]]; then
  usage
  exit 2
fi

for bin in docker jq tar; do
  command -v "$bin" >/dev/null 2>&1 || { echo "Missing required binary: $bin" >&2; exit 1; }
done

# Inspect config we want to keep
cfg_json=$(docker image inspect "$src" --format '{{json .Config}}')

entrypoint=$(jq -c '.Entrypoint // []' <<<"$cfg_json")
cmd=$(jq -c '.Cmd // []' <<<"$cfg_json")
workdir=$(jq -r '.WorkingDir // ""' <<<"$cfg_json")
user=$(jq -r '.User // ""' <<<"$cfg_json")

# Env as array KEY=VAL
mapfile -t envs < <(jq -r '.Env[]? // empty' <<<"$cfg_json")

# ExposedPorts keys like "80/tcp" (may be null)
mapfile -t exposes < <(jq -r '(.ExposedPorts // {}) | keys[]? // empty' <<<"$cfg_json")

changes=()

# Re-apply ENV
for e in "${envs[@]:-}"; do
  changes+=("--change" "ENV $e")
done

# Re-apply WORKDIR/USER
if [[ -n "$workdir" ]]; then changes+=("--change" "WORKDIR $workdir"); fi
if [[ -n "$user" ]]; then changes+=("--change" "USER $user"); fi

# Re-apply EXPOSE
for p in "${exposes[@]:-}"; do
  # docker import expects just port[/proto]
  if [[ -n "$p" ]]; then
    changes+=("--change" "EXPOSE $p")
  fi
done

# Re-apply ENTRYPOINT/CMD
# docker import wants JSON array string
if [[ "$entrypoint" != "[]" ]]; then changes+=("--change" "ENTRYPOINT $entrypoint"); fi
if [[ "$cmd" != "[]" ]]; then changes+=("--change" "CMD $cmd"); fi

tmpdir=$(mktemp -d)
cleanup() { rm -rf "$tmpdir"; }
trap cleanup EXIT

cid=$(docker create "$src" true)
trap 'docker rm -f "$cid" >/dev/null 2>&1 || true; cleanup' EXIT

rootfs_tar="$tmpdir/rootfs.tar"

echo "==> Exporting container filesystem from $src"
docker export "$cid" -o "$rootfs_tar"

echo "==> Removing /root/.aws from exported filesystem (and any contents)"
# Safer to extract, delete, re-pack.
mkdir -p "$tmpdir/rootfs"
( cd "$tmpdir/rootfs" && tar -xf "$rootfs_tar" )
rm -rf "$tmpdir/rootfs/root/.aws"

# Re-tar for import
san_tar="$tmpdir/sanitized.tar"
( cd "$tmpdir/rootfs" && tar -cf "$san_tar" . )

echo "==> Importing as $dst (flattened)"
cat "$san_tar" | docker import "${changes[@]}" - "$dst" >/dev/null

echo "==> Verify: $dst should NOT have /root/.aws"
docker run --rm --entrypoint sh "$dst" -lc 'test ! -e /root/.aws && echo OK_NO_AWS || (ls -la /root/.aws; exit 2)'

echo "OK"
