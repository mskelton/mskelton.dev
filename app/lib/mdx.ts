import fs from "fs/promises"
import path from "node:path"
import { join as pathJoin } from "path"
import shiki from "shiki"

// Shiki loads languages and themes using "fs" instead of "import", so Next.js
// doesn't bundle them into production build. To work around, we manually copy
// them over to our source code (lib/shiki/*) and update the "paths".
//
// Note that they are only referenced on server side
// See: https://github.com/shikijs/shiki/issues/138
function getShikiPath() {
  return pathJoin(process.cwd(), "lib/shiki")
}

const touched = { current: false }

// "Touch" the shiki assets so that Vercel will include them in the production
// bundle. This is required because shiki itself dynamically access these files,
// so Vercel doesn't know about them by default
function touchShikiPath() {
  if (touched.current) return // only need to do once
  fs.readdir(getShikiPath()) // fire and forget
  touched.current = true
}

export async function getHighlighter() {
  if (process.env.NODE_ENV === "production") {
    touchShikiPath()
  }

  const themePath = path.join(process.cwd(), "config/tokyonight.json")
  const theme = await shiki.loadTheme(themePath)

  return shiki.getHighlighter({
    paths:
      process.env.NODE_ENV === "production"
        ? {
            languages: `${getShikiPath()}/languages/`,
            themes: `${getShikiPath()}/themes/`,
          }
        : undefined,
    theme,
  })
}
