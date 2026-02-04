# demo-stack

目標：在同一台 demo 機器上同時啟動多套 demo（storer / retriever / temple...），每套 demo 都有自己獨立的一組：
- Web GUI port（HTTP）
- REST API port（HTTP）
- MQTT port（TCP）
- MQTT-WS port（WebSocket）

並且採用「HTTP 直出 + 外部集中 reverse proxy 包 HTTPS/WSS」的方式管理憑證。

## 架構
每個 demo instance 都是同一個 compose 模板 + 各自一份 env。

另外有一份集中對照表：
- `instances/apps.json`：各 app 對應 HID / ports（方便查詢與後續自動化）


- `compose.yml`：通用模板
- `instances/<name>/.env`：此 demo 的對外 ports、image tag、instance 目錄
- `instances/<name>/{mq,smc,rest,cron}/...`：此 demo 的設定檔

啟動採用模式 A：

```bash
docker compose -f compose.yml --env-file instances/<name>/.env up -d
```

透過 `--env-file` + `DEMO_NAME`，每套 demo 自動擁有獨立的 network 與 named volumes（例如 `storer_db`, `retriever_db`）。

## 快速開始

### 1) 啟動 storer
```bash
./scripts/up.sh storer
```

### 2) 啟動 retriever
```bash
./scripts/up.sh retriever
```

### 3) 一次啟動一組（storer + retriever）
```bash
./scripts/up.sh pair
```

### 4) 查看狀態
```bash
./scripts/ps.sh storer
./scripts/ps.sh retriever
```

### 4.1) 檢查 MW 執行狀態（常用：stat.pl）
```bash
./scripts/stat.sh storer
./scripts/stat.sh retriever

# 連續刷新（等同 stat.pl -c）
./scripts/stat.sh storer --watch
```

### 4.2) 從命令列觸發 ebus event（smock.pl）
```bash
./scripts/smock.sh storer 'sess/session_begin'
./scripts/smock.sh storer 'reader/read' '{"type":"keypad","data":"1234"}'
```

### 4.3) 手動觸發 LTMS mediasync（在 cron 容器內跑一次）
```bash
./scripts/mediasync.sh storer
./scripts/mediasync.sh retriever
```

### 4.4) 在 mw 容器查詢 host 設定（get_host.pl）
```bash
./scripts/get_host.sh storer
./scripts/get_host.sh retriever
```

### 4.5) 在 mw 容器查詢完整設定（get_config.pl）
```bash
./scripts/get_config.sh storer
./scripts/get_config.sh retriever
```

### 5) 停止
```bash
./scripts/down.sh storer
./scripts/down.sh retriever
./scripts/down.sh pair
```

## Ports（每個 instance 必填）
每套 demo 的 `.env` 需設定：

- `REST_PORT`
- `MQTT_PORT`
- `MQTT_WS_PORT`

對外連線參考：
- REST: `http://<host>:${REST_PORT}/app/rest/...`
- MQTT: `mqtt://<host>:${MQTT_PORT}`
- MQTT-WS: `ws://<host>:${MQTT_WS_PORT}`

## GUI（集中管理，不隨 instance 起容器）
GUI 是靜態 web app，不在每個 instance 內啟動容器。

- 靜態檔放在：`gui/<app>/`（例如 `gui/storer/`, `gui/retriever/`）
- 用 `frontend/compose.yml` 啟動一個共享 nginx，提供：
  - `http://<host>:${FRONTEND_PORT}/demo/<app>/`
  - 並在缺少 query 時自動 302 補上 `ebus` / `rest`：
    - `?ebus=ws://<host>:<MQTT_WS_PORT>&rest=http://<host>:<REST_PORT>`

## 外部 HTTPS/WSS（集中管理憑證）
本 stack 內部以 HTTP/WS 直出；你可以在外部再包一層 reverse proxy（nginx/traefik/caddy）做：

- `https://host:<port> -> http://127.0.0.1:${GUI_PORT}`
- `https://host:<port> -> http://127.0.0.1:${REST_PORT}`
- `wss://host:<port> -> ws://127.0.0.1:${MQTT_WS_PORT}`

（proxy 範本可後續加入 `proxy/` 目錄。）
