#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  cat >&2 <<'EOF'
Run serverproperty.pl inside an instance's cron container.

Usage:
  ./scripts/serverproperty.sh <instance> [--install-deps] [-- <extra args>]

Examples:
  ./scripts/serverproperty.sh storer
  ./scripts/serverproperty.sh retriever
  ./scripts/serverproperty.sh storer-ng

  # If Logger::Syslog is missing in the cron image, install it first:
  ./scripts/serverproperty.sh storer-ng --install-deps

Notes:
  - Executes: /opt/app/scripts/test/serverproperty.pl -r
  - Uses docker compose with the instance env file.
EOF
}

if [[ $# -lt 1 || ${1:-} == "-h" || ${1:-} == "--help" ]]; then
  usage
  exit 0
fi

instance="$1"
shift || true

install_deps=false
if [[ ${1:-} == "--install-deps" ]]; then
  install_deps=true
  shift
fi

envfile="instances/${instance}/.env"
if [[ ! -f "$envfile" ]]; then
  echo "Missing env file: $envfile" >&2
  exit 2
fi

extra_args=()
if [[ ${1:-} == "--" ]]; then
  shift
  while [[ $# -gt 0 ]]; do
    extra_args+=("$1")
    shift
  done
fi

echo "==> instance: $instance"

if [[ "$install_deps" == "true" ]]; then
  echo "==> installing deps in cron container (apt-get): liblogger-syslog-perl"
  docker compose -f compose.yml --env-file "$envfile" exec -T cron \
    bash -lc 'apt-get update -y && DEBIAN_FRONTEND=noninteractive apt-get install -y liblogger-syslog-perl >/dev/null'
fi

docker compose -f compose.yml --env-file "$envfile" exec -T cron \
  bash -lc "/opt/app/scripts/test/serverproperty.pl -r ${extra_args[*]:-}"
