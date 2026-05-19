/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * Keyboard-accessible command palette backed by React Aria ComboBox.
 * Opens with a trigger (or programmatically via isOpen/onOpenChange).
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
	Group as AriaGroup,
	Input as AriaInput,
	type Key,
	ListBox as AriaListBox,
	ListBoxItem as AriaListBoxItem,
	type ListBoxItemProps as AriaListBoxItemProps,
	Modal as AriaModal,
	ModalOverlay as AriaModalOverlay,
} from "react-aria-components";
import { cn } from "../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
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

function XIcon({ className }: { className?: string }) {
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
			<path d="M18 6L6 18M6 6l12 12" />
		</svg>
	);
}

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

interface CommandMenuContextValue {
	onClose: () => void;
}

const CommandMenuContext = createContext<CommandMenuContextValue>({
	onClose: () => {},
});

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface CommandItem {
	/** Unique id for the item. */
	id: string;
	/** Display label. */
	label: string;
	/** Optional group label — items with the same group are visually grouped. */
	group?: string;
	/** Leading icon. */
	icon?: FC<{ className?: string }> | ReactNode;
	/** Keyboard shortcut hint (display only). */
	shortcut?: string;
	/** Whether the item is disabled. */
	isDisabled?: boolean;
}

export interface CommandMenuProps {
	/** Whether the menu is open (controlled). */
	isOpen: boolean;
	/** Called when the open state changes. */
	onOpenChange: (open: boolean) => void;
	/** Items to render. */
	items?: CommandItem[];
	/** Placeholder text. @default "Search…" */
	placeholder?: string;
	/** Called when an item is selected. */
	onAction?: (id: Key) => void;
	/** Empty state message. */
	emptyMessage?: string;
}

/* -------------------------------------------------------------------------- */
/*  CommandItem subcomponent                                                   */
/* -------------------------------------------------------------------------- */

interface CommandMenuItemProps extends Omit<AriaListBoxItemProps, "id"> {
	id: string;
	label?: string;
	icon?: FC<{ className?: string }> | ReactNode;
	shortcut?: string;
}

const CommandMenuItem = ({
	id,
	label,
	icon: IconProp,
	shortcut,
	children,
	...props
}: CommandMenuItemProps) => {
	const { onClose } = useContext(CommandMenuContext);

	return (
		<AriaListBoxItem
			id={id}
			textValue={label || (typeof children === "string" ? children : id)}
			{...props}
			onAction={() => {
				onClose();
			}}
			className={(state) =>
				cn(
					"flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-hidden select-none transition-colors",
					(state.isFocused || state.isHovered) && "bg-bg-secondary",
					state.isDisabled && "cursor-not-allowed opacity-50",
					state.isFocusVisible && "ring-2 ring-brand-500/22 ring-inset",
				)
			}
		>
			{isReactComponent(IconProp) ? (
				<IconProp className="size-4 shrink-0 text-fg-tertiary" />
			) : isValidElement(IconProp) ? (
				IconProp
			) : null}

			<span className="flex-1 truncate font-medium text-fg">
				{label || (typeof children !== "function" ? children : null)}
			</span>

			{shortcut && (
				<kbd className="pointer-events-none shrink-0 rounded px-1.5 py-0.5 text-xs font-medium text-fg-tertiary ring-1 ring-border select-none">
					{shortcut}
				</kbd>
			)}
		</AriaListBoxItem>
	);
};

/* -------------------------------------------------------------------------- */
/*  CommandGroup separator                                                     */
/* -------------------------------------------------------------------------- */

const CommandMenuGroup = ({
	label,
	children,
}: { label: string; children: ReactNode }) => (
	<div className="mt-2 first:mt-0">
		<div className="px-3 py-1.5 text-xs font-semibold text-fg-tertiary">
			{label}
		</div>
		{children}
	</div>
);

/* -------------------------------------------------------------------------- */
/*  CommandMenuRoot                                                            */
/* -------------------------------------------------------------------------- */

const CommandMenuRoot = ({
	isOpen,
	onOpenChange,
	items = [],
	placeholder = "Search…",
	onAction,
	emptyMessage = "No results found.",
}: CommandMenuProps) => {
	const handleClose = useCallback(() => onOpenChange(false), [onOpenChange]);

	const handleSelect = useCallback(
		(id: Key | null) => {
			if (!id) return;
			onAction?.(id);
			handleClose();
		},
		[onAction, handleClose],
	);

	// Group items
	const grouped = items.reduce<Record<string, CommandItem[]>>((acc, item) => {
		const g = item.group ?? "__ungrouped__";
		if (!acc[g]) acc[g] = [];
		acc[g].push(item);
		return acc;
	}, {});

	const groups = Object.entries(grouped);
	const isGrouped = groups.length > 1 || groups[0]?.[0] !== "__ungrouped__";

	const allItems = Object.values(grouped).flat();

	return (
		<CommandMenuContext.Provider value={{ onClose: handleClose }}>
			<AriaModalOverlay
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable
				className={(state) =>
					cn(
						"fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[15vh] backdrop-blur-sm", // dark-ok
						state.isEntering && "duration-150 ease-out animate-in fade-in",
						state.isExiting && "duration-100 ease-in animate-out fade-out",
					)
				}
			>
				<AriaModal
					className={(state) =>
						cn(
							"w-full max-w-lg overflow-hidden rounded-xl bg-bg shadow-2xl ring-1 ring-border",
							state.isEntering &&
								"duration-150 ease-out animate-in fade-in zoom-in-95",
							state.isExiting &&
								"duration-100 ease-in animate-out fade-out zoom-out-95",
						)
					}
				>
					<AriaComboBox
						aria-label="Command menu"
						menuTrigger="focus"
						defaultItems={allItems}
						onSelectionChange={handleSelect}
						autoFocus
					>
						{() => (
							<>
								<div className="flex items-center gap-3 border-b border-border px-4 py-3">
									<SearchIcon className="size-4 shrink-0 text-fg-tertiary" />
									<AriaGroup className="flex flex-1 items-center">
										<AriaInput
											autoFocus
											placeholder={placeholder}
											className="flex-1 appearance-none bg-transparent text-sm text-fg caret-fg outline-hidden placeholder:text-fg-tertiary"
										/>
									</AriaGroup>
									<button
										type="button"
										onClick={handleClose}
										className="flex h-6 w-6 items-center justify-center rounded-md text-fg-tertiary hover:bg-bg-secondary hover:text-fg transition-colors"
										aria-label="Close"
									>
										<XIcon className="size-3.5" />
									</button>
								</div>

								<AriaListBox
									className="max-h-80 overflow-y-auto p-2 outline-hidden"
									renderEmptyState={() => (
										<div className="py-6 text-center text-sm text-fg-tertiary">
											{emptyMessage}
										</div>
									)}
								>
									{isGrouped
										? groups.map(([group, groupItems]) =>
												group === "__ungrouped__" ? (
													groupItems.map((item) => (
														<CommandMenuItem
															key={item.id}
															id={item.id}
															label={item.label}
															{...(item.icon !== undefined && { icon: item.icon })}
															{...(item.shortcut !== undefined && { shortcut: item.shortcut })}
															{...(item.isDisabled !== undefined && { isDisabled: item.isDisabled })}
														/>
													))
												) : (
													<CommandMenuGroup key={group} label={group}>
														{groupItems.map((item) => (
															<CommandMenuItem
																key={item.id}
																id={item.id}
																label={item.label}
																{...(item.icon !== undefined && { icon: item.icon })}
																{...(item.shortcut !== undefined && { shortcut: item.shortcut })}
																{...(item.isDisabled !== undefined && { isDisabled: item.isDisabled })}
															/>
														))}
													</CommandMenuGroup>
												),
											)
										: allItems.map((item) => (
												<CommandMenuItem
													key={item.id}
													id={item.id}
													label={item.label}
													{...(item.icon !== undefined && { icon: item.icon })}
													{...(item.shortcut !== undefined && { shortcut: item.shortcut })}
													{...(item.isDisabled !== undefined && { isDisabled: item.isDisabled })}
												/>
											))}
								</AriaListBox>
							</>
						)}
					</AriaComboBox>
				</AriaModal>
			</AriaModalOverlay>
		</CommandMenuContext.Provider>
	);
};

/* -------------------------------------------------------------------------- */
/*  Compound export                                                            */
/* -------------------------------------------------------------------------- */

export const CommandMenu = CommandMenuRoot as typeof CommandMenuRoot & {
	Item: typeof CommandMenuItem;
	Group: typeof CommandMenuGroup;
	displayName?: string;
};

CommandMenu.Item = CommandMenuItem;
CommandMenu.Group = CommandMenuGroup;

CommandMenu.displayName = "CommandMenu";

export type { CommandMenuItemProps };
