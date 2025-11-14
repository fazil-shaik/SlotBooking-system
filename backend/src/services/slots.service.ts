import { db } from "../config/db.js";
import { slots } from "../models/slots.js";
import { eq } from "drizzle-orm";

export const createSlot = async (providerId: string, startTime: string, endTime: string) => {
  const s = new Date(startTime);
  const e = new Date(endTime);
  if (!isFinite(s.getTime()) || !isFinite(e.getTime())) throw new Error("Invalid start or end time");
  if (e.getTime() <= s.getTime()) throw new Error("End time must be after start time");

  const [slot] = await db.insert(slots).values({
    providerId,
    startTime: s,
    endTime: e,
    isBooked: false,
    status: "available"
  }).returning();

  return slot;
};

export const getAllAvailableSlots = async () => {
  return await db.select().from(slots).where(eq(slots.isBooked, false));
};

export const updateSlotStatus = async (slotId: number, status: "available" | "booked") => {
  await db.update(slots).set({ status }).where(eq(slots.id, slotId));
};
