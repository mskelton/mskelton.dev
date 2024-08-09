import { expect, test } from "../fixtures/index.js"

test.describe("Projects page", () => {
  test.beforeEach(async ({ projectsPage }) => {
    await projectsPage.goto()
  })

  test("should be accessible", async ({ projectsPage }) => {
    await expect(projectsPage.root).toPassAxe()
  })

  test("has page metadata", async ({ page, projectsPage }) => {
    await expect(page).toHaveTitle("Projects | Mark Skelton")
    await expect(projectsPage.description).toHaveAttribute(
      "content",
      /I love creating software/,
    )
  })
})
