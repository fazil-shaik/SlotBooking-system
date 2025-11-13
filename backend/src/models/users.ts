import { pgTable, uuid, varchar, text, numeric, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email").unique().notNull(),
  password: varchar("password").notNull(),
  role: varchar("role", { enum: ["provider", "client"] }).notNull(),
  hourlyRate: numeric("hourly_rate", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at")
});
