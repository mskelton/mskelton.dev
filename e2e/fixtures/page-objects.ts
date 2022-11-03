import { AboutPage } from "../collections/AboutPage"
import { BlogPage } from "../collections/BlogPage"
import { HomePage } from "../collections/HomePage"
import { ProjectsPage } from "../collections/ProjectsPage"
import { UsesPage } from "../collections/UsesPage"
import { test as base } from "./base"

interface PageObjectFixtures {
  aboutPage: AboutPage
  blogPage: BlogPage
  homePage: HomePage
  projectsPage: ProjectsPage
  usesPage: UsesPage
}

export const test = base.extend<PageObjectFixtures>({
  aboutPage: ({ page }, use) =>
    use(new AboutPage(page.locator("data-testid=about"))),
  blogPage: ({ page }, use) =>
    use(new BlogPage(page.locator("data-testid=blog"))),
  homePage: ({ page }, use) =>
    use(new HomePage(page.locator("data-testid=home"))),
  projectsPage: ({ page }, use) =>
    use(new ProjectsPage(page.locator("data-testid=projects"))),
  usesPage: ({ page }, use) =>
    use(new UsesPage(page.locator("data-testid=uses"))),
})
