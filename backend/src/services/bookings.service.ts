import { db } from "../config/db.js";
import { bookings } from "../models/bookings.js";
import { slots } from "../models/slots.js";
import { users } from "../models/users.js";
import { eq } from "drizzle-orm";
import { calculateTotalCost } from "../utils/costUtils.js";

export const createBooking = async (clientId: string, slotId: number) => {
  const [slot] = await db.select().from(slots).where(eq(slots.id, slotId));
  if (!slot) throw new Error("Slot not found");
  if (slot.isBooked) throw new Error("Slot already booked");

  const [provider] = await db.select().from(users).where(eq(users.id, slot.providerId!));
  if (!provider) throw new Error("Provider not found");

  const totalCost = calculateTotalCost(slot.startTime, slot.endTime, Number(provider.hourlyRate));

  const [booking] = await db.insert(bookings).values({
    slotId,
    clientId,
    totalCost: String(totalCost)
  }).returning();

  await db.update(slots).set({ isBooked: true }).where(eq(slots.id, slotId));
  return booking;
};
