import { Router } from "express";
import { createBookingHandler } from "../controllers/bookings.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createBookingHandler);

export default router;
