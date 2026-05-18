"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/toggle/toggle.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { ReactNode } from "react";
import type { SwitchProps as AriaSwitchProps } from "react-aria-components";
import { Switch as AriaSwitch } from "react-aria-components";
import { cn } from "../lib/cn.js";

/* ==========================================================================
   Toggle (Switch) — wraps react-aria Switch with Untitled UI visual design.
   Token mapping (Untitled UI → MVP UI):
   - bg-tertiary              → bg-bg-tertiary   (idle track)
   - ring-secondary           → ring-border-secondary (subtle track ring)
   - bg-brand-solid           → bg-primary        (selected track)
   - bg-brand-solid_hover     → bg-primary-hover  (selected + hovered track)
   - text-fg-white            → text-primary-fg   (thumb color on brand)
   - text-secondary           → text-fg-secondary
   - text-tertiary            → text-fg-tertiary
   - outline-focus-ring       → outline-ring
   - toggle-border (slim)     → border-border     (neutral-300 light / gray-700 dark)
   - toggle-slim-border_pressed → border-primary  (dark-ok: brand action fill)
   - toggle-slim-border_pressed-hover → border-primary-hover (dark-ok)
   ========================================================================== */

interface ToggleBaseProps {
	size?: "sm" | "md";
	slim?: boolean | undefined;
	className?: string;
	isHovered?: boolean;
	isFocusVisible?: boolean;
	isSelected?: boolean;
	isDisabled?: boolean;
}

export const ToggleBase = ({
	className,
	isHovered,
	isDisabled,
	isFocusVisible,
	isSelected,
	slim,
	size = "sm",
}: ToggleBaseProps) => {
	const styles = {
		default: {
			sm: {
				root: "h-5 w-9 p-0.5",
				switch: cn("size-4", isSelected && "translate-x-4"),
			},
			md: {
				root: "h-6 w-11 p-0.5",
				switch: cn("size-5", isSelected && "translate-x-5"),
			},
		},
		slim: {
			sm: {
				root: "h-4 w-8",
				switch: cn("size-4", isSelected && "translate-x-4"),
			},
			md: {
				root: "h-5 w-10",
				switch: cn("size-5", isSelected && "translate-x-5"),
			},
		},
	};

	const classes = slim ? styles.slim[size] : styles.default[size];

	return (
		<div
			className={cn(
				"cursor-pointer rounded-full bg-bg-tertiary ring-[0.5px] ring-border-secondary outline-ring transition duration-150 ease-linear ring-inset",
				isSelected && "bg-primary", // dark-ok: brand action fill
				isSelected && isHovered && "bg-primary-hover", // dark-ok: brand action fill hover
				isDisabled && "cursor-not-allowed opacity-50",
				isFocusVisible && "outline-2 outline-offset-2",
				slim && "ring-1",
				slim && isSelected && "ring-transparent",
				classes.root,
				className,
			)}
		>
			<div
				style={{
					transition:
						"transform 0.15s ease-in-out, translate 0.15s ease-in-out, border-color 0.1s linear, background-color 0.1s linear",
				}}
				className={cn(
					"rounded-full bg-primary-fg shadow-sm",
					slim && "shadow-xs",
					slim && "border border-border", // toggle-border: neutral-300 light / gray-700 dark
					slim &&
						isSelected &&
						"border-primary", // dark-ok: toggle-slim-border_pressed (brand fill, mode-independent action)
					slim &&
						isSelected &&
						isHovered &&
						"border-primary-hover", // dark-ok: toggle-slim-border_pressed-hover
					classes.switch,
				)}
			/>
		</div>
	);
};
ToggleBase.displayName = "ToggleBase";

const labelSizes = {
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

export interface ToggleProps extends AriaSwitchProps {
	size?: "sm" | "md";
	label?: string;
	hint?: ReactNode;
	slim?: boolean;
}

export const Toggle = ({
	label,
	hint,
	className,
	size = "sm",
	slim,
	...ariaSwitchProps
}: ToggleProps) => {
	return (
		<AriaSwitch
			{...ariaSwitchProps}
			className={(state) =>
				cn(
					"relative flex w-max items-start",
					state.isDisabled && "cursor-not-allowed",
					labelSizes[size].root,
					typeof className === "function" ? className(state) : className,
				)
			}
		>
			{({ isSelected, isDisabled, isFocusVisible, isHovered }) => (
				<>
					<ToggleBase
						slim={slim}
						size={size}
						isHovered={isHovered}
						isDisabled={isDisabled}
						isFocusVisible={isFocusVisible}
						isSelected={isSelected}
						className={slim ? "mt-0.5" : ""}
					/>
					{(label || hint) && (
						<div
							className={cn("flex flex-col", labelSizes[size].textWrapper)}
						>
							{label && (
								<p
									className={cn(
										"select-none text-fg-secondary",
										labelSizes[size].label,
									)}
								>
									{label}
								</p>
							)}
							{hint && (
								<span
									className={cn("text-fg-tertiary", labelSizes[size].hint)}
									onClick={(event) => event.stopPropagation()}
								>
									{hint}
								</span>
							)}
						</div>
					)}
				</>
			)}
		</AriaSwitch>
	);
};
Toggle.displayName = "Toggle";
