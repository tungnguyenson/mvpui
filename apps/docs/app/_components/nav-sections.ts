/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { SidebarNavSectionDef } from "@mvp-ui/ui";
import { componentSections, examples } from "../nav";

export const SIDEBAR_INNER_CLS = "h-auto w-full shrink-0 border-none bg-transparent";

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

export const docSections: SidebarNavSectionDef[] = [
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

export const componentNavSections = sectionsToNavDef("Components", componentSections);

export const exampleNavSections: SidebarNavSectionDef[] = [
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
