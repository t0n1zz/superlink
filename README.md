# Superlink

**Reputation-Powered Connections** — Indonesia's verified Web3 talent network, powered by FairScale.

## Tech stack

- **Next.js 16** (App Router), TypeScript, Tailwind CSS
- **PostgreSQL** + Prisma
- **Solana** (wallet adapter: Phantom, Solflare)
- **FairScale API** for reputation scores
- **Mapbox** for the builders map

## Quick start

```bash
# 1. Install dependencies (runs `prisma generate` automatically via postinstall)
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local: set DATABASE_URL (PostgreSQL), and optionally FairScale key, Mapbox token.

# 3. Database (requires PostgreSQL running and DATABASE_URL in .env.local)
npm run db:push             # uses .env.local for DATABASE_URL
npm run db:seed             # optional: seeds default skills

# If you see "User was denied access": grant your DB user access (as postgres):
#   psql -U postgres -c "GRANT ALL ON DATABASE superlink TO your_username;"
#   psql -U postgres -d superlink -c "GRANT ALL ON SCHEMA public TO your_username;"

# 4. Development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Note:** API routes that use the database (e.g. `/api/users/search`, `/api/users/map`, `/profile/[id]`) will return 500 until `DATABASE_URL` is set in `.env.local` and you have run `npx prisma db push`.

## Project structure

```
superlink/
├── app/
│   ├── (auth)/login, register
│   ├── (dashboard)/profile, directory, jobs, map, universities
│   ├── api/auth, fairscale, users, jobs, students, superteam
│   ├── layout.tsx, page.tsx
├── components/auth, profile, directory, map, jobs
├── lib/db, fairscale, solana, auth, utils, superteam-scraper
├── hooks/, types/
├── prisma/schema.prisma
└── .env.example
```

## Main features

- **Wallet auth**: Connect Solana wallet; register stores user + FairScore.
- **FairScale**: `getFairScore(wallet)`, `syncFairScore(userId, wallet)`; sync API at `POST /api/fairscale/sync`.
- **Profiles**: View profile at `/profile/[id]` (header, skills, portfolio, endorsements).
- **Directory**: `/directory` with filters (city, skill, min FairScore, availability); search API at `GET /api/users/search`.
- **Map**: `/map` — Mapbox map of builders with coordinates; `GET /api/users/map`.
- **Jobs**: Post job (with min FairScore), apply; FairScore gating in `POST /api/jobs/[id]/apply`.
- **Students**: `POST /api/students/verify` for student verification (.ac.id bonus).
- **Universities**: `/universities/[slug]` — campus stats and student leaderboard.
- **Superteam Earn**: `POST /api/superteam/import` — import by username (scraper placeholder; implement with Puppeteer when ready).

## Environment variables

See `.env.example`. Required for full functionality:

- `DATABASE_URL` — PostgreSQL connection string
- `FAIRSCALE_API_KEY` — FairScale API key
- `NEXT_PUBLIC_MAPBOX_TOKEN` — Mapbox public token (map works without it but shows a placeholder)
- `NEXT_PUBLIC_SOLANA_RPC_URL` — Solana RPC (defaults to mainnet-beta)

## Database

```bash
npx prisma generate  # After schema changes (also runs on npm install)
npm run db:push      # Apply schema (loads DATABASE_URL from .env.local)
npm run db:seed      # Seed default skills (loads .env.local)
npx prisma db push   # Same as db:push if you use .env for DATABASE_URL
npx prisma migrate dev --name <name>   # Create and run migrations
npx prisma studio    # Visual DB editor
```

## Verification checklist

Verified against the development plan and docs:

- **Setup:** `npm install` (includes `prisma generate` via postinstall), `.env.example` present.
- **Auth:** `POST /api/auth/register` requires valid `walletAddress` (Solana); validates `userType` enum; returns 400 for invalid/missing wallet.
- **FairScale:** `POST /api/fairscale/sync` requires `userId` and `walletAddress`; returns 400 if missing. `lib/fairscale.ts` exposes `getFairScore` and `syncFairScore`.
- **Profile:** `/profile/[id]` uses Prisma with skills, portfolio, endorsements; 404 when user not found.
- **Directory:** `/directory` and `GET /api/users/search` with query params `city`, `skill`, `minFairScore`, `availability`.
- **Map:** `/map` and `GET /api/users/map`; Mapbox via `react-map-gl/mapbox`; placeholder when `NEXT_PUBLIC_MAPBOX_TOKEN` is missing.
- **Jobs:** `POST /api/jobs`, `POST /api/jobs/[id]/apply` with FairScore gating; job post form with Zod + react-hook-form.
- **Students:** `POST /api/students/verify`; university page at `/universities/[slug]`.
- **Superteam:** `POST /api/superteam/import`; scraper in `lib/superteam-scraper.ts` (placeholder for Puppeteer).
- **Build:** `npm run build` succeeds. **Dev:** `npm run dev` serves at http://localhost:3000; homepage loads; wallet connect is client-only.

## Testing

```bash
npm run test        # Run tests once (Vitest)
npm run test:watch  # Watch mode
npm run test:ui     # Vitest UI
```

Tests live in `lib/*.test.ts` and `app/api/**/*.test.ts`. Current coverage: `lib/utils` (cn), `GET /api/health`.

## Deployment

```bash
npm run build
npx prisma migrate deploy   # Production DB
# Deploy to Vercel (or your host); set env vars in dashboard.
```

- **Health check:** `GET /api/health` returns `{ status: "ok", timestamp }` for load balancers or monitoring.
- **404:** Custom `app/not-found.tsx` with link back to home.
- **Loading:** Root and dashboard routes use `loading.tsx` for skeletons/spinner.

## Development plan (6 weeks to MVP)

| Week | Focus |
|------|--------|
| 1 | Setup, DB schema, auth & wallet |
| 2 | FairScale integration, profile + directory |
| 3–4 | Map, jobs + applications |
| 5 | University integration, Superteam Earn import |
| 6 | UI/UX polish, testing, production deploy (custom 404, loading states, health API, Vitest) |

---

Built for the FairScale competition.
