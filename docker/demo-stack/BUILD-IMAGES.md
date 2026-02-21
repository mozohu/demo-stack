# 升級 demo-stack Images

## Image 與 deb 套件對應

每個 role 的 image 只包含特定的 deb 套件：

| Role | Image（以 zgovend 為例） | 對應 deb 套件 |
|------|--------------------------|---------------|
| smc  | `mozohu/demo-stack-smc:clean` | `ivm-smc` |
| cron | `demo-stack/cron:clean` | `libivm-perl`, `ivm-scripts` |
| mw   | `demo-stack/mw:clean` | `libivm-perl`, `ivm-scripts` |
| rest | `demo-stack/rest:clean` | `ivm-rest` |

> 實際 image tag 由各 instance 的 `.images.local.env` 決定，見 `instances/<name>/.images.local.env`。

## 升級流程（推薦：smart-rebuild）

### 1. 準備 deb 檔案

將新的 deb 放入 `debs/` 目錄：

```bash
cd ~/demo-stack/docker/demo-stack/debs

# 下載新版（範例）
wget -O ivm-scripts_xxx.deb "http://13.112.14.121:8082/ivm-scripts-ng/deb/ivm-scripts_xxx.deb"
wget -O libivm-perl_xxx.deb "http://13.112.14.121:8082/libivm-perl-ng/deb/libivm-perl_xxx.deb"
# ivm-smc, ivm-rest 如果需要更新也放這裡
```

可能用到的 deb 檔案：
- `ivm-scripts_*.deb` — 商業邏輯腳本（影響 cron, mw）
- `libivm-perl_*.deb` — Perl 函式庫（影響 cron, mw）
- `ivm-smc_*.deb` — 狀態機引擎（影響 smc）
- `ivm-rest_*.deb` — REST API（影響 rest）

### 2. Smart Rebuild（自動比對 + 重建）

```bash
cd ~/demo-stack/docker/demo-stack

# Dry-run：查看哪些 image 需要重建（比對 debs/ vs image 內已安裝版本）
INSTANCE=zgovend ./scripts/smart-rebuild.sh

# 實際重建 + 自動重啟有變更的容器
INSTANCE=zgovend ./scripts/smart-rebuild.sh --apply
```

`smart-rebuild.sh` 會：
1. 讀取 `instances/<INSTANCE>/.images.local.env` 解析正確的 image tag
2. 逐一比對 `debs/` 裡的 deb 版本 vs image 內 `dpkg-query` 的版本
3. 只重建有差異的 image（標記為 🔄 NEEDS REBUILD）
4. `--apply` 時使用 `Dockerfile.upgrade` 重建，並 `force-recreate` 對應容器

### 3. 驗證

```bash
docker exec zgovend-mw-1 dpkg -l | grep -E "ivm-scripts|libivm-perl|ivm-smc"
docker exec zgovend-rest-1 dpkg -l | grep -E "ivm-rest"
docker exec zgovend-smc-1 dpkg -l | grep -E "ivm-smc"
```

---

## 手動升級（不使用 smart-rebuild）

如果需要手動控制，可以直接用 `Dockerfile.upgrade`：

```bash
cd ~/demo-stack/docker/demo-stack

# Build 指定 image（Dockerfile.upgrade 會安裝 debs/ 下所有 deb）
docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE=demo-stack/mw:clean -t demo-stack/mw:clean .
docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE=demo-stack/rest:clean -t demo-stack/rest:clean .
docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE=demo-stack/cron:clean -t demo-stack/cron:clean .
docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE=mozohu/demo-stack-smc:clean -t mozohu/demo-stack-smc:clean .

# 重跑 instance
docker compose --env-file instances/zgovend/.env --env-file instances/zgovend/.images.local.env down
docker compose --env-file instances/zgovend/.env --env-file instances/zgovend/.images.local.env up -d
```

> ⚠️ 注意：`Dockerfile.upgrade` 會嘗試安裝 `debs/` 下**所有** deb（ivm-smc, ivm-scripts, libivm-perl）。
> 若只需更新單一套件（如 `ivm-rest`），需要手動 build（見下方範例）。

### 單一套件更新範例（ivm-rest）

```bash
cd ~/demo-stack/docker/demo-stack

docker build -f - --build-arg BASE_IMAGE=demo-stack/rest:clean -t demo-stack/rest:clean . <<'EOF'
ARG BASE_IMAGE
FROM ${BASE_IMAGE}
COPY debs/ivm-rest_*.deb /tmp/
RUN dpkg -i /tmp/ivm-rest_*.deb || apt-get -f install -y && rm -f /tmp/*.deb
EOF

# 只重啟 rest 容器
docker compose --env-file instances/zgovend/.env --env-file instances/zgovend/.images.local.env up -d --force-recreate rest
```

---

## mwd-pickup-ng Images（舊版 storer/retriever）

| 用途 | Image |
|------|-------|
| storer mw | `mwd-pickup-ng-mw:latest` |
| storer rest | `mwd-pickup-ng-rest:latest` |
| retriever mw | `mwd-pickup-ng-mw-retriever:latest` |
| retriever rest | `mwd-pickup-ng-rest-retriever:latest` |

```bash
# Build
docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE=mwd-pickup-ng-mw:latest -t mwd-pickup-ng-mw:latest .
docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE=mwd-pickup-ng-rest:latest -t mwd-pickup-ng-rest:latest .
docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE=mwd-pickup-ng-mw-retriever:latest -t mwd-pickup-ng-mw-retriever:latest .
docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE=mwd-pickup-ng-rest-retriever:latest -t mwd-pickup-ng-rest-retriever:latest .

# 重啟
./scripts/system_down.sh mwd-pickup-ng
./scripts/system_up.sh mwd-pickup-ng

# 驗證
docker exec storer-ng-mw-1 dpkg -l | grep -E "ivm-scripts|libivm-perl|ivm-smc"
```

---

## 相關檔案

| 檔案 | 用途 |
|------|------|
| `Dockerfile.upgrade` | 升級用 Dockerfile（安裝 debs/ 下的 deb） |
| `debs/` | deb 檔案目錄 |
| `scripts/smart-rebuild.sh` | 自動比對版本 + 選擇性重建腳本 |
| `instances/<name>/.env` | Instance 環境變數（ports, HID 等） |
| `instances/<name>/.images.local.env` | Instance 使用的 image tag |
