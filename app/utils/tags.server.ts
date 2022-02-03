import fs from "fs"
import matter from "gray-matter"
import path from "path"
import slugify from "slugify"
import { PostFrontMatter } from "~/types/FrontMatter"
import { root } from "~/utils/files.server"
import { getFiles } from "~/utils/mdx.server"

export async function getAllTags() {
  const files = await getFiles()
  const tagCount: Record<string, number> = {}

  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, "blog", file), "utf8")
    const data = matter(source).data as PostFrontMatter

    data.tags?.forEach((tag) => {
      const formattedTag = slugify(tag)
      tagCount[formattedTag] ??= 0
      tagCount[formattedTag]++
    })
  })

  return tagCount
}
