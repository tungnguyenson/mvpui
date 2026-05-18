/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/hint-text.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn.js";

/* ==========================================================================
   HintText — helper / error text below a field. Diverges from Untitled
   source: native <p> instead of react-aria `Text` (the native Input/Label
   family carries no RA TextField context, so the source's `group-invalid:`
   / `in-data-[input-size]` hooks don't apply). `isInvalid` switches the
   semantic role + color. Tokens mapped to dark-safe aliases.
   ========================================================================== */

export const hintTextVariants = cva("text-fg-tertiary", {
	variants: {
		size: {
			sm: "text-xs",
			md: "text-sm",
		},
		isInvalid: {
			true: "text-fg-error",
			false: "",
		},
	},
	defaultVariants: {
		size: "md",
		isInvalid: false,
	},
});

export interface HintTextProps
	extends Omit<HTMLAttributes<HTMLParagraphElement>, "color">,
		VariantProps<typeof hintTextVariants> {
	/** Render as an error message (role="alert") instead of a description. */
	isInvalid?: boolean | undefined;
}

export const HintText = forwardRef<HTMLParagraphElement, HintTextProps>(
	({ className, size, isInvalid = false, ...props }, ref) => (
		<p
			ref={ref}
			data-slot="hint-text"
			role={isInvalid ? "alert" : undefined}
			className={cn(hintTextVariants({ size, isInvalid }), className)}
			{...props}
		/>
	)
);

HintText.displayName = "HintText";
