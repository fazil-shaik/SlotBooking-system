import express from "express";
import cors from "cors";
import { json } from "body-parser";

import authRoutes from "./routes/auth.routes.js";
import slotRoutes from "./routes/slots.routes.js";
import bookingRoutes from "./routes/bookings.routes.js";

const app = express();
app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;
