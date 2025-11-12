import { pgTable, serial, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { slots } from "./slots.js";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  slotId: integer("slot_id").references(() => slots.id),
  clientId: integer("client_id").references(() => users.id),
  providerId: integer("provider_id").references(() => users.id),
  totalCost: numeric("total_cost", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
