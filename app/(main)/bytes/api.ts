import { cache } from "react"
import { octokit } from "../../api/github"

// Revalidate the data at most every hour
export const revalidate = 3600

export const getByte = cache(async (slug: string) => {
  const path = `bytes/${slug}.md`
  const { data } = await octokit.repos.getContent({
    mediaType: { format: "raw" },
    owner: "mskelton",
    path,
    repo: "bytes",
  })

  if (typeof data !== "string") {
    throw new Error(
      `Tried to fetch raw file from ${path}. GitHub did not return the raw contents. This should never happen...`,
    )
  }

  return data
})

export const searchBytes = cache(async (query: string) => {})
