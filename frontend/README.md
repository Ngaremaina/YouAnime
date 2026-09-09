# YouAnime frontend

Next.js 16 (App Router) + Tailwind CSS frontend for YouAnime, talking to the
FastAPI backend in `../backend`.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in NEXT_PUBLIC_API_URL if not localhost:8000
npm run dev
```

The dev server runs at http://localhost:3000 and expects the backend running
at the URL configured in `.env.local` (defaults to http://localhost:8000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` / `npm start` — production build and serve
- `npm run lint` — ESLint
- `npm test` / `npm run test:coverage` — Jest + React Testing Library

## Architecture notes

- Public reads (animation/genre/director listings) call the FastAPI backend
  directly from Server and Client Components via `src/lib/api.ts`.
- Authenticated writes (add/edit/delete animation, add genre) go through this
  app's own `/api/*` Route Handlers (`src/app/api/**`), which read the
  director's JWT from an httpOnly cookie and attach it as a Bearer token — the
  token itself never reaches client-side JavaScript.
- `/api/login` exchanges director credentials for a JWT from the backend and
  sets it as an httpOnly cookie; `/api/logout` clears it.
- `src/lib/auth.ts` reads that cookie server-side to gate protected pages
  (`/add-animation`, `/edit-animation/[id]`) and to show login state in the nav.
