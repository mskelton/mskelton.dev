import matter from "gray-matter"
import { bundleMDX } from "mdx-bundler"
import path from "path"
import readingTime from "reading-time"
import { provider } from "~/providers/provider.server"
import { PostFrontMatter } from "~/types/posts"

export async function getPostBySlug(slug: string) {
  const { name, source } = await provider.getPost(slug)

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
      filePath: `content/${name}`,
      readingTime: readingTime(code),
      slug: slug || null,
    } as unknown as PostFrontMatter,
    source: code,
  }
}

function sortByDate(a: PostFrontMatter, b: PostFrontMatter) {
  return b.date.localeCompare(a.date)
}

export async function getAllPostsFrontMatter() {
  return (await provider.getAllPosts())
    .map(({ name, source }) => {
      const frontMatter = matter(source).data as PostFrontMatter

      return {
        ...frontMatter,
        date: new Date(frontMatter.date).toISOString(),
        slug: path.basename(name).replace(".md", ""),
      }
    })
    .sort(sortByDate)
}
