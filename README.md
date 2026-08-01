# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Projects

### Project 1: AI-Based Unique Company Name Generator
A Python CLI tool that generates unique, brandable company names from a seed word and industry, validates them through a multi-stage pipeline, and checks real domain availability.

#### Features
- Smart generation with 7 distinct strategies (Syllable Blending, Phonetic Assembly, Mutation, etc.)
- Validation pipeline for length, characters, blacklists, pronounceability, and brandability scores
- Async domain checking using DNS, RDAP, and WHOIS
- Export support for CSV, JSON, Excel, and SQLite
- Interactive CLI based on `questionary` and `rich`

#### Requirements
See `requirements.txt` for details.

```bash
pip install -r requirements.txt
```

> Note: `pyenchant` may require the C library `enchant` to be installed on your system.

#### Usage
Run the main script:

```bash
python src/main.py
```

Then follow the interactive prompts to select your industry, seed word, and preferences.

#### Configuration
Edit `config/config.yaml` to adjust:
- Domain extensions
- Timeout and concurrency limits
- Cache settings
- Minimum and maximum lengths

#### Future extensions
The `src/extensions` folder contains stubs for future API integrations (trademark checking, social handles).

### Project 2: AI Finance Platform Overview
A full-stack finance dashboard built with Next.js 15 App Router, Tailwind CSS, Prisma ORM with PostgreSQL, Clerk authentication, Inngest serverless/background processing, ArcJet / Google Gemini generative AI, Resend email, and shadcn-ui components.

#### Key folders
- `app/` — main Next.js app router pages and layouts
- `(auth)/` — login/sign-up pages and auth layout
- `(main)/` — authenticated dashboard area
- `api/` — API routes for Inngest and seed data
- `components/` — reusable UI components and shared widgets
- `lib/` — helper utilities, Prisma client, ArcJet, auth checks, and Inngest client
- `prisma/` — Prisma schema and migration history
- `actions/` — server-side request handlers and event functions
- `data/` — static data such as categories and landing page text
- `emails/` — email templates for Resend notifications

#### Important configuration

##### Prisma
- `prisma/schema.prisma` uses PostgreSQL
- `DATABASE_URL` and `DIRECT_URL` must be set in `.env`
- `@prisma/client` is generated automatically after install via `postinstall`

##### Authentication
- Uses `@clerk/nextjs`
- `app/layout.js` wraps the site in `ClerkProvider`
- Clerk requires `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`

##### AI / Email integrations
- `GEMINI_API_KEY` for Google generative AI support
- `ARCJET_KEY` for ArcJet integration
- `RESEND_API_KEY` for sending email notifications

#### Installed dependencies and compatibility
- `next@15.0.5`
- `react@18.3.1` / `react-dom@18.3.1`
- `prisma@6.0.1`
- `@clerk/nextjs@6.6.0`
- `react-day-picker@10.0.1`
- `date-fns@3.6.0`
- `tailwindcss@3.4.1`

##### What was fixed
- Updated `date-fns` from `^4.1.0` to `^3.6.0` for compatibility with `react-day-picker`
- Updated `react-day-picker` to a React 18-compatible release
- Locked React and React DOM to `18.3.1` because several UI libraries require React 18 peer dependencies

#### Local development setup
1. Copy `.env.example` to `.env`
2. Fill in your database credentials and provider keys
3. If you have PostgreSQL running locally, set `DATABASE_URL` and `DIRECT_URL`
4. Run:

```bash
npm install --legacy-peer-deps
npm run dev
```

If installation fails due to stale local artifacts, remove `node_modules` and `package-lock.json`, then rerun:

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### How to run the app
- Development: `npm run dev`
- Production build: `npm run build`
- Serve build: `npm run start`

#### Useful project entry points
- `app/page.js` — landing/home page
- `app/(main)/dashboard/page.jsx` — authenticated dashboard UI
- `lib/prisma.js` — Prisma client singleton
- `prisma/schema.prisma` — database model definitions
- `app/layout.js` — global app layout, Clerk provider, and footer

#### Notes
- Uses App Router conventions and server components by default
- `next.config.mjs` allows remote images from `randomuser.me` and larger server action body limits
- There is no `.env` file in the repo; create one from `.env.example` before running

### Project 3: CyberaHAT 🎩🤖
AI-first cybersecurity education and security assessment platform built around Google Gemma 4.

#### Key features
- Student profiling and memory with per-topic mastery models
- Adaptive quiz engine with MCQ, true/false, fill-in-the-blank, short answer, scenario, and code questions
- Contextual AI tutor with learner-aware chat
- Proactive lab assistant that explains terminal errors and warns on destructive commands
- AI study guides generated per topic and level
- Recommendation engine for daily goals, weekly plans, and next-step actions
- Instructor analytics for class performance, hardest topics, and engagement trends
- Interactive Docker lab engine with web terminal streaming
- Security benchmark scanner using nmap, sqlmap, nuclei, nikto, ZAP, and more via Dockerode
- AI-written PDF reports in Executive/Technical/Developer/Learning formats
- Gamification and CTF flag capture

#### Architecture
Next.js frontend → NestJS API → AI service layer → Google AI Studio (Gemini API)

- Frontend: Next.js App Router, React, Tailwind CSS, TanStack Query, xterm.js
- Backend: NestJS, Prisma ORM, PostgreSQL, Redis, BullMQ, Dockerode, Socket.IO
- AI: Google Gemma 4
- Infra: Docker Compose for Postgres, Redis, and isolated ephemeral lab networks

#### Getting started
##### Prerequisites
- Docker Desktop
- Node.js v20+
- Google AI Studio API key

##### Configure your API key

```bash
cp .env.example .env
# then set GEMINI_API_KEY=... in .env
```

##### One-click start (Windows)

```bash
start.bat
```

This starts PostgreSQL and Redis, runs first-run setup, and launches the API and frontend.

##### Manual start

```bash
npm install
npm run build -w @cyberahat/shared
cd apps/api && npx prisma db push && npm run seed && cd ../..
npm run dev
```

- Web UI: `http://localhost:3000`
- API docs: `http://localhost:3001/api/docs`

##### Default accounts
- Admin: `admin@cyberahat.io` / `Admin!2026@CyberaHAT`
- Instructor: `instructor@cyberahat.io` / `Instructor!2026`

#### Configuration
Key environment variables:
- `GEMINI_API_KEY` — Google AI Studio API key
- `GEMINI_MODEL` — default `gemma-4-31b-it`
- `DATABASE_URL` — PostgreSQL connection string
- `REDIS_URL` — Redis connection string for BullMQ
- `JWT_SECRET`, `JWT_REFRESH_SECRET` — auth token secrets
- `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_WS_URL` — frontend API/WebSocket URLs

> Use `GEMINI_MODEL=gemma-4-12b-it` for a faster, lower-latency model without code changes.

#### Security & ethics
- RBAC with JWT auth; active scans require explicit authorization and `scan:execute` permission
- Lab WebSocket is authenticated and enforces per-session container ownership
- Labs run on an isolated, non-routable Docker network
- API keys are loaded from environment variables and never committed

### Project 4: Windows Key Logger
A Windows-targeted input logger written in Python. It captures keyboard presses and mouse clicks, stores log entries in `%LOCALAPPDATA%` by default, and can be packaged as a standalone executable with `PyInstaller`.

#### Requirements
- Windows OS
- Python 3.8+
- `pynput`
- `tkinter` available
- `pyinstaller` for building an executable

#### Install dependencies

```powershell
python -m pip install --upgrade pip
python -m pip install pynput pyinstaller
```

#### Run from source

```powershell
python logger.py
```

#### Build a standalone executable

```powershell
pyinstaller logger.spec
```

After building, the executable is placed in `dist\logger`.

#### Notes
- Designed for use only on machines you own or manage
- Do not use on other people’s systems without express consent
- Close the process or kill the `logger.py`/`logger.exe` instance to stop logging
