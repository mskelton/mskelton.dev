FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
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

# Public environment variables
ARG NEXT_PUBLIC_GA_ID

# Build the app
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Install LiteFS and SQLite3
RUN apk add ca-certificates fuse3 sqlite

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set environment variables for Next.js
ENV PORT 3000
ENV HOSTNAME "127.0.0.1"
ENV NODE_ENV production
ENV DATABASE_URL "file:/litefs/mskelton.dev.db"

# Copy LiteFS binary
COPY --from=flyio/litefs:0.5 /usr/local/bin/litefs /usr/local/bin/litefs

# Move the appropriate LiteFS config files to /etc
COPY etc/fuse.conf /etc/fuse.conf
COPY etc/litefs.yml /etc/litefs.yml

# Copy Prisma migrations
COPY prisma /app/prisma

# Run as a non-root user
# TODO
# USER nextjs

# Expose port 8080 that LiteFS will listen on
EXPOSE 8080

# Run LiteFS as the entrypoint. After it has connected and sync'd with the
# cluster, it will run the commands listed in the "exec" field of the config.
ENTRYPOINT litefs mount
