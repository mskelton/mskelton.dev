import { NextResponse } from "next/server"
import { requireToken } from "~/api/utils/auth"
import { upsertByte } from "~/lib/api/bytes"
import { getByteSource, octokit } from "~/lib/api/github"
import { client } from "~/lib/db"
import { toId } from "~/lib/parser"

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

export async function POST(request: Request) {
  requireToken(request)

  // Prep the reindexing before clearing content. Make sure we get all the
  // content from the GitHub API before we start clearing the database.
  const ids = await getAllByteIds()
  const sources = await Promise.all(ids.map(getByteSource))

  // Clear all bytes from the database
  client.exec(`DELETE FROM bytes_to_tags`)
  client.exec(`DELETE FROM bytes`)
  client.exec(`DELETE FROM tags`)

  // Add all bytes to the database
  for (let i = 0; i < ids.length; i++) {
    await upsertByte(ids[i], sources[i])
  }

  return NextResponse.json({ message: "ok" })
}
