import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dbCredentials: {
    url: "file:./data/mskelton.db",
  },
  dialect: "sqlite",
  driver: "turso",
  schema: "./app/lib/db/schema.ts",
})
