import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "../models/index.js";
import { env } from "./env.js";

const pool = new Pool({ connectionString: env.dbUrl });
export const db = drizzle(pool, { schema });
