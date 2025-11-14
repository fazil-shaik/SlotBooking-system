import { Pool } from "pg";
import { env } from "../src/config/env.js";

const pool = new Pool({ connectionString: env.dbUrl });

async function run() {
  const client = await pool.connect();
  try {
    console.log('Normalizing bad slot end_time values (set to start_time + 1 hour where end_time <= start_time or invalid)...');
    await client.query("UPDATE slots SET end_time = start_time + interval '1 hour' WHERE end_time IS NULL OR end_time <= start_time OR end_time < '2000-01-01'");

    console.log('Finding bookings with negative or zero total_cost...');
    const res = await client.query(`SELECT b.id, b.slot_id, b.client_id, b.total_cost, s.start_time, s.end_time, u.hourly_rate, u.id AS provider_id FROM bookings b JOIN slots s ON b.slot_id = s.id JOIN users u ON s.provider_id = u.id WHERE b.total_cost IS NULL OR b.total_cost < 0`);
    console.log(`Found ${res.rows.length} bookings to fix`);
    for (const row of res.rows) {
      try {
        const { id, slot_id, start_time, end_time, hourly_rate } = row;
        console.log('Fixing booking', id, 'slot', slot_id);
        const s = new Date(start_time);
        const e = new Date(end_time);
        if (!isFinite(s.getTime()) || !isFinite(e.getTime()) || e.getTime() <= s.getTime()) {
          console.warn('Skipping booking', id, '- invalid slot times', start_time, end_time);
          continue;
        }
        const hours = (e.getTime() - s.getTime()) / (1000 * 60 * 60);
        const rate = hourly_rate ? Number(hourly_rate) : 0;
        const total = Number((hours * rate).toFixed(2));
        await client.query('UPDATE bookings SET total_cost = $1 WHERE id = $2', [total, id]);
        console.log('Updated booking', id, 'to total_cost', total);
      } catch (err) {
        console.error('Failed to fix booking row', row, err);
      }
    }
    console.log('Done');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await client.release();
  }
}

run();
