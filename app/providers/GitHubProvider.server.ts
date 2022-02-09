import { Octokit } from "octokit"
import {
  LIST_DIR_QUERY,
  ListDirResponse,
  READ_FILE_QUERY,
  ReadFileResponse,
} from "~/utils/github.server"
import { RedisCache } from "~/utils/RedisCache.server"
import { ContentProvider } from "./ContentProvider.server"

export class GitHubProvider extends ContentProvider {
  octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  cache = new RedisCache()

  async getAllPosts() {
    const key = "main:content"

    return this.cache.get(key, async () => {
      const res = await this.octokit.graphql<ListDirResponse>(LIST_DIR_QUERY, {
        expression: key,
      })

      return res.repository.object.entries.map((entry) => ({
        name: entry.name,
        source: entry.object.text,
      }))
    })
  }

  async getPost(slug: string) {
    const key = `main:content/${slug}.md`

    return this.cache.get(key, async () => {
      const res = await this.octokit.graphql<ReadFileResponse>(
        READ_FILE_QUERY,
        { expression: key }
      )

      return {
        name: `${slug}.md`,
        source: res.repository.object.text,
      }
    })
  }
}
