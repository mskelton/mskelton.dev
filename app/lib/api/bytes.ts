import { client } from '~/lib/db'
import {
  dateFromId,
  getFrontmatter,
  parseDescription,
  slugify,
} from '~/lib/parser'

export async function upsertByte(id: string, source: string) {
  const { content, meta } = getFrontmatter(source)

  // Insert the byte and update if it already exists
  client
    .prepare(
      `
        INSERT INTO bytes (id, slug, title, description, content, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          slug=excluded.slug,
          title=excluded.title,
          description=excluded.description,
          content=excluded.content
      `,
    )
    .run(
      id,
      slugify(meta.title),
      meta.title,
      await parseDescription(content),
      content,
      dateFromId(id).toISOString(),
    )

  if (meta.tags.length) {
    // Insert any new tags
    meta.tags.forEach((tag) => {
      client
        .prepare(
          `INSERT INTO tags (created_at, name) VALUES (?, ?) ON CONFLICT DO NOTHING`,
        )
        .run(new Date().toISOString(), tag)
    })

    // Get tag ids
    const tags = client
      .prepare<string[][], { id: string }>(
        `SELECT id FROM tags WHERE name IN (${meta.tags.map(() => '?').join(',')})`,
      )
      .all(meta.tags)

    // Add the new tags to the relationship table
    tags.forEach((tag) => {
      client
        .prepare(
          `INSERT INTO bytes_to_tags (byte_id, tag_id) VALUES (?, ?) ON CONFLICT DO NOTHING`,
        )
        .run(id, tag.id)
    })
  }
}
