import { expect, test } from "../fixtures"

test.describe("home page", async () => {
  test("renders social links", async ({ homePage }) => {
    const { socialLink } = homePage
    await expect(socialLink).toHaveCount(3)

    const links = [
      ["GitHub", "https://github.com/mskelton"],
      ["Twitter", "https://twitter.com/mskelton0"],
      ["Linkedin", "https://linkedin.com/in/mskelton0"],
    ]

    for (let i = 0; i < links.length; i++) {
      await expect(socialLink.nth(i)).toHaveAttribute("title", links[i][0])
      await expect(socialLink.nth(i)).toHaveAttribute("href", links[i][1])
      await expect(socialLink.nth(i)).toHaveAttribute("target", "_blank")
    }
  })

  test("should be accessible", async ({ homePage }) => {
    await expect(homePage.root).toBeAccessible()
  })
})
