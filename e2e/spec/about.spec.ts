import { expect, test } from "../fixtures"

test.describe("about page", async () => {
  test.beforeEach(async ({ aboutPage }) => {
    await aboutPage.goto()
  })

  test("should be accessible", async ({ a11yOptions, aboutPage }) => {
    await expect(aboutPage.root).toBeAccessible(a11yOptions)
  })
})
