import { Page } from "@playwright/test"
import Collection from "lariat"

export class HomePage extends Collection<Page> {
  async goto() {
    await this.frame.goto("/")
  }
}
