"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import { Select, type SelectItemType } from "@mvp-ui/ui";

/* -------------------------------------------------------------------------- */
/*  Shared items                                                               */
/* -------------------------------------------------------------------------- */

const itemsBase: SelectItemType[] = [
	{ label: "Phoenix Baker", id: "@phoenix", supportingText: "@phoenix" },
	{ label: "Olivia Rhye", id: "@olivia", supportingText: "@olivia" },
	{ label: "Lana Steiner", id: "@lana", supportingText: "@lana", isDisabled: true },
	{ label: "Demi Wilkinson", id: "@demi", supportingText: "@demi" },
	{ label: "Candice Wu", id: "@candice", supportingText: "@candice" },
	{ label: "Natali Craig", id: "@natali", supportingText: "@natali" },
	{ label: "Abraham Baker", id: "@abraham", supportingText: "@abraham" },
	{ label: "Adem Lane", id: "@adem", supportingText: "@adem" },
	{ label: "Jackson Reed", id: "@jackson", supportingText: "@jackson" },
	{ label: "Jessie Meyton", id: "@jessie", supportingText: "@jessie" },
];

const itemsWithAvatar: SelectItemType[] = [
	{
		label: "Phoenix Baker",
		id: "@phoenix",
		supportingText: "@phoenix",
		avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
	},
	{
		label: "Olivia Rhye",
		id: "@olivia",
		supportingText: "@olivia",
		avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
	},
	{
		label: "Lana Steiner",
		id: "@lana",
		supportingText: "@lana",
		avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
	},
	{
		label: "Demi Wilkinson",
		id: "@demi",
		supportingText: "@demi",
		avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
	},
	{
		label: "Candice Wu",
		id: "@candice",
		supportingText: "@candice",
		avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
	},
	{
		label: "Natali Craig",
		id: "@natali",
		supportingText: "@natali",
		avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
	},
	{
		label: "Abraham Baker",
		id: "@abraham",
		supportingText: "@abraham",
		avatarUrl: "https://www.untitledui.com/images/avatars/abraham-baker?fm=webp&q=80",
	},
	{
		label: "Adem Lane",
		id: "@adem",
		supportingText: "@adem",
		avatarUrl: "https://www.untitledui.com/images/avatars/adem-lane?fm=webp&q=80",
	},
	{
		label: "Jackson Reed",
		id: "@jackson",
		supportingText: "@jackson",
		avatarUrl: "https://www.untitledui.com/images/avatars/jackson-reed?fm=webp&q=80",
	},
	{
		label: "Jessie Meyton",
		id: "@jessie",
		supportingText: "@jessie",
		avatarUrl: "https://www.untitledui.com/images/avatars/jessie-meyton?fm=webp&q=80",
	},
];

function UserIcon({ className }: { className?: string }) {
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
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	);
}

function DotIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 10 10"
			aria-hidden="true"
			className={className}
		>
			<circle cx="5" cy="5" r="5" fill="currentColor" />
		</svg>
	);
}

/* -------------------------------------------------------------------------- */
/*  DefaultDemo                                                                */
/* -------------------------------------------------------------------------- */

export function DefaultDemo() {
	return (
		<Select
			isRequired
			label="Team member"
			tooltip="This is a tooltip"
			hint="This is a hint text to help user."
			placeholder="Select team member"
			items={itemsBase}
		>
			{(item) => (
				<Select.Item
					id={item.id}
					supportingText={item.supportingText}
					isDisabled={item.isDisabled}
					icon={item.icon}
					avatarUrl={item.avatarUrl}
				>
					{item.label}
				</Select.Item>
			)}
		</Select>
	);
}

/* -------------------------------------------------------------------------- */
/*  DisabledDemo                                                               */
/* -------------------------------------------------------------------------- */

export function DisabledDemo() {
	return (
		<Select
			isRequired
			isDisabled
			label="Team member"
			tooltip="This is a tooltip"
			hint="This is a hint text to help user."
			placeholder="Select team member"
			items={itemsBase}
		>
			{(item) => (
				<Select.Item
					id={item.id}
					supportingText={item.supportingText}
					isDisabled={item.isDisabled}
					icon={item.icon}
					avatarUrl={item.avatarUrl}
				>
					{item.label}
				</Select.Item>
			)}
		</Select>
	);
}

/* -------------------------------------------------------------------------- */
/*  SizesDemo                                                                  */
/* -------------------------------------------------------------------------- */

export function SizesDemo() {
	return (
		<div className="flex flex-col gap-8">
			<Select
				isRequired
				size="sm"
				label="Team member"
				tooltip="This is a tooltip"
				hint="This is a hint text to help user."
				placeholder="Select team member"
				items={itemsBase}
			>
				{(item) => (
					<Select.Item
						id={item.id}
						supportingText={item.supportingText}
						isDisabled={item.isDisabled}
						icon={item.icon}
						avatarUrl={item.avatarUrl}
					>
						{item.label}
					</Select.Item>
				)}
			</Select>

			<Select
				isRequired
				size="md"
				label="Team member"
				tooltip="This is a tooltip"
				hint="This is a hint text to help user."
				placeholder="Select team member"
				items={itemsBase}
			>
				{(item) => (
					<Select.Item
						id={item.id}
						supportingText={item.supportingText}
						isDisabled={item.isDisabled}
						icon={item.icon}
						avatarUrl={item.avatarUrl}
					>
						{item.label}
					</Select.Item>
				)}
			</Select>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  IconLeadingDemo                                                            */
/* -------------------------------------------------------------------------- */

export function IconLeadingDemo() {
	const iconItems = itemsBase.map((item) => ({ ...item, icon: UserIcon }));
	return (
		<Select
			isRequired
			label="Team member"
			tooltip="This is a tooltip"
			hint="This is a hint text to help user."
			placeholder="Select team member"
			icon={UserIcon}
			items={iconItems}
		>
			{(item) => (
				<Select.Item
					id={item.id}
					supportingText={item.supportingText}
					isDisabled={item.isDisabled}
					icon={item.icon}
					avatarUrl={item.avatarUrl}
				>
					{item.label}
				</Select.Item>
			)}
		</Select>
	);
}

/* -------------------------------------------------------------------------- */
/*  AvatarLeadingDemo                                                          */
/* -------------------------------------------------------------------------- */

export function AvatarLeadingDemo() {
	return (
		<Select
			isRequired
			label="Team member"
			tooltip="This is a tooltip"
			hint="This is a hint text to help user."
			placeholder="Select team member"
			icon={UserIcon}
			items={itemsWithAvatar}
		>
			{(item) => (
				<Select.Item
					id={item.id}
					supportingText={item.supportingText}
					isDisabled={item.isDisabled}
					icon={item.icon}
					avatarUrl={item.avatarUrl}
				>
					{item.label}
				</Select.Item>
			)}
		</Select>
	);
}

/* -------------------------------------------------------------------------- */
/*  DotLeadingDemo                                                             */
/* -------------------------------------------------------------------------- */

export function DotLeadingDemo() {
	const dotItems: SelectItemType[] = itemsBase.map((item) => ({
		...item,
		icon: <DotIcon className="size-2.5 text-fg-success" />,
	}));

	return (
		<Select
			isRequired
			label="Team member"
			tooltip="This is a tooltip"
			hint="This is a hint text to help user."
			placeholder="Select team member"
			icon={<DotIcon className="size-2.5 text-fg-success" />}
			items={dotItems}
		>
			{(item) => (
				<Select.Item
					id={item.id}
					supportingText={item.supportingText}
					isDisabled={item.isDisabled}
					icon={item.icon}
					avatarUrl={item.avatarUrl}
				>
					{item.label}
				</Select.Item>
			)}
		</Select>
	);
}

/* -------------------------------------------------------------------------- */
/*  Default — all sizes                                                        */
/* -------------------------------------------------------------------------- */

export function Default() {
	return (
		<div className="flex flex-col gap-16">
			<div className="flex flex-col gap-4">
				<Select
					isRequired
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					items={itemsBase}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
				<Select
					isDisabled
					isRequired
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					items={itemsBase}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
			</div>
			<div className="flex flex-col gap-4">
				<Select
					isRequired
					size="md"
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					items={itemsBase}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
				<Select
					isDisabled
					isRequired
					size="md"
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					items={itemsBase}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
			</div>
			<div className="flex flex-col gap-4">
				<Select
					isRequired
					size="lg"
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					items={itemsBase}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
				<Select
					isDisabled
					isRequired
					size="lg"
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					items={itemsBase}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
			</div>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  IconLeading — all sizes                                                    */
/* -------------------------------------------------------------------------- */

export function IconLeading() {
	return (
		<div className="flex flex-col gap-16">
			<div className="flex flex-col gap-4">
				<Select
					isRequired
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={UserIcon}
					items={itemsBase.map((item) => ({ ...item, icon: UserIcon }))}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
				<Select
					isRequired
					isDisabled
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={UserIcon}
					items={itemsBase.map((item) => ({ ...item, icon: UserIcon }))}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
			</div>
			<div className="flex flex-col gap-4">
				<Select
					size="md"
					isRequired
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={UserIcon}
					items={itemsBase.map((item) => ({ ...item, icon: UserIcon }))}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
				<Select
					size="md"
					isRequired
					isDisabled
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={UserIcon}
					items={itemsBase.map((item) => ({ ...item, icon: UserIcon }))}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
			</div>
			<div className="flex flex-col gap-4">
				<Select
					size="lg"
					isRequired
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={UserIcon}
					items={itemsBase.map((item) => ({ ...item, icon: UserIcon }))}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
				<Select
					size="lg"
					isRequired
					isDisabled
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={UserIcon}
					items={itemsBase.map((item) => ({ ...item, icon: UserIcon }))}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
			</div>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  AvatarLeading — all sizes                                                  */
/* -------------------------------------------------------------------------- */

export function AvatarLeading() {
	return (
		<div className="flex flex-col gap-16">
			<div className="flex flex-col gap-4">
				<Select
					isRequired
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={UserIcon}
					items={itemsWithAvatar}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
				<Select
					isRequired
					isDisabled
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={UserIcon}
					items={itemsWithAvatar}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
			</div>
			<div className="flex flex-col gap-4">
				<Select
					size="md"
					isRequired
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={UserIcon}
					items={itemsWithAvatar}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
				<Select
					size="md"
					isRequired
					isDisabled
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={UserIcon}
					items={itemsWithAvatar}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
			</div>
			<div className="flex flex-col gap-4">
				<Select
					size="lg"
					isRequired
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={UserIcon}
					items={itemsWithAvatar}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
				<Select
					size="lg"
					isRequired
					isDisabled
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={UserIcon}
					items={itemsWithAvatar}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
			</div>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  DotLeading — all sizes                                                     */
/* -------------------------------------------------------------------------- */

export function DotLeading() {
	return (
		<div className="flex flex-col gap-16">
			<div className="flex flex-col gap-4">
				<Select
					isRequired
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={<DotIcon className="size-2 text-fg-success" />}
					items={itemsBase.map(({ avatarUrl: _, ...item }) => ({
						...item,
						icon: <DotIcon className="size-2 text-fg-success" />,
					}))}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
				<Select
					isDisabled
					isRequired
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={<DotIcon className="size-2 text-fg-success" />}
					items={itemsBase.map(({ avatarUrl: _, ...item }) => ({
						...item,
						icon: <DotIcon className="size-2 text-fg-success" />,
					}))}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
			</div>
			<div className="flex flex-col gap-4">
				<Select
					size="md"
					isRequired
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={<DotIcon className="size-2.5 text-fg-success" />}
					items={itemsBase.map(({ avatarUrl: _, ...item }) => ({
						...item,
						icon: <DotIcon className="size-2.5 text-fg-success" />,
					}))}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
				<Select
					isDisabled
					isRequired
					size="md"
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={<DotIcon className="size-2.5 text-fg-success" />}
					items={itemsBase.map(({ avatarUrl: _, ...item }) => ({
						...item,
						icon: <DotIcon className="size-2.5 text-fg-success" />,
					}))}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
			</div>
			<div className="flex flex-col gap-4">
				<Select
					size="lg"
					isRequired
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={<DotIcon className="size-2.5 text-fg-success" />}
					items={itemsBase.map(({ avatarUrl: _, ...item }) => ({
						...item,
						icon: <DotIcon className="size-2.5 text-fg-success" />,
					}))}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
				<Select
					isDisabled
					isRequired
					size="lg"
					label="Team member"
					tooltip="This is a tooltip"
					hint="This is a hint text to help user."
					placeholder="Select team member"
					icon={<DotIcon className="size-2.5 text-fg-success" />}
					items={itemsBase.map(({ avatarUrl: _, ...item }) => ({
						...item,
						icon: <DotIcon className="size-2.5 text-fg-success" />,
					}))}
				>
					{(item) => (
						<Select.Item
							id={item.id}
							supportingText={item.supportingText}
							isDisabled={item.isDisabled}
							icon={item.icon}
							avatarUrl={item.avatarUrl}
						>
							{item.label}
						</Select.Item>
					)}
				</Select>
			</div>
		</div>
	);
}
