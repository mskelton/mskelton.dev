# mskelton.dev

[![Build](https://github.com/mskelton/mskelton.dev/actions/workflows/build.yml/badge.svg)](https://github.com/mskelton/mskelton.dev/actions/workflows/build.yml)
[![Playwright Tests](https://github.com/mskelton/mskelton.dev/actions/workflows/e2e.yml/badge.svg)](https://github.com/mskelton/mskelton.dev/actions/workflows/e2e.yml)

Welcome to my personal website!

## Installing

Dependencies are managed with [pnpm](https://pnpm.io) and can be installed with
the `pnpm install` command.

```bash
pnpm install
```

## Starting the Dev Server

To start the dev server on [localhost:3000](http://localhost:3000), run the
following command.

```bash
pnpm dev
```

## Linting

To lint the project with [ESLint](https://eslint.org), run the following
command.

```bash
pnpm lint
```

## Type Checking

Type checking the project can be done by running the following command.

_See the
[TypeScript docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
for a full list of CLI options that can be passed to this command._

```bash
# Run TypeScript once
pnpm ts

# Run TypeScript in watch mode
pnpm ts -w
```

## Testing

End-to-end tests utilize [Playwright](https://playwright.dev) and can be run
with the following command. If the dev server is not running locally, Playwright
will automatically start it for the duration of the tests.

_See the [Playwright docs](https://playwright.dev/docs/test-cli) for a full list
of CLI options that can be passed to this command._

```bash
# Run all tests
pnpm test

# Run test files matching "home"
pnpm test home
```

## License

This project is open for contribution but the source code itself uses a
commercial template and is therefore not licensed under any open-source license.
Forking this project as a base for your own projects is not permitted under the
license of the original template.
