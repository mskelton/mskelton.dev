import { Page } from "@playwright/test"
import Collection from "lariat"

export class BasePage extends Collection<Page> {
  description = this.el('meta[name="description"]').first()
}
