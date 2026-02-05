# AGENTS.md (demo-stack)

This file is for AI agents and new maintainers.

## What this project is

`docker/demo-stack` runs multiple **demo instances** (e.g. `storer`, `retriever`, `temple`) on a single Docker host.

Each instance is the same Compose template (`compose.yml`) plus an instance-specific env file (`instances/<name>/.env`).

Instances contain the following services:
- `mq` (mosquitto)
- `smc`
- `mw`
- `rest` (nginx + fcgiwrap)
- `cron`
- `gateway` (HAProxy; instance-level entrypoint)

## Key ideas (must understand)

### 1) Two-network model: appnet vs meshnet

- `appnet` (per-instance): internal wiring inside one instance.
  - service names like `mq`, `rest`, `mw` are safe here.
- `meshnet` (shared, cross-instance): allows instances to talk to each other.

**Important:** any container that needs to resolve other instances by name (e.g. `MASTER_IP=storer`) must join `meshnet`.

Current policy:
- joins `meshnet`: `gateway`, `mw`, `rest`, `cron`
- does NOT join `meshnet`: `mq`, `smc`

### 2) Instance-level addressing via `gateway`

Cross-instance traffic should use instance names + standard ports:
- HTTP (REST/media): `http://<instance>:80/...`
- MQTT: `mqtt://<instance>:1883`
- MQTT-WS: `ws://<instance>:9001`

How it works:
- `gateway` joins both networks.
- on `meshnet` it has an alias equal to the instance name (`${DEMO_NAME}`), so DNS `storer` resolves.
- HAProxy forwards ports:
  - `80` -> `rest:80`
  - `1883` -> `mq:1883`
  - `9001` -> `mq:9001`

HAProxy config lives at `instances/<name>/gateway/haproxy.cfg`.

### 3) MW config overlay: `/root/config.5`

MW builds its effective config via `ivm.pm get_config()` by merging layers.

We bind-mount `instances/<name>/mw/config.5` to `/root/config.5` in the MW container.

In system mode, `scripts/system_up.sh` auto-generates that file to inject:
- `MASTER_EBUS`, `MASTER_IP`, `RETRIEVER_EBUS`, `RETRIEVER_IP`

When system is stopped, `scripts/system_down.sh` resets `config.5` to a no-op.

### 4) Frontend (GUI gateway)

GUI is served by a shared nginx in `frontend/`:
- URL: `http://<host>:8088/demo/<app>/`

Some GUIs (e.g. `temple`) are hard-coded to request `/media/...` from the same origin.
Frontend therefore proxies `/media/...` to the correct instance **based on Referer** (`/demo/<app>/...`).

Frontend must join `meshnet` to resolve instance names.

### 5) Temple mobile wrapper

`gui/temple/index.html` is a wrapper page (scales 1080x1920 to phone screen) that iframes `gui/temple/app.html`.

Audio workaround:
- autoplay video stays muted for mobile compatibility
- extracted audio is served as `/media/gui/pick_gods.m4a` and played via `<audio id="bgm">` after a user gesture

Many internal pages previously navigated to `index.html`; those were changed to navigate to `app.html` to avoid wrapper-in-wrapper nesting.

## Operator commands (scripts)

### Single instance
- Start/stop:
  - `./scripts/up.sh <instance>`
  - `./scripts/down.sh <instance>`
- Status:
  - `./scripts/ps.sh <instance>`

### System (instance group)
- Start/stop/status:
  - `./scripts/system_up.sh <system>`
  - `./scripts/system_down.sh <system>`
  - `./scripts/system_ps.sh <system>`

System definition:
- `systems/<system>/instances.txt`
- `systems/<system>/system.env`

### Diagnostics
- Mesh reachability (DNS + ping): `./scripts/ping.sh storer retriever`
- Mesh attachment check: `./scripts/mesh_check.sh --system mwd-pickup`
- Listen MQTT topics via meshnet: `./scripts/mqtt_listen.sh storer --topic '#'
- Ports map helper: `./scripts/ports.py list|get|set ...` (source-of-truth is `instances/apps.json`)

## Common failure modes

1) "Name or service not known" inside MW/REST/CRON
- Container likely not attached to `meshnet`.
- Verify with `./scripts/mesh_check.sh --system <system>`.

2) Frontend `/media` returns 502
- Target instance gateway not on meshnet, or instance not running.

3) MQTT cross-instance connects but no events
- Verify broker reachable: `./scripts/mqtt_listen.sh <instance> --topic 'topic/app'`

## Repo hygiene

- `.tmp/` and `.trash/` directories are local/temporary; avoid committing them.
