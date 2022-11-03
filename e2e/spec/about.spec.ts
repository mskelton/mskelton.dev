import { expect, test } from "../fixtures"

test.describe("About page", async () => {
  test.beforeEach(async ({ aboutPage }) => {
    await aboutPage.goto()
  })

  test("should be accessible", async ({ aboutPage }) => {
    await expect(aboutPage.root).toPassAxe()
  })
})
