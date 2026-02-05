# Systems (instance groups)

A **system** is a named group of instances that are expected to work together.

Use case example:
- `mwd-pickup` system = `storer` + `retriever`
- instances communicate via the shared `meshnet` Docker network
- applications should reference other instances by **instance name** (not per-container DNS):
  - `http://retriever:80/...`
  - `mqtt://storer:1883`
  - `ws://retriever:9001`

## Layout

```
systems/<system>/
  instances.txt   # list of instances in this system
  system.env      # env vars applied to all instances in the system
```

## Commands

From `docker/demo-stack`:

- Start a system:
  - `./scripts/system_up.sh mwd-pickup`

- Stop a system:
  - `./scripts/system_down.sh mwd-pickup`

- Show status:
  - `./scripts/system_ps.sh mwd-pickup`

## Networking model

This project uses a **two-network** model:

- `appnet` (per-instance): internal wiring inside one instance.
  - safe for service names like `mq`, `rest`, `mw`.

- `meshnet` (shared): cross-instance network.
  - any container that must resolve other instances by name must join this network.

Current policy:
- joins `meshnet`: `gateway`, `mw`, `rest`, `cron`
- does NOT join `meshnet`: `mq`, `smc`

### Why not put all service containers in one shared network?

Because service names like `rest` and `mq` exist in every instance. If they shared one network,
Docker DNS would have name collisions. We therefore keep `appnet` per instance.

## Instance-level gateway

Each instance includes a `gateway` container (HAProxy):
- joins both `appnet` and `meshnet`
- has a `meshnet` alias equal to `${DEMO_NAME}` (the instance name)
- forwards:
  - `:80` -> `rest:80`
  - `:1883` -> `mq:1883`
  - `:9001` -> `mq:9001`

This allows other instances to connect using only the instance name.

## MW config overlay (/root/config.5)

In system mode, `scripts/system_up.sh` generates `instances/<name>/mw/config.5` and mounts it
into the MW container as `/root/config.5`.

For `mwd-pickup`, this is used to inject keys like:
- `MASTER_EBUS`, `MASTER_IP`
- `RETRIEVER_EBUS`, `RETRIEVER_IP`

`scripts/system_down.sh` resets the file back to a no-op to keep solo runs compatible.
