import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const LIST_DIR_QUERY = `
query listDir($expression: String!) {
  repository(owner: "mskelton", name: "mskelton.dev") {
    object(expression: $expression) {
      ... on Tree {
        entries {
          name
          object {
            ... on Blob {
              text
            }
          }
        }
      }
    }
  }
}
`

interface ListDirResponse {
  repository: {
    object: {
      entries: {
        name: string
        object: { text: string }
      }[]
    }
  }
}

export async function listDir(branch: string, path: string) {
  const res = await octokit.graphql<ListDirResponse>(LIST_DIR_QUERY, {
    expression: `${branch}:${path}`,
  })

  return res.repository.object.entries.map((entry) => ({
    content: entry.object.text,
    name: entry.name,
  }))
}

const READ_FILE_QUERY = `
  query readFile($expression: String!) {
    repository(owner: "mskelton", name: "mskelton.dev") {
      object(expression: $expression) {
        ... on Blob {
          text
        }
      }
    }
  }
`

interface ReadFileResponse {
  repository: {
    object: {
      text: string
    }
  }
}

export async function readFile(branch: string, path: string) {
  const res = await octokit.graphql<ReadFileResponse>(READ_FILE_QUERY, {
    expression: `${branch}:${path}`,
  })

  return res.repository.object.text
}
