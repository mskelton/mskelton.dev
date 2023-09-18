import {
  dateFromId,
  getFrontmatter,
  parseDescription,
  slugify,
} from "lib/parser"
import prisma from "lib/prisma"

export async function upsertByte(id: string, source: string) {
  const { content, meta } = getFrontmatter(source)

  const data = {
    content: Buffer.from(content, "utf-8"),
    createdAt: dateFromId(id),
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
    create: {
      ...data,
      id,
      slug: slugify(meta.title),
    },
    update: data,
    where: { id },
  })
}
