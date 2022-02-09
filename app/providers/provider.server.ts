import { FileProvider } from "./FileProvider.server"
import { GitHubProvider } from "./GitHubProvider.server"

export const provider =
  process.env.PROVIDER === "file" ? new FileProvider() : new GitHubProvider()
