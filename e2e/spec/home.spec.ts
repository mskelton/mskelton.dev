import { expect, test } from "../fixtures"

test.describe("Home page", async () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
  })

  test("should be accessible", async ({ a11yOptions, homePage }) => {
    await expect(homePage.root).toPassAxe(a11yOptions)
  })
})
