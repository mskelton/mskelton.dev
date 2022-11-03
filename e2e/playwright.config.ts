import { expect, type PlaywrightTestConfig } from "@playwright/test"
import matchers from "expect-axe-playwright"

expect.extend(matchers)

const config: PlaywrightTestConfig = {
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
}

export default config
