import { db } from "../config/db.js";
import { users } from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export const registerUser = async (name: string, email: string, password: string, role: "provider" | "client", hourlyRate?: number) => {
  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(password, 10);
  // Generate UUID for user ID and convert numeric values to strings for DB
  const [user] = await db.insert(users).values({
    id: randomUUID(),
    name,
    email,
    password: hashed,
    role,
    hourlyRate: role === "provider" ? (hourlyRate !== undefined && hourlyRate !== null ? String(hourlyRate) : "0") : null
  }).returning();

  const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: "1d" });
  return { token, user };
};

export const loginUser = async (email: string, password: string) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: "1d" });
  return { token, user };
};
