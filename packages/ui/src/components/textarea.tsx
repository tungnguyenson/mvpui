"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/textarea/textarea.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { ReactNode, Ref } from "react";
import React from "react";
import type {
	TextAreaProps as AriaTextAreaProps,
	TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";
import {
	TextArea as AriaTextArea,
	TextField as AriaTextField,
} from "react-aria-components";
import { HintText } from "./inputs/hint-text.js";
import { Label } from "./inputs/label.js";
import { cn } from "../lib/cn.js";

/* ==========================================================================
   TextArea / TextAreaBase — wraps react-aria TextField + TextArea.
   Token mapping (Untitled UI → MVP UI):
   - bg-primary (surface)     → bg-bg
   - text-primary             → text-fg
   - ring-primary (inset)     → ring-border
   - text-placeholder         → text-fg-tertiary
   - autofill:text-primary    → autofill:text-fg
   - ring-brand (focused)     → ring-2 ring-border-brand
   - ring-error_subtle        → ring-border-error
   - ring-error (focused)     → ring-2 ring-border-error
   ========================================================================== */

/**
 * Creates a data URL for an SVG resize handle grip with a given stroke color.
 * Used for the custom webkit-resizer appearance.
 */
const getResizeHandleBg = (color: string): string => {
	return `url(data:image/svg+xml;base64,${btoa(
		`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2L2 10" stroke="${color}" stroke-linecap="round"/><path d="M11 7L7 11" stroke="${color}" stroke-linecap="round"/></svg>`,
	)})`;
};

export interface TextAreaBaseProps extends AriaTextAreaProps {
	ref?: Ref<HTMLTextAreaElement> | undefined;
	size?: "sm" | "md";
}

export const TextAreaBase = ({
	className,
	size = "md",
	...props
}: TextAreaBaseProps) => {
	return (
		<AriaTextArea
			{...props}
			style={
				{
					"--resize-handle-bg": getResizeHandleBg("#D5D7DA"),
					"--resize-handle-bg-dark": getResizeHandleBg("#373A41"),
				} as React.CSSProperties
			}
			className={(state) =>
				cn(
					"w-full scroll-py-3 rounded-lg bg-bg text-fg shadow-xs ring-1 ring-border transition duration-100 ease-linear ring-inset placeholder:text-fg-tertiary autofill:rounded-lg autofill:text-fg focus:outline-hidden",

					size === "sm" && "p-3 text-sm",
					size === "md" && "px-3.5 py-3 text-md",

					// Custom resize handle SVG via CSS custom property
					"[&::-webkit-resizer]:bg-(image:--resize-handle-bg) [&::-webkit-resizer]:bg-contain [data-theme=dark]_&:[&::-webkit-resizer]:bg-(image:--resize-handle-bg-dark)",

					state.isFocused &&
						!state.isDisabled &&
						"ring-2 ring-border-brand",
					state.isDisabled && "cursor-not-allowed opacity-50",
					state.isInvalid && "ring-border-error",
					state.isInvalid &&
						state.isFocused &&
						"ring-2 ring-border-error",

					typeof className === "function" ? className(state) : className,
				)
			}
		/>
	);
};
TextAreaBase.displayName = "TextAreaBase";

export interface TextAreaProps extends AriaTextFieldProps {
	/** Label text for the textarea. */
	label?: string;
	/** Helper text displayed below the textarea. */
	hint?: ReactNode;
	/** Tooltip message displayed after the label. */
	tooltip?: string;
	/** Textarea size. @default "md" */
	size?: TextAreaBaseProps["size"];
	/** Class name for the textarea element. */
	textAreaClassName?: TextAreaBaseProps["className"] | undefined;
	/** Ref for the outer wrapper div. */
	ref?: Ref<HTMLDivElement> | undefined;
	/** Ref for the textarea element. */
	textAreaRef?: TextAreaBaseProps["ref"] | undefined;
	/** Whether to hide the required indicator from label. */
	hideRequiredIndicator?: boolean;
	/** Placeholder text. */
	placeholder?: string;
	/** Visible height of textarea in rows. */
	rows?: number;
	/** Visible width of textarea in columns. */
	cols?: number;
}

export const TextArea = ({
	label,
	hint,
	tooltip,
	textAreaRef,
	hideRequiredIndicator,
	textAreaClassName,
	placeholder,
	className,
	rows,
	cols,
	size = "md",
	...props
}: TextAreaProps) => {
	return (
		<AriaTextField
			{...props}
			className={(state) =>
				cn(
					"group flex h-max w-full flex-col items-start justify-start gap-1.5",
					typeof className === "function" ? className(state) : className,
				)
			}
		>
			{({ isInvalid, isRequired }) => (
				<>
					{label && (
						<Label
							isRequired={
								hideRequiredIndicator ? !hideRequiredIndicator : isRequired
							}
							tooltip={tooltip}
						>
							{label}
						</Label>
					)}

					<TextAreaBase
						placeholder={placeholder}
						{...(textAreaClassName !== undefined && {
							className: textAreaClassName,
						})}
						{...(textAreaRef !== undefined && { ref: textAreaRef })}
						rows={rows}
						cols={cols}
						size={size}
					/>

					{hint && (
						<HintText isInvalid={isInvalid} size={size}>
							{hint}
						</HintText>
					)}
				</>
			)}
		</AriaTextField>
	);
};
TextArea.displayName = "TextArea";
