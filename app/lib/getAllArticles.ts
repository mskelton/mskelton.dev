import glob from "fast-glob"
import path from "node:path"

async function importArticle(filename: string) {
  // We have to do a bit of a workaround here to ensure that `.mdx` is part of
  // the static string in the dynamic import. This is required otherwise the
  // Next.js compiler will assume that other files in the blog directory are
  // being dynamically imported which causes RSC issues with metadata.
  const { default: component, meta } = await import(
    `../../app/(main)/blog/${filename.replace(".mdx", "")}.mdx`
  )

  return {
    slug: path.dirname(filename),
    ...meta,
    component,
  }
}

export async function getAllArticles() {
  const cwd = path.join(process.cwd(), "app/(main)/blog")
  const filenames = await glob("**/*.mdx", { cwd })
  const articles = await Promise.all(filenames.map(importArticle))

  return articles.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()
  )
}
