#!/usr/bin/env bash
set -euo pipefail

# Generate a deterministic, per-host + per-instance HID (MAC-like) value.
#
# Algorithm:
#   input = "<hostname>:<instanceName>"
#   digest = sha256(input)
#   HID = 02:<first 5 bytes of digest>
#
# Notes:
# - Leading 0x02 makes it a locally-administered, unicast MAC address.
# - Same host+instance => same HID. Different host (hostname) => different HID.

instance="${1:-}"
if [[ -z "$instance" ]]; then
  echo "Usage: $(basename "$0") <instance-name>" >&2
  exit 2
fi

host="${HOSTNAME:-}"
if [[ -z "$host" ]]; then
  host="$(hostname)"
fi

input="${host}:${instance}"
hex="$(printf '%s' "$input" | sha256sum | awk '{print $1}')"

# Take first 10 hex chars (5 bytes)
b1=${hex:0:2}
b2=${hex:2:2}
b3=${hex:4:2}
b4=${hex:6:2}
b5=${hex:8:2}

printf '02:%s:%s:%s:%s:%s\n' "$b1" "$b2" "$b3" "$b4" "$b5"
