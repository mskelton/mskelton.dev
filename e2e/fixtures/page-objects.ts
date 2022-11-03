import { test as base } from "@playwright/test"
import { AboutPage } from "../collections/AboutPage"
import { BlogPage } from "../collections/BlogPage"
import { HomePage } from "../collections/HomePage"
import { ProjectsPage } from "../collections/ProjectsPage"
import { UsesPage } from "../collections/UsesPage"

interface PageObjectFixtures {
  aboutPage: AboutPage
  blogPage: BlogPage
  homePage: HomePage
  projectsPage: ProjectsPage
  usesPage: UsesPage
}

export const test = base.extend<PageObjectFixtures>({
  aboutPage: ({ page }, use) => use(new AboutPage(page)),
  blogPage: ({ page }, use) => use(new BlogPage(page)),
  homePage: ({ page }, use) => use(new HomePage(page)),
  projectsPage: ({ page }, use) => use(new ProjectsPage(page)),
  usesPage: ({ page }, use) => use(new UsesPage(page)),
})
