/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavSectionsSubheadings, SidebarNavCollapsible } from "@mvp-ui/ui";
import {
  SIDEBAR_INNER_CLS,
  docSections,
  componentNavSections,
  exampleNavSections,
} from "./nav-sections";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden lg:flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-border bg-bg">
      <div className="flex h-16 shrink-0 items-center px-5 border-b border-border">
        <Link
          href="/"
          className="text-base font-semibold text-fg tracking-tight hover:text-fg-brand transition-colors"
        >
          MVP UI
        </Link>
      </div>

      <SidebarNavSectionsSubheadings
        className={SIDEBAR_INNER_CLS}
        activeHref={pathname}
        sections={docSections}
      />

      <hr className="shrink-0 border-border" />

      <SidebarNavCollapsible
        className={SIDEBAR_INNER_CLS}
        activeHref={pathname}
        sections={componentNavSections}
      />

      <hr className="shrink-0 border-border" />

      <SidebarNavCollapsible
        className={SIDEBAR_INNER_CLS}
        activeHref={pathname}
        sections={exampleNavSections}
      />
    </aside>
  );
}
