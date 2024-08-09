import { defineConfig, expect } from "@playwright/test"
import axeMatchers from "expect-axe-playwright"
import { fileURLToPath } from "node:url"

expect.extend(axeMatchers)

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.25,
    },
  },
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  reporter: process.env.CI ? "dot" : "list",
  retries: process.env.CI ? 2 : 0,
  snapshotPathTemplate: "{testDir}/__snapshots__/{testFilePath}/{arg}{ext}",
  testDir: fileURLToPath(new URL("./e2e/test", import.meta.url)),
  use: {
    axeOptions: {
      rules: {
        "color-contrast": { enabled: false },
      },
    },
    baseURL: "http://127.0.0.1:3000",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm dev",
    env: {
      NODE_ENV: "test",
    },
    reuseExistingServer: !process.env.CI,
    stderr: "pipe",
    stdout: "ignore",
    url: "http://127.0.0.1:3000",
  },
})
