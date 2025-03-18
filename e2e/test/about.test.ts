import { expect, test } from "../fixtures/index.js"

test.describe("About page", () => {
  test.beforeEach(async ({ aboutPage }) => {
    await aboutPage.goto()
  })

  test("should be accessible", async ({ aboutPage }) => {
    await expect(aboutPage.root).toPassAxe()
  })

  test("has page metadata", async ({ aboutPage, page }) => {
    await expect(page).toHaveTitle("About | Mark Skelton")
    await expect(aboutPage.description).toHaveAttribute(
      "content",
      /I’m Mark, a staff software engineer/,
    )
  })
})
