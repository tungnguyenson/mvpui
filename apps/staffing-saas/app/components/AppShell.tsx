"use client";

import { Drawer, SidebarNavCollapsible } from "@mvp-ui/ui";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Dashboard } from "./Dashboard";
import { EmptyState } from "./EmptyState";
import { DASHBOARD_HREF, NAV_SECTIONS, labelForHref } from "./nav";

const SECTIONS = NAV_SECTIONS.map((section) => ({
  label: section.label,
  items: section.items.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.href,
    icon: item.icon,
  })),
}));

const ACCOUNT = {
  name: "Lê Quản Trị",
  email: "admin@staffing.vn",
};

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-fg select-none">
        S
      </div>
      <span className="text-sm font-semibold text-fg">Staffing SaaS</span>
    </div>
  );
}

export function AppShell() {
  const [activeHref, setActiveHref] = useState(DASHBOARD_HREF);
  const [navOpen, setNavOpen] = useState(false);

  // Sidebar items are real anchors (#hash). Native hash navigation keeps
  // them keyboard-accessible; we just mirror location.hash into state.
  useEffect(() => {
    function sync() {
      setActiveHref(window.location.hash || DASHBOARD_HREF);
      setNavOpen(false);
    }
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const isDashboard = activeHref === DASHBOARD_HREF;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg md:flex-row">
      {/* Mobile top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-border-secondary bg-bg px-4 py-3 md:hidden">
        <Brand />
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-fg-secondary transition-colors hover:bg-bg-secondary"
          aria-label="Mở menu"
          onClick={() => setNavOpen(true)}
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Desktop sidebar — dark themed */}
      <div data-theme="light" className="hidden shrink-0 bg-bg md:block">
        <SidebarNavCollapsible
          className="border-border-secondary"
          logo={<Brand />}
          sections={SECTIONS}
          activeHref={activeHref}
          account={ACCOUNT}
        />
      </div>

      {/* Content — light themed */}
      <main className="min-w-0 flex-1 overflow-y-auto bg-bg">
        {isDashboard ? (
          <Dashboard />
        ) : (
          <div className="flex min-h-full flex-col">
            <EmptyState title={labelForHref(activeHref)} />
          </div>
        )}
      </main>

      {/* Mobile nav drawer — dark themed */}
      <Drawer
        side="left"
        size="sm"
        isOpen={navOpen}
        onOpenChange={setNavOpen}
        aria-label="Menu điều hướng"
        showCloseButton
      >
        <div data-theme="dark" className="h-full bg-bg">
          <SidebarNavCollapsible
            className="w-full border-r-0"
            logo={<Brand />}
            sections={SECTIONS}
            activeHref={activeHref}
            account={ACCOUNT}
          />
        </div>
      </Drawer>
    </div>
  );
}
