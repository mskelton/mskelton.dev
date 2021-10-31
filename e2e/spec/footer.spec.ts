import { expect, test } from "../fixtures"

test.describe("footer", async () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
  })

  test("renders social links", async ({ footer }) => {
    await expect(footer.socialLink).toHaveCount(4)

    const links = [
      "https://github.com/mskelton",
      "https://twitter.com/mskelton0",
      "https://www.linkedin.com/in/mskelton0/",
    ]

    for (let i = 0; i < links.length; i++) {
      const link = footer.socialLink.nth(i)
      await expect(link).toHaveAttribute("href", links[i])
      await expect(link).toHaveAttribute("target", "_blank")
    }

    await expect(footer.socialLink.last()).toHaveAttribute(
      "href",
      "mailto:mdskelton99@gmail.com"
    )
  })
})
