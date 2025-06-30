import sqlite3 from "better-sqlite3"
import { migrate } from "./migrate"

function create() {
  const client = sqlite3(process.env.DATABASE_FILENAME)

  // Auto migrate the database, when we connect
  migrate(client)

  return client
}

declare let globalThis: {
  client?: ReturnType<typeof create>
}

export let client: ReturnType<typeof create>

if (process.env.NODE_ENV !== "production") {
  if (!globalThis.client) {
    globalThis.client = create()
  }

  client = globalThis.client
} else {
  client = create()
}
