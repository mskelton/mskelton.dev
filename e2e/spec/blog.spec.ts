import { expect, test } from "../fixtures"

test.describe("blog page", async () => {
  test.beforeEach(async ({ blogPage }) => {
    await blogPage.goto()
  })

  test("should be accessible", async ({ a11yOptions, blogPage }) => {
    await expect(blogPage.root).toBeAccessible(a11yOptions)
  })
})
