import { expect, test } from "../fixtures"

test.describe("Uses page", async () => {
  test.beforeEach(async ({ usesPage }) => {
    await usesPage.goto()
  })

  test("should be accessible", async ({ a11yOptions, usesPage }) => {
    await expect(usesPage.root).toPassAxe(a11yOptions)
  })
})
