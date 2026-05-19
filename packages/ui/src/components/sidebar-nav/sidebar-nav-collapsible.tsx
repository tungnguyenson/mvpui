/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/app-navigation/sidebar-navigation/
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState, type ReactNode } from "react";
import { cn } from "../../lib/cn.js";
import { renderIcon } from "./shared.js";
import type { SidebarNavSectionDef, SidebarNavAccountDef } from "./shared.js";
import { SidebarNavAccountCard } from "./sidebar-nav-account-card.js";

function ChevronDown({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<path d="M4 6l4 4 4-4" />
		</svg>
	);
}

export interface SidebarNavCollapsibleProps {
	activeHref?: string;
	sections: SidebarNavSectionDef[];
	logo?: ReactNode;
	account?: SidebarNavAccountDef;
	className?: string;
}

export function SidebarNavCollapsible({
	activeHref,
	sections,
	logo,
	account,
	className,
}: SidebarNavCollapsibleProps) {
	const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
		const init: Record<string, boolean> = {};
		for (const section of sections) {
			for (const item of section.items) {
				if (item.items?.some((sub) => sub.href === activeHref)) {
					init[item.id] = true;
				}
			}
		}
		return init;
	});

	function toggle(id: string) {
		setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
	}

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
						<p className="mb-1 px-3 pt-1 text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
							{section.label}
						</p>
						{section.items.map((item) => {
							const hasChildren = item.items && item.items.length > 0;
							const isOpen = openItems[item.id] ?? false;
							const active = item.href === activeHref;

							if (!hasChildren) {
								return (
									<a
										key={item.id}
										href={item.href}
										aria-current={active ? "page" : undefined}
										className={cn(
											"group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors duration-100",
											"focus-visible:ring-2 focus-visible:ring-brand-500/22", // dark-ok
											active
												? "bg-bg-secondary text-fg"
												: "text-fg-secondary hover:bg-bg-secondary hover:text-fg",
										)}
									>
										{item.icon !== undefined && (
											<span className="flex shrink-0 items-center justify-center">
												{renderIcon(
													item.icon,
													cn(
														"size-5 transition-colors duration-100",
														active
															? "text-fg-brand"
															: "text-fg-tertiary group-hover:text-fg-secondary",
													),
												)}
											</span>
										)}
										<span className="flex-1 truncate">{item.label}</span>
										{item.badge !== undefined && (
											<span
												className={cn(
													"ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
													active
														? "bg-primary text-primary-fg"
														: "bg-bg-tertiary text-fg-secondary",
												)}
											>
												{item.badge}
											</span>
										)}
									</a>
								);
							}

							return (
								<div key={item.id}>
									<button
										type="button"
										onClick={() => toggle(item.id)}
										aria-expanded={isOpen}
										className={cn(
											"group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors duration-100",
											"focus-visible:ring-2 focus-visible:ring-brand-500/22", // dark-ok
											"text-fg-secondary hover:bg-bg-secondary hover:text-fg",
										)}
									>
										{item.icon !== undefined && (
											<span className="flex shrink-0 items-center justify-center">
												{renderIcon(
													item.icon,
													"size-5 text-fg-tertiary transition-colors duration-100 group-hover:text-fg-secondary",
												)}
											</span>
										)}
										<span className="flex-1 truncate text-left">{item.label}</span>
										<ChevronDown
											className={cn(
												"size-4 shrink-0 text-fg-tertiary transition-transform duration-200",
												isOpen && "rotate-180",
											)}
										/>
									</button>

									{isOpen && (
										<div className="flex flex-col gap-0.5 pb-1">
											{item.items!.map((sub) => {
												const subActive = sub.href === activeHref;
												return (
													<a
														key={sub.id}
														href={sub.href}
														aria-current={subActive ? "page" : undefined}
														className={cn(
															"flex items-center gap-3 rounded-lg py-2 pr-3 pl-9 text-sm font-medium outline-none transition-colors duration-100",
															"focus-visible:ring-2 focus-visible:ring-brand-500/22", // dark-ok
															subActive
																? "bg-bg-secondary text-fg"
																: "text-fg-secondary hover:bg-bg-secondary hover:text-fg",
														)}
													>
														<span className="flex-1 truncate">{sub.label}</span>
														{sub.badge !== undefined && (
															<span
																className={cn(
																	"ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
																	subActive
																		? "bg-primary text-primary-fg"
																		: "bg-bg-tertiary text-fg-secondary",
																)}
															>
																{sub.badge}
															</span>
														)}
													</a>
												);
											})}
										</div>
									)}
								</div>
							);
						})}
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
