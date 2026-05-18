"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/slider/slider.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	Label as AriaLabel,
	Slider as AriaSlider,
	type SliderProps as AriaSliderProps,
	SliderOutput as AriaSliderOutput,
	SliderThumb as AriaSliderThumb,
	SliderTrack as AriaSliderTrack,
} from "react-aria-components";
import { cn } from "../lib/cn.js";

/* ==========================================================================
   Token mapping (Untitled UI → MVP UI):
   - bg-quaternary              → bg-bg-tertiary (track background)
   - bg-brand-solid             → bg-primary (active fill)
   - bg-slider-handle-bg        → bg-bg (thumb background)
   - ring-slider-handle-border  → ring-border (thumb ring)
   - text-primary               → text-fg
   - text-secondary             → text-fg-secondary
   - bg-primary (floating label)→ bg-bg
   - ring-secondary_alt (float) → ring-border-secondary
   - outline-focus-ring         → outline-ring
   ========================================================================== */

const labelPositionStyles = {
	default: "hidden",
	bottom:
		"absolute top-2 left-1/2 -translate-x-1/2 translate-y-full text-sm font-medium text-fg",
	"top-floating":
		"absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-lg bg-bg px-2 py-1.5 text-xs font-semibold text-fg-secondary shadow-lg ring-1 ring-border-secondary",
} as const;

export interface SliderProps extends AriaSliderProps {
	labelPosition?: keyof typeof labelPositionStyles;
	labelFormatter?: (value: number) => string;
}

export const Slider = ({
	labelPosition = "default",
	minValue = 0,
	maxValue = 100,
	labelFormatter,
	formatOptions,
	...rest
}: SliderProps) => {
	// Format thumb value as percentage by default.
	const defaultFormatOptions: Intl.NumberFormatOptions = {
		style: "percent",
		maximumFractionDigits: 0,
	};

	return (
		<AriaSlider
			{...rest}
			className={rest.className ?? "w-full"}
			minValue={minValue}
			maxValue={maxValue}
			formatOptions={formatOptions ?? defaultFormatOptions}
		>
			<AriaLabel />
			<AriaSliderTrack className="relative h-6 w-full">
				{({ state: { values, getThumbValue, getThumbPercent, getFormattedValue } }) => {
					const left =
						values.length === 1 ? 0 : getThumbPercent(0);
					const width =
						values.length === 1
							? getThumbPercent(0)
							: getThumbPercent(1) - left;

					return (
						<>
							{/* Track background */}
							<span className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-border-secondary" />
							{/* Active fill */}
							<span
								className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-primary"
								style={{
									left: `${left * 100}%`,
									width: `${width * 100}%`,
								}}
							/>
							{values.map((_, index) => (
								<AriaSliderThumb
									key={index}
									index={index}
									className={({ isFocusVisible, isDragging }) =>
										cn(
											"top-1/2 box-border size-6 cursor-grab rounded-full bg-bg shadow-md ring-2 ring-border ring-inset",
											isFocusVisible &&
												"outline-2 outline-offset-2 outline-ring",
											isDragging && "cursor-grabbing",
										)
									}
								>
									<AriaSliderOutput
										className={cn(
											"whitespace-nowrap",
											labelPositionStyles[labelPosition],
										)}
									>
										{labelFormatter
											? labelFormatter(getThumbValue(index))
											: getFormattedValue(
													getThumbValue(index) / 100,
												)}
									</AriaSliderOutput>
								</AriaSliderThumb>
							))}
						</>
					);
				}}
			</AriaSliderTrack>
		</AriaSlider>
	);
};
Slider.displayName = "Slider";
