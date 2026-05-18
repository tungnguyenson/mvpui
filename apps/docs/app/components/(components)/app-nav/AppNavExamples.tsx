"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { AppNav, AppNavItem, type AppNavItemDef } from "@mvp-ui/ui";

/* -------------------------------------------------------------------------- */
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */

function HomeIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
			<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		</svg>
	);
}

function BarChartIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
			<line x1="18" y1="20" x2="18" y2="10" />
			<line x1="12" y1="20" x2="12" y2="4" />
			<line x1="6" y1="20" x2="6" y2="14" />
		</svg>
	);
}

function UsersIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
			<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
			<path d="M16 3.13a4 4 0 0 1 0 7.75" />
		</svg>
	);
}

function FolderIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
			<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
		</svg>
	);
}

function SettingsIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
			<circle cx="12" cy="12" r="3" />
			<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
		</svg>
	);
}

function BellIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
			<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
			<path d="M13.73 21a2 2 0 0 1-3.46 0" />
		</svg>
	);
}

/* -------------------------------------------------------------------------- */
/*  Shared items                                                               */
/* -------------------------------------------------------------------------- */

const baseItems: AppNavItemDef[] = [
	{ label: "Home", href: "#", icon: HomeIcon },
	{ label: "Analytics", href: "#", icon: BarChartIcon },
	{ label: "Team", href: "#", icon: UsersIcon },
	{ label: "Projects", href: "#", icon: FolderIcon },
	{ label: "Notifications", href: "#", icon: BellIcon },
	{ label: "Settings", href: "#", icon: SettingsIcon },
];

/* -------------------------------------------------------------------------- */
/*  LogoMark                                                                   */
/* -------------------------------------------------------------------------- */

function LogoMark() {
	return (
		<div className="flex items-center gap-2">
			<div className="flex size-8 items-center justify-center rounded-lg bg-primary">
				<span className="text-sm font-bold text-primary-fg">M</span>
			</div>
			<span className="text-sm font-semibold text-fg">MyApp</span>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  DefaultNavDemo                                                             */
/* -------------------------------------------------------------------------- */

export function DefaultNavDemo() {
	return (
		<div className="flex h-105 overflow-hidden rounded-xl border border-border shadow-sm">
			<AppNav items={baseItems} logo={<LogoMark />} />
			<main className="flex flex-1 flex-col items-center justify-center bg-bg-secondary">
				<p className="text-sm text-fg-tertiary">Main content area</p>
			</main>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  ActiveStateDemo                                                            */
/* -------------------------------------------------------------------------- */

const activeItems: AppNavItemDef[] = baseItems.map((item) => ({
	...item,
	active: item.label === "Analytics",
}));

export function ActiveStateDemo() {
	return (
		<div className="flex h-105 overflow-hidden rounded-xl border border-border shadow-sm">
			<AppNav items={activeItems} logo={<LogoMark />} />
			<main className="flex flex-1 flex-col items-center justify-center bg-bg-secondary">
				<p className="text-sm font-medium text-fg">Analytics</p>
				<p className="mt-1 text-sm text-fg-tertiary">Active route highlighted</p>
			</main>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  BadgesDemo                                                                 */
/* -------------------------------------------------------------------------- */

const badgeItems: AppNavItemDef[] = [
	{ label: "Home", href: "#", icon: HomeIcon },
	{ label: "Analytics", href: "#", icon: BarChartIcon, active: true },
	{ label: "Team", href: "#", icon: UsersIcon, badge: 3 },
	{ label: "Projects", href: "#", icon: FolderIcon, badge: 12 },
	{ label: "Notifications", href: "#", icon: BellIcon, badge: "New" },
	{ label: "Settings", href: "#", icon: SettingsIcon },
];

function FooterUser() {
	return (
		<div className="flex items-center gap-3 rounded-lg px-3 py-2">
			<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-fg">
				JD
			</div>
			<div className="flex min-w-0 flex-col">
				<p className="truncate text-sm font-medium text-fg">Jane Doe</p>
				<p className="truncate text-xs text-fg-tertiary">jane@example.com</p>
			</div>
		</div>
	);
}

export function BadgesDemo() {
	return (
		<div className="flex h-105 overflow-hidden rounded-xl border border-border shadow-sm">
			<AppNav items={badgeItems} logo={<LogoMark />} footer={<FooterUser />} />
			<main className="flex flex-1 flex-col items-center justify-center bg-bg-secondary">
				<p className="text-sm text-fg-tertiary">With badges + footer</p>
			</main>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  AppNavItem standalone demo                                                 */
/* -------------------------------------------------------------------------- */

export function NavItemDemo() {
	return (
		<div className="flex w-60 flex-col gap-1 rounded-xl border border-border bg-bg p-3">
			<AppNavItem item={{ label: "Default item", href: "#", icon: HomeIcon }} />
			<AppNavItem item={{ label: "Active item", href: "#", icon: BarChartIcon, active: true }} />
			<AppNavItem item={{ label: "With badge", href: "#", icon: BellIcon, badge: 5 }} />
			<AppNavItem item={{ label: "Active + badge", href: "#", icon: UsersIcon, active: true, badge: "Pro" }} />
		</div>
	);
}
