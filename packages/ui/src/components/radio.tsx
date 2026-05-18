"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/radio-buttons/radio-buttons.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	type ReactNode,
	type Ref,
	createContext,
	useContext,
} from "react";
import {
	Radio as AriaRadio,
	RadioGroup as AriaRadioGroup,
	type RadioGroupProps as AriaRadioGroupProps,
	type RadioProps as AriaRadioProps,
} from "react-aria-components";
import { cn } from "../lib/cn.js";

/* ==========================================================================
   RadioButton / RadioGroup — wraps react-aria with Untitled UI visual design.
   Token mapping (Untitled UI → MVP UI):
   - bg-primary (surface)     → bg-bg
   - ring-primary (inset)     → ring-border
   - bg-tertiary              → bg-bg-tertiary
   - bg-brand-solid           → bg-primary
   - ring-brand-solid         → ring-primary
   - text-fg-white            → text-primary-fg
   - text-secondary           → text-fg-secondary
   - text-tertiary            → text-fg-tertiary
   - outline-focus-ring       → outline-ring
   ========================================================================== */

export interface RadioGroupContextType {
	size?: "sm" | "md";
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export interface RadioButtonBaseProps {
	size?: "sm" | "md";
	className?: string;
	isFocusVisible?: boolean;
	isSelected?: boolean;
	isDisabled?: boolean;
}

export const RadioButtonBase = ({
	className,
	isFocusVisible,
	isSelected,
	isDisabled,
	size = "sm",
}: RadioButtonBaseProps) => {
	return (
		<div
			className={cn(
				"flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full bg-bg ring-1 ring-border ring-inset",
				size === "md" && "size-5",
				isSelected && "bg-primary ring-primary",
				isDisabled && "cursor-not-allowed opacity-50",
				isDisabled && !isSelected && "bg-bg-tertiary",
				isFocusVisible && "outline-2 outline-offset-2 outline-ring",
				className,
			)}
		>
			<div
				className={cn(
					"size-1.5 rounded-full bg-primary-fg opacity-0 transition-all",
					size === "md" && "size-2",
					isSelected && "opacity-100",
				)}
			/>
		</div>
	);
};
RadioButtonBase.displayName = "RadioButtonBase";

const sizes = {
	sm: {
		root: "gap-2",
		textWrapper: "",
		label: "text-sm font-medium",
		hint: "text-sm",
	},
	md: {
		root: "gap-3",
		textWrapper: "gap-0.5",
		label: "text-md font-medium",
		hint: "text-md",
	},
};

export interface RadioButtonProps extends AriaRadioProps {
	size?: "sm" | "md";
	label?: ReactNode;
	hint?: ReactNode;
	ref?: Ref<HTMLLabelElement>;
}

export const RadioButton = ({
	label,
	hint,
	className,
	size = "sm",
	...ariaRadioProps
}: RadioButtonProps) => {
	const context = useContext(RadioGroupContext);
	const resolvedSize = context?.size ?? size;

	return (
		<AriaRadio
			{...ariaRadioProps}
			className={(state) =>
				cn(
					"relative flex items-start",
					state.isDisabled && "cursor-not-allowed",
					sizes[resolvedSize].root,
					typeof className === "function" ? className(state) : className,
				)
			}
		>
			{({ isSelected, isDisabled, isFocusVisible }) => (
				<>
					<RadioButtonBase
						size={resolvedSize}
						isSelected={isSelected}
						isDisabled={isDisabled}
						isFocusVisible={isFocusVisible}
						className={label || hint ? "mt-0.5" : ""}
					/>
					{(label || hint) && (
						<div
							className={cn(
								"inline-flex flex-col",
								sizes[resolvedSize].textWrapper,
							)}
						>
							{label && (
								<p
									className={cn(
										"select-none text-fg-secondary",
										sizes[resolvedSize].label,
									)}
								>
									{label}
								</p>
							)}
							{hint && (
								<span
									className={cn(
										"text-fg-tertiary",
										sizes[resolvedSize].hint,
									)}
									onClick={(event) => event.stopPropagation()}
								>
									{hint}
								</span>
							)}
						</div>
					)}
				</>
			)}
		</AriaRadio>
	);
};
RadioButton.displayName = "RadioButton";

export interface RadioGroupProps
	extends RadioGroupContextType,
		AriaRadioGroupProps {
	children: ReactNode;
	className?: string;
}

export const RadioGroup = ({
	children,
	className,
	size = "sm",
	...props
}: RadioGroupProps) => {
	return (
		<RadioGroupContext.Provider value={{ size }}>
			<AriaRadioGroup
				{...props}
				className={cn("flex flex-col gap-4", className)}
			>
				{children}
			</AriaRadioGroup>
		</RadioGroupContext.Provider>
	);
};
RadioGroup.displayName = "RadioGroup";
