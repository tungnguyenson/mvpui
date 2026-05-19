/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/select/combobox.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import {
	createContext,
	type FC,
	isValidElement,
	type ReactNode,
	useCallback,
	useContext,
	useRef,
	useState,
} from "react";
import {
	ComboBox as AriaComboBox,
	type ComboBoxProps as AriaComboBoxProps,
	ComboBoxStateContext,
	Group as AriaGroup,
	Input as AriaInput,
	ListBox as AriaListBox,
	type ListBoxProps as AriaListBoxProps,
	Popover as AriaPopover,
} from "react-aria-components";
import { cn } from "../lib/cn.js";
import { HintText } from "./inputs/hint-text.js";
import { Label } from "./inputs/label.js";
import { type SelectItemType } from "./select.js";

/* -------------------------------------------------------------------------- */
/*  Shared context & sizes                                                     */
/* -------------------------------------------------------------------------- */

export const ComboBoxContext = createContext<{ size: "sm" | "md" | "lg" }>({
	size: "md",
});

const comboSizes = {
	sm: {
		root: "py-2 pl-3 pr-2.5 gap-2 *:data-[icon]:size-4",
		text: "text-sm",
	},
	md: { root: "py-2 px-3 gap-2 *:data-[icon]:size-5", text: "text-sm" },
	lg: { root: "py-2.5 px-3.5 gap-2 *:data-[icon]:size-5", text: "text-sm" },
};

/* -------------------------------------------------------------------------- */
/*  Icon helpers                                                               */
/* -------------------------------------------------------------------------- */

function isReactComponent<P = Record<string, unknown>>(
	value: unknown,
): value is FC<P> {
	return typeof value === "function";
}

function SearchIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<circle cx="11" cy="11" r="8" />
			<path d="M21 21l-4.35-4.35" />
		</svg>
	);
}

/* -------------------------------------------------------------------------- */
/*  ComboBoxTrigger — the styled input group                                  */
/* -------------------------------------------------------------------------- */

interface ComboBoxTriggerProps {
	size: "sm" | "md" | "lg";
	placeholder?: string;
	icon?: FC<{ className?: string }> | ReactNode;
	shortcut?: boolean;
}

const ComboBoxTrigger = ({ size, placeholder, icon: IconProp, shortcut }: ComboBoxTriggerProps) => {
	const s = comboSizes[size];

	return (
		<AriaGroup
			className={({ isFocusWithin, isDisabled }) =>
				cn(
					"relative flex w-full items-center gap-2 rounded-lg bg-bg shadow-xs ring-1 ring-border outline-hidden transition-shadow duration-100 ring-inset",
					isFocusWithin && "ring-2 ring-border-brand",
					isDisabled && "cursor-not-allowed opacity-50",
					s.root,
				)
			}
		>
			{isReactComponent(IconProp) ? (
				<IconProp className="pointer-events-none shrink-0 text-fg-tertiary" aria-hidden="true" />
			) : isValidElement(IconProp) ? (
				IconProp
			) : (
				<SearchIcon className="pointer-events-none size-4 shrink-0 text-fg-tertiary" />
			)}

			<AriaInput
				{...(placeholder !== undefined && { placeholder })}
				className={cn(
					"min-w-0 flex-1 appearance-none bg-transparent text-fg caret-fg placeholder:text-fg-tertiary outline-hidden disabled:cursor-not-allowed",
					s.text,
				)}
			/>

			{shortcut && (
				<kbd
					className="pointer-events-none hidden shrink-0 rounded px-1 py-px text-xs font-medium text-fg-tertiary ring-1 ring-border select-none md:block"
					aria-hidden="true"
				>
					⌘K
				</kbd>
			)}
		</AriaGroup>
	);
};

/* -------------------------------------------------------------------------- */
/*  ComboBox                                                                   */
/* -------------------------------------------------------------------------- */

export interface ComboBoxProps
	extends Omit<AriaComboBoxProps<SelectItemType>, "children" | "items">,
		Pick<AriaListBoxProps<SelectItemType>, "items"> {
	/** Helper text displayed below the input. */
	hint?: string;
	/** Field label displayed above the input. */
	label?: string;
	/** Tooltip text for the help icon next to the label. */
	tooltip?: string;
	/** Field size. @default "md" */
	size?: "sm" | "md" | "lg";
	/** Placeholder text. @default "Search" */
	placeholder?: string;
	/** Show ⌘K shortcut hint. @default false */
	shortcut?: boolean;
	/** Leading icon. Defaults to SearchIcon. */
	icon?: FC<{ className?: string }> | ReactNode;
	/** Whether to hide the required indicator. */
	hideRequiredIndicator?: boolean;
	/** Additional className for the popover. */
	popoverClassName?: string;
	/** Children (ListBox items). */
	children: AriaListBoxProps<SelectItemType>["children"];
}

export const ComboBox = ({
	size = "md",
	placeholder = "Search",
	shortcut = false,
	icon,
	hint,
	label,
	tooltip,
	hideRequiredIndicator,
	popoverClassName,
	items,
	children,
	...props
}: ComboBoxProps) => {
	const triggerRef = useRef<HTMLDivElement>(null);
	const [popoverWidth, setPopoverWidth] = useState("");

	const onResize = useCallback(() => {
		if (!triggerRef.current) return;
		setPopoverWidth(`${triggerRef.current.getBoundingClientRect().width}px`);
	}, []);

	return (
		<ComboBoxContext.Provider value={{ size }}>
			<AriaComboBox menuTrigger="focus" {...props}>
				{(state) => (
					<div className="flex flex-col gap-1.5">
						{label && (
							<Label
								isRequired={hideRequiredIndicator ? false : state.isRequired}
								isInvalid={state.isInvalid}
								tooltip={tooltip}
							>
								{label}
							</Label>
						)}

						<div ref={triggerRef} onPointerEnter={onResize} onFocus={onResize}>
							<ComboBoxTrigger
								size={size}
								placeholder={placeholder}
								icon={icon}
								shortcut={shortcut}
							/>
						</div>

						<AriaPopover
							placement="bottom"
							containerPadding={0}
							offset={4}
							style={{ width: popoverWidth || undefined }}
							className={(popState) =>
								cn(
									"w-(--trigger-width) origin-(--trigger-anchor-point) overflow-x-hidden overflow-y-auto rounded-lg bg-bg py-1 shadow-lg ring-1 ring-border-secondary outline-hidden will-change-transform",
									popState.isEntering &&
										"duration-150 ease-out animate-in fade-in placement-bottom:slide-in-from-top-0.5 placement-top:slide-in-from-bottom-0.5",
									popState.isExiting &&
										"duration-100 ease-in animate-out fade-out placement-bottom:slide-out-to-top-0.5 placement-top:slide-out-to-bottom-0.5",
									size === "sm" && "max-h-56!",
									size === "md" && "max-h-64!",
									size === "lg" && "max-h-80!",
									popoverClassName,
								)
							}
						>
							<AriaListBox {...(items !== undefined && { items })} className="size-full outline-hidden">
								{children}
							</AriaListBox>
						</AriaPopover>

						{hint && (
							<HintText isInvalid={state.isInvalid} size={size === "sm" ? "sm" : "md"}>
								{hint}
							</HintText>
						)}
					</div>
				)}
			</AriaComboBox>
		</ComboBoxContext.Provider>
	);
};

ComboBox.displayName = "ComboBox";
