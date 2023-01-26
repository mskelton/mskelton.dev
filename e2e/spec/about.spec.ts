import { expect, test } from "../fixtures/index.js"

test.describe("About page", async () => {
  test.beforeEach(async ({ aboutPage }) => {
    await aboutPage.goto()
  })

  test("should be accessible", async ({ aboutPage }) => {
    await expect(aboutPage.root).toPassAxe()
  })
})
