// server/migrations.ts
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db";

// This function will create all tables based on your schema
export async function runMigrations() {
  console.log("Running migrations...");
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}