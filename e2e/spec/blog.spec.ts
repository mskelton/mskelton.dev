import { expect, test } from "../fixtures/index.js"

test.describe("Blog page", async () => {
  test("should be accessible", async ({ blogPage }) => {
    await blogPage.goto()
    await expect(blogPage.root).toPassAxe()
  })

  test("has page metadata", async ({ blogPage, page }) => {
    await blogPage.goto()
    await expect(page).toHaveTitle("Blog - Mark Skelton")
    await expect(blogPage.description).toHaveAttribute(
      "content",
      /All of my blog posts/
    )
  })

  test.describe("post", () => {
    test.beforeEach(async ({ blogPage }) => {
      await blogPage.goto("/using-yarn-constraints")
    })

    test("should be accessible", async ({ blogPage }) => {
      await expect(blogPage.root).toPassAxe()
    })

    test("has page metadata", async ({ blogPage, page }) => {
      await expect(page).toHaveTitle(
        "Using Yarn Constraints - Mark Skelton’s Blog"
      )
      await expect(blogPage.description).toHaveAttribute(
        "content",
        /Yarn 2 introduced a new feature/
      )
    })
  })
})
