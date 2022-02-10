FROM node:16-bullseye-slim as base

FROM base as deps
RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock .yarnrc.yml .yarn ./
RUN yarn install --immutable

# Setup production node_modules
FROM base as production-deps
RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock .yarnrc.yml .yarn ./
RUN yarn install --immutable
RUN yarn workspaces focus --all --production

# Build the app
FROM base as build
RUN mkdir /app
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base
RUN mkdir /app
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .
CMD ["npm", "run", "start"]
