import glob from "fast-glob"
import * as path from "path"

async function importArticle(filename: string) {
  const { default: component, meta } = await import(`../pages/blog/${filename}`)

  return {
    slug: filename.replace(/(\/index)?\.mdx$/, ""),
    ...meta,
    component,
  }
}

export async function getAllArticles() {
  const cwd = path.join(process.cwd(), "src/pages/blog")
  const filenames = await glob(["*.mdx", "*/index.mdx"], { cwd })
  const articles = await Promise.all(filenames.map(importArticle))

  return articles.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()
  )
}