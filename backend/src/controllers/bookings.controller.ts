import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { createBooking } from "../services/bookings.service.js";

export const createBookingHandler = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "client") {
      return res.status(403).json({ message: "Only clients can book slots" });
    }
    const { slotId } = req.body;
    const booking = await createBooking(req.user.id, slotId);
    res.json(booking);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};
