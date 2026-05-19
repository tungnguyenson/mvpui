"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * Shared tooltip, legend, and active-dot components for all charts.
 */

import type { TooltipProps } from "recharts";
import type { Props as LegendContentProps } from "recharts/types/component/DefaultLegendContent";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import type { Props as DotProps } from "recharts/types/shape/Dot";
import { cn } from "../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  ChartLegendContent                                                         */
/* -------------------------------------------------------------------------- */

export interface ChartLegendContentProps extends LegendContentProps {
	reversed?: boolean;
	className?: string;
}

export function ChartLegendContent({
	reversed,
	payload,
	align,
	layout,
	className,
}: ChartLegendContentProps) {
	const items = reversed ? payload?.toReversed() : payload;
	return (
		<ul
			className={cn(
				"flex",
				layout === "vertical"
					? "flex-col gap-1 pl-4 items-start"
					: cn(
							"flex-row gap-3",
							align === "center"
								? "justify-center"
								: align === "right"
									? "justify-end"
									: "justify-start",
						),
				className,
			)}
		>
			{items?.map((entry, i: number) => (
				<li key={i} className="flex items-center gap-2 text-sm text-fg-tertiary">
					<span
						className={cn(
							"block size-2 shrink-0 rounded-full",
							(entry.payload as { className?: string } | undefined)?.className,
						)}
						style={{
							backgroundColor:
								(entry.payload as { fill?: string } | undefined)?.fill ??
								(entry.color || undefined),
						}}
					/>
					{entry.value}
				</li>
			))}
		</ul>
	);
}

/* -------------------------------------------------------------------------- */
/*  ChartTooltipContent                                                        */
/* -------------------------------------------------------------------------- */

interface ChartTooltipContentProps extends TooltipProps<ValueType, NameType> {
	isRadialChart?: boolean;
	isPieChart?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload?: any;
}

export function ChartTooltipContent({
	active,
	payload,
	label,
	isRadialChart,
	isPieChart,
	formatter,
	labelFormatter,
}: ChartTooltipContentProps) {
	if (!active || !payload?.length) return null;

	const single = payload.length === 1;
	let title = single ? payload[0].value : label;
	let sub: unknown = single
		? isRadialChart
			? payload[0].payload?.name
			: isPieChart
				? payload[0].name
				: label
		: payload;

	if (single && formatter) {
		title = formatter(title, payload[0].name || label, payload[0], 0, payload);
	} else if (labelFormatter) {
		title = labelFormatter(title, payload);
	}
	if (single && labelFormatter) {
		sub = labelFormatter(sub, payload);
	}

	return (
		<div className="flex flex-col gap-0.5 rounded-lg bg-fg px-3 py-2 shadow-lg">
			<p className="text-xs font-semibold text-bg">{title as string}</p>
			{sub == null ? null : Array.isArray(sub) ? (
				<div>
					{(sub as Array<{ name: string; value: ValueType }>).map(
						(entry, i: number) => (
							<p key={i} className="text-xs text-bg/70">
								{`${entry.name}: ${
									formatter
										? formatter(entry.value, entry.name, entry as never, i, payload)
										: entry.value
								}`}
							</p>
						),
					)}
				</div>
			) : (
				<p className="text-xs text-bg/70">{sub as string}</p>
			)}
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  ChartActiveDot                                                             */
/* -------------------------------------------------------------------------- */

export function ChartActiveDot({ cx = 0, cy = 0 }: DotProps) {
	const size = 12;
	return (
		<svg
			x={cx - size / 2}
			y={cy - size / 2}
			width={size}
			height={size}
			viewBox="0 0 12 12"
			fill="none"
		>
			<rect
				x="2"
				y="2"
				width="8"
				height="8"
				rx="6"
				fill="var(--color-bg)"
				stroke="var(--color-brand-600)"
				strokeWidth="2"
			/>
		</svg>
	);
}
