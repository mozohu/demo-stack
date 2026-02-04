#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  cat >&2 <<'EOF'
Usage:
  ./scripts/restore_volumes.sh <instance> --from <backup_dir>

Example:
  ./scripts/restore_volumes.sh storer --from backups/storer/20260204-195856

Restores instance named volumes from .tgz files created by backup_volumes.sh.

Volumes restored (if tar exists):
  db, log, mq_data, mq_log, ivm_var, ivm_opt, ltms_resource

Notes:
  - This overwrites volume contents.
  - Recommended: stop the instance first:
      ./scripts/down.sh <instance>
EOF
}

if [[ $# -lt 3 ]]; then
  usage
  exit 1
fi

instance="$1"; shift

from_dir=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --from)
      from_dir="$2"; shift 2 ;;
    -h|--help)
      usage; exit 0 ;;
    *)
      echo "Unknown arg: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$from_dir" ]]; then
  echo "Missing --from <backup_dir>" >&2
  exit 2
fi

if [[ ! -d "$from_dir" ]]; then
  echo "Backup dir not found: $from_dir" >&2
  exit 2
fi

envfile="instances/${instance}/.env"
if [[ ! -f "$envfile" ]]; then
  echo "Missing env file: $envfile" >&2
  exit 2
fi

demo_name=$(grep -E '^DEMO_NAME=' "$envfile" | head -n 1 | cut -d= -f2- || true)
if [[ -z "$demo_name" ]]; then
  demo_name="$instance"
fi

vols=(db log mq_data mq_log ivm_var ivm_opt ltms_resource)

for v in "${vols[@]}"; do
  vol_name="${demo_name}_${v}"
  tar_path="${from_dir}/${vol_name}.tgz"
  if [[ ! -f "$tar_path" ]]; then
    echo "[skip] tar not found: $tar_path"
    continue
  fi

  echo "[restore] $tar_path -> volume $vol_name"

  # Ensure volume exists
  docker volume inspect "$vol_name" >/dev/null 2>&1 || docker volume create "$vol_name" >/dev/null

  # Clear then extract
  docker run --rm \
    -v "${vol_name}:/data" \
    -v "$(cd "$from_dir" && pwd):/backup:ro" \
    alpine:3.20 \
    sh -lc "rm -rf /data/* /data/.[!.]* /data/..?* 2>/dev/null || true; cd /data && tar xzf /backup/$(basename "$tar_path")"

done

echo "Restore complete. You can start the instance now: ./scripts/up.sh ${instance}"
