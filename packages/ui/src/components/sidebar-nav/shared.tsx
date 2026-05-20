"use client";

import { type FC, isValidElement, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface SidebarNavItemDef {
	id: string;
	label: string;
	href: string;
	icon?: FC<{ className?: string }> | ReactNode;
	badge?: string | number;
	items?: Omit<SidebarNavItemDef, "items">[];
}

export interface SidebarNavSectionDef {
	label: string;
	items: SidebarNavItemDef[];
}

export interface SidebarNavAccountDef {
	name: string;
	email: string;
	avatarSrc?: string;
	onLogout?: () => void;
}

/* -------------------------------------------------------------------------- */
/*  Icon helper                                                                */
/* -------------------------------------------------------------------------- */

const REACT_FORWARD_REF = Symbol.for("react.forward_ref");
const REACT_MEMO = Symbol.for("react.memo");

function isIconFC(v: unknown): v is FC<{ className?: string }> {
	if (typeof v === "function") return true;
	if (typeof v !== "object" || v === null) return false;
	const t = (v as { $$typeof?: unknown }).$$typeof;
	return t === REACT_FORWARD_REF || t === REACT_MEMO;
}

export function renderIcon(
	icon: FC<{ className?: string }> | ReactNode | undefined,
	className: string,
): ReactNode {
	if (!icon) return null;
	if (isIconFC(icon)) { const Icon = icon; return <Icon className={className} />; }
	if (isValidElement(icon)) return icon;
	return null;
}

/* -------------------------------------------------------------------------- */
/*  Shared internal components                                                 */
/* -------------------------------------------------------------------------- */

export interface NavItemRowProps {
	item: SidebarNavItemDef;
	activeHref?: string | undefined;
	onClick?: (() => void) | undefined;
	className?: string | undefined;
}

export function NavItemRow({ item, activeHref, onClick, className }: NavItemRowProps) {
	const active = item.href === activeHref;
	return (
		<a
			href={item.href}
			aria-current={active ? "page" : undefined}
			onClick={onClick}
			className={cn(
				"group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors duration-100",
				"focus-visible:ring-2 focus-visible:ring-brand-500/22", // dark-ok
				active
					? "bg-bg-secondary text-fg"
					: "text-fg-secondary hover:bg-bg-secondary hover:text-fg",
				className,
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
			{item.items !== undefined && (
				<ChevronDown className="ml-auto size-4 shrink-0 text-fg-quaternary" aria-hidden />
			)}
			{item.badge !== undefined && (
				<span
					className={cn(
						"ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
						active ? "bg-primary text-primary-fg" : "bg-bg-tertiary text-fg-secondary",
					)}
				>
					{item.badge}
				</span>
			)}
		</a>
	);
}

export interface SlimNavButtonProps {
	item: SidebarNavItemDef;
	active: boolean;
	onClick: () => void;
}

export function SlimNavButton({ item, active, onClick }: SlimNavButtonProps) {
	return (
		<button
			type="button"
			title={item.label}
			onClick={onClick}
			aria-current={active ? "page" : undefined}
			className={cn(
				"flex size-10 items-center justify-center rounded-lg outline-none transition-colors duration-100",
				"focus-visible:ring-2 focus-visible:ring-brand-500/22", // dark-ok
				active
					? "bg-bg-secondary text-fg"
					: "text-fg-tertiary hover:bg-bg-secondary hover:text-fg-secondary",
			)}
		>
			{renderIcon(item.icon, "size-5")}
		</button>
	);
}

export function initials(name: string) {
	return name
		.split(" ")
		.slice(0, 2)
		.map((p) => p[0])
		.join("")
		.toUpperCase();
}
