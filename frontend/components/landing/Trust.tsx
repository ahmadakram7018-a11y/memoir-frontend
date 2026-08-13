import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M6.6 6.7C4.5 8.1 3 10 2 12c1.7 3.9 5.4 7 10 7 1.6 0 3.1-.4 4.4-1M9.9 4.2A10.8 10.8 0 0 1 12 4c4.6 0 8.3 3.1 10 7-.5 1.2-1.2 2.3-2.1 3.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M12 4v11m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 18h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function SealIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-accent">
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

const points = [
  {
    icon: LockIcon,
    text: "Only the people you invite can see or add to this memoir.",
  },
  {
    icon: EyeOffIcon,
    text: "Nothing is ever sold, mined, or used to train anything.",
  },
  {
    icon: DownloadIcon,
    text: "Your family owns this story — export it whenever you want.",
  },
  {
    icon: PhoneIcon,
    text: "No app to fight with. Anyone can open a link and start typing, talking, or uploading — from a phone, at any age.",
  },
];

export default function Trust() {
  return (
    <section className="well relative overflow-hidden">
      <div
        aria-hidden
        className="glow-orb left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 bg-accent/8"
      />

      <div className="relative mx-auto max-w-4xl px-6 py-28">
        <Reveal className="text-center">
          <Eyebrow index="05" label="Our promise" />
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Built to be trusted with something this precious.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {points.map((point, i) => {
            const Icon = point.icon;
            return (
              <Reveal
                key={point.text}
                delay={i * 100}
                className="flex gap-4 rounded-2xl border border-border p-6"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper-raised ${
                    i % 2 === 0 ? "text-accent" : "text-rose-bright"
                  }`}
                >
                  <Icon />
                </span>
                <p className="text-[1.02rem] leading-relaxed text-ink-soft">
                  {point.text}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          delay={400}
          className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-accent/25 bg-paper-raised px-8 py-9 text-center sm:flex-row sm:text-left"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-soft">
            <SealIcon />
          </span>
          <p className="text-[1.05rem] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">
              Once your family publishes it, the memoir is unchangeable.
            </span>{" "}
            No one — not even you — can edit, change, or delete a memory
            from it again. What you gathered stays exactly as you left it,
            for good.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
