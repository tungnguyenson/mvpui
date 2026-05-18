"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	ComponentDocLayout,
	type DocExample,
} from "../../../_components/docs/ComponentDocLayout";
import {
	DefaultDemo,
	DisabledDemo,
	SizesDemo,
	IconLeadingDemo,
	AvatarLeadingDemo,
	DotLeadingDemo,
	Default,
	IconLeading,
	AvatarLeading,
	DotLeading,
} from "./SelectExamples";

const SECTIONS: DocExample[] = [
	{
		id: "default-demo",
		title: "Default",
		description: "Single select with label, hint, and required indicator.",
		preview: <DefaultDemo />,
		code: `<Select isRequired label="Team member" hint="This is a hint text to help user." placeholder="Select team member" items={items}>
  {(item) => <Select.Item id={item.id} supportingText={item.supportingText}>{item.label}</Select.Item>}
</Select>`,
	},
	{
		id: "disabled-demo",
		title: "Disabled",
		description: "Select in disabled state.",
		preview: <DisabledDemo />,
		code: `<Select isRequired isDisabled label="Team member" placeholder="Select team member" items={items}>
  {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
</Select>`,
	},
	{
		id: "sizes-demo",
		title: "Sizes",
		description: "sm and md sizes.",
		preview: <SizesDemo />,
		code: `<Select size="sm" ...>...</Select>
<Select size="md" ...>...</Select>`,
	},
	{
		id: "icon-leading-demo",
		title: "Icon leading (demo)",
		description: "Select with a leading icon on the trigger and items.",
		preview: <IconLeadingDemo />,
		code: `<Select icon={UserIcon} items={items}>
  {(item) => <Select.Item id={item.id} icon={UserIcon}>{item.label}</Select.Item>}
</Select>`,
	},
	{
		id: "avatar-leading-demo",
		title: "Avatar leading (demo)",
		description: "Select with avatar URLs on each item.",
		preview: <AvatarLeadingDemo />,
		code: `<Select items={avatarItems}>
  {(item) => <Select.Item id={item.id} avatarUrl={item.avatarUrl}>{item.label}</Select.Item>}
</Select>`,
	},
	{
		id: "dot-leading-demo",
		title: "Dot leading (demo)",
		description: "Select with dot status icon as leading element.",
		preview: <DotLeadingDemo />,
		code: `<Select icon={<DotIcon className="size-2.5 text-fg-success" />} items={dotItems}>
  {(item) => <Select.Item id={item.id} icon={item.icon}>{item.label}</Select.Item>}
</Select>`,
	},
	{
		id: "default",
		title: "Default — all sizes",
		description: "All three sizes (sm, md, lg) × enabled and disabled.",
		preview: <Default />,
		code: `<Select size="sm" ...>...</Select>
<Select size="md" ...>...</Select>
<Select size="lg" ...>...</Select>`,
	},
	{
		id: "icon-leading",
		title: "Icon leading — all sizes",
		description: "Icon leading × all sizes × enabled and disabled.",
		preview: <IconLeading />,
		code: `<Select size="sm" icon={UserIcon} ...>...</Select>
<Select size="md" icon={UserIcon} ...>...</Select>
<Select size="lg" icon={UserIcon} ...>...</Select>`,
	},
	{
		id: "avatar-leading",
		title: "Avatar leading — all sizes",
		description: "Avatar leading × all sizes × enabled and disabled.",
		preview: <AvatarLeading />,
		code: `<Select size="sm" items={avatarItems} ...>...</Select>
<Select size="md" items={avatarItems} ...>...</Select>
<Select size="lg" items={avatarItems} ...>...</Select>`,
	},
	{
		id: "dot-leading",
		title: "Dot leading — all sizes",
		description: "Dot leading icon × all sizes × enabled and disabled.",
		preview: <DotLeading />,
		code: `<Select size="sm" icon={<DotIcon />} ...>...</Select>
<Select size="md" icon={<DotIcon />} ...>...</Select>
<Select size="lg" icon={<DotIcon />} ...>...</Select>`,
	},
];

export default function SelectPage() {
	return (
		<ComponentDocLayout
			name="Select"
			tagline="Accessible single-select dropdown built on React Aria. Supports icons, avatars, dot indicators, and three sizes."
			install={{
				usage: `import { Select } from "@mvp-ui/ui";`,
			}}
			sections={SECTIONS}
			tokenReference={[
				{ label: "Size sm", value: "py-2 pl-3 pr-2.5" },
				{ label: "Size md", value: "py-2 px-3" },
				{ label: "Size lg", value: "py-2.5 px-3.5" },
				{ label: "Trigger bg", value: "bg-bg" },
				{ label: "Trigger border", value: "ring-1 ring-border" },
				{ label: "Focus ring", value: "ring-2 ring-brand-500/22" },
				{ label: "Popover bg", value: "bg-bg" },
				{ label: "Item hover bg", value: "bg-bg-secondary" },
				{ label: "Check icon", value: "text-fg-brand" },
			]}
		/>
	);
}
