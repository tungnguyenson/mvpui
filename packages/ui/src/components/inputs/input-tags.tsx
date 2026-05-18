/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/input-tags.tsx
 *        components/base/input/input-tags-outer.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { type Key, type KeyboardEvent, type ReactNode, useCallback, useRef, useState } from "react";
import { Group as AriaGroup, Input as AriaInput } from "react-aria-components";
import { cn } from "../../lib/cn.js";
import { HintText } from "./hint-text.js";
import { InputBase } from "./input.js";
import { Label } from "./label.js";
import { Tag, TagGroup, TagList } from "../tags.js";
import { Tooltip, TooltipTrigger } from "../tooltip.js";

/* ==========================================================================
   InputTags / InputTagsOuter — tag entry fields built on the (pulled-ahead)
   Tags family + RA `Group`/`Input`. Logic ported from Untitled source;
   tokens mapped to dark-safe aliases, Tooltip/Tags/Label/HintText swapped
   for the MVP components.
   ========================================================================== */

interface TagEntry {
	id: string;
	label: string;
}

export interface InputTagsProps {
	/** Label text rendered above the field. */
	label?: string;
	/** Helper / error text rendered below the field. */
	hint?: ReactNode;
	/** Help-icon tooltip shown trailing inside the field. */
	tooltip?: string;
	/** Field size. @default "sm" */
	size?: "sm" | "md" | "lg";
	/** Placeholder text for the entry input. */
	placeholder?: string;
	/** Mark required (label `*`). */
	isRequired?: boolean;
	/** Disable the control. */
	isDisabled?: boolean;
	/** Error state. */
	isInvalid?: boolean;
	/** Allow duplicate tag values. @default false */
	allowDuplicates?: boolean;
	/** Maximum number of tags. */
	maxTags?: number;
	/** Controlled tag values. */
	value?: string[];
	/** Uncontrolled initial tag values. */
	defaultValue?: string[];
	/** Called when the tag array changes. */
	onChange?: (tags: string[]) => void;
	/** Called when a tag is added. */
	onTagAdded?: (tag: string) => void;
	/** Called when a tag is removed. */
	onTagRemoved?: (tag: string) => void;
	/** Validate a candidate tag — return false to reject. */
	validate?: (value: string) => boolean;
	/** Class name for the outer wrapper. */
	className?: string;
	/** Hide the required `*` indicator even when required. */
	hideRequiredIndicator?: boolean;
}

/** Shared controlled/uncontrolled tag-entry state with stable ids. */
function useTagEntries(
	value: string[] | undefined,
	defaultValue: string[] | undefined,
	options: {
		allowDuplicates: boolean;
		maxTags?: number | undefined;
		validate?: ((value: string) => boolean) | undefined;
		onChange?: ((tags: string[]) => void) | undefined;
		onTagAdded?: ((tag: string) => void) | undefined;
		onTagRemoved?: ((tag: string) => void) | undefined;
	}
) {
	const isControlled = value !== undefined;
	const idCounter = useRef(0);
	const nextId = useCallback(() => `tag-${idCounter.current++}`, []);

	const [internalEntries, setInternalEntries] = useState<TagEntry[]>(() =>
		(defaultValue ?? []).map((label) => ({ id: nextId(), label }))
	);

	const prevControlledValue = useRef<string[]>([]);
	const controlledEntries = useRef<TagEntry[]>([]);

	const entries = (() => {
		if (!isControlled) return internalEntries;
		if (prevControlledValue.current === value) return controlledEntries.current;

		const oldEntries = controlledEntries.current;
		const newEntries: TagEntry[] = [];
		const usedOldIndices = new Set<number>();

		for (const label of value) {
			const reused = oldEntries.find((e, i) => e.label === label && !usedOldIndices.has(i));
			if (reused) {
				usedOldIndices.add(oldEntries.indexOf(reused));
				newEntries.push(reused);
			} else {
				newEntries.push({ id: nextId(), label });
			}
		}

		prevControlledValue.current = value;
		controlledEntries.current = newEntries;
		return newEntries;
	})();

	const tags = entries.map((e) => e.label);

	const addTag = useCallback(
		(text: string) => {
			const trimmed = text.trim();
			if (!trimmed) return false;
			if (!options.allowDuplicates && tags.includes(trimmed)) return false;
			if (options.maxTags && tags.length >= options.maxTags) return false;
			if (options.validate && !options.validate(trimmed)) return false;

			const newEntries = [...entries, { id: nextId(), label: trimmed }];
			if (!isControlled) setInternalEntries(newEntries);
			options.onChange?.(newEntries.map((e) => e.label));
			options.onTagAdded?.(trimmed);
			return true;
		},
		[tags, entries, isControlled, options, nextId]
	);

	const removeTag = useCallback(
		(id: string) => {
			const entry = entries.find((e) => e.id === id);
			if (!entry) return;
			const newEntries = entries.filter((e) => e.id !== id);
			if (!isControlled) setInternalEntries(newEntries);
			options.onChange?.(newEntries.map((e) => e.label));
			options.onTagRemoved?.(entry.label);
		},
		[entries, isControlled, options]
	);

	return { entries, addTag, removeTag };
}

function AlertCircleIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
			<path
				d="M12 8v4m0 4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function HelpCircleIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
			<path
				d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

const sizePad = {
	sm: { empty: "px-3 py-2 text-sm", filled: "py-1.5 pl-2 pr-3 text-sm" },
	md: { empty: "px-3 py-2 text-md", filled: "py-2 pl-2 pr-3 text-md" },
	lg: { empty: "px-3.5 py-2.5 text-md", filled: "py-2 pl-2.5 pr-3.5 text-md" },
};

export const InputTags = ({
	size = "sm",
	label,
	hint,
	tooltip,
	placeholder,
	isRequired,
	isDisabled,
	isInvalid,
	allowDuplicates = false,
	maxTags,
	value,
	defaultValue,
	onChange,
	onTagAdded,
	onTagRemoved,
	validate,
	className,
	hideRequiredIndicator,
}: InputTagsProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState("");
	const { entries, addTag, removeTag } = useTagEntries(value, defaultValue, {
		allowDuplicates,
		maxTags,
		validate,
		onChange,
		onTagAdded,
		onTagRemoved,
	});

	const isEmpty = entries.length === 0;
	const tagSize = size === "lg" ? "md" : size;

	const handleRemove = useCallback(
		(keys: Set<Key>) => {
			for (const key of keys) removeTag(key.toString());
			if (entries.length - keys.size <= 0) {
				setTimeout(() => inputRef.current?.focus(), 0);
			}
		},
		[removeTag, entries.length]
	);

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			if (addTag(inputValue)) setInputValue("");
		}
	};

	return (
		<div className={cn("flex w-full flex-col gap-1.5", className)}>
			{label && (
				<Label isRequired={!hideRequiredIndicator && isRequired} isInvalid={isInvalid}>
					{label}
				</Label>
			)}

			<AriaGroup
				{...(isDisabled !== undefined ? { isDisabled } : {})}
				{...(isInvalid !== undefined ? { isInvalid } : {})}
				className={cn(
					"group/input relative flex w-full items-center rounded-lg border border-border bg-bg shadow-xs outline-none",
					"transition-shadow duration-100 ease-linear",
					"data-focus-within:border-border-brand data-focus-within:ring-4 data-focus-within:ring-brand-500/22",
					"data-invalid:border-border-error data-invalid:data-focus-within:ring-error-500/24",
					"data-disabled:cursor-not-allowed data-disabled:opacity-50",
					isEmpty ? sizePad[size].empty : sizePad[size].filled,
					(tooltip || isInvalid) && "pr-9"
				)}
			>
				<div
					className={cn(
						"flex w-full flex-1 flex-row flex-wrap items-center justify-start",
						size === "sm" ? "gap-1.5" : "gap-2"
					)}
				>
					{!isEmpty && (
						<TagGroup
							label={label || "Tags"}
							size={tagSize}
							onRemove={handleRemove}
							className="contents"
						>
							<TagList className="flex flex-wrap gap-1.5 outline-none" items={entries}>
								{(item: TagEntry) => (
									<Tag id={item.id} isDisabled={isDisabled}>
										{item.label}
									</Tag>
								)}
							</TagList>
						</TagGroup>
					)}

					<div className="relative flex min-w-[20%] flex-1 flex-row items-center">
						<AriaInput
							ref={inputRef}
							type="text"
							value={inputValue}
							{...(isDisabled !== undefined ? { disabled: isDisabled } : {})}
							{...(isEmpty && placeholder ? { placeholder } : {})}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
							className="w-full flex-1 appearance-none bg-transparent text-ellipsis text-fg caret-fg outline-none placeholder:text-fg-tertiary disabled:cursor-not-allowed"
						/>
					</div>
				</div>

				{tooltip && !isInvalid && (
					<Tooltip title={tooltip} placement="top">
						<TooltipTrigger
							tabIndex={0}
							className="absolute right-3 cursor-pointer text-fg-tertiary transition duration-100 ease-linear hover:text-fg-tertiary focus:text-fg-tertiary"
						>
							<HelpCircleIcon className="size-4" />
						</TooltipTrigger>
					</Tooltip>
				)}

				{isInvalid && (
					<AlertCircleIcon className="pointer-events-none absolute right-3 size-4 text-fg-error" />
				)}
			</AriaGroup>

			{hint && (
				<HintText isInvalid={isInvalid} size={size === "sm" ? "sm" : "md"}>
					{hint}
				</HintText>
			)}
		</div>
	);
};

InputTags.displayName = "InputTags";

export interface InputTagsOuterProps extends InputTagsProps {}

export const InputTagsOuter = ({
	size = "sm",
	label,
	hint,
	tooltip,
	placeholder,
	isRequired,
	isDisabled,
	isInvalid,
	allowDuplicates = false,
	maxTags,
	value,
	defaultValue,
	onChange,
	onTagAdded,
	onTagRemoved,
	validate,
	className,
	hideRequiredIndicator,
}: InputTagsOuterProps) => {
	const [inputValue, setInputValue] = useState("");
	const { entries, addTag, removeTag } = useTagEntries(value, defaultValue, {
		allowDuplicates,
		maxTags,
		validate,
		onChange,
		onTagAdded,
		onTagRemoved,
	});

	const tagSize = size === "lg" ? "md" : size;

	const handleRemove = useCallback(
		(keys: Set<Key>) => {
			for (const key of keys) removeTag(key.toString());
		},
		[removeTag]
	);

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			if (addTag(inputValue)) setInputValue("");
		}
	};

	return (
		<div className={cn("flex w-full flex-col", size === "sm" ? "gap-1.5" : "gap-2", className)}>
			<div className="flex flex-col gap-1.5">
				{label && (
					<Label isRequired={!hideRequiredIndicator && isRequired} isInvalid={isInvalid}>
						{label}
					</Label>
				)}

				<InputBase
					size={size}
					tooltip={tooltip}
					placeholder={placeholder}
					isInvalid={isInvalid}
					disabled={isDisabled}
					value={inputValue}
					onChange={(e) => setInputValue(e.currentTarget.value)}
					onKeyDown={handleKeyDown}
				/>
			</div>

			{entries.length > 0 && (
				<TagGroup label={label || "Tags"} size={tagSize} onRemove={handleRemove}>
					<TagList className="flex flex-wrap gap-1.5 outline-none" items={entries}>
						{(item: TagEntry) => (
							<Tag id={item.id} isDisabled={isDisabled}>
								{item.label}
							</Tag>
						)}
					</TagList>
				</TagGroup>
			)}

			{hint && entries.length === 0 && (
				<HintText isInvalid={isInvalid} size={size === "sm" ? "sm" : "md"}>
					{hint}
				</HintText>
			)}
		</div>
	);
};

InputTagsOuter.displayName = "InputTagsOuter";
