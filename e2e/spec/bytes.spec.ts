import { expect, test } from "../fixtures/index.js"

test.describe("Bytes page", async () => {
  test("should be accessible", async ({ bytesPage }) => {
    await bytesPage.goto()
    await expect(bytesPage.root).toPassAxe()
  })

  test("has page metadata", async ({ bytesPage, page }) => {
    await bytesPage.goto()
    await expect(page).toHaveTitle("Bytes | Mark Skelton")
    await expect(bytesPage.description).toHaveAttribute(
      "content",
      /^Bytes is my collection of short-form/,
    )
  })

  test.describe("byte page", () => {
    test("should be accessible", async ({ bytesPage }) => {
      await bytesPage.goto("/applescript-js")
      await expect(bytesPage.root).toPassAxe()
    })

    test("renders page without errors", async ({ bytesPage, page }) => {
      await bytesPage.goto("/applescript-js")
      const title = "Controlling Browsers With AppleScript"
      await expect(page).toHaveTitle(`${title} | Mark Skelton`)
      await expect(page.locator("h1")).toHaveText(title)
    })
  })
})
