import { expect, test } from "../fixtures"

test.describe("Projects page", async () => {
  test.beforeEach(async ({ projectsPage }) => {
    await projectsPage.goto()
  })

  test("should be accessible", async ({ a11yOptions, projectsPage }) => {
    await expect(projectsPage.root).toPassAxe(a11yOptions)
  })
})
