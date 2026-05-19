/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * Thin styled wrapper around Sonner. The Toaster component must be
 * rendered once near the root of your app (e.g. in a layout file).
 * Use the `toast` imperative API to fire toasts from anywhere.
 */

"use client";

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

/* -------------------------------------------------------------------------- */
/*  Toaster                                                                    */
/* -------------------------------------------------------------------------- */

export interface ToasterProps {
	/** Position of the toast stack. @default "bottom-right" */
	position?:
		| "top-left"
		| "top-center"
		| "top-right"
		| "bottom-left"
		| "bottom-center"
		| "bottom-right";
	/** Expand all toasts by default instead of stacking. @default false */
	expand?: boolean;
	/** Number of toasts visible at once. @default 3 */
	visibleToasts?: number;
	/** Duration in ms before auto-dismiss. @default 4000 */
	duration?: number;
	/** Close button on each toast. @default false */
	closeButton?: boolean;
	/** Richcolors mode — maps toast types to semantic status colors. @default true */
	richColors?: boolean;
}

export const Toaster = ({
	position = "bottom-right",
	expand = false,
	visibleToasts = 3,
	duration = 4000,
	closeButton = false,
	richColors = true,
}: ToasterProps) => (
	<SonnerToaster
		position={position}
		expand={expand}
		visibleToasts={visibleToasts}
		duration={duration}
		closeButton={closeButton}
		richColors={richColors}
		toastOptions={{
			classNames: {
				toast:
					"font-sans text-sm bg-bg text-fg ring-1 ring-border rounded-xl shadow-lg px-4 py-3 gap-3",
				title: "font-medium text-fg",
				description: "text-fg-secondary",
				actionButton: "bg-primary text-primary-fg rounded-lg px-3 py-1.5 text-xs font-medium",
				cancelButton: "bg-bg-secondary text-fg-secondary rounded-lg px-3 py-1.5 text-xs font-medium",
				closeButton: "rounded-md bg-bg-secondary text-fg-tertiary hover:text-fg",
				error: "!ring-border-error",
				success: "!ring-border-success",
				warning: "!ring-border-warning",
				info: "!ring-border-brand",
			},
		}}
	/>
);

Toaster.displayName = "Toaster";

/* -------------------------------------------------------------------------- */
/*  Re-export toast imperative API                                             */
/* -------------------------------------------------------------------------- */

export { sonnerToast as toast };
export type { ExternalToast as ToastOptions } from "sonner";
