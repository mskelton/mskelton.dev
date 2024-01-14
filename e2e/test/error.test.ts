import { expect, test } from "../fixtures/index.js"

test.describe("Errors", async () => {
  test("404 page", async ({ notFoundPage, page }) => {
    await page.goto("/asdf")
    await expect(notFoundPage.code).toHaveText("404")
    await expect(notFoundPage.title).toHaveText("Page Not Found")
    await expect(notFoundPage.subtitle).toContainText(
      "Looks like you are trying to access a page that doesn't exist",
    )
  })

  test("404 page should be accessible", async ({ page }) => {
    await page.goto("/asdf")
    await expect(page).toPassAxe()
  })
})
