import { BasePage } from './BasePage.js'

export class HomePage extends BasePage {
  async goto() {
    await this.frame.goto('/')
  }
}
