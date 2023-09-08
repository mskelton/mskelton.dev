import Collection from "lariat"
import { BasePage } from "./BasePage.js"

class Byte extends Collection {
  title = this.getByRole("heading", { level: 2 })
  description = this.getByTestId("card-description")
  tag = this.getByTestId("card-tag")
}

export class BytesPage extends BasePage {
  query = this.getByRole("textbox", { name: "Search bytes" })
  clear = this.getByRole("link", { name: "Clear" })
  byte = (title?: string) =>
    this.nest(
      Byte,
      this.getByRole("article").filter({
        has: this.getByRole("heading", { level: 2, name: title }),
      }),
    )

  async goto(path = "") {
    await this.frame.goto(`/bytes${path}`)
  }

  async search(query: string) {
    await this.query.fill(query)
    await this.query.press("Enter")
  }
}
