"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/charts/line-charts.demo.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	Area,
	AreaChart,
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
	ChartActiveDot,
	ChartLegendContent,
	ChartTooltipContent,
} from "./chart-base.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface LineChartSeries {
	dataKey: string;
	name: string;
	color?: string;
	/** Whether to fill the area under the line. @default true */
	filled?: boolean;
	/** Stroke dash array (e.g. "5 5" for dashed). */
	dashArray?: string;
}

export interface LineChartProps {
	data: Record<string, unknown>[];
	series: LineChartSeries[];
	xAxisKey: string;
	xAxisFormatter?: (value: unknown) => string;
	yAxisFormatter?: (value: unknown) => string;
	xAxisLabel?: string;
	yAxisLabel?: string;
	tooltipLabelFormatter?: (value: unknown) => string;
	height?: number;
	showLegend?: boolean;
	colors?: string[];
}

/* -------------------------------------------------------------------------- */
/*  LineChart                                                                  */
/* -------------------------------------------------------------------------- */

export function LineChart({
	data,
	series,
	xAxisKey,
	xAxisFormatter,
	yAxisFormatter,
	xAxisLabel,
	yAxisLabel,
	tooltipLabelFormatter,
	height = 240,
	showLegend = true,
	colors = CHART_COLORS as unknown as string[],
}: LineChartProps) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<AreaChart
				data={data}
				margin={{ left: 4, right: 0, top: 12, bottom: xAxisLabel ? 24 : 8 }}
			>
				<defs>
					{series.map((s, i) => {
						const color = s.color ?? colors[i % colors.length] ?? "var(--color-brand-600)";
						return (
							<linearGradient key={s.dataKey} id={`fill-${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor={color} stopOpacity={0.2} />
								<stop offset="100%" stopColor={color} stopOpacity={0.02} />
							</linearGradient>
						);
					})}
				</defs>

				<CartesianGrid vertical={false} stroke="var(--color-border)" />

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
					cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
				/>

				{series.map((s, i) => {
					const color = s.color ?? colors[i % colors.length] ?? "var(--color-brand-600)";
					const filled = s.filled !== false;
					return (
						<Area
							key={s.dataKey}
							isAnimationActive={false}
							dataKey={s.dataKey}
							name={s.name}
							type="monotone"
							stroke={color}
							strokeWidth={2}
							strokeDasharray={s.dashArray}
							fill={filled ? `url(#fill-${s.dataKey})` : "transparent"}
							dot={false}
							activeDot={<ChartActiveDot />}
						/>
					);
				})}
			</AreaChart>
		</ResponsiveContainer>
	);
}
