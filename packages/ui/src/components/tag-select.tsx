/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/select/tag-select.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import {
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
} from "react";
import {
	ComboBox as AriaComboBox,
	type ComboBoxProps as AriaComboBoxProps,
	Group as AriaGroup,
	Input as AriaInput,
	type Key,
	ListBox as AriaListBox,
	type ListBoxProps as AriaListBoxProps,
	Popover as AriaPopover,
	useFilter,
	useListData,
} from "react-aria-components";
import { cn } from "../lib/cn.js";
import { HintText } from "./inputs/hint-text.js";
import { Label } from "./inputs/label.js";
import { SelectContext, SelectItem, type SelectItemType } from "./select.js";

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

interface TagSelectContextValue {
	size: "sm" | "md" | "lg";
	onRemove: (id: Key) => void;
}

const TagSelectContext = createContext<TagSelectContextValue>({
	size: "sm",
	onRemove: () => {},
});

/* -------------------------------------------------------------------------- */
/*  Sizes                                                                      */
/* -------------------------------------------------------------------------- */

const sizes = {
	sm: { root: "py-2 pl-3 pr-2.5 gap-2", text: "text-sm" },
	md: { root: "py-2 px-3 gap-2", text: "text-sm" },
	lg: { root: "py-2.5 px-3.5 gap-2", text: "text-sm" },
};

/* -------------------------------------------------------------------------- */
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */

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

function XIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<path d="M18 6L6 18M6 6l12 12" />
		</svg>
	);
}

/* -------------------------------------------------------------------------- */
/*  Tag chip in the trigger                                                    */
/* -------------------------------------------------------------------------- */

const TagChip = ({
	item,
	size,
}: { item: SelectItemType; size: "sm" | "md" | "lg" }) => {
	const { onRemove } = useContext(TagSelectContext);

	return (
		<span
			className={cn(
				"inline-flex items-center gap-1 rounded-md bg-bg-secondary ring-1 ring-border ring-inset",
				size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-sm",
			)}
		>
			<span className="font-medium text-fg">{item.label}</span>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					onRemove(item.id);
				}}
				aria-label={`Remove ${item.label}`}
				className="flex shrink-0 items-center justify-center rounded text-fg-tertiary hover:text-fg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500/22"
			>
				<XIcon className={size === "sm" ? "size-3" : "size-3.5"} />
			</button>
		</span>
	);
};

/* -------------------------------------------------------------------------- */
/*  TagSelect                                                                  */
/* -------------------------------------------------------------------------- */

export interface TagSelectProps
	extends Omit<
		AriaComboBoxProps<SelectItemType>,
		"children" | "items" | "selectedKey" | "onSelectionChange"
	> {
	/** Available options. */
	items?: SelectItemType[];
	/** Children (item render function). */
	children: AriaListBoxProps<SelectItemType>["children"];
	/** Pre-selected item ids (uncontrolled). */
	defaultSelectedIds?: Key[];
	/** Controlled selected items as ids. */
	selectedIds?: Key[];
	/** Called when selection changes (receives new id array). */
	onSelectionChange?: (ids: Key[]) => void;
	/** Helper text. */
	hint?: string;
	/** Label text. */
	label?: string;
	/** Tooltip text for help icon. */
	tooltip?: string;
	/** Field size. @default "sm" */
	size?: "sm" | "md" | "lg";
	/** Placeholder text. @default "Search" */
	placeholder?: string;
	/** Whether to hide the required indicator. */
	hideRequiredIndicator?: boolean;
	/** Additional className for the popover. */
	popoverClassName?: string;
}

const TagSelectRoot = ({
	items = [],
	children,
	size = "sm",
	defaultSelectedIds,
	selectedIds: controlledIds,
	onSelectionChange,
	hint,
	label,
	tooltip,
	hideRequiredIndicator,
	placeholder = "Search",
	popoverClassName,
	...props
}: TagSelectProps) => {
	const { contains } = useFilter({ sensitivity: "base" });

	// Selected items list
	const selectedList = useListData<SelectItemType>({
		initialItems: defaultSelectedIds
			? items.filter((it) => defaultSelectedIds.includes(it.id))
			: [],
	});

	const selectedKeys = controlledIds ?? selectedList.items.map((i) => i.id);

	const triggerRef = useRef<HTMLDivElement>(null);
	const [popoverWidth, setPopoverWidth] = useState("");

	const onResize = useCallback(() => {
		if (!triggerRef.current) return;
		setPopoverWidth(`${triggerRef.current.getBoundingClientRect().width}px`);
	}, []);

	// Items available to select (exclude already selected)
	const availableItems = items.filter((it) => !selectedKeys.includes(it.id));

	const handleSelectionChange = useCallback(
		(id: Key | null) => {
			if (!id) return;
			const item = items.find((it) => it.id === id);
			if (!item) return;
			if (!selectedKeys.includes(id)) {
				selectedList.append(item);
				const newIds = [...selectedKeys, id];
				onSelectionChange?.(newIds);
			}
		},
		[items, selectedKeys, selectedList, onSelectionChange],
	);

	const handleRemove = useCallback(
		(id: Key) => {
			selectedList.remove(id);
			const newIds = selectedKeys.filter((k) => k !== id);
			onSelectionChange?.(newIds);
		},
		[selectedKeys, selectedList, onSelectionChange],
	);

	return (
		<TagSelectContext.Provider value={{ size, onRemove: handleRemove }}>
			<SelectContext.Provider value={{ size }}>
				<AriaComboBox
					menuTrigger="focus"
					items={availableItems}
					onSelectionChange={handleSelectionChange}
					inputValue=""
					allowsCustomValue
					{...props}
				>
					{(state) => (
						<div className="flex flex-col gap-1.5">
							{label && (
								<Label
									isRequired={
										hideRequiredIndicator ? false : state.isRequired
									}
									isInvalid={state.isInvalid}
									tooltip={tooltip}
								>
									{label}
								</Label>
							)}

							{/* Trigger */}
							<AriaGroup
								ref={triggerRef}
								onFocus={onResize}
								onPointerEnter={onResize}
								className={({ isFocusWithin, isDisabled }) =>
									cn(
										"flex w-full flex-wrap items-center gap-1.5 rounded-lg bg-bg shadow-xs ring-1 ring-border outline-hidden transition duration-100 ring-inset",
										isFocusWithin &&
											"ring-2 ring-border-brand",
										isDisabled && "cursor-not-allowed opacity-50",
										sizes[size].root,
									)
								}
							>
								<SearchIcon className="shrink-0 size-4 text-fg-tertiary" />

								{selectedList.items.map((item) => (
									<TagChip key={item.id} item={item} size={size} />
								))}

								<AriaInput
									placeholder={selectedList.items.length === 0 ? placeholder : ""}
									className={cn(
										"min-w-20 flex-1 appearance-none bg-transparent text-fg caret-fg outline-hidden placeholder:text-fg-tertiary disabled:cursor-not-allowed",
										sizes[size].text,
									)}
								/>
							</AriaGroup>

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
								<AriaListBox className="size-full outline-hidden">
									{children}
								</AriaListBox>
							</AriaPopover>

							{hint && (
								<HintText
									isInvalid={state.isInvalid}
									size={size === "sm" ? "sm" : "md"}
								>
									{hint}
								</HintText>
							)}
						</div>
					)}
				</AriaComboBox>
			</SelectContext.Provider>
		</TagSelectContext.Provider>
	);
};

/* -------------------------------------------------------------------------- */
/*  Compound export                                                            */
/* -------------------------------------------------------------------------- */

const TagSelect = TagSelectRoot as typeof TagSelectRoot & {
	Item: typeof SelectItem;
	displayName?: string;
};

TagSelect.Item = SelectItem;

TagSelect.displayName = "TagSelect";

export { TagSelect };
