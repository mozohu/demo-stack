#!/usr/bin/env bash
set -euo pipefail

project="${DEMO_NAME:-${COMPOSE_PROJECT_NAME:-}}"
if [[ -z "$project" ]]; then
  echo "check_restart: missing DEMO_NAME/COMPOSE_PROJECT_NAME" >&2
  project="retriever"
fi

buf=$(mktemp)
cat | tee "$buf"

if grep -q "更沒有異動" "$buf"; then
  echo "check_restart: no change"
  exit 0
fi

echo "check_restart: change detected, running mediamgr then restarting all services for project=$project" >&2

/opt/ltms-client/bin/mediamgr.pl || true

python3 - <<'PY'
import json, os, urllib.parse, subprocess
project=os.environ.get('DEMO_NAME') or os.environ.get('COMPOSE_PROJECT_NAME') or ''
order=['mq','smc','mw','rest','gui']
filters={'label':[f'com.docker.compose.project={project}']}
url='http://localhost/containers/json?'+urllib.parse.urlencode({'all':'1','filters': json.dumps(filters)})
out=subprocess.check_output(['curl','-sS','--unix-socket','/var/run/docker.sock',url])
arr=json.loads(out.decode() or '[]')
svc_to_ids={}
for c in arr:
  labels=c.get('Labels') or {}
  svc=labels.get('com.docker.compose.service')
  if not svc: continue
  svc_to_ids.setdefault(svc, []).append(c['Id'])
for svc in order:
  for cid in svc_to_ids.get(svc, []):
    subprocess.call(['curl','-sS','--unix-socket','/var/run/docker.sock','-X','POST',f'http://localhost/containers/{cid}/restart'])
PY
