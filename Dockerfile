# Multi-stage Dockerfile for Next.js 14 (App Router)
# Memory-efficient build that handles the 700MB /public/wp-images/ folder
# without exhausting small VPS RAM.

# ── Stage 1: deps — install only production deps for runtime ────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ── Stage 2: builder — build the Next.js app ────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
# Reuse already-installed node_modules (saves time + RAM)
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# ── Stage 3: runner — minimal runtime image ─────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy only what's needed to run
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/i18n ./i18n
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/middleware.js ./middleware.js
COPY --from=builder /app/wp-data ./wp-data

EXPOSE 3000
CMD ["npm", "start"]
