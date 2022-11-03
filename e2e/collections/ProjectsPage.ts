import Collection from "lariat"

export class ProjectsPage extends Collection {
  async goto() {
    await this.frame.goto("/projects")
  }
}
