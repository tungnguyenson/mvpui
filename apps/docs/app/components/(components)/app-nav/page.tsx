"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { ComponentDocLayout, type DocExample } from "../../../_components/docs/ComponentDocLayout";
import {
	DefaultNavDemo,
	ActiveStateDemo,
	BadgesDemo,
	NavItemDemo,
} from "./AppNavExamples";

const SECTIONS: DocExample[] = [
	{
		id: "default",
		title: "Default",
		description:
			"Vertical app sidebar with logo, icon-labeled nav items, and a main content area.",
		preview: <DefaultNavDemo />,
		code: `const items = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Analytics", href: "/analytics", icon: BarChartIcon },
  { label: "Team", href: "/team", icon: UsersIcon },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
];

<AppNav items={items} logo={<LogoMark />} />`,
	},
	{
		id: "active-state",
		title: "Active state",
		description:
			"Set `active: true` on the item matching the current route. AppNav is purely presentational — wire `active` from your router.",
		preview: <ActiveStateDemo />,
		code: `const items = navItems.map((item) => ({
  ...item,
  active: item.href === currentPath,
}));

<AppNav items={items} logo={<LogoMark />} />`,
	},
	{
		id: "badges",
		title: "Badges and footer",
		description:
			"Add `badge` (string or number) to items for counts or labels. Use `footer` for a user profile row or secondary actions.",
		preview: <BadgesDemo />,
		code: `const items = [
  { label: "Team", href: "/team", icon: UsersIcon, badge: 3 },
  { label: "Projects", href: "/projects", icon: FolderIcon, badge: 12 },
  { label: "Notifications", href: "/notifications", icon: BellIcon, badge: "New" },
];

<AppNav
  items={items}
  logo={<LogoMark />}
  footer={<UserProfile />}
/>`,
	},
	{
		id: "nav-item",
		title: "AppNavItem standalone",
		description:
			"Use `AppNavItem` directly when you need more control over the list structure.",
		preview: <NavItemDemo />,
		code: `<AppNavItem item={{ label: "Default item", href: "#", icon: HomeIcon }} />
<AppNavItem item={{ label: "Active item", href: "#", icon: BarChartIcon, active: true }} />
<AppNavItem item={{ label: "With badge", href: "#", icon: BellIcon, badge: 5 }} />`,
	},
];

export default function AppNavPage() {
	return (
		<ComponentDocLayout
			name="AppNav"
			tagline="Presentational vertical sidebar navigation. Router-agnostic — wire active state from your routing layer."
			install={{
				usage: `import { AppNav, AppNavItem } from "@mvp-ui/ui/app-nav";`,
			}}
			sections={SECTIONS}
			tokenReference={[
				{ label: "Nav bg", value: "bg-bg" },
				{ label: "Nav border", value: "border-r border-border" },
				{ label: "Item active bg", value: "bg-bg-secondary" },
				{ label: "Item hover bg", value: "bg-bg-secondary" },
				{ label: "Item text", value: "text-fg-secondary" },
				{ label: "Item active text", value: "text-fg" },
				{ label: "Icon active", value: "text-fg-brand" },
				{ label: "Badge active", value: "bg-primary text-primary-fg" },
				{ label: "Badge default", value: "bg-bg-tertiary text-fg-secondary" },
			]}
		/>
	);
}
