"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/modals/modal.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { ReactNode } from "react";
import { forwardRef } from "react";
import type {
	DialogProps as AriaDialogProps,
	ModalOverlayProps as AriaModalOverlayProps,
} from "react-aria-components";
import {
	Dialog as AriaDialog,
	DialogTrigger as AriaDialogTrigger,
	Modal as AriaModal,
	ModalOverlay as AriaModalOverlay,
} from "react-aria-components";
import { cn } from "../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps extends AriaModalOverlayProps {
	/** Width of the modal panel. @default "md" */
	size?: ModalSize;
}

export interface ModalHeaderProps {
	children?: ReactNode;
	className?: string;
}

export interface ModalBodyProps {
	children?: ReactNode;
	className?: string;
}

export interface ModalFooterProps {
	children?: ReactNode;
	className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Size map                                                                   */
/* -------------------------------------------------------------------------- */

const panelWidth: Record<ModalSize, string> = {
	sm: "w-full max-w-sm",
	md: "w-full max-w-lg",
	lg: "w-full max-w-2xl",
	xl: "w-full max-w-3xl",
	full: "w-full",
};

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                 */
/* -------------------------------------------------------------------------- */

export const DialogTrigger = AriaDialogTrigger;

export const ModalOverlay = ({ className, ...props }: AriaModalOverlayProps) => (
	<AriaModalOverlay
		{...props}
		className={(state) =>
			cn(
				"fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center px-4",
				"bg-fg/50 backdrop-blur-sm",
				"pt-4 pb-[clamp(16px,8vh,64px)] sm:items-center sm:px-8 sm:pt-8 sm:pb-8",
				state.isEntering && "animate-in fade-in duration-200 ease-out",
				state.isExiting && "animate-out fade-out duration-150 ease-in",
				typeof className === "function" ? className(state) : className,
			)
		}
	/>
);
ModalOverlay.displayName = "ModalOverlay";

export const Modal = ({ size = "md", className, ...props }: ModalProps) => (
	<AriaModal
		{...props}
		className={(state) =>
			cn(
				"rounded-xl bg-bg shadow-xl outline-none sm:rounded-2xl",
				"max-h-[calc(100dvh-6rem)] overflow-hidden",
				panelWidth[size],
				state.isEntering && "animate-in zoom-in-95 duration-200 ease-out",
				state.isExiting && "animate-out zoom-out-95 duration-150 ease-in",
				typeof className === "function" ? className(state) : className,
			)
		}
	/>
);
Modal.displayName = "Modal";

export const Dialog = ({ className, ...props }: AriaDialogProps) => (
	<AriaDialog
		{...props}
		className={cn(
			"relative flex max-h-[inherit] w-full flex-col overflow-y-auto outline-none",
			typeof className === "string" ? className : undefined,
		)}
	/>
);
Dialog.displayName = "Dialog";

/* -------------------------------------------------------------------------- */
/*  Helper sub-components                                                      */
/* -------------------------------------------------------------------------- */

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
	({ children, className }, ref) => (
		<div
			ref={ref}
			data-slot="modal-header"
			className={cn("flex flex-col gap-1 px-6 pt-6 pb-4", className)}
		>
			{children}
		</div>
	),
);
ModalHeader.displayName = "ModalHeader";

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
	({ children, className }, ref) => (
		<div
			ref={ref}
			data-slot="modal-body"
			className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
		>
			{children}
		</div>
	),
);
ModalBody.displayName = "ModalBody";

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
	({ children, className }, ref) => (
		<div
			ref={ref}
			data-slot="modal-footer"
			className={cn(
				"flex items-center justify-end gap-3 border-t border-border px-6 py-4",
				className,
			)}
		>
			{children}
		</div>
	),
);
ModalFooter.displayName = "ModalFooter";
