import { expect, test } from "../fixtures/index.js"

test.describe("Home page", async () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
  })

  test("should be accessible", async ({ homePage }) => {
    await expect(homePage.root).toPassAxe()
  })

  test("has page metadata", async ({ homePage, page }) => {
    await expect(page).toHaveTitle(
      "Mark Skelton - Software engineer, Christ follower, small town kid.",
    )
    await expect(homePage.description).toHaveAttribute(
      "content",
      /I’m Mark, a frontend software engineer/,
    )
  })
})
