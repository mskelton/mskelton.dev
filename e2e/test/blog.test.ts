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

test.describe("Blog page", () => {
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

      // eslint-disable-next-line playwright/valid-title
      test.describe(path, () => {
        test.beforeEach(async ({ blogPage }) => {
          await blogPage.goto(path)
        })

        test("should be accessible", async ({ blogPage }) => {
          await expect(blogPage.root).toPassAxe()
        })

        test("renders page without errors", async ({ page }) => {
          const fileURL = new URL(`./posts/${slug}/content.mdx`, baseURL)
          const content = await fs.promises.readFile(fileURL, "utf8")
          const { data } = matter(content)

          await expect(page).toHaveTitle(`${data.title} | Mark Skelton`)
          await expect(page.locator("h1")).toHaveText(data.title)
        })
      })
    })
  })

  test.describe("snapshots", () => {
    test("post header", async ({ blogPage, page }) => {
      await blogPage.goto("/efficient-prisma-pagination")
      await expect(page.locator("article header")).toHaveScreenshot(
        "header.png",
      )
    })

    test("basic code block", async ({ blogPage }) => {
      await blogPage.goto("/efficient-prisma-pagination")
      const single = blogPage.codeBlock("Representing state in the URL").first()
      const multi = blogPage.codeBlock("Previous/next links").first()
      const lineNumbers = blogPage.codeBlock("The search query")

      await expect(single).toHaveScreenshot("single-line.png")
      await expect(multi).toHaveScreenshot("multi-line.png")
      await expect(lineNumbers.nth(0)).toHaveScreenshot("line-numbers.png")
      await expect(lineNumbers.nth(1)).toHaveScreenshot(
        "line-numbers-highlight.png",
      )
    })

    test("code block titles", async ({ blogPage }) => {
      await blogPage.goto("/using-yarn-constraints")
      const title = blogPage.codeBlock("Let’s see an example").first()
      await expect(title).toHaveScreenshot("title.png")

      await blogPage.goto("/automated-npm-publishing-using-github-actions")
      const lineNumbers = blogPage.codeBlock("Basic publish action").first()
      await expect(lineNumbers).toHaveScreenshot("title-line-numbers.png")
    })
  })
})
