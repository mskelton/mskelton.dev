import { Octokit } from "octokit"

const octokit = new Octokit({})

export async function listDir() {
  const { data } = await octokit.graphql()
}
