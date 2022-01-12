import Collection from "lariat"

export class BlogPage extends Collection {
  async goto() {
    await this.frame.goto("/blog")
  }
}
