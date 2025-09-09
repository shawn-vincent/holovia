# Holovia — Phase 0 (React + Next.js + Vercel)

Holovia is a Phase 0 proof-of-concept for a holistic wellness assistant. It demonstrates Google authentication, a persistent activities tracker, and an AI chat powered by the user’s OpenRouter API key. Data is stored locally in the browser for privacy.

## Tech Stack
- Next.js 14 (App Router) + React 18 + TypeScript (strict)
- NextAuth (Google OAuth, JWT sessions)
- LocalStorage for persistence (no backend DB)
- CSS Modules-style utility classes in `globals.css`

## Getting Started
1. Copy env
   - `cp .env.local.example .env.local`
   - Fill `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `NEXTAUTH_SECRET`
2. Install and run
   - `npm install`
   - `npm run dev`
3. Configure OpenRouter
   - Sign in with Google
   - Open Settings and paste your OpenRouter API key
   - Optionally pick a model or use the default

## Scripts
- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run start` — Run production server
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check
- `npm run test` — Jest + RTL (basic setup)

## Project Structure
```
src/
  app/
    api/auth/[...nextauth]/route.ts   # NextAuth handlers
    layout.tsx                        # Shell + providers
    page.tsx                          # Home (activities + chat)
    settings/page.tsx                 # Settings (OpenRouter configuration)
  components/
    activities/                       # Activity cards and list
    chat/                             # Chat dock
    ui/                               # Button/Input
  context/AppContext.tsx              # Global state + localStorage
  hooks/useOpenRouter.ts              # OpenRouter client (browser)
  types/                              # Types per requirements
  utils/                              # Small helpers
```

## Deployment (Vercel)
- Set these env vars in Vercel Project Settings:
  - `NEXTAUTH_URL` (e.g. https://your-app.vercel.app)
  - `NEXTAUTH_SECRET`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
- Push to a GitHub repo and import into Vercel
- Vercel builds Next.js and provisions serverless auth routes

## Notes on Requirements Mapping
- Authentication: Google SSO via NextAuth (JWT sessions). Redirect link provided; optional middleware redirect can be added.
- Settings: API key saved to localStorage; model list fetched from OpenRouter when possible; masked input.
- Chat: Bottom dock; scrollable history; typing indicator; errors shown; suggestions parsed from `ACTIVITY_SUGGESTION:{"name":"","description":""}` tokens.
- Activities: Manual creation and acceptance from AI suggestions; updates tracked with timestamps; localStorage persistence.
- Responsiveness: Mobile-friendly layout with simple, performant CSS.

## Testing
Jest + Testing Library config is included. Add component and hook tests under `src/**/__tests__/*` and run `npm test`.

## Out of Scope (Phase 0)
No backend database, push notifications, advanced analytics, or multi-device sync. See `doc/requirements/2025-09-09-holovia-phase0-requirements.md` for full scope.

---

© Holovia — Phase 0
