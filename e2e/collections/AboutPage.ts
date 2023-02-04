import { BasePage } from "./BasePage.js"

export class AboutPage extends BasePage {
  async goto() {
    await this.frame.goto("/about")
  }
}
