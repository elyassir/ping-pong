#!/bin/sh
set -e

echo "⏳ Waiting for PostgreSQL to be ready..."

# Use pg_isready for a deterministic health check instead of sleep
until pg_isready -h "${DB_HOST:-db}" -p "${DB_PORT:-5432}" -U "${POSTGRES_USER}"; do
  echo "  PostgreSQL not ready — retrying in 2s..."
  sleep 2
done

echo "✅ PostgreSQL is ready."

echo "🔄 Running database migrations..."
# migrate deploy is idempotent and production-safe (never prompts, no shadow DB)
npx prisma migrate deploy

echo "🚀 Starting NestJS application in ${NODE_ENV:-production} mode..."
if [ "$NODE_ENV" = "development" ]; then
  exec npm run start:dev
else
  exec node dist/main
fi
