"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Gift, Home, LogOut, Trophy, User } from "lucide-react";
import { AppNav, type AppNavItemDef, Avatar, ButtonUtility, Toaster } from "@mvp-ui/ui";
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

const BrandMark = (
	<Link href="/" className="flex items-center gap-2.5">
		<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-fg">
			W
		</span>
		<span className="text-base font-semibold tracking-tight text-fg">MVP Worker</span>
	</Link>
);

export function WorkerShell({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const immersive = IMMERSIVE_ROUTES.includes(pathname);

	const logout = () => {
		document.cookie = "session=; Path=/; Max-Age=0; SameSite=Lax";
		router.push("/login");
		router.refresh();
	};

	// Desktop sidebar nav — reuses @mvp-ui/ui AppNav (lg+ only). Mobile keeps the
	// bottom tab bar below. AppNav renders plain <a> (full reload); fine here —
	// the pre-hydration theme script in layout.tsx prevents any flash.
	// Icons are passed as ReactNode elements (not components): lucide icons are
	// forwardRef objects, which AppNav's typeof-function detection treats as a
	// raw child — so we pre-render them and control the active color here.
	const navItems: AppNavItemDef[] = NAV_ITEMS.map((item) => {
		const active = isActive(pathname, item.href);
		const Icon = item.icon;
		return {
			label: item.label,
			href: item.href,
			icon: <Icon className={`size-5 ${active ? "text-fg-brand" : "text-fg-tertiary"}`} />,
			active,
		};
	});

	const sidebarFooter = (
		<div className="flex flex-col gap-2">
			<Link
				href="/profile"
				className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-bg-secondary"
			>
				<Avatar size="sm" src={CURRENT_WORKER.avatar} alt={CURRENT_WORKER.name} state="verified" />
				<span className="min-w-0 flex-1">
					<span className="block truncate text-sm font-semibold text-fg">
						{CURRENT_WORKER.name}
					</span>
					<span className="block truncate text-xs text-fg-tertiary">
						Mã CTV · {CURRENT_WORKER.id}
					</span>
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
			</div>
		</div>
	);

	return (
		<div className="min-h-dvh bg-bg-secondary">
			{/* Centered fixed-width app frame (desktop) — caps the user surface so it
          stays compact instead of sprawling across wide monitors. Mobile/tablet:
          `contents` dissolves the wrapper so the phone frame keeps centering via
          its own mx-auto, leaving the mobile-first layout untouched. */}
			<div className="contents lg:mx-auto lg:flex lg:min-h-dvh lg:w-full lg:max-w-6xl">
				{/* Desktop sidebar — lg+ only */}
				<AppNav
					items={navItems}
					logo={BrandMark}
					footer={sidebarFooter}
					className="hidden shrink-0 lg:sticky lg:top-0 lg:flex lg:h-dvh"
				/>

				{/* Phone frame (mobile/tablet) → flexible content area (desktop) */}
				<div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-bg md:border-x md:border-border-secondary md:shadow-sm lg:mx-0 lg:min-w-0 lg:max-w-none lg:flex-1 lg:border-x-0 lg:shadow-none">
					{/* Top bar — mobile/tablet only; sidebar replaces it on desktop.
            Hidden on immersive routes (referral) — those render a --bp appbar. */}
					{!immersive && (
						<header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border-secondary bg-bg/85 px-4 backdrop-blur-sm lg:hidden">
							<Link href="/" className="flex items-center gap-2.5">
								<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-fg">
									W
								</span>
								<span className="text-base font-semibold tracking-tight text-fg">MVP Worker</span>
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

					{/* Bottom navigation — mobile/tablet only */}
					<nav className="sticky bottom-0 z-20 grid grid-cols-4 border-t border-border-secondary bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden">
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
			</div>

			<Toaster />
		</div>
	);
}
