import { pgTable, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.js";

export const slots = pgTable("slots", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id").references(() => users.id),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true }).notNull(),
  status: varchar("status", { enum: ["available", "booked"] }).default("available")
});
