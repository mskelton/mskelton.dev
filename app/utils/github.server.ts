import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export async function listDir(path: string) {
  const { data } = await octokit.rest.repos.getContent({
    owner: "mskelton",
    path,
    repo: "mskelton.dev",
  })

  if (!Array.isArray(data)) {
    throw new Error(`Expected data to be an array, got ${typeof data} instead.`)
  }

  return data
}

export async function readFile(path: string) {
  const { data } = await octokit.rest.repos.getContent({
    owner: "mskelton",
    path,
    repo: "mskelton.dev",
  })

  if (Array.isArray(data)) {
    throw new Error("Expected data to be an object, got array instead.")
  }

  return data.content
}
