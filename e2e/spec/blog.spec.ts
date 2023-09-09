import matter from "gray-matter"
import fs from "node:fs"
import { expect, test } from "../fixtures/index.js"

const baseURL = new URL("../../app/(main)/blog/", import.meta.url)
const slugs = [
  "auto-formatting-code-using-prettier-and-github-actions",
  "better-code-highlighting-with-shiki",
  "demystifying-typescripts-extract-type",
  "using-yarn-constraints",
  "why-i-use-the-fish-shell",
]

test.describe("Blog page", async () => {
  test("should be accessible", async ({ blogPage }) => {
    await blogPage.goto()
    await expect(blogPage.root).toPassAxe()
  })

  test("has page metadata", async ({ blogPage, page }) => {
    await blogPage.goto()
    await expect(page).toHaveTitle("Blog | Mark Skelton")
    await expect(blogPage.description).toHaveAttribute(
      "content",
      /All of my blog posts/,
    )
  })

  test.describe("posts", () => {
    slugs.forEach((slug) => {
      const path = `/${slug}`

      test.describe(path, () => {
        test.beforeEach(async ({ blogPage }) => {
          await blogPage.goto(path)
        })

        test("should be accessible", async ({ blogPage }) => {
          await expect(blogPage.root).toPassAxe()
        })

        test("renders page without errors", async ({ page }) => {
          const fileURL = new URL(`./${slug}/content.mdx`, baseURL)
          const content = await fs.promises.readFile(fileURL, "utf8")
          const { data } = matter(content)

          await expect(page).toHaveTitle(`${data.title} | Mark Skelton`)
          await expect(page.locator("h1")).toHaveText(data.title)
        })
      })
    })
  })
})
