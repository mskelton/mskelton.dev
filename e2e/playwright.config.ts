// playwright.config.ts
import type { PlaywrightTestConfig } from "@playwright/test"
import { expect } from "@playwright/test"
import matchers from "expect-axe-playwright"

expect.extend(matchers)

const config: PlaywrightTestConfig = {
  retries: process.env.CI ? 2 : 0,
  fullyParallel: true,
}

export default config
