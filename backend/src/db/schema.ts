import { pgTable, serial, text, varchar, timestamp, integer, boolean, pgEnum, numeric, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["provider", "client"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRoleEnum("role").notNull().default("client"),
  hourlyRate: numeric("hourly_rate", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const slots = pgTable("slots", {
  id: serial("id").primaryKey(),
  providerId: uuid("provider_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  isBooked: boolean("is_booked").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  slotId: integer("slot_id")
    .notNull()
    .references(() => slots.id, { onDelete: "cascade" }),
  totalCost: numeric("total_cost", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  status: varchar("status", { length: 50 }).default("confirmed"),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id")
    .notNull()
    .references(() => bookings.id, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});
