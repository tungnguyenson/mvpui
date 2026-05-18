/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/input-date.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import type { ReactNode } from "react";
import {
	DateField as AriaDateField,
	type DateFieldProps as AriaDateFieldProps,
	DateInput as AriaDateInput,
	DateSegment as AriaDateSegment,
	Group as AriaGroup,
	type DateValue,
} from "react-aria-components";
import { cn } from "../../lib/cn.js";
import { HintText } from "./hint-text.js";
import { Label } from "./label.js";

/* ==========================================================================
   InputDate — React Aria `DateField` (per-segment editing, locale-aware,
   keyboard navigation). RA is unavoidable here (plan A1: hand-rolling
   correct date-segment a11y is not viable). Label/HintText reuse the native
   family components; a11y is carried by RA `aria-label`. Tokens are
   dark-safe aliases; focus uses a box-shadow ring (MVP convention).
   ========================================================================== */

const fieldSize = {
	sm: "px-3 py-2 text-sm",
	md: "px-3 py-2 text-md",
	lg: "px-3.5 py-2.5 text-md",
};

export interface InputDateProps extends AriaDateFieldProps<DateValue> {
	/** Field size. @default "sm" */
	size?: "sm" | "md" | "lg";
	/** Label text rendered above the field. */
	label?: string;
	/** Helper / error text rendered below the field. */
	hint?: ReactNode;
	/** Hide the required `*` indicator even when required. */
	hideRequiredIndicator?: boolean;
	/** Class name for the outer wrapper. */
	containerClassName?: string;
}

export const InputDate = ({
	size = "sm",
	label,
	hint,
	hideRequiredIndicator,
	containerClassName,
	className,
	...props
}: InputDateProps) => {
	return (
		<AriaDateField
			{...props}
			{...(label || props["aria-label"] ? { "aria-label": label || props["aria-label"] } : {})}
			className={(state) =>
				cn(
					"group flex w-full flex-col gap-1.5",
					typeof className === "function" ? className(state) : className,
					containerClassName
				)
			}
		>
			{({ isInvalid, state }) => (
				<>
					{label && (
						<Label isRequired={!hideRequiredIndicator && state.isRequired} isInvalid={isInvalid}>
							{label}
						</Label>
					)}

					<AriaGroup
						className={cn(
							"flex w-full flex-row items-center rounded-lg border border-border bg-bg shadow-xs",
							"transition-shadow duration-100 ease-linear",
							"data-focus-within:border-border-brand data-focus-within:ring-4 data-focus-within:ring-brand-500/22",
							"data-invalid:border-border-error data-invalid:data-focus-within:ring-error-500/24",
							"data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:bg-bg-secondary",
							fieldSize[size]
						)}
					>
						<AriaDateInput className="flex w-full">
							{(segment) => (
								<AriaDateSegment
									segment={segment}
									className={cn(
										"rounded-sm px-0.5 text-fg tabular-nums caret-transparent outline-none",
										"data-focused:bg-primary data-focused:font-medium data-focused:text-primary-fg",
										"data-placeholder:text-fg-secondary data-placeholder:uppercase data-focused:data-placeholder:text-primary-fg",
										"data-[type=literal]:text-fg-tertiary"
									)}
								/>
							)}
						</AriaDateInput>
					</AriaGroup>

					{hint && (
						<HintText isInvalid={isInvalid} size={size === "sm" ? "sm" : "md"}>
							{hint}
						</HintText>
					)}
				</>
			)}
		</AriaDateField>
	);
};

InputDate.displayName = "InputDate";
