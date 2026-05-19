/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Drawer, DrawerBody, SidebarNavSectionsSubheadings, SidebarNavCollapsible } from "@mvp-ui/ui";
import {
  SIDEBAR_INNER_CLS,
  docSections,
  componentNavSections,
  exampleNavSections,
} from "./nav-sections";

export function MobileTopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="lg:hidden flex h-16 shrink-0 items-center gap-3 border-b border-border bg-bg px-4">
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-md text-fg-secondary hover:text-fg hover:bg-bg-secondary transition-colors"
      >
        <Menu className="size-5" />
      </button>
      <Link
        href="/"
        className="text-base font-semibold text-fg tracking-tight hover:text-fg-brand transition-colors"
      >
        MVP UI
      </Link>

      <Drawer
        side="left"
        size="sm"
        aria-label="Navigation"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <DrawerBody className="p-0 overflow-y-auto">
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
        </DrawerBody>
      </Drawer>
    </header>
  );
}
