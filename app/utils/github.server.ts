export const LIST_DIR_QUERY = `
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

export interface ListDirResponse {
  repository: {
    object: {
      entries: {
        name: string
        object: { text: string }
      }[]
    }
  }
}

export const READ_FILE_QUERY = `
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

export interface ReadFileResponse {
  repository: {
    object: {
      text: string
    }
  }
}
