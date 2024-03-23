import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { upsertByte } from "lib/api/bytes"
import { getByteSource, octokit } from "lib/api/github"
import { toId } from "lib/parser"
import prisma from "lib/prisma"

async function getAllByteIds() {
  const path = "bytes"
  const { data } = await octokit.repos.getContent({
    owner: "mskelton",
    path,
    repo: "bytes",
  })

  if (!Array.isArray(data)) {
    throw new Error(
      `Tried to fetch directory listing for ${path}. GitHub did not return an array. This should never happen...`,
    )
  }

  return data.map((item) => toId(item.name))
}

export async function POST() {
  const token = headers().get("Authorization")?.replace("Bearer ", "")

  if (
    process.env.NODE_ENV === "production" &&
    process.env.API_AUTH_TOKEN !== token
  ) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 })
  }

  // Prep the reindexing before clearing content. Make sure we get all the
  // content from the GitHub API before we start clearing the database.
  const ids = await getAllByteIds()
  const sources = await Promise.all(ids.map(getByteSource))

  // Clear all bytes from the database
  await prisma.byte.deleteMany()

  // Add all bytes to the database
  for (let i = 0; i < ids.length; i++) {
    await upsertByte(ids[i], sources[i])
  }

  return NextResponse.json({ message: "ok" })
}
