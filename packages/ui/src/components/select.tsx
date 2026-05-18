"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/select/select.tsx
 *        components/base/select/select-shared.tsx
 *        components/base/select/select-item.tsx
 *        components/base/select/popover.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	createContext,
	type FC,
	isValidElement,
	type ReactNode,
	type Ref,
	useContext,
} from "react";
import {
	Button as AriaButton,
	ListBox as AriaListBox,
	ListBoxItem as AriaListBoxItem,
	type ListBoxItemProps as AriaListBoxItemProps,
	Popover as AriaPopover,
	type PopoverProps as AriaPopoverProps,
	Select as AriaSelect,
	type SelectProps as AriaSelectProps,
	SelectValue as AriaSelectValue,
	Text as AriaText,
} from "react-aria-components";
import { cn } from "../lib/cn.js";
import { Avatar } from "./avatars/avatar.js";
import { CheckboxBase } from "./checkbox.js";
import { HintText } from "./inputs/hint-text.js";
import { Label } from "./inputs/label.js";

/* ==========================================================================
   Token mapping (Untitled UI → MVP UI):
   - bg-primary (surface)       → bg-bg
   - ring-primary               → ring-border
   - ring-secondary_alt         → ring-border-secondary
   - bg-primary_hover           → bg-bg-secondary
   - text-primary               → text-fg
   - text-secondary             → text-fg-secondary
   - text-tertiary              → text-fg-tertiary
   - text-quaternary / fg-quaternary → text-fg-tertiary
   - text-placeholder           → text-fg-tertiary (placeholder)
   - bg-brand-solid / ring-brand → use ring-brand-500/22 alpha or bg-primary
   - outline-focus-ring         → outline-ring
   - fg-brand-primary           → text-fg-brand
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/*  Shared types & context                                                     */
/* -------------------------------------------------------------------------- */

export type SelectItemType = {
	/** Unique identifier for the item. */
	id: string | number;
	/** The primary display text. */
	label?: string;
	/** Avatar image URL. */
	avatarUrl?: string;
	/** Whether the item is disabled. */
	isDisabled?: boolean;
	/** Secondary text displayed alongside the label. */
	supportingText?: string;
	/** Leading icon component or element. */
	icon?: FC<{ className?: string }> | ReactNode;
};

export interface SelectCommonProps {
	/** Helper text displayed below the input. */
	hint?: string;
	/** Field label displayed above the input. */
	label?: string;
	/** Tooltip text for the help icon next to the label. */
	tooltip?: string;
	/**
	 * The size of the component.
	 * @default "md"
	 */
	size?: "sm" | "md" | "lg";
	/** Placeholder text when no value is selected. */
	placeholder?: string;
	/** Whether to hide the required indicator from the label. */
	hideRequiredIndicator?: boolean;
}

const selectSizes = {
	sm: {
		root: "py-2 pl-3 pr-2.5 gap-2",
		iconSize: "*:data-[icon]:size-4 *:data-[icon]:stroke-[2.25px]",
		withIcon: "",
		text: "text-sm",
		textContainer: "gap-x-1.5",
	},
	md: {
		root: "py-2 px-3 gap-2",
		iconSize: "*:data-[icon]:size-5",
		withIcon: "",
		text: "text-sm",
		textContainer: "gap-x-1.5",
	},
	lg: {
		root: "py-2.5 px-3.5 gap-2",
		iconSize: "*:data-[icon]:size-5",
		withIcon: "",
		text: "text-sm",
		textContainer: "gap-x-1.5",
	},
};

const SelectContext = createContext<{ size: "sm" | "md" | "lg" }>({
	size: "md",
});

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function isReactComponent<P = Record<string, unknown>>(
	value: unknown,
): value is FC<P> {
	return typeof value === "function";
}

function ChevronDownIcon({ className }: { className?: string }) {
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
			<path d="M6 9l6 6 6-6" />
		</svg>
	);
}

function CheckIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.25"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<path d="M20 6L9 17l-5-5" />
		</svg>
	);
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
/*  SelectPopover                                                              */
/* -------------------------------------------------------------------------- */

interface SelectPopoverProps extends AriaPopoverProps {
	size: "sm" | "md" | "lg";
}

const SelectPopover = ({ size, className, ...props }: SelectPopoverProps) => {
	return (
		<AriaPopover
			placement="bottom"
			containerPadding={0}
			offset={4}
			{...props}
			className={(state) =>
				cn(
					"w-(--trigger-width) origin-(--trigger-anchor-point) overflow-x-hidden overflow-y-auto rounded-lg bg-bg py-1 shadow-lg ring-1 ring-border-secondary outline-hidden will-change-transform",
					state.isEntering &&
						"duration-150 ease-out animate-in fade-in placement-bottom:slide-in-from-top-0.5 placement-top:slide-in-from-bottom-0.5",
					state.isExiting &&
						"duration-100 ease-in animate-out fade-out placement-bottom:slide-out-to-top-0.5 placement-top:slide-out-to-bottom-0.5",
					size === "sm" && "max-h-56!",
					size === "md" && "max-h-64!",
					size === "lg" && "max-h-80!",
					typeof className === "function" ? className(state) : className,
				)
			}
		/>
	);
};

/* -------------------------------------------------------------------------- */
/*  SelectItem                                                                 */
/* -------------------------------------------------------------------------- */

const itemSizes = {
	sm: {
		root: "p-2 pr-2.5 gap-2",
		iconSize: "*:data-[icon]:size-4 *:data-[icon]:stroke-[2.25px]",
		text: "text-sm",
		textContainer: "gap-x-1.5",
		check: "size-4 stroke-[2.25px]",
		checkbox: "sm" as const,
	},
	md: {
		root: "p-2 pr-2.5 gap-2",
		iconSize: "*:data-[icon]:size-5",
		text: "text-sm",
		textContainer: "gap-x-2",
		check: "size-5",
		checkbox: "sm" as const,
	},
	lg: {
		root: "p-2.5 pl-2 gap-2",
		iconSize: "*:data-[icon]:size-5",
		text: "text-sm",
		textContainer: "gap-x-2",
		check: "size-5",
		checkbox: "md" as const,
	},
};

interface SelectItemProps
	extends Omit<AriaListBoxItemProps<SelectItemType>, "id" | "isDisabled">,
		Omit<SelectItemType, "avatarUrl" | "isDisabled" | "supportingText" | "label"> {
	/** Avatar image URL (optional). */
	avatarUrl?: string | undefined;
	/** Whether the item is disabled (optional). */
	isDisabled?: boolean | undefined;
	/** Secondary text displayed alongside the label. */
	supportingText?: string | undefined;
	/** The primary display text (can also be passed as children). */
	label?: string | undefined;
	/** The selection indicator to be displayed on the item. */
	selectionIndicator?: "checkmark" | "checkbox" | "none";
	/** The alignment of the selection indicator. */
	selectionIndicatorAlign?: "left" | "right";
}

export const SelectItem = ({
	label,
	id,
	value,
	avatarUrl,
	supportingText,
	isDisabled,
	icon: Icon,
	className,
	children,
	selectionIndicator = "checkmark",
	selectionIndicatorAlign = "right",
	...props
}: SelectItemProps) => {
	const { size } = useContext(SelectContext);

	const labelOrChildren =
		label || (typeof children === "string" ? children : "");
	const textValue = supportingText
		? `${labelOrChildren} ${supportingText}`
		: labelOrChildren;

	const isLeft = selectionIndicatorAlign === "left";
	const s = itemSizes[size];

	return (
		<AriaListBoxItem
			id={id}
			value={
				value ?? {
					id,
					label: labelOrChildren,
					avatarUrl,
					supportingText,
					isDisabled: isDisabled ?? false,
					icon: Icon,
				}
			}
			textValue={textValue}
			{...(isDisabled !== undefined && { isDisabled })}
			{...props}
			className={(state) =>
				cn(
					"w-full py-px outline-hidden",
					size === "sm" ? "px-1" : "px-1.5",
					typeof className === "function" ? className(state) : className,
				)
			}
		>
			{(state) => (
				<div
					className={cn(
						"flex cursor-pointer items-center rounded-md outline-hidden select-none",
						(state.isFocused ||
							state.isHovered ||
							(state.isSelected && selectionIndicator !== "checkbox")) &&
							"bg-bg-secondary",
						state.isDisabled && "cursor-not-allowed opacity-50",
						state.isFocusVisible && "ring-2 ring-brand-500/22 ring-inset",
						s.root,
						s.iconSize,
					)}
				>
					{isLeft && selectionIndicator === "checkbox" && (
						<CheckboxBase
							size={s.checkbox}
							isSelected={state.isSelected}
							isDisabled={state.isDisabled}
						/>
					)}

					{avatarUrl ? (
						<Avatar
							aria-hidden="true"
							size="xs"
							src={avatarUrl}
							alt={label ?? ""}
							className={cn(size === "sm" && "size-5")}
						/>
					) : isReactComponent(Icon) ? (
						<Icon data-icon aria-hidden="true" />
					) : isValidElement(Icon) ? (
						Icon
					) : null}

					<div
						className={cn(
							"flex w-full min-w-0 flex-1 flex-wrap",
							s.textContainer,
						)}
					>
						<AriaText
							slot="label"
							className={cn(
								"truncate font-medium whitespace-nowrap text-fg",
								s.text,
							)}
						>
							{label ||
								(typeof children === "function" ? children(state) : children)}
						</AriaText>

						{supportingText && (
							<AriaText
								slot="description"
								className={cn("whitespace-nowrap text-fg-tertiary", s.text)}
							>
								{supportingText}
							</AriaText>
						)}
					</div>

					{state.isSelected && selectionIndicator === "checkmark" && (
						<CheckIcon
							className={cn("ml-auto shrink-0 text-fg-brand", s.check)}
						/>
					)}

					{!isLeft && selectionIndicator === "checkbox" && (
						<CheckboxBase
							size={s.checkbox}
							isSelected={state.isSelected}
							isDisabled={state.isDisabled}
							className="ml-auto"
						/>
					)}
				</div>
			)}
		</AriaListBoxItem>
	);
};
SelectItem.displayName = "SelectItem";

/* -------------------------------------------------------------------------- */
/*  SelectValue (trigger button interior)                                      */
/* -------------------------------------------------------------------------- */

interface SelectValueProps {
	isOpen: boolean;
	size: "sm" | "md" | "lg";
	isFocused: boolean;
	isDisabled: boolean;
	placeholder?: string;
	ref?: Ref<HTMLButtonElement>;
	icon?: FC<{ className?: string }> | ReactNode;
}

const SelectValueButton = ({
	isOpen,
	isFocused,
	isDisabled,
	size,
	placeholder,
	icon,
	ref,
}: SelectValueProps) => {
	const s = selectSizes[size];
	return (
		<AriaButton
			ref={ref}
			className={cn(
				"relative flex w-full cursor-pointer items-center rounded-lg bg-bg shadow-xs ring-1 ring-border outline-hidden transition duration-100 ease-linear ring-inset",
				(isFocused || isOpen) && "ring-2 ring-brand-500/22",
				isDisabled && "cursor-not-allowed opacity-50",
			)}
		>
			<AriaSelectValue<SelectItemType>
				className={(state) =>
					cn(
						"flex h-max w-full items-center justify-start truncate text-left align-middle",
						s.root,
						s.iconSize,
					)
				}
			>
				{(state) => {
					const selectedItem = state.selectedItems[0];
					const Icon = selectedItem?.icon || icon;

					return (
						<>
							{selectedItem?.avatarUrl ? (
								<Avatar
									size="xs"
									src={selectedItem.avatarUrl}
									alt={selectedItem.label ?? ""}
									className={cn(size === "sm" && "size-5")}
								/>
							) : isReactComponent(Icon) ? (
								<Icon data-icon aria-hidden="true" />
							) : isValidElement(Icon) ? (
								Icon
							) : null}

							{selectedItem ? (
								<section
									className={cn(
										"flex w-full truncate",
										s.textContainer,
									)}
								>
									<p
										className={cn("truncate font-medium text-fg", s.text)}
									>
										{selectedItem?.label}
									</p>
									{selectedItem?.supportingText && (
										<p className={cn("text-fg-tertiary", s.text)}>
											{selectedItem?.supportingText}
										</p>
									)}
								</section>
							) : (
								<p className={cn("text-fg-tertiary", s.text)}>
									{placeholder}
								</p>
							)}

							<ChevronDownIcon
								className={cn(
									"ml-auto shrink-0 text-fg-tertiary",
									size === "lg" ? "size-5" : "size-4 stroke-[2.25px]",
								)}
							/>
						</>
					);
				}}
			</AriaSelectValue>
		</AriaButton>
	);
};

/* -------------------------------------------------------------------------- */
/*  Select                                                                     */
/* -------------------------------------------------------------------------- */

export interface SelectProps
	extends Omit<AriaSelectProps<SelectItemType>, "children" | "items">,
		SelectCommonProps {
	items?: SelectItemType[];
	popoverClassName?: string;
	icon?: FC<{ className?: string }> | ReactNode;
	children: ReactNode | ((item: SelectItemType) => ReactNode);
}

const SelectRoot = ({
	placeholder = "Select",
	icon,
	size = "md",
	children,
	items,
	label,
	hint,
	tooltip,
	hideRequiredIndicator,
	className,
	...rest
}: SelectProps) => {
	return (
		<SelectContext.Provider value={{ size }}>
			<AriaSelect
				{...rest}
				className={(state) =>
					cn(
						"flex flex-col gap-1.5",
						typeof className === "function" ? className(state) : className,
					)
				}
			>
				{(state) => (
					<>
						{label && (
							<Label
								isRequired={
									hideRequiredIndicator ? false : state.isRequired
								}
								tooltip={tooltip}
							>
								{label}
							</Label>
						)}

						<SelectValueButton
							{...state}
							size={size}
							placeholder={placeholder}
							icon={icon}
						/>

						<SelectPopover
							size={size}
							{...(rest.popoverClassName
								? { className: rest.popoverClassName }
								: {})}
						>
							<AriaListBox
								{...(items ? { items } : {})}
								className="size-full outline-hidden"
							>
								{children}
							</AriaListBox>
						</SelectPopover>

						{hint && (
							<HintText
								isInvalid={state.isInvalid}
								size={size === "sm" ? "sm" : "md"}
							>
								{hint}
							</HintText>
						)}
					</>
				)}
			</AriaSelect>
		</SelectContext.Provider>
	);
};

/* -------------------------------------------------------------------------- */
/*  Compound export                                                            */
/* -------------------------------------------------------------------------- */

export const Select = SelectRoot as typeof SelectRoot & {
	Item: typeof SelectItem;
};
Select.Item = SelectItem;

export { SelectContext };
