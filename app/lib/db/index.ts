import "server-only"
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "./schema"

function create() {
  return createClient({
    authToken: process.env.DATABASE_AUTH_TOKEN,
    url: process.env.DATABASE_URL!,
  })
}

declare let globalThis: {
  client?: ReturnType<typeof createClient>
}

export let client: ReturnType<typeof createClient>

if (process.env.NODE_ENV !== "production") {
  if (!globalThis.client) {
    globalThis.client = create()
  }

  client = globalThis.client
} else {
  client = create()
}

export const db = drizzle(client, { schema })
export { schema }
