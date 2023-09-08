import { BasePage } from "./BasePage.js"

export class BytesPage extends BasePage {
  async goto(path = "") {
    await this.frame.goto(`/bytes${path}`)
  }
}
