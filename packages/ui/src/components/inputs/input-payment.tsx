/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/input-payment.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { forwardRef, type ReactNode, useCallback, useId, useState } from "react";
import { cn } from "../../lib/cn.js";
import { HintText } from "./hint-text.js";
import { InputBase, type InputBaseProps } from "./input.js";
import { Label } from "./label.js";
import { AmexIcon, DiscoverIcon, MastercardIcon, UnionPayIcon, VisaIcon } from "./payment-icons.js";

/* ==========================================================================
   InputPayment — card-number field that auto-detects the brand and formats
   in groups of 4. Logic ported from Untitled source; diverges by composing
   the NATIVE `InputBase` instead of RA `TextField`, and replacing
   `@react-stately/utils` `useControlledState` with a tiny local
   controlled/uncontrolled hook (hybrid decision — plan A1 correction note).
   ========================================================================== */

const cardTypes = [
	{ pattern: /^4[0-9]{3,}$/, icon: VisaIcon },
	{ pattern: /^5[1-5][0-9]{2,}$/, icon: MastercardIcon },
	{ pattern: /^3[47][0-9]{2,}$/, icon: AmexIcon },
	{ pattern: /^6(?:011|5[0-9]{2}|4[4-9][0-9])[0-9]{12}$/, icon: DiscoverIcon },
	{ pattern: /^(62|88)[0-9]{14,17}$/, icon: UnionPayIcon },
	{ pattern: /.*/, icon: MastercardIcon },
] as const;

function detectCardIcon(value: string) {
	const sanitized = value.replace(/\D/g, "");
	return cardTypes.find((c) => c.pattern.test(sanitized))?.icon ?? MastercardIcon;
}

/** Format a card number in groups of 4 digits (1234 5678 9012 3456). */
export function formatCardNumber(value: string): string {
	const cleaned = value.replace(/\D/g, "");
	const match = cleaned.match(/\d{1,4}/g);
	return match ? match.join(" ") : cleaned;
}

function useControlledDigits(
	value: string | undefined,
	defaultValue: string,
	onChange?: (digits: string) => void
): [string, (next: string) => void] {
	const isControlled = value !== undefined;
	const [internal, setInternal] = useState(defaultValue);
	const current = isControlled ? (value as string) : internal;

	const setValue = useCallback(
		(next: string) => {
			const digits = next.replace(/\D/g, "");
			if (!isControlled) setInternal(digits);
			onChange?.(digits);
		},
		[isControlled, onChange]
	);

	return [current, setValue];
}

export interface InputPaymentProps
	extends Omit<InputBaseProps, "type" | "value" | "defaultValue" | "onChange" | "iconLeading"> {
	/** Label text rendered above the field. */
	label?: string;
	/** Helper / error text rendered below the field. */
	hint?: ReactNode;
	/** Mark required (label `*`, native `required`). */
	isRequired?: boolean;
	/** Hide the required `*` indicator even when required. */
	hideRequiredIndicator?: boolean;
	/** Controlled raw digit string (no spaces). */
	value?: string;
	/** Uncontrolled initial raw digit string. */
	defaultValue?: string;
	/** Called with the raw digit string (no spaces). */
	onChange?: (digits: string) => void;
	/** Max digits incl. grouping spaces. @default 19 */
	maxLength?: number;
	/** Class name for the outer wrapper. */
	containerClassName?: string;
}

export const InputPayment = forwardRef<HTMLInputElement, InputPaymentProps>(
	(
		{
			label,
			hint,
			isRequired,
			hideRequiredIndicator,
			isInvalid,
			value,
			defaultValue = "",
			onChange,
			maxLength = 19,
			containerClassName,
			placeholder = "1234 1234 1234 1234",
			id,
			...props
		},
		ref
	) => {
		const generatedId = useId();
		const inputId = id ?? generatedId;
		const [digits, setDigits] = useControlledDigits(value, defaultValue, onChange);
		const CardIcon = detectCardIcon(digits);

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

				<InputBase
					ref={ref}
					id={inputId}
					inputMode="numeric"
					autoComplete="cc-number"
					required={isRequired}
					isInvalid={isInvalid}
					maxLength={maxLength}
					placeholder={placeholder}
					value={formatCardNumber(digits)}
					onChange={(e) => setDigits(e.currentTarget.value)}
					iconLeading={<CardIcon className="h-6 w-8.5" />}
					{...props}
				/>

				{hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
			</div>
		);
	}
);

InputPayment.displayName = "InputPayment";
