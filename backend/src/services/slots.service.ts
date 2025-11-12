import { db } from "../config/db.js";
import { slots } from "../models/slots.js";
import { eq } from "drizzle-orm";

export const createSlot = async (providerId: number, startTime: string, endTime: string) => {
  const [slot] = await db.insert(slots).values({
    providerId,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    status: "available"
  }).returning();

  return slot;
};

export const getAllAvailableSlots = async () => {
  return await db.select().from(slots).where(eq(slots.status, "available"));
};

export const updateSlotStatus = async (slotId: number, status: "available" | "booked") => {
  await db.update(slots).set({ status }).where(eq(slots.id, slotId));
};
