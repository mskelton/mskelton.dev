import fs from "fs/promises"
import matter from "gray-matter"
import { bundleMDX } from "mdx-bundler"
import path from "path"
import readingTime from "reading-time"
import { FrontMatter, PostFrontMatter } from "~/types/FrontMatter"
import { root } from "~/utils/files.server"

function sortByDate(a: PostFrontMatter, b: PostFrontMatter) {
  return a.date.localeCompare(b.date)
}

export async function getFileBySlug<T extends "blog" | "authors">(
  type: T,
  slug: string
) {
  const file = path.join(root, type, slug)
  const filePath = `${file}.md`
  const source = await fs.readFile(filePath, "utf8")

  const { default: remarkGfm } = await import("remark-gfm")
  const { remarkCodeTitles } = await import("./remarkCodeTitles.server")
  const { default: rehypeSlug } = await import("rehype-slug")
  const { default: rehypePrismPlus } = await import("rehype-prism-plus")
  const { default: rehypeAutolinkHeadings } = await import(
    "rehype-autolink-headings"
  )

  const codeTitles = await remarkCodeTitles()
  const { code, frontmatter } = await bundleMDX({
    source,
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        codeTitles,
      ]

      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              ariaHidden: true,
              class: "heading-link",
              tabIndex: -1,
            },
          },
        ],
        [rehypePrismPlus, { ignoreMissing: true }],
      ]

      return options
    },
  })

  return {
    frontMatter: {
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      fileName: path.basename(filePath),
      readingTime: readingTime(code),
      slug: slug || null,
    } as unknown as FrontMatter<T>,
    source: code,
  }
}

export async function getAllFilesFrontMatter() {
  const dir = path.join(root, "blog")
  const files = (await fs.readdir(dir)).map((file) => path.join(dir, file))

  const promises = files.map(async (file) => {
    const source = await fs.readFile(file, "utf8")
    const frontMatter = matter(source).data as PostFrontMatter

    return {
      ...frontMatter,
      date: new Date(frontMatter.date).toISOString(),
      slug: path.basename(file).replace(".md", ""),
    }
  })

  return (await Promise.all(promises)).sort(sortByDate)
}
