import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import slotRoutes from "./routes/slots.routes.js";
import bookingRoutes from "./routes/bookings.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send('Slot Booking System API is running');
})
app.use("/api/auth", authRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/health", healthRoutes);

export default app;
