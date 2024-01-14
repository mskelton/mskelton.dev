import { expect, test } from "../fixtures/index.js"

test.describe("Uses page", async () => {
  test.beforeEach(async ({ usesPage }) => {
    await usesPage.goto()
  })

  test("should be accessible", async ({ usesPage }) => {
    await expect(usesPage.root).toPassAxe()
  })

  test("has page metadata", async ({ page, usesPage }) => {
    await expect(page).toHaveTitle("Uses | Mark Skelton")
    await expect(usesPage.description).toHaveAttribute(
      "content",
      /I create software 40\+ hours/,
    )
  })
})
