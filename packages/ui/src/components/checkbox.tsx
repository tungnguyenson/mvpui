"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/checkbox/checkbox.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { ReactNode, Ref } from "react";
import {
	Checkbox as AriaCheckbox,
	type CheckboxProps as AriaCheckboxProps,
} from "react-aria-components";
import { cn } from "../lib/cn.js";

/* ==========================================================================
   Checkbox — wraps react-aria Checkbox with Untitled UI visual design.
   Token mapping (Untitled UI → MVP UI):
   - bg-primary (surface)     → bg-bg
   - ring-primary (inset)     → ring-border
   - bg-tertiary              → bg-bg-tertiary
   - bg-brand-solid           → bg-primary
   - ring-brand-solid         → ring-primary
   - text-fg-white            → text-primary-fg
   - text-secondary           → text-fg-secondary
   - text-tertiary            → text-fg-tertiary
   - outline-focus-ring       → outline-ring
   ========================================================================== */

export interface CheckboxBaseProps {
	size?: "sm" | "md";
	className?: string;
	isFocusVisible?: boolean;
	isSelected?: boolean;
	isDisabled?: boolean;
	isIndeterminate?: boolean;
}

export const CheckboxBase = ({
	className,
	isSelected,
	isDisabled,
	isIndeterminate,
	size = "sm",
	isFocusVisible = false,
}: CheckboxBaseProps) => {
	return (
		<div
			className={cn(
				"relative flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded bg-bg ring-1 ring-border ring-inset",
				size === "md" && "size-5 rounded-md",
				(isSelected || isIndeterminate) && "bg-primary ring-primary",
				isDisabled && "cursor-not-allowed opacity-50",
				isDisabled && !(isSelected || isIndeterminate) && "bg-bg-tertiary",
				isFocusVisible && "outline-2 outline-offset-2 outline-ring",
				className,
			)}
		>
			{/* Indeterminate dash */}
			<svg
				aria-hidden="true"
				viewBox="0 0 14 14"
				fill="none"
				className={cn(
					"pointer-events-none absolute h-3 w-2.5 text-primary-fg opacity-0 transition-all",
					size === "md" && "size-3.5",
					isIndeterminate && "opacity-100",
				)}
			>
				<path
					d="M2.91675 7H11.0834"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>

			{/* Check mark */}
			<svg
				aria-hidden="true"
				viewBox="0 0 14 14"
				fill="none"
				className={cn(
					"pointer-events-none absolute size-3 text-primary-fg opacity-0 transition-all",
					size === "md" && "size-3.5",
					isSelected && !isIndeterminate && "opacity-100",
				)}
			>
				<path
					d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};
CheckboxBase.displayName = "CheckboxBase";

export interface CheckboxProps extends AriaCheckboxProps {
	ref?: Ref<HTMLLabelElement>;
	size?: "sm" | "md";
	label?: ReactNode;
	hint?: ReactNode;
}

const sizes = {
	sm: {
		root: "gap-2",
		textWrapper: "",
		label: "text-sm font-medium",
		hint: "text-sm",
	},
	md: {
		root: "gap-3",
		textWrapper: "gap-0.5",
		label: "text-md font-medium",
		hint: "text-md",
	},
};

export const Checkbox = ({
	label,
	hint,
	size = "sm",
	className,
	...ariaCheckboxProps
}: CheckboxProps) => {
	return (
		<AriaCheckbox
			{...ariaCheckboxProps}
			className={(state) =>
				cn(
					"relative flex cursor-pointer items-start",
					state.isDisabled && "cursor-not-allowed",
					sizes[size].root,
					typeof className === "function" ? className(state) : className,
				)
			}
		>
			{({ isSelected, isIndeterminate, isDisabled, isFocusVisible }) => (
				<>
					<CheckboxBase
						size={size}
						isSelected={isSelected}
						isIndeterminate={isIndeterminate}
						isDisabled={isDisabled}
						isFocusVisible={isFocusVisible}
						className={label || hint ? "mt-0.5" : ""}
					/>
					{(label || hint) && (
						<div
							className={cn("inline-flex flex-col", sizes[size].textWrapper)}
						>
							{label && (
								<p
									className={cn(
										"select-none text-fg-secondary",
										sizes[size].label,
									)}
								>
									{label}
								</p>
							)}
							{hint && (
								<span
									className={cn("text-fg-tertiary", sizes[size].hint)}
									onClick={(event) => event.stopPropagation()}
								>
									{hint}
								</span>
							)}
						</div>
					)}
				</>
			)}
		</AriaCheckbox>
	);
};
Checkbox.displayName = "Checkbox";
