"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { type FC, type ReactNode, forwardRef } from "react";
import { cn } from "../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface AppNavItemDef {
	/** Navigation label. */
	label: string;
	/** Link href. */
	href: string;
	/** Optional leading icon component or element. */
	icon?: FC<{ className?: string }> | ReactNode;
	/** Optional badge label (e.g. count or "New"). */
	badge?: string | number;
	/** Whether this item matches the current route. */
	active?: boolean;
}

export interface AppNavProps {
	/** Navigation items to render. */
	items: AppNavItemDef[];
	/** Optional logo / wordmark area rendered at the top. */
	logo?: ReactNode;
	/** Optional footer area rendered at the bottom. */
	footer?: ReactNode;
	/** Additional class name for the nav root. */
	className?: string;
}

export interface AppNavItemProps {
	item: AppNavItemDef;
	className?: string;
}

/* -------------------------------------------------------------------------- */
/*  AppNavItem                                                                 */
/* -------------------------------------------------------------------------- */

function isFC(value: unknown): value is FC<{ className?: string }> {
	return typeof value === "function";
}

export const AppNavItem = forwardRef<HTMLAnchorElement, AppNavItemProps>(
	({ item, className }, ref) => {
		const { label, href, icon: Icon, badge, active } = item;

		return (
			<a
				ref={ref}
				href={href}
				aria-current={active ? "page" : undefined}
				className={cn(
					"group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none",
					"transition-colors duration-100 ease-linear",
					"focus-visible:ring-2 focus-visible:ring-brand-500/22",
					active
						? "bg-bg-secondary text-fg"
						: "text-fg-secondary hover:bg-bg-secondary hover:text-fg",
					className,
				)}
			>
				{/* Leading icon */}
				{Icon !== undefined && (
					<span className="flex shrink-0 items-center justify-center">
						{isFC(Icon) ? (
							<Icon
								className={cn(
									"size-5 transition-colors duration-100",
									active ? "text-fg-brand" : "text-fg-tertiary group-hover:text-fg-secondary",
								)}
							/>
						) : (
							Icon
						)}
					</span>
				)}

				{/* Label */}
				<span className="flex-1 truncate">{label}</span>

				{/* Badge */}
				{badge !== undefined && (
					<span
						className={cn(
							"ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
							active
								? "bg-primary text-primary-fg"
								: "bg-bg-tertiary text-fg-secondary",
						)}
					>
						{badge}
					</span>
				)}
			</a>
		);
	},
);
AppNavItem.displayName = "AppNavItem";

/* -------------------------------------------------------------------------- */
/*  AppNav                                                                     */
/* -------------------------------------------------------------------------- */

export const AppNav = forwardRef<HTMLElement, AppNavProps>(
	({ items, logo, footer, className }, ref) => {
		return (
			<nav
				ref={ref}
				aria-label="Application navigation"
				className={cn(
					"flex h-full w-60 flex-col border-r border-border bg-bg",
					className,
				)}
			>
				{/* Logo area */}
				{logo && (
					<div className="flex h-16 shrink-0 items-center px-4 border-b border-border">
						{logo}
					</div>
				)}

				{/* Nav items */}
				<div className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
					{items.map((item) => (
						<AppNavItem key={item.label} item={item} />
					))}
				</div>

				{/* Footer area */}
				{footer && (
					<div className="shrink-0 border-t border-border px-3 py-4">
						{footer}
					</div>
				)}
			</nav>
		);
	},
);
AppNav.displayName = "AppNav";
