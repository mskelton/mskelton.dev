import { octokit } from "./github"

export async function getByteSource(slug: string) {
  const bytePath = `bytes/${slug}.md`
  const { data } = await octokit.repos.getContent({
    mediaType: { format: "raw" },
    owner: "mskelton",
    path: bytePath,
    repo: "bytes",
  })

  if (typeof data !== "string") {
    throw new Error(
      `Tried to fetch raw file from ${bytePath}. GitHub did not return the raw contents. This should never happen...`,
    )
  }

  return data as string
}
