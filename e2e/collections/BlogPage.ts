import { Page } from "@playwright/test"
import { Collection } from "lariat"

export class BlogPage extends Collection {
  constructor(page: Page) {
    super(page.locator("data-testid=blog"))
  }

  async goto() {
    await this.frame.goto("/blog")
  }
}
