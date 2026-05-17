/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { components, examples, type NavItem } from "../nav";

function NavGroup({
  title,
  items,
  pathname,
}: {
  title: string;
  items: NavItem[];
  pathname: string;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest text-fg-tertiary">
        {title}
      </h2>
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block px-3 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)]
                  ${
                    active
                      ? "bg-brand-50 text-brand-700"
                      : "text-fg-secondary hover:text-fg hover:bg-bg-secondary"
                  }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Component docs"
      className="sticky top-0 h-screen w-64 shrink-0 overflow-y-auto
        border-r border-border bg-bg px-4 py-8"
    >
      <Link
        href="/"
        className="block px-3 mb-8 text-lg font-semibold text-fg tracking-tight
          hover:text-brand-700 transition-colors"
      >
        MVP UI
      </Link>
      <NavGroup title="Components" items={components} pathname={pathname} />
      <NavGroup title="Examples" items={examples} pathname={pathname} />
    </nav>
  );
}
