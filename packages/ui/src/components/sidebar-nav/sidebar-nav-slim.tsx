/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/app-navigation/sidebar-navigation/
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { type FC, type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn.js";
import { SlimNavButton, NavItemRow, initials } from "./shared.js";
import type { SidebarNavItemDef, SidebarNavAccountDef } from "./shared.js";

export interface SidebarNavSlimProps {
	activeHref?: string;
	items: (SidebarNavItemDef & { icon: FC<{ className?: string }> })[];
	footerItems?: (SidebarNavItemDef & { icon: FC<{ className?: string }> })[];
	logo?: ReactNode;
	account?: SidebarNavAccountDef;
	className?: string;
	/** When false, secondary panel opens on click instead of hover. Default: true */
	hoverToReveal?: boolean;
}

export function SidebarNavSlim({
	activeHref,
	items,
	footerItems = [],
	logo,
	account,
	className,
	hoverToReveal = true,
}: SidebarNavSlimProps) {
	const allItems = [...items, ...footerItems];
	const findActive = () =>
		allItems.find(
			(i) =>
				i.href === activeHref ||
				i.items?.some((sub) => sub.href === activeHref),
		);

	const [currentItem, setCurrentItem] = useState<typeof items[number] | undefined>(
		findActive() ?? items[0],
	);
	const [hovering, setHovering] = useState(false);
	const [panelOpen, setPanelOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (hoverToReveal || !panelOpen) return;
		function onClickOutside(e: MouseEvent) {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
				setPanelOpen(false);
			}
		}
		document.addEventListener("mousedown", onClickOutside);
		return () => document.removeEventListener("mousedown", onClickOutside);
	}, [hoverToReveal, panelOpen]);

	const secondaryVisible = hoverToReveal
		? hovering && Boolean(currentItem?.items?.length)
		: panelOpen && Boolean(currentItem?.items?.length);

	const SECONDARY_W = 248;

	function handleItemClick(item: typeof items[number]) {
		if (hoverToReveal) {
			setCurrentItem(item);
			return;
		}
		const hasChildren = Boolean(item.items?.length);
		if (currentItem?.id === item.id) {
			if (hasChildren) setPanelOpen((o) => !o);
		} else {
			setCurrentItem(item);
			setPanelOpen(hasChildren);
		}
	}

	const pointerHandlers = hoverToReveal
		? { onPointerEnter: () => setHovering(true), onPointerLeave: () => setHovering(false) }
		: {};

	return (
		<div ref={wrapperRef} className={cn("flex h-full", className)} {...pointerHandlers}>
			{/* Slim rail */}
			<aside className="flex h-full w-17 shrink-0 flex-col border-r border-border bg-bg">
				{logo && (
					<div className="flex h-16 shrink-0 items-center justify-center border-b border-border">
						{logo}
					</div>
				)}

				<nav
					aria-label="Main navigation"
					className="flex flex-1 flex-col items-center gap-1 overflow-y-auto px-3 py-4"
				>
					{items.map((item) => (
						<SlimNavButton
							key={item.id}
							item={item}
							active={currentItem?.id === item.id}
							onClick={() => handleItemClick(item)}
						/>
					))}
				</nav>

				{(footerItems.length > 0 || account) && (
					<div className="shrink-0 border-t border-border flex flex-col items-center gap-1 px-3 py-4">
						{footerItems.map((item) => (
							<SlimNavButton
								key={item.id}
								item={item}
								active={currentItem?.id === item.id}
								onClick={() => handleItemClick(item)}
							/>
						))}
						{account && (
							<div className="mt-1">
								{account.avatarSrc ? (
									<img
										src={account.avatarSrc}
										alt={account.name}
										title={`${account.name} · ${account.email}`}
										className="size-8 rounded-full object-cover ring-1 ring-border"
									/>
								) : (
									<span
										title={`${account.name} · ${account.email}`}
										className="flex size-8 cursor-default items-center justify-center rounded-full bg-bg-secondary text-xs font-semibold text-fg ring-1 ring-border"
									>
										{initials(account.name)}
									</span>
								)}
							</div>
						)}
					</div>
				)}
			</aside>

			{/* Secondary panel — CSS width transition */}
			<div
				style={{ width: secondaryVisible ? SECONDARY_W : 0 }}
				className="overflow-hidden transition-[width] duration-200 ease-out"
			>
				{currentItem && (
					<aside
						style={{ width: SECONDARY_W }}
						className="flex h-full flex-col border-r border-border bg-bg"
					>
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
					</aside>
				)}
			</div>
		</div>
	);
}
