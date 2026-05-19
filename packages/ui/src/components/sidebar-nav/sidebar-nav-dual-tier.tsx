/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/app-navigation/sidebar-navigation/
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { type ReactNode, useState } from "react";
import { cn } from "../../lib/cn.js";
import { NavItemRow } from "./shared.js";
import type { SidebarNavItemDef, SidebarNavAccountDef } from "./shared.js";
import { SidebarNavAccountCard } from "./sidebar-nav-account-card.js";

export interface SidebarNavDualTierProps {
	activeHref?: string;
	items: SidebarNavItemDef[];
	footerItems?: SidebarNavItemDef[];
	logo?: ReactNode;
	featureCard?: ReactNode;
	account?: SidebarNavAccountDef;
	className?: string;
}

export function SidebarNavDualTier({
	activeHref,
	items,
	footerItems = [],
	logo,
	featureCard,
	account,
	className,
}: SidebarNavDualTierProps) {
	const findActive = (list: SidebarNavItemDef[]) =>
		list.find(
			(i) =>
				i.href === activeHref ||
				i.items?.some((sub) => sub.href === activeHref),
		);

	const [currentItem, setCurrentItem] = useState<SidebarNavItemDef | undefined>(
		findActive(items) ?? items[0],
	);
	const [hovering, setHovering] = useState(false);

	const secondaryVisible = hovering && Boolean(currentItem?.items?.length);
	const SECONDARY_W = 256;

	return (
		<div
			className={cn("flex h-full", className)}
			onPointerEnter={() => setHovering(true)}
			onPointerLeave={() => setHovering(false)}
		>
			{/* Primary sidebar */}
			<aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-bg">
				{logo && (
					<div className="flex h-16 shrink-0 items-center px-5 border-b border-border">
						{logo}
					</div>
				)}

				<nav
					aria-label="Main navigation"
					className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4"
				>
					{items.map((item) => (
						<NavItemRow
							key={item.id}
							item={item}
							activeHref={activeHref}
							onClick={() => setCurrentItem(item)}
						/>
					))}
				</nav>

				{(footerItems.length > 0 || featureCard || account) && (
					<div className="shrink-0 border-t border-border px-3 py-4 flex flex-col gap-1">
						{footerItems.map((item) => (
							<NavItemRow
								key={item.id}
								item={item}
								activeHref={activeHref}
								onClick={() => setCurrentItem(item)}
							/>
						))}
						{featureCard}
						{account && <SidebarNavAccountCard account={account} />}
					</div>
				)}
			</aside>

			{/* Secondary sidebar — CSS width transition */}
			<div
				style={{ width: secondaryVisible ? SECONDARY_W : 0 }}
				className="overflow-hidden transition-[width] duration-200 ease-out"
			>
				<aside
					style={{ width: SECONDARY_W }}
					className="flex h-full flex-col border-r border-border bg-bg"
				>
					{currentItem && (
						<>
							<div className="flex h-16 shrink-0 items-center px-4 border-b border-border">
								<p className="text-sm font-semibold text-fg">{currentItem.label}</p>
							</div>
							<nav
								aria-label={`${currentItem.label} sub-navigation`}
								className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4"
							>
								{currentItem.items?.map((sub) => (
									<NavItemRow
										key={sub.id}
										item={sub}
										activeHref={activeHref}
									/>
								))}
							</nav>
						</>
					)}
				</aside>
			</div>
		</div>
	);
}
