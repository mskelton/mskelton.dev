import { tokyolight } from "./themes/tokyolight.mjs"
import { tokyonight } from "./themes/tokyonight.mjs"

/** @type {import("shiki").BundledLanguage[]} */
export const langs = [
  "bash",
  "css",
  "fish",
  "go",
  "http",
  "javascript",
  "json",
  "lua",
  "markdown",
  "prolog",
  "rust",
  "tsx",
  "typescript",
  "vim",
  "xml",
  "yaml",
]

export const themeMap = {
  light: "tokyolight",
  dark: "tokyonight",
}

export const themes = [tokyolight, tokyonight]
