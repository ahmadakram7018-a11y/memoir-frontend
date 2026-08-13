// A small numbered label above a section heading. Legitimate here because
// the page really does run in a fixed narrative order — not decoration.
// (Sage reads too low-contrast at this size for the index number — that
// color is used in larger, more forgiving places instead; see Trust.)
export default function Eyebrow({
  index,
  label,
  align = "center",
}: {
  index: string;
  label: string;
  align?: "center" | "left";
}) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
      <span className="text-ink-faint">{index}</span>
      {label}
    </p>
  );
}
