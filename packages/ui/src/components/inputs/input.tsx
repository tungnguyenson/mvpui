/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/input.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cva } from "class-variance-authority";
import {
	type FC,
	forwardRef,
	type InputHTMLAttributes,
	isValidElement,
	type ReactNode,
	useId,
	useState,
} from "react";
import { cn } from "../../lib/cn.js";
import { HintText } from "./hint-text.js";
import { Label } from "./label.js";
import { Tooltip, TooltipTrigger } from "../tooltip.js";

/* ==========================================================================
   Input — API mirrors Untitled UI (size, isInvalid, icon, tooltip, label,
   hint…). Diverges from Untitled in two deliberate, documented places:

   1. Native `<input>` + CSS `focus-within` instead of react-aria
      `TextField` — the basic text field needs no headless layer (hybrid
      decision; see plan A1 correction note). Source's RA `TextField`
      context, `group-invalid:` / `group-required:` hooks become explicit
      `isInvalid` / `isRequired` props.
   2. Always-wrap: the bordered "field" box is a wrapper `<div>`
      (`InputBase`); the inner `<input>` is reset and fills it. Uniform
      `focus-within` ring, one home for `data-*` hooks. `inputFieldVariants`
      styles the FIELD WRAPPER, not the `<input>`.

   `InputBase` is the standalone field box reused by InputGroup / InputFile /
   InputPayment / InputTagsOuter. `Input` composes Label + InputBase +
   HintText. All colors map to @mvp-ui/tokens flipping aliases (dark-safe).
   ========================================================================== */

export const inputFieldVariants = cva(
	[
		"flex w-full items-center rounded-lg border bg-bg shadow-xs",
		"text-fg cursor-text outline-none",
		"transition-shadow duration-100 ease-linear",
		"has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 has-[input:disabled]:bg-bg-secondary",
		"has-[input:read-only]:bg-bg-secondary",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-fg-tertiary",
	],
	{
		variants: {
			size: {
				sm: "gap-2 px-3 py-2 text-sm [&_svg]:size-4",
				md: "gap-2 px-3 py-2 text-md [&_svg]:size-5",
				lg: "gap-2 px-3.5 py-2.5 text-md [&_svg]:size-5",
			},
			state: {
				default:
					"border-border focus-within:border-border-brand focus-within:ring-4 focus-within:ring-brand-500/22",
				error:
					"border-border-error focus-within:border-border-error focus-within:ring-4 focus-within:ring-error-500/24",
				success:
					"border-border-success focus-within:border-border-success focus-within:ring-4 focus-within:ring-success-500/24",
			},
		},
		defaultVariants: {
			size: "sm",
			state: "default",
		},
	}
);

type IconProp = FC<{ className?: string }> | ReactNode;

function renderIcon(icon: IconProp, slot: "leading" | "trailing"): ReactNode {
	if (!icon) return null;
	if (isValidElement(icon)) return icon;
	if (typeof icon === "function") {
		const Icon = icon as FC<{ className?: string; "data-icon"?: string }>;
		return <Icon className="shrink-0" data-icon={slot} />;
	}
	return icon;
}

/* -------------------------------------------------------------------------- */
/*  Inline icons (MVP carries no icon library)                                */
/* -------------------------------------------------------------------------- */

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

function AlertCircleIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
			<path
				d="M12 8v4m0 4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function EyeIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
			<path
				d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
		</svg>
	);
}

function EyeOffIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
			<path
				d="M9.88 4.24A9.6 9.6 0 0 1 12 4c6.4 0 10 7 10 7a18 18 0 0 1-2.16 3.19M6.61 6.61A18 18 0 0 0 2 12s3.6 7 10 7a9.5 9.5 0 0 0 5.39-1.61M2 2l20 20M9.9 9.9a3 3 0 0 0 4.2 4.2"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

/* -------------------------------------------------------------------------- */
/*  InputBase — the standalone field box                                       */
/* -------------------------------------------------------------------------- */

export interface InputBaseProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
	/** Field size. @default "sm" */
	size?: "sm" | "md" | "lg" | undefined;
	/** Red border + error focus ring; also sets `aria-invalid`. */
	isInvalid?: boolean | undefined;
	/** Green border + success focus ring. Ignored when invalid. */
	isSuccess?: boolean | undefined;
	/** Icon component or element rendered before the input. */
	iconLeading?: IconProp;
	/** Icon component or element rendered after the input. */
	iconTrailing?: IconProp;
	/** Inline text/element before the input (e.g. "$", "https://"). */
	prefix?: ReactNode;
	/** Inline text/element after the input (e.g. "USD", ".com"). */
	suffix?: ReactNode;
	/** Muted keyboard-shortcut hint, rendered trailing (e.g. "⌘K"). */
	shortcut?: ReactNode;
	/** Help-icon tooltip shown trailing inside the field. */
	tooltip?: string | undefined;
	/** Class name applied to the field wrapper instead of the `<input>`. */
	wrapperClassName?: string | undefined;
}

export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
	(
		{
			className,
			wrapperClassName,
			size = "sm",
			isInvalid = false,
			isSuccess = false,
			iconLeading,
			iconTrailing,
			prefix,
			suffix,
			shortcut,
			tooltip,
			type = "text",
			"aria-invalid": ariaInvalid,
			// @ts-expect-error -- react-aria form context injects this; strip before DOM spread
			validationBehavior: _validationBehavior,
			...props
		},
		ref
	) => {
		const [isPasswordVisible, setIsPasswordVisible] = useState(false);

		const invalid = isInvalid || ariaInvalid === true || ariaInvalid === "true";
		const state = invalid ? "error" : isSuccess ? "success" : "default";
		const isPassword = type === "password";
		const resolvedType = isPassword && isPasswordVisible ? "text" : type;

		return (
			<div
				data-slot="input-wrapper"
				data-invalid={invalid ? true : undefined}
				data-success={!invalid && isSuccess ? true : undefined}
				className={cn(inputFieldVariants({ size, state }), wrapperClassName, className)}
				suppressHydrationWarning
			>
				{renderIcon(iconLeading, "leading")}

				{prefix != null && prefix !== false && (
					<span
						data-slot="input-prefix"
						className="shrink-0 select-none whitespace-nowrap text-fg-tertiary"
					>
						{prefix}
					</span>
				)}

				<input
					ref={ref}
					data-slot="input"
					type={resolvedType}
					aria-invalid={invalid ? true : ariaInvalid}
					className="min-w-0 flex-1 border-0 bg-transparent p-0 text-fg outline-none placeholder:text-fg-tertiary disabled:cursor-not-allowed read-only:cursor-default"
					{...props}
				/>

				{suffix != null && suffix !== false && (
					<span
						data-slot="input-suffix"
						className="shrink-0 select-none whitespace-nowrap text-fg-tertiary"
					>
						{suffix}
					</span>
				)}

				{renderIcon(iconTrailing, "trailing")}

				{tooltip && !isPassword && !invalid && (
					<Tooltip title={tooltip} placement="top">
						<TooltipTrigger
							tabIndex={0}
							className="shrink-0 cursor-pointer text-fg-tertiary transition duration-100 ease-linear hover:text-fg-tertiary focus:text-fg-tertiary"
						>
							<HelpCircleIcon className="size-4" />
						</TooltipTrigger>
					</Tooltip>
				)}

				{invalid && !isPassword && (
					<AlertCircleIcon
						className="size-4 shrink-0 text-fg-error"
						data-slot="input-invalid-icon"
					/>
				)}

				{isPassword && (
					<button
						type="button"
						aria-label="Toggle password visibility"
						onClick={() => setIsPasswordVisible((v) => !v)}
						className="flex shrink-0 cursor-pointer items-center justify-center text-fg-tertiary outline-none transition duration-100 ease-linear hover:text-fg-tertiary focus-visible:text-fg-tertiary"
					>
						{isPasswordVisible ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
					</button>
				)}

				{shortcut != null && shortcut !== false && (
					<kbd
						data-slot="input-shortcut"
						className="shrink-0 select-none rounded-sm border border-border bg-bg-tertiary px-1.5 font-sans text-xs text-fg-tertiary"
					>
						{shortcut}
					</kbd>
				)}
			</div>
		);
	}
);

InputBase.displayName = "InputBase";

/* -------------------------------------------------------------------------- */
/*  Input — Label + InputBase + HintText composition                          */
/* -------------------------------------------------------------------------- */

export interface InputProps extends InputBaseProps {
	/** Label text rendered above the field. */
	label?: string;
	/** Helper / error text rendered below the field. */
	hint?: ReactNode;
	/** Mark the field required (label `*`, native `required`). */
	isRequired?: boolean;
	/** Hide the required `*` indicator even when required. */
	hideRequiredIndicator?: boolean;
	/** Class name for the outer wrapper (label + field + hint). */
	containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ label, hint, isRequired, hideRequiredIndicator, isInvalid, containerClassName, id, ...props },
		ref
	) => {
		const generatedId = useId();
		const inputId = id ?? generatedId;

		return (
			<div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
				{label && (
					<Label
						htmlFor={inputId}
						isRequired={!hideRequiredIndicator && isRequired}
						isInvalid={isInvalid}
					>
						{label}
					</Label>
				)}

				<InputBase ref={ref} id={inputId} required={isRequired} isInvalid={isInvalid} {...props} />

				{hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
			</div>
		);
	}
);

Input.displayName = "Input";
