import fs from "fs"
import matter from "gray-matter"
import { bundleMDX } from "mdx-bundler"
import path from "path"
import readingTime from "reading-time"
import { FrontMatter, PostFrontMatter } from "~/types/FrontMatter"
import { root } from "~/utils/files.server"

export function getFiles() {
  const prefixPaths = path.join(root, "data/blog")
  return fs.promises.readdir(prefixPaths)
}

export function formatSlug(slug: string) {
  return slug.replace(/\.mdx?/, "")
}

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFileBySlug<T extends "blog" | "authors">(
  type: T,
  slug: string
) {
  const file = path.join(root, "data", type, slug)
  const filePath = fs.existsSync(`${file}.mdx`) ? `${file}.mdx` : `${file}.md`
  const source = fs.readFileSync(filePath, "utf8")

  const { default: remarkGfm } = await import("remark-gfm")
  const { remarkCodeTitles } = await import("./remarkCodeTitles.server")
  const { default: rehypeSlug } = await import("rehype-slug")
  const { default: rehypePrismPlus } = await import("rehype-prism-plus")
  const { default: rehypeAutolinkHeadings } = await import(
    "rehype-autolink-headings"
  )

  const codeTitles = await remarkCodeTitles()
  const { code, frontmatter } = await bundleMDX({
    cwd: path.join(root, "components"),
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
  const dir = path.join(root, "data/blog")
  const files = fs.readdirSync(dir).map((file) => path.join(dir, file))
  const allFrontMatter: PostFrontMatter[] = []

  files.forEach((file) => {
    const fileName = path.basename(file)
    const source = fs.readFileSync(file, "utf8")
    const frontMatter = matter(source).data as PostFrontMatter

    allFrontMatter.push({
      ...frontMatter,
      date: new Date(frontMatter.date).toISOString(),
      slug: formatSlug(fileName),
    })
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
