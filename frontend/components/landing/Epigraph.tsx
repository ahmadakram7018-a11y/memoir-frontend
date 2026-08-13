import Reveal from "@/components/Reveal";

// A quiet pause between sections — not a numbered step, not a claim to
// substantiate, just a single line standing alone, the way a book gives a
// page to nothing but an epigraph before a chapter begins.
export default function Epigraph() {
  return (
    <section className="well">
      <Reveal className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="font-display text-2xl italic leading-snug text-ink sm:text-3xl">
          Every voice added is one less thing forgotten.
        </p>
      </Reveal>
    </section>
  );
}
