# ── Stage 1: Install ALL dependencies (for building) ─────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── Stage 2: Generate Prisma client & build NestJS ───────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# ── Stage 3: Install ONLY production dependencies ────────────────────────────
FROM node:20-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ── Stage 4: Final production image ──────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

# Install postgresql-client for pg_isready in entrypoint
RUN apk add --no-cache postgresql-client

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy production node_modules
COPY --chown=appuser:appgroup --from=prod-deps /app/node_modules ./node_modules

# Copy compiled app
COPY --chown=appuser:appgroup --from=builder /app/dist ./dist

# Copy Prisma schema + generated client (needed for migrate deploy at runtime)
COPY --chown=appuser:appgroup --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --chown=appuser:appgroup --from=builder /app/prisma ./prisma

# Copy production entrypoint
COPY --chown=appuser:appgroup entrypoint.sh ./
RUN chmod +x entrypoint.sh

USER appuser

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget -qO- http://localhost:4000/health || exit 1

ENTRYPOINT ["./entrypoint.sh"]