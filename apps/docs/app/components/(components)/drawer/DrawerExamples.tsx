"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "@mvp-ui/ui";
import { Button } from "@mvp-ui/ui";

/* -------------------------------------------------------------------------- */
/*  DefaultDrawerDemo — right side (default)                                   */
/* -------------------------------------------------------------------------- */

export function DefaultDrawerDemo() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex justify-center">
			<Button onClick={() => setIsOpen(true)}>Open Drawer</Button>

			<Drawer
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				title="Panel title"
				description="A slide-out panel from the right edge."
			>
				<DrawerBody>
					<p className="text-sm text-fg-secondary">
						Drawer body content goes here. This area scrolls when content
						overflows. Use it for forms, settings, detail views, or any
						secondary UI that doesn&apos;t need a full page.
					</p>
					<div className="mt-4 flex flex-col gap-3">
						{Array.from({ length: 6 }, (_, i) => (
							<div
								key={i}
								className="rounded-lg border border-border bg-bg-secondary p-3"
							>
								<p className="text-sm font-medium text-fg">Item {i + 1}</p>
								<p className="text-xs text-fg-tertiary">Supporting detail text</p>
							</div>
						))}
					</div>
				</DrawerBody>

				<DrawerFooter>
					<Button color="secondary" className="flex-1" onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button className="flex-1" onClick={() => setIsOpen(false)}>
						Save changes
					</Button>
				</DrawerFooter>
			</Drawer>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  LeftDrawerDemo                                                             */
/* -------------------------------------------------------------------------- */

export function LeftDrawerDemo() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex justify-center">
			<Button onClick={() => setIsOpen(true)}>Open Left Drawer</Button>

			<Drawer
				side="left"
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				title="Left panel"
				description="Slides in from the left edge."
			>
				<DrawerBody>
					<p className="text-sm text-fg-secondary">
						Useful for navigation sidebars, filter panels, or contextual toolbars
						that feel natural on the left side of the viewport.
					</p>
					<nav className="mt-4 flex flex-col gap-1">
						{["Dashboard", "Analytics", "Reports", "Settings", "Help"].map(
							(item) => (
								<a
									key={item}
									href="#"
									onClick={(e) => e.preventDefault()}
									className="rounded-lg px-3 py-2 text-sm font-medium text-fg-secondary transition-colors hover:bg-bg-secondary hover:text-fg"
								>
									{item}
								</a>
							),
						)}
					</nav>
				</DrawerBody>

				<DrawerFooter>
					<Button color="secondary" className="w-full" onClick={() => setIsOpen(false)}>
						Close
					</Button>
				</DrawerFooter>
			</Drawer>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  SmallDrawerDemo                                                            */
/* -------------------------------------------------------------------------- */

export function SmallDrawerDemo() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex justify-center">
			<Button onClick={() => setIsOpen(true)}>Open Small Drawer</Button>

			<Drawer
				size="sm"
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				aria-label="Small drawer"
			>
				<DrawerHeader>
					<h2 className="text-lg font-semibold text-fg">Quick view</h2>
				</DrawerHeader>

				<DrawerBody>
					<p className="text-sm text-fg-secondary">
						The small size (<code className="rounded bg-bg-tertiary px-1 py-0.5 text-xs font-mono text-fg">w-80</code>) suits compact
						confirmations, quick-edit panels, and peek drawers.
					</p>
				</DrawerBody>

				<DrawerFooter>
					<Button color="secondary" className="flex-1" onClick={() => setIsOpen(false)}>
						Dismiss
					</Button>
					<Button className="flex-1" onClick={() => setIsOpen(false)}>
						Confirm
					</Button>
				</DrawerFooter>
			</Drawer>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  LargeDrawerDemo                                                            */
/* -------------------------------------------------------------------------- */

export function LargeDrawerDemo() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex justify-center">
			<Button onClick={() => setIsOpen(true)}>Open Large Drawer</Button>

			<Drawer
				size="lg"
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				aria-label="Large drawer"
			>
				<DrawerHeader>
					<h2 className="text-lg font-semibold text-fg">Detail panel</h2>
					<p className="text-sm text-fg-tertiary">
						Wide format for rich content, multi-step forms, or split layouts.
					</p>
				</DrawerHeader>

				<DrawerBody>
					<div className="grid grid-cols-2 gap-4">
						{Array.from({ length: 4 }, (_, i) => (
							<div
								key={i}
								className="rounded-xl border border-border bg-bg-secondary p-4"
							>
								<div className="mb-2 h-24 rounded-lg bg-bg-tertiary" />
								<p className="text-sm font-medium text-fg">Card {i + 1}</p>
								<p className="text-xs text-fg-tertiary">Description text</p>
							</div>
						))}
					</div>
				</DrawerBody>

				<DrawerFooter>
					<Button color="secondary" className="flex-1" onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button className="flex-1" onClick={() => setIsOpen(false)}>
						Apply
					</Button>
				</DrawerFooter>
			</Drawer>
		</div>
	);
}
