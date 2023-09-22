import { expect, PlaywrightTestConfig } from "@playwright/test"
import axeMatchers from "expect-axe-playwright"
import { fileURLToPath } from "node:url"

expect.extend(axeMatchers)

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  reporter: process.env.CI ? "dot" : "list",
  retries: process.env.CI ? 2 : 0,
  testDir: fileURLToPath(new URL("./e2e/spec", import.meta.url)),
  use: {
    axeOptions: {
      rules: {
        "color-contrast": { enabled: false },
      },
    },
    baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3000",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm dev",
    reuseExistingServer: !process.env.CI,
    stderr: "pipe",
    stdout: "ignore",
    url: "http://127.0.0.1:3000",
  },
}

export default config
