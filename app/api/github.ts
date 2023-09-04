import { Octokit } from "@octokit/rest"
import { notFound } from "next/navigation"

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

octokit.hook.error("request", async (error) => {
  if ((error as any).status === 404) {
    return notFound()
  }

  throw error
})
