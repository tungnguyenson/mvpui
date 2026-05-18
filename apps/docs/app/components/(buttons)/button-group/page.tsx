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
	Default,
	LeadingIcon,
	ButtonGroupDot,
	DisabledIndividualButton,
	DisabledAll,
	SelectedItem,
	MultipleSelectedItems,
	AllSmall,
	All,
} from "./ButtonGroupExamples";

const SECTIONS: DocExample[] = [
	{
		id: "default",
		title: "Default",
		description: "Three text-only buttons in a group.",
		preview: <Default />,
		code: `<ButtonGroup selectedKeys={[]}>
  <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
  <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
  <ButtonGroupItem id="delete">Delete</ButtonGroupItem>
</ButtonGroup>`,
	},
	{
		id: "leading-icon",
		title: "Leading icon",
		description: "Buttons with a leading icon and label.",
		preview: <LeadingIcon />,
		code: `<ButtonGroup selectedKeys={[]}>
  <ButtonGroupItem id="archive" iconLeading={ArchiveIcon}>Archive</ButtonGroupItem>
  <ButtonGroupItem id="edit" iconLeading={EditIcon}>Edit</ButtonGroupItem>
  <ButtonGroupItem id="delete" iconLeading={TrashIcon}>Delete</ButtonGroupItem>
</ButtonGroup>`,
	},
	{
		id: "dot",
		title: "Dot leading",
		description: "Status dot as the leading element, first item selected.",
		preview: <ButtonGroupDot />,
		code: `<ButtonGroup selectedKeys={["archive"]}>
  <ButtonGroupItem id="archive" iconLeading={<DotIcon className="size-2 text-fg-success" />}>Text</ButtonGroupItem>
  <ButtonGroupItem id="edit" iconLeading={<DotIcon className="size-2 text-fg-success" />}>Text</ButtonGroupItem>
  <ButtonGroupItem id="delete" isDisabled iconLeading={<DotIcon className="size-2 text-fg-success" />}>Text</ButtonGroupItem>
</ButtonGroup>`,
	},
	{
		id: "disabled-individual",
		title: "Disabled — individual button",
		description: "One button in the group is disabled.",
		preview: <DisabledIndividualButton />,
		code: `<ButtonGroup selectedKeys={[]}>
  <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
  <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
  <ButtonGroupItem isDisabled id="delete">Delete</ButtonGroupItem>
</ButtonGroup>`,
	},
	{
		id: "disabled-all",
		title: "Disabled — all",
		description: "Entire group disabled via the group prop.",
		preview: <DisabledAll />,
		code: `<ButtonGroup isDisabled>
  <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
  <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
  <ButtonGroupItem id="delete">Delete</ButtonGroupItem>
</ButtonGroup>`,
	},
	{
		id: "selected-item",
		title: "Selected item",
		description: "Single-select mode with controlled selection state.",
		preview: <SelectedItem />,
		code: `const [selectedKeys, setSelectedKeys] = useState(new Set(["today"]));
<ButtonGroup selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
  <ButtonGroupItem id="today">Today</ButtonGroupItem>
  <ButtonGroupItem id="tomorrow">Tomorrow</ButtonGroupItem>
  <ButtonGroupItem id="thisweek">This week</ButtonGroupItem>
</ButtonGroup>`,
	},
	{
		id: "multiple-selected",
		title: "Multiple selected items",
		description: "Multiple-select mode — toggle any combination.",
		preview: <MultipleSelectedItems />,
		code: `<ButtonGroup selectionMode="multiple" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
  <ButtonGroupItem id="today">Today</ButtonGroupItem>
  <ButtonGroupItem id="tomorrow">Tomorrow</ButtonGroupItem>
  <ButtonGroupItem id="thisweek">This week</ButtonGroupItem>
</ButtonGroup>`,
	},
	{
		id: "all-small",
		title: "All — small",
		description: "All variants at sm size: text, icon + text, dot, icon-only.",
		preview: <AllSmall />,
		code: `<ButtonGroup size="sm" selectedKeys={["archive"]}>...</ButtonGroup>`,
	},
	{
		id: "all",
		title: "All — medium",
		description: "All variants at default md size: text, icon + text, dot, icon-only.",
		preview: <All />,
		code: `<ButtonGroup selectedKeys={["archive"]}>...</ButtonGroup>`,
	},
];

export default function ButtonGroupPage() {
	return (
		<ComponentDocLayout
			name="ButtonGroup"
			tagline="Segmented toggle button group built on React Aria. Supports single and multiple selection, icon-only, icon + text, and dot leading variants."
			install={{
				usage: `import { ButtonGroup, ButtonGroupItem } from "@mvp-ui/ui";`,
			}}
			sections={SECTIONS}
			tokenReference={[
				{ label: "Button bg", value: "bg-bg" },
				{ label: "Button ring", value: "ring-1 ring-border" },
				{ label: "Hover bg", value: "bg-bg-secondary" },
				{ label: "Selected bg", value: "bg-bg-secondary" },
				{ label: "Size sm", value: "px-3.5 py-2 text-sm" },
				{ label: "Size md", value: "px-4 py-2.5 text-sm" },
				{ label: "Size lg", value: "px-4.5 py-2.5 text-sm" },
			]}
		/>
	);
}
