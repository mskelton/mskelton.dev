import { expect, test } from "../fixtures/index.js"

test.describe("Blog page", async () => {
  test.beforeEach(async ({ blogPage }) => {
    await blogPage.goto()
  })

  test("should be accessible", async ({ blogPage }) => {
    await expect(blogPage.root).toPassAxe()
  })
})
