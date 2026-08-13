import Link from "next/link";

export default function HandwrittenNote() {
  return (
    <section className="well relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div
        aria-hidden
        className="glow-orb left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 bg-accent/16"
      />

      <div className="relative max-w-xl text-center">
        <p
          className="animate-rise font-hand text-3xl text-ink-soft sm:text-4xl"
          style={{ animationDelay: "0.1s" }}
        >
          Dear friend,
        </p>

        <p
          className="animate-rise mt-8 font-hand text-[2.1rem] leading-[1.3] text-ink sm:text-[2.5rem]"
          style={{ animationDelay: "0.5s" }}
        >
          Whatever brought you here today, you don&rsquo;t have to hold their
          memory alone.
        </p>

        <p
          className="animate-rise mt-8 font-hand text-3xl text-ink-soft sm:text-4xl"
          style={{ animationDelay: "1s" }}
        >
          We&rsquo;re here to help you keep it.
        </p>

        <p
          className="animate-rise mt-10 font-hand text-2xl text-ink-faint"
          style={{ animationDelay: "1.3s" }}
        >
          — Memoir
        </p>
      </div>

      <div
        className="animate-rise relative mt-14 flex flex-col items-center gap-2"
        style={{ animationDelay: "1.7s" }}
      >
        <Link
          href="/onboarding"
          className="rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-on-accent shadow-[0_8px_28px_rgba(217,166,92,0.3)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_14px_44px_rgba(217,166,92,0.45)]"
        >
          Begin
        </Link>
        <p className="text-sm text-ink-faint">Whenever you&rsquo;re ready.</p>
      </div>
    </section>
  );
}
