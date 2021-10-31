import { expect, test } from "../fixtures"

test.describe("tags page", async () => {
  test.beforeEach(async ({ tagsPage }) => {
    await tagsPage.goto()
  })

  test("should be accessible", async ({ a11yOptions, tagsPage }) => {
    await expect(tagsPage.root).toBeAccessible(a11yOptions)
  })
})
