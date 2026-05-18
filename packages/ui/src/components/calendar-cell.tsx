"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { CalendarCellProps as AriaCalendarCellProps } from "react-aria-components";
import {
	CalendarCell as AriaCalendarCell,
	RangeCalendarContext,
	useSlottedContext,
} from "react-aria-components";
import { cn } from "../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface CalendarCellProps extends AriaCalendarCellProps {
	/** Hide out-of-month dates in range calendar. @default false */
	showOutOfRangeDates?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  CalendarCell                                                               */
/*  Shared by DatePicker (single) and DateRangePicker (range).                */
/*  Detects range context automatically via RangeCalendarContext.              */
/* -------------------------------------------------------------------------- */

export const CalendarCell = ({
	date,
	showOutOfRangeDates = false,
	...props
}: CalendarCellProps) => {
	const rangeCtx = useSlottedContext(RangeCalendarContext);
	const isRangeCalendar = !!rangeCtx;

	return (
		<AriaCalendarCell
			{...props}
			date={date}
			className={({
				isSelected,
				isSelectionStart,
				isSelectionEnd,
				isOutsideMonth,
				isDisabled,
				isUnavailable,
			}) => {
				if (!isRangeCalendar) {
					return cn(
						"flex size-9 cursor-pointer items-center justify-center rounded-lg text-sm text-fg outline-none transition-colors",
						"hover:bg-bg-secondary",
						"data-today:font-semibold data-today:ring-1 data-today:ring-border-brand",
						"data-today:data-selected:ring-0",
						"data-focus-visible:ring-2 data-focus-visible:ring-brand-500/22",
						isOutsideMonth && "text-fg-tertiary opacity-50",
						isSelected &&
							"bg-primary font-medium text-primary-fg hover:bg-primary-hover",
						isDisabled && "pointer-events-none opacity-40",
						isUnavailable &&
							"pointer-events-none opacity-40 line-through",
					);
				}

				// Range calendar: outer cell is the range-fill container
				const isInRange =
					isSelected && !isSelectionStart && !isSelectionEnd;
				return cn(
					"relative size-10 outline-none",
					isDisabled ? "pointer-events-none" : "cursor-pointer",
					isInRange && "bg-bg-secondary",
					isSelectionStart && "rounded-l-full",
					isSelectionEnd && "rounded-r-full",
					isOutsideMonth && !showOutOfRangeDates && "invisible",
				);
			}}
		>
			{isRangeCalendar
				? ({
						isSelected,
						isSelectionStart,
						isSelectionEnd,
						isDisabled,
						isFocusVisible,
						formattedDate,
						isToday,
					}) => {
						const isEndpoint = isSelectionStart || isSelectionEnd;
						return (
							<div
								className={cn(
									"relative flex size-full items-center justify-center rounded-full text-sm transition-colors",
									!isEndpoint && "text-fg",
									!isSelected && !isDisabled && "hover:bg-bg-secondary",
									isEndpoint &&
										!isDisabled &&
										"bg-primary font-medium text-primary-fg hover:bg-primary-hover",
									isSelected &&
										!isEndpoint &&
										!isDisabled &&
										"font-medium",
									isFocusVisible && "ring-2 ring-brand-500/22",
									isDisabled && "text-fg opacity-40",
								)}
							>
								{formattedDate}
								{isToday && (
									<span
										className={cn(
											"absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full",
											isEndpoint ? "bg-primary-fg" : "bg-primary",
										)}
									/>
								)}
							</div>
						);
					}
				: undefined}
		</AriaCalendarCell>
	);
};
CalendarCell.displayName = "CalendarCell";
