"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { ComponentDocLayout, type DocExample } from "../../../_components/docs/ComponentDocLayout";
import {
	BrandVariant,
	DisabledItem,
	SmallSize,
	SurfaceVariant,
	ThreeOptions,
} from "./SegmentedExamples";

const SECTIONS: DocExample[] = [
	{
		id: "surface",
		title: "Surface (mặc định)",
		description: "Ô được chọn nổi lên trên track xám — kiểu iOS. Trạng thái active rõ.",
		preview: <SurfaceVariant />,
		code: `<Segmented selectedKeys={keys} onSelectionChange={setKeys}>
  <SegmentedItem id="light">Sáng</SegmentedItem>
  <SegmentedItem id="dark">Tối</SegmentedItem>
</Segmented>`,
	},
	{
		id: "brand",
		title: "Brand",
		description: "Ô active dùng nền màu thương hiệu (bg-primary) — nổi bật nhất.",
		preview: <BrandVariant />,
		code: `<Segmented variant="brand" selectedKeys={keys} onSelectionChange={setKeys}>
  <SegmentedItem id="light">Sáng</SegmentedItem>
  <SegmentedItem id="dark">Tối</SegmentedItem>
</Segmented>`,
	},
	{
		id: "three",
		title: "Nhiều lựa chọn",
		description: "Ba phân đoạn trở lên — single-select, không bỏ chọn hết.",
		preview: <ThreeOptions />,
		code: `<Segmented selectedKeys={keys} onSelectionChange={setKeys}>
  <SegmentedItem id="day">Ngày</SegmentedItem>
  <SegmentedItem id="week">Tuần</SegmentedItem>
  <SegmentedItem id="month">Tháng</SegmentedItem>
</Segmented>`,
	},
	{
		id: "size-sm",
		title: "Size sm",
		description: "Kích thước nhỏ gọn cho thanh công cụ.",
		preview: <SmallSize />,
		code: `<Segmented size="sm" selectedKeys={keys} onSelectionChange={setKeys}>
  <SegmentedItem id="list">List</SegmentedItem>
  <SegmentedItem id="grid">Grid</SegmentedItem>
</Segmented>`,
	},
	{
		id: "disabled",
		title: "Disabled item",
		description: "Một phân đoạn bị vô hiệu hoá.",
		preview: <DisabledItem />,
		code: `<Segmented selectedKeys={keys} onSelectionChange={setKeys}>
  <SegmentedItem id="on">Bật</SegmentedItem>
  <SegmentedItem id="off">Tắt</SegmentedItem>
  <SegmentedItem id="auto" isDisabled>Auto</SegmentedItem>
</Segmented>`,
	},
];

export default function SegmentedPage() {
	return (
		<ComponentDocLayout
			name="Segmented"
			tagline="Segmented control single-select trên React Aria. Trạng thái active rõ (khác ButtonGroup) qua 2 variant: surface (ô nổi) và brand (nền thương hiệu)."
			install={{
				usage: `import { Segmented, SegmentedItem } from "@mvp-ui/ui";`,
			}}
			sections={SECTIONS}
			tokenReference={[
				{ label: "Track bg", value: "bg-bg-secondary" },
				{ label: "Active (surface)", value: "bg-bg + shadow-xs" },
				{ label: "Active (brand)", value: "bg-primary + text-primary-fg" },
				{ label: "Idle text", value: "text-fg-secondary" },
				{ label: "Size sm", value: "px-2.5 py-1 text-[13px]" },
				{ label: "Size md", value: "px-3.5 py-1.5 text-sm" },
			]}
		/>
	);
}
