import { pgTable, serial, uuid, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { users } from "./users.js";

export const slots = pgTable("slots", {
  id: serial("id").primaryKey(),
  providerId: uuid("provider_id").references(() => users.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  isBooked: boolean("is_booked").default(false),
  status: varchar("status", { enum: ["available", "booked"] }).default("available"),
  createdAt: timestamp("created_at")
});
