/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/label.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { forwardRef, type LabelHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn.js";
import { Tooltip, TooltipTrigger } from "../tooltip.js";

/* ==========================================================================
   Label — field label. Diverges from Untitled source: native <label>
   instead of react-aria `Label` (matches the native Input family; the
   source's `group-required:` / `group-invalid:` CSS hooks come from RA
   TextField, which the native family doesn't provide — so `isRequired` /
   `isInvalid` are explicit props here). Tokens mapped to dark-safe aliases.
   ========================================================================== */

function HelpCircleIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
			<path
				d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	children: ReactNode;
	/** Show the required `*` indicator. */
	isRequired?: boolean | undefined;
	/** Tint label + indicator with the error color. */
	isInvalid?: boolean | undefined;
	/** Help-icon tooltip title shown after the label. */
	tooltip?: string | undefined;
	/** Optional supporting description inside the tooltip. */
	tooltipDescription?: string | undefined;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({ className, children, isRequired, isInvalid, tooltip, tooltipDescription, ...props }, ref) => (
		// biome-ignore lint/a11y/noLabelWithoutControl: reusable Label primitive — the control association (htmlFor) is supplied by the consumer (e.g. Input passes htmlFor); a design-system label has no nested control by design.
		<label
			ref={ref}
			data-label="true"
			className={cn(
				"flex cursor-default items-center gap-0.5 text-sm font-medium text-fg-secondary",
				className
			)}
			{...props}
		>
			{children}

			{isRequired && <span className={cn("text-fg-brand", isInvalid && "text-fg-error")}>*</span>}

			{tooltip && (
				<Tooltip title={tooltip} description={tooltipDescription} placement="top">
					<TooltipTrigger
						tabIndex={0}
						className="cursor-pointer text-fg-tertiary transition duration-200 hover:text-fg-tertiary focus:text-fg-tertiary"
					>
						<HelpCircleIcon className="size-4" />
					</TooltipTrigger>
				</Tooltip>
			)}
		</label>
	)
);

Label.displayName = "Label";
