import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="glow-orb -left-24 top-0 h-96 w-96 bg-accent/10" />
      <div
        aria-hidden
        className="glow-orb -right-24 top-1/3 h-80 w-80 bg-rose/10"
        style={{ animationDelay: "-12s" }}
      />

      <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-20 text-center sm:pt-28">
        <div className="animate-rise" style={{ animationDelay: "0.05s" }}>
          <p className="accent-italic text-xl sm:text-2xl">
            For the ones we&rsquo;ve lost, and the ones we&rsquo;re still
            with.
          </p>

          <h1 className="mt-4 font-display text-[2.75rem] font-semibold leading-[1.1] text-ink sm:text-[3.5rem]">
            Their story doesn&rsquo;t have to end with them.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            When someone you love is gone, everyone who knew them remembers a
            different piece of them. Memoir brings your family and their
            closest friends together to gather it all — before those
            memories start to fade too.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3">
            <Link
              href="/signup"
              className="rounded-full bg-accent px-7 py-4 text-base font-semibold text-on-accent shadow-[0_8px_28px_rgba(217,166,92,0.25)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_14px_44px_rgba(217,166,92,0.4)]"
            >
              Start their memoir
            </Link>
            <p className="text-sm text-ink-faint">
              $3/month. Invite everyone who loved them — no extra cost, no
              limit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
