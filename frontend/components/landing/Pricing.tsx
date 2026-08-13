import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

const included = [
  "Unlimited family and close friends invited",
  "Unlimited stories, photos, voice & video",
  "Your living memoir online, always",
  "A printable keepsake export, whenever you're ready",
  "Cancel anytime — you keep what you've gathered",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-paper py-24">
      <div
        aria-hidden
        className="glow-orb left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 bg-accent/10"
      />

      <Reveal className="relative mx-auto max-w-md px-6 text-center">
        <Eyebrow index="06" label="Pricing" />
        <div className="mt-8 rounded-3xl border border-border bg-paper-raised px-8 py-10 text-center shadow-[0_28px_70px_rgba(0,0,0,0.4)] sm:px-12 sm:py-12">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            One fair price. <em>No surprises.</em>
          </h2>

          <div className="mt-5 flex items-baseline justify-center gap-2">
            <span className="font-display text-6xl font-semibold text-accent">
              $3
            </span>
            <span className="text-lg text-ink-soft">/ month</span>
          </div>
          <p className="accent-italic mt-2">
            Less than a coffee — to keep a lifetime of stories.
          </p>

          <ul className="mx-auto mt-9 max-w-xs space-y-3 text-left">
            {included.map((item) => (
              <li key={item} className="flex gap-3 text-[1.02rem] text-ink-soft">
                <span aria-hidden className="text-accent">
                  &#10003;
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-ink-faint">
            Only the person who starts the memoir pays. Everyone you invite
            joins for free.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
