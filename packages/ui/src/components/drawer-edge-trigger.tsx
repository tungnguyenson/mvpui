"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
	type TouchEvent as ReactTouchEvent,
	useCallback,
	useRef,
} from "react";
import { cn } from "../lib/cn.js";

/* ==========================================================================
   DrawerEdgeTrigger — invisible touch zone hugging a viewport edge that
   fires `onOpen` when the user swipes inward past a threshold. Pairs with
   `<Drawer side="left" />` / `<Drawer side="right" />` to give the native
   iOS / Android pattern of "swipe from edge to reveal nav".

   Mobile only (hidden on md+). Mouse / pointer-with-no-touch is ignored —
   desktop users open the drawer via the explicit toggle button.

   Known limitation: in regular browser tabs the horizontal edge-swipe
   collides with the browser's own back / forward history gesture (iOS
   Safari, Chrome Android, etc.). The component is only useful when the
   app is installed as a PWA (display: standalone), where the browser
   gives up the edge gesture. Don't wire this into a plain web app —
   ship the explicit hamburger / toggle button instead and reach for
   `DrawerEdgeTrigger` only inside an installed PWA shell.
   ========================================================================== */

export interface DrawerEdgeTriggerProps {
	/** Viewport edge to listen on. Must match the paired drawer's `side`. */
	side: "left" | "right";
	/** Called once when the swipe distance exceeds `threshold`. */
	onOpen: () => void;
	/** Width of the active touch zone in px. @default 20 */
	edgeWidth?: number;
	/** Min horizontal swipe distance (px) to fire onOpen. @default 40 */
	threshold?: number;
	/** Disable the trigger (e.g. while the drawer is already open). */
	disabled?: boolean;
	className?: string;
}

export const DrawerEdgeTrigger = ({
	side,
	onOpen,
	edgeWidth = 20,
	threshold = 40,
	disabled = false,
	className,
}: DrawerEdgeTriggerProps) => {
	const startX = useRef<number | null>(null);
	const startY = useRef<number | null>(null);
	const direction = useRef<"x" | "y" | null>(null);
	const fired = useRef(false);

	const reset = useCallback(() => {
		startX.current = null;
		startY.current = null;
		direction.current = null;
		fired.current = false;
	}, []);

	const onTouchStart = useCallback(
		(e: ReactTouchEvent<HTMLDivElement>) => {
			if (disabled) return;
			const t = e.touches[0];
			if (!t) return;
			startX.current = t.clientX;
			startY.current = t.clientY;
			direction.current = null;
			fired.current = false;
		},
		[disabled],
	);

	const onTouchMove = useCallback(
		(e: ReactTouchEvent<HTMLDivElement>) => {
			if (disabled) return;
			if (startX.current == null || startY.current == null) return;
			if (fired.current) return;
			const t = e.touches[0];
			if (!t) return;
			const dx = t.clientX - startX.current;
			const dy = t.clientY - startY.current;

			if (direction.current == null) {
				if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
				direction.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
				if (direction.current === "y") return;
			}

			const openDx = side === "left" ? dx : -dx;
			if (openDx >= threshold) {
				fired.current = true;
				onOpen();
			}
		},
		[disabled, side, threshold, onOpen],
	);

	if (disabled) return null;

	return (
		<div
			className={cn(
				"md:hidden fixed top-0 bottom-0 z-30 touch-pan-y",
				side === "left" ? "left-0" : "right-0",
				className,
			)}
			style={{ width: edgeWidth }}
			aria-hidden
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={reset}
			onTouchCancel={reset}
		/>
	);
};

DrawerEdgeTrigger.displayName = "DrawerEdgeTrigger";
