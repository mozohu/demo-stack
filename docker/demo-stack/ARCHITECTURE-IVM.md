# IVM 應用框架架構說明

## 概述

**IVM (Intelligent Vending Machine)** 是一套地端 IoT IPC 應用框架，用於智能販賣機、取餐櫃等無人零售設備。此文檔說明框架的核心組件和通訊機制。

## 核心組件

```
┌─────────────────────────────────────────────────────────┐
│                    IVM Application                       │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ ivm-scripts  │  │   ivm-smc    │  │ MQTT Broker  │  │
│  │   (Perl)     │  │  (Node.js)   │  │ (Mosquitto)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         ↓                  ↓                  ↓          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              ebus (Event Bus)                     │  │
│  │    MQTT → Unix Socket Bridge + Broadcast         │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 1. ivm-smc (State Machine Controller)

### 技術棧
- **語言**: Node.js (JavaScript)
- **主程式**: `smc.js`
- **配置**: `/etc/smc_config.js`

### 職責
1. **狀態機管理**
   - 管理多個獨立的狀態機（sys, sess, payment, dispense, etc.）
   - 處理狀態轉換邏輯
   - 維護狀態機的當前狀態

2. **事件路由**
   - 接收 trigger events（來自 ivm-scripts）
   - 根據狀態機定義執行轉換
   - 發送 transition events（狀態變化通知）

3. **資料持久化**
   - SQLite 資料庫：`/opt/svm/rest/db/sqlite.db`
   - 存儲配置、交易記錄、庫存等

### 事件類型
- **Trigger Events**: 觸發狀態轉換的命令
  - 格式: `{sm}/action`
  - 範例: `sys/sys_op`, `sess/session_begin`, `payment/pay`

- **Transition Events**: 狀態轉換的通知
  - 格式: `{sm}/enter_{STATE}`, `{sm}/leave_{STATE}`, `{sm}/after_{action}`
  - 範例: `sys/enter_OPERATION`, `payment/after_paid`

---

## 2. ivm-scripts (Business Logic)

### 技術棧
- **語言**: Perl
- **位置**: `/opt/app/scripts/`
- **啟動**: `start.pl` 讀取 `config.pm` 啟動各模組

### 架構
採用 **事件驅動** 的腳本架構，每個腳本是一個獨立的行程，監聽特定的事件。

```perl
# 典型的 script 結構
use ebus;
use sm;

my $sm = sm->new();      # 發送 trigger events
my $ebus = ebus->new();  # 接收 transition events

$ebus->ebus_input(\&handler);
$ebus->loop();

sub handler {
    my ($self, $event) = @_;
    if ($event->{e} eq 'sys/enter_IDLE') {
        # 業務邏輯
        $sm->smock('reader/start');  # 發送 trigger
    }
}
```

### 模組分類

#### 系統控制 (sys_*.pl)
- `sys.pl` - 主系統控制、庫存管理
- `sys_*.pl` - 各廠商機型的特定邏輯

#### 會話管理 (sess_*.pl)
- `sess.pl` - 會話控制、超時處理
- `sess_keepalive.pl` - 保持連線

#### 業務邏輯 (biz_*.pl)
- `biz.pl` - 標準購買流程
- `biz_*.pl` - 特定客戶或場景的業務邏輯

#### 支付處理 (payment_*.pl)
- `payment.pl` - 支付主控
- `payment_cash_*.pl` - 現金支付
- `payment_isc_*.pl` - 電子支付整合

#### 出貨控制 (dispense_*.pl)
- `dispense.pl` - 出貨主控
- `dispense_tcn_*.pl` - TCN 廠商的出貨控制
- `dispense_retriever.pl` - 取餐櫃出貨

#### 其他
- `order.pl` - 訂單處理
- `reader.pl` - 讀卡器/掃碼器
- `invoice.pl` - 發票處理

### 關鍵特性
1. **獨立行程**: 每個腳本是獨立行程，互不影響
2. **事件驅動**: 透過 MQTT/ebus 接收事件，非同步處理
3. **IO::Multiplex**: 使用 event loop，每個腳本有自己的 mux

---

## 3. MQTT Broker (Mosquitto)

### 技術棧
- **軟體**: Eclipse Mosquitto 2.x
- **Port**: 1883 (MQTT), 9001 (WebSocket)
- **配置**: `/mosquitto/config/mosquitto.conf`

### 職責
1. **訊息中介**
   - 接收來自 ivm-smc 和 ivm-scripts 的訊息
   - 根據 queue/app 路由訊息

2. **頻道 (Topics)**
   - `queue/app` - Trigger events (scripts → smc)
   - `topic/app` - Transition events (smc → scripts)
   - 其他自定義 topics

### 特性
- **Pub/Sub 模式**: 發布/訂閱解耦
- **QoS 支援**: 確保訊息可靠傳遞
- **持久連線**: Keep-alive 機制

---

## 4. ebus (Event Bus System)

### 設計目標
將 MQTT 的 Pub/Sub 模式橋接到 Unix Domain Socket，讓 Perl scripts 能高效接收事件。

### 架構

```
┌─────────────────────────────────────────────────┐
│         MQTT Broker (localhost:1883)            │
│                  topic/app                      │
└────────────────────┬────────────────────────────┘
                     ↓
              ┌──────────────┐
              │  ebus.pl     │  (Singleton per hostname)
              │  Bridge      │  - 訂閱 MQTT topic
              └──────┬───────┘  - Broadcast to clients
                     ↓
      ┌──────────────────────────────┐
      │ /var/run/ebus/ebus.*.sock    │  (Shared Socket)
      └──────┬───────────────────────┘
             ↓
    ┌────────┴────────┬──────────┬──────────┐
    ↓                 ↓          ↓          ↓
 sys.pl          payment.pl  dispense.pl  order.pl
(mux₁)           (mux₂)      (mux₃)       (mux₄)
```

### 組件

#### ebus.pl (Bridge Daemon)
**職責**: MQTT 訂閱者 + Unix Socket 伺服器

```perl
# 啟動方式（On-demand）
ebus.pl --hostname localhost --sock /var/run/ebus/ebus.localhost.sock

# 流程
1. 連接到 MQTT Broker (hostname:1883)
2. 訂閱 topic/app (transition events)
3. 建立 Unix Socket Server
4. 接受多個 client 連接
5. 收到 MQTT 訊息時，廣播給所有 clients
```

**關鍵特性**:
- **Singleton**: 每個 hostname 只有一個 ebus.pl 行程
- **On-demand 啟動**: socket 不存在時自動啟動
- **Broadcast**: 一對多，所有 clients 都收到相同事件
- **Non-blocking**: 使用 `IO::Select` 處理多連線

#### ebus.pm (Client Library)
**職責**: Perl 腳本的 ebus 客戶端庫

```perl
package ebus;

# 類別方法：連接到指定 hostname 的 ebus
sub connect {
    my ($class, $hostname) = @_;
    # 1. 確認 socket 路徑
    # 2. 若 socket 不存在，fork 並啟動 ebus.pl
    # 3. 連接到 socket
    # 4. 返回 socket handle
}

# 物件方法：向後相容的 API
sub new { ... }
sub ebus_input { ... }  # 設置 event handler
sub loop { ... }        # 進入 IO::Multiplex event loop
```

**使用範例**:

```perl
# 方式 1: 舊 API（向後相容）
my $ebus = ebus->new();              # 預設 localhost
$ebus->ebus_input(\&handler);
$ebus->loop();

# 方式 2: 連接遠端 ebus
my $ebus = ebus->new(hostname => 'storer');
$ebus->ebus_input(\&handler);
$ebus->loop();

# 方式 3: 多重連線（新 API）
my $mux = IO::Multiplex->new();
my $sock_local = ebus->connect('localhost');
my $sock_remote = ebus->connect('storer');
$mux->add($sock_local);
$mux->add($sock_remote);
$mux->set_callback_object($handler1, $sock_local);
$mux->set_callback_object($handler2, $sock_remote);
$mux->loop();
```

### Socket 路徑規範
```
/var/run/ebus/
├── ebus.localhost.sock  (本地 MQTT)
├── ebus.storer.sock     (storer MQTT)
└── ebus.{hostname}.sock (其他遠端 MQTT)

# 向後相容 symlink
/var/lib/ebus.sock → /var/run/ebus/ebus.localhost.sock
```

---

## 通訊流程

### 1. 典型交易流程

```
User Action
    ↓
[GUI] 按下購買按鈕
    ↓
[biz.pl] 接收 reader/after_read event
    ↓ (發送 trigger)
sm->smock('sess/session_begin')
    ↓ (透過 MQTT)
[ivm-smc] 收到 trigger，執行狀態轉換
    ↓ (發送 transition)
MQTT topic/app: {"e":"sess/enter_SESSION", ...}
    ↓ (透過 ebus.pl 廣播)
[所有 scripts] 收到 transition event
    ↓
[order.pl] 處理 sess/enter_SESSION
    ↓ (發送 trigger)
sm->smock('order/create_order', {pid=>123, qty=>1})
    ↓
[ivm-smc] 建立訂單
    ↓ (發送 transition)
MQTT: {"e":"order/after_create_order", ...}
    ↓
[payment.pl] 收到事件，啟動支付流程
    ... (繼續)
```

### 2. 多機通訊（Retriever + Storer）

**場景**: 取餐櫃 (retriever) 需要監聽存餐機 (storer) 的事件

```
┌──────────────────┐           ┌──────────────────┐
│   Storer 機器    │           │  Retriever 機器  │
│                  │           │                  │
│  MQTT (1883)     │           │  MQTT (1883)     │
│       ↓          │           │       ↓          │
│  ebus.pl         │           │  ebus.pl ①       │
│       ↓          │           │       ↓          │
│  ebus.*.sock     │           │  ebus.*.sock     │
│       ↓          │           │       ↓          │
│  dispose.pl      │           │  biz_*.pl ②③    │
│  (存餐/取餐)     │           │                  │
└──────────────────┘           └──────────────────┘
                 ↓                     ↑
           store/after_store_ok       │
                 └─────────────────────┘
                   (透過 MQTT 跨機器)
```

① Retriever 啟動兩個 ebus.pl:
- `ebus.localhost.sock` - 本地事件
- `ebus.storer.sock` - 監聽 storer 的事件

② `biz_mwd_retriever_m.pl`:
```perl
my $master_mq = 'storer';  # storer 的 hostname

# 連接到 storer 的 ebus
my $ebus = ebus->new(hostname => $master_mq);
$ebus->ebus_input(\&handler);

sub handler {
    my ($self, $e) = @_;
    # 監聽來自 storer 的事件
    if ($e->{e} eq 'store/after_store_ok') {
        # 更新本地格口狀態
        $ivm->smc_send('sys/hint', {cabin_code => $update});
    }
}
```

③ 其他 scripts 連接到本地 ebus，處理本地事件。

---

## Docker Compose 配置

### 容器架構

```yaml
services:
  mq:        # MQTT Broker (Mosquitto)
  smc:       # ivm-smc (Node.js 狀態機)
  mw:        # ivm-scripts (Perl 業務邏輯)
  rest:      # REST API + nginx
  cron:      # 排程任務
  gateway:   # HAProxy (可選)
```

### 關鍵 Volumes

```yaml
volumes:
  # 共享資料庫
  db:        # /opt/svm/rest/db (SQLite)

  # 共享 ebus sockets（mw/rest/cron）
  ebus_run:  # /run/ebus (or /var/run/ebus)

  # IVM 資料目錄
  ivm_var:   # /var/lib/ivm
  ivm_opt:   # /opt/ivm
```

### 網路

```yaml
networks:
  appnet:    # 內部網路（同一 instance）
  meshnet:   # 跨 instance 網路（通過 gateway）
```

---

## 關鍵設計模式

### 1. 事件驅動架構 (Event-Driven Architecture)
- **解耦**: 各組件透過事件通訊，不直接依賴
- **非同步**: 事件處理不阻塞發送方
- **擴展性**: 新增功能只需訂閱相關事件

### 2. Pub/Sub 模式
- **MQTT**: 多對多廣播
- **ebus**: 一對多本地廣播

### 3. 狀態機模式
- **ivm-smc**: 集中管理狀態邏輯
- **可預測**: 狀態轉換有明確規則
- **可追蹤**: 所有狀態變化都有 transition events

### 4. Singleton 模式
- **ebus.pl**: 每個 hostname 一個行程
- **避免重複連線**: 節省資源

### 5. 多路復用 (Multiplexing)
- **IO::Multiplex**: 單線程處理多個 socket
- **非阻塞 I/O**: 提升效率

---

## 配置文件

### /etc/smc_config.js
```javascript
module.exports = {
    // MQTT Broker
    ebus_broker: 'localhost',
    ebus_broker_port: 1883,

    // Transition channel
    tran_chan: 'topic/app',

    // Trigger channel
    trigger_chan: 'queue/app',

    // 遠端配置（多機通訊）
    master_ip: 'storer',      // 主機 IP/hostname
    master_mq: 'storer',      // 主機 MQTT hostname

    // 其他配置...
};
```

### /opt/app/scripts/config.pm
```perl
package config;

# 要啟動的模組列表
our $mods = [
    'sys.pl',
    'sess.pl',
    'biz.pl',
    'order.pl',
    'payment.pl',
    'dispense.pl',
    # ... 其他模組
];

# 狀態機名稱
our $stats = 'sys,sess,payment,dispense,order,reader,auth,invoice';
```

---

## 除錯技巧

### 1. 查看 ebus.pl 是否運行
```bash
ps aux | grep ebus.pl
# 應該看到：
# perl /usr/share/perl5/ebus.pl --hostname localhost --sock /var/run/ebus/ebus.localhost.sock
```

### 2. 檢查 socket 文件
```bash
ls -la /var/run/ebus/
# 應該看到：
# ebus.localhost.sock
# ebus.storer.sock (如果有連接 storer)
```

### 3. 監聽 MQTT 訊息
```bash
# 安裝 mosquitto-clients
apt-get install mosquitto-clients

# 監聽所有訊息
mosquitto_sub -h localhost -t '#' -v

# 監聽 transition events
mosquitto_sub -h localhost -t 'topic/app' -v

# 發送測試 trigger
mosquitto_pub -h localhost -t 'queue/app' -m '{"e":"sys/sys_op"}'
```

### 4. 查看 script 日誌
```bash
tail -f /tmp/tmpfs/app.log
```

### 5. 查看 smc 日誌
```bash
# 在 Docker Compose 環境
docker compose logs -f smc
```

---

## 常見問題

### Q1: ebus.pl 沒有自動啟動？
**A**: 檢查 `ebus.pm` 的 `_start_ebus_daemon()` 函數，確認 `ebus.pl` 路徑正確。

### Q2: Scripts 收不到事件？
**A**:
1. 確認 ebus.pl 運行中
2. 確認 socket 文件存在
3. 確認 MQTT broker 運行中
4. 使用 `mosquitto_sub` 監聽 MQTT 訊息

### Q3: 如何連接遠端 MQTT？
**A**:
```perl
my $ebus = ebus->new(hostname => 'remote-host');
$ebus->ebus_input(\&handler);
$ebus->loop();
```

### Q4: 多個 scripts 會收到重複事件嗎？
**A**: 是的，這是設計行為。每個 script 都會收到所有事件，由 script 自行過濾。

---

## 版本資訊

### ebus 架構演進

#### v1 (舊版)
- ebus.pl 作為 systemd service 啟動
- 固定 socket 路徑: `/var/lib/ebus.sock`
- 只支援單一 MQTT broker

#### v2 (新版 - 2026)
- **On-demand 啟動**: socket 不存在時自動啟動 ebus.pl
- **多 hostname 支援**: 可同時連接多個 MQTT brokers
- **Socket 路徑規範**: `/var/run/ebus/ebus.{hostname}.sock`
- **Singleton 模式**: 每個 hostname 一個 ebus.pl 行程
- **向後相容**: 保留 `/var/lib/ebus.sock` symlink

---

## 相關文檔

- [CLAUDE.md](../../ivm-scripts/CLAUDE.md) - ivm-scripts 專案說明
- [compose.yml](compose.yml) - Docker Compose 配置
- [smc_config.js](instances/*/smc/smc_config.js) - SMC 配置範例

---

## 附錄：完整事件流程圖

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │ Tap QR Code
       ↓
┌─────────────┐
│  reader.pl  │ (讀取 QR Code)
└──────┬──────┘
       │ sm->smock('reader/read', {code=>...})
       ↓
┌─────────────────────┐
│    MQTT Broker      │
│  queue/app          │
└──────┬──────────────┘
       ↓
┌─────────────────────┐
│     ivm-smc         │ (狀態機處理)
└──────┬──────────────┘
       │ transition: reader/after_read
       ↓
┌─────────────────────┐
│    MQTT Broker      │
│    topic/app        │
└──────┬──────────────┘
       │ (透過 ebus.pl 廣播)
       ↓
┌─────────────────────┐
│   ebus.pl           │
│ /var/run/ebus/*.sock│
└──────┬──────────────┘
       │ (broadcast to all clients)
       ├─────────┬─────────┬─────────┐
       ↓         ↓         ↓         ↓
   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
   │ biz.pl │ │sess.pl │ │sys.pl  │ │order.pl│
   └────┬───┘ └────────┘ └────────┘ └────────┘
        │ handler() 處理事件
        │ sm->smock('sess/session_begin')
        ↓
   [循環繼續...]
```

---

**最後更新**: 2026-02-10
**作者**: Claude (Anthropic)
**版本**: 2.0 (ebus 架構重構版)
