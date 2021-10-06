import fs from "fs"
import matter from "gray-matter"
import path from "path"

export type BlogPost = Record<
  "content" | "date" | "excerpt" | "slug" | "title",
  string
>

const postsDirectory = path.join(process.cwd(), "src/posts")

export function getPostSlugs() {
  return fs.promises.readdir(postsDirectory)
}

export async function getPostBySlug<T extends keyof BlogPost>(
  slug: string,
  fields: T[] = []
): Promise<Pick<BlogPost, T>> {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = path.join(postsDirectory, `${realSlug}.md`)
  const fileContents = await fs.promises.readFile(fullPath, "utf8")
  const { content, data } = matter(fileContents)

  const post: Record<string, unknown> = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      post[field] = realSlug
    }

    if (field === "content") {
      post[field] = content
    }

    if (typeof data[field] !== "undefined") {
      post[field] = data[field]
    }
  })

  return post as Pick<BlogPost, T>
}

export async function getPosts<T extends Exclude<keyof BlogPost, "date">>(
  count: number,
  fields: T[] = []
) {
  const slugs = await getPostSlugs()
  const posts = await Promise.all(
    slugs
      .slice(0, count)
      .map((slug) => getPostBySlug(slug, [...fields, "date"]))
  )

  // Sort posts by date in descending order
  return posts.sort((post1, post2) =>
    new Date(post1.date) > new Date(post2.date) ? -1 : 1
  )
}
