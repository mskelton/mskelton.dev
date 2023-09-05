import { getFrontmatter, parseDescription } from "lib/parser"
import prisma from "lib/prisma"

export async function addByte(slug: string, source: string) {
  const { content, meta } = getFrontmatter(source)

  await prisma.byte.create({
    data: {
      content: Buffer.from(content, "utf-8"),
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
