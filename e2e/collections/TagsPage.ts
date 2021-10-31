import { Collection } from "lariat"

export class TagsPage extends Collection {
  async goto() {
    await this.frame.goto("/tags")
  }
}
