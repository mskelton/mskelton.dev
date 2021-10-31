---
title: Auto Formatting Code Using Prettier and GitHub Actions
summary:
  Learn how to configure a GitHub workflow to auto format your code using
  Prettier.
tags: [prettier, github-actions]
date: "2020-04-11"
---

Prettier is a very popular code formatter which uses very opinionated but
sensible styles to format your code and prevent the ongoing debates about code
styles. When implementing Prettier into a project, the typical approach is to
setup a pre-commit hook using a tool such as
[lint-staged](https://github.com/okonet/lint-staged) which will run Prettier on
your staged files prior to committing. While this works well in most cases,
there are a number of challenges with this approach.

1. Non-staged files are not formatted. When changes are made to Prettier
   configuration or Prettier is updated, untouched files will not be formatted
   unless you manually run Prettier.
1. Pre-commit steps can be skipped. Running `git commit --no-verify` will commit
   code without running pre-commit hooks which can result in files not being
   formatted.
1. Pre-commit steps are slow. Running tasks like Prettier during pre-commit adds
   additional time when committing files due to Prettier having to format each
   file that is staged.

## Finding a Better Way

Recently, a few of my coworkers implemented a tool called
[Spotless](https://github.com/diffplug/spotless) into a number of projects to
automatically format Java code in our CI pipeline. I was quite intrigued by the
concept of automatically formatting code in CI that I pondered if a similar
process could be done using Prettier and GitHub Actions for JavaScript projects.
_Spoiler alert, it works!_

After a few Google searches, I came across
[GitHub Prettier Action](https://github.com/creyD/prettier_action) which formats
your code using Prettier and commits any changes files when finished. While this
looked like it would be the solution, it doesn't use the version of Prettier
specified in your dependencies meaning that local formatting changes applied by
your editor or by running Prettier manually could get changed by the CI build if
the versions differed. While this could be resolved by always keeping the
version of Prettier in your npm dependencies and the GitHub action in sync, this
adds extra work that needs to be done when updating dependencies.

So, while the Prettier Action is not the best solution, there is another
solution that is just as easy to implement! This solution utilizes the
[git-auto-commit-action](https://github.com/stefanzweifel/git-auto-commit-action)
alongside whatever formatting script you have in your repository. For example,
my repository has the following script to format using Prettier.

```json:package.json
"format": "prettier --write ."
```

To setup the GitHub action, all we need to do is install our dependencies (e.g.
`npm ci`), run our format script (e.g. `npm run format`), and then commit any
changes if necessary.

```yml:.github/workflows/format.yml
name: Format
on:
  pull_request:
    branches: [main]
jobs:
  format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          ref: ${{ github.head_ref }}
      - uses: actions/setup-node@v2
        with:
          node-version: "14.x"
      - run: npm ci
      - run: npm run format
      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: Apply formatting changes
          branch: ${{ github.head_ref }}
```

## Conclusion

By utilizing GitHub Actions for automatically formatting with Prettier, we were
able to eliminate all three issues described at the beginning of this article.
While the example I showed only performed formatting with Prettier, you could
also run ESLint, stylelint, or any other formatting tool you use as part of the
GitHub action!

If you are interested in the source code for this post, check out the example
repository I put together using the link below. God bless and happy coding!
