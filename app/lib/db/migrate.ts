import sqlite3 from "better-sqlite3"

export function migrate(client: sqlite3.Database) {
  sql
    .split(";")
    .filter((statement) => statement.trim() !== "")
    .forEach((statement) => {
      client.exec(statement)
    })
}

const sql = `
	CREATE TABLE IF NOT EXISTS bytes (
		content blob NOT NULL,
		created_at integer NOT NULL,
		description text NOT NULL,
		id text PRIMARY KEY NOT NULL,
		slug text NOT NULL,
		title text NOT NULL
	);

	CREATE TABLE IF NOT EXISTS bytes_to_tags (
		byte_id text NOT NULL,
		tag_id integer NOT NULL,
		PRIMARY KEY(byte_id, tag_id),
		FOREIGN KEY (byte_id) REFERENCES bytes(id) ON UPDATE no action ON DELETE no action,
		FOREIGN KEY (tag_id) REFERENCES tags(id) ON UPDATE no action ON DELETE no action
	);

	CREATE TABLE IF NOT EXISTS tags (
		created_at integer NOT NULL,
		id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
		name text NOT NULL
	);

	CREATE UNIQUE INDEX IF NOT EXISTS bytes_slug_unique ON bytes (slug);
	CREATE UNIQUE INDEX IF NOT EXISTS tags_name_unique ON tags (name);
`
