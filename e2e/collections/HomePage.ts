import { Page } from "@playwright/test"
import { Collection } from "lariat"

export class HomePage extends Collection {
  constructor(page: Page) {
    super(page.locator("data-testid=home"))
  }

  async goto() {
    await this.frame.goto("/")
  }
}
