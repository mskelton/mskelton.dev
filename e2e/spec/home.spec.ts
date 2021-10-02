import { expect, test } from "../fixtures/home"

test.describe("home page", async () => {
  test("should be accessible", async ({ homePage }) => {
    await expect(homePage.root).toBeAccessible()
  })
})
