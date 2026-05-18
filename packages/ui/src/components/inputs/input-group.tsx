/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/input-group.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { forwardRef, type HTMLAttributes, type ReactNode, useId } from "react";
import { cn } from "../../lib/cn.js";
import { HintText } from "./hint-text.js";
import { InputBase, type InputBaseProps } from "./input.js";
import { Label } from "./label.js";

/* ==========================================================================
   InputGroup — label + an input box flanked by separated addons and/or an
   inline prefix, + hint. Structure adapted from Untitled source
   (`input-group.tsx`); diverges by composing the NATIVE `InputBase` instead
   of the RA `TextField` (hybrid decision — plan A1 correction note). Addons
   are passed as `leadingAddon` / `trailingAddon`; use `InputAddon` for the
   common text/select addon styling. Tokens are dark-safe aliases.
   ========================================================================== */

const addonSize = {
	sm: "px-3 py-2 text-sm",
	md: "px-3 py-2 text-md",
	lg: "px-3.5 py-2.5 text-md",
};

export interface InputAddonProps extends HTMLAttributes<HTMLSpanElement> {
	/** Which side of the input the addon sits on. @default "leading" */
	position?: "leading" | "trailing";
	/** Addon size — match the InputGroup size. @default "sm" */
	size?: "sm" | "md" | "lg";
}

/** Visually-separated text/select addon for {@link InputGroup}. */
export const InputAddon = forwardRef<HTMLSpanElement, InputAddonProps>(
	({ position = "leading", size = "sm", className, ...props }, ref) => (
		<span
			ref={ref}
			data-addon={position}
			className={cn(
				"flex items-center whitespace-nowrap text-fg-tertiary shadow-xs ring-1 ring-border ring-inset",
				position === "leading" ? "-mr-px rounded-l-lg" : "-ml-px rounded-r-lg",
				addonSize[size],
				className
			)}
			{...props}
		/>
	)
);

InputAddon.displayName = "InputAddon";

export interface InputGroupProps {
	/** Field size. @default "sm" */
	size?: "sm" | "md" | "lg";
	/** Label text rendered above the group. */
	label?: string;
	/** Helper / error text rendered below the group. */
	hint?: ReactNode;
	/** Separated addon before the input (e.g. an `InputAddon` or select). */
	leadingAddon?: ReactNode;
	/** Separated addon after the input. */
	trailingAddon?: ReactNode;
	/** Mark required (label `*`). */
	isRequired?: boolean;
	/** Hide the required `*` indicator even when required. */
	hideRequiredIndicator?: boolean;
	/** Error state. */
	isInvalid?: boolean;
	/** The input box — typically an `<InputBase />`. */
	children: ReactNode;
	/** Class name for the outer wrapper. */
	className?: string;
}

export const InputGroup = ({
	size = "sm",
	label,
	hint,
	leadingAddon,
	trailingAddon,
	isRequired,
	hideRequiredIndicator,
	isInvalid,
	children,
	className,
}: InputGroupProps) => {
	const id = useId();
	const hasLeading = !!leadingAddon;
	const hasTrailing = !!trailingAddon;

	return (
		<div className={cn("flex w-full flex-col gap-1.5", className)}>
			{label && (
				<Label htmlFor={id} isRequired={!hideRequiredIndicator && isRequired} isInvalid={isInvalid}>
					{label}
				</Label>
			)}

			<div
				data-input-size={size}
				className={cn(
					"group flex w-full flex-row items-stretch",
					"**:data-[slot=input-wrapper]:flex-1",
					hasLeading && "**:data-[slot=input-wrapper]:rounded-l-none",
					hasTrailing && "**:data-[slot=input-wrapper]:rounded-r-none"
				)}
			>
				{leadingAddon}
				{children}
				{trailingAddon}
			</div>

			{hint && (
				<HintText isInvalid={isInvalid} size={size === "sm" ? "sm" : "md"}>
					{hint}
				</HintText>
			)}
		</div>
	);
};

InputGroup.displayName = "InputGroup";

/** Re-export for ergonomic group composition. */
export type { InputBaseProps };
export { InputBase };
