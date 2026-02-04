#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  cat >&2 <<'EOF'
Usage:
  ./scripts/backup_volumes.sh <instance> [--out <dir>]

Backs up named docker volumes for a demo-stack instance into .tgz files.
Default output:
  backups/<demo_name>/<YYYYmmdd-HHMMSS>/

Volumes backed up:
  db, log, mq_data, mq_log, ivm_var, ivm_opt, ltms_resource
EOF
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

instance="$1"; shift

envfile="instances/${instance}/.env"
if [[ ! -f "$envfile" ]]; then
  echo "Missing env file: $envfile" >&2
  exit 2
fi

demo_name=$(grep -E '^DEMO_NAME=' "$envfile" | head -n 1 | cut -d= -f2- || true)
if [[ -z "$demo_name" ]]; then
  demo_name="$instance"
fi

out_base="backups/${demo_name}"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --out)
      out_base="$2"; shift 2 ;;
    -h|--help)
      usage; exit 0 ;;
    *)
      echo "Unknown arg: $1" >&2
      usage
      exit 1
      ;;
  esac
done

ts=$(date +%Y%m%d-%H%M%S)
out_dir="${out_base}/${ts}"
mkdir -p "$out_dir"

# Optional: copy instance metadata if exists
if [[ -f "instances/apps.json" ]]; then
  cp -f "instances/apps.json" "$out_dir/instances.apps.json"
fi
cp -f "$envfile" "$out_dir/${instance}.env"

vols=(db log mq_data mq_log ivm_var ivm_opt ltms_resource)

for v in "${vols[@]}"; do
  vol_name="${demo_name}_${v}"
  if ! docker volume inspect "$vol_name" >/dev/null 2>&1; then
    echo "[skip] volume not found: $vol_name" | tee -a "$out_dir/backup.log"
    continue
  fi
  echo "[backup] $vol_name -> $out_dir/${vol_name}.tgz" | tee -a "$out_dir/backup.log"

  # Use a minimal container to tar the volume contents.
  docker run --rm \
    -v "${vol_name}:/data:ro" \
    -v "$(pwd)/${out_dir}:/backup" \
    alpine:3.20 \
    sh -lc "cd /data && tar czf /backup/${vol_name}.tgz ."

done

echo "Done: $out_dir"
