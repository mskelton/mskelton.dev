import { relations } from "drizzle-orm"
import {
  blob,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core"

export const bytes = sqliteTable("bytes", {
  content: blob("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  description: text("description").notNull(),
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
})

export const bytesRelations = relations(bytes, ({ many }) => ({
  bytesToTags: many(bytesToTags),
}))

export const tags = sqliteTable("tags", {
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
})

export const tagsRelations = relations(tags, ({ many }) => ({
  bytesToTags: many(bytesToTags),
}))

export const bytesToTags = sqliteTable(
  "bytes_to_tags",
  {
    byteId: text("byte_id")
      .notNull()
      .references(() => bytes.id),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.byteId, t.tagId] }),
  }),
)

export const bytesToTagsRelations = relations(bytesToTags, ({ one }) => ({
  byte: one(bytes, {
    fields: [bytesToTags.byteId],
    references: [bytes.id],
  }),
  tag: one(tags, {
    fields: [bytesToTags.tagId],
    references: [tags.id],
  }),
}))
