import { expect, PlaywrightTestConfig } from "@playwright/test"
import { matchers as axeMatchers } from "expect-axe-playwright"
import path from "path"

expect.extend(axeMatchers)

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "dot" : "list",
  retries: process.env.CI ? 2 : 0,
  testDir: path.join(__dirname, "./e2e/spec"),
  use: {
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  webServer: {
    command: "yarn dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
}

export default config
