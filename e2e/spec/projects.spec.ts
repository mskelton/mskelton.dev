import { expect, test } from "../fixtures"

test.describe("Projects page", async () => {
  test.beforeEach(async ({ projectsPage }) => {
    await projectsPage.goto()
  })

  test("should be accessible", async ({ projectsPage }) => {
    await expect(projectsPage.root).toPassAxe()
  })
})
