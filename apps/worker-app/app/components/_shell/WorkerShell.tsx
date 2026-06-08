"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Gift, Home, LogOut, Trophy, User } from "lucide-react";
import { Avatar, ButtonUtility, Toaster } from "@mvp-ui/ui";
import { CURRENT_WORKER } from "../../data/worker";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/chia-se", label: "Giới thiệu", icon: Gift },
  { href: "/thuong", label: "Thưởng", icon: Trophy },
  { href: "/profile", label: "Hồ sơ", icon: User },
] as const;

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

// Màn referral tự render appbar --bp riêng → ẩn top bar chung để không chồng header.
const IMMERSIVE_ROUTES = ["/chia-se", "/thuong"];

export function WorkerShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const immersive = IMMERSIVE_ROUTES.includes(pathname);

  const logout = () => {
    document.cookie = "session=; Path=/; Max-Age=0; SameSite=Lax";
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-dvh bg-bg-secondary">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-bg md:border-x md:border-border-secondary md:shadow-sm">
        {/* Top bar — ẩn trên màn immersive (referral) vì màn đó có appbar --bp riêng */}
        {!immersive && (
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border-secondary bg-bg/85 px-4 backdrop-blur-sm">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-fg">
              W
            </span>
            <span className="text-base font-semibold tracking-tight text-fg">
              MVP Worker
            </span>
          </Link>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <ButtonUtility
              size="sm"
              color="tertiary"
              icon={<LogOut />}
              aria-label="Đăng xuất"
              onClick={logout}
            />
            <Link href="/profile" aria-label="Hồ sơ của tôi" className="ml-0.5">
              <Avatar
                size="sm"
                src={CURRENT_WORKER.avatar}
                alt={CURRENT_WORKER.name}
                state="verified"
              />
            </Link>
          </div>
        </header>
        )}

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Bottom navigation */}
        <nav className="sticky bottom-0 z-20 grid grid-cols-4 border-t border-border-secondary bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  active ? "text-fg-brand" : "text-fg-tertiary hover:text-fg-secondary"
                }`}
              >
                <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <Toaster />
    </div>
  );
}
