import dotenv from "dotenv";
dotenv.config();

export const env = {
  dbUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
  port: Number(process.env.PORT) || 4000
};
