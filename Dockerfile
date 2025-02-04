FROM node:20-slim AS base

# Pre-requisites for libsql
RUN apt-get update && apt-get install -y ca-certificates

# We use Turso as the primary DB with the file-system DB setup as a
# read-replica. Because my site is deployed as a single machine, I don't
# have to worry about the read-replica being out of sync with the primary.
ENV DATABASE_URL "file:/app/data/mskelton.db"

# https://github.com/nodejs/corepack/issues/612
ENV COREPACK_INTEGRITY_KEYS 0

# Install dependencies only when needed
FROM base AS deps

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build time environment variables
ARG NEXT_PUBLIC_GA_ID

# Build the app
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permissions for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Create the DB data directory and set the correct permissions
RUN mkdir /app/data
RUN chown nextjs:nodejs /app/data

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/app/api-reference/next-config-js/output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
