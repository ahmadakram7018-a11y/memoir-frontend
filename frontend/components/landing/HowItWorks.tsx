import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

const steps = [
  {
    n: "1",
    title: "Create the memoir",
    body: "Start with the person you want to remember. It takes a minute.",
  },
  {
    n: "2",
    title: "Invite the people who loved them",
    body: "Family, close friends, anyone who knew them. Share one link — everyone can add what they remember, from their own phone.",
  },
  {
    n: "3",
    title: "Gather it together",
    body: "Stories, photos, voice memories, even video — collected gently, in one place, for good.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="text-center">
        <Eyebrow index="02" label="How it works" />
        <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          How it comes together
        </h2>
      </Reveal>

      <ol className="mt-14 grid gap-10 sm:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal
            key={step.n}
            as="li"
            delay={i * 120}
            className="rounded-2xl border border-border bg-paper-raised p-7 text-center transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_18px_44px_rgba(0,0,0,0.35),0_0_36px_rgba(217,166,92,0.12)] sm:text-left"
          >
            <span className="font-display text-sm font-semibold text-accent">
              {step.n}
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold text-ink">
              {step.title}
            </h3>
            <p className="mt-2 text-[1.05rem] leading-relaxed text-ink-soft">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
