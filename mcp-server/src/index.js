#!/usr/bin/env node
/**
 * demo-stack MCP Server
 * 提供 AI agent 操作 demo-stack instances 的工具
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { execFile, spawn } from 'child_process'
import { readdir, readFile } from 'fs/promises'
import { join, resolve } from 'path'

// demo-stack 根目錄
const DEMO_ROOT = resolve(import.meta.dirname, '..', '..', 'docker', 'demo-stack')
const SCRIPTS = join(DEMO_ROOT, 'scripts')
const INSTANCES_DIR = join(DEMO_ROOT, 'instances')

// ── helpers ──────────────────────────────────────────────

function run(cmd, args = [], { timeout = 30000, cwd = DEMO_ROOT } = {}) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { cwd, timeout, maxBuffer: 1024 * 512 }, (err, stdout, stderr) => {
      if (err) {
        const msg = stderr?.trim() || err.message
        reject(new Error(`${cmd} ${args.join(' ')} failed: ${msg}`))
      } else {
        resolve((stdout + (stderr ? '\n' + stderr : '')).trim())
      }
    })
  })
}

function runScript(name, args = [], opts = {}) {
  return run(join(SCRIPTS, name), args, opts)
}

async function listInstanceNames() {
  const entries = await readdir(INSTANCES_DIR, { withFileTypes: true })
  return entries
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .sort()
}

async function readInstanceEnv(name) {
  const envPath = join(INSTANCES_DIR, name, '.env')
  const text = await readFile(envPath, 'utf-8')
  const env = {}
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 0) continue
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
  }
  return env
}

// ── MCP Server ───────────────────────────────────────────

const server = new McpServer({
  name: 'demo-stack',
  version: '0.1.0',
})

// --- instance_list ---
server.tool(
  'instance_list',
  '列出所有 demo-stack instances 及其端口、HID',
  {},
  async () => {
    const names = await listInstanceNames()
    const rows = []
    for (const name of names) {
      try {
        const env = await readInstanceEnv(name)
        rows.push({
          name: env.DEMO_NAME || name,
          hid: env.HID || '?',
          rest_port: env.REST_PORT || '?',
          mqtt_port: env.MQTT_PORT || '?',
          mqtt_ws_port: env.MQTT_WS_PORT || '?',
        })
      } catch {
        rows.push({ name, error: 'cannot read .env' })
      }
    }
    return { content: [{ type: 'text', text: JSON.stringify(rows, null, 2) }] }
  }
)

// --- instance_status ---
server.tool(
  'instance_status',
  '查詢 instance 容器狀態 (docker compose ps)',
  { instance: z.string().describe('Instance 名稱，如 zgovend, storer') },
  async ({ instance }) => {
    const out = await runScript('ps.sh', [instance])
    return { content: [{ type: 'text', text: out }] }
  }
)

// --- instance_up ---
server.tool(
  'instance_up',
  '啟動 instance',
  {
    instance: z.string().describe('Instance 名稱'),
    profile: z.enum(['local', 'prod']).default('local').describe('Image profile'),
  },
  async ({ instance, profile }) => {
    const out = await runScript('up.sh', [instance, '--profile', profile], { timeout: 120000 })
    return { content: [{ type: 'text', text: out }] }
  }
)

// --- instance_down ---
server.tool(
  'instance_down',
  '停止 instance',
  {
    instance: z.string().describe('Instance 名稱'),
  },
  async ({ instance }) => {
    const out = await runScript('down.sh', [instance], { timeout: 60000 })
    return { content: [{ type: 'text', text: out }] }
  }
)

// --- instance_restart ---
server.tool(
  'instance_restart',
  '重啟 instance (down + up)',
  {
    instance: z.string().describe('Instance 名稱'),
    profile: z.enum(['local', 'prod']).default('local').describe('Image profile'),
  },
  async ({ instance, profile }) => {
    const down = await runScript('down.sh', [instance], { timeout: 60000 })
    const up = await runScript('up.sh', [instance, '--profile', profile], { timeout: 120000 })
    return { content: [{ type: 'text', text: down + '\n' + up }] }
  }
)

// --- instance_logs ---
server.tool(
  'instance_logs',
  '查看 instance 容器 log',
  {
    instance: z.string().describe('Instance 名稱'),
    service: z.string().optional().describe('特定服務名稱（mq/smc/mw/rest/cron/gateway），留空看全部'),
    lines: z.number().default(50).describe('行數'),
  },
  async ({ instance, service, lines }) => {
    const env = await readInstanceEnv(instance)
    const envFile = join(INSTANCES_DIR, instance, '.env')
    const args = [
      'compose', '-f', 'compose.yml', '--env-file', envFile,
      'logs', '--tail', String(lines), '--no-color',
    ]
    if (service) args.push(service)
    const out = await run('docker', args, { timeout: 15000 })
    return { content: [{ type: 'text', text: out }] }
  }
)

// --- instance_stat ---
server.tool(
  'instance_stat',
  '查看機台 stat（mw 內部狀態）',
  { instance: z.string().describe('Instance 名稱') },
  async ({ instance }) => {
    const out = await runScript('stat.sh', [instance], { timeout: 15000 })
    return { content: [{ type: 'text', text: out }] }
  }
)

// --- instance_config ---
server.tool(
  'instance_config',
  '查看機台 get_config（mw 設定）',
  { instance: z.string().describe('Instance 名稱') },
  async ({ instance }) => {
    const out = await runScript('get_config.sh', [instance], { timeout: 15000 })
    return { content: [{ type: 'text', text: out }] }
  }
)

// --- smock ---
server.tool(
  'smock',
  '送 ebus 事件到 instance（模擬操作）',
  {
    instance: z.string().describe('Instance 名稱'),
    event: z.string().describe('事件名稱，如 sess/session_begin, reader/read'),
    json: z.string().optional().describe('事件 JSON 參數'),
  },
  async ({ instance, event, json }) => {
    const args = [instance, event]
    if (json) args.push(json)
    const out = await runScript('smock.sh', args, { timeout: 15000 })
    return { content: [{ type: 'text', text: out || '(no output)' }] }
  }
)

// --- mqtt_publish ---
server.tool(
  'mqtt_publish',
  '發送 MQTT 訊息到 instance broker',
  {
    instance: z.string().describe('Instance 名稱'),
    topic: z.string().describe('MQTT topic'),
    message: z.string().describe('訊息內容（通常是 JSON）'),
  },
  async ({ instance, topic, message }) => {
    const env = await readInstanceEnv(instance)
    const port = env.MQTT_PORT || '1883'
    const out = await run('mosquitto_pub', [
      '-h', '127.0.0.1', '-p', port,
      '-t', topic, '-m', message,
    ], { timeout: 10000 })
    return { content: [{ type: 'text', text: out || `Published to ${topic} on port ${port}` }] }
  }
)

// --- mqtt_subscribe ---
server.tool(
  'mqtt_subscribe',
  '監聽 MQTT 訊息（短時間取樣，預設 5 秒）',
  {
    instance: z.string().describe('Instance 名稱'),
    topic: z.string().default('#').describe('MQTT topic filter'),
    seconds: z.number().default(5).describe('監聽秒數（1-30）'),
  },
  async ({ instance, topic, seconds }) => {
    const env = await readInstanceEnv(instance)
    const port = env.MQTT_PORT || '1883'
    const sec = Math.min(Math.max(seconds, 1), 30)

    return new Promise((resolve) => {
      const messages = []
      const proc = spawn('mosquitto_sub', [
        '-h', '127.0.0.1', '-p', port,
        '-t', topic, '-v',
      ], { cwd: DEMO_ROOT })

      const timer = setTimeout(() => {
        proc.kill()
      }, sec * 1000)

      proc.stdout.on('data', (data) => {
        messages.push(data.toString().trim())
      })

      proc.on('close', () => {
        clearTimeout(timer)
        const text = messages.length
          ? messages.join('\n')
          : `(no messages in ${sec}s on topic "${topic}")`
        resolve({ content: [{ type: 'text', text }] })
      })

      proc.on('error', (err) => {
        clearTimeout(timer)
        resolve({ content: [{ type: 'text', text: `Error: ${err.message}` }] })
      })
    })
  }
)

// --- system_up ---
server.tool(
  'system_up',
  '啟動 system（多 instance 組，如 mwd-pickup）',
  {
    system: z.string().describe('System 名稱'),
    profile: z.enum(['local', 'prod']).default('prod').describe('Image profile'),
  },
  async ({ system, profile }) => {
    const out = await runScript('system_up.sh', [system, '--profile', profile], { timeout: 180000 })
    return { content: [{ type: 'text', text: out }] }
  }
)

// --- system_down ---
server.tool(
  'system_down',
  '停止 system',
  { system: z.string().describe('System 名稱') },
  async ({ system }) => {
    const out = await runScript('system_down.sh', [system], { timeout: 60000 })
    return { content: [{ type: 'text', text: out }] }
  }
)

// --- ports ---
server.tool(
  'ports',
  '列出所有 instance 的端口對照表（含容器狀態）',
  {},
  async () => {
    const out = await run('python3', [join(SCRIPTS, 'ports.py'), '--status'], { timeout: 15000 })
    return { content: [{ type: 'text', text: out }] }
  }
)


// --- heartbeat ---
server.tool(
  'heartbeat',
  '立即觸發 instance 上傳一次心跳到 MongoDB',
  {
    instance: z.string().describe('Instance 名稱'),
  },
  async ({ instance }) => {
    const out = await runScript('heartbeat.sh', [instance], { timeout: 30000 })
    return { content: [{ type: 'text', text: out || 'heartbeat sent' }] }
  }
)

// --- mediasync ---
server.tool(
  'mediasync',
  '手動觸發 instance 的 LTMS mediasync（下載資源並部署）',
  {
    instance: z.string().describe('Instance 名稱'),
  },
  async ({ instance }) => {
    const out = await runScript('mediasync.sh', [instance], { timeout: 120000 })
    return { content: [{ type: 'text', text: out || 'mediasync completed (no output)' }] }
  }
)
// ── Start ────────────────────────────────────────────────

const transport = new StdioServerTransport()
await server.connect(transport)
