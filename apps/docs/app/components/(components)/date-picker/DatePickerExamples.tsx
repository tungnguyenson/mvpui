"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { DatePicker } from "@mvp-ui/ui";

/* -------------------------------------------------------------------------- */
/*  DefaultDemo                                                                */
/* -------------------------------------------------------------------------- */

export function DefaultDemo() {
	return (
		<div className="w-72">
			<DatePicker aria-label="Select date" />
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  LabelHintDemo                                                              */
/* -------------------------------------------------------------------------- */

export function LabelHintDemo() {
	return (
		<div className="w-72">
			<DatePicker
				label="Start date"
				hint="Choose the project kick-off date."
			/>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  ErrorDemo                                                                  */
/* -------------------------------------------------------------------------- */

export function ErrorDemo() {
	return (
		<div className="w-72">
			<DatePicker
				label="Due date"
				hint="Date is required and must be in the future."
				isInvalid
				isRequired
				aria-label="Due date (invalid)"
			/>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  DisabledDemo                                                               */
/* -------------------------------------------------------------------------- */

export function DisabledDemo() {
	return (
		<div className="w-72">
			<DatePicker
				label="Locked date"
				hint="This field is read-only in the current context."
				isDisabled
				aria-label="Locked date (disabled)"
			/>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  SizesDemo                                                                  */
/* -------------------------------------------------------------------------- */

export function SizesDemo() {
	return (
		<div className="flex w-72 flex-col gap-6">
			<DatePicker size="sm" label="Small" aria-label="Small date picker" />
			<DatePicker size="md" label="Medium" aria-label="Medium date picker" />
			<DatePicker size="lg" label="Large" aria-label="Large date picker" />
		</div>
	);
}
