import { pgTable, serial, integer, uuid, numeric, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { slots } from "./slots.js";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  slotId: integer("slot_id").references(() => slots.id),
  clientId: uuid("client_id").references(() => users.id),
  totalCost: numeric("total_cost", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at"),
  status: varchar("status").default("pending")
});
