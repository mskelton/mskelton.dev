---
title: Automating npm Package Releases
summary:
  Releasing npm packages can be a challenge. There are often many steps in the
  process and forgetting a step can result in a package being released
  incorrectly. In this article, I will show how to implement semantic-release in
  your project to fully automate your npm package releases.
tags: [npm, semantic-release]
date: "2020-05-25"
---

semantic-release is a tool which fully automates the process of releasing your
code to the world. It determines the next version based on the commit messages
(e.g. `fix`, `feat`) giving you full control over the next version but still
automating the release process. This short article shows how to setup
semantic-release for an npm package using GitHub Actions.

First, create a GitHub Action which calls `npx semantic-release` (or
`yarn semantic-release` if you use Yarn). This should be run after any other
pre-release steps such as `npm run build` and `npm test`.

```yml:.github/workflows/release.yml
name: Release
on: [push]
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Next, update your package changelog to indicate that change notes can be viewed
on the releases tab.

```md:CHANGELOG.md
# Changelog

The changelog is automatically updated using
[semantic-release](https://github.com/semantic-release/semantic-release). You
can see it on the [releases page](../../releases).
```

Finally, update the version in your package.json to something that indicates
your package is versioned using semantic release.

```json:package.json
"version": "0.0.0-semantically-released"
```

That's it! Your package is now being automatically released via
semantic-release!

_For more details, checkout the
[semantic-release docs](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/github-actions.md#using-semantic-release-with-github-actions)._
