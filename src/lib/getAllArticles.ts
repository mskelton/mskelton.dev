import glob from "fast-glob"
import path from "node:path"

async function importArticle(filename: string) {
  const { default: component, meta } = await import(
    `../../app/(header)/blog/${filename}`
  )

  return {
    slug: path.dirname(filename),
    ...meta,
    component,
  }
}

export async function getAllArticles() {
  const cwd = path.join(process.cwd(), "app/(header)/blog")
  const filenames = await glob("**/*.mdx", { cwd })
  const articles = await Promise.all(filenames.map(importArticle))

  return articles.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()
  )
}
