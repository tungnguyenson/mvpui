"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Segmented, SegmentedItem } from "@mvp-ui/ui";
import { useState } from "react";

type Key = string | number;

export function SurfaceVariant() {
	const [keys, setKeys] = useState<Set<Key>>(new Set(["light"]));
	return (
		<Segmented selectedKeys={keys} onSelectionChange={setKeys} aria-label="Giao diện">
			<SegmentedItem id="light">Sáng</SegmentedItem>
			<SegmentedItem id="dark">Tối</SegmentedItem>
		</Segmented>
	);
}

export function BrandVariant() {
	const [keys, setKeys] = useState<Set<Key>>(new Set(["dark"]));
	return (
		<Segmented
			variant="brand"
			selectedKeys={keys}
			onSelectionChange={setKeys}
			aria-label="Giao diện"
		>
			<SegmentedItem id="light">Sáng</SegmentedItem>
			<SegmentedItem id="dark">Tối</SegmentedItem>
		</Segmented>
	);
}

export function ThreeOptions() {
	const [keys, setKeys] = useState<Set<Key>>(new Set(["week"]));
	return (
		<Segmented selectedKeys={keys} onSelectionChange={setKeys} aria-label="Khoảng thời gian">
			<SegmentedItem id="day">Ngày</SegmentedItem>
			<SegmentedItem id="week">Tuần</SegmentedItem>
			<SegmentedItem id="month">Tháng</SegmentedItem>
		</Segmented>
	);
}

export function SmallSize() {
	const [keys, setKeys] = useState<Set<Key>>(new Set(["list"]));
	return (
		<Segmented size="sm" selectedKeys={keys} onSelectionChange={setKeys} aria-label="Chế độ xem">
			<SegmentedItem id="list">List</SegmentedItem>
			<SegmentedItem id="grid">Grid</SegmentedItem>
		</Segmented>
	);
}

export function DisabledItem() {
	const [keys, setKeys] = useState<Set<Key>>(new Set(["on"]));
	return (
		<Segmented selectedKeys={keys} onSelectionChange={setKeys} aria-label="Trạng thái">
			<SegmentedItem id="on">Bật</SegmentedItem>
			<SegmentedItem id="off">Tắt</SegmentedItem>
			<SegmentedItem id="auto" isDisabled>
				Auto
			</SegmentedItem>
		</Segmented>
	);
}
