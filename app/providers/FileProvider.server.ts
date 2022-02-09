import fs from "fs/promises"
import path from "path"
import { ContentProvider } from "./ContentProvider.server"

export class FileProvider extends ContentProvider {
  root = path.join(__dirname, "../../content")

  async getAllPosts() {
    const promises = (await fs.readdir(this.root))
      .filter((file) => file.endsWith(".md"))
      .map((file) => this.getPost(file.replace(".md", "")))

    return Promise.all(promises)
  }

  async getPost(slug: string) {
    const name = `${slug}.md`
    const source = await fs.readFile(path.join(this.root, name), "utf8")

    return { name, source }
  }
}
