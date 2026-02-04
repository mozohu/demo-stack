#!/usr/bin/env python3
"""Manage demo GUI -> backend port mapping (REST + MQTT-WS).

Usage:
  ./scripts/ports.py list
  ./scripts/ports.py get <app>
  ./scripts/ports.py set <app> --rest <port> --mqws <port>

After set:
  ./scripts/render_maps.py
  docker compose restart frontend
"""

import argparse, json
from pathlib import Path

BASE = Path(__file__).resolve().parents[1]
APPS_JSON = BASE / 'apps.json'


def load():
    return json.loads(APPS_JSON.read_text(encoding='utf-8'))


def save(data):
    APPS_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding='utf-8')


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest='cmd', required=True)

    sub.add_parser('list')

    g = sub.add_parser('get')
    g.add_argument('app')

    s = sub.add_parser('set')
    s.add_argument('app')
    s.add_argument('--rest', type=int, required=True)
    s.add_argument('--mqws', type=int, required=True)

    a = p.parse_args()
    data = load()

    if a.cmd == 'list':
        for name in sorted(data.keys()):
            print(f"{name}\trest={data[name]['rest_port']}\tmqws={data[name]['mq_ws_port']}")
        return

    if a.cmd == 'get':
        if a.app not in data:
            raise SystemExit(f'unknown app: {a.app}')
        print(json.dumps({a.app: data[a.app]}, ensure_ascii=False, indent=2))
        return

    if a.cmd == 'set':
        if a.app not in data:
            data[a.app] = {}
        data[a.app]['rest_port'] = a.rest
        data[a.app]['mq_ws_port'] = a.mqws
        save(data)
        print(f"Updated {a.app}: rest={a.rest} mqws={a.mqws}")
        return


if __name__ == '__main__':
    main()
