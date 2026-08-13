// A realistic mock of a *finished, published* memoir — so a visitor sees
// the actual end result before they ever sign up, not just a promise of
// one. Two product facts this section exists to make felt, not just
// stated: (1) it's built by many people, not one (contributors, comments),
// and (2) once published, the story itself is unchangeable — comments are
// the only thing that can still be added. Echoes, not contradicts, the
// sealed-memoir callout in Trust.tsx.
//
// No photography, real or crafted — every "photo" mention here is an icon,
// not an image. This product deliberately shows no stock photos of
// strangers (see Frontend_guide.md); the same reasoning applies to any
// stand-in imagery, since a mismatched or invented photo is worse than no
// photo at all.
//
// Deliberately no life dates on the cover. Onboarding never asks whether
// the subject is living or has passed (spec.md), and copy stays
// tense-neutral throughout for the same reason — a closed date range
// ("1938–2023") is an obituary convention that would quietly break that
// rule. "Kept by her family" carries the warmth without declaring anything
// the product itself doesn't ask.

import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

function SealIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 text-accent">
      <path
        d="M12 3l2.2 1.6 2.7-.3.9 2.6 2.4 1.3-.7 2.7 1.4 2.4-2 1.9.4 2.7-2.7.5-1.3 2.4-2.5-1-2.5 1-1.3-2.4-2.7-.5.4-2.7-2-1.9 1.4-2.4-.7-2.7 2.4-1.3.9-2.6 2.7.3L12 3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M9 12.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-rose-bright">
      <path d="M4 5.5h16v10H9.5L5 19v-3.5H4v-10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M12 4v11m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" />
      <path d="M3 16l5-4 4 3 4-5 5 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const contributors = [
  { initials: "SG", bg: "#D9A65C" },
  { initials: "MG", bg: "#C98B7A" },
  { initials: "JR", bg: "#E8C083" },
];

const comments = [
  {
    name: "Michael",
    relation: "Son",
    text: "I'd forgotten she hummed while she watered the tomatoes. Thank you for writing this down.",
  },
  {
    name: "Rachel",
    relation: "Niece",
    text: "This is exactly how I remember her kitchen too — down to the radio station.",
  },
];

export default function MemoirPreview() {
  return (
    <section className="border-t border-border bg-paper-raised">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <Reveal className="text-center">
          <Eyebrow index="03" label="See it, finished" />
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
            One day, this is what everyone opens.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Every memoir becomes a real, finished page like this one —
            gathered by everyone who loved them, and{" "}
            <em>kept exactly as they left it</em>.
          </p>
        </Reveal>

        <Reveal
          delay={150}
          className="mt-14 overflow-hidden rounded-3xl border border-border bg-paper shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
        >
          {/* cover */}
          <div className="well relative border-b border-border px-7 py-10 text-center sm:px-10 sm:py-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              <SealIcon /> Published
            </span>
            <p className="mt-6 font-display text-3xl italic text-ink sm:text-4xl">
              Eleanor Grace
            </p>
            <p className="mt-2 text-sm text-ink-faint">
              A memoir kept by her family · 42 memories
            </p>
          </div>

          {/* chapter */}
          <div className="border-b border-border p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-bright">
              Chapter Three
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
              The Garden She Grew
            </h3>
            <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">
              She was out there before the coffee finished brewing, humming
              something with no name, talking to the tomatoes like they were
              listening. We teased her for it for thirty years. Now
              I&rsquo;d give anything to hear it one more Sunday.
            </p>
            <p className="mt-3 text-sm text-ink-faint">
              Written by Sarah · Daughter
            </p>

            <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <PhotoIcon />
              </span>
              <p className="text-sm text-ink-soft">
                Michael also added a photo to this memory.
              </p>
            </div>
          </div>

          {/* contributors */}
          <div className="flex flex-col gap-3 border-b border-border p-7 sm:flex-row sm:items-center sm:gap-5 sm:p-10">
            <div className="flex -space-x-2">
              {contributors.map((c) => (
                <div
                  key={c.initials}
                  style={{ background: c.bg }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-paper text-xs font-semibold text-ink"
                >
                  {c.initials}
                </div>
              ))}
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-paper bg-accent-soft text-xs font-semibold text-accent">
                +5
              </div>
            </div>
            <div>
              <p className="text-sm text-ink-soft">
                8 people have added memories to Eleanor&rsquo;s story.
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-faint">
                <MicIcon /> Some spoken aloud, some typed — whatever felt
                easiest.
              </p>
            </div>
          </div>

          {/* comments — the one living layer on a finished story */}
          <div className="border-b border-border p-7 sm:p-10">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <CommentIcon /> Comments on this memory
            </p>
            <div className="mt-4 space-y-4">
              {comments.map((c) => (
                <div key={c.name} className="border-l-2 border-border pl-4">
                  <p className="text-[0.98rem] leading-relaxed text-ink-soft">
                    {c.text}
                  </p>
                  <p className="mt-1 text-xs text-ink-faint">
                    {c.name} · {c.relation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* the permanence promise + keepsake hint */}
          <div className="flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <p className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
              <span className="mt-0.5">
                <SealIcon />
              </span>
              <span>
                <span className="font-semibold text-ink">
                  Eleanor&rsquo;s memoir is unchangeable now.
                </span>{" "}
                No one can edit or delete a memory from it again — comments
                are the only thing anyone can still add.
              </span>
            </p>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-ink-soft">
              <DownloadIcon /> Also a printed keepsake
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
