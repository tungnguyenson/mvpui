/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  title: string;
}

/**
 * "On this page" rail. Scroll-spy via IntersectionObserver (no scroll
 * handler churn). Highlights the section whose heading is nearest the top.
 */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    items[0]?.id ?? null
  );

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(`${item.id}-heading`))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id.replace(/-heading$/, ""));
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    for (const h of headings) observer.observe(h);
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-0 hidden h-screen w-60 shrink-0 overflow-y-auto
        py-16 pl-8 pr-6 lg:block"
    >
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold
        uppercase tracking-widest text-fg-tertiary">
        <span
          aria-hidden
          className="inline-block h-px w-4 bg-border-secondary"
        />
        On this page
      </p>
      <ul className="flex flex-col gap-0.5 border-l border-border">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}-heading`}
                aria-current={active ? "location" : undefined}
                className={`-ml-px block border-l py-1.5 pl-4 text-sm
                  transition-colors duration-150
                  ${
                    active
                      ? "border-brand-600 font-medium text-brand-700"
                      : "border-transparent text-fg-tertiary hover:text-fg-secondary"
                  }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
