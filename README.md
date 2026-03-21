# Web Game Hub

A Next.js TypeScript web application for hosting a large library of free, unblocked HTML5 games. Uses Cloudflare for edge hosting, CDN, and DNS, with Supabase for the database and authentication.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup (Supabase)](#database-setup-supabase)
- [Authentication Setup](#authentication-setup)
- [Google AdSense Integration](#google-adsense-integration)
- [Cloudflare Deployment](#cloudflare-deployment)
- [Project Structure](#project-structure)
- [Page & Routing Architecture](#page--routing-architecture)
- [Two-Page Interaction Flow](#two-page-interaction-flow)
- [SSG Strategy](#ssg-strategy)
- [Adding New Games](#adding-new-games)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16.1.7](https://nextjs.org/) — App Router, TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Database | [Supabase](https://supabase.com/) — PostgreSQL with Row Level Security |
| Authentication | [Supabase Auth](https://supabase.com/docs/guides/auth) — Google OAuth, Facebook OAuth, Email/Password |
| Icons | [Lucide React](https://lucide.dev/) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) (edge-compatible standalone output) |
| CDN / DNS | Cloudflare |
| Ads | Google AdSense |

---

## Features

- 🎮 **50 games** across **10 categories** (Action, Adventure, Puzzle, Racing, Sports, Strategy, Arcade, Multiplayer, Shooting, Platformer)
- ⚡ **Maximum SSG** — all game and category pages are statically generated at build time with ISR (1-hour revalidation)
- 🔒 **Two-page gate** — users must visit at least 2 pages before the game player iframe is shown
- 🌙 **Dark gaming theme** — professional dark UI with purple/pink gradient accents
- 📱 **Fully responsive** — mobile-first grid layout
- 🔍 **Client-side search & filtering** — instant search, category filter, and sort (popular / top-rated / newest)
- 👤 **Multi-provider auth** — Google SSO, Facebook/Meta SSO, and email + password via Supabase Auth
- 🔐 **Row Level Security** — Supabase RLS protects all tables; public read / owner write / service-role admin
- 📊 **User profiles** — favorite games, play history, and stats
- 📢 **Google AdSense** — ad banner component with configurable slot IDs; gracefully hidden when unconfigured

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A [Supabase](https://supabase.com/) project
- Google OAuth credentials (for Google SSO)
- Facebook OAuth credentials (for Facebook/Meta SSO)

### 1. Clone and install

```bash
git clone https://github.com/davidsalman/web-game-hub.git
cd web-game-hub
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in all values (see [Environment Variables](#environment-variables)).

### 3. Run database migrations

Apply the SQL scripts in `supabase/migrations/` to your Supabase project (via the Supabase dashboard SQL editor or the Supabase CLI):

```bash
# Option A — Supabase CLI
supabase db push

# Option B — Dashboard SQL editor
# Paste and run each file in order:
# 1. supabase/migrations/001_create_tables.sql
# 2. supabase/migrations/002_rls_policies.sql
# 3. supabase/migrations/003_seed_data.sql
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
```

For standalone deployment (Docker / self-hosted):

```bash
node .next/standalone/server.js
```

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in each value:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (e.g. `https://xxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase `anon` public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase `service_role` secret key (server-side only) |
| `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` | AdSense publisher ID (e.g. `ca-pub-1234567890`) |

> **Security note**: Never commit `.env.local` to source control. Only `.env.local.example` is committed.
> Google and Facebook OAuth credentials are configured directly in the **Supabase dashboard** under Authentication → Providers. They do not need to be added to `.env.local`.

---

## Database Setup (Supabase)

### Migration files

| File | Purpose |
|---|---|
| `001_create_tables.sql` | Creates `categories`, `games`, `profiles`, and `play_history` tables with indexes |
| `002_rls_policies.sql` | Enables RLS and creates policies for all tables |
| `003_seed_data.sql` | Seeds 10 categories and 50 games |
| `004_auto_profile_trigger.sql` | Postgres trigger to auto-create a `profiles` row when a new user signs up |

### Schema overview

```
categories
  id UUID PK
  name TEXT
  slug TEXT UNIQUE
  description TEXT
  icon TEXT (emoji)
  color TEXT (Tailwind gradient class)
  created_at TIMESTAMPTZ

games
  id UUID PK
  name TEXT
  slug TEXT UNIQUE
  description TEXT
  category_id UUID → categories.id
  thumbnail_url TEXT
  game_url TEXT
  is_featured BOOLEAN
  play_count INTEGER
  rating NUMERIC(3,1)
  tags TEXT[]
  created_at TIMESTAMPTZ

profiles (extends auth.users)
  id UUID PK
  user_id UUID UNIQUE → auth.users.id
  username TEXT
  avatar_url TEXT
  bio TEXT
  favorite_games UUID[]
  total_plays INTEGER
  created_at / updated_at TIMESTAMPTZ

play_history
  id UUID PK
  user_id UUID
  game_id UUID → games.id
  played_at TIMESTAMPTZ
```

### RLS policies summary

| Table | Public | Authenticated user | Service role |
|---|---|---|---|
| `categories` | SELECT | — | INSERT, UPDATE, DELETE |
| `games` | SELECT | — | INSERT, UPDATE, DELETE |
| `profiles` | SELECT | INSERT/UPDATE/DELETE own | Full access |
| `play_history` | — | SELECT/INSERT/DELETE own | Full access |

---

## Authentication Setup

This project uses **Supabase Auth** directly for all authentication. JWT sessions are managed automatically by Supabase and stored as cookies via `@supabase/ssr`.

### 1. Google SSO

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
2. Create an **OAuth 2.0 Client ID** (Web application)
3. Add authorized redirect URI: `https://<your-supabase-project>.supabase.co/auth/v1/callback`
4. In the [Supabase dashboard](https://app.supabase.com/) go to **Authentication → Providers → Google**
5. Enter your **Client ID** and **Client Secret** and save

### 2. Facebook / Meta SSO

1. Go to [Meta for Developers](https://developers.facebook.com/) → My Apps → Create App
2. Add the **Facebook Login** product
3. Add valid OAuth redirect URI: `https://<your-supabase-project>.supabase.co/auth/v1/callback`
4. In the [Supabase dashboard](https://app.supabase.com/) go to **Authentication → Providers → Facebook**
5. Enter your **App ID** and **App Secret** and save

### 3. Email / Password

Email authentication is handled natively by Supabase Auth. No additional provider configuration is needed. Users sign up at `/auth/signup` and can recover their password via `/auth/forgot-password`.

### Auth flow

- Sign-in page: `/auth/signin`
- Sign-up page: `/auth/signup`
- Forgot password page: `/auth/forgot-password`
- Reset password page: `/auth/reset-password`
- OAuth callback: `/auth/callback` (exchanges the authorization code for a Supabase session)
- On first sign-in a `profiles` row is automatically created via a Postgres trigger (`004_auto_profile_trigger.sql`)
- Sessions are stored as cookies and validated server-side using `@supabase/ssr`

---

## Google AdSense Integration

1. Get your **Publisher ID** from [Google AdSense](https://www.google.com/adsense/) (format: `ca-pub-XXXXXXXXXX`)
2. Set it in `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX
   ```
3. The `<AdBanner>` component is placed in the layout and on key pages. Pass the `slot` prop for each placement:
   ```tsx
   <AdBanner slot="1234567890" format="horizontal" />
   <AdBanner slot="0987654321" format="rectangle" />
   ```
4. When `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` is not set or is the placeholder value, a subtle placeholder box is shown in development (no external requests).

---

## Cloudflare Deployment

### Cloudflare Pages (recommended)

1. Connect your GitHub repo to Cloudflare Pages
2. Set **Framework preset** to `Next.js`
3. Build command: `npm run build`
4. Output directory: `.next`
5. Add all environment variables in the Cloudflare Pages dashboard
6. Cloudflare Pages automatically handles ISR and edge caching

### Self-hosted on Cloudflare Workers / Docker

The app is built with `output: 'standalone'` which produces a minimal Node.js server:

```bash
npm run build
node .next/standalone/server.js
```

Place the standalone output behind Cloudflare's proxy (CDN / DNS) for edge caching.

---

## Project Structure

```
web-game-hub/
├── .env.local.example          # Environment variable template
├── next.config.ts              # Next.js config (standalone output, image domains, security headers)
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── supabase/
│   └── migrations/
│       ├── 001_create_tables.sql   # Schema (categories, games, profiles, play_history)
│       ├── 002_rls_policies.sql    # Row Level Security policies
│       └── 003_seed_data.sql       # 10 categories + 50 games seed data
└── src/
    ├── types/
    │   └── index.ts            # TypeScript interfaces (Category, Game, UserProfile, etc.)
    ├── lib/
    │   ├── supabase.ts         # Supabase client factory (browser, static, service-role)
    │   ├── supabase-server.ts  # Server-only Supabase client with cookie support (SSR)
    │   ├── auth.ts             # Supabase Auth type re-exports
    │   └── games-data.ts       # Data fetching helpers + static fallback data (50 games, 10 categories)
    ├── components/
    │   ├── Header.tsx          # Top navigation with auth state, search trigger, mobile menu
    │   ├── Footer.tsx          # Footer with links and branding
    │   ├── GameCard.tsx        # Game thumbnail card with rating, play count, category badge
    │   ├── CategoryCard.tsx    # Category card with icon and gradient color
    │   ├── AdBanner.tsx        # Google AdSense banner (graceful fallback when unconfigured)
    │   ├── SearchBar.tsx       # Search input that navigates to /browse?q=
    │   └── PageTracker.tsx     # Cookie-based page visit counter (enforces two-page gate)
    └── app/
        ├── layout.tsx                      # Root layout (Header, Footer, PageTracker, AdSense script)
        ├── globals.css                     # Global styles + Tailwind directives
        ├── page.tsx                        # Home page (SSG) — hero, categories, featured/popular/new games
        ├── browse/
        │   └── page.tsx                    # Browse all games (SSG + client-side search/filter/sort)
        ├── categories/
        │   ├── page.tsx                    # All categories grid (SSG)
        │   └── [slug]/
        │       └── page.tsx                # Category detail + games (SSG via generateStaticParams)
        ├── games/
        │   └── [slug]/
        │       ├── page.tsx                # Game info page (SSG via generateStaticParams)
        │       ├── play/
        │       │   ├── page.tsx            # Play page shell (SSG)
        │       │   └── GamePlayClient.tsx  # Client component: page-gate check + iframe player
        ├── auth/
        │   ├── callback/route.ts           # Supabase OAuth code-exchange callback
        │   ├── signin/page.tsx             # Sign-in form (Google, Facebook, Email)
        │   ├── signup/page.tsx             # Sign-up form (Google, Facebook, Email)
        │   ├── forgot-password/page.tsx    # Forgot password — sends reset email
        │   └── reset-password/page.tsx     # Reset password — sets new password from email link
        ├── profile/
        │   └── page.tsx                    # User profile (dynamic — reads Supabase session)
```

---

## Page & Routing Architecture

| Route | Type | Description |
|---|---|---|
| `/` | SSG (1h ISR) | Home — hero, featured games, categories, popular games |
| `/browse` | SSG | Browse all 50 games with client-side filtering |
| `/categories` | SSG (1h ISR) | All 10 categories grid |
| `/categories/[slug]` | SSG (1h ISR) | Category detail page with all games in that category |
| `/games/[slug]` | SSG (1h ISR) | Game info — thumbnail, description, tags, "Play Now" CTA |
| `/games/[slug]/play` | SSG + client gate | Game player — `GamePlayClient` checks cookie and renders iframe |
| `/auth/signin` | Client | Sign-in page |
| `/auth/signup` | Client | Sign-up page |
| `/auth/forgot-password` | Client | Forgot password — sends reset email |
| `/auth/reset-password` | Client | Reset password — set new password from email link |
| `/auth/callback` | Dynamic | Supabase OAuth code-exchange handler |
| `/profile` | Dynamic (SSR) | Authenticated user profile |

---

## Two-Page Interaction Flow

The requirement is that users must interact with **at least 2 pages** before the game player iframe is shown.

### How it works

1. **`PageTracker` component** (in `src/components/PageTracker.tsx`) is rendered in the root layout and runs on every page navigation. It reads a `wgh_pages` cookie and increments it on each non-play-page visit.

2. **`GamePlayClient` component** (in `src/app/games/[slug]/play/GamePlayClient.tsx`) checks the cookie on mount. If the count is `< 2`, the user is redirected to the game's info page (`/games/[slug]`) instead of seeing the player.

### Intended user flow

```
Home (/)                   ← page 1
   ↓
Categories or Browse        ← page 2 (count now ≥ 2)
   ↓
Game Info (/games/[slug])  ← click "Play Now"
   ↓
Game Player (/games/[slug]/play) ← iframe unlocked ✅
```

Direct access to `/games/[slug]/play` on a fresh session redirects back to the game info page.

---

## SSG Strategy

Next.js App Router with maximum static generation:

- **`export const revalidate = 3600`** on all data-fetching pages → ISR with 1-hour cache
- **`generateStaticParams()`** on all `[slug]` routes → all 50 game pages and 10 category pages pre-built at deploy time
- **`STATIC_GAMES` / `STATIC_CATEGORIES`** arrays in `src/lib/games-data.ts` act as the fallback data source when Supabase is not configured, ensuring the build always succeeds
- Only `/profile` and `/auth/callback` are dynamic (server-rendered on demand)

---

## Adding New Games

### Option A — Update the static data (no database required)

Edit `src/lib/games-data.ts` and add a new entry to `STATIC_GAMES`. Then rebuild.

### Option B — Supabase (production)

Insert a row directly into the `games` table. The ISR revalidation (1 hour) will pick it up automatically, or you can trigger a manual revalidation.

```sql
INSERT INTO games (name, slug, description, category_id, thumbnail_url, game_url, is_featured, tags)
VALUES (
  'My New Game',
  'my-new-game',
  'A short description.',
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',  -- Action category ID
  'https://example.com/thumb.png',
  'https://example.com/game/',
  false,
  ARRAY['action', 'arcade']
);
```

Then add `'my-new-game'` to `STATIC_GAMES` (or update `generateStaticParams` to fetch from Supabase at build time).

