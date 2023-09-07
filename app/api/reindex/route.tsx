import { NextResponse } from "next/server"
import { upsertByte } from "lib/api/bytes"
import { getByteSource, octokit } from "lib/api/github"
import { toSlug } from "lib/parser"
import prisma from "lib/prisma"

async function getAllByteSlugs() {
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

  return data.map((item) => toSlug(item.name))
}

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { message: "Reindexing is not allowed in production." },
      { status: 400 },
    )
  }

  // Prep the reindexing before clearing content. Make sure we get all the content
  // from the GitHub API before we start clearing the database.
  const slugs = await getAllByteSlugs()
  const sources = await Promise.all(slugs.map(getByteSource))

  // Clear all bytes from the database
  await prisma.byte.deleteMany()

  // Add all bytes to the database
  await Promise.all(sources.map((source, i) => upsertByte(slugs[i], source)))

  return NextResponse.json({ message: "ok" })
}
