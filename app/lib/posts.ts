import glob from "fast-glob"
import fs from "node:fs/promises"
import path from "node:path"
import { PostMeta } from "components/layouts/PostLayout"

interface Post extends PostMeta {
  component: React.ComponentType
  slug: string
}

async function getPost(slug: string): Promise<Post> {
  // We have to do a bit of a workaround here to ensure that `.mdx` is part of
  // the static string in the dynamic import. This is required otherwise the
  // Next.js compiler will assume that other files in the blog directory are
  // being dynamically imported which causes RSC issues with metadata.
  const { default: component, meta } = await import(
    `../../app/(main)/blog/posts/${slug}.mdx`
  )

  return { ...meta, component, slug }
}

export async function getAllPostSlugs() {
  const cwd = path.join(process.cwd(), "app/(main)/blog/posts")
  const filenames = await glob("*.mdx", { cwd })

  return filenames.map((file) => path.basename(file, path.extname(file)))
}

export async function getAllPosts() {
  const slugs = await getAllPostSlugs()
  const posts = await Promise.all(slugs.map(getPost))

  return posts.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime(),
  )
}

export async function getPostImage(slug: string) {
  const imagePath = path.join(
    process.cwd(),
    `app/(main)/blog/images/${slug}.png`,
  )

  if (await fs.stat(imagePath).catch(() => null)) {
    return fs.readFile(imagePath)
  }

  return fs.readFile(path.join(process.cwd(), "public/logo.jpg"))
}
