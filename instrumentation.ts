import { client } from "lib/db"

export async function register() {
  await client.sync()
}
