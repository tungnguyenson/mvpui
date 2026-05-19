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
import type { SidebarNavSectionDef, SidebarNavAccountDef } from "./shared.js";
import { SidebarNavAccountCard } from "./sidebar-nav-account-card.js";

export type { SidebarNavSectionDef };

export interface SidebarNavSectionDividersProps {
	activeHref?: string;
	sections: SidebarNavSectionDef[];
	logo?: ReactNode;
	account?: SidebarNavAccountDef;
	className?: string;
}

export function SidebarNavSectionDividers({
	activeHref,
	sections,
	logo,
	account,
	className,
}: SidebarNavSectionDividersProps) {
	return (
		<aside
			className={cn(
				"flex h-full w-64 flex-col border-r border-border bg-bg",
				className,
			)}
		>
			{logo && (
				<div className="flex h-16 shrink-0 items-center px-5 border-b border-border">
					{logo}
				</div>
			)}

			<nav
				aria-label="Main navigation"
				className="flex flex-1 flex-col overflow-y-auto px-3 py-4"
			>
				{sections.map((section, i) => (
					<div key={section.label} className="flex flex-col gap-0.5">
						{i > 0 && <hr className="my-2 border-border" />}
						{section.items.map((item) => (
							<NavItemRow key={item.id} item={item} activeHref={activeHref} />
						))}
					</div>
				))}
			</nav>

			{account && (
				<div className="shrink-0 border-t border-border px-3 py-3">
					<SidebarNavAccountCard account={account} />
				</div>
			)}
		</aside>
	);
}
