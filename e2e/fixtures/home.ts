import { test as base } from "@playwright/test"
import { HomePage } from "../collections/HomePage"

interface HomeFixtures {
  homePage: HomePage
}

export const test = base.extend<HomeFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await homePage.goto()
    await use(homePage)
  },
})

export const expect = test.expect
