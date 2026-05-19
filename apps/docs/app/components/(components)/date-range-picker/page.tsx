/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { ComponentDocLayout, type DocExample } from "../../../_components/docs/ComponentDocLayout";
import {
	DefaultDemo,
	FullWidthDemo,
	WithLabelHintDemo,
	ControlledDemo,
	SizesDemo,
} from "./DateRangePickerExamples";

const SECTIONS: DocExample[] = [
	{
		id: "default",
		title: "Default",
		description:
			"Button trigger opens a popover with a month calendar, preset sidebar, and Apply / Cancel footer.",
		preview: <DefaultDemo />,
		code: `<DateRangePicker />`,
	},
	{
		id: "label-hint",
		title: "Label + hint",
		description: "Use `label` and `hint` props to render a field label above and helper text below.",
		preview: <WithLabelHintDemo />,
		code: `<DateRangePicker
  label="Booking window"
  hint="Choose your check-in and check-out dates."
/>`,
	},
	{
		id: "controlled",
		title: "Controlled",
		description:
			"Pass `value` + `onChange` to control the selection externally. Use `onApply` and `onCancel` to hook into the footer buttons.",
		preview: <ControlledDemo />,
		code: `const [value, setValue] = useState<DateRange | null>(null);

<DateRangePicker
  label="Report period"
  value={value ?? undefined}
  onChange={(v) => setValue(v)}
  onApply={() => console.log("applied", value)}
  onCancel={() => setValue(null)}
/>`,
	},
	{
		id: "full-width",
		title: "Dual-month",
		description:
			"Two-month calendar view with preset sidebar and Apply / Cancel footer. Opens wider to show both months side by side.",
		preview: <FullWidthDemo />,
		code: `const [value, setValue] = useState<DateRange | null>(null);

<DateRangePicker
  label="Report period"
  value={value ?? undefined}
  onChange={(v) => setValue(v)}
  onApply={() => {}}
  onCancel={() => setValue(null)}
/>`,
	},
	{
		id: "sizes",
		title: "Sizes",
		description: "Three trigger sizes: `sm`, `md` (default), `lg`.",
		preview: <SizesDemo />,
		code: `<DateRangePicker size="sm" />
<DateRangePicker size="md" />
<DateRangePicker size="lg" />`,
	},
];

export default function DateRangePickerPage() {
	return (
		<ComponentDocLayout
			name="DateRangePicker"
			tagline="Date range selection with preset shortcuts, a calendar popover, and inline segment inputs. Built on React Aria."
			install={{
				usage: `import { DateRangePicker } from "@mvp-ui/ui";`,
			}}
			sections={SECTIONS}
			tokenReference={[
				{ label: "Trigger border", value: "border-border" },
				{ label: "Trigger bg", value: "bg-bg" },
				{ label: "Popover bg", value: "bg-bg" },
				{ label: "Popover border", value: "border-border" },
				{ label: "Range fill", value: "bg-bg-secondary" },
				{ label: "Selection", value: "bg-primary text-primary-fg" },
			]}
		/>
	);
}
