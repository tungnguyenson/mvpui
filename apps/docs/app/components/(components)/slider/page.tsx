"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Slider } from "@mvp-ui/ui";
import {
	ComponentDocLayout,
	type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
	{
		id: "default",
		title: "Default",
		description: "Range slider with two thumbs and no label.",
		preview: <Slider defaultValue={[0, 25]} />,
		code: `<Slider defaultValue={[0, 25]} />`,
	},
	{
		id: "bottom-label",
		title: "Bottom label",
		description: "Thumb label displayed below the track.",
		preview: <Slider defaultValue={[0, 25]} labelPosition="bottom" />,
		code: `<Slider defaultValue={[0, 25]} labelPosition="bottom" />`,
	},
	{
		id: "top-floating",
		title: "Top floating",
		description: "Floating tooltip label above the thumb.",
		preview: (
			<div className="w-full pt-12">
				<Slider defaultValue={[0, 25]} labelPosition="top-floating" />
			</div>
		),
		code: `<Slider defaultValue={[0, 25]} labelPosition="top-floating" />`,
	},
	{
		id: "single-thumb",
		title: "Single thumb",
		description: "Single-thumb slider with floating label.",
		preview: (
			<div className="w-full pt-12">
				<Slider defaultValue={50} labelPosition="top-floating" />
			</div>
		),
		code: `<Slider defaultValue={50} labelPosition="top-floating" />`,
	},
];

export default function SliderPage() {
	return (
		<ComponentDocLayout
			name="Slider"
			tagline="Range or single-value slider built on React Aria. Supports no label, bottom label, and floating top label positions."
			install={{
				usage: `import { Slider } from "@mvp-ui/ui";`,
			}}
			sections={SECTIONS}
			tokenReference={[
				{ label: "Track background", value: "bg-border-secondary" },
				{ label: "Active fill", value: "bg-primary" },
				{ label: "Thumb background", value: "bg-bg" },
				{ label: "Thumb ring", value: "ring-2 ring-border" },
				{ label: "Focus outline", value: "outline-ring" },
			]}
		/>
	);
}
