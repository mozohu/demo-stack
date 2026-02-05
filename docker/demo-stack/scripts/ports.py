#!/usr/bin/env python3
"""Convenience wrapper: manage instance app mapping via instances/apps.json.

Canonical implementation lives at:
  instances/scripts/ports.py

Usage:
  ./scripts/ports.py list
  ./scripts/ports.py get <app>
  ./scripts/ports.py set <app> --hid <hid> [--tz TZ] [--rest PORT] [--mqtt PORT] [--mqws PORT]
"""

import subprocess
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parents[1]
CMD = [str(BASE / 'instances' / 'scripts' / 'ports.py')]

raise SystemExit(subprocess.call(CMD + sys.argv[1:]))
