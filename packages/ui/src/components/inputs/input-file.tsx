/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/input-file.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { forwardRef, type ReactNode, useRef, useState } from "react";
import { cn } from "../../lib/cn.js";
import { Button } from "../buttons/button.js";
import { HintText } from "./hint-text.js";
import { InputBase } from "./input.js";
import { Label } from "./label.js";

/* ==========================================================================
   InputFile — readonly field showing selected file name(s) + an Upload
   button that opens a hidden native file input. Structure adapted from
   Untitled source; composes the NATIVE InputBase + our Button (hybrid
   decision — plan A1 correction note). Tokens are dark-safe aliases.
   ========================================================================== */

function SpinnerIcon({ className }: { className?: string }) {
	return (
		<svg fill="none" viewBox="0 0 16 16" aria-hidden="true" className={className}>
			<circle className="stroke-current opacity-30" cx="8" cy="8" r="6.5" strokeWidth="1.5" />
			<circle
				className="origin-center animate-spin stroke-current"
				cx="8"
				cy="8"
				r="6.5"
				strokeWidth="1.5"
				strokeDasharray="10 40"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export interface InputFileProps {
	/** Field size. @default "sm" */
	size?: "sm" | "md" | "lg";
	/** Label text rendered above the field. */
	label?: string;
	/** Helper / error text rendered below the field. */
	hint?: ReactNode;
	/** Placeholder shown when no file is selected. @default "Choose a file" */
	placeholder?: string;
	/** Disable the control. */
	isDisabled?: boolean;
	/** Error state. */
	isInvalid?: boolean;
	/** Mark required (label `*`). */
	isRequired?: boolean;
	/** Hide the required `*` indicator even when required. */
	hideRequiredIndicator?: boolean;
	/** Accepted MIME types / extensions. */
	acceptedFileTypes?: string[];
	/** Allow selecting multiple files. */
	allowsMultiple?: boolean;
	/** Show a trailing spinner (upload in progress). */
	isLoading?: boolean;
	/** Called with the selected `FileList` (or null). */
	onChange?: (files: FileList | null) => void;
	/** Class name for the outer wrapper. */
	className?: string;
	/** Upload button text. @default "Upload" */
	buttonText?: string;
}

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
	(
		{
			size = "sm",
			label,
			hint,
			placeholder = "Choose a file",
			isDisabled,
			isInvalid,
			isRequired,
			hideRequiredIndicator,
			isLoading,
			acceptedFileTypes,
			allowsMultiple,
			onChange,
			className,
			buttonText = "Upload",
		},
		ref
	) => {
		const inputRef = useRef<HTMLInputElement>(null);
		const [fileNames, setFileNames] = useState("");

		const setRefs = (node: HTMLInputElement | null) => {
			inputRef.current = node;
			if (typeof ref === "function") ref(node);
			else if (ref) ref.current = node;
		};

		const openPicker = () => {
			if (isDisabled) return;
			if (inputRef.current?.value) inputRef.current.value = "";
			inputRef.current?.click();
		};

		const handleChange = () => {
			const files = inputRef.current?.files ?? null;
			setFileNames(
				files && files.length > 0
					? Array.from(files)
							.map((f) => f.name)
							.join(", ")
					: ""
			);
			onChange?.(files);
		};

		return (
			<div className={cn("flex w-full flex-col gap-1.5", className)}>
				{label && (
					<Label isRequired={!hideRequiredIndicator && isRequired} isInvalid={isInvalid}>
						{label}
					</Label>
				)}

				<div className="flex w-full flex-row items-stretch">
					<div className="relative flex min-w-0 flex-1">
						<InputBase
							size={size}
							readOnly
							disabled={isDisabled}
							isInvalid={isInvalid}
							placeholder={placeholder}
							value={fileNames}
							onClick={openPicker}
							wrapperClassName="cursor-pointer rounded-r-none"
							className="cursor-pointer"
						/>
						{isLoading && (
							<SpinnerIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-fg-tertiary" />
						)}
					</div>

					<Button
						type="button"
						color="secondary"
						size={size === "lg" ? "lg" : size}
						onClick={openPicker}
						disabled={isDisabled}
						className="-ml-px rounded-l-none"
					>
						{buttonText}
					</Button>
				</div>

				<input
					ref={setRefs}
					type="file"
					className="hidden"
					disabled={isDisabled}
					accept={acceptedFileTypes?.join(",")}
					multiple={allowsMultiple}
					onChange={handleChange}
				/>

				{hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
			</div>
		);
	}
);

InputFile.displayName = "InputFile";
