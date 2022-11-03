import { Page } from "@playwright/test"
import Collection from "lariat"

export class UsesPage extends Collection<Page> {
  async goto() {
    await this.frame.goto("/uses")
  }
}
