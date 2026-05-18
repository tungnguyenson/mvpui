/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/tags/tags.tsx
 *        components/base/tags/base-components/{tag-checkbox,tag-close-x}.tsx
 *        components/foundations/dot-icon.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * Pulled ahead from Wave 3 — InputTags / InputTagsOuter depend on it.
 * Untitled tokens mapped to MVP dark-safe aliases (see TOKEN_TRANSLATION.md).
 */

"use client";

import {
	createContext,
	type ImgHTMLAttributes,
	type PropsWithChildren,
	type RefAttributes,
	useContext,
	useState,
} from "react";
import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
	Tag as AriaTag,
	TagGroup as AriaTagGroup,
	type TagGroupProps as AriaTagGroupProps,
	TagList as AriaTagList,
	type TagProps as AriaTagProps,
} from "react-aria-components";
import { cn } from "../lib/cn.js";

type TagSize = "sm" | "md" | "lg";

/* -------------------------------------------------------------------------- */
/*  Dot                                                                       */
/* -------------------------------------------------------------------------- */

const dotSizes = {
	sm: { wh: 8, c: 4, r: 2.5 },
	md: { wh: 10, c: 5, r: 4 },
};

export const Dot = ({
	size = "md",
	...props
}: React.SVGProps<SVGSVGElement> & { size?: "sm" | "md" }) => (
	<svg
		width={dotSizes[size].wh}
		height={dotSizes[size].wh}
		viewBox={`0 0 ${dotSizes[size].wh} ${dotSizes[size].wh}`}
		fill="none"
		aria-hidden="true"
		{...props}
	>
		<circle
			cx={dotSizes[size].c}
			cy={dotSizes[size].c}
			r={dotSizes[size].r}
			fill="currentColor"
			stroke="currentColor"
		/>
	</svg>
);

/* -------------------------------------------------------------------------- */
/*  Internal icons (inline — MVP carries no icon library)                     */
/* -------------------------------------------------------------------------- */

function UserIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
			<path
				d="M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
				stroke="currentColor"
				strokeWidth="2.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function XCloseIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
			<path
				d="M18 6 6 18M6 6l12 12"
				stroke="currentColor"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

/* -------------------------------------------------------------------------- */
/*  TagAvatar                                                                 */
/* -------------------------------------------------------------------------- */

export const TagAvatar = ({
	src,
	alt,
	contrastBorder = true,
	className,
}: ImgHTMLAttributes<HTMLImageElement> & { contrastBorder?: boolean }) => {
	const [isFailed, setIsFailed] = useState(false);

	return (
		<div
			className={cn(
				"relative inline-flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-tertiary",
				contrastBorder && "outline-[0.5px] outline-offset-[-0.5px] outline-border-secondary",
				className
			)}
		>
			{src && !isFailed ? (
				<img
					data-avatar-img
					className="size-full object-cover"
					src={src}
					alt={alt}
					onError={() => setIsFailed(true)}
				/>
			) : (
				<UserIcon className="size-3 text-fg-tertiary" />
			)}
		</div>
	);
};

/* -------------------------------------------------------------------------- */
/*  TagCheckbox / TagCloseX (internal)                                        */
/* -------------------------------------------------------------------------- */

interface TagCheckboxProps {
	size?: TagSize;
	className?: string;
	isSelected?: boolean;
	isDisabled?: boolean;
}

const TagCheckbox = ({ className, isSelected, isDisabled, size = "sm" }: TagCheckboxProps) => (
	<div
		className={cn(
			"flex items-center justify-center rounded-sm bg-bg ring-1 ring-border ring-inset",
			size === "sm" && "size-3.5",
			size === "md" && "size-4",
			size === "lg" && "size-4.5",
			isSelected && "bg-primary ring-primary",
			isDisabled && "cursor-not-allowed opacity-50",
			isDisabled && !isSelected && "bg-bg-tertiary",
			className
		)}
	>
		<svg
			aria-hidden="true"
			viewBox="0 0 14 14"
			fill="none"
			className={cn(
				"pointer-events-none text-fg-on-brand opacity-0",
				size === "sm" && "size-2.5",
				size === "md" && "size-3",
				size === "lg" && "size-3.5",
				isSelected && "opacity-100"
			)}
		>
			<path
				d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	</div>
);

interface TagCloseXProps extends AriaButtonProps, RefAttributes<HTMLButtonElement> {
	size?: TagSize;
	className?: string;
}

const closeStyles = {
	sm: { root: "p-0.5", icon: "size-2.5" },
	md: { root: "p-0.5", icon: "size-3" },
	lg: { root: "p-0.75", icon: "size-3.5" },
};

const TagCloseX = ({ size = "md", className, ...otherProps }: TagCloseXProps) => (
	<AriaButton
		slot="remove"
		aria-label="Remove this tag"
		className={cn(
			"flex cursor-pointer rounded-[3px] text-fg-tertiary outline-none transition duration-100 ease-linear hover:bg-bg-tertiary hover:text-fg-tertiary focus-visible:ring-2 focus-visible:ring-brand-500/22 disabled:cursor-not-allowed",
			closeStyles[size].root,
			className
		)}
		{...otherProps}
	>
		<XCloseIcon className={closeStyles[size].icon} />
	</AriaButton>
);

/* -------------------------------------------------------------------------- */
/*  TagGroup / TagList / Tag                                                   */
/* -------------------------------------------------------------------------- */

export interface TagItem {
	id: string;
	label: string;
	count?: number;
	avatarSrc?: string;
	avatarContrastBorder?: boolean;
	dot?: boolean;
	dotClassName?: string;
	isDisabled?: boolean;
	onClose?: (id: string) => void;
}

const TagGroupContext = createContext<{
	selectionMode: "none" | "single" | "multiple";
	size: TagSize;
}>({
	selectionMode: "none",
	size: "sm",
});

export interface TagGroupProps extends AriaTagGroupProps, RefAttributes<HTMLDivElement> {
	/** Accessible label for the tag group. */
	label: string;
	/** Tag size. @default "sm" */
	size?: TagSize;
}

export const TagGroup = ({
	label,
	selectionMode = "none",
	size = "sm",
	children,
	...otherProps
}: TagGroupProps) => (
	<TagGroupContext.Provider value={{ selectionMode, size }}>
		<AriaTagGroup
			aria-label={label}
			selectionMode={selectionMode}
			disallowEmptySelection={selectionMode === "single"}
			{...otherProps}
		>
			{children}
		</AriaTagGroup>
	</TagGroupContext.Provider>
);

TagGroup.displayName = "TagGroup";

export const TagList = AriaTagList;

const tagStyles = {
	sm: {
		root: {
			base: "px-2 py-0.75 text-xs font-medium",
			withCheckbox: "pl-1.25",
			withAvatar: "pl-1",
			withDot: "pl-1.5",
			withCount: "pr-1",
			withClose: "pr-1",
		},
		content: "gap-1",
		count: "px-1 text-xs font-medium",
	},
	md: {
		root: {
			base: "px-2.25 py-0.5 text-sm font-medium",
			withCheckbox: "pl-1",
			withAvatar: "pl-1.25",
			withDot: "pl-1.75",
			withCount: "pr-0.75",
			withClose: "pr-1",
		},
		content: "gap-1.25",
		count: "px-1.25 text-xs font-medium",
	},
	lg: {
		root: {
			base: "px-2.5 py-1 text-sm font-medium",
			withCheckbox: "pl-1.25",
			withAvatar: "pl-1.75",
			withDot: "pl-2.25",
			withCount: "pr-1",
			withClose: "pr-1",
		},
		content: "gap-1.5",
		count: "px-1.5 text-sm font-medium",
	},
};

export interface TagProps
	extends Omit<AriaTagProps, "id" | "isDisabled">,
		RefAttributes<object>,
		Omit<TagItem, "label" | "id" | "isDisabled"> {
	id?: string | number | undefined;
	isDisabled?: boolean | undefined;
}

export const Tag = ({
	id,
	avatarSrc,
	avatarContrastBorder = true,
	dot,
	dotClassName,
	isDisabled,
	count,
	className,
	children,
	onClose,
}: PropsWithChildren<TagProps>) => {
	const context = useContext(TagGroupContext);

	const leadingContent = avatarSrc ? (
		<TagAvatar src={avatarSrc} alt="Avatar" contrastBorder={avatarContrastBorder} />
	) : dot ? (
		<Dot className={cn("text-fg-success", dotClassName)} size="sm" />
	) : null;

	return (
		<AriaTag
			{...(id !== undefined ? { id } : {})}
			{...(isDisabled !== undefined ? { isDisabled } : {})}
			{...(typeof children === "string" ? { textValue: children } : {})}
			className={(state) =>
				cn(
					"flex cursor-default items-center gap-0.75 rounded-md bg-bg text-fg-secondary ring-1 ring-border outline-none transition duration-50 ease-linear ring-inset focus-visible:ring-2 focus-visible:ring-brand-500/22",
					tagStyles[context.size].root.base,
					avatarSrc && tagStyles[context.size].root.withAvatar,
					(onClose || state.allowsRemoving) && tagStyles[context.size].root.withClose,
					dot && tagStyles[context.size].root.withDot,
					typeof count === "number" && tagStyles[context.size].root.withCount,
					context.selectionMode !== "none" && tagStyles[context.size].root.withCheckbox,
					isDisabled && "cursor-not-allowed opacity-50",
					typeof className === "function" ? className(state) : className
				)
			}
		>
			{({ isSelected, isDisabled: tagDisabled, allowsRemoving }) => (
				<>
					<div className={cn("flex items-center gap-1", tagStyles[context.size].content)}>
						{context.selectionMode !== "none" && (
							<TagCheckbox size={context.size} isSelected={isSelected} isDisabled={tagDisabled} />
						)}

						{leadingContent}

						{children}

						{typeof count === "number" && (
							<span
								className={cn(
									"flex items-center justify-center rounded-[3px] bg-bg-tertiary text-center",
									tagStyles[context.size].count
								)}
							>
								{count}
							</span>
						)}
					</div>

					{(onClose || allowsRemoving) && (
						<TagCloseX
							size={context.size}
							excludeFromTabOrder={allowsRemoving}
							onPress={() => id && onClose?.(id.toString())}
						/>
					)}
				</>
			)}
		</AriaTag>
	);
};

Tag.displayName = "Tag";
