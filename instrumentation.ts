import { client } from "lib/db"

export async function register() {
  if (process.env.TURSO_DATABASE_URL) {
    await client.sync()
  }
}
