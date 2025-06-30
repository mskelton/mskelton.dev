import { NextResponse } from "next/server"
import { PushEvent } from "@octokit/webhooks-types"
import { upsertByte } from "lib/api/bytes"
import { getByteSource } from "lib/api/github"
import { verifySignature } from "lib/api/signature"
import { client } from "lib/db"
import { toId } from "lib/parser"

async function upsert(file: string) {
  const id = toId(file)
  return upsertByte(id, await getByteSource(id))
}

async function remove(files: string[]) {
  client.prepare(`DELETE FROM bytes WHERE id IN ?`).run(files.map(toId))
}

export async function POST(req: Request) {
  const body = (await req.json()) as PushEvent

  if (!verifySignature(req, body)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { commits } = body
  await remove(commits.flatMap((c) => c.removed))

  const bytes = commits.flatMap((c) => [...c.added, ...c.modified])
  for await (const byte of bytes) {
    await upsert(byte)
  }

  return NextResponse.json({ message: "ok" })
}
