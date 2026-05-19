"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/charts/pie-charts.demo.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	Legend,
	Pie,
	PieChart as RechartsPieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import { CHART_COLORS } from "../lib/chart-colors.js";
import { ChartLegendContent, ChartTooltipContent } from "./chart-base.js";
import { Cell } from "recharts";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface PieChartDataItem {
	name: string;
	value: number;
	/** Explicit fill color (CSS color string). Falls back to palette. */
	color?: string;
}

export interface PieChartProps {
	data: PieChartDataItem[];
	/** Inner radius as percentage (0 = solid pie, >0 = donut). @default 0.5 */
	innerRadiusRatio?: number;
	/** Height of the chart in pixels. @default 200 */
	height?: number;
	/** Whether to show the legend. @default true */
	showLegend?: boolean;
	/** Legend placement. @default "right" */
	legendAlign?: "left" | "center" | "right";
	/** Custom color palette. */
	colors?: string[];
}

/* -------------------------------------------------------------------------- */
/*  PieChart                                                                   */
/* -------------------------------------------------------------------------- */

export function PieChart({
	data,
	innerRadiusRatio = 0.5,
	height = 200,
	showLegend = true,
	legendAlign = "right",
	colors = CHART_COLORS as unknown as string[],
}: PieChartProps) {
	const outerRadius = Math.min(height / 2 - 10, 80);
	const innerRadius = outerRadius * innerRadiusRatio;

	return (
		<ResponsiveContainer width="100%" height={height}>
			<RechartsPieChart>
				{showLegend && (
					<Legend
						verticalAlign="middle"
						align={legendAlign}
						layout="vertical"
						content={(props) => <ChartLegendContent {...props} />}
					/>
				)}

				<Tooltip content={<ChartTooltipContent isPieChart />} />

				<Pie
					isAnimationActive={false}
					data={data}
					dataKey="value"
					nameKey="name"
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					startAngle={-270}
					endAngle={-630}
					stroke="none"
				>
					{data.map((entry, i) => (
						<Cell
							key={`cell-${i}`}
							fill={entry.color ?? colors[i % colors.length] ?? "var(--color-brand-600)"}
						/>
					))}
				</Pie>
			</RechartsPieChart>
		</ResponsiveContainer>
	);
}
