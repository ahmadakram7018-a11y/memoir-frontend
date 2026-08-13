# Memoir — Product Spec: Landing → Sign up → Welcome Note → Onboarding

This is the spec for the first four screens a Memoir owner ever sees, and the
reasoning behind every decision in them. It assumes no prior context — read
this file top to bottom and you have everything needed to extend the flow
correctly. For *how* it's built (stack, files, components), see
[`Frontend_guide.md`](./Frontend_guide.md) — this file is about *why* the
flow is shaped the way it is.

## Who this is for

**The owner** — the family member who creates the memoir, pays $3/month, and
invites everyone else. Adult, roughly 30s–60s. They arrive motivated but
often tender: a parent is aging, a diagnosis just happened, someone has
recently died, or a birthday just reminded them how few people still
remember the stories they grew up on. They are not shopping for software
features — they're deciding whether to trust something precious to a
product they've never used before.

Two things follow from that:

1. **Trust has to be earned before any input is requested.** By the time
   they reach a form field, they should already believe this is safe,
   honest, and built by people who understand why they're here.
2. **Nothing should feel like a funnel.** No countdowns, no fake urgency, no
   gamified progress bars. Calm and plain throughout — the owner's
   emotional state makes that a functional requirement, not a style
   preference.

A second, silent audience shapes some decisions: **contributors** — often
elderly relatives who will later open a shared link to add a memory. Every
choice about font size, contrast, and plainness of language accounts for
them too, because the owner is implicitly judging "will my mother be able to
use this" while looking at owner-facing pages.

## The flow

```
Landing (/)  →  Sign up (/signup)  →  Welcome note (/handwritten-note)  →  Onboarding (/onboarding)  →  the product
```

Each arrow is a moment the owner could leave. Every screen is designed to
move them one step further without ever feeling rushed or tricked.

---

## 1. Landing page (`/`)

**Job:** in seconds, answer *what is this, what problem does it solve, what
do I get, what does it cost* — honestly enough that nothing later feels like
a surprise. No fields are collected here.

| Section | Purpose |
|---|---|
| **Navbar** | Wordmark, `#pricing` anchor, "Log in", primary "Start your memoir" CTA. One clear action — no menu of pages that don't exist yet. |
| **Hero** | Headline + one-sentence explanation + CTA + price line, all above the fold. Nobody should have to scroll to learn this isn't free. |
| **Problem** | Names the ache (stories slip away in pieces, not all at once) without being asked — recognition builds trust faster than a features list. |
| **Epigraph** | One italic line, no heading, no CTA — a deliberate pause between Problem and How it works, the way a book gives a page to an epigraph before a chapter. |
| **How it works** | Create → Invite → Gather. The one place numbering is used, because the process really is sequential. |
| **Memoir preview** | A hand-built mockup of the actual product (not a stock photo) — see `Frontend_guide.md`. |
| **Keepsake** | "A living memoir" (ongoing, online) + "a keepsake, forever" (printable export). |
| **Trust** | Plain statements: invite-only access, data never sold, family owns/exports/deletes, no app required for contributors, and the immutability promise (once published, nothing can be edited or deleted by anyone — see `Frontend_guide.md`). |
| **Pricing** | $3/month, unambiguous, "only the owner pays." |
| **Final CTA** | Repeats the headline emotion + CTA + price — one more low-pressure invitation for anyone who scrolled the whole page. |
| **Footer** | Wordmark + one warm sentence. No link-farm. |

### Pricing placement

The price appears **three times** on the landing page: under the hero CTA,
in the dedicated Pricing section, and again above the final CTA. This is
intentional repetition, not redundancy — a skimming visitor still sees it
once; a visitor who reads the whole page sees it confirmed twice more.
Nobody reaches signup having to guess.

The copy is explicit that **only the person who starts the memoir pays** —
this single line prevents the most likely trust-breaking misunderstanding: a
relative worrying that *they'll* be charged just for adding a memory.

---

## 2. Sign up (`/signup`)

**Job:** create the account, as fast as possible, without re-litigating
anything the landing page already promised.

| Field | Required? | Why |
|---|---|---|
| Email | Yes | Creates the Supabase auth identity. |
| Password | Yes | Same. |
| *(Google OAuth is also offered as a one-click alternative to both fields.)* | | |

**Deliberately not collected here:** full name, memoir subject,
relationship. Signup's only job is turning a visitor into an authenticated
account — every extra field is one more reason to abandon before the
account even exists. Everything else is asked in onboarding, where it can
do more work (see below).

**Trust reinforcement, not re-negotiation:** one line under the submit
button — *"You're starting a Memoir subscription — $3/month, cancel
anytime."* — repeats the commitment one last time, in the one place someone
could still claim they didn't know.

**Billing:** no card-entry form is designed here on purpose. The backend's
`Subscription` model already has `provider` / `provider_customer_id` /
`provider_subscription_id` columns — it's built to hand billing to a
provider like Stripe, not to store card numbers directly (a first-party
card form would be both a worse experience and a PCI-compliance liability).
**This is not wired up yet** — there is no checkout endpoint on the backend,
so today `signup` succeeds and goes straight to `/handwritten-note`. See
`Frontend_guide.md`'s "Known gaps" for the `TODO(billing)` marker.

**Email confirmation:** if Supabase's "Confirm email" setting is on,
`signUp()` returns no session and the form shows a "check your email"
screen instead of pushing forward into a flow with no authenticated user to
save onboarding answers against.

---

## 3. Welcome note (`/handwritten-note`)

**Job:** the emotional handshake. No fields, no navigation chrome, one
button.

This screen exists to prove *we understand why you're here* before asking
for anything else. It sits **after** signup (the owner is now a real,
authenticated user) and **before** onboarding (before any more questions) —
a pure moment, not attached to a form on either side.

**Why it can't address the owner by name:** name collection is step one of
onboarding, immediately after this screen — we don't have it yet. The note
is addressed to "friend," universally, rather than faking personalization
it can't yet deliver.

**Design choices:**

- **Full screen, zero navigation chrome** — anything that looks like "the
  app" breaks the letter feeling.
- **Handwritten typeface (Caveat), reserved exclusively for this note** — it
  never appears elsewhere, so it keeps its emotional weight.
- **A single "Begin" button, in the UI typeface, not the handwritten one** —
  the deliberate seam: the *letter* is personal and handwritten, the
  *control* is clearly a control.
- **"Whenever you're ready" under the button.** No auto-advance, no timer.
- **Three short lines, not five paragraphs** — the ache, the promise, the
  signature — each arriving on its own beat.

---

## 4. Onboarding (`/onboarding`)

**Job:** collect the minimum that makes the memoir feel instantly real and
personal, then prove it by showing the result immediately.

One question per screen, not a single long form — a person in a tender
state answering one thing at a time is far less likely to bail than one
facing five fields at once.

| Step | Field | Required? | Why this one, why now |
|---|---|---|---|
| 1 | Owner's name | Yes | Fills `user_account.full_name` — the one piece of identity the product needs about the person using it *right now*, so every later screen can say "you." |
| 2 | Subject's name (who the memoir is about) | Yes | A memoir without a subject isn't a memoir yet — the minimum fact needed for the account to feel like *theirs*, not a generic empty one. |
| 3 | Relationship to the subject | Yes, tap-able chips (Mother, Father, Grandmother, Grandfather, Spouse/partner, Sibling, Child, Friend, Other) with a free-text fallback | Powers future personalization without asking for a typed paragraph. Chips beat a dropdown for someone who may be filling this out through tears. |
| 4 | *(payoff, not a field)* — "`{Subject}`'s memoir is ready." | — | Where the "value delivered fast" requirement pays off: the owner sees their own answers reflected back as a real, named thing, with two low-pressure next steps (invite family, or add the first memory). |

**Deliberately not asked here:**

- **Whether the subject is living or has passed.** The single most
  consequential — and most potentially hurtful — question this product
  could ask as a blunt form field on day one. Copy throughout onboarding is
  written tense-neutral ("preserve their story," not "capture" or "honor")
  so it works either way without forcing the owner to declare it.
- **How memories will be captured** (voice / writing / photo / video) — a
  per-memory decision made naturally when someone is actually adding
  something, not a one-time account setting.
- **Invite emails, memoir title/cover, subscription details** — all
  deferred past this flow's boundary. The payoff screen offers "Invite your
  family" as a next step without forcing it.

**Progress indicator:** three small dots, filled as the owner advances — not
a percentage bar or "Step 2 of 7." A percentage bar turns this into a task
list; three dots say "almost there" without quantifying the emotional labor
left.

**What happens on submit:** the three answers are sent as one authenticated
request — `POST /auth/onboarding` with `Authorization: Bearer <supabase
access token>` — to the FastAPI backend, which writes `full_name`,
`subject_name`, and `subject_relationship` onto the caller's own
`user_account` row in a single update. See `Frontend_guide.md`'s "Auth and
backend contract" for why this goes through the backend rather than a
direct client-side Supabase write.

---

## Summary: required vs. optional, end to end

| Screen | Required fields | Optional fields |
|---|---|---|
| Landing | none | none |
| Sign up | Email, Password | none |
| Welcome note | none | none |
| Onboarding | Owner's name, Subject's name, Relationship | none |

Zero optional fields anywhere in this flow. Every field that made the cut is
required because the product cannot do its next job without it; anything
that didn't clear that bar was moved later rather than made
optional-but-present — an optional field is still a field someone has to
read, decide about, and skip, which isn't actually lighter than not asking
at all.
