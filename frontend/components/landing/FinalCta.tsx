import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function FinalCta() {
  return (
    <section className="well relative overflow-hidden">
      <div
        aria-hidden
        className="glow-orb left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 bg-accent/14"
      />

      <Reveal className="relative mx-auto max-w-2xl px-6 py-28 text-center">
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Someone in your family remembers something only <em>they</em>{" "}
          remember.
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Start gathering it today — with everyone who loved them too.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/handwritten-note"
            className="rounded-full bg-accent px-7 py-4 text-base font-semibold text-on-accent shadow-[0_8px_28px_rgba(217,166,92,0.25)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_14px_44px_rgba(217,166,92,0.4)]"
          >
            Start their memoir
          </Link>
          <p className="text-sm text-ink-faint">$3/month, cancel anytime.</p>
        </div>
      </Reveal>
    </section>
  );
}
