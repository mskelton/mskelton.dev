import { BasePage } from './BasePage.js'

export class ProjectsPage extends BasePage {
  async goto() {
    await this.frame.goto('/projects')
  }
}
