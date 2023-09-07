import { NextResponse } from "next/server"
import { PushEvent } from "@octokit/webhooks-types"
import { upsertByte } from "lib/api/bytes"
import { getByteSource } from "lib/api/github"
import { verifySignature } from "lib/api/signature"
import { toSlug } from "lib/parser"
import prisma from "lib/prisma"

async function upsert(file: string) {
  const slug = toSlug(file)
  return upsertByte(slug, await getByteSource(slug))
}

async function remove(files: string[]) {
  const slugs = files.map(toSlug)

  await prisma.byte.deleteMany({
    where: { slug: { in: slugs } },
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
