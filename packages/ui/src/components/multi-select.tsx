/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/select/multi-select.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import {
	type ReactNode,
	useCallback,
	useRef,
	useState,
} from "react";
import {
	Autocomplete as AriaAutocomplete,
	Button as AriaButton,
	Dialog as AriaDialog,
	DialogTrigger as AriaDialogTrigger,
	Input as AriaInput,
	ListBox as AriaListBox,
	Popover as AriaPopover,
	SearchField as AriaSearchField,
	type Selection,
	useFilter,
} from "react-aria-components";
import { cn } from "../lib/cn.js";
import { HintText } from "./inputs/hint-text.js";
import { Label } from "./inputs/label.js";
import { SelectContext, SelectItem, type SelectItemType } from "./select.js";

/* -------------------------------------------------------------------------- */
/*  Sizes                                                                      */
/* -------------------------------------------------------------------------- */

const sizes = {
	sm: {
		root: "py-2 pl-3 pr-2.5 gap-2",
		text: "text-sm",
		textContainer: "gap-x-1.5",
	},
	md: { root: "py-2 px-3 gap-2", text: "text-sm", textContainer: "gap-x-1.5" },
	lg: {
		root: "py-2.5 px-3.5 gap-2",
		text: "text-sm",
		textContainer: "gap-x-1.5",
	},
};

const searchSizes = {
	sm: { wrapper: "py-1", root: "px-3 py-2 gap-2", text: "text-sm" },
	md: { wrapper: "py-0.5", root: "px-3 py-2 gap-2", text: "text-sm" },
	lg: { wrapper: "py-0.5", root: "px-3.5 py-2.5 gap-2", text: "text-sm" },
};

const popoverMaxHeights = {
	sm: "max-h-60",
	md: "max-h-72",
	lg: "max-h-80",
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

/* -------------------------------------------------------------------------- */
/*  MultiSelectFooter                                                          */
/* -------------------------------------------------------------------------- */

interface MultiSelectFooterProps {
	size?: "sm" | "md" | "lg";
	onReset?: () => void;
	onSelectAll?: () => void;
	className?: string;
}

const MultiSelectFooter = ({
	size = "sm",
	onReset,
	onSelectAll,
	className,
}: MultiSelectFooterProps) => {
	const btnClass =
		"rounded-md px-2.5 py-1.5 text-sm font-medium text-fg-secondary hover:bg-bg-secondary transition-colors";

	return (
		<div
			className={cn(
				"flex items-center justify-between border-t border-border p-3",
				className,
			)}
		>
			<button type="button" onClick={onReset} className={btnClass}>
				Reset
			</button>
			<button type="button" onClick={onSelectAll} className={btnClass}>
				Select all
			</button>
		</div>
	);
};

/* -------------------------------------------------------------------------- */
/*  MultiSelectEmptyState                                                      */
/* -------------------------------------------------------------------------- */

interface MultiSelectEmptyStateProps {
	title?: string;
	description?: string;
	onClearSearch?: () => void;
	className?: string;
}

const MultiSelectEmptyState = ({
	title = "No results found",
	description = "Please try a different search term.",
	onClearSearch,
	className,
}: MultiSelectEmptyStateProps) => (
	<div
		className={cn(
			"flex flex-col items-center gap-3 px-4 py-4 text-center",
			className,
		)}
	>
		<div className="flex flex-col items-center gap-1">
			<p className="text-sm font-semibold text-fg">{title}</p>
			<p className="text-sm text-fg-tertiary">{description}</p>
		</div>
		{onClearSearch && (
			<button
				type="button"
				onClick={onClearSearch}
				className="text-sm font-medium text-fg-brand hover:underline"
			>
				Clear search
			</button>
		)}
	</div>
);

/* -------------------------------------------------------------------------- */
/*  MultiSelectRoot                                                            */
/* -------------------------------------------------------------------------- */

interface MultiSelectProps {
	/** Items to render. */
	items?: SelectItemType[];
	/** Children (item render function or elements). */
	children: ReactNode | ((item: SelectItemType) => ReactNode);
	/** Controlled selected keys. */
	selectedKeys?: Selection;
	/** Uncontrolled default selected keys. */
	defaultSelectedKeys?: Selection;
	/** Called when selection changes. */
	onSelectionChange?: (keys: Selection) => void;
	/** Disable the trigger. */
	isDisabled?: boolean;
	/** Mark required. */
	isRequired?: boolean;
	/** Error state. */
	isInvalid?: boolean;
	/** Placeholder when nothing selected. @default "Select" */
	placeholder?: string;
	/** Label text. */
	label?: string;
	/** Helper text. */
	hint?: string;
	/** Tooltip text for help icon. */
	tooltip?: string;
	/** Whether to hide the required indicator. */
	hideRequiredIndicator?: boolean;
	/** Additional className for the popover. */
	popoverClassName?: string;
	/** Additional className for the root. */
	className?: string;
	/** Called when Reset is clicked. */
	onReset?: () => void;
	/** Called when Select All is clicked. */
	onSelectAll?: () => void;
	/** Show footer with Reset / Select All. @default true */
	showFooter?: boolean;
	/** Show search input. @default true */
	showSearch?: boolean;
	/** Empty state title when search finds nothing. */
	emptyStateTitle?: string;
	/** Empty state description when search finds nothing. */
	emptyStateDescription?: string;
	/** Custom formatter for the selected count label. */
	selectedCountFormatter?: (count: number) => ReactNode;
	/** Supporting text displayed next to selected count. */
	supportingText?: ReactNode;
	/** Field size. @default "md" */
	size?: "sm" | "md" | "lg";
}

const MultiSelectRoot = ({
	items,
	children,
	size = "md",
	selectedKeys,
	defaultSelectedKeys,
	onSelectionChange,
	isDisabled,
	isRequired,
	isInvalid,
	placeholder = "Select",
	label,
	hint,
	tooltip,
	hideRequiredIndicator,
	popoverClassName,
	className,
	onReset,
	onSelectAll,
	showFooter = true,
	showSearch = true,
	emptyStateTitle,
	emptyStateDescription,
	selectedCountFormatter,
	supportingText,
}: MultiSelectProps) => {
	const { contains } = useFilter({ sensitivity: "base" });
	const [searchValue, setSearchValue] = useState("");

	const triggerRef = useRef<HTMLButtonElement>(null);
	const [popoverWidth, setPopoverWidth] = useState("");

	const handleResize = useCallback(() => {
		if (!triggerRef.current) return;
		setPopoverWidth(`${triggerRef.current.getBoundingClientRect().width}px`);
	}, []);

	const handleClearSearch = useCallback(() => {
		setSearchValue("");
	}, []);

	const selectedCount =
		selectedKeys instanceof Set
			? selectedKeys.size
			: selectedKeys === "all"
				? (items?.length ?? 0)
				: 0;
	const hasSelection = selectedCount > 0;

	const s = sizes[size];

	return (
		<SelectContext.Provider value={{ size }}>
			<div className={cn("flex flex-col gap-1.5", className)}>
				{label && (
					<Label
						isRequired={hideRequiredIndicator ? false : isRequired}
						isInvalid={isInvalid}
						tooltip={tooltip}
					>
						{label}
					</Label>
				)}

				<AriaDialogTrigger>
					<AriaButton
						ref={triggerRef}
						{...(isDisabled !== undefined && { isDisabled })}
						onClick={handleResize}
						className={(state) =>
							cn(
								"relative flex w-full cursor-pointer items-center rounded-lg bg-bg shadow-xs ring-1 ring-border outline-hidden transition duration-100 ring-inset",
								(state.isFocusVisible || state.isPressed) &&
									"ring-2 ring-border-brand",
								state.isDisabled && "cursor-not-allowed opacity-50",
							)
						}
					>
						<span
							className={cn(
								"flex w-full items-center truncate text-left",
								s.root,
							)}
						>
							{hasSelection ? (
								<span className={cn("flex items-center", s.textContainer)}>
									<span className={cn("font-medium text-fg", s.text)}>
										{selectedCountFormatter
											? selectedCountFormatter(selectedCount)
											: `${selectedCount} selected`}
									</span>
									{supportingText && (
										<span className={cn("text-fg-tertiary", s.text)}>
											{supportingText}
										</span>
									)}
								</span>
							) : (
								<span className={cn("text-fg-tertiary", s.text)}>
									{placeholder}
								</span>
							)}

							<ChevronDownIcon
								className={cn(
									"ml-auto shrink-0 text-fg-tertiary",
									size === "lg" ? "size-5" : "size-4",
								)}
							/>
						</span>
					</AriaButton>

					<AriaPopover
						placement="bottom"
						offset={4}
						containerPadding={0}
						style={{ width: popoverWidth || undefined }}
						className={(popState) =>
							cn(
								"w-(--trigger-width) origin-(--trigger-anchor-point) overflow-hidden rounded-lg bg-bg shadow-lg ring-1 ring-border-secondary outline-hidden will-change-transform",
								popState.isEntering &&
									"duration-150 ease-out animate-in fade-in placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
								popState.isExiting &&
									"duration-100 ease-in animate-out fade-out placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",
								popoverClassName,
							)
						}
					>
						<AriaDialog className="outline-hidden">
							<AriaAutocomplete
								filter={contains}
								inputValue={searchValue}
								onInputChange={setSearchValue}
							>
								{showSearch && (
									<div
										className={cn(
											"border-b border-border",
											searchSizes[size].wrapper,
										)}
									>
										<AriaSearchField
											aria-label="Search"
											value={searchValue}
											onChange={setSearchValue}
											autoFocus
										>
											<div
												className={cn(
													"flex items-center",
													searchSizes[size].root,
												)}
											>
												<SearchIcon className="shrink-0 size-4 text-fg-tertiary" />
												<AriaInput
													placeholder="Search"
													className={cn(
														"w-full appearance-none bg-transparent text-fg caret-fg outline-hidden placeholder:text-fg-tertiary",
														searchSizes[size].text,
													)}
												/>
											</div>
										</AriaSearchField>
									</div>
								)}

								<AriaListBox
									aria-label={label || "Options"}
									{...(items !== undefined && { items })}
									selectionMode="multiple"
									{...(selectedKeys !== undefined && { selectedKeys })}
									{...(defaultSelectedKeys !== undefined && { defaultSelectedKeys })}
									{...(onSelectionChange !== undefined && { onSelectionChange })}
									renderEmptyState={() => (
										<MultiSelectEmptyState
											{...(emptyStateTitle !== undefined && { title: emptyStateTitle })}
											{...(emptyStateDescription !== undefined && { description: emptyStateDescription })}
											{...(searchValue ? { onClearSearch: handleClearSearch } : {})}
										/>
									)}
									className={cn(
										"overflow-y-auto py-1 outline-hidden",
										popoverMaxHeights[size],
									)}
								>
									{children}
								</AriaListBox>
							</AriaAutocomplete>

							{showFooter && (
								<MultiSelectFooter
									size={size}
									{...(onReset !== undefined && { onReset })}
									{...(onSelectAll !== undefined && { onSelectAll })}
								/>
							)}
						</AriaDialog>
					</AriaPopover>
				</AriaDialogTrigger>

				{hint && (
					<HintText isInvalid={isInvalid} size={size === "sm" ? "sm" : "md"}>
						{hint}
					</HintText>
				)}
			</div>
		</SelectContext.Provider>
	);
};

/* -------------------------------------------------------------------------- */
/*  Compound export                                                            */
/* -------------------------------------------------------------------------- */

const MultiSelect = MultiSelectRoot as typeof MultiSelectRoot & {
	Item: typeof SelectItem;
	Footer: typeof MultiSelectFooter;
	EmptyState: typeof MultiSelectEmptyState;
	displayName?: string;
};

MultiSelect.Item = SelectItem;
MultiSelect.Footer = MultiSelectFooter;
MultiSelect.EmptyState = MultiSelectEmptyState;

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
export type { MultiSelectProps, MultiSelectFooterProps, MultiSelectEmptyStateProps };
