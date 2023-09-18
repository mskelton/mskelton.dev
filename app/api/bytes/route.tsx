import { NextResponse } from "next/server"
import { PushEvent } from "@octokit/webhooks-types"
import { upsertByte } from "lib/api/bytes"
import { getByteSource } from "lib/api/github"
import { verifySignature } from "lib/api/signature"
import { toId } from "lib/parser"
import prisma from "lib/prisma"

async function upsert(file: string) {
  const id = toId(file)
  return upsertByte(id, await getByteSource(id))
}

async function remove(files: string[]) {
  const ids = files.map(toId)

  await prisma.byte.deleteMany({
    where: { id: { in: ids } },
  })
}

export async function POST(req: Request) {
  const body = (await req.json()) as PushEvent

  if (!verifySignature(req, body)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { commits } = body
  await remove(commits.flatMap((c) => c.removed))
  await Promise.all(
    commits.flatMap((c) => [...c.added, ...c.modified]).map(upsert),
  )

  return NextResponse.json({ message: "ok" })
}
