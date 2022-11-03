import Collection from "lariat"

export class UsesPage extends Collection {
  async goto() {
    await this.frame.goto("/uses")
  }
}
