import { NextResponse } from "next/server"
import { PushEvent } from "@octokit/webhooks-types"
import { addByte } from "lib/api/bytes"
import { getByteSource } from "lib/api/github"
import { verifySignature } from "lib/api/signature"
import { parseDate } from "lib/date"
import { getFrontmatter, parseDescription, toSlug } from "lib/parser"
import prisma from "lib/prisma"

async function add(file: string) {
  const slug = toSlug(file)
  const source = await getByteSource(slug)

  return addByte(slug, source)
}

async function remove(files: string[]) {
  const slugs = files.map(toSlug)

  await prisma.byte.deleteMany({
    where: { slug: { in: slugs } },
  })
}

async function modify(file: string) {
  const slug = toSlug(file)
  const source = await getByteSource(slug)
  const { content, meta } = getFrontmatter(source)

  await prisma.byte.update({
    data: {
      content: Buffer.from(content, "utf-8"),
      createdAt: parseDate(meta.date),
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

export async function POST(req: Request) {
  if (!verifySignature(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { commits } = (await req.json()) as PushEvent

  await remove(commits.flatMap((c) => c.removed))
  await Promise.all(commits.flatMap((c) => c.added).map(add))
  await Promise.all(commits.flatMap((c) => c.modified).map(modify))

  return NextResponse.json({ message: "ok" })
}
