import { PushEvent } from "@octokit/webhooks-types"
import { NextResponse } from "next/server"
import { upsertByte } from "~/lib/api/bytes"
import { getByteSource } from "~/lib/api/github"
import { verifySignature } from "~/lib/api/signature"
import { client } from "~/lib/db"
import { toId } from "~/lib/parser"

async function upsert(file: string) {
  const id = toId(file)
  return upsertByte(id, await getByteSource(id))
}

async function remove(files: string[]) {
  const ids = files.map(toId)
  if (ids.length === 0) {
    return
  }

  const placeholders = ids.map(() => "?").join(",")
  client.prepare(`DELETE FROM bytes WHERE id IN (${placeholders})`).run(...ids)
}

export async function POST(req: Request) {
  const body = await req.text()
  const validSignature = await verifySignature(req, body)

  if (!validSignature) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { commits } = JSON.parse(body) as PushEvent
  await remove(commits.flatMap((c) => c.removed))

  const bytes = commits.flatMap((c) => [...c.added, ...c.modified])
  for await (const byte of bytes) {
    await upsert(byte)
  }

  return NextResponse.json({ message: "ok" })
}
