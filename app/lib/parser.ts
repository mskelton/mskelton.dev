import matter from "gray-matter"
import remarkParse from "remark-parse"
import { unified } from "unified"
import { ByteMeta } from "(main)/bytes/types"
import remarkStringify from "../../config/remark-stringify.mjs"

export const toSlug = (file: string) =>
  file.replace(/\.md$/, "").split("/").at(-1) ?? ""

export function getFrontmatter(source: string) {
  const { content, data } = matter(source)
  const meta = data as ByteMeta
  const tags = Array.isArray(meta.tags) ? meta.tags : [meta.tags]

  return {
    content,
    meta: {
      ...meta,
      tags,
    },
  }
}

export async function parseDescription(source: string) {
  const vfile = await unified()
    .use(remarkParse as any)
    .use(remarkStringify)
    .process(source)

  return String(vfile)
}
