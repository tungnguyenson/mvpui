"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/charts/progress-circles.demo.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	PolarAngleAxis,
	RadialBar,
	RadialBarChart,
	ResponsiveContainer,
} from "recharts";
import { cn } from "../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface ProgressCircleProps {
	/** Progress value 0–100. */
	value: number;
	/** Size variant. */
	size?: "xs" | "sm" | "md" | "lg";
	/** Primary label (displayed prominently inside). */
	title?: string;
	/** Secondary label (displayed smaller inside). */
	subtitle?: string;
	/** Fill color for the progress arc. @default "var(--color-brand-600)" */
	color?: string;
	/** Background track color. @default "var(--color-bg-secondary)" */
	trackColor?: string;
}

/* -------------------------------------------------------------------------- */
/*  Size config                                                                */
/* -------------------------------------------------------------------------- */

const SIZE_CONFIG = {
	xs: { size: 16, innerRadius: 72, titleClass: "text-xl font-semibold", subtitleClass: "text-xs font-medium", titleDY: "1.05em", subtitleDY: "-1.3em" },
	sm: { size: 20, innerRadius: 90, titleClass: "text-2xl font-semibold", subtitleClass: "text-xs font-medium", titleDY: "1em", subtitleDY: "-1.4em" },
	md: { size: 24, innerRadius: 108, titleClass: "text-3xl font-semibold", subtitleClass: "text-sm font-medium", titleDY: "1em", subtitleDY: "-1.5em" },
	lg: { size: 28, innerRadius: 126, titleClass: "text-4xl font-semibold", subtitleClass: "text-sm font-medium", titleDY: "1em", subtitleDY: "-2.1em" },
} as const;

const SIZE_HEIGHTS = { xs: 96, sm: 120, md: 144, lg: 168 } as const;

/* -------------------------------------------------------------------------- */
/*  ProgressCircle                                                             */
/* -------------------------------------------------------------------------- */

export function ProgressCircle({
	value,
	size = "sm",
	title,
	subtitle,
	color = "var(--color-brand-600)",
	trackColor = "var(--color-bg-secondary)",
}: ProgressCircleProps) {
	const cfg = SIZE_CONFIG[size];
	const chartData = [{ value: Math.max(0, Math.min(value, 100)) * 10 }];

	return (
		<div style={{ height: SIZE_HEIGHTS[size] }} className="w-full">
			<ResponsiveContainer width="100%" height="100%">
				<RadialBarChart
					data={chartData}
					innerRadius={cfg.innerRadius}
					barSize={cfg.size}
					startAngle={90}
					endAngle={90 + 360}
				>
					<PolarAngleAxis tick={false} type="number" domain={[0, 1000]} />
					<RadialBar
						isAnimationActive={false}
						dataKey="value"
						fill={color}
						cornerRadius={99}
						background={{ fill: trackColor }}
					/>
					{(title || subtitle) && (
						<text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
							{subtitle && (
								<tspan
									x="50%"
									dy={title ? cfg.subtitleDY : "1%"}
									fill="var(--color-fg-tertiary)"
									className={cn(cfg.subtitleClass)}
								>
									{subtitle}
								</tspan>
							)}
							{title && (
								<tspan
									x="50%"
									dy={subtitle ? cfg.titleDY : "1%"}
									fill="var(--color-fg)"
									className={cn(cfg.titleClass)}
								>
									{title}
								</tspan>
							)}
						</text>
					)}
				</RadialBarChart>
			</ResponsiveContainer>
		</div>
	);
}
