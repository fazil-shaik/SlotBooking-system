import { pgTable, serial, varchar, text, numeric } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").unique().notNull(),
  password: text("password").notNull(),
  role: varchar("role", { enum: ["provider", "client"] }).notNull(),
  hourlyRate: numeric("hourly_rate", { precision: 10, scale: 2 })
});
