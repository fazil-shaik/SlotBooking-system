import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
neonConfig.webSocketConstructor = ws;

export const db = drizzle(pool, { schema });
