"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { HeaderNavItemDef } from "@mvp-ui/ui";
import { Avatar, ButtonUtility, HeaderNav, UntitledLogo } from "@mvp-ui/ui";
import { Bell, Search, Settings } from "lucide-react";
import { ComponentDocLayout, type DocExample } from "../../../_components/docs/ComponentDocLayout";

/* ─── Shared demo data ───────────────────────────────────────────────────── */

const ITEMS: HeaderNavItemDef[] = [
	{ id: "home", label: "Home", href: "/" },
	{ id: "products", label: "Products", href: "/products" },
	{ id: "customers", label: "Customers", href: "/customers", badge: "New" },
	{ id: "docs", label: "Docs", href: "/docs" },
];

const SUBNAV_ITEMS: HeaderNavItemDef[] = [
	{ id: "dashboard", label: "Dashboard", href: "/dashboard" },
	{
		id: "projects",
		label: "Projects",
		href: "/projects",
		items: [
			{ id: "all", label: "All projects", href: "/projects/all" },
			{ id: "active", label: "Active", href: "/projects/active" },
			{ id: "archived", label: "Archived", href: "/projects/archived" },
		],
	},
	{ id: "team", label: "Team", href: "/team" },
	{ id: "reports", label: "Reports", href: "/reports" },
];

const Logo = <UntitledLogo className="h-8" />;

function DemoActions() {
	return (
		<>
			<ButtonUtility icon={<Search />} tooltip="Search" color="tertiary" size="sm" />
			<ButtonUtility icon={<Settings />} tooltip="Settings" color="tertiary" size="sm" />
			<ButtonUtility icon={<Bell />} tooltip="Notifications" color="tertiary" size="sm" />
			<Avatar size="sm" initials="OR" alt="Olivia Rhye" className="ml-1" />
		</>
	);
}

function HeaderDemo({ children }: { children: React.ReactNode }) {
	return <div className="w-full overflow-hidden rounded-xl ring-1 ring-border">{children}</div>;
}

/* ─── Sections ───────────────────────────────────────────────────────────── */

const DOC_SECTIONS = [
	{
		id: "simple",
		title: "Simple",
		description:
			"Logo, a row of nav pills, and a consumer-owned actions slot on the right. One row.",
		preview: (
			<HeaderDemo>
				<HeaderNav activeHref="/products" items={ITEMS} logo={Logo} actions={<DemoActions />} />
			</HeaderDemo>
		),
		code: `<HeaderNav
  activeHref="/products"
  items={[
    { id: "home", label: "Home", href: "/" },
    { id: "products", label: "Products", href: "/products" },
    { id: "customers", label: "Customers", href: "/customers", badge: "New" },
  ]}
  logo={<UntitledLogo className="h-8" />}
  actions={
    <>
      <ButtonUtility icon={<Search />} tooltip="Search" color="tertiary" size="sm" />
      <Avatar size="sm" initials="OR" alt="Olivia Rhye" />
    </>
  }
/>`,
	},
	{
		id: "centered",
		title: "Centered",
		description: "Nav pills centered between the logo (left) and actions (right).",
		preview: (
			<HeaderDemo>
				<HeaderNav
					centered
					activeHref="/customers"
					items={ITEMS}
					logo={Logo}
					actions={<DemoActions />}
				/>
			</HeaderDemo>
		),
		code: `<HeaderNav
  centered
  activeHref="/customers"
  items={items}
  logo={<UntitledLogo className="h-8" />}
  actions={<DemoActions />}
/>`,
	},
	{
		id: "subnav-pills",
		title: "With sub-nav (pills)",
		description:
			"When the active item has children, a second row of pills surfaces its sub-items. The secondary row also appears via an explicit `subItems` prop.",
		preview: (
			<HeaderDemo>
				<HeaderNav
					activeHref="/projects/active"
					items={SUBNAV_ITEMS}
					logo={Logo}
					actions={<DemoActions />}
				/>
			</HeaderDemo>
		),
		code: `<HeaderNav
  activeHref="/projects/active"
  items={[
    { id: "dashboard", label: "Dashboard", href: "/dashboard" },
    {
      id: "projects",
      label: "Projects",
      href: "/projects",
      items: [
        { id: "all", label: "All projects", href: "/projects/all" },
        { id: "active", label: "Active", href: "/projects/active" },
        { id: "archived", label: "Archived", href: "/projects/archived" },
      ],
    },
  ]}
  logo={<UntitledLogo className="h-8" />}
  actions={<DemoActions />}
/>`,
	},
	{
		id: "subnav-tabs",
		title: "With sub-nav (tabs)",
		description: "Same secondary nav rendered as underline tabs instead of pills.",
		preview: (
			<HeaderDemo>
				<HeaderNav
					secondaryType="tabs"
					activeHref="/projects/active"
					items={SUBNAV_ITEMS}
					logo={Logo}
					actions={<DemoActions />}
				/>
			</HeaderDemo>
		),
		code: `<HeaderNav
  secondaryType="tabs"
  activeHref="/projects/active"
  items={subnavItems}
  logo={<UntitledLogo className="h-8" />}
  actions={<DemoActions />}
/>`,
	},
] satisfies DocExample[];

export default function Page() {
	return (
		<ComponentDocLayout
			name="Header Nav"
			tagline="Application top-bar navigation. One component, prop-driven: simple, centered, and an optional secondary row of sub-items (pills or underline tabs). Collapses to a hamburger drawer below lg."
			install={{
				usage: `import { HeaderNav } from "@mvp-ui/ui";`,
			}}
			sections={DOC_SECTIONS}
			tokenReference={[
				{ label: "Surface", value: "bg-bg · border-border-secondary" },
				{ label: "Active pill", value: "bg-bg-secondary · text-fg" },
				{ label: "Inactive pill", value: "text-fg-secondary · hover:bg-bg-secondary" },
				{ label: "Active icon", value: "text-fg-brand" },
				{ label: "Active tab", value: "border-primary · text-fg-brand" },
				{ label: "Badge (active)", value: "bg-primary · text-primary-fg" },
				{ label: "Badge (inactive)", value: "bg-bg-tertiary · text-fg-secondary" },
			]}
		/>
	);
}
