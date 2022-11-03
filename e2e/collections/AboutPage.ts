import { Page } from "@playwright/test"
import Collection from "lariat"

export class AboutPage extends Collection<Page> {
  async goto() {
    await this.frame.goto("/about")
  }
}
