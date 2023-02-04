import { BasePage } from "./BasePage.js"

export class BlogPage extends BasePage {
  async goto(path = "") {
    await this.frame.goto("/blog" + path)
  }
}
