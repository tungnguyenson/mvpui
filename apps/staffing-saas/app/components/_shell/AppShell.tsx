"use client";

import { Drawer, SidebarNavCollapsible, SidebarNavSlim } from "@mvp-ui/ui";
import { ChevronsLeft, ChevronsRight, Menu } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAV_SECTIONS, activeHrefForPath } from "./nav";
import { Header } from "./Header";
import { BreadcrumbProvider } from "./BreadcrumbContext";
import { ThemeProvider, useAppearance } from "./ThemeContext";
import { logoutAction } from "../../login/actions";

const SECTIONS = NAV_SECTIONS.map((section) => ({
  label: section.label,
  items: section.items.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.href,
    icon: item.icon,
  })),
}));

const SLIM_ITEMS = NAV_SECTIONS.flatMap((section) =>
  section.items.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.href,
    icon: item.icon,
  })),
);

const SIDEBAR_COLLAPSED_KEY = "staffing-saas:sidebar-collapsed";

const ACCOUNT = {
  name: "Lê Quản Trị",
  email: "admin@staffing.vn",
};

function BrandMark() {
  return (
    <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-fg select-none">
      S
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <BrandMark />
      <span className="text-sm font-semibold text-fg">Staffing Admin</span>
    </div>
  );
}

function BrandWithToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <div className="flex w-full items-center justify-between">
      <Brand />
      <button
        type="button"
        onClick={onToggle}
        className="flex size-8 items-center justify-center rounded-lg text-fg-tertiary transition-colors hover:bg-bg-secondary hover:text-fg"
        aria-label="Thu gọn menu"
      >
        <ChevronsLeft className="size-4" />
      </button>
    </div>
  );
}

function SlimBrandToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="group relative flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-bg-secondary"
      aria-label="Mở rộng menu"
    >
      <div className="transition-opacity group-hover:opacity-0">
        <BrandMark />
      </div>
      <ChevronsRight className="absolute size-5 text-fg-tertiary opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AppShellInner>{children}</AppShellInner>
    </ThemeProvider>
  );
}

function AppShellInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, navTheme } = useAppearance();
  const [navOpen, setNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const activeHref = activeHrefForPath(pathname);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      if (stored === "1") setSidebarCollapsed(true);
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (pathname) {
      setNavOpen(false);
    }
  }, [pathname]);

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
    router.refresh();
  };

  const account = {
    ...ACCOUNT,
    onLogout: handleLogout,
  };

  const handleNavClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const target = (event.target as HTMLElement | null)?.closest(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!target) return;
      if (target.target && target.target !== "_self") return;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      event.preventDefault();
      router.push(href);
    },
    [router],
  );

  return (
    <div
      data-theme={theme}
      suppressHydrationWarning
      className="flex h-screen flex-col overflow-hidden bg-bg md:flex-row"
    >
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

      {/* Desktop sidebar */}
      <div
        data-theme={navTheme}
        suppressHydrationWarning
        onClick={handleNavClick}
        className="hidden shrink-0 bg-bg md:block"
      >
        {sidebarCollapsed ? (
          <SidebarNavSlim
            hoverToReveal={false}
            logo={<SlimBrandToggle onToggle={toggleSidebar} />}
            items={SLIM_ITEMS}
            activeHref={activeHref}
            account={account}
          />
        ) : (
          <SidebarNavCollapsible
            className="border-border-secondary"
            logo={<BrandWithToggle onToggle={toggleSidebar} />}
            sections={SECTIONS}
            activeHref={activeHref}
            account={account}
          />
        )}
      </div>

      {/* Content */}
      <main className="min-w-0 flex-1 overflow-y-auto bg-bg-secondary">
        <BreadcrumbProvider>
          <Header />
          {children}
        </BreadcrumbProvider>
      </main>

      {/* Mobile nav drawer */}
      <Drawer
        side="left"
        size="sm"
        isOpen={navOpen}
        onOpenChange={setNavOpen}
        aria-label="Menu điều hướng"
        showCloseButton
      >
        <div
          data-theme={navTheme}
          suppressHydrationWarning
          onClick={handleNavClick}
          className="h-full"
        >
          <SidebarNavCollapsible
            className="w-full border-r-0"
            logo={<Brand />}
            sections={SECTIONS}
            activeHref={activeHref}
            account={account}
          />
        </div>
      </Drawer>
    </div>
  );
}
