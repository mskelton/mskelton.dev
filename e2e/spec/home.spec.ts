import { expect, test } from "../fixtures/index.js"

test.describe("Home page", async () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
  })

  test("should be accessible", async ({ homePage }) => {
    await expect(homePage.root).toPassAxe()
  })
})
