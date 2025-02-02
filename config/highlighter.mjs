import { tokyolight } from "./themes/tokyolight.mjs"
import { tokyonight } from "./themes/tokyonight.mjs"

/** @type {import("shiki").BundledLanguage[]} */
export const langs = [
  "bash",
  "css",
  "diff",
  "fish",
  "go",
  "html",
  "http",
  "javascript",
  "json",
  "lua",
  "markdown",
  "prolog",
  "rust",
  "scheme",
  "toml",
  "tsx",
  "typescript",
  "vim",
  "xml",
  "yaml",
]

export const langAlias = {
  query: "scheme",
}

export const themeMap = {
  light: "tokyolight",
  dark: "tokyonight",
}

export const themes = [tokyolight, tokyonight]
