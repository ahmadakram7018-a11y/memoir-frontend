import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

export default function Problem() {
  return (
    <section className="border-t border-border bg-paper-raised">
      <Reveal className="mx-auto max-w-3xl px-6 py-24 text-center">
        <Eyebrow index="01" label="The problem" />
        <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Grief makes you want to hold onto everything.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          The way she said your name. The story he told at every holiday. The
          sound of a kitchen full of people who aren&rsquo;t there anymore.
          No single person remembers all of it. But your family, and the
          friends who loved them too, usually remember more than anyone
          expects — <em>if someone gathers it before it scatters</em>.
        </p>
      </Reveal>
    </section>
  );
}
