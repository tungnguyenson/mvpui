/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/app-navigation/header-navigation.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { Menu } from "lucide-react";
import { type FC, isValidElement, type ReactNode, useState } from "react";
import { cn } from "../lib/cn.js";
import { Drawer, DrawerBody } from "./drawer.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface HeaderNavItemDef {
	id: string;
	/** Label text for the nav item. */
	label: string;
	/** URL to navigate to when clicked. */
	href: string;
	/** Optional leading icon (component or element). */
	icon?: FC<{ className?: string }> | ReactNode;
	/** Optional trailing badge (count or short label). */
	badge?: string | number;
	/** Override the auto-detected active state. Derived from `activeHref` when omitted. */
	current?: boolean;
	/** Sub-items, surfaced in the secondary row when this item (or a child) is active. */
	items?: Omit<HeaderNavItemDef, "items">[];
}

export interface HeaderNavProps {
	/** Primary nav items. */
	items: HeaderNavItemDef[];
	/** URL of the currently active route. Drives active styling + secondary row. */
	activeHref?: string;
	/** Explicit sub-items for the secondary row. Falls back to the active parent's `items`. */
	subItems?: HeaderNavItemDef[];
	/** Brand mark rendered at the start of the bar. */
	logo?: ReactNode;
	/** Right-side actions slot (search, notifications, account, etc.). Consumer-owned. */
	actions?: ReactNode;
	/** Center the primary nav between logo and actions. @default false */
	centered?: boolean;
	/** How the secondary row renders sub-items. @default "buttons" */
	secondaryType?: "buttons" | "tabs";
	/** Hide the bottom border. A row divider still shows when the secondary row is visible. @default false */
	hideBorder?: boolean;
	/** Footer slot inside the mobile drawer (account card, sign-out, etc.). */
	mobileFooter?: ReactNode;
	className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const REACT_FORWARD_REF = Symbol.for("react.forward_ref");
const REACT_MEMO = Symbol.for("react.memo");

function isIconFC(v: unknown): v is FC<{ className?: string }> {
	if (typeof v === "function") return true;
	if (typeof v !== "object" || v === null) return false;
	const t = (v as { $$typeof?: unknown }).$$typeof;
	return t === REACT_FORWARD_REF || t === REACT_MEMO;
}

function renderIcon(
	icon: FC<{ className?: string }> | ReactNode | undefined,
	className: string
): ReactNode {
	if (!icon) return null;
	if (isIconFC(icon)) {
		const Icon = icon;
		return <Icon className={className} />;
	}
	if (isValidElement(icon)) return icon;
	return null;
}

/** True when `href` matches `activeHref` exactly, or is a route prefix of it. */
function isItemActive(href: string, activeHref?: string): boolean {
	if (!activeHref || !href) return false;
	if (href === activeHref) return true;
	if (href !== "/" && activeHref.startsWith(`${href}/`)) return true;
	return false;
}

/* -------------------------------------------------------------------------- */
/*  Primary nav pill                                                           */
/* -------------------------------------------------------------------------- */

interface NavPillProps {
	item: HeaderNavItemDef;
	active: boolean;
	onClick?: () => void;
}

function NavPill({ item, active, onClick }: NavPillProps) {
	return (
		<a
			href={item.href}
			aria-current={active ? "page" : undefined}
			onClick={onClick}
			className={cn(
				"group inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold outline-none transition-colors duration-100",
				"focus-visible:ring-2 focus-visible:ring-brand-500/22", // dark-ok
				active ? "bg-bg-secondary text-fg" : "text-fg-secondary hover:bg-bg-secondary hover:text-fg"
			)}
		>
			{item.icon !== undefined && (
				<span className="flex shrink-0 items-center justify-center">
					{renderIcon(
						item.icon,
						cn(
							"size-5 transition-colors duration-100",
							active ? "text-fg-brand" : "text-fg-tertiary group-hover:text-fg-secondary"
						)
					)}
				</span>
			)}
			<span>{item.label}</span>
			{item.badge !== undefined && (
				<span
					className={cn(
						"ml-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
						active ? "bg-primary text-primary-fg" : "bg-bg-tertiary text-fg-secondary"
					)}
				>
					{item.badge}
				</span>
			)}
		</a>
	);
}

/* -------------------------------------------------------------------------- */
/*  Secondary underline tab link                                               */
/* -------------------------------------------------------------------------- */

function NavTab({ item, active }: { item: HeaderNavItemDef; active: boolean }) {
	return (
		<a
			href={item.href}
			aria-current={active ? "page" : undefined}
			className={cn(
				"relative -mb-px inline-flex items-center border-b-2 px-1 pb-3 text-sm font-semibold whitespace-nowrap outline-none transition-colors duration-100",
				"focus-visible:rounded-xs focus-visible:ring-2 focus-visible:ring-brand-500/22", // dark-ok
				active
					? "border-primary text-fg-brand" // dark-ok: brand action fill indicator
					: "border-transparent text-fg-tertiary hover:text-fg"
			)}
		>
			{item.label}
		</a>
	);
}

/* -------------------------------------------------------------------------- */
/*  Mobile drawer row                                                          */
/* -------------------------------------------------------------------------- */

function MobileRow({
	item,
	active,
	onNavigate,
	nested,
}: {
	item: HeaderNavItemDef;
	active: boolean;
	onNavigate: () => void;
	nested?: boolean;
}) {
	return (
		<a
			href={item.href}
			aria-current={active ? "page" : undefined}
			onClick={onNavigate}
			className={cn(
				"group flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium outline-none transition-colors duration-100 touch-manipulation",
				"focus-visible:ring-2 focus-visible:ring-brand-500/22", // dark-ok
				nested && "pl-11",
				active ? "bg-bg-secondary text-fg" : "text-fg-secondary hover:bg-bg-secondary hover:text-fg"
			)}
		>
			{!nested && item.icon !== undefined && (
				<span className="flex shrink-0 items-center justify-center">
					{renderIcon(item.icon, cn("size-5", active ? "text-fg-brand" : "text-fg-tertiary"))}
				</span>
			)}
			<span className="flex-1 truncate">{item.label}</span>
			{item.badge !== undefined && (
				<span
					className={cn(
						"shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
						active ? "bg-primary text-primary-fg" : "bg-bg-tertiary text-fg-secondary"
					)}
				>
					{item.badge}
				</span>
			)}
		</a>
	);
}

/* -------------------------------------------------------------------------- */
/*  HeaderNav                                                                   */
/* -------------------------------------------------------------------------- */

export function HeaderNav({
	items,
	activeHref,
	subItems,
	logo,
	actions,
	centered = false,
	secondaryType = "buttons",
	hideBorder = false,
	mobileFooter,
	className,
}: HeaderNavProps) {
	const [mobileOpen, setMobileOpen] = useState(false);

	const isActive = (item: HeaderNavItemDef) => item.current ?? isItemActive(item.href, activeHref);

	const activeParent = items.find(
		(item) => isActive(item) || item.items?.some((sub) => isItemActive(sub.href, activeHref))
	);
	const activeSubNavItems = subItems ?? activeParent?.items;
	const showSecondaryNav = !!activeSubNavItems && activeSubNavItems.length > 0;

	const closeMobile = () => setMobileOpen(false);

	return (
		<>
			{/* ── Mobile bar ─────────────────────────────────────────────────── */}
			<div
				className={cn(
					"flex h-16 w-full items-center gap-3 bg-bg px-4 lg:hidden",
					!hideBorder && "border-b border-border-secondary",
					className
				)}
			>
				<button
					type="button"
					aria-label="Open navigation menu"
					aria-expanded={mobileOpen}
					onClick={() => setMobileOpen(true)}
					className="flex size-11 shrink-0 items-center justify-center rounded-lg text-fg-tertiary outline-none transition-colors duration-100 hover:bg-bg-secondary hover:text-fg focus-visible:ring-2 focus-visible:ring-brand-500/22" // dark-ok
				>
					<Menu className="size-6" />
				</button>
				{logo && <div className="flex items-center">{logo}</div>}
				{actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
			</div>

			<Drawer
				side="left"
				size="sm"
				isOpen={mobileOpen}
				onOpenChange={setMobileOpen}
				aria-label="Navigation menu"
			>
				<DrawerBody className="flex flex-col gap-5 px-4">
					{logo && <div className="flex items-center pt-1">{logo}</div>}

					<nav aria-label="Mobile navigation" className="flex flex-col gap-0.5">
						{items.map((item) => {
							const parentActive = isActive(item);
							return (
								<div key={item.id} className="flex flex-col gap-0.5">
									<MobileRow item={item} active={parentActive} onNavigate={closeMobile} />
									{item.items?.map((sub) => (
										<MobileRow
											key={sub.id}
											item={sub}
											active={isItemActive(sub.href, activeHref)}
											onNavigate={closeMobile}
											nested
										/>
									))}
								</div>
							);
						})}
					</nav>

					{mobileFooter && <div className="mt-auto">{mobileFooter}</div>}
				</DrawerBody>
			</Drawer>

			{/* ── Desktop header ─────────────────────────────────────────────── */}
			<header className={cn("hidden w-full bg-bg lg:block", className)}>
				<div
					className={cn(
						"flex h-16 w-full items-center bg-bg",
						(!hideBorder || showSecondaryNav) && "border-b border-border-secondary"
					)}
				>
					<div
						className={cn(
							"mx-auto flex w-full max-w-7xl items-center px-4 md:px-8",
							centered && "gap-8"
						)}
					>
						<div className={cn("flex items-center", centered ? "flex-1" : "mr-8")}>{logo}</div>

						<nav aria-label="Main navigation">
							<ul className="flex items-center gap-0.5">
								{items.map((item) => (
									<li key={item.id}>
										<NavPill item={item} active={isActive(item)} />
									</li>
								))}
							</ul>
						</nav>

						<div
							className={cn("flex items-center gap-3", centered ? "flex-1 justify-end" : "ml-auto")}
						>
							{actions}
						</div>
					</div>
				</div>

				{showSecondaryNav && (
					<div
						className={cn(
							"flex w-full bg-bg",
							secondaryType === "buttons" && !hideBorder && "border-b border-border-secondary"
						)}
					>
						{secondaryType === "tabs" ? (
							<div className="mx-auto w-full max-w-7xl px-4 pt-3 md:px-8">
								<nav aria-label="Secondary navigation">
									<ul className="flex items-center gap-6 border-b border-border-secondary">
										{activeSubNavItems.map((item) => (
											<li key={item.id}>
												<NavTab item={item} active={isActive(item)} />
											</li>
										))}
									</ul>
								</nav>
							</div>
						) : (
							<div
								className={cn(
									"mx-auto flex h-14 w-full max-w-7xl items-center px-4 md:px-8",
									centered ? "justify-center" : "justify-start"
								)}
							>
								<nav aria-label="Secondary navigation">
									<ul className="flex items-center gap-0.5">
										{activeSubNavItems.map((item) => (
											<li key={item.id}>
												<NavPill item={item} active={isActive(item)} />
											</li>
										))}
									</ul>
								</nav>
							</div>
						)}
					</div>
				)}
			</header>
		</>
	);
}
