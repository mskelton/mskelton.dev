import { Collection } from "lariat"

export class AboutPage extends Collection {
  async goto() {
    await this.frame.goto("/about")
  }
}
