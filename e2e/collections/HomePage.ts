import Collection from "lariat"

export class HomePage extends Collection {
  async goto() {
    await this.frame.goto("/")
  }
}
