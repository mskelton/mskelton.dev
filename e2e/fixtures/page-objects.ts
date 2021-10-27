import { test as base } from "@playwright/test"
import { BlogPage } from "../collections/BlogPage"
import { HomePage } from "../collections/HomePage"

interface PageObjectFixtures {
  blogPage: BlogPage
  homePage: HomePage
}

export const test = base.extend<PageObjectFixtures>({
  blogPage: async ({ page }, use) => {
    const blogPage = new BlogPage(page)
    await blogPage.goto()
    await use(blogPage)
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await homePage.goto()
    await use(homePage)
  },
})

export const expect = test.expect
