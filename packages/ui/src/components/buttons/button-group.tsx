"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/button-group/button-group.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	createContext,
	type FC,
	isValidElement,
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
import { cn } from "../../lib/cn.js";

/* ==========================================================================
   Token mapping (Untitled UI → MVP UI):
   - bg-primary (surface)       → bg-bg
   - bg-primary_hover           → bg-bg-secondary
   - ring-primary (inset)       → ring-border
   - text-secondary             → text-fg-secondary
   - text-secondary_hover       → text-fg
   - shadow-skeuomorphic        → shadow-xs
   - fg-quaternary              → text-fg-tertiary
   - fg-quaternary_hover        → text-fg-secondary
   - outline-brand              → outline-ring
   ========================================================================== */

type ButtonSize = "sm" | "md" | "lg";

const buttonGroupSizes = {
	sm: {
		root: cn(
			"gap-1.5 px-3.5 py-2 text-sm",
			"not-last:pr-[calc(calc(var(--spacing)*3.5)+1px)]",
			"first:rounded-l-lg last:rounded-r-lg",
			"data-[icon-only=true]:px-2.5",
			"data-[icon-leading=true]:pl-3",
		),
		icon: "size-5",
	},
	md: {
		root: cn(
			"gap-1.5 px-4 py-2.5 text-sm",
			"not-last:pr-[calc(calc(var(--spacing)*4)+1px)]",
			"first:rounded-l-lg last:rounded-r-lg",
			"data-[icon-only=true]:px-3",
			"data-[icon-leading=true]:pl-3.5",
		),
		icon: "size-5",
	},
	lg: {
		root: cn(
			"gap-2 px-4.5 py-2.5 text-sm",
			"not-last:pr-[calc(calc(var(--spacing)*4.5)+1px)]",
			"first:rounded-l-lg last:rounded-r-lg",
			"data-[icon-only=true]:px-3.5",
			"data-[icon-leading=true]:pl-4",
		),
		icon: "size-5",
	},
};

const buttonGroupCommon = {
	root: cn(
		"group/button-group inline-flex h-max cursor-pointer items-center bg-bg font-semibold whitespace-nowrap text-fg-secondary shadow-xs ring-1 ring-border outline-ring transition duration-100 ease-linear ring-inset",
		// Hover and focus styles
		"hover:bg-bg-secondary hover:text-fg focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
		// Disabled styles
		"disabled:cursor-not-allowed disabled:text-fg-secondary/50 disabled:*:opacity-50",
		// Selected styles
		"selected:bg-bg-secondary selected:text-fg",
	),
	icon: "pointer-events-none text-fg-tertiary transition-[inherit] group-hover/button-group:text-fg-secondary group-selected/button-group:text-fg-secondary",
};

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

const ButtonGroupContext = createContext<{ size: ButtonSize }>({ size: "md" });

/* -------------------------------------------------------------------------- */
/*  ButtonGroupItem                                                            */
/* -------------------------------------------------------------------------- */

export interface ButtonGroupItemProps
	extends ToggleButtonProps,
		RefAttributes<HTMLButtonElement> {
	iconLeading?: FC<{ className?: string }> | ReactNode;
	iconTrailing?: FC<{ className?: string }> | ReactNode;
	onClick?: () => void;
	className?: string;
}

export const ButtonGroupItem = ({
	iconLeading: IconLeading,
	iconTrailing: IconTrailing,
	children,
	className,
	...otherProps
}: PropsWithChildren<ButtonGroupItemProps>) => {
	const context = useContext(ButtonGroupContext);

	if (!context) {
		throw new Error("ButtonGroupItem must be used within a ButtonGroup component");
	}

	const { size } = context;
	const isIcon = (IconLeading || IconTrailing) && !children;

	return (
		<AriaToggleButton
			{...otherProps}
			data-icon-only={isIcon ? true : undefined}
			data-icon-leading={IconLeading ? true : undefined}
			className={cn(
				buttonGroupCommon.root,
				buttonGroupSizes[size].root,
				className,
			)}
		>
			{typeof IconLeading === "function" ? (
				<IconLeading
					className={cn(
						buttonGroupCommon.icon,
						buttonGroupSizes[size].icon,
					)}
				/>
			) : isValidElement(IconLeading) ? (
				IconLeading
			) : null}

			{children}

			{typeof IconTrailing === "function" ? (
				<IconTrailing
					className={cn(
						buttonGroupCommon.icon,
						buttonGroupSizes[size].icon,
					)}
				/>
			) : isValidElement(IconTrailing) ? (
				IconTrailing
			) : null}
		</AriaToggleButton>
	);
};
ButtonGroupItem.displayName = "ButtonGroupItem";

/* -------------------------------------------------------------------------- */
/*  ButtonGroup                                                                */
/* -------------------------------------------------------------------------- */

export interface ButtonGroupProps
	extends Omit<ToggleButtonGroupProps, "orientation">,
		RefAttributes<HTMLDivElement> {
	size?: ButtonSize;
	className?: string;
}

export const ButtonGroup = ({
	children,
	size = "md",
	className,
	...otherProps
}: ButtonGroupProps) => {
	return (
		<ButtonGroupContext.Provider value={{ size }}>
			<AriaToggleButtonGroup
				selectionMode="single"
				className={cn(
					"relative z-0 inline-flex w-max -space-x-px rounded-lg shadow-xs",
					className,
				)}
				{...otherProps}
			>
				{children}
			</AriaToggleButtonGroup>
		</ButtonGroupContext.Provider>
	);
};
ButtonGroup.displayName = "ButtonGroup";
