import { client } from "lib/db"

export async function register() {
  if (!process.env.CI) {
    await client.sync()
  }
}
