import { expect, test } from "../fixtures"

test.describe("Uses page", async () => {
  test.beforeEach(async ({ usesPage }) => {
    await usesPage.goto()
  })

  test("should be accessible", async ({ usesPage }) => {
    await expect(usesPage.root).toPassAxe()
  })
})
