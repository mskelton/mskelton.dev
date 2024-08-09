import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dbCredentials: {
    url: "file:./dev.db",
  },
  dialect: "sqlite",
  driver: "turso",
  schema: "./app/lib/db/schema.ts",
})
