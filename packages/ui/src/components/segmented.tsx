"use client";

/**
 * Segmented control — wraps react-aria ToggleButtonGroup (single-select).
 * Pattern adapted from Untitled UI button group + shadcn segmented control.
 * Khác ButtonGroup ở chỗ active hiển thị RÕ: ô được chọn nổi lên (variant
 * "surface") hoặc nền brand (variant "brand").
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	createContext,
	type PropsWithChildren,
	type ReactNode,
	type RefAttributes,
	useContext,
} from "react";
import {
	ToggleButton as AriaToggleButton,
	ToggleButtonGroup as AriaToggleButtonGroup,
	type ToggleButtonGroupProps,
	type ToggleButtonProps,
} from "react-aria-components";
import { cn } from "../lib/cn.js";

type SegmentedSize = "sm" | "md";
type SegmentedVariant = "surface" | "brand";

const segmentedSizes: Record<SegmentedSize, string> = {
	sm: "px-2.5 py-1 text-[13px] rounded-[7px]",
	md: "px-3.5 py-1.5 text-sm rounded-md",
};

const segmentedVariants: Record<SegmentedVariant, string> = {
	// Ô active = bề mặt nổi lên (kiểu iOS) trên track xám. Shadow + ring để pill
	// trắng tách rõ khỏi track dù tương phản bg-bg vs bg-bg-secondary thấp.
	surface:
		"data-selected:bg-bg data-selected:text-fg data-selected:shadow-sm data-selected:ring-1 data-selected:ring-border-secondary",
	// Ô active = nền màu thương hiệu (rõ nhất).
	brand: "data-selected:bg-primary data-selected:text-primary-fg data-selected:shadow-xs",
};

const segmentedItemBase = cn(
	"inline-flex cursor-pointer items-center justify-center gap-1.5 font-medium whitespace-nowrap",
	"text-fg-secondary outline-ring transition-colors duration-100 ease-linear",
	"hover:text-fg focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-1",
	"data-disabled:cursor-not-allowed data-disabled:text-fg-secondary/50"
);

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

const SegmentedContext = createContext<{ size: SegmentedSize; variant: SegmentedVariant }>({
	size: "md",
	variant: "surface",
});

/* -------------------------------------------------------------------------- */
/*  SegmentedItem                                                              */
/* -------------------------------------------------------------------------- */

export interface SegmentedItemProps extends ToggleButtonProps, RefAttributes<HTMLButtonElement> {
	className?: string;
}

export const SegmentedItem = ({
	children,
	className,
	...otherProps
}: PropsWithChildren<SegmentedItemProps>) => {
	const { size, variant } = useContext(SegmentedContext);
	return (
		<AriaToggleButton
			{...otherProps}
			className={cn(segmentedItemBase, segmentedSizes[size], segmentedVariants[variant], className)}
		>
			{children}
		</AriaToggleButton>
	);
};
SegmentedItem.displayName = "SegmentedItem";

/* -------------------------------------------------------------------------- */
/*  Segmented                                                                  */
/* -------------------------------------------------------------------------- */

export interface SegmentedProps
	extends Omit<ToggleButtonGroupProps, "orientation" | "selectionMode">,
		RefAttributes<HTMLDivElement> {
	size?: SegmentedSize;
	variant?: SegmentedVariant;
	className?: string;
}

export const Segmented = ({
	children,
	size = "md",
	variant = "surface",
	className,
	...otherProps
}: SegmentedProps) => {
	return (
		<SegmentedContext.Provider value={{ size, variant }}>
			<AriaToggleButtonGroup
				selectionMode="single"
				disallowEmptySelection
				className={cn(
					"inline-flex w-max items-center gap-0.5 rounded-lg bg-bg-secondary p-0.5",
					className
				)}
				{...otherProps}
			>
				{children}
			</AriaToggleButtonGroup>
		</SegmentedContext.Provider>
	);
};
Segmented.displayName = "Segmented";

export type { SegmentedSize, SegmentedVariant };
