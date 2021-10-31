import { test as base } from "@playwright/test"
import { MatcherOptions } from "expect-axe-playwright"

interface PageObjectFixtures {
  a11yOptions: MatcherOptions
}

export const test = base.extend<PageObjectFixtures>({
  a11yOptions: {
    rules: {
      "color-contrast": { enabled: false },
    },
  },
})
