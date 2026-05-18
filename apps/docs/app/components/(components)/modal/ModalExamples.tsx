"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import {
	Button,
	CloseButton,
	Dialog,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@mvp-ui/ui";

/* -------------------------------------------------------------------------- */
/*  DefaultModalDemo                                                           */
/* -------------------------------------------------------------------------- */

export function DefaultModalDemo() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex justify-center">
			<Button onClick={() => setIsOpen(true)}>Open Modal</Button>

			<ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen}>
				<Modal>
					<Dialog>
						{({ close }) => (
							<>
								<ModalHeader>
									<div className="flex items-start justify-between gap-4">
										<div>
											<h2 className="text-lg font-semibold text-fg">
												Confirm action
											</h2>
											<p className="mt-1 text-sm text-fg-tertiary">
												This action cannot be undone. Are you sure you want
												to continue?
											</p>
										</div>
										<CloseButton onClick={close} className="shrink-0" />
									</div>
								</ModalHeader>
								<ModalBody>
									<p className="text-sm text-fg-secondary">
										Your data will be permanently deleted from our servers.
										Exported copies may still exist on your local machine.
									</p>
								</ModalBody>
								<ModalFooter>
									<Button color="secondary" onClick={close}>
										Cancel
									</Button>
									<Button color="primary" onClick={close}>
										Confirm
									</Button>
								</ModalFooter>
							</>
						)}
					</Dialog>
				</Modal>
			</ModalOverlay>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  SizeVariantsDemo                                                           */
/* -------------------------------------------------------------------------- */

type ModalSizeValue = "sm" | "md" | "lg" | "xl";

function SizeDemo({ size }: { size: ModalSizeValue }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Button color="secondary" size="sm" onClick={() => setIsOpen(true)}>
				{size.toUpperCase()}
			</Button>

			<ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen}>
				<Modal size={size}>
					<Dialog>
						{({ close }) => (
							<>
								<ModalHeader>
									<div className="flex items-start justify-between gap-4">
										<h2 className="text-lg font-semibold text-fg">
											Size: {size}
										</h2>
										<CloseButton onClick={close} className="shrink-0" />
									</div>
								</ModalHeader>
								<ModalBody>
									<p className="text-sm text-fg-secondary">
										This is the{" "}
										<code className="rounded bg-bg-secondary px-1 py-0.5 text-xs font-mono text-fg">
											{size}
										</code>{" "}
										modal variant. Use larger sizes when displaying forms, tables,
										or rich content that needs more horizontal space.
									</p>
								</ModalBody>
								<ModalFooter>
									<Button color="secondary" onClick={close}>
										Close
									</Button>
								</ModalFooter>
							</>
						)}
					</Dialog>
				</Modal>
			</ModalOverlay>
		</>
	);
}

export function SizeVariantsDemo() {
	const sizes: ModalSizeValue[] = ["sm", "md", "lg", "xl"];

	return (
		<div className="flex flex-wrap justify-center gap-3">
			{sizes.map((size) => (
				<SizeDemo key={size} size={size} />
			))}
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  DestructiveModalDemo                                                       */
/* -------------------------------------------------------------------------- */

export function DestructiveModalDemo() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex justify-center">
			<Button color="primary-destructive" onClick={() => setIsOpen(true)}>
				Delete account
			</Button>

			<ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen}>
				<Modal size="sm">
					<Dialog>
						{({ close }) => (
							<>
								<ModalHeader>
									<div className="flex items-start justify-between gap-4">
										<h2 className="text-lg font-semibold text-fg">
											Delete account?
										</h2>
										<CloseButton onClick={close} className="shrink-0" />
									</div>
								</ModalHeader>
								<ModalBody>
									<p className="text-sm text-fg-secondary">
										This will permanently delete your account and all associated
										data. This action is irreversible.
									</p>
								</ModalBody>
								<ModalFooter>
									<Button color="secondary" className="flex-1" onClick={close}>
										Cancel
									</Button>
									<Button
										color="primary-destructive"
										className="flex-1"
										onClick={close}
									>
										Delete
									</Button>
								</ModalFooter>
							</>
						)}
					</Dialog>
				</Modal>
			</ModalOverlay>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  ControlledModalDemo                                                        */
/* -------------------------------------------------------------------------- */

export function ControlledModalDemo() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex flex-col items-center gap-3">
			<Button onClick={() => setIsOpen(true)}>Open modal</Button>

			<ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen}>
				<Modal>
					<Dialog>
						{({ close }) => (
							<>
								<ModalHeader>
									<div className="flex items-start justify-between gap-4">
										<h2 className="text-lg font-semibold text-fg">
											Controlled modal
										</h2>
										<CloseButton onClick={close} className="shrink-0" />
									</div>
								</ModalHeader>
								<ModalBody>
									<p className="text-sm text-fg-secondary">
										Open/close state is controlled externally via{" "}
										<code className="rounded bg-bg-secondary px-1 py-0.5 text-xs font-mono text-fg">
											isOpen
										</code>{" "}
										and{" "}
										<code className="rounded bg-bg-secondary px-1 py-0.5 text-xs font-mono text-fg">
											onOpenChange
										</code>
										. Both overlay click and Escape close it.
									</p>
								</ModalBody>
								<ModalFooter>
									<Button color="secondary" onClick={close}>
										Close
									</Button>
								</ModalFooter>
							</>
						)}
					</Dialog>
				</Modal>
			</ModalOverlay>

			<p className="text-sm text-fg-tertiary">
				Modal is {isOpen ? "open" : "closed"}
			</p>
		</div>
	);
}
