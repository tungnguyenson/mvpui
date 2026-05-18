"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { ComponentDocLayout, type DocExample } from "../../../_components/docs/ComponentDocLayout";
import {
	DefaultDemo,
	LabelHintDemo,
	ErrorDemo,
	DisabledDemo,
	SizesDemo,
} from "./DatePickerExamples";

const SECTIONS: DocExample[] = [
	{
		id: "default",
		title: "Default",
		description: "Minimal date picker with keyboard-navigable segments and a calendar popover.",
		preview: <DefaultDemo />,
		code: `<DatePicker aria-label="Select date" />`,
	},
	{
		id: "label-hint",
		title: "With label and hint",
		description: "Use `label` and `hint` for accessible form fields.",
		preview: <LabelHintDemo />,
		code: `<DatePicker
  label="Start date"
  hint="Choose the project kick-off date."
/>`,
	},
	{
		id: "error",
		title: "Error state",
		description: "Pass `isInvalid` to trigger the error border and hint styling.",
		preview: <ErrorDemo />,
		code: `<DatePicker
  label="Due date"
  hint="Date is required and must be in the future."
  isInvalid
  isRequired
/>`,
	},
	{
		id: "disabled",
		title: "Disabled",
		description: "Pass `isDisabled` to prevent interaction while preserving context.",
		preview: <DisabledDemo />,
		code: `<DatePicker
  label="Locked date"
  hint="This field is read-only in the current context."
  isDisabled
/>`,
	},
	{
		id: "sizes",
		title: "Sizes",
		description: "Three sizes — sm, md (default), lg — to match the rest of the input family.",
		preview: <SizesDemo />,
		code: `<DatePicker size="sm" label="Small" />
<DatePicker size="md" label="Medium" />
<DatePicker size="lg" label="Large" />`,
	},
];

export default function DatePickerPage() {
	return (
		<ComponentDocLayout
			name="DatePicker"
			tagline="Accessible date picker built on React Aria. Keyboard-navigable date segments with a calendar popover."
			install={{
				usage: `import { DatePicker } from "@mvp-ui/ui/date-picker";`,
			}}
			sections={SECTIONS}
			tokenReference={[
				{ label: "Field bg", value: "bg-bg" },
				{ label: "Field border", value: "border-border" },
				{ label: "Focus ring", value: "ring-4 ring-brand-500/22" },
				{ label: "Error border", value: "border-border-error" },
				{ label: "Error ring", value: "ring-error-500/24" },
				{ label: "Segment selected", value: "bg-primary text-primary-fg" },
				{ label: "Popover bg", value: "bg-bg" },
				{ label: "Cell selected", value: "bg-primary text-primary-fg" },
				{ label: "Today ring", value: "ring-1 ring-border-brand" },
			]}
		/>
	);
}
