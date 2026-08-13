# Memoir Frontend Guide

How the frontend is built, what each piece does, and why. Read
[`SPEC.md`](./SPEC.md) first for the *flow* reasoning (landing → signup →
welcome note → onboarding); this file is about the *implementation*.

## What this pass did

1. **Fixed a real signup/backend integration bug.** `OnboardingFlow.tsx` was
   writing `full_name` straight from the browser via a client-side Supabase
   `update`, then POSTing to `/memoirs` — an endpoint that never existed —
   with no auth header. The backend has since grown a real endpoint for
   exactly this, `POST /auth/onboarding`
   (`memoir-backend/app/api/routes/auth.py`), authenticated and writing all
   three onboarding fields (`full_name`, `subject_name`,
   `subject_relationship`) in one update. The frontend now calls that
   endpoint with the user's Supabase access token instead of writing to the
   database directly. See "Auth and backend contract" below.
2. **Verified signup/login actually hit Supabase**, not a mock or a stale
   backend route — confirmed by reading the client construction, not
   assumed. See the same section.
3. **Removed stale/duplicate files**: a stray `main.py` FastAPI stub that
   had nothing to do with this Next.js app, a `README.md` that was a
   byte-for-byte duplicate of the repo root's, and `guide.md`, a session log
   that had drifted out of sync with the code (it described a backend call
   in `LoginForm.tsx` that no longer exists, and raised an "open question"
   about `full_name` that item 1 above resolves).
4. **Rewrote this file and `SPEC.md` in full.**

## Stack

Next.js 16.3 (App Router), React 19, TypeScript, Tailwind CSS v4
(CSS-first — tokens live in `app/globals.css`, no `tailwind.config.ts`),
Supabase for auth (`@supabase/ssr`). Fonts are self-hosted via
`next/font/local` (`app/fonts.ts`): Fraunces for display type, Public Sans
for body/UI, Caveat reserved solely for the welcome note. No icon library —
every icon (Google "G", lock, eye, download, phone) is a hand-written inline
SVG in the component that uses it.

## Auth and backend contract

**Signup and login talk to Supabase directly from the browser — there is no
custom auth backend.** `SignupForm.tsx` calls `supabase.auth.signUp()` and
`LoginForm.tsx` calls `supabase.auth.signInWithPassword()` /
`signInWithOAuth({ provider: "google" })`, where `supabase` comes from
`createClient()` in `lib/supabase/client.ts` — a real `createBrowserClient`
pointed at `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
(`frontend/.env.local`, a live Supabase project, not placeholders). Nothing
in the signup/login path calls the FastAPI backend — password auth is
100% Supabase's job. This was checked directly against the client source and
the request each form makes, not inferred from file names.

**Why `@supabase/ssr` and not plain `supabase-js`:** a plain
`createClient()` from `@supabase/supabase-js` keeps the session in
`localStorage` only, which server code (middleware, route handlers) can
never see. `createBrowserClient` (browser side) and `createServerClient`
(server side) instead mirror the session into cookies, so:

- `lib/supabase/client.ts` — browser client, used in every `"use client"`
  auth component. Call `createClient()` fresh each time (the official
  Supabase pattern) rather than sharing one instance.
- `lib/supabase/server.ts` — server client for Route Handlers/Server
  Components, reading/writing cookies via `next/headers`.
- `lib/supabase/middleware.ts` → `proxy.ts` — runs on every request (Next.js
  16 renamed `middleware.ts` to `proxy.ts`; same mechanism). Calls
  `supabase.auth.getUser()` — deliberately *not* `getSession()`, which only
  reads the cookie and would accept a stale/tampered one — to revalidate the
  session against Supabase's Auth server on every request, refresh the
  session cookie, and redirect signed-out users away from
  `/onboarding` and `/handwritten-note`.
- `app/auth/callback/route.ts` — where Google OAuth *and* email-confirmation
  links both land (Supabase's PKCE flow sends both through a `?code=`
  param). Exchanges the code for a session, then checks
  `user_account.full_name`: set → the person already finished onboarding
  once, send them to `/`; unset → send them into `/onboarding`.
- `lib/supabaseClient.ts` — **do not import from here.** Deliberately left
  as a dead re-export (`export { createClient } from "./supabase/client"`)
  so a stray old import fails loudly at compile time instead of silently
  reintroducing the localStorage-only client.

**Where the FastAPI backend *does* come in** (`memoir-backend/`, prefix
`/auth`): it never issues or checks passwords. It verifies the Supabase JWT
a request carries (`Authorization: Bearer <token>`) against Supabase's
public JWKS, then acts on the backend's own `user_account` row for that
user.

| Endpoint | Called from | Purpose |
|---|---|---|
| `POST /auth/onboarding` | `OnboardingFlow.tsx`, on the final step | Authenticated update of `full_name`, `subject_name`, `subject_relationship` on the caller's own row. This is now the only writer of those columns from onboarding — no direct client-side Supabase write happens anymore. |
| `GET /auth/me` | *(not currently called by any page)* | Returns the caller's `user_account` row. Available for a future profile screen. |
| `GET /auth/premium-check` | *(not currently called by any page)* | Same, but 402s if the subscription isn't active — for gating future paid features. |

A Postgres trigger (`on_auth_user_created`, migration `ad06379323a2`) is
what actually creates the `user_account` row, in the same transaction as
the Supabase signup — no frontend or backend code ever inserts that row
directly. That's why onboarding does an `UPDATE`, never an `INSERT`: the
row is guaranteed to already exist by the time onboarding runs.

## File map

```
memoir-frontend/
  SPEC.md                    — flow spec (read first)
  Frontend_guide.md          — this file
  frontend/
    app/
      layout.tsx, page.tsx      — root layout, landing page
      globals.css                — design tokens, base styles, motion primitives
      fonts.ts, fonts/            — self-hosted .woff2 files
      signup/, login/, handwritten-note/, onboarding/  — one page.tsx per route
      auth/callback/route.ts      — OAuth + email-confirmation code exchange
    components/
      landing/                    — Navbar, Hero, Problem, Epigraph, HowItWorks,
                                     MemoirPreview, Keepsake, Trust, Pricing,
                                     FinalCta, Footer
      onboarding/                 — HandwrittenNote, OnboardingFlow
      SignupForm.tsx, LoginForm.tsx
      Reveal.tsx, Eyebrow.tsx, GoogleIcon.tsx
    lib/
      supabase/client.ts, server.ts, middleware.ts   — the real Supabase clients
      supabaseClient.ts            — dead re-export, do not use
    proxy.ts                     — wires middleware.ts into Next's request pipeline
```

## Components

**Auth**
- **`SignupForm.tsx`** — email/password + Google OAuth. On success with a
  session, redirects to `/handwritten-note`; if Supabase's "Confirm email"
  is on and no session comes back, shows a "check your email" screen
  instead. A `TODO(billing)` comment marks where a Stripe Checkout redirect
  belongs once that endpoint exists.
- **`LoginForm.tsx`** — email/password + Google OAuth. On success, updates
  `last_login_at` (client-side, allowed by RLS on the caller's own row) and
  redirects to `/`.

**Onboarding**
- **`HandwrittenNote.tsx`** — static, no state. Full-bleed `.well` section,
  Caveat type, one "Begin" link to `/onboarding`.
- **`OnboardingFlow.tsx`** — 4-step client component (`step: 0 | 1 | 2 | 3`):
  owner's name → subject's name → relationship chips → payoff screen. On
  the final "Continue," calls `POST /auth/onboarding` (see above) and shows
  an inline error if it fails rather than silently continuing.

**Landing** (`components/landing/*`) — one file per section, composed in
`app/page.tsx` in narrative order (Navbar → Hero → Problem → Epigraph →
HowItWorks → MemoirPreview → Keepsake → Trust → Pricing → FinalCta →
Footer). `MemoirPreview.tsx` is the notable one: a hand-built HTML/CSS/SVG
mockup of the actual product (one memoir, a contributor avatar stack, a
voice/photo/text entry each) — used instead of stock photography, since no
photo of strangers could honestly represent the product's actual
differentiator (multiple family members contributing to one memoir), and
every prior attempt at sourcing family stock photography had failed on
crop, licensing, or authenticity grounds.

**Shared**
- **`Reveal.tsx`** — scroll-triggered fade/rise via `IntersectionObserver`,
  for any below-the-fold section. Takes `delay` (ms, for staggering) and
  `as` (`"div" | "section" | "li"`).
- **`Eyebrow.tsx`** — numbered section labels (`01 THE PROBLEM` …
  `05 PRICING`) above each landing section — legitimate because the
  sections really do run in a fixed narrative order.
- **`GoogleIcon.tsx`** — the standard multi-color Google "G," shared by both
  auth forms.

## Design system (`app/globals.css`)

The whole site is **dark-first by design, not "dark mode"** — the audience
is, in large part, grieving, and a bright cheerful storefront is the wrong
room for that. The palette ("Twilight Sepia") is a warm espresso/plum-brown
near-black, not a cool tech-product slate.

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#2D1A1B` | Page background. |
| `--color-paper-raised` | `#40282A` | Cards, form fields. |
| `--color-well` | `#1B0F10` | Deeper background for the highest-weight sections (`Trust`, `FinalCta`, `HandwrittenNote`), applied via `.well` — the only "alternating rhythm" device available now that there's no light section to contrast against. |
| `--color-ink` / `-soft` / `-faint` | `#F5ECDD` / `#D6C4B4` / `#AC917F` | Primary / secondary / microcopy text — warm cream, not stark white. |
| `--color-accent` / `-bright` / `-hover` / `-soft` | `#D9A65C` / `#EFC98D` / `#B8813C` / `#4A3420` | Candlelight gold — the one deliberately lit thing in the room. Used sparingly (CTAs, focus states), never as a background wash. |
| `--color-rose` / `-bright` | `#C77B5E` / `#DE9B7C` | Secondary accent — dusty rose. Never a CTA color; lives in quieter roles (avatar accents, alternating icons). |
| `--color-border` | `rgba(245,236,221,0.12)` | Hairline borders — translucent, since a solid hex line either vanishes or looks chalky on dark depending on the shade. |
| `--color-error` | `#D97C5E` | Form validation. |
| `--color-on-accent` | `#2D1A1B` | Text on accent-filled surfaces — reuses the page background color, so the palette stays closed. |

**Shadows must be recomputed for dark, not reused from a light build:** a
shadow tuned for a light page (e.g. `rgba(32,31,29,0.12)`) is invisible
here. Elevated elements use black, high-opacity shadows
(`rgba(0,0,0,0.4–0.5)`) — the way a real shadow in a dim room is the
darkest thing in the scene, not a subtle tint.

**Motion:** `.animate-rise` (one-time entrance, 1.2s,
`cubic-bezier(0.16,1,0.3,1)`, no overshoot) for above-the-fold content;
`Reveal.tsx`'s `.reveal` class (same easing, 1.1s) for below-the-fold,
scroll-triggered content. `.glow-orb` is a slow (34s), low-opacity ambient
drift standing in for candlelight. Interactive elements transition over
300–500ms, not Tailwind's 150ms default. Everything respects
`prefers-reduced-motion`.

**Editorial italics:** `em` and `.accent-italic` render in Fraunces italic
globally. Used sparingly and deliberately — one italic moment per section
at most (e.g. the Hero/FinalCta bookend on the word "*they*") — not as
decoration.

**The immutability promise:** `Trust.tsx` states that once a memoir is
published, nothing in it can be changed or deleted by anyone, including the
owner. This is a real product commitment, not just marketing copy — treat
it as a constraint on the eventual "publish" feature's backend design.

## Known gaps (backend work this frontend already expects)

1. **No `memoir` table yet.** `Subscription.memoir_id`
   (`memoir-backend/app/models/subscription.py`) is nullable with the
   comment *"No FK yet — the memoir table doesn't exist."* Nothing in the
   frontend currently depends on a memoir row existing — onboarding writes
   only to `user_account` — but the onboarding payoff screen's two CTAs
   ("Invite family," "Add your first memory") both link to `/` as a
   placeholder, since there's no real destination yet.
2. **No billing/checkout endpoint yet.** `SignupForm.tsx` redirects straight
   to `/handwritten-note` after signup. `Subscription`'s
   `provider`/`provider_customer_id`/`provider_subscription_id` columns
   confirm the intended path is a provider like Stripe — never build a
   first-party card-number form against this schema.
3. **`GET /auth/me` and `GET /auth/premium-check` are unused** by any page
   today. Both exist and work; nothing currently needs them.

## If you extend `MemoirPreview.tsx` or add photography

This product deliberately has no photography anywhere — three earlier
rounds of stock photography (of generic families) failed on bad crops,
licensing risk, or looking staged, and neither direct competitor
researched (StoryWorth, Remento) uses generic family stock photography
either; both show the real product/object instead. If a screen ever
genuinely needs a photograph, hold it to that bar — would this pass as
something a real family actually has, not something a stock studio
produced for a brochure — and prefer extending the hand-built mockup
approach first.
