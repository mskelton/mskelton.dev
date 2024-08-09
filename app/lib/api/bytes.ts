import { inArray } from "drizzle-orm"
import { db, schema } from "lib/db"
import {
  dateFromId,
  getFrontmatter,
  parseDescription,
  slugify,
} from "lib/parser"

export async function upsertByte(id: string, source: string) {
  const { content, meta } = getFrontmatter(source)

  const data = {
    content,
    createdAt: dateFromId(id),
    description: await parseDescription(content),
    title: meta.title,
  }

  // Insert the byte and update if it already exists
  await db
    .insert(schema.bytes)
    .values({ ...data, id, slug: slugify(meta.title) })
    .onConflictDoUpdate({ set: data, target: schema.bytes.slug })
    .execute()

  if (meta.tags.length) {
    // Insert any new tags
    await db
      .insert(schema.tags)
      .values(meta.tags.map((tag) => ({ createdAt: new Date(), name: tag })))
      .onConflictDoNothing()
      .execute()

    // Get tag ids
    const tags = await db
      .select({ id: schema.tags.id })
      .from(schema.tags)
      .where(inArray(schema.tags.name, meta.tags))

    // Add the new tags to the relationship table
    await db
      .insert(schema.bytesToTags)
      .values(tags.map((tag) => ({ byteId: id, tagId: tag.id })))
      .onConflictDoNothing()
      .execute()
  }
}
