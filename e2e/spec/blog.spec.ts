import { expect, test } from "../fixtures"

test.describe("Blog page", async () => {
  test.beforeEach(async ({ blogPage }) => {
    await blogPage.goto()
  })

  test("should be accessible", async ({ a11yOptions, blogPage }) => {
    await expect(blogPage.root).toPassAxe(a11yOptions)
  })
})
