#!/usr/bin/env bash
set -euo pipefail

# Push demo-stack images to Docker Hub under user: mozohu
# Usage examples:
#   ./scripts/push-demo-stack-dockerhub.sh
#   TAG=2026-02-06 ./scripts/push-demo-stack-dockerhub.sh
#   COMPOSE_FILE=docker-compose.yml PROJECT=demo-stack ./scripts/push-demo-stack-dockerhub.sh

DOCKERHUB_USER="mozohu"
PROJECT="${PROJECT:-demo-stack}"
TAG="${TAG:-latest}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.yml}"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker not found" >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "docker compose not available (need Docker Compose v2)" >&2
  exit 1
fi

if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "Compose file not found: $COMPOSE_FILE" >&2
  echo "Set COMPOSE_FILE=... to point at your compose file." >&2
  exit 1
fi

echo "==> Using: DOCKERHUB_USER=$DOCKERHUB_USER PROJECT=$PROJECT TAG=$TAG COMPOSE_FILE=$COMPOSE_FILE"

# Optional: load .env automatically if present (so compose variables resolve)
ENV_FILE="${ENV_FILE:-.env}"
if [[ -f "$ENV_FILE" ]]; then
  echo "==> Loading env file: $ENV_FILE"
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

# 1) Build all services (NOTE: this compose.yml may not have build: sections; build might do nothing)
echo "==> Running: docker compose build (safe even if no build sections)"
docker compose -p "$PROJECT" -f "$COMPOSE_FILE" build

# 2) Determine the images referenced by the compose config.
# docker compose images only lists created containers; for pure 'image:' services it can be empty.
images=()
mapfile -t images < <(docker compose -p "$PROJECT" -f "$COMPOSE_FILE" config --images 2>/dev/null | sort -u)

if [[ ${#images[@]} -eq 0 ]]; then
  echo "No images found from 'docker compose config --images'." >&2
  echo "If your compose file uses variables, provide them via ENV_FILE=.env or env vars." >&2
  echo "Try: docker compose -p $PROJECT -f $COMPOSE_FILE config --images" >&2
  exit 1
fi

echo "==> Images referenced by compose:"
printf ' - %s\n' "${images[@]}"

# 3) Tag + push each image under mozohu/<service-or-repo>:<TAG>
# We keep the last path component of the repository name.
# Examples:
#   demo-stack-web:latest  -> mozohu/demo-stack-web:latest
#   someorg/demo-stack-api:dev -> mozohu/demo-stack-api:latest (TAG overrides)

echo "==> Tagging & pushing to Docker Hub (you must be logged in: docker login)"
echo "    Tip: set PUSH_FILTER='^mwd-storer-' to only push your custom images."

PUSH_FILTER="${PUSH_FILTER:-}"

default_skips=(
  "eclipse-mosquitto"
  "haproxy"
)

pulldown=()

for src in "${images[@]}"; do
  src_repo="${src%:*}"
  base_repo="${src_repo##*/}"

  # Skip common upstream/base images unless user explicitly requests otherwise
  skip=false
  for s in "${default_skips[@]}"; do
    if [[ "$src_repo" == "$s" || "$base_repo" == "$s" ]]; then
      skip=true
    fi
  done
  if [[ "$skip" == true ]]; then
    echo "~~> Skipping upstream image: $src"
    continue
  fi

  if [[ -n "$PUSH_FILTER" ]] && ! [[ "$base_repo" =~ $PUSH_FILTER ]]; then
    echo "~~> Skipping (does not match PUSH_FILTER): $src"
    continue
  fi

  # Ensure the image exists locally
  if ! docker image inspect "$src" >/dev/null 2>&1; then
    echo "!!> Local image not found: $src" >&2
    echo "    If it's a remote image, pull it first: docker pull $src" >&2
    echo "    If it's built elsewhere, build/tag it locally first." >&2
    exit 1
  fi

  dst_repo="$DOCKERHUB_USER/$base_repo:$TAG"

  echo "--> $src  =>  $dst_repo"
  docker tag "$src" "$dst_repo"
  docker push "$dst_repo"
  pulldown+=("docker pull $dst_repo")
done

if [[ ${#pulldown[@]} -eq 0 ]]; then
  echo "==> Nothing pushed (all images skipped)." >&2
  echo "    You can set e.g. PUSH_FILTER='^mwd-storer-'" >&2
  exit 2
fi

echo "==> Done. Pulldown examples on a new host:"
printf ' - %s\n' "${pulldown[@]}"
