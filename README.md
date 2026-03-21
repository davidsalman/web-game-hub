# Web Game Hub

A Next.js TypeScript web application for hosting a large library of free, unblocked HTML5 games. Uses Cloudflare for edge hosting, CDN, and DNS, with Supabase for the database and authentication.

## Tech Stack

- **Framework**: Next.js 16.1.7 with App Router & TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL with RLS)
- **Auth**: NextAuth.js v5 (Google, Facebook, Email/Password)
- **Deployment**: Cloudflare (edge-compatible `standalone` output)
- **Ads**: Google AdSense integration

## Features

- 🎮 50 games across 10 categories
- ⚡ Maximum SSG — all game/category pages statically generated
- 🔒 Two-page interaction requirement before gameplay (page visit tracking via cookie)
- 🌙 Dark gaming theme
- 📱 Fully responsive
- 🔍 Client-side search and filtering
- 👤 Google SSO, Facebook SSO, and email/password auth

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
# Fill in your Supabase and OAuth credentials
```

### 3. Run database migrations
Apply the SQL files in `supabase/migrations/` to your Supabase project:
1. `001_create_tables.sql` — Schema
2. `002_rls_policies.sql` — Row Level Security
3. `003_seed_data.sql` — 10 categories + 50 games

### 4. Run development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home (SSG)
│   ├── browse/page.tsx             # Browse all games (SSG + client filter)
│   ├── categories/page.tsx         # All categories (SSG)
│   ├── categories/[slug]/page.tsx  # Category detail (SSG)
│   ├── games/[slug]/page.tsx       # Game info (SSG)
│   ├── games/[slug]/play/page.tsx  # Game player (SSG + client gate)
│   ├── auth/signin/page.tsx        # Sign in
│   ├── auth/signup/page.tsx        # Sign up
│   ├── profile/page.tsx            # User profile (dynamic)
│   └── api/auth/[...nextauth]/     # NextAuth API
├── components/
│   ├── Header.tsx, Footer.tsx
│   ├── GameCard.tsx, CategoryCard.tsx
│   ├── AdBanner.tsx, SearchBar.tsx
│   └── PageTracker.tsx
├── lib/
│   ├── supabase.ts                 # Supabase clients
│   ├── auth.ts                     # NextAuth config
│   └── games-data.ts               # Data fetching + static fallback
└── types/index.ts
supabase/migrations/
├── 001_create_tables.sql
├── 002_rls_policies.sql
└── 003_seed_data.sql
```

## Two-Page Interaction Flow

Users must visit at least 2 pages before playing a game:
> Home → Categories/Browse → Game Info → **Play**

This is enforced via a `wgh_pages` cookie tracked by `PageTracker`. The play page client-side checks the count and redirects to the game info page if the threshold isn't met.

## Environment Variables

See `.env.local.example` for all required variables.
