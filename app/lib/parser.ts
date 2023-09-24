import matter from "gray-matter"
import remarkParse from "remark-parse"
import { Plugin, unified } from "unified"
import { ByteMeta } from "(main)/bytes/types"
import remarkStringify from "../../config/remark-stringify.mjs"

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

export const toId = (file: string) =>
  file.replace(/\.md$/, "").split("/").at(-1) ?? ""

export function dateFromId(id: string) {
  return new Date(
    Date.UTC(
      +id.slice(0, 4),
      +id.slice(4, 6) - 1,
      +id.slice(6, 8),
      +id.slice(8, 10),
      +id.slice(10, 12),
      +id.slice(12, 14),
    ),
  )
}

export function getFrontmatter(source: string) {
  const { content, data } = matter(source)
  const meta = data as ByteMeta

  return { content, meta }
}

export async function parseDescription(source: string) {
  const vfile = await unified()
    .use(remarkParse as unknown as Plugin)
    .use(remarkStringify)
    .process(source)

  return String(vfile)
}
