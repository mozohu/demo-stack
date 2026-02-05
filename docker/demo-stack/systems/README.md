# Systems (instance groups)

A **system** is a named group of instances that are expected to work together.

Use case example:
- `mwd-pickup` system = `storer` + `retriever`
- instances communicate via the shared `meshnet` (Docker network)
- applications should reference other instances by **instance name**:
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

- `appnet` (per-instance): internal wiring for each instance (`rest`, `mq`, ...)
- `meshnet` (shared): cross-instance network
  - Only the `gateway` container joins meshnet.
  - The gateway has a network alias equal to the instance name (`${DEMO_NAME}`).

This avoids service-name collisions (`rest`, `mq`) across instances while still
allowing instance-level addressing.
