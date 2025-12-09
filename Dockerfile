FROM node:20-slim AS base

# Pre-requisites for libsql
RUN apt-get update && apt-get install -y ca-certificates

ENV DATABASE_FILENAME="/app/data/mskelton.db"

FROM base AS builder
WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

# Build time environment variables
ARG NEXT_PUBLIC_GA_ID

# Build the app
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

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

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
