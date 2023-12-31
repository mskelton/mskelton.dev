import { tokyonight } from "./themes/tokyonight.js"

/** @type {import("shikiji").BundledLanguage[]} */
export const langs = [
  "bash",
  "css",
  "http",
  "javascript",
  "json",
  "markdown",
  "prolog",
  "tsx",
  "typescript",
  "yaml",
]

export const themeMap = {
  light: "github-light",
  dark: "github-dark",
}

export const themes = ["github-light", "github-dark", tokyonight]
