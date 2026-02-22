#!/usr/bin/env bash
set -euo pipefail

# check_restart.sh
# - reads mediasync.py output from stdin
# - if changes detected => runs mediamgr.pl (deploy) then restart smc+mw via docker.sock
# - uses Docker Engine API via /var/run/docker.sock (Python stdlib, no curl needed)

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
  rm -f "$buf"
  exit 0
fi

echo "check_restart: change detected, running mediamgr then restarting smc+mw for project=$project" >&2
rm -f "$buf"

# Deploy/apply
/opt/ltms-client/bin/mediamgr.pl || true

# Restart smc -> mw via Docker Engine API (pure Python, no curl)
python3 - <<'PY'
import json, os, socket, http.client

class UnixHTTPConnection(http.client.HTTPConnection):
    def __init__(self, sock_path):
        super().__init__('localhost')
        self.sock_path = sock_path
    def connect(self):
        self.sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        self.sock.connect(self.sock_path)

project = os.environ.get('DEMO_NAME') or os.environ.get('COMPOSE_PROJECT_NAME') or ''
order = ['smc', 'mw']

conn = UnixHTTPConnection('/var/run/docker.sock')
filters = json.dumps({'label': [f'com.docker.compose.project={project}']})
conn.request('GET', f'/containers/json?all=1&filters={filters}')
resp = conn.getresponse()
arr = json.loads(resp.read().decode() or '[]')

svc_to_ids = {}
for c in arr:
    labels = c.get('Labels') or {}
    svc = labels.get('com.docker.compose.service')
    if not svc:
        continue
    svc_to_ids.setdefault(svc, []).append(c['Id'])

for svc in order:
    for cid in svc_to_ids.get(svc, []):
        print(f'restarting {svc} ({cid[:12]})')
        conn = UnixHTTPConnection('/var/run/docker.sock')
        conn.request('POST', f'/containers/{cid}/restart')
        r = conn.getresponse()
        print(f'  -> {r.status}')
PY
