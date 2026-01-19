// @ts-check

import mskelton from '@mskelton/eslint-config'
import localRules from './eslint-rules/index.js'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...mskelton.recommended,
  {
    ignores: ['.next/', 'public/'],
  },
  {
    plugins: {
      'local-rules': localRules,
    },
    rules: {
      'sort/imports': 'off',
    },
  },
  {
    ...mskelton.react,
    files: ['app/**', 'components/**'],
    rules: {
      'local-rules/no-unescaped-quotes': 'error',
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    files: ['config/**'],
    rules: {
      'sort/object-properties': 'off',
    },
  },
  {
    ...mskelton.playwright,
    files: ['e2e/**'],
  },
]
