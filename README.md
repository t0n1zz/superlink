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
# Install dependencies (if not already done)
npm install
npm install @hookform/resolvers   # for JobPostForm zod resolver

# Set up environment
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL, FairScale key, Mapbox token, etc.

# Database
npx prisma generate
npx prisma db push

# Development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
npx prisma studio    # Visual DB editor
npx prisma migrate dev --name <name>   # Create migration
npx prisma db seed   # If seed script is configured
```

## Deployment

```bash
npm run build
npx prisma migrate deploy   # Production DB
# Deploy to Vercel (or your host); set env vars in dashboard.
```

## Development plan (6 weeks to MVP)

| Week | Focus |
|------|--------|
| 1 | Setup, DB schema, auth & wallet |
| 2 | FairScale integration, profile + directory |
| 3–4 | Map, jobs + applications |
| 5 | University integration, Superteam Earn import |
| 6 | UI/UX polish, testing, production deploy |

---

Built for the FairScale competition.
