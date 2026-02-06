# Deploy demo-stack on a new host (Docker Hub images)

This runbook deploys demo-stack from GitHub and pulls the prebuilt **clean** images from Docker Hub.

Target system example: **mwd-pickup**.

## What you get
- Multiple demo instances on one host (e.g. `storer`, `retriever`, `temple`, plus `*-ng` variants)
- MW/REST/CRON containers use **runtime AWS credentials** mounted to `/root/.aws` (read-only)
- MW/REST/CRON images include **AWS CLI v2**
- MW/REST/CRON images are **flattened** and do **NOT** contain `/root/.aws` in any layer

## Images used (Docker Hub)
These are the published clean images under user `mozohu`:

- `mozohu/demo-stack-mw:clean`
- `mozohu/demo-stack-rest:clean`
- `mozohu/demo-stack-cron:clean`
- `mozohu/demo-stack-mw-retriever:clean`
- `mozohu/demo-stack-rest-retriever:clean`
- `mozohu/demo-stack-cron-retriever:clean`

## 0) Prereqs on the new host
1. Docker Engine + Compose v2 installed
2. You can run without sudo (or prefix commands with sudo)

Verify:
```bash
docker --version
docker compose version
```

## 1) Clone repo
```bash
git clone <GITHUB_REPO_URL> demo-stack
cd demo-stack
```

## 2) Create mesh network (recommended)
Many demo setups rely on a shared mesh network named `demo-mesh`.

```bash
docker network create demo-mesh || true
```

## 3) Update instance envs to use Docker Hub images
Edit these files:
- `instances/storer/.env`
- `instances/storer-ng/.env`
- `instances/temple/.env`
- `instances/retriever/.env`
- `instances/retriever-ng/.env`

### storer / storer-ng / temple
Set:
```env
MW_IMAGE=mozohu/demo-stack-mw:clean
REST_IMAGE=mozohu/demo-stack-rest:clean
CRON_IMAGE=mozohu/demo-stack-cron:clean
```

### retriever / retriever-ng
Set:
```env
MW_IMAGE=mozohu/demo-stack-mw-retriever:clean
REST_IMAGE=mozohu/demo-stack-rest-retriever:clean
CRON_IMAGE=mozohu/demo-stack-cron-retriever:clean
```

Also ensure meshnet settings are consistent. Recommended in each instance env:
```env
MESHNET_NAME=demo-mesh
MESHNET_EXTERNAL=true
```

## 4) Prepare AWS credentials (runtime mount)
MW/REST/CRON mount `${AWS_CRED_DIR:-${INSTANCE_DIR}/aws}` into container `/root/.aws`.

### Option A (default): per-instance directory under INSTANCE_DIR
For each instance (storer, retriever, temple, storer-ng, retriever-ng), create:

```bash
mkdir -p instances/<name>/aws
# Put these files:
#   instances/<name>/aws/credentials
#   instances/<name>/aws/config
chmod 700 instances/<name>/aws
chmod 600 instances/<name>/aws/credentials instances/<name>/aws/config
```

### Option B (centralized): use AWS_CRED_DIR in the instance .env
Example:
```env
AWS_CRED_DIR=/secure/aws-creds/storer
```
Then put `credentials` and `config` under that directory.

## 5) Pull images (optional but recommended)
```bash
docker pull mozohu/demo-stack-mw:clean
docker pull mozohu/demo-stack-rest:clean
docker pull mozohu/demo-stack-cron:clean
docker pull mozohu/demo-stack-mw-retriever:clean
docker pull mozohu/demo-stack-rest-retriever:clean
docker pull mozohu/demo-stack-cron-retriever:clean
```

## 6) Deploy a system: mwd-pickup
The system definition lives in:
- `systems/mwd-pickup/instances.txt`
- `systems/mwd-pickup/system.env`

Start it:
```bash
./scripts/system_up.sh mwd-pickup
```

Check status:
```bash
./scripts/system_ps.sh mwd-pickup
```

## 7) Verify AWS access inside containers
Run in MW/REST/CRON (pick at least one from each instance):
```bash
docker exec -it storer-mw-1 sh -lc 'aws --version && aws sts get-caller-identity'
docker exec -it retriever-mw-1 sh -lc 'aws --version && aws sts get-caller-identity'
```

## 8) Common issues
### "demo-mesh exists but was not created by compose" warning
Set in env:
```env
MESHNET_NAME=demo-mesh
MESHNET_EXTERNAL=true
```
And ensure the network exists:
```bash
docker network create demo-mesh || true
```

### Ports conflict
Each instance must use unique `REST_PORT`, `MQTT_PORT`, `MQTT_WS_PORT`.

---

## Appendix: Stop / restart
Stop a system:
```bash
./scripts/system_down.sh mwd-pickup
```

Restart:
```bash
./scripts/system_down.sh mwd-pickup
./scripts/system_up.sh mwd-pickup
```
