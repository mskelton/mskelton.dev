import { parseDate } from "lib/date"
import { getFrontmatter, parseDescription } from "lib/parser"
import prisma from "lib/prisma"

export async function upsertByte(slug: string, source: string) {
  const { content, meta } = getFrontmatter(source)

  const data = {
    content: Buffer.from(content, "utf-8"),
    createdAt: parseDate(meta.date),
    description: await parseDescription(content),
    tags: {
      connectOrCreate: meta.tags.map((tag) => ({
        create: { name: tag },
        where: { name: tag },
      })),
    },
    title: meta.title,
  }

  await prisma.byte.upsert({
    create: { ...data, slug },
    update: data,
    where: { slug },
  })
}
