import matter from "gray-matter"
import { NextResponse } from "next/server"
import remarkParse from "remark-parse"
import { unified } from "unified"
import { ByteMeta } from "(main)/bytes/types"
import { PushEvent } from "@octokit/webhooks-types"
import { getByteSource } from "lib/api/bytes"
import prisma from "lib/prisma"
import remarkStringify from "../../../config/remark-stringify.mjs"

const toSlug = (file: string) => file.replace(/\.md$/, "").split("/").pop()!

function getFrontmatter(source: string) {
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

async function parseDescription(source: string) {
  const vfile = await unified()
    .use(remarkParse as any)
    .use(remarkStringify)
    .process(source)

  return String(vfile)
}

async function remove(files: string[]) {
  const slugs = files.map(toSlug)

  await prisma.byte.deleteMany({
    where: { slug: { in: slugs } },
  })
}

async function add(file: string) {
  const slug = toSlug(file)
  const source = await getByteSource(slug)
  const { content, meta } = getFrontmatter(source)

  await prisma.byte.create({
    data: {
      description: await parseDescription(content),
      slug,
      tags: {
        connectOrCreate: meta.tags.map((tag) => ({
          create: { name: tag },
          where: { name: tag },
        })),
      },
      title: meta.title,
    },
  })
}

async function modify(file: string) {
  const slug = toSlug(file)
  const source = await getByteSource(slug)
  const { content, meta } = getFrontmatter(source)

  await prisma.byte.update({
    data: {
      description: await parseDescription(content),
      tags: {
        connectOrCreate: meta.tags.map((tag) => ({
          create: { name: tag },
          where: { name: tag },
        })),
        set: [],
      },
      title: meta.title,
      updatedAt: new Date().toISOString(),
    },
    where: { slug },
  })
}

export async function POST(request: Request) {
  const { commits } = (await request.json()) as PushEvent

  await remove(commits.flatMap((c) => c.removed))
  await Promise.all(commits.flatMap((c) => c.added).map(add))
  await Promise.all(commits.flatMap((c) => c.modified).map(modify))

  return NextResponse.json({ message: "ok" })
}
