# SlotBooking System

A small slot booking application with a TypeScript backend (Express + Drizzle ORM + Postgres/Neon) and a Next.js frontend. This README explains how to set up and run the project, what each part does, and how to fix common problems.

## Project structure

- `backend/` — Express + TypeScript backend
  - `src/` — source code (controllers, services, models, routes)
  - `scripts/` — helper scripts (data fixes, migrations)
  - `package.json` — backend npm scripts
- `frontend/` — Next.js frontend (React)
  - `app/` — pages and components
  - `package.json` — frontend npm scripts

## Main features

- Provider can create time slots.
- Client can view and book available slots.
- JWT-based authentication for protected routes.
- Total cost calculation based on provider hourly rate and slot duration.
- Basic validation on backend and frontend for slot times.

## Prerequisites

- Node.js 18+ (we used Node 18/20 in development)
- npm or yarn
- A Postgres-compatible database (Neon is used in this project). You need a valid `DATABASE_URL`.

## Environment variables

Create a `.env` file in `backend/` with these values:

```
DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require
JWT_SECRET=your_jwt_secret_here
PORT=4000
```

Replace `user`, `pass`, `host`, `dbname` and `JWT_SECRET` with your values.

## Backend - Setup & Run

1. Install dependencies:

```bash
cd backend
npm install
```

2. Build (TypeScript) or run directly with `tsx`:

```bash
# build
npm run build

# run in dev (nodemon + tsx)
npm run dev

# or quick run
npx tsx src/server.ts
```

3. Useful scripts (in `backend/scripts/`):
- `fix-bookings.ts` — recompute booking totals and fix invalid slot end times.
  - Run with: `npx tsx scripts/fix-bookings.ts`

## Frontend - Setup & Run

1. Install dependencies and start dev server:

```bash
cd frontend
npm install
npm run dev
```

2. Open the app in the browser (default Next.js port is 3000).

## API Overview

All backend routes are under `/api`.

- Auth
  - `POST /api/auth/register` — register a new user.
    - Body: `{ name, email, password, role, hourlyRate? }`
    - Role is `provider` or `client`. `hourlyRate` required for providers.
  - `POST /api/auth/login` — login.
    - Body: `{ email, password }`
    - Returns `{ token, user }`.

- Slots
  - `GET /api/slots` — list available slots (backend returns slots; frontend filters provider's own slots when needed).
  - `POST /api/slots` — create a slot (requires `Authorization: Bearer <token>`; provider only).
    - Body: `{ startTime, endTime }` (ISO strings)

- Bookings
  - `POST /api/bookings` — create a booking (requires `Authorization: Bearer <token>`; client only).
    - Body: `{ slotId }` — client id is read from the token by the backend.

- Health
  - `GET /health/db` — simple DB connectivity probe used during development.

## Important implementation notes

- User IDs are UUID strings in the database. Do not assume numeric IDs in frontend code.
- Drizzle/PG numeric columns (like `hourly_rate`, `total_cost`) are handled as strings when inserting. The backend converts numeric values to strings where needed.
- The backend includes validation to prevent invalid slot times (end must be after start). The frontend now validates input too.

## Data repair and maintenance

If you see incorrect `total_cost` values (e.g. negative numbers), run the fix script:

```bash
cd backend
npx tsx scripts/fix-bookings.ts
```

This script:
- Normalizes invalid slot `end_time` values (sets them to `start_time + 1 hour` if they are missing or earlier than `start_time`).
- Recomputes `bookings.total_cost` for bookings so values are correct.

If you prefer a different default duration for bad slots (for example 30 minutes), edit `scripts/fix-bookings.ts` and change the interval.

## Troubleshooting

- `Unknown file extension ".ts"` when running nodemon: use `nodemon --exec tsx src/server.ts` or `npx tsx src/server.ts`.
- DB connection issues: verify `DATABASE_URL` and network access to your Postgres/Neon instance.
- If front end still redirects wrong after login: clear localStorage (`token`/`role`) and try again. The backend returns `{ token, user }` where `user.role` is used by the frontend.

## Testing flows manually

1. Register a provider (role `provider`) and note the returned `token`.
2. Login as that provider and create slots from the provider dashboard.
3. Register a client and login as client.
4. On client dashboard, refresh slots and book an available slot.
5. If totals look wrong, run the repair script.

## Contributing

- Keep backend model types and DB schema in sync.
- Add unit tests for `calculateTotalCost` (backend `src/utils/costUtils.ts`) if you change cost logic.
- Frontend: centralize auth and use an axios instance that attaches the token automatically.

## License

This project has no license declared. Add a `LICENSE` file if you want to set an open source license.


---

If you want, I can also:
- Add a short `make` or `npm` script that runs both frontend and backend in parallel for development.
- Add a small admin API to run the booking repair script from the app (protected route).

Tell me which next step you prefer.