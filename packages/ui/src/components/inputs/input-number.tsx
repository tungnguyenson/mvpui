/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/input-number.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import type { ReactNode } from "react";
import {
	Button as AriaButton,
	Group as AriaGroup,
	Input as AriaInput,
	NumberField as AriaNumberField,
	type NumberFieldProps as AriaNumberFieldProps,
} from "react-aria-components";
import { cn } from "../../lib/cn.js";
import { HintText } from "./hint-text.js";
import { Label } from "./label.js";

/* ==========================================================================
   InputNumber — React Aria `NumberField` (locale-aware parsing, keyboard
   stepping, spin buttons). RA is unavoidable here (plan A1: hand-rolling
   correct number stepping a11y is not viable). Label/HintText reuse the
   native family components; a11y is carried by RA `aria-label`. Tokens are
   dark-safe aliases; focus uses a box-shadow ring (MVP convention) instead
   of the source's CSS `outline`.
   ========================================================================== */

const fieldSize = {
	sm: "px-3 py-2 text-sm",
	md: "px-3 py-2 text-md",
	lg: "px-3.5 py-2.5 text-md",
};

function ChevronUpIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
			<path
				d="m18 15-6-6-6 6"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function ChevronDownIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
			<path
				d="m6 9 6 6 6-6"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export interface InputNumberProps extends AriaNumberFieldProps {
	/** Field size. @default "sm" */
	size?: "sm" | "md" | "lg";
	/** Label text rendered above the field. */
	label?: string;
	/** Helper / error text rendered below the field. */
	hint?: ReactNode;
	/** Placeholder text. */
	placeholder?: string;
	/** Hide the required `*` indicator even when required. */
	hideRequiredIndicator?: boolean;
	/** Stepper button orientation. @default "vertical" */
	orientation?: "vertical" | "horizontal";
	/** Class name for the outer wrapper. */
	containerClassName?: string;
}

export const InputNumber = ({
	size = "sm",
	label,
	hint,
	placeholder,
	hideRequiredIndicator,
	orientation = "vertical",
	containerClassName,
	className,
	...props
}: InputNumberProps) => {
	return (
		<AriaNumberField
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
			{({ isInvalid, isRequired }) => (
				<>
					{label && (
						<Label isRequired={!hideRequiredIndicator && isRequired} isInvalid={isInvalid}>
							{label}
						</Label>
					)}

					<AriaGroup
						className={cn(
							"flex w-full flex-row items-stretch overflow-hidden rounded-lg border border-border bg-bg shadow-xs",
							"transition-shadow duration-100 ease-linear",
							"data-focus-within:border-border-brand data-focus-within:ring-4 data-focus-within:ring-brand-500/22",
							"data-invalid:border-border-error data-invalid:data-focus-within:ring-error-500/24",
							"data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:bg-bg-secondary"
						)}
					>
						{orientation === "horizontal" && (
							<AriaButton
								slot="decrement"
								aria-label="Decrease"
								className="flex shrink-0 cursor-pointer items-center justify-center border-r border-border px-3 text-muted-fg outline-none transition duration-100 ease-linear hover:bg-bg-tertiary hover:text-fg-tertiary disabled:cursor-not-allowed disabled:opacity-50"
							>
								<ChevronDownIcon className="size-4" />
							</AriaButton>
						)}

						<AriaInput
							{...(placeholder ? { placeholder } : {})}
							className={cn(
								"m-0 w-full min-w-0 flex-1 border-0 bg-transparent text-fg outline-none placeholder:text-fg-tertiary disabled:cursor-not-allowed",
								fieldSize[size]
							)}
						/>

						{orientation === "horizontal" && (
							<AriaButton
								slot="increment"
								aria-label="Increase"
								className="flex shrink-0 cursor-pointer items-center justify-center border-l border-border px-3 text-muted-fg outline-none transition duration-100 ease-linear hover:bg-bg-tertiary hover:text-fg-tertiary disabled:cursor-not-allowed disabled:opacity-50"
							>
								<ChevronUpIcon className="size-4" />
							</AriaButton>
						)}

						{orientation === "vertical" && (
							<div className="flex w-7 shrink-0 flex-col border-l border-border">
								<AriaButton
									slot="increment"
									aria-label="Increase"
									className="flex flex-1 cursor-pointer items-center justify-center text-muted-fg outline-none transition duration-100 ease-linear hover:bg-bg-tertiary hover:text-fg-tertiary disabled:cursor-not-allowed disabled:opacity-50"
								>
									<ChevronUpIcon className="size-3" />
								</AriaButton>
								<AriaButton
									slot="decrement"
									aria-label="Decrease"
									className="flex flex-1 cursor-pointer items-center justify-center border-t border-border text-muted-fg outline-none transition duration-100 ease-linear hover:bg-bg-tertiary hover:text-fg-tertiary disabled:cursor-not-allowed disabled:opacity-50"
								>
									<ChevronDownIcon className="size-3" />
								</AriaButton>
							</div>
						)}
					</AriaGroup>

					{hint && (
						<HintText isInvalid={isInvalid} size={size === "sm" ? "sm" : "md"}>
							{hint}
						</HintText>
					)}
				</>
			)}
		</AriaNumberField>
	);
};

InputNumber.displayName = "InputNumber";
