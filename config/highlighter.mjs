import shiki from "shiki"

export async function getHighlighter(path) {
  return shiki.getHighlighter({
    theme: await shiki.loadTheme(path),
  })
}
