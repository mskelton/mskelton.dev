import { AboutPage } from "../collections/AboutPage"
import { BlogPage } from "../collections/BlogPage"
import { Footer } from "../collections/Footer"
import { HomePage } from "../collections/HomePage"
import { TagsPage } from "../collections/TagsPage"
import { test as base } from "./base"

interface PageObjectFixtures {
  aboutPage: AboutPage
  blogPage: BlogPage
  footer: Footer
  homePage: HomePage
  tagsPage: TagsPage
}

export const test = base.extend<PageObjectFixtures>({
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page.locator("data-testid=about")))
  },
  blogPage: async ({ page }, use) => {
    await use(new BlogPage(page.locator("data-testid=blog")))
  },
  footer: async ({ page }, use) => {
    await use(new Footer(page))
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page.locator("data-testid=home")))
  },
  tagsPage: async ({ page }, use) => {
    await use(new TagsPage(page.locator("data-testid=tags")))
  },
})
