FROM node:16-bullseye-slim as base

###############################################################################
### BUILD THE APP #############################################################
###############################################################################
FROM base as build

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn install --immutable
RUN yarn build
RUN ls /app

###############################################################################
### INSTALL PRODUCTION DEPS ###################################################
###############################################################################
FROM base as production-deps

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn/

# Prevent the remix postinstall script from running after focusing the
# workspace. It isn't necessary at this point of the Docker build anyway.
RUN yarn config set enableScripts false
RUN yarn install --immutable
RUN yarn workspaces focus --all --production

###############################################################################
### BUILD THE PRODUCTION APP ##################################################
###############################################################################
FROM base

RUN mkdir /app
WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/public /app/public
COPY --from=build /app/server /app/server
COPY . .

CMD ["npm", "run", "start"]
