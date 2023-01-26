import { test as base } from "@playwright/test"
import { AboutPage } from "../collections/AboutPage.js"
import { BlogPage } from "../collections/BlogPage.js"
import { HomePage } from "../collections/HomePage.js"
import { ProjectsPage } from "../collections/ProjectsPage.js"
import { UsesPage } from "../collections/UsesPage.js"

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
