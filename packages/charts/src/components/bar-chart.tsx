"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/charts/bar-charts.demo.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	Bar,
	BarChart as RechartsBarChart,
	CartesianGrid,
	Label,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { CHART_COLORS } from "../lib/chart-colors.js";
import {
	ChartLegendContent,
	ChartTooltipContent,
} from "./chart-base.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface BarChartSeries {
	/** Data key in each record. */
	dataKey: string;
	/** Display name in legend / tooltip. */
	name: string;
	/** Bar fill color (CSS color string). Falls back to palette. */
	color?: string;
	/** Whether to stack this bar in the same stackId. @default true */
	stacked?: boolean;
	/** Corner radius for the top-most bar. @default 0 */
	radius?: number;
}

export interface BarChartProps {
	/** Chart data array. */
	data: Record<string, unknown>[];
	/** Series configuration. */
	series: BarChartSeries[];
	/** Data key used for the x-axis. */
	xAxisKey: string;
	/** Formatter for x-axis tick labels. */
	xAxisFormatter?: (value: unknown) => string;
	/** Formatter for y-axis tick labels. */
	yAxisFormatter?: (value: unknown) => string;
	/** X-axis label text. */
	xAxisLabel?: string;
	/** Y-axis label text. */
	yAxisLabel?: string;
	/** Tooltip label formatter. */
	tooltipLabelFormatter?: (value: unknown) => string;
	/** Max bar size in pixels. @default 32 */
	maxBarSize?: number;
	/** Height of the chart in pixels. @default 240 */
	height?: number;
	/** Whether to show the legend. @default true */
	showLegend?: boolean;
	/** Custom color palette. Overrides default brand palette. */
	colors?: string[];
}

/* -------------------------------------------------------------------------- */
/*  BarChart                                                                   */
/* -------------------------------------------------------------------------- */

export function BarChart({
	data,
	series,
	xAxisKey,
	xAxisFormatter,
	yAxisFormatter,
	xAxisLabel,
	yAxisLabel,
	tooltipLabelFormatter,
	maxBarSize = 32,
	height = 240,
	showLegend = true,
	colors = CHART_COLORS as unknown as string[],
}: BarChartProps) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<RechartsBarChart
				data={data}
				margin={{ left: 4, right: 0, top: 12, bottom: xAxisLabel ? 24 : 8 }}
			>
				<CartesianGrid
					vertical={false}
					stroke="var(--color-border)"
				/>

				{showLegend && (
					<Legend
						verticalAlign="top"
						align="right"
						content={(props) => (
							<ChartLegendContent {...props} className="-translate-y-2" />
						)}
					/>
				)}

				<XAxis
					dataKey={xAxisKey}
					axisLine={false}
					tickLine={false}
					tickMargin={11}
					tick={{ fill: "var(--color-fg-tertiary)", fontSize: 12 }}
					interval="preserveStartEnd"
					tickFormatter={xAxisFormatter}
				>
					{xAxisLabel && (
						<Label
							value={xAxisLabel}
							fill="var(--color-fg-tertiary)"
							style={{ fontSize: 12, fontWeight: 500 }}
							position="bottom"
						/>
					)}
				</XAxis>

				<YAxis
					axisLine={false}
					tickLine={false}
					tick={{ fill: "var(--color-fg-tertiary)", fontSize: 12 }}
					interval="preserveStartEnd"
					tickFormatter={yAxisFormatter}
				>
					{yAxisLabel && (
						<Label
							value={yAxisLabel}
							fill="var(--color-fg-tertiary)"
							style={{ fontSize: 12, fontWeight: 500, textAnchor: "middle" }}
							angle={-90}
							position="insideLeft"
						/>
					)}
				</YAxis>

				<Tooltip
					content={<ChartTooltipContent />}
					formatter={yAxisFormatter as never}
					labelFormatter={tooltipLabelFormatter as never}
					cursor={{ fill: "var(--color-bg-secondary)" }}
				/>

				{series.map((s, i) => {
					const fill = s.color ?? colors[i % colors.length] ?? "var(--color-brand-600)";
					const isLast =
						(s.stacked !== false) &&
						series.filter((x) => x.stacked !== false).at(-1)?.dataKey === s.dataKey;
					return (
						<Bar
							key={s.dataKey}
							isAnimationActive={false}
							dataKey={s.dataKey}
							name={s.name}
							fill={fill}
							stackId={s.stacked !== false ? "stack" : undefined}
							maxBarSize={maxBarSize}
							radius={isLast ? [s.radius ?? 4, s.radius ?? 4, 0, 0] : [0, 0, 0, 0]}
						/>
					);
				})}
			</RechartsBarChart>
		</ResponsiveContainer>
	);
}
