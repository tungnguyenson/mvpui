"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	type ReactNode,
	forwardRef,
	useId,
} from "react";
import { X } from "lucide-react";
import {
	Dialog as AriaDialog,
	Modal as AriaModal,
	ModalOverlay as AriaModalOverlay,
	type ModalOverlayProps as AriaModalOverlayProps,
} from "react-aria-components";
import { cn } from "../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type DrawerSide = "left" | "right";
export type DrawerSize = "sm" | "md" | "lg";

export interface DrawerProps extends Omit<AriaModalOverlayProps, "className" | "style"> {
	/** Which edge the drawer slides in from. @default "right" */
	side?: DrawerSide;
	/** Width of the drawer panel. @default "md" */
	size?: DrawerSize;
	/** Drawer heading text. When provided, auto-renders a DrawerHeader and sets aria-labelledby. */
	title?: string;
	/** Optional subtitle rendered below the title inside the auto-rendered DrawerHeader. */
	description?: string;
	/** Accessible label fallback when no title is provided (e.g. icon-only drawers). */
	"aria-label"?: string;
	/** Additional class name for the panel. */
	className?: string;
	/** Render an X button in the overlay area (outside the panel). @default false */
	showCloseButton?: boolean;
	children?: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Size map                                                                   */
/* -------------------------------------------------------------------------- */

const panelWidth: Record<DrawerSize, string> = {
	sm: "w-80",
	md: "w-96",
	lg: "w-128",
};

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

export interface DrawerHeaderProps {
	children?: ReactNode;
	className?: string;
}

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
	({ children, className }, ref) => (
		<div
			ref={ref}
			data-slot="drawer-header"
			className={cn("flex flex-col gap-1 px-6 py-5 border-b border-border", className)}
		>
			{children}
		</div>
	),
);
DrawerHeader.displayName = "DrawerHeader";

export interface DrawerBodyProps {
	children?: ReactNode;
	className?: string;
}

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
	({ children, className }, ref) => (
		<div
			ref={ref}
			data-slot="drawer-body"
			className={cn("flex-1 overflow-y-auto px-6 py-5", className)}
		>
			{children}
		</div>
	),
);
DrawerBody.displayName = "DrawerBody";

export interface DrawerFooterProps {
	children?: ReactNode;
	className?: string;
}

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
	({ children, className }, ref) => (
		<div
			ref={ref}
			data-slot="drawer-footer"
			className={cn("flex items-center gap-3 px-6 py-4 border-t border-border", className)}
		>
			{children}
		</div>
	),
);
DrawerFooter.displayName = "DrawerFooter";

/* -------------------------------------------------------------------------- */
/*  Drawer root                                                                */
/* -------------------------------------------------------------------------- */

export const Drawer = ({
	side = "right",
	size = "md",
	title,
	description,
	isDismissable = true,
	showCloseButton = false,
	children,
	className,
	"aria-label": ariaLabel,
	...props
}: DrawerProps) => {
	const isRight = side === "right";
	const titleId = useId();

	return (
		<AriaModalOverlay
			isDismissable={isDismissable}
			{...props}
			className={({ isEntering, isExiting }) =>
				cn(
					"fixed inset-0 z-50 flex",
					isRight ? "justify-end" : "justify-start",
					"bg-fg/40 backdrop-blur-sm",
					isEntering && "animate-in fade-in duration-200 ease-out",
					isExiting && "animate-out fade-out duration-150 ease-in",
				)
			}
		>
			{showCloseButton && (
				<button
					type="button"
					aria-label="Close"
					onClick={() => props.onOpenChange?.(false)}
					className={cn(
						"absolute top-2 z-10 flex h-10 w-10 items-center justify-center rounded-lg text-white/80 hover:text-white transition-colors",
						isRight ? "left-2" : "right-2",
					)}
				>
					<X className="size-5" />
				</button>
			)}
			<AriaModal
				className={({ isEntering, isExiting }) =>
					cn(
						"flex h-full flex-col bg-bg shadow-2xl outline-none",
						panelWidth[size],
						isRight
							? [
								isEntering && "animate-in slide-in-from-right duration-300 ease-out",
								isExiting && "animate-out slide-out-to-right duration-200 ease-in",
							]
							: [
								isEntering && "animate-in slide-in-from-left duration-300 ease-out",
								isExiting && "animate-out slide-out-to-left duration-200 ease-in",
							],
					)
				}
			>
				<AriaDialog
					{...(title ? { "aria-labelledby": titleId } : ariaLabel ? { "aria-label": ariaLabel } : {})}
					className="flex h-full flex-col outline-none"
				>
					{title && (
						<DrawerHeader>
							<h2 id={titleId} className="text-lg font-semibold text-fg">{title}</h2>
							{description && <p className="text-sm text-fg-tertiary">{description}</p>}
						</DrawerHeader>
					)}
					{children}
				</AriaDialog>
			</AriaModal>
		</AriaModalOverlay>
	);
};

Drawer.displayName = "Drawer";
