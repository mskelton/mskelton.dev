# mskelton.dev

[![Build](https://github.com/mskelton/mskelton.dev/actions/workflows/build.yml/badge.svg)](https://github.com/mskelton/mskelton.dev/actions/workflows/build.yml)

Welcome to the source code for my website!

## Installing

Dependencies are managed with [Yarn](https://yarnpkg.com) and can be installed
with the `yarn` command.

```bash
yarn
```

## Starting the Dev Server

To start the dev server on [localhost:3000](http://localhost:3000), run the
following command.

```bash
yarn dev
```

## Linting

To lint the project with [ESLint](https://eslint.org), run the following
command.

```bash
yarn lint
```

## Type Checking

Type checking the project can be done by running the following command.

_See the
[TypeScript docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
for a full list of CLI options that can be passed to this command._

```bash
# Run TypeScript once
yarn ts

# Run TypeScript in watch mode
yarn ts -w
```

## Testing

End-to-end tests utilize [Playwright](https://playwright.dev) and can be run
with the following command. If the dev server is not running locally, Playwright
will automatically start it for the duration of the tests.

_See the [Playwright docs](https://playwright.dev/docs/test-cli) for a full list
of CLI options that can be passed to this command._

```bash
# Run all tests
yarn test

# Run test files matching "home"
yarn test home
```

## Deployment

My website is hosted on [Fly.io](https://fly.io). To deploy to fly, first
install the flyctl with Homebrew.

```sh
brew install superfly/tap/flyctl
```

### Redis

Redis does not need to be redeployed often, but if you need to redeploy it, use
the following command.

```sh
fly deploy --config redis/fly.toml
```
