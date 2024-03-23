import fs from "node:fs/promises"
import { upsertByte } from "../app/lib/api/bytes"

const filenames = await fs.readdir(new URL("../e2e/bytes", import.meta.url))

for await (const filename of filenames) {
  const id = filename.replace(".md", "")
  const source = await fs.readFile(
    new URL(`../e2e/bytes/${filename}`, import.meta.url),
    "utf-8",
  )

  await upsertByte(id, source)
}
