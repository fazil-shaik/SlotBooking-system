import { Router, Request, Response } from "express";
import { db } from "../config/db.js";
import { users } from "../models/users.js";

const router = Router();

router.get("/db", async (_req: Request, res: Response) => {
  try {
    // Try to select from users table to check DB connectivity
    const result = await db.select().from(users).limit(1);
    res.json({ status: "ok", db: "connected", usersCount: result.length });
  } catch (err: any) {
    console.error("DB health check failed:", err);
    res.status(500).json({ status: "error", db: "disconnected", message: err.message });
  }
});

export default router;
