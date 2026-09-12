#!/usr/bin/env bash
# Publica la web en IONOS.
#   npm run deploy          → compila y sube solo lo que ha cambiado
#   npm run deploy:dry      → enseña qué subiría, sin subir nada
# Configuración en .env (ver .env.example). Nunca guardar contraseñas en el repositorio.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -f .env ]; then set -a; . ./.env; set +a; fi
: "${DEPLOY_HOST:?Falta DEPLOY_HOST en .env (alias de ~/.ssh/config o usuario@servidor)}"
: "${DEPLOY_DIR:?Falta DEPLOY_DIR en .env (carpeta remota, ruta absoluta)}"

DRY=""
if [ "${1:-}" = "--dry-run" ]; then DRY="--dry-run"; echo "▶ Simulación: no se sube nada."; fi

echo "▶ Compilando…"
npm run build --silent

echo "▶ Subiendo dist/ a $DEPLOY_HOST:$DEPLOY_DIR"
ssh "$DEPLOY_HOST" "mkdir -p '$DEPLOY_DIR'"
rsync -rlptz --delete $DRY \
  --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r \
  --exclude '.DS_Store' \
  -e ssh dist/ "$DEPLOY_HOST:$DEPLOY_DIR/"

if [ -z "$DRY" ]; then
  echo "▶ Comprobando…"
  ssh "$DEPLOY_HOST" "ls '$DEPLOY_DIR' | tr '\n' ' '"; echo
  if [ -n "${DEPLOY_URL:-}" ]; then
    code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$DEPLOY_URL/" || true)
    echo "▶ $DEPLOY_URL responde $code"
  fi
  echo "✔ Publicado $(date '+%d/%m/%Y %H:%M')"
fi
