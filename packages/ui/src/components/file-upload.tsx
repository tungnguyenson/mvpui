/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/file-upload/file-upload-base.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import {
	type ComponentPropsWithRef,
	type HTMLAttributes,
	useId,
	useRef,
	useState,
} from "react";
import { cn } from "../lib/cn.js";
import { Button } from "./buttons/button.js";
import { ButtonUtility } from "./buttons/button-utility.js";
import { FeaturedIcon } from "./featured-icon.js";
import { ProgressBar } from "./progress/progress-bar.js";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

export const getReadableFileSize = (bytes: number): string => {
	if (bytes === 0) return "0 B";
	const suffixes = ["B", "KB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${Math.floor(bytes / 1024 ** i)} ${suffixes[i]}`;
};

/* -------------------------------------------------------------------------- */
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */

function UploadCloudIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<path d="M4 15s-1 0-1-1 1-4 5-4c.53 0 1.04.05 1.52.14" />
			<path d="M8 10a6 6 0 0 1 11.47 2.67A4 4 0 0 1 17 20H9a5 5 0 0 1-1-9.9" />
			<path d="M12 12v9" />
			<path d="M9 15l3-3 3 3" />
		</svg>
	);
}

function FileIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
			<path d="M14 2v6h6" />
		</svg>
	);
}

function CheckCircleIcon({ className }: { className?: string }) {
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
			<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
			<path d="M22 4L12 14.01l-3-3" />
		</svg>
	);
}

function XCircleIcon({ className }: { className?: string }) {
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
			<circle cx="12" cy="12" r="10" />
			<path d="M15 9l-6 6M9 9l6 6" />
		</svg>
	);
}

function TrashIcon({ className }: { className?: string }) {
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
			<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14H6L5 6" />
		</svg>
	);
}

/* -------------------------------------------------------------------------- */
/*  FileUploadDropZone                                                         */
/* -------------------------------------------------------------------------- */

export interface FileUploadDropZoneProps {
	className?: string;
	hint?: string;
	isDisabled?: boolean;
	accept?: string;
	allowsMultiple?: boolean;
	maxSize?: number;
	onDropFiles?: (files: FileList) => void;
	onDropUnacceptedFiles?: (files: FileList) => void;
	onSizeLimitExceed?: (files: FileList) => void;
}

export const FileUploadDropZone = ({
	className,
	hint,
	isDisabled,
	accept,
	allowsMultiple = true,
	maxSize,
	onDropFiles,
	onDropUnacceptedFiles,
	onSizeLimitExceed,
}: FileUploadDropZoneProps) => {
	const id = useId();
	const inputRef = useRef<HTMLInputElement>(null);
	const [isInvalid, setIsInvalid] = useState(false);
	const [isDraggingOver, setIsDraggingOver] = useState(false);

	const isFileTypeAccepted = (file: File): boolean => {
		if (!accept) return true;
		const types = accept.split(",").map((t) => t.trim());
		return types.some((accepted) => {
			if (accepted.startsWith("."))
				return `.${file.name.split(".").pop()?.toLowerCase()}` === accepted.toLowerCase();
			if (accepted.endsWith("/*"))
				return file.type.startsWith(`${accepted.split("/")[0]}/`);
			return file.type === accepted;
		});
	};

	const handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
		if (isDisabled) return;
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingOver(true);
	};

	const handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
		if (isDisabled) return;
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingOver(false);
	};

	const processFiles = (files: File[]) => {
		setIsInvalid(false);
		const toProcess = allowsMultiple ? files : files.slice(0, 1);
		const accepted: File[] = [];
		const unaccepted: File[] = [];
		const oversized: File[] = [];

		for (const file of toProcess) {
			if (maxSize && file.size > maxSize) {
				oversized.push(file);
			} else if (isFileTypeAccepted(file)) {
				accepted.push(file);
			} else {
				unaccepted.push(file);
			}
		}

		const makeList = (arr: File[]) => {
			const dt = new DataTransfer();
			arr.forEach((f) => dt.items.add(f));
			return dt.files;
		};

		if (oversized.length > 0) {
			setIsInvalid(true);
			onSizeLimitExceed?.(makeList(oversized));
		}
		if (accepted.length > 0) onDropFiles?.(makeList(accepted));
		if (unaccepted.length > 0) {
			setIsInvalid(true);
			onDropUnacceptedFiles?.(makeList(unaccepted));
		}

		if (inputRef.current) inputRef.current.value = "";
	};

	return (
		<div
			data-dropzone
			onDragOver={handleDragIn}
			onDragEnter={handleDragIn}
			onDragLeave={handleDragOut}
			onDragEnd={handleDragOut}
			onDrop={(e) => {
				handleDragOut(e);
				processFiles(Array.from(e.dataTransfer.files));
			}}
			className={cn(
				"relative flex flex-col items-center gap-3 rounded-xl bg-bg px-6 py-4 text-fg-tertiary ring-1 ring-border transition duration-100 ring-inset",
				isDraggingOver && "ring-2 ring-border-brand bg-bg-secondary",
				isDisabled && "cursor-not-allowed bg-bg-secondary opacity-60",
				className,
			)}
		>
			<FeaturedIcon
				icon={<UploadCloudIcon className="size-5" />}
				color="gray"
				theme="modern"
				size="md"
				className={cn(isDisabled && "opacity-50")}
			/>

			<div className="flex flex-col gap-1 text-center">
				<div className="flex flex-wrap justify-center gap-1 text-center">
					<input
						ref={inputRef}
						id={id}
						type="file"
						className="peer sr-only"
						disabled={isDisabled}
						accept={accept}
						multiple={allowsMultiple}
						onChange={(e) => processFiles(Array.from(e.target.files ?? []))}
					/>
					<label htmlFor={id} className="cursor-pointer">
						<Button
							color="link-color"
							size="md"
							{...(isDisabled !== undefined && { disabled: isDisabled })}
							onClick={() => inputRef.current?.click()}
						>
							Click to upload
						</Button>
					</label>
					<span className="hidden text-sm md:inline">or drag and drop</span>
				</div>
				<p
					className={cn(
						"text-xs transition",
						isInvalid && "text-fg-error",
					)}
				>
					{hint ?? "SVG, PNG, JPG or GIF (max. 800×400px)"}
				</p>
			</div>
		</div>
	);
};

/* -------------------------------------------------------------------------- */
/*  FileListItem (progress bar variant)                                       */
/* -------------------------------------------------------------------------- */

export interface FileListItemProps {
	name: string;
	size: number;
	progress: number;
	failed?: boolean;
	className?: string;
	onDelete?: () => void;
	onRetry?: () => void;
}

export const FileListItemProgressBar = ({
	name,
	size,
	progress,
	failed,
	onDelete,
	onRetry,
	className,
}: FileListItemProps) => {
	const isComplete = progress === 100;

	return (
		<li
			className={cn(
				"flex gap-3 rounded-xl bg-bg p-4 ring-1 ring-border ring-inset transition-shadow",
				failed && "ring-2 ring-border-error",
				className,
			)}
		>
			<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-bg-secondary ring-1 ring-border">
				<FileIcon className="size-5 text-fg-tertiary" />
			</div>

			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex w-full items-start gap-2">
					<div className="min-w-0 flex-1">
						<p className="truncate text-sm font-medium text-fg">{name}</p>
						<div className="mt-0.5 flex items-center gap-2">
							<p className="text-sm text-fg-tertiary">{getReadableFileSize(size)}</p>
							<span className="h-3 w-px bg-border" aria-hidden="true" />
							<div className="flex items-center gap-1">
								{isComplete && (
									<>
										<CheckCircleIcon className="size-4 text-fg-success" />
										<span className="text-sm font-medium text-fg-success">Complete</span>
									</>
								)}
								{!isComplete && !failed && (
									<>
										<UploadCloudIcon className="size-4 text-fg-tertiary" />
										<span className="text-sm font-medium text-fg-tertiary">Uploading…</span>
									</>
								)}
								{failed && (
									<>
										<XCircleIcon className="size-4 text-fg-error" />
										<span className="text-sm font-medium text-fg-error">Failed</span>
									</>
								)}
							</div>
						</div>
					</div>

					<button
						type="button"
						onClick={onDelete}
						aria-label={`Delete ${name}`}
						className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-fg-tertiary hover:bg-bg-secondary hover:text-fg transition-colors"
					>
						<TrashIcon className="size-4" />
					</button>
				</div>

				{!failed && (
					<div className="mt-2 w-full">
						<ProgressBar value={progress} max={100} />
					</div>
				)}

				{failed && (
					<Button
						color="link-destructive"
						size="sm"
						{...(onRetry !== undefined && { onClick: onRetry })}
						className="mt-1.5 self-start"
					>
						Try again
					</Button>
				)}
			</div>
		</li>
	);
};

/* -------------------------------------------------------------------------- */
/*  FileListItem (fill variant)                                               */
/* -------------------------------------------------------------------------- */

export const FileListItemProgressFill = ({
	name,
	size,
	progress,
	failed,
	onDelete,
	onRetry,
	className,
}: FileListItemProps) => {
	const isComplete = progress === 100;

	return (
		<li
			className={cn(
				"relative flex gap-3 overflow-hidden rounded-xl bg-bg p-4 ring-1 ring-border ring-inset transition-shadow",
				failed && "ring-2 ring-border-error",
				className,
			)}
		>
			{/* Fill bar */}
			{!failed && (
				<div
					style={{ transform: `translateX(-${100 - progress}%)` }}
					className={cn(
						"absolute inset-0 size-full bg-bg-secondary transition duration-75 ease-linear",
						isComplete && "opacity-0",
					)}
					role="progressbar"
					aria-valuenow={progress}
					aria-valuemin={0}
					aria-valuemax={100}
				/>
			)}

			<div className="relative flex size-10 shrink-0 items-center justify-center rounded-lg bg-bg-secondary ring-1 ring-border">
				<FileIcon className="size-5 text-fg-tertiary" />
			</div>

			<div className="relative flex min-w-0 flex-1">
				<div className="min-w-0 flex-1">
					<p className="truncate text-sm font-medium text-fg">{name}</p>
					<div className="mt-0.5 flex items-center gap-2">
						<p className="text-sm text-fg-tertiary">
							{failed ? "Upload failed, please try again" : getReadableFileSize(size)}
						</p>
						{!failed && (
							<>
								<span className="h-3 w-px bg-border" aria-hidden="true" />
								<div className="flex items-center gap-1">
									{isComplete ? (
										<CheckCircleIcon className="size-4 text-fg-success" />
									) : (
										<UploadCloudIcon className="size-4 text-fg-tertiary" />
									)}
									<span className="text-sm text-fg-tertiary">{progress}%</span>
								</div>
							</>
						)}
					</div>

					{failed && (
						<Button
							color="link-destructive"
							size="sm"
							{...(onRetry !== undefined && { onClick: onRetry })}
							className="mt-1.5"
						>
							Try again
						</Button>
					)}
				</div>

				<button
					type="button"
					onClick={onDelete}
					aria-label={`Delete ${name}`}
					className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-fg-tertiary hover:bg-bg-secondary hover:text-fg transition-colors"
				>
					<TrashIcon className="size-4" />
				</button>
			</div>
		</li>
	);
};

/* -------------------------------------------------------------------------- */
/*  Compound root + list                                                       */
/* -------------------------------------------------------------------------- */

const FileUploadRoot = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div {...props} className={cn("flex flex-col gap-4", className)} />
);

FileUploadRoot.displayName = "FileUpload.Root";

const FileUploadList = ({
	className,
	...props
}: ComponentPropsWithRef<"ul">) => (
	<ul {...props} className={cn("flex flex-col gap-3", className)} />
);

FileUploadList.displayName = "FileUpload.List";

/* -------------------------------------------------------------------------- */
/*  Compound export                                                            */
/* -------------------------------------------------------------------------- */

export const FileUpload = {
	Root: FileUploadRoot,
	List: FileUploadList,
	DropZone: FileUploadDropZone,
	ListItemProgressBar: FileListItemProgressBar,
	ListItemProgressFill: FileListItemProgressFill,
};
