#!/usr/bin/env bash
set -euo pipefail

# check_restart.sh
# - reads mediamgr.pl output from stdin
# - if changes detected => restart ALL containers in the same docker compose project
# - uses Docker Engine API via /var/run/docker.sock

project="${DEMO_NAME:-${COMPOSE_PROJECT_NAME:-}}"
if [[ -z "$project" ]]; then
  echo "check_restart: missing DEMO_NAME/COMPOSE_PROJECT_NAME" >&2
  project="storer"
fi

# Read stdin, tee to stdout, keep a copy for decision
buf=$(mktemp)
cat | tee "$buf"

# IPC 原本的語意：出現『更沒有異動』代表無變更
if grep -q "更沒有異動" "$buf"; then
  echo "check_restart: no change"
  exit 0
fi

echo "check_restart: change detected, restarting all services for project=$project" >&2

# List containers for project and restart in a safe-ish order; restart cron last.
# services order: mq, smc, mw, rest, gui, cron
python3 - <<'PY'
import json, os, urllib.parse, subprocess
project=os.environ.get('DEMO_NAME') or os.environ.get('COMPOSE_PROJECT_NAME') or ''
order=['mq','smc','mw','rest','gui','cron']

filters={'label':[f'com.docker.compose.project={project}']}
url='http://localhost/containers/json?'+urllib.parse.urlencode({'all':'1','filters': json.dumps(filters)})
out=subprocess.check_output(['curl','-sS','--unix-socket','/var/run/docker.sock',url])
arr=json.loads(out.decode() or '[]')

# map service -> containerId
svc_to_ids={}
for c in arr:
  labels=c.get('Labels') or {}
  svc=labels.get('com.docker.compose.service')
  if not svc: continue
  svc_to_ids.setdefault(svc, []).append(c['Id'])

for svc in order:
  for cid in svc_to_ids.get(svc, []):
    # restart
    subprocess.call(['curl','-sS','--unix-socket','/var/run/docker.sock','-X','POST',f'http://localhost/containers/{cid}/restart'])
PY
