"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/date-picker/date-range-picker.tsx + range-calendar.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
	endOfMonth,
	endOfWeek,
	getLocalTimeZone,
	startOfMonth,
	startOfWeek,
	today,
} from "@internationalized/date";
import type {
	DateRange,
	DateRangePickerProps as AriaDateRangePickerProps,
	DateValue,
} from "react-aria-components";
import {
	Button as AriaButton,
	CalendarGrid as AriaCalendarGrid,
	CalendarGridBody as AriaCalendarGridBody,
	CalendarGridHeader as AriaCalendarGridHeader,
	CalendarHeaderCell as AriaCalendarHeaderCell,
	DateInput as AriaDateInput,
	DateRangePicker as AriaDateRangePicker,
	DateSegment as AriaDateSegment,
	Dialog as AriaDialog,
	Group as AriaGroup,
	Heading as AriaHeading,
	Popover as AriaPopover,
	RangeCalendar as AriaRangeCalendar,
	RangeCalendarStateContext,
	useLocale,
} from "react-aria-components";
import { cn } from "../lib/cn.js";
import { Button } from "./buttons/button.js";
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
/*  Month heading — reads visible range from RangeCalendar context            */
/* -------------------------------------------------------------------------- */

function MonthHeading({ offset = 0 }: { offset?: number }) {
	const state = useContext(RangeCalendarStateContext)!;
	const month = state.visibleRange.start.add({ months: offset });
	return (
		<span className="flex-1 text-center text-sm font-semibold text-fg">
			{new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(
				month.toDate(getLocalTimeZone()),
			)}
		</span>
	);
}

/* -------------------------------------------------------------------------- */
/*  Date formatting                                                            */
/* -------------------------------------------------------------------------- */

function formatDate(date: DateValue): string {
	return new Intl.DateTimeFormat(undefined, {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date.toDate(getLocalTimeZone()));
}

/* -------------------------------------------------------------------------- */
/*  Preset button                                                              */
/* -------------------------------------------------------------------------- */

interface PresetButtonProps {
	label: string;
	value: DateRange;
	currentValue: DateRange | null;
	onSelect: (value: DateRange | null) => void;
}

const PresetButton = ({
	label,
	value,
	currentValue,
	onSelect,
}: PresetButtonProps) => {
	const isSelected =
		currentValue?.start?.compare(value.start) === 0 &&
		currentValue?.end?.compare(value.end) === 0;

	return (
		<button
			type="button"
			onClick={() => onSelect(value)}
			className={cn(
				"cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium outline-none transition-colors duration-100",
				"focus-visible:ring-2 focus-visible:ring-brand-500/22",
				isSelected
					? "bg-bg-secondary text-fg"
					: "text-fg-secondary hover:bg-bg-secondary hover:text-fg",
			)}
		>
			{label}
		</button>
	);
};

/* -------------------------------------------------------------------------- */
/*  Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface DateRangePickerProps
	extends Omit<AriaDateRangePickerProps<DateValue>, "children"> {
	/** Field size for the trigger button. @default "md" */
	size?: "sm" | "md" | "lg";
	/** Label text rendered above the field. */
	label?: string;
	/** Helper / error text rendered below the field. */
	hint?: ReactNode;
	/** Hide the required `*` indicator even when required. */
	hideRequiredIndicator?: boolean;
	/** Class name for the outer wrapper. */
	containerClassName?: string;
	/** Called when user clicks Apply. */
	onApply?: () => void;
	/** Called when user clicks Cancel. */
	onCancel?: () => void;
}

/* -------------------------------------------------------------------------- */
/*  DateRangePicker                                                            */
/* -------------------------------------------------------------------------- */

export const DateRangePicker = ({
	value: valueProp,
	defaultValue,
	onChange,
	onApply,
	onCancel,
	size = "md",
	label,
	hint,
	hideRequiredIndicator,
	containerClassName,
	className,
	...props
}: DateRangePickerProps) => {
	const { locale } = useLocale();

	// Controlled/uncontrolled value
	const isControlled = valueProp !== undefined;
	const [internalValue, setInternalValue] = useState<DateRange | null>(
		defaultValue ?? null,
	);
	const displayValue = isControlled ? (valueProp ?? null) : internalValue;

	const setValue = useCallback(
		(v: DateRange | null) => {
			if (!isControlled) setInternalValue(v);
			if (v !== null) onChange?.(v);
		},
		[isControlled, onChange],
	);

	// Presets
	const now = useMemo(() => today(getLocalTimeZone()), []);
	const presets = useMemo(
		() => [
			{ label: "Today", value: { start: now, end: now } },
			{
				label: "Yesterday",
				value: {
					start: now.subtract({ days: 1 }),
					end: now.subtract({ days: 1 }),
				},
			},
			{
				label: "This week",
				value: {
					start: startOfWeek(now, locale),
					end: endOfWeek(now, locale),
				},
			},
			{
				label: "Last week",
				value: {
					start: startOfWeek(now, locale).subtract({ weeks: 1 }),
					end: endOfWeek(now, locale).subtract({ weeks: 1 }),
				},
			},
			{
				label: "This month",
				value: { start: startOfMonth(now), end: endOfMonth(now) },
			},
			{
				label: "Last month",
				value: {
					start: startOfMonth(now).subtract({ months: 1 }),
					end: endOfMonth(now).subtract({ months: 1 }),
				},
			},
			{
				label: "This year",
				value: {
					start: startOfMonth(now.set({ month: 1 })),
					end: endOfMonth(now.set({ month: 12 })),
				},
			},
			{
				label: "Last year",
				value: {
					start: startOfMonth(now.set({ month: 1 }).subtract({ years: 1 })),
					end: endOfMonth(now.set({ month: 12 }).subtract({ years: 1 })),
				},
			},
			{
				label: "All time",
				value: {
					start: now.subtract({ years: 10 }),
					end: now,
				},
			},
		],
		[now, locale],
	);

	const triggerLabel =
		displayValue?.start && displayValue?.end
			? `${formatDate(displayValue.start)} – ${formatDate(displayValue.end)}`
			: undefined;

	const fieldSizes = {
		sm: "text-sm",
		md: "text-md",
		lg: "text-md",
	};

	return (
		<AriaDateRangePicker
			{...props}
			aria-label={props["aria-label"] ?? "Date range picker"}
			shouldCloseOnSelect={false}
			value={displayValue}
			onChange={setValue}
			className={(state) =>
				cn(
					"group flex w-full flex-col gap-1.5",
					typeof className === "function" ? className(state) : className,
					containerClassName,
				)
			}
		>
			{({ isRequired, isInvalid }) => (
				<>
					{label && (
						<Label
							isRequired={!hideRequiredIndicator && isRequired}
							isInvalid={isInvalid}
						>
							{label}
						</Label>
					)}

					{/* Trigger */}
					<AriaGroup>
						<AriaButton
							className={cn(
								"inline-flex w-full cursor-pointer items-center gap-2 rounded-lg border border-border bg-bg px-3 py-2 shadow-xs outline-none transition-all duration-100",
								"hover:bg-bg-secondary",
								"data-focus-visible:border-border-brand data-focus-visible:ring-4 data-focus-visible:ring-brand-500/22",
								"data-invalid:border-border-error data-invalid:data-focus-visible:ring-error-500/24",
								"data-disabled:cursor-not-allowed data-disabled:opacity-50",
								size === "lg" && "px-3.5 py-2.5",
								fieldSizes[size],
							)}
						>
							<CalendarIcon className="size-4 shrink-0 text-fg-tertiary" />
							{triggerLabel ? (
								<span className="flex-1 text-left font-medium text-fg">
									{triggerLabel}
								</span>
							) : (
								<span className="flex-1 text-left text-fg-tertiary">
									Select dates
								</span>
							)}
						</AriaButton>
					</AriaGroup>

					{/* Popover */}
					<AriaPopover
						placement="bottom start"
						offset={6}
						containerPadding={8}
						className={({ isEntering, isExiting }) =>
							cn(
								"w-max rounded-2xl border border-border bg-bg shadow-xl outline-none",
								isEntering &&
									"animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 duration-150 ease-out",
								isExiting &&
									"animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 duration-100 ease-in",
							)
						}
					>
						<AriaDialog
							aria-label="Date range picker"
							className="flex flex-col outline-none sm:flex-row"
						>
							{({ close }) => (
								<>
									{/* Preset sidebar (md+ only) */}
									<div className="hidden w-38 flex-col gap-0.5 border-r border-border p-3 sm:flex">
										{presets.map((preset) => (
											<PresetButton
												key={preset.label}
												label={preset.label}
												value={preset.value}
												currentValue={displayValue}
												onSelect={(v) => setValue(v)}
											/>
										))}
									</div>

									{/* Calendar + footer */}
									<div className="flex flex-col">
										<AriaRangeCalendar
											visibleDuration={{ months: 2 }}
											className="p-4"
										>
											{/* Hidden heading for a11y */}
											<AriaHeading className="sr-only" />

											<div className="flex gap-6">
												{/* Month 1 */}
												<div className="flex flex-col gap-3">
													<div className="flex items-center gap-1">
														<AriaButton
															slot="previous"
															className={cn(
																"flex size-8 shrink-0 items-center justify-center rounded-lg text-fg-tertiary outline-none transition-colors",
																"hover:bg-bg-secondary hover:text-fg",
																"focus-visible:ring-2 focus-visible:ring-brand-500/22",
																"data-disabled:pointer-events-none data-disabled:opacity-40",
															)}
														>
															<ChevronLeftIcon className="size-4" />
														</AriaButton>
														<MonthHeading offset={0} />
													</div>
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
												</div>

												{/* Divider */}
												<div className="w-px bg-border" />

												{/* Month 2 */}
												<div className="flex flex-col gap-3">
													<div className="flex items-center gap-1">
														<MonthHeading offset={1} />
														<AriaButton
															slot="next"
															className={cn(
																"flex size-8 shrink-0 items-center justify-center rounded-lg text-fg-tertiary outline-none transition-colors",
																"hover:bg-bg-secondary hover:text-fg",
																"focus-visible:ring-2 focus-visible:ring-brand-500/22",
																"data-disabled:pointer-events-none data-disabled:opacity-40",
															)}
														>
															<ChevronRightIcon className="size-4" />
														</AriaButton>
													</div>
													<AriaCalendarGrid offset={{ months: 1 }} className="w-full border-collapse">
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
												</div>
											</div>
										</AriaRangeCalendar>

										{/* Footer */}
										<div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
											{/* Inline date segment inputs */}
											<div className="hidden items-center gap-2 md:flex">
												<div className="flex items-center rounded-md border border-border px-2 py-1 text-sm">
													<AriaDateInput
														slot="start"
														className="flex"
													>
														{(segment) => (
															<AriaDateSegment
																segment={segment}
																className={cn(
																	"rounded-sm px-0.5 text-sm text-fg tabular-nums caret-transparent outline-none",
																	"data-focused:bg-primary data-focused:font-medium data-focused:text-primary-fg",
																	"data-placeholder:text-fg-secondary data-placeholder:uppercase data-focused:data-placeholder:text-primary-fg",
																	"data-[type=literal]:text-fg-tertiary",
																)}
															/>
														)}
													</AriaDateInput>
												</div>
												<span className="text-sm text-fg-tertiary">–</span>
												<div className="flex items-center rounded-md border border-border px-2 py-1 text-sm">
													<AriaDateInput
														slot="end"
														className="flex"
													>
														{(segment) => (
															<AriaDateSegment
																segment={segment}
																className={cn(
																	"rounded-sm px-0.5 text-sm text-fg tabular-nums caret-transparent outline-none",
																	"data-focused:bg-primary data-focused:font-medium data-focused:text-primary-fg",
																	"data-placeholder:text-fg-secondary data-placeholder:uppercase data-focused:data-placeholder:text-primary-fg",
																	"data-[type=literal]:text-fg-tertiary",
																)}
															/>
														)}
													</AriaDateInput>
												</div>
											</div>

											{/* Actions */}
											<div className="ml-auto flex gap-2">
												<Button
													size="sm"
													color="secondary"
													onClick={() => {
														onCancel?.();
														close();
													}}
												>
													Cancel
												</Button>
												<Button
													size="sm"
													color="primary"
													onClick={() => {
														onApply?.();
														close();
													}}
												>
													Apply
												</Button>
											</div>
										</div>
									</div>
								</>
							)}
						</AriaDialog>
					</AriaPopover>

					{hint && (
						<HintText
							isInvalid={isInvalid}
							size={size === "sm" ? "sm" : "md"}
						>
							{hint}
						</HintText>
					)}
				</>
			)}
		</AriaDateRangePicker>
	);
};
DateRangePicker.displayName = "DateRangePicker";
