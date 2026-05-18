"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { ReactNode } from "react";
import {
	Button as AriaButton,
	Calendar as AriaCalendar,
	CalendarGrid as AriaCalendarGrid,
	CalendarGridBody as AriaCalendarGridBody,
	CalendarGridHeader as AriaCalendarGridHeader,
	CalendarHeaderCell as AriaCalendarHeaderCell,
	DateInput as AriaDateInput,
	DatePicker as AriaDatePicker,
	type DatePickerProps as AriaDatePickerProps,
	DateSegment as AriaDateSegment,
	Group as AriaGroup,
	Heading as AriaHeading,
	Popover as AriaPopover,
	type DateValue,
} from "react-aria-components";
import { cn } from "../lib/cn.js";
import { CalendarCell } from "./calendar-cell.js";
import { HintText } from "./inputs/hint-text.js";
import { Label } from "./inputs/label.js";

/* -------------------------------------------------------------------------- */
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */

function CalendarIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
			<line x1="16" y1="2" x2="16" y2="6" />
			<line x1="8" y1="2" x2="8" y2="6" />
			<line x1="3" y1="10" x2="21" y2="10" />
		</svg>
	);
}

function ChevronLeftIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<path d="M15 18l-6-6 6-6" />
		</svg>
	);
}

function ChevronRightIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<path d="M9 18l6-6-6-6" />
		</svg>
	);
}

/* -------------------------------------------------------------------------- */
/*  Size map                                                                   */
/* -------------------------------------------------------------------------- */

const fieldSizes = {
	sm: "px-3 py-2 text-sm",
	md: "px-3 py-2 text-md",
	lg: "px-3.5 py-2.5 text-md",
};

/* -------------------------------------------------------------------------- */
/*  Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface DatePickerProps extends AriaDatePickerProps<DateValue> {
	/** Field size. @default "md" */
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

/* -------------------------------------------------------------------------- */
/*  DatePicker                                                                 */
/* -------------------------------------------------------------------------- */

export const DatePicker = ({
	size = "md",
	label,
	hint,
	hideRequiredIndicator,
	containerClassName,
	className,
	...props
}: DatePickerProps) => {
	return (
		<AriaDatePicker
			{...props}
			className={(state) =>
				cn(
					"group flex w-full flex-col gap-1.5",
					typeof className === "function" ? className(state) : className,
					containerClassName,
				)
			}
		>
			{({ isInvalid, isRequired, state }) => (
				<>
					{label && (
						<Label
							isRequired={!hideRequiredIndicator && isRequired}
							isInvalid={isInvalid}
						>
							{label}
						</Label>
					)}

					{/* Trigger field */}
					<AriaGroup
						className={cn(
							"flex w-full items-center rounded-lg border border-border bg-bg shadow-xs",
							"transition-shadow duration-100 ease-linear",
							"data-focus-within:border-border-brand data-focus-within:ring-4 data-focus-within:ring-brand-500/22",
							"data-invalid:border-border-error data-invalid:data-focus-within:ring-error-500/24",
							"data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:bg-bg-secondary",
							fieldSizes[size],
						)}
					>
						<AriaDateInput className="flex flex-1">
							{(segment) => (
								<AriaDateSegment
									segment={segment}
									className={cn(
										"rounded-sm px-0.5 text-fg tabular-nums caret-transparent outline-none",
										"data-focused:bg-primary data-focused:font-medium data-focused:text-primary-fg",
										"data-placeholder:text-fg-secondary data-placeholder:uppercase data-focused:data-placeholder:text-primary-fg",
										"data-[type=literal]:text-fg-tertiary",
									)}
								/>
							)}
						</AriaDateInput>

						<AriaButton
							className={cn(
								"ml-auto shrink-0 cursor-pointer rounded p-0.5 text-fg-tertiary outline-none transition-colors duration-100",
								"hover:text-fg focus-visible:ring-2 focus-visible:ring-brand-500/22",
								"data-disabled:pointer-events-none data-disabled:opacity-50",
							)}
						>
							<CalendarIcon
								className={cn(
									"size-4",
									size === "lg" && "size-5",
								)}
							/>
						</AriaButton>
					</AriaGroup>

					{/* Calendar popover */}
					<AriaPopover
						placement="bottom start"
						offset={6}
						containerPadding={0}
						className={({ isEntering, isExiting }) =>
							cn(
								"w-max rounded-xl border border-border bg-bg p-4 shadow-xl outline-none",
								isEntering &&
									"animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 duration-150 ease-out",
								isExiting &&
									"animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 duration-100 ease-in",
							)
						}
					>
						<AriaCalendar className="flex flex-col gap-4">
							{/* Calendar header */}
							<header className="flex items-center justify-between gap-2">
								<AriaButton
									slot="previous"
									className={cn(
										"flex size-8 items-center justify-center rounded-lg text-fg-tertiary outline-none transition-colors",
										"hover:bg-bg-secondary hover:text-fg",
										"focus-visible:ring-2 focus-visible:ring-brand-500/22",
										"data-disabled:pointer-events-none data-disabled:opacity-40",
									)}
								>
									<ChevronLeftIcon className="size-4" />
								</AriaButton>

								<AriaHeading className="flex-1 text-center text-sm font-semibold text-fg" />

								<AriaButton
									slot="next"
									className={cn(
										"flex size-8 items-center justify-center rounded-lg text-fg-tertiary outline-none transition-colors",
										"hover:bg-bg-secondary hover:text-fg",
										"focus-visible:ring-2 focus-visible:ring-brand-500/22",
										"data-disabled:pointer-events-none data-disabled:opacity-40",
									)}
								>
									<ChevronRightIcon className="size-4" />
								</AriaButton>
							</header>

							{/* Calendar grid */}
							<AriaCalendarGrid className="w-full border-collapse">
								<AriaCalendarGridHeader>
									{(day) => (
										<AriaCalendarHeaderCell className="pb-2 text-center text-xs font-medium text-fg-tertiary">
											{day}
										</AriaCalendarHeaderCell>
									)}
								</AriaCalendarGridHeader>

								<AriaCalendarGridBody>
									{(date) => <CalendarCell date={date} />}
								</AriaCalendarGridBody>
							</AriaCalendarGrid>
						</AriaCalendar>
					</AriaPopover>

					{hint && (
						<HintText isInvalid={isInvalid} size={size === "sm" ? "sm" : "md"}>
							{hint}
						</HintText>
					)}
				</>
			)}
		</AriaDatePicker>
	);
};

DatePicker.displayName = "DatePicker";
