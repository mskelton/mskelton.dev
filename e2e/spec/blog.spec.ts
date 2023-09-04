import glob from "fast-glob"
import matter from "gray-matter"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { expect, test } from "../fixtures/index.js"

const baseURL = new URL("../../app/(main)/blog/", import.meta.url)
const cwd = fileURLToPath(baseURL)
const filenames = await glob("**/*.mdx", { cwd })

test.describe("Blog page", async () => {
  test("should be accessible", async ({ blogPage }) => {
    await blogPage.goto()
    await expect(blogPage.root).toPassAxe()
  })

  test("has page metadata", async ({ blogPage, page }) => {
    await blogPage.goto()
    await expect(page).toHaveTitle("Blog - Mark Skelton")
    await expect(blogPage.description).toHaveAttribute(
      "content",
      /All of my blog posts/,
    )
  })

  test.describe("posts", () => {
    filenames.forEach((filename) => {
      const blogPath = `/${  path.dirname(filename)}`

      test.describe(blogPath, () => {
        test.beforeEach(async ({ blogPage }) => {
          await blogPage.goto(blogPath)
        })

        test("should be accessible", async ({ blogPage }) => {
          await expect(blogPage.root).toPassAxe()
        })

        test("renders page without errors", async ({ page }) => {
          const fileURL = new URL(filename, baseURL)
          const content = await fs.promises.readFile(fileURL, "utf8")
          const { data } = matter(content)

          await expect(page).toHaveTitle(`${data.title} - Mark Skelton’s Blog`)
          await expect(page.locator("h1")).toHaveText(data.title)
        })
      })
    })
  })
})
