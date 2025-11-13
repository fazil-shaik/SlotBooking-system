import { Pool } from "@neondatabase/serverless";
import { env } from "../src/config/env.js";

const pool = new Pool({ connectionString: env.dbUrl });

async function migrate() {
  const client = await pool.connect();
  try {
    console.log("Running migrations...");
    
    // Add status column to slots table if it doesn't exist
    await client.query(`
      ALTER TABLE slots
      ADD COLUMN IF NOT EXISTS status VARCHAR DEFAULT 'available';
    `);
    console.log("✓ Added status column to slots table");

    // Verify tables and columns
    const tables = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `);
    console.log("\nTables in database:", tables.rows.map((r: any) => r.table_name));

    const slotsColumns = await client.query(`
      SELECT column_name, data_type FROM information_schema.columns 
      WHERE table_name = 'slots'
    `);
    console.log("\nSlots table columns:");
    slotsColumns.rows.forEach((row: any) => {
      console.log(`  - ${row.column_name}: ${row.data_type}`);
    });

    console.log("\n✓ Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    await client.release();
  }
}

migrate();
