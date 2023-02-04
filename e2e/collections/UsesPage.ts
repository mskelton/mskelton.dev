import { BasePage } from "./BasePage.js"

export class UsesPage extends BasePage {
  async goto() {
    await this.frame.goto("/uses")
  }
}
