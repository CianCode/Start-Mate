import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  out: "./drizzle/migrations",
  schema: "./src/db/schema",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL!,
  },
});
