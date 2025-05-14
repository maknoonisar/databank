// drizzle.config.ts
import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

// Parse connection string if using DATABASE_URL
let dbConfig: any = {};
if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  dbConfig = {
    host: url.hostname,
    port: parseInt(url.port || "5432"),
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1)
  };
} else {
  dbConfig = {
    host: "localhost",
    port: 5432,
    user: "admin",
    password: "admin",
    database: "humanitarian_data"
  };
}

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: dbConfig,
} satisfies Config;