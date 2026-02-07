#!/usr/bin/env bash
set -euo pipefail

# Apply deterministic HID (derived from hostname + instance name) into instance env files.
#
# Usage:
#   ./scripts/apply_hid_envs.sh                # apply to all instances/*/.env
#   ./scripts/apply_hid_envs.sh storer temple  # apply to specific instances
#
# This will REPLACE the line starting with "HID=" in each env file.

cd "$(dirname "$0")/.."

gen="./scripts/gen_hid.sh"
if [[ ! -x "$gen" ]]; then
  echo "Missing generator: $gen" >&2
  exit 2
fi

pick_instances() {
  if [[ $# -gt 0 ]]; then
    printf '%s\n' "$@"
  else
    # one level under instances/
    find instances -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort
  fi
}

instances=( $(pick_instances "$@") )

for inst in "${instances[@]}"; do
  envf="instances/${inst}/.env"
  if [[ ! -f "$envf" ]]; then
    echo "[SKIP] $inst: no $envf" >&2
    continue
  fi
  hid="$($gen "$inst")"

  if grep -q '^HID=' "$envf"; then
    # in-place replace
    sed -i -E "s/^HID=.*/HID=${hid}/" "$envf"
  else
    # append near the top
    printf '\nHID=%s\n' "$hid" >> "$envf"
  fi

  echo "[OK] $inst -> HID=$hid"
done
