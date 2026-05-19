/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavSectionsSubheadings, SidebarNavCollapsible } from "@mvp-ui/ui";
import type { SidebarNavSectionDef } from "@mvp-ui/ui";
import { componentSections, examples } from "../nav";

const INNER_CLS = "h-auto w-full shrink-0 border-none bg-transparent";

function sectionsToNavDef(
  label: string,
  sections: { title: string; items: { name: string; href: string }[] }[]
): SidebarNavSectionDef[] {
  return [
    {
      label,
      items: sections.map((section) => ({
        id: section.title.toLowerCase().replace(/\s+/g, "-"),
        label: section.title,
        href: section.items[0]?.href ?? "#",
        items: section.items.map((item) => ({
          id: item.href,
          label: item.name,
          href: item.href,
        })),
      })),
    },
  ];
}

const docSections: SidebarNavSectionDef[] = [
  {
    label: "Documentation",
    items: [
      { id: "introduction", label: "Introduction", href: "/docs/introduction" },
      { id: "installation", label: "Installation", href: "/docs/installation" },
      { id: "theming", label: "Theming", href: "/docs/theming" },
      { id: "dark-mode", label: "Dark mode", href: "/docs/dark-mode" },
      { id: "typography", label: "Typography", href: "/docs/typography" },
      { id: "responsive", label: "Responsive", href: "/docs/responsive" },
      { id: "agent", label: "Agent context", href: "/docs/agent" },
    ],
  },
];

const componentNavSections = sectionsToNavDef("Components", componentSections);

const exampleNavSections: SidebarNavSectionDef[] = [
  {
    label: "Examples",
    items: examples.map((e) => {
      const href = e.href ?? e.items?.[0]?.href ?? "#";
      return {
        id: href,
        label: e.name,
        href,
        ...(e.items && {
          items: e.items.map((sub) => ({
            id: sub.href,
            label: sub.name,
            href: sub.href,
          })),
        }),
      };
    }),
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-border bg-bg">
      <div className="flex h-16 shrink-0 items-center px-5 border-b border-border">
        <Link
          href="/"
          className="text-base font-semibold text-fg tracking-tight hover:text-fg-brand transition-colors"
        >
          MVP UI
        </Link>
      </div>

      <SidebarNavSectionsSubheadings
        className={INNER_CLS}
        activeHref={pathname}
        sections={docSections}
      />

      <hr className="shrink-0 border-border" />

      <SidebarNavCollapsible
        className={INNER_CLS}
        activeHref={pathname}
        sections={componentNavSections}
      />

      <hr className="shrink-0 border-border" />

      <SidebarNavCollapsible
        className={INNER_CLS}
        activeHref={pathname}
        sections={exampleNavSections}
      />
    </aside>
  );
}
