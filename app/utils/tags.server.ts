import slugify from "slugify"
import { getAllPostsFrontMatter } from "./mdx.server"

export async function getAllTags() {
  const posts = await getAllPostsFrontMatter()

  return posts.reduce<Record<string, number>>((acc, post) => {
    post.tags.forEach((tag) => {
      const slug = slugify(tag)
      acc[slug] ??= 0
      acc[slug]++
    })

    return acc
  }, {})
}
