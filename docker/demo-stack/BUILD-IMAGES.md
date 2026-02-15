# 升級 mwd-pickup-ng Images

## Image 命名

| 用途 | Image |
|------|-------|
| storer mw | `mwd-pickup-ng-mw:latest` |
| storer rest | `mwd-pickup-ng-rest:latest` |
| retriever mw | `mwd-pickup-ng-mw-retriever:latest` |
| retriever rest | `mwd-pickup-ng-rest-retriever:latest` |

## 升級流程

### 1. 準備 deb 檔案

將新的 deb 放入 `debs/` 目錄：

```bash
cd ~/.openclaw/workspace/docker/demo-stack/debs

# 下載新版（範例）
wget -O ivm-scripts_xxx.deb "http://13.112.14.121:8082/ivm-scripts-ng/deb/ivm-scripts_xxx.deb"
wget -O libivm-perl_xxx.deb "http://13.112.14.121:8082/libivm-perl-ng/deb/libivm-perl_xxx.deb"
# ivm-smc 如果需要更新也放這裡
```

需要的檔案：
- `ivm-scripts_*.deb`
- `libivm-perl_*.deb`
- `ivm-smc_*.deb`

### 2. 重建 Images

```bash
cd ~/.openclaw/workspace/docker/demo-stack

# Build（覆蓋舊版）
docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE=mwd-pickup-ng-mw:latest -t mwd-pickup-ng-mw:latest .
docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE=mwd-pickup-ng-rest:latest -t mwd-pickup-ng-rest:latest .
docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE=mwd-pickup-ng-mw-retriever:latest -t mwd-pickup-ng-mw-retriever:latest .
docker build -f Dockerfile.upgrade --build-arg BASE_IMAGE=mwd-pickup-ng-rest-retriever:latest -t mwd-pickup-ng-rest-retriever:latest .
```

### 3. 重啟容器

```bash
./scripts/system_down.sh mwd-pickup-ng
./scripts/system_up.sh mwd-pickup-ng
```

### 4. 驗證

```bash
docker exec storer-ng-mw-1 dpkg -l | grep -E "ivm-scripts|libivm-perl|ivm-smc"
docker exec retriever-ng-mw-1 dpkg -l | grep -E "ivm-scripts|libivm-perl|ivm-smc"
```

---

## 完整範例（一次複製貼上）

```bash
cd ~/.openclaw/workspace/docker/demo-stack

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

- `Dockerfile.upgrade` - 升級用的 Dockerfile
- `debs/` - 放 deb 檔案的目錄
- `instances/storer-ng/.images.local.env` - storer image 設定
- `instances/retriever-ng/.images.local.env` - retriever image 設定
