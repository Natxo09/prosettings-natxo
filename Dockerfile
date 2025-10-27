# Base image with Node.js 20
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
# These will be available during build time only
ARG STEAM_API_KEY
ARG STEAM_ID_64
ARG FACEIT_API_KEY
ARG LEETIFY_API_KEY
ARG STEAM_COOKIES

ENV STEAM_API_KEY=${STEAM_API_KEY}
ENV STEAM_ID_64=${STEAM_ID_64}
ENV FACEIT_API_KEY=${FACEIT_API_KEY}
ENV LEETIFY_API_KEY=${LEETIFY_API_KEY}
ENV STEAM_COOKIES=${STEAM_COOKIES}
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
