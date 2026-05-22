"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	type CSSProperties,
	type PointerEvent as ReactPointerEvent,
	type ReactNode,
	forwardRef,
	useCallback,
	useId,
	useRef,
	useState,
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
export type DrawerBackdrop = "blur" | "dim" | "none";

export interface DrawerProps extends Omit<AriaModalOverlayProps, "className" | "style"> {
	/** Which edge the drawer slides in from. @default "right" */
	side?: DrawerSide;
	/** Width of the drawer panel. @default "md" */
	size?: DrawerSize;
	/** Backdrop treatment behind the drawer. @default "blur" */
	backdrop?: DrawerBackdrop;
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
	/** Enable swipe-to-close gesture on touch devices. @default true */
	enableSwipeToClose?: boolean;
	children?: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Size map                                                                   */
/* -------------------------------------------------------------------------- */

const panelWidth: Record<DrawerSize, string> = {
	sm: "w-80 max-w-[85vw]",
	md: "w-96 max-w-[85vw]",
	lg: "w-128 max-w-[90vw]",
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

const backdropClass: Record<DrawerBackdrop, string> = {
	blur: "bg-fg/40 backdrop-blur-sm",
	dim: "bg-fg/40",
	none: "",
};

/** Distance (px) the user must drag past before release-to-close triggers. */
const SWIPE_CLOSE_THRESHOLD = 80;
/** Pointer types that participate in swipe-to-close. Mouse intentionally
 *  excluded — desktop users dismiss via scrim click or ESC. */
const TOUCH_POINTER_TYPES = new Set(["touch", "pen"]);

export const Drawer = ({
	side = "right",
	size = "md",
	backdrop = "blur",
	title,
	description,
	isDismissable = true,
	showCloseButton = false,
	enableSwipeToClose = true,
	children,
	className,
	"aria-label": ariaLabel,
	...props
}: DrawerProps) => {
	const isRight = side === "right";
	const titleId = useId();

	const startXRef = useRef<number | null>(null);
	const startYRef = useRef<number | null>(null);
	const directionLockedRef = useRef<"x" | "y" | null>(null);
	const pointerIdRef = useRef<number | null>(null);
	const [dragOffset, setDragOffset] = useState(0);

	const closeDrawer = useCallback(() => {
		props.onOpenChange?.(false);
	}, [props.onOpenChange]);

	const resetDrag = useCallback(() => {
		startXRef.current = null;
		startYRef.current = null;
		directionLockedRef.current = null;
		pointerIdRef.current = null;
		setDragOffset(0);
	}, []);

	const onPointerDown = useCallback(
		(e: ReactPointerEvent<HTMLDivElement>) => {
			if (!enableSwipeToClose) return;
			if (!TOUCH_POINTER_TYPES.has(e.pointerType)) return;
			startXRef.current = e.clientX;
			startYRef.current = e.clientY;
			directionLockedRef.current = null;
			pointerIdRef.current = e.pointerId;
		},
		[enableSwipeToClose],
	);

	const onPointerMove = useCallback(
		(e: ReactPointerEvent<HTMLDivElement>) => {
			if (startXRef.current == null || startYRef.current == null) return;
			if (e.pointerId !== pointerIdRef.current) return;

			const dx = e.clientX - startXRef.current;
			const dy = e.clientY - startYRef.current;

			// Lock direction on first meaningful movement to avoid hijacking
			// vertical scroll inside the drawer body.
			if (directionLockedRef.current == null) {
				if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
				directionLockedRef.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
				if (directionLockedRef.current === "y") {
					resetDrag();
					return;
				}
			}

			// Close direction: left drawer → negative dx; right drawer → positive dx.
			const closeDx = isRight ? Math.max(0, dx) : Math.min(0, dx);
			setDragOffset(closeDx);
		},
		[isRight, resetDrag],
	);

	const onPointerEnd = useCallback(
		(e: ReactPointerEvent<HTMLDivElement>) => {
			if (e.pointerId !== pointerIdRef.current) return;
			const past = Math.abs(dragOffset) >= SWIPE_CLOSE_THRESHOLD;
			resetDrag();
			if (past) closeDrawer();
		},
		[dragOffset, resetDrag, closeDrawer],
	);

	const panelStyle: CSSProperties =
		dragOffset !== 0
			? { transform: `translateX(${dragOffset}px)`, transition: "none" }
			: {};

	return (
		<AriaModalOverlay
			isDismissable={isDismissable}
			{...props}
			className={({ isEntering, isExiting }) =>
				cn(
					"fixed inset-0 z-50 flex",
					isRight ? "justify-end" : "justify-start",
					backdropClass[backdrop],
					isEntering && "animate-in fade-in duration-200 ease-out",
					isExiting && "animate-out fade-out duration-150 ease-in",
				)
			}
		>
			{showCloseButton && (
				<button
					type="button"
					aria-label="Close"
					onClick={closeDrawer}
					className={cn(
						"absolute z-10 flex size-11 items-center justify-center rounded-lg text-white/80 hover:text-white transition-colors",
						"top-[max(0.5rem,env(safe-area-inset-top))]",
						isRight ? "left-2" : "right-2",
					)}
				>
					<X className="size-5" />
				</button>
			)}
			<AriaModal
				className={({ isEntering, isExiting }) =>
					cn(
						"flex h-full flex-col bg-bg shadow-2xl outline-none pt-safe pb-safe touch-pan-y",
						panelWidth[size],
						className,
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
				style={panelStyle}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerEnd}
				onPointerCancel={onPointerEnd}
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
