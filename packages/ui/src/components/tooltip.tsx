/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/tooltip/tooltip.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { Slot } from "@radix-ui/react-slot";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

/* ==========================================================================
   Tooltip — API mirrors Untitled UI (title, description, arrow, delay,
   placement). Diverges from Untitled source in two places:
     1. Radix Tooltip instead of react-aria `Tooltip` (plan A1 — lighter,
        equivalent a11y, matches our Radix Slot usage).
     2. Untitled's always-dark surface becomes a theme-following surface
        (`bg-fg` / `text-bg`) so it stays dark-safe in both modes without a
        new token. Visually: dark chip in light mode, light chip in dark.
   `placement` ("top", "top left", …) is mapped to Radix side + align.
   ========================================================================== */

type Placement =
	| "top"
	| "bottom"
	| "left"
	| "right"
	| "top left"
	| "top right"
	| "top start"
	| "top end"
	| "bottom left"
	| "bottom right"
	| "bottom start"
	| "bottom end";

function resolvePlacement(placement: Placement): {
	side: "top" | "right" | "bottom" | "left";
	align: "start" | "center" | "end";
} {
	const [rawSide, modifier] = placement.split(" ") as [string, string?];
	const side = (["top", "right", "bottom", "left"].includes(rawSide) ? rawSide : "top") as
		| "top"
		| "right"
		| "bottom"
		| "left";

	let align: "start" | "center" | "end" = "center";
	if (modifier === "left" || modifier === "start") align = "start";
	else if (modifier === "right" || modifier === "end") align = "end";

	return { side, align };
}

export interface TooltipProps {
	/** The tooltip title (bold first line). */
	title: ReactNode;
	/** Optional supporting description below the title. */
	description?: ReactNode;
	/** Show a pointer arrow. @default false */
	arrow?: boolean;
	/** Delay in ms before the tooltip opens. @default 300 */
	delay?: number;
	/** Delay in ms before the tooltip closes. @default 0 */
	closeDelay?: number;
	/** Tooltip placement relative to the trigger. @default "top" */
	placement?: Placement;
	/** Distance in px from the trigger. @default 6 */
	offset?: number;
	/** Disable the tooltip entirely. */
	isDisabled?: boolean;
	/** Controlled open state. */
	isOpen?: boolean;
	/** Uncontrolled initial open state. */
	defaultOpen?: boolean;
	/** Open-state change handler. */
	onOpenChange?: (isOpen: boolean) => void;
	/** The trigger element (typically a `TooltipTrigger`). */
	children: ReactNode;
}

export const Tooltip = ({
	title,
	description,
	arrow = false,
	delay = 300,
	closeDelay = 0,
	placement = "top",
	offset = 6,
	isDisabled,
	isOpen,
	defaultOpen,
	onOpenChange,
	children,
}: TooltipProps) => {
	const { side, align } = resolvePlacement(placement);

	return (
		<RadixTooltip.Provider delayDuration={delay} skipDelayDuration={closeDelay}>
			<RadixTooltip.Root
				{...(isDisabled ? { open: false } : isOpen !== undefined ? { open: isOpen } : {})}
				{...(defaultOpen !== undefined && !isDisabled ? { defaultOpen } : {})}
				{...(onOpenChange ? { onOpenChange } : {})}
			>
				{children}
				<RadixTooltip.Portal>
					<RadixTooltip.Content
						side={side}
						align={align}
						sideOffset={offset}
						className={cn(
							"z-50 flex max-w-xs flex-col items-start gap-1 rounded-lg bg-fg px-3 shadow-lg",
							description ? "py-3" : "py-2",
							"data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
							"data-[state=delayed-open]:fade-in-0 data-[state=closed]:fade-out-0",
							"data-[state=delayed-open]:zoom-in-95 data-[state=closed]:zoom-out-95"
						)}
					>
						<span className="text-xs font-semibold text-bg">{title}</span>
						{description && <span className="text-xs font-medium text-bg/70">{description}</span>}
						{arrow && <RadixTooltip.Arrow className="fill-fg" />}
					</RadixTooltip.Content>
				</RadixTooltip.Portal>
			</RadixTooltip.Root>
		</RadixTooltip.Provider>
	);
};

Tooltip.displayName = "Tooltip";

export interface TooltipTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Merge trigger props onto the child element instead of wrapping in a new
	 * button. Required when the child is already an interactive element (e.g.
	 * ButtonUtility) to avoid a nested <button> hydration error.
	 */
	asChild?: boolean;
}

/**
 * Focusable trigger for a {@link Tooltip}. Use `asChild` when wrapping an
 * existing interactive element to avoid nested-button errors.
 */
export const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(
	({ className, type, children, asChild = false, ...props }, ref) => {
		if (asChild) {
			return (
				<RadixTooltip.Trigger asChild>
					<Slot ref={ref} className={className} {...props}>
						{children}
					</Slot>
				</RadixTooltip.Trigger>
			);
		}
		return (
			<RadixTooltip.Trigger asChild>
				<button
					ref={ref}
					type={type ?? "button"}
					className={cn("h-max w-max outline-none", className)}
					{...props}
				>
					{children}
				</button>
			</RadixTooltip.Trigger>
		);
	}
);

TooltipTrigger.displayName = "TooltipTrigger";
