# Deploy demo-stack on a new host (prod profile)

This runbook is written so another AI agent (or human) can bring up the **mwd-pickup** system on a fresh host quickly and correctly.

Key idea: instance runtime settings live in `instances/<name>/.env`, but **image tags are selected by profile**:

- `--profile local` → uses `instances/<name>/.images.local.env` (local-only tags like `demo-stack/...`)
- `--profile prod`  → uses `instances/<name>/.images.prod.env`  (pullable tags like `mozohu/...`)

On a new host you almost always want **prod**.

---

## 0) Prereqs
1. Docker Engine + Compose v2 installed
2. Host can pull from Docker Hub (or is logged in if you later make repos private)

Verify:
```bash
docker --version
docker compose version
```

---

## 1) Clone repo
```bash
git clone <GITHUB_REPO_URL> demo-stack
cd demo-stack/docker/demo-stack
```

---

## 2) Mesh network setup (demo-mesh)
`mwd-pickup` uses cross-instance DNS by instance name (storer/retriever), so you want a shared mesh network.

The system file already sets:
- `MESHNET_NAME=demo-mesh`
- `MESHNET_EXTERNAL=true`

Create it once:
```bash
docker network create demo-mesh || true
```

---

## 3) Apply/confirm HID per host
HID is stored in `instances/<name>/.env`.

If you want deterministic HID per-host+per-instance (recommended), run:
```bash
./scripts/apply_hid_envs.sh
```

- It will **keep existing HID** if already set.
- Use `--force` only if you intentionally want to overwrite.

---

## 4) Pull required clean images (Docker Hub)
All prod images are under Docker Hub namespace `mozohu`.

Pull everything needed for storer+retriever systems (includes SMC):
```bash
./scripts/pull_clean_images_dockerhub.sh
```

(Equivalent to pulling these repos with tag `:clean`:
`demo-stack-{mw,rest,cron,smc}` and `demo-stack-{mw,rest,cron,smc}-retriever`.)

---

## 5) Prepare AWS credentials (runtime mount)
MW/REST/CRON mount `${AWS_CRED_DIR:-${INSTANCE_DIR}/aws}` into container `/root/.aws` (read-only).

Default: per-instance directory under each instance dir:
```bash
for i in storer retriever; do
  mkdir -p "instances/${i}/aws"
  # Put:
  #   instances/${i}/aws/credentials
  #   instances/${i}/aws/config
  chmod 700 "instances/${i}/aws"
  chmod 600 "instances/${i}/aws/credentials" "instances/${i}/aws/config"
done
```

---

## 6) Bring up the system (mwd-pickup)
Start:
```bash
./scripts/system_up.sh mwd-pickup --profile prod
```

Check status:
```bash
./scripts/system_ps.sh mwd-pickup --profile prod
```

Stop:
```bash
./scripts/system_down.sh mwd-pickup
```

---

## 7) Quick verification
- Ports are published per instance (from `instances/<name>/.env`):
```bash
./scripts/ports.py --status
```

- AWS CLI available (inside mw):
```bash
docker exec -it storer-mw-1 sh -lc 'aws --version'
```

---

## Common failure: "pull access denied for demo-stack/..."
Cause: you used `--profile local` (or no profile) on a fresh host, so it tries to pull `demo-stack/...` which is a local-only tag.

Fix:
```bash
./scripts/system_up.sh mwd-pickup --profile prod
```
