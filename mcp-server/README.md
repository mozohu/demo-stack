# demo-stack MCP Server

提供 AI agent 操作 demo-stack instances 的 MCP (Model Context Protocol) 工具。

## 安裝

```bash
cd demo-stack/mcp-server
npm install
```

## 使用

### Claude Code (VS Code plugin)

在 `~/.config/claude-code/mcp.json`（或專案 `.mcp.json`）加入：

```json
{
  "mcpServers": {
    "demo-stack": {
      "command": "node",
      "args": ["/home/mozo/demo-stack/mcp-server/src/index.js"]
    }
  }
}
```

若從筆電遠端連 honeypie：

```json
{
  "mcpServers": {
    "demo-stack": {
      "command": "ssh",
      "args": ["honeypie", "node", "/home/mozo/demo-stack/mcp-server/src/index.js"]
    }
  }
}
```

### OpenClaw

在 OpenClaw config 加入 MCP server 設定（參考 OpenClaw docs）。

## 可用工具

| Tool | 說明 |
|------|------|
| `instance_list` | 列出所有 instances + 端口 + HID |
| `instance_status` | 查詢 instance 容器狀態 |
| `instance_up` | 啟動 instance |
| `instance_down` | 停止 instance |
| `instance_restart` | 重啟 instance (down + up) |
| `instance_logs` | 查看容器 log（可指定服務和行數） |
| `instance_stat` | 查看機台 stat（mw 內部狀態） |
| `instance_config` | 查看機台 get_config |
| `smock` | 送 ebus 事件（模擬販賣機操作） |
| `mqtt_publish` | 發送 MQTT 訊息到 instance broker |
| `mqtt_subscribe` | 監聽 MQTT 訊息（短時間取樣） |
| `system_up` | 啟動 system（多 instance 組） |
| `system_down` | 停止 system |
| `ports` | 列出所有 instance 端口對照表 + 容器狀態 |

## 前置需求

- Node.js >= 18
- demo-stack 已設定（`instances/` 目錄存在）
- Docker 執行中
- `mosquitto_pub` / `mosquitto_sub`（mqtt_publish / mqtt_subscribe 需要）
