import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

function BookMockup() {
  return (
    <div className="flex justify-center [perspective:1200px]">
      <div
        className="relative aspect-[2/3] w-52 rounded-r-md rounded-l-sm shadow-[0_30px_70px_rgba(0,0,0,0.5)] [transform:rotateY(-18deg)_rotateX(2deg)]"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
        }}
      >
        <div className="absolute inset-y-0 left-0 w-2 rounded-l-sm bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="h-px w-10 bg-on-accent/40" />
          <p className="mt-4 font-display text-xl italic text-on-accent">
            Eleanor Grace
          </p>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-on-accent/70">
            A Memoir
          </p>
          <span className="mt-4 h-px w-10 bg-on-accent/40" />
        </div>
      </div>
    </div>
  );
}

export default function Keepsake() {
  return (
    <section className="border-t border-border bg-paper-raised">
      <div className="mx-auto grid max-w-5xl items-center gap-14 px-6 py-24 sm:grid-cols-2">
        <Reveal>
          <BookMockup />
        </Reveal>

        <Reveal delay={120}>
          <Eyebrow index="04" label="What you get" align="left" />
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Something <em>that lasts</em>.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            Every memory your family adds becomes part of one story —
            gathered together, then kept exactly as you left it.
          </p>

          <div className="mt-8 grid gap-5">
            <div className="border-l-2 border-accent pl-5">
              <h3 className="font-display text-lg font-semibold text-ink">
                A living memoir
              </h3>
              <p className="mt-1 text-[1.02rem] leading-relaxed text-ink-soft">
                Family and friends you&rsquo;ve invited can add memories any
                time, and can always come back to see it. But once it&rsquo;s
                published, no one — not even you — can change it again.
              </p>
            </div>
            <div className="border-l-2 border-rose pl-5">
              <h3 className="font-display text-lg font-semibold text-ink">
                A keepsake, forever
              </h3>
              <p className="mt-1 text-[1.02rem] leading-relaxed text-ink-soft">
                When you&rsquo;re ready, Memoir becomes a beautifully typeset
                book — ready to print or pass down, built to outlast all of
                us.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
