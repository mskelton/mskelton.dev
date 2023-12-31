import { tokyolight } from "./themes/tokyolight.mjs"
import { tokyonight } from "./themes/tokyonight.mjs"

/** @type {import("shikiji").BundledLanguage[]} */
export const langs = [
  "bash",
  "css",
  "fish",
  "http",
  "javascript",
  "json",
  "lua",
  "markdown",
  "prolog",
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
