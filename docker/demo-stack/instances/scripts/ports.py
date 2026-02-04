#!/usr/bin/env python3
"""Manage instance app mapping (hid/tz/ports) in instances/apps.json.

Usage:
  ./instances/scripts/ports.py list
  ./instances/scripts/ports.py get <app>
  ./instances/scripts/ports.py set <app> --hid <hid> [--tz TZ] [--rest PORT] [--mqtt PORT] [--mqws PORT]

Notes:
  - This does NOT automatically rewrite each instances/<app>/.env.
    It is a source-of-truth map for humans and for future automation.
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
    s.add_argument('--hid', required=True)
    s.add_argument('--tz', default=None)
    s.add_argument('--rest', type=int, default=None)
    s.add_argument('--mqtt', type=int, default=None)
    s.add_argument('--mqws', type=int, default=None)

    a = p.parse_args()
    data = load()

    if a.cmd == 'list':
        for name in sorted(data.keys()):
            v=data[name]
            print(f"{name}\thid={v.get('hid')}\trest={v.get('rest_port')}\tmqtt={v.get('mqtt_port')}\tmqws={v.get('mqtt_ws_port')}")
        return

    if a.cmd == 'get':
        if a.app not in data:
            raise SystemExit(f'unknown app: {a.app}')
        print(json.dumps({a.app: data[a.app]}, ensure_ascii=False, indent=2))
        return

    if a.cmd == 'set':
        v = data.get(a.app, {})
        v['hid'] = a.hid
        if a.tz is not None:
            v['tz'] = a.tz
        if a.rest is not None:
            v['rest_port'] = a.rest
        if a.mqtt is not None:
            v['mqtt_port'] = a.mqtt
        if a.mqws is not None:
            v['mqtt_ws_port'] = a.mqws
        data[a.app] = v
        save(data)
        print(f"Updated {a.app}")
        return


if __name__ == '__main__':
    main()
