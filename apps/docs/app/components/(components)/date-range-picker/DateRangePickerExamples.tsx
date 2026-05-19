"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import type { DateRange } from "react-aria-components";
import { DateRangePicker } from "@mvp-ui/ui";

/* -------------------------------------------------------------------------- */
/*  DefaultDemo                                                                */
/* -------------------------------------------------------------------------- */

export function DefaultDemo() {
	return (
		<div className="w-full max-w-xs mx-auto">
			<DateRangePicker />
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  WithLabelHintDemo                                                          */
/* -------------------------------------------------------------------------- */

export function WithLabelHintDemo() {
	return (
		<div className="w-full max-w-xs mx-auto">
			<DateRangePicker
				label="Booking window"
				hint="Choose your check-in and check-out dates."
			/>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  ControlledDemo                                                             */
/* -------------------------------------------------------------------------- */

export function ControlledDemo() {
	const now = today(getLocalTimeZone());
	const [value, setValue] = useState<DateRange | null>({
		start: now,
		end: now.add({ days: 6 }),
	});

	return (
		<div className="w-full max-w-xs mx-auto flex flex-col gap-4">
			<DateRangePicker
				label="Report period"
				value={value}
				onChange={(v) => setValue(v)}
				onApply={() => {}}
				onCancel={() => setValue(null)}
			/>
			{value?.start && value?.end && (
				<p className="text-xs text-fg-tertiary text-center">
					{value.start.toString()} → {value.end.toString()}
				</p>
			)}
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  FullWidthDemo                                                              */
/* -------------------------------------------------------------------------- */

export function FullWidthDemo() {
	const now = today(getLocalTimeZone());
	const [value, setValue] = useState<DateRange | null>({
		start: now.subtract({ days: 7 }),
		end: now,
	});

	return (
		<div className="w-full">
			<DateRangePicker
				label="Report period"
				value={value}
				onChange={(v) => setValue(v)}
				onApply={() => {}}
				onCancel={() => setValue(null)}
			/>
			{value?.start && value?.end && (
				<p className="mt-3 text-xs text-fg-tertiary text-center">
					{value.start.toString()} → {value.end.toString()}
				</p>
			)}
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  SizesDemo                                                                  */
/* -------------------------------------------------------------------------- */

export function SizesDemo() {
	return (
		<div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
			<DateRangePicker size="sm" label="Small" />
			<DateRangePicker size="md" label="Medium (default)" />
			<DateRangePicker size="lg" label="Large" />
		</div>
	);
}
