# demo-stack

## Image profiles (local vs prod)

Each instance keeps runtime settings in `instances/<name>/.env`.
Image tags are split out by environment:

- `instances/<name>/.images.local.env`  → local development (images built/tagged on this host)
- `instances/<name>/.images.prod.env`   → deployment (images pullable from registry)

Scripts support `--profile local|prod` (default: `local`).

### Pull clean images (on a new host)

```bash
# Pull all demo-stack clean images from Docker Hub (including SMC)
./scripts/pull_clean_images_dockerhub.sh
```

### Push clean images to Docker Hub

```bash
# Build clean images locally first (if needed)
./scripts/build_secure_images.sh
./scripts/build_secure_images.sh --variant retriever

# Push to Docker Hub (includes SMC clean + retriever SMC clean)
./scripts/push_clean_images_dockerhub.sh

# Or push only SMC:
./scripts/push_clean_images_dockerhub.sh --only smc
./scripts/push_clean_images_dockerhub.sh --only smc-retriever
```


```bash
./scripts/up.sh storer --profile local
./scripts/up.sh storer --profile prod

./scripts/system_up.sh mwd-pickup --profile prod
./scripts/system_ps.sh mwd-pickup --profile prod
```

## HID generation (per-host + per-instance)

Each instance has a `HID` in `instances/<name>/.env`.

If you want deterministic, automatically generated HIDs (different across hosts), use:

```bash
cd docker/demo-stack
./scripts/apply_hid_envs.sh            # apply to all instances (keep existing HID)
# or
./scripts/apply_hid_envs.sh storer temple

./scripts/apply_hid_envs.sh --force    # overwrite existing HID values
```

Algorithm: `sha256("<hostname>:<instanceName>")` → `02:<first 5 bytes>`.


目標：在同一台 demo 機器上同時啟動多套 demo（storer / retriever / temple...），每套 demo 都有自己獨立的一組：
- REST API port（HTTP）
- MQTT port（TCP）
- MQTT-WS port（WebSocket）

GUI 由一個共享的 `frontend` nginx 提供（單一入口）。

本 stack 內部以 HTTP/WS 直出；外部如需 HTTPS/WSS，建議再包一層 reverse proxy 統一管理憑證。

---

## 架構與目錄

每個 demo instance 都是：**同一個 compose 模板 + 各自一份 env**。

- `compose.yml`：通用模板（mq/smc/mw/rest/cron/gateway）
- `instances/<name>/.env`：此 demo 的 ports、HID、instance 目錄、（可選）meshnet 設定
- `instances/<name>/{mq,smc,rest,cron,mw,gateway}/...`：此 demo 的設定檔
- `instances/<name>/.images.local.env` / `.images.prod.env`：image tag（開發/佈署切換）

### Networks（很重要）

本專案使用兩張網：

- `appnet`（每個 instance 各自一張）：instance 內部 wiring
  - service name `mq/rest/mw/...` 不會撞名

- `meshnet`（共用）：跨 instance 通訊
  - **會主動連線到其他 instance 的容器**必須加入 meshnet

目前策略：
- 加入 `meshnet`：`gateway`, `mw`, `rest`, `cron`
- 不加入 `meshnet`：`mq`, `smc`

### Instance-level gateway（跨 instance 只用 instance 名稱）

每個 instance 有一個 `gateway`（HAProxy），同時加入 `appnet` + `meshnet`，並在 `meshnet` 上掛 alias = instance 名稱（`${DEMO_NAME}`）。

因此跨 instance 溝通可以固定使用標準 port：
- REST/media：`http://<instance>:80/...`
- MQTT：`mqtt://<instance>:1883`
- MQTT-WS：`ws://<instance>:9001`

gateway 設定：`instances/<name>/gateway/haproxy.cfg`

---

## 快速開始

### 事前準備：AWS credentials（mw/rest/cron 需要）
本專案 **不會把 AWS credential bake 進 image**。需要在執行時掛載到容器內 `/root/.aws`。

預設位置（每個 instance 各自一份）：
- host: `${INSTANCE_DIR}/aws/credentials`
- host: `${INSTANCE_DIR}/aws/config`

你也可以在 `instances/<name>/.env` 裡指定：
- `AWS_CRED_DIR=/path/to/aws-dir`（則會掛載該目錄到容器 `/root/.aws`）

權限建議：
```bash
chmod 700 ${INSTANCE_DIR}/aws
chmod 600 ${INSTANCE_DIR}/aws/credentials ${INSTANCE_DIR}/aws/config
```

### 啟動單一 instance
```bash
# local（本機 build/tag 的 demo-stack/*）
./scripts/up.sh storer --profile local

# prod（Docker Hub mozohu/*）
./scripts/up.sh storer --profile prod
```

### 停止單一 instance
```bash
./scripts/down.sh storer
```

### 查看狀態
```bash
./scripts/ps.sh storer
```

---

## System（instance 組）

有些 demo 需要多個 instance 成套運作（例如 `storer + retriever`）。

- system 定義：
  - `systems/<system>/instances.txt`
  - `systems/<system>/system.env`

- 啟動/停止/狀態（建議新主機用 prod profile）：
```bash
./scripts/system_up.sh mwd-pickup --profile prod
./scripts/system_ps.sh mwd-pickup --profile prod
./scripts/system_down.sh mwd-pickup
```

### MW config overlay：/root/config.5

MW 的 `ivm.pm get_config()` 會合併多層設定。

本專案會把 `instances/<name>/mw/config.5` bind-mount 到 MW 容器內的 `/root/config.5`（高優先序覆蓋層）。

system 模式下：
- `scripts/system_up.sh` 會自動生成 `config.5`（例如注入 `MASTER_IP=storer` / `RETRIEVER_IP=retriever`）
- `scripts/system_down.sh` 會把 `config.5` 重置回 no-op，避免影響單獨啟動

---

## GUI（frontend 單一入口）

GUI 是靜態 web app，不在每個 instance 內啟動 GUI container。

- 靜態檔：`gui/<app>/`（例如 `gui/storer/`, `gui/retriever/`, `gui/temple/`）
- frontend nginx（`frontend/compose.yml`）提供：
  - `http://<host>:${FRONTEND_PORT}/demo/<app>/`

### /media proxy（支援 GUI 寫死 /media）

有些 GUI（例如 `temple`）在瀏覽器裡會直接請求 `http(s)://<same-origin>/media/...`。

frontend 會根據 `Referer: /demo/<app>/...` 推斷 app，並把 `/media/...` proxy 到 `http://<app>/media/...`（走 meshnet 的 instance gateway）。

---

## Image build（安全版本：內建 awscli、且不含 /root/.aws）

本 repo 內的 `images/{mw,rest,cron}/Dockerfile` 會安裝：
- `liblogger-syslog-perl`
- AWS CLI v2

但由於上游 base image 可能曾經含有 `/root/.aws`，只用 `RUN rm -rf` 不安全。
本專案採取「flatten」做法確保 secrets 不存在於任何 layer。

建置腳本：
```bash
# storer 版
./scripts/build_secure_images.sh

# retriever 版
./scripts/build_secure_images.sh --variant retriever
```

產物：
- `demo-stack/mw:clean`, `demo-stack/rest:clean`, `demo-stack/cron:clean`
- `demo-stack/mw-retriever:clean`, `demo-stack/rest-retriever:clean`, `demo-stack/cron-retriever:clean`

建完後把 `instances/<name>/.env` 內的 `MW_IMAGE/REST_IMAGE/CRON_IMAGE` 指到 `*:clean`。

---

## 部署到另一台主機（從 Docker Hub 拉 clean images）
請看：`DEPLOY-NEW-HOST.md`

---

## 常用工具 scripts

- `./scripts/stat.sh <instance>`：在 MW 內跑 `stat.pl`
- `./scripts/get_config.sh <instance>`：在 MW 內跑 `get_config.pl`
- `./scripts/get_host.sh <instance>`：在 MW 內跑 `get_host.pl`
- `./scripts/smock.sh <instance> <event> [json]`：送 ebus event

新增/強化的診斷工具：
- `./scripts/ping.sh storer retriever`：meshnet DNS + ping
- `./scripts/mesh_check.sh --system mwd-pickup`：檢查哪些容器有加入 meshnet
- `./scripts/mqtt_listen.sh storer --topic '#'
`：用 `mosquitto_sub` 聆聽某 instance 的 MQTT topic（含時間戳/instance 欄位）
- `./scripts/ports.py [--status]`：掃描 `instances/*/.env`，列出 HID/ports（可附容器狀態）

---

## 外部 HTTPS/WSS（集中管理憑證）

本 stack 內部以 HTTP/WS 直出；你可以在外部再包一層 reverse proxy（nginx/traefik/caddy）做：

- `https://host:<port> -> http://127.0.0.1:${FRONTEND_PORT}`
- `https://host:<port> -> http://127.0.0.1:${REST_PORT}`
- `wss://host:<port> -> ws://127.0.0.1:${MQTT_WS_PORT}`
