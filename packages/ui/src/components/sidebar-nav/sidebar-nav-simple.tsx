/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/app-navigation/sidebar-navigation/
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import type { ReactNode } from "react";
import { cn } from "../../lib/cn.js";
import { NavItemRow } from "./shared.js";
import type { SidebarNavItemDef, SidebarNavAccountDef } from "./shared.js";
import { SidebarNavAccountCard } from "./sidebar-nav-account-card.js";

export type { SidebarNavItemDef };

export interface SidebarNavSimpleProps {
	activeHref?: string;
	items: SidebarNavItemDef[];
	footerItems?: SidebarNavItemDef[];
	logo?: ReactNode;
	featureCard?: ReactNode;
	account?: SidebarNavAccountDef;
	className?: string;
}

export function SidebarNavSimple({
	activeHref,
	items,
	footerItems = [],
	logo,
	featureCard,
	account,
	className,
}: SidebarNavSimpleProps) {
	return (
		<aside
			className={cn(
				"flex h-full w-64 flex-col border-r border-border-secondary  bg-bg",
				className,
			)}
		>
			{logo && (
				<div className="shrink-0 px-5 py-4 border-b border-border-secondary ">
					{logo}
				</div>
			)}

			<nav
				aria-label="Main navigation"
				className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4"
			>
				{items.map((item) => (
					<NavItemRow key={item.id} item={item} activeHref={activeHref} />
				))}
			</nav>

			{(footerItems.length > 0 || featureCard || account) && (
				<div className="shrink-0 border-t border-border-secondary  px-3 py-4 flex flex-col gap-1">
					{footerItems.map((item) => (
						<NavItemRow key={item.id} item={item} activeHref={activeHref} />
					))}
					{featureCard}
					{account && <SidebarNavAccountCard account={account} />}
				</div>
			)}
		</aside>
	);
}
