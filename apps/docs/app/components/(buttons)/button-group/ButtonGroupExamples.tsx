"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import { ButtonGroup, ButtonGroupItem } from "@mvp-ui/ui";

type Key = string | number;

/* -------------------------------------------------------------------------- */
/*  Inline icons (lucide-style SVGs — no @untitledui/icons dep)               */
/* -------------------------------------------------------------------------- */

function ArchiveIcon({ className }: { className?: string }) {
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
			<polyline points="21 8 21 21 3 21 3 8" />
			<rect x="1" y="3" width="22" height="5" />
			<line x1="10" y1="12" x2="14" y2="12" />
		</svg>
	);
}

function EditIcon({ className }: { className?: string }) {
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
			<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
			<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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
			<polyline points="3 6 5 6 21 6" />
			<path d="M19 6l-1 14H6L5 6" />
			<path d="M10 11v6M14 11v6" />
			<path d="M9 6V4h6v2" />
		</svg>
	);
}

function ArrowLeftIcon({ className }: { className?: string }) {
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
			<line x1="19" y1="12" x2="5" y2="12" />
			<polyline points="12 19 5 12 12 5" />
		</svg>
	);
}

function ArrowRightIcon({ className }: { className?: string }) {
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
			<line x1="5" y1="12" x2="19" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</svg>
	);
}

function PlusIcon({ className }: { className?: string }) {
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
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	);
}

function PlaceholderIcon({ className }: { className?: string }) {
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
			<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
		</svg>
	);
}

function DotIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 10 10" aria-hidden="true" className={className}>
			<circle cx="5" cy="5" r="5" fill="currentColor" />
		</svg>
	);
}

/* -------------------------------------------------------------------------- */
/*  Default                                                                    */
/* -------------------------------------------------------------------------- */

export function Default() {
	return (
		<ButtonGroup selectedKeys={[]}>
			<ButtonGroupItem id="archive">Archive</ButtonGroupItem>
			<ButtonGroupItem id="edit">Edit</ButtonGroupItem>
			<ButtonGroupItem id="delete">Delete</ButtonGroupItem>
		</ButtonGroup>
	);
}

/* -------------------------------------------------------------------------- */
/*  LeadingIcon                                                                */
/* -------------------------------------------------------------------------- */

export function LeadingIcon() {
	return (
		<ButtonGroup selectedKeys={[]}>
			<ButtonGroupItem id="archive" iconLeading={ArchiveIcon}>
				Archive
			</ButtonGroupItem>
			<ButtonGroupItem id="edit" iconLeading={EditIcon}>
				Edit
			</ButtonGroupItem>
			<ButtonGroupItem id="delete" iconLeading={TrashIcon}>
				Delete
			</ButtonGroupItem>
		</ButtonGroup>
	);
}

/* -------------------------------------------------------------------------- */
/*  ButtonGroupDot                                                             */
/* -------------------------------------------------------------------------- */

export function ButtonGroupDot() {
	return (
		<ButtonGroup selectedKeys={["archive"]}>
			<ButtonGroupItem
				id="archive"
				iconLeading={<DotIcon className="mx-0.75 size-2 text-fg-success" />}
			>
				Text
			</ButtonGroupItem>
			<ButtonGroupItem
				id="edit"
				iconLeading={<DotIcon className="mx-0.75 size-2 text-fg-success" />}
			>
				Text
			</ButtonGroupItem>
			<ButtonGroupItem
				id="delete"
				isDisabled
				iconLeading={<DotIcon className="mx-0.75 size-2 text-fg-success" />}
			>
				Text
			</ButtonGroupItem>
		</ButtonGroup>
	);
}

/* -------------------------------------------------------------------------- */
/*  DisabledIndividualButton                                                   */
/* -------------------------------------------------------------------------- */

export function DisabledIndividualButton() {
	return (
		<ButtonGroup selectedKeys={[]}>
			<ButtonGroupItem id="archive">Archive</ButtonGroupItem>
			<ButtonGroupItem id="edit">Edit</ButtonGroupItem>
			<ButtonGroupItem isDisabled id="delete">
				Delete
			</ButtonGroupItem>
		</ButtonGroup>
	);
}

/* -------------------------------------------------------------------------- */
/*  DisabledAll                                                                */
/* -------------------------------------------------------------------------- */

export function DisabledAll() {
	return (
		<ButtonGroup isDisabled>
			<ButtonGroupItem id="archive">Archive</ButtonGroupItem>
			<ButtonGroupItem id="edit">Edit</ButtonGroupItem>
			<ButtonGroupItem id="delete">Delete</ButtonGroupItem>
		</ButtonGroup>
	);
}

/* -------------------------------------------------------------------------- */
/*  SelectedItem                                                               */
/* -------------------------------------------------------------------------- */

export function SelectedItem() {
	const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
		new Set(["today"]),
	);

	return (
		<ButtonGroup selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
			<ButtonGroupItem id="today">Today</ButtonGroupItem>
			<ButtonGroupItem id="tomorrow">Tomorrow</ButtonGroupItem>
			<ButtonGroupItem id="thisweek">This week</ButtonGroupItem>
		</ButtonGroup>
	);
}

/* -------------------------------------------------------------------------- */
/*  MultipleSelectedItems                                                      */
/* -------------------------------------------------------------------------- */

export function MultipleSelectedItems() {
	const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
		new Set(["today"]),
	);

	return (
		<ButtonGroup
			selectionMode="multiple"
			selectedKeys={selectedKeys}
			onSelectionChange={setSelectedKeys}
		>
			<ButtonGroupItem id="today">Today</ButtonGroupItem>
			<ButtonGroupItem id="tomorrow">Tomorrow</ButtonGroupItem>
			<ButtonGroupItem id="thisweek">This week</ButtonGroupItem>
		</ButtonGroup>
	);
}

/* -------------------------------------------------------------------------- */
/*  AllSmall                                                                   */
/* -------------------------------------------------------------------------- */

export function AllSmall() {
	return (
		<div className="flex flex-col gap-4">
			<ButtonGroup size="sm" selectedKeys={["archive"]}>
				<ButtonGroupItem id="archive">Archive</ButtonGroupItem>
				<ButtonGroupItem id="edit">Edit</ButtonGroupItem>
				<ButtonGroupItem id="delete" isDisabled>
					Delete
				</ButtonGroupItem>
			</ButtonGroup>

			<ButtonGroup size="sm" selectedKeys={["archive"]}>
				<ButtonGroupItem id="archive" iconLeading={PlaceholderIcon}>
					Archive
				</ButtonGroupItem>
				<ButtonGroupItem id="edit" iconLeading={PlaceholderIcon}>
					Edit
				</ButtonGroupItem>
				<ButtonGroupItem id="delete" isDisabled iconLeading={PlaceholderIcon}>
					Delete
				</ButtonGroupItem>
			</ButtonGroup>

			<ButtonGroup size="sm" selectedKeys={["archive"]}>
				<ButtonGroupItem
					id="archive"
					iconLeading={<DotIcon className="mx-0.75 size-2 text-fg-success" />}
				>
					Archive
				</ButtonGroupItem>
				<ButtonGroupItem
					id="edit"
					iconLeading={<DotIcon className="mx-0.75 size-2 text-fg-success" />}
				>
					Edit
				</ButtonGroupItem>
				<ButtonGroupItem
					id="delete"
					isDisabled
					iconLeading={<DotIcon className="mx-0.75 size-2 text-fg-success" />}
				>
					Delete
				</ButtonGroupItem>
			</ButtonGroup>

			<ButtonGroup size="sm" selectedKeys={["archive"]}>
				<ButtonGroupItem
					id="archive"
					iconLeading={ArrowLeftIcon}
					aria-label="Previous"
				/>
				<ButtonGroupItem
					id="edit"
					iconLeading={PlusIcon}
					aria-label="Add"
				/>
				<ButtonGroupItem
					id="delete"
					isDisabled
					iconLeading={ArrowRightIcon}
					aria-label="Next"
				/>
			</ButtonGroup>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  All                                                                        */
/* -------------------------------------------------------------------------- */

export function All() {
	return (
		<div className="flex flex-col gap-4">
			<ButtonGroup selectedKeys={["archive"]}>
				<ButtonGroupItem id="archive">Archive</ButtonGroupItem>
				<ButtonGroupItem id="edit">Edit</ButtonGroupItem>
				<ButtonGroupItem id="delete" isDisabled>
					Delete
				</ButtonGroupItem>
			</ButtonGroup>

			<ButtonGroup selectedKeys={["archive"]}>
				<ButtonGroupItem id="archive" iconLeading={PlaceholderIcon}>
					Archive
				</ButtonGroupItem>
				<ButtonGroupItem id="edit" iconLeading={PlaceholderIcon}>
					Edit
				</ButtonGroupItem>
				<ButtonGroupItem id="delete" isDisabled iconLeading={PlaceholderIcon}>
					Delete
				</ButtonGroupItem>
			</ButtonGroup>

			<ButtonGroup selectedKeys={["archive"]}>
				<ButtonGroupItem
					id="archive"
					iconLeading={<DotIcon className="mx-0.75 size-2 text-fg-success" />}
				>
					Archive
				</ButtonGroupItem>
				<ButtonGroupItem
					id="edit"
					iconLeading={<DotIcon className="mx-0.75 size-2 text-fg-success" />}
				>
					Edit
				</ButtonGroupItem>
				<ButtonGroupItem
					id="delete"
					isDisabled
					iconLeading={<DotIcon className="mx-0.75 size-2 text-fg-success" />}
				>
					Delete
				</ButtonGroupItem>
			</ButtonGroup>

			<ButtonGroup selectedKeys={["archive"]}>
				<ButtonGroupItem
					id="archive"
					iconLeading={ArrowLeftIcon}
					aria-label="Previous"
				/>
				<ButtonGroupItem
					id="edit"
					iconLeading={PlusIcon}
					aria-label="Add"
				/>
				<ButtonGroupItem
					id="delete"
					isDisabled
					iconLeading={ArrowRightIcon}
					aria-label="Next"
				/>
			</ButtonGroup>
		</div>
	);
}
