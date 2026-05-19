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

export interface SidebarNavSectionsSubheadingsProps {
	activeHref?: string;
	sections: SidebarNavSectionDef[];
	logo?: ReactNode;
	account?: SidebarNavAccountDef;
	className?: string;
}

export function SidebarNavSectionsSubheadings({
	activeHref,
	sections,
	logo,
	account,
	className,
}: SidebarNavSectionsSubheadingsProps) {
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
				className="flex flex-1 flex-col overflow-y-auto py-4"
			>
				{sections.map((section) => (
					<div key={section.label} className="mb-4 last:mb-0">
						<p className="mb-1 px-4 text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
							{section.label}
						</p>
						<div className="flex flex-col gap-0.5 px-3">
							{section.items.map((item) => (
								<NavItemRow key={item.id} item={item} activeHref={activeHref} />
							))}
						</div>
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
