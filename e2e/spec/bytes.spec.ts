import { expect, test } from "../fixtures/index.js"

test.describe("Bytes page", async () => {
  test("should be accessible", async ({ bytesPage }) => {
    await bytesPage.goto()
    await expect(bytesPage.root).toPassAxe()
  })

  test("has page metadata", async ({ bytesPage, page }) => {
    await bytesPage.goto()
    await expect(page).toHaveTitle("Bytes | Mark Skelton")
    await expect(bytesPage.description).toHaveAttribute(
      "content",
      /^Bytes is my collection of short-form/,
    )
  })

  test("can search by text", async ({ bytesPage, page }) => {
    await bytesPage.goto()
    await expect(bytesPage.byte().root).not.toHaveCount(1)
    await bytesPage.search("shell aliases")

    await expect(page).toHaveURL("/bytes?q=shell+aliases")
    await expect(bytesPage.byte().root).toHaveCount(1)
    await expect(bytesPage.byte().title).toHaveText("Better Shell Aliases")
    await expect(bytesPage.byte().description).toContainText(
      "I use shell aliases quite heavily to simplify common CLI commands",
    )
  })

  test("can search by tag", async ({ bytesPage }) => {
    await bytesPage.goto("/bytes?tag=git")
    const title = "Using Git Hooks When Creating Worktrees"
    const byte = bytesPage.byte(title)

    await expect(bytesPage.searchHint).toHaveText("Showing results for #git")
    await expect(byte.root).toBeVisible()
    await expect(byte.description).toContainText(
      "I've started to use git worktrees more lately",
    )
  })

  test("can clear filters", async ({ bytesPage }) => {
    await bytesPage.goto("?q=worktree")
    await expect(bytesPage.byte().root).toHaveCount(1)
    await expect(bytesPage.byte().title).toHaveText(
      "Using Git Hooks When Creating Worktrees",
    )

    await bytesPage.clear.click()
    await expect(bytesPage.byte().root).not.toHaveCount(1)
  })

  test("should show an empty state if no bytes are found", async ({
    bytesPage,
    page,
  }) => {
    await bytesPage.goto("?q=asdf")
    await expect(bytesPage.byte().root).toBeHidden()
    await expect(
      page.getByText("We couldn’t find any bytes matching “mark”."),
    ).toBeHidden()
  })

  test.describe("byte page", () => {
    test("should be accessible", async ({ bytesPage }) => {
      await bytesPage.goto("/applescript-js")
      await expect(bytesPage.root).toPassAxe()
    })

    test("renders page without errors", async ({ bytesPage, page }) => {
      await bytesPage.goto("/applescript-js")
      const title = "Controlling Browsers With AppleScript"
      await expect(page).toHaveTitle(`${title} | Mark Skelton`)
      await expect(page.locator("h1")).toHaveText(title)
    })

    test("should show a 404 page if byte is not found", async ({
      bytesPage,
      notFoundPage,
    }) => {
      await bytesPage.goto("/asdf")
      await expect(notFoundPage.code).toHaveText("404")
      await expect(notFoundPage.title).toHaveText("Byte Not Found")
      await expect(notFoundPage.subtitle).toContainText(
        "Seems you are trying to access a byte which doesn't exist",
      )
    })
  })
})
