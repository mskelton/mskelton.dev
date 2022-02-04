import fs from "fs/promises"
import matter from "gray-matter"
import path from "path"
import slugify from "slugify"
import { PostFrontMatter } from "~/types/FrontMatter"
import { root } from "~/utils/files.server"

export async function getAllTags() {
  const files = await fs.readdir(path.join(root, "blog"))
  const sources = await Promise.all(
    files.map((file) => fs.readFile(path.join(root, "blog", file), "utf8"))
  )

  return sources.reduce<Record<string, number>>((acc, source) => {
    const data = matter(source).data as PostFrontMatter

    data.tags?.forEach((tag) => {
      const slug = slugify(tag)
      acc[slug] ??= 0
      acc[slug]++
    })

    return acc
  }, {})
}
