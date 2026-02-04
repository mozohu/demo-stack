#!/usr/bin/env python3
"""Convenience wrapper: manage mapping via instances/apps.json.

This script simply delegates to ../instances/scripts/ports.py.

Usage:
  ./scripts/ports.py list|get|set ...
"""

import subprocess
from pathlib import Path

BASE = Path(__file__).resolve().parents[1]
CMD = [str(BASE.parent / 'instances' / 'scripts' / 'ports.py')]

raise SystemExit(subprocess.call(CMD + __import__('sys').argv[1:]))
