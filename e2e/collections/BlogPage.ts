import { BasePage } from "./BasePage.js"

export class BlogPage extends BasePage {
  codeBlock = (header: string) =>
    this.el(`h2:has-text("${header}") ~ .code-block`)

  async goto(path = "") {
    await this.frame.goto(`/blog${path}`)
  }
}
