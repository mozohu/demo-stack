#!/usr/bin/env bash
set -euo pipefail

sync_dir="/opt/ltms-client/resource/sync/play"

fingerprint() {
  python3 - <<'PY'
import hashlib, os
root=os.environ.get('SYNC_DIR')
h=hashlib.md5()
if os.path.isdir(root):
  for dirpath, dirnames, filenames in os.walk(root):
    dirnames.sort(); filenames.sort()
    for fn in filenames:
      p=os.path.join(dirpath, fn)
      try:
        st=os.stat(p)
      except FileNotFoundError:
        continue
      rel=os.path.relpath(p, root)
      h.update(rel.encode()); h.update(b'\0')
      h.update(str(st.st_size).encode()); h.update(b'\0')
      h.update(str(int(st.st_mtime)).encode()); h.update(b'\0')
print(h.hexdigest())
PY
}

export SYNC_DIR="$sync_dir"
before=$(fingerprint)
python3 /opt/ltms-client/bin/mediasync.py || true
after=$(fingerprint)

if [[ "$before" == "$after" ]]; then
  echo "LTMS: no changes"
  exit 0
fi

echo "LTMS: changes detected, running mediamgr"
/opt/ltms-client/bin/mediamgr.pl || true

echo "LTMS: restarting mw container"

project="${DEMO_NAME:-${COMPOSE_PROJECT_NAME:-}}"
if [[ -z "$project" ]]; then
  project="retriever"
fi

cid=$(python3 - <<'PY'
import json, os, urllib.parse, subprocess
project=os.environ.get('DEMO_NAME') or os.environ.get('COMPOSE_PROJECT_NAME') or ''
filters={'label':[f'com.docker.compose.project={project}','com.docker.compose.service=mw']}
url='http://localhost/containers/json?'+urllib.parse.urlencode({'filters': json.dumps(filters)})
out=subprocess.check_output(['curl','-sS','--unix-socket','/var/run/docker.sock',url])
arr=json.loads(out.decode() or '[]')
print(arr[0]['Id'] if arr else '')
PY
)

if [[ -z "$cid" ]]; then
  echo "LTMS: cannot find mw container for project=$project" >&2
  exit 0
fi

curl -sS --unix-socket /var/run/docker.sock -X POST "http://localhost/containers/${cid}/restart" >/dev/null

echo "LTMS: mw restarted"
