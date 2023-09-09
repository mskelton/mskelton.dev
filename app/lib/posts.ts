import glob from "fast-glob"
import path from "node:path"

async function getPost(filename: string) {
  const slug = path.basename(filename, path.extname(filename))

  // We have to do a bit of a workaround here to ensure that `.mdx` is part of
  // the static string in the dynamic import. This is required otherwise the
  // Next.js compiler will assume that other files in the blog directory are
  // being dynamically imported which causes RSC issues with metadata.
  const { default: component, meta } = await import(
    `../../app/(main)/blog/posts/${slug}.mdx`
  )

  return { ...meta, component, slug }
}

export async function getAllPosts() {
  const cwd = path.join(process.cwd(), "app/(main)/blog/posts")
  const filenames = await glob("*.mdx", { cwd })
  const posts = await Promise.all(filenames.map(getPost))

  return posts.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime(),
  )
}
