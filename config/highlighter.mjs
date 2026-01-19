import { tokyolight } from './themes/tokyolight.mjs'
import { tokyonight } from './themes/tokyonight.mjs'

/** @type {import("shiki").BundledLanguage[]} */
export const langs = [
  'bash',
  'css',
  'diff',
  'fish',
  'go',
  'html',
  'http',
  'javascript',
  'json',
  'lua',
  'markdown',
  'prolog',
  'rust',
  'scheme',
  'toml',
  'tsx',
  'typescript',
  'vim',
  'xml',
  'yaml',
]

export const langAlias = {
  query: 'scheme',
}

export const themeMap = {
  light: 'tokyolight',
  dark: 'tokyonight',
}

/** @type {import("shiki").Theme[]} */
export const themes = [tokyolight, tokyonight]

export const rehypeShikiOptions = {
  codeToHastOptions: {
    themes: themeMap,
  },
  highlighterOptions: {
    langAlias,
    langs,
    themes,
  },
}
