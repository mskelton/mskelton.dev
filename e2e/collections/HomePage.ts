import { Page } from "@playwright/test"
import { Collection } from "lariat"

export class HomePage extends Collection {
  constructor(page: Page) {
    super(page.locator("data-testid=home"))
  }

  socialLink = this.el("data-testid=social-link")

  async goto() {
    await this.frame.goto("/")
  }
}
