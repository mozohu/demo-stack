#!/usr/bin/env python3
"""List instance HID + port mapping by scanning instances/<name>/.env.

Usage:
  ./scripts/ports.py [--status]

Options:
  --status   Also show docker container status for rest/mq (best-effort)

This script scans:
  instances/*/.env

and prints:
  instance, HID, REST_PORT, MQTT_PORT, MQTT_WS_PORT (+ optional status columns).
"""

import argparse
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # .../demo-stack
INSTANCES_DIR = ROOT / 'instances'

ENV_KEYS = {
    'DEMO_NAME',
    'HID',
    'REST_PORT',
    'MQTT_PORT',
    'MQTT_WS_PORT',
}


def parse_env(path: Path) -> dict:
    out = {}
    for raw in path.read_text(encoding='utf-8').splitlines():
        line = raw.strip()
        if not line or line.startswith('#'):
            continue
        if '=' not in line:
            continue
        k, v = line.split('=', 1)
        k = k.strip()
        v = v.strip()
        if k in ENV_KEYS:
            out[k] = v
    if 'DEMO_NAME' not in out:
        out['DEMO_NAME'] = path.parent.name
    return out


def list_env_files() -> list[Path]:
    envs = []
    for d in sorted(INSTANCES_DIR.iterdir(), key=lambda p: p.name):
        if not d.is_dir():
            continue
        envf = d / '.env'
        if envf.exists():
            envs.append(envf)
    return envs


def docker_ps_map() -> dict:
    """Return map: container_name -> status (best-effort)."""
    try:
        out = subprocess.check_output(
            ['docker', 'ps', '--format', '{{.Names}}\t{{.Status}}'],
            text=True,
        )
    except Exception:
        return {}

    mp = {}
    for line in out.splitlines():
        parts = line.split('\t', 1)
        if len(parts) != 2:
            continue
        mp[parts[0]] = parts[1]
    return mp


def main():
    ap = argparse.ArgumentParser(add_help=True)
    ap.add_argument('--status', action='store_true', help='also show docker container status (rest/mq)')
    a = ap.parse_args()

    env_files = list_env_files()
    ps = docker_ps_map() if a.status else {}

    if a.status:
        print('instance\thid\trest_port\tmqtt_port\tmqws_port\trest\tmq')
    else:
        print('instance\thid\trest_port\tmqtt_port\tmqws_port')

    for envf in env_files:
        cfg = parse_env(envf)
        name = envf.parent.name
        hid = cfg.get('HID', '')
        rest = cfg.get('REST_PORT', '')
        mqtt = cfg.get('MQTT_PORT', '')
        mqws = cfg.get('MQTT_WS_PORT', '')

        if not a.status:
            print(f'{name}\t{hid}\t{rest}\t{mqtt}\t{mqws}')
            continue

        demo = cfg.get('DEMO_NAME', name)
        rest_c = f'{demo}-rest-1'
        mq_c = f'{demo}-mq-1'
        rest_s = ps.get(rest_c, '-')
        mq_s = ps.get(mq_c, '-')
        print(f'{name}\t{hid}\t{rest}\t{mqtt}\t{mqws}\t{rest_s}\t{mq_s}')


if __name__ == '__main__':
    main()
