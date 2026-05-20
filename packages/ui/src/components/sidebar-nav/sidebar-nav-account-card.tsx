/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/app-navigation/sidebar-navigation/
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cn } from "../../lib/cn.js";
import { initials } from "./shared.js";
import type { SidebarNavAccountDef } from "./shared.js";
import { LogOut } from "lucide-react";

export type { SidebarNavAccountDef };

export interface SidebarNavAccountCardProps {
	account: SidebarNavAccountDef;
	className?: string;
}

export function SidebarNavAccountCard({
	account,
	className,
}: SidebarNavAccountCardProps) {
	return (
		<div
			className={cn(
				"flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
				className,
			)}
		>
			{account.avatarSrc ? (
				<img
					src={account.avatarSrc}
					alt={account.name}
					className="size-8 shrink-0 rounded-full object-cover ring-1 ring-border"
				/>
			) : (
				<span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-xs font-semibold text-fg ring-1 ring-border">
					{initials(account.name)}
				</span>
			)}
			<div className="min-w-0 flex-1">
				<p className="truncate font-semibold text-fg">{account.name}</p>
				<p className="truncate text-fg-tertiary text-xs">{account.email}</p>
			</div>
			{account.onLogout && (
				<button
					type="button"
					onClick={account.onLogout}
					className="flex size-8 shrink-0 items-center justify-center rounded-lg text-fg-tertiary transition-all duration-150 hover:bg-bg-secondary hover:text-error-fg cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-500/22"
					title="Đăng xuất"
					aria-label="Đăng xuất"
				>
					<LogOut className="size-4" />
				</button>
			)}
		</div>
	);
}
