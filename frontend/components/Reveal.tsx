"use client";

import { createElement, useEffect, useRef } from "react";

// Wraps a section so it fades/rises into place the first time it crosses
// into view. Uses createElement rather than JSX with a dynamic tag: JSX's
// polymorphic `ref` typing on a union of tag names blows up TypeScript's
// union resolution — createElement sidesteps that entirely.
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `reveal ${className}`,
      style: { transitionDelay: `${delay}ms` },
    },
    children,
  );
}
