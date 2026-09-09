# YouAnime

YouAnime is a vibrant and user-friendly web application designed to bring the magic of animated entertainment to your fingertips. Whether you're a fan of classic cartoons or the latest animated series, YouAnime offers a diverse library that caters to all age groups and preferences.

This project consists of a Next.js (App Router + Tailwind CSS) frontend and a FastAPI backend backed by Neon Postgres. Both services are containerized with Docker and can be run together with Docker Compose.

# Demo
![home](./frontend/media/anime.gif)

## Prerequisites

- Node.js 22+ and npm (for the frontend)
- Python 3.12+ (for the backend)
- A [Neon](https://neon.tech) Postgres project (or any Postgres instance) for the database
- Docker and Docker Compose (optional, for containerized runs)

## Setting up the backend (FastAPI + Neon)

```sh
cd backend
python -m venv .venv
source .venv/bin/activate   # .venv\Scripts\activate on Windows
pip install -r requirements.txt

cp .env.example .env        # then fill in DATABASE_URL, JWT_SECRET, etc.
alembic upgrade head        # applies migrations to your Neon database
pytest                      # runs the backend test suite (isolated, no DB needed)

uvicorn main:app --reload --app-dir app
```

`backend/.env` needs, at minimum:
- `DATABASE_URL` — your Neon connection string (`postgresql+psycopg://...`)
- `JWT_SECRET` — a random secret for signing login tokens (`python -c "import secrets; print(secrets.token_hex(32))"`)

The API is available at `http://localhost:8000` (interactive docs at `/docs`).

## Setting up the frontend (Next.js)

```sh
cd frontend
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_API_URL if the backend isn't on localhost:8000
npm run dev
```

The app is available at `http://localhost:3000`. See `frontend/README.md` for
architecture notes on how auth and API calls are wired up.

## Running with Docker

```sh
docker-compose up --build
```

This builds and runs both services. The backend still needs `backend/.env`
populated (Docker Compose loads it via `env_file`); the frontend reads
`NEXT_PUBLIC_API_URL` from your shell environment (or a root-level `.env`
file), defaulting to `http://localhost:8000`.

## Tests and CI

- Backend: `cd backend && pytest` (pytest + httpx, in-memory SQLite, no external DB needed)
- Frontend: `cd frontend && npm test` (Jest + React Testing Library)

Both suites run automatically on every push/PR to `main` via GitHub Actions
(`.github/workflows/python-app.yml`, `.github/workflows/node.js.yml`).
Dependabot (`.github/dependabot.yml`) keeps npm, pip, and GitHub Actions
dependencies up to date weekly.

## Project plan

See [`WORKPLAN.md`](./WORKPLAN.md) for the phased plan this codebase was
upgraded against (Neon migration, auth, testing, CI/CD).

## License

This project is licensed under the Apache License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/)
- [Next.js](https://nextjs.org/)
- [Neon](https://neon.tech/)
- [Docker](https://www.docker.com/)
