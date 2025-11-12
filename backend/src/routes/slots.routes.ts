import { Router } from "express";
import { createSlotHandler, listSlotsHandler } from "../controllers/slot.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createSlotHandler);
router.get("/", listSlotsHandler);

export default router;
