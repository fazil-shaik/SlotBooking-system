import { Response } from "express";
import { createSlot, getAllAvailableSlots } from "../services/slots.service.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

export const createSlotHandler = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "provider") {
      return res.status(403).json({ message: "Only providers can create slots" });
    }
    const { startTime, endTime } = req.body;
    const slot = await createSlot(req.user.id, startTime, endTime);
    res.json(slot);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const listSlotsHandler = async (_req: AuthRequest, res: Response) => {
  try {
    const slots = await getAllAvailableSlots();
    res.json(slots);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
