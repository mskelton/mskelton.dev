import { expect, test } from "../fixtures"

test.describe("blog page", async () => {
  test("should be accessible", async ({ blogPage }) => {
    await expect(blogPage.root).toBeAccessible()
  })
})
