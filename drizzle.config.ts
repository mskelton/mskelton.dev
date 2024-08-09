import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  dialect: "sqlite",
  driver: "turso",
  schema: "./app/lib/db/schema.ts",
})
