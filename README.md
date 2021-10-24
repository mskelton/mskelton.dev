# mskelton.dev

Welcome to the source code for my website!

## Installing

Dependencies are managed with [Yarn](https://yarnpkg.com) and can be installed
with the `yarn` command.

```sh
yarn
```

## Starting the Dev Server

To start the dev server on [localhost:3000](http://localhost:3000), run the
following command.

```sh
yarn dev
```

## Project Validation

This project has several forms of project validation configured including
linting, type checking, and end-to-end testing.

### Linting

To lint the project with [ESLint](), run the following command.

_See the
[ESLint docs](https://eslint.org/docs/user-guide/command-line-interface) for a
full list of CLI options that can be passed to this command._

```sh
yarn lint
```

### Type Checking

Type checking the project can be done by running the following command.

_See the
[TypeScript docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
for a full list of CLI options that can be passed to this command._

```sh
# Run TypeScript once
yarn ts

# Run TypeScript in watch mode
yarn ts -w
```

### Testing

End-to-end tests utilize [Playwright](https://playwright.dev) and can be run
with the following command. If the dev server is not running locally, Playwright
will automatically start it for the duration of the tests.

_See the [Playwright docs](https://playwright.dev/docs/test-cli) for a full list
of CLI options that can be passed to this command._

```sh
# Run all tests
yarn test

# Run test files matching "home"
yarn test home
```
