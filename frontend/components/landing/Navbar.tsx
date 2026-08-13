import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          Memoir
        </Link>

        <div className="flex items-center gap-7">
          <Link
            href="#pricing"
            className="hidden text-[0.95rem] text-ink-soft transition-colors duration-500 ease-out hover:text-ink sm:inline"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-[0.95rem] text-ink-soft transition-colors duration-500 ease-out hover:text-ink"
          >
            Log in
          </Link>
          <Link
            href="/handwritten-note"
            className="rounded-full bg-accent px-5 py-2.5 text-[0.95rem] font-semibold text-on-accent shadow-[0_0_0_0_rgba(217,166,92,0)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_10px_32px_rgba(217,166,92,0.35)]"
          >
            Start your memoir
          </Link>
        </div>
      </nav>
    </header>
  );
}
