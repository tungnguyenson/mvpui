"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { FC } from "react";
import type { SidebarNavItemDef, SidebarNavSectionDef, SidebarNavAccountDef } from "@mvp-ui/ui";
import {
  SidebarNavSimple,
  SidebarNavDualTier,
  SidebarNavSectionDividers,
  SidebarNavSectionsSubheadings,
  SidebarNavSlim,
  SidebarNavCollapsible,
} from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

/* ─── Demo icons ─────────────────────────────────────────────────────────── */

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function BarChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  );
}
function LifebuoyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" /><line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    </svg>
  );
}
function FolderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function InboxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

/* ─── Shared demo data ───────────────────────────────────────────────────── */

const ACCOUNT: SidebarNavAccountDef = {
  name: "Olivia Rhye",
  email: "olivia@untitled.com",
};

const SIMPLE_ITEMS: SidebarNavItemDef[] = [
  { id: "home", label: "Home", href: "/", icon: HomeIcon },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: BarChartIcon, badge: "New" },
  { id: "users", label: "Users", href: "/users", icon: UsersIcon },
  { id: "reports", label: "Reports", href: "/reports", icon: FileTextIcon },
];

const FOOTER_ITEMS: SidebarNavItemDef[] = [
  { id: "support", label: "Support", href: "/support", icon: LifebuoyIcon },
  { id: "settings", label: "Settings", href: "/settings", icon: SettingsIcon },
];

const DUAL_TIER_ITEMS: SidebarNavItemDef[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: BarChartIcon,
    items: [
      { id: "overview", label: "Overview", href: "/analytics/overview" },
      { id: "revenue", label: "Revenue", href: "/analytics/revenue" },
      { id: "conversions", label: "Conversions", href: "/analytics/conversions" },
    ],
  },
  {
    id: "users",
    label: "Users",
    href: "/users",
    icon: UsersIcon,
    items: [
      { id: "all-users", label: "All Users", href: "/users" },
      { id: "segments", label: "Segments", href: "/users/segments" },
      { id: "permissions", label: "Permissions", href: "/users/permissions" },
    ],
  },
  { id: "reports", label: "Reports", href: "/reports", icon: FileTextIcon },
];

const SECTIONS: SidebarNavSectionDef[] = [
  {
    label: "Main",
    items: [
      { id: "home", label: "Home", href: "/", icon: HomeIcon },
      { id: "analytics", label: "Analytics", href: "/analytics", icon: BarChartIcon },
    ],
  },
  {
    label: "Content",
    items: [
      { id: "reports", label: "Reports", href: "/reports", icon: FileTextIcon },
      { id: "files", label: "Files", href: "/files", icon: FolderIcon },
      { id: "inbox", label: "Inbox", href: "/inbox", icon: InboxIcon, badge: 4 },
    ],
  },
  {
    label: "Admin",
    items: [
      { id: "users", label: "Users", href: "/users", icon: UsersIcon },
      { id: "settings", label: "Settings", href: "/settings", icon: SettingsIcon },
    ],
  },
];

const COLLAPSIBLE_SECTIONS: SidebarNavSectionDef[] = [
  {
    label: "Main",
    items: [
      { id: "home", label: "Home", href: "/", icon: HomeIcon },
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: BarChartIcon },
      { id: "projects", label: "Projects", href: "/projects", icon: FileTextIcon },
    ],
  },
  {
    label: "Folders",
    items: [
      {
        id: "folders",
        label: "Folders",
        href: "/folders",
        icon: FolderIcon,
        items: [
          { id: "view-all", label: "View all", href: "/folders", badge: 18 },
          { id: "recent", label: "Recent", href: "/folders/recent", badge: 8 },
          { id: "favorites", label: "Favorites", href: "/folders/favorites", badge: 6 },
          { id: "shared", label: "Shared", href: "/folders/shared", badge: 4 },
        ],
      },
    ],
  },
  {
    label: "Admin",
    items: [
      { id: "reporting", label: "Reporting", href: "/reporting", icon: BarChartIcon },
      { id: "settings", label: "Settings", href: "/settings", icon: SettingsIcon },
      { id: "support", label: "Support", href: "/support", icon: LifebuoyIcon },
    ],
  },
];

type WithIcon = SidebarNavItemDef & { icon: FC<{ className?: string }> };

const SLIM_ITEMS: WithIcon[] = [
  { id: "home", label: "Home", href: "/", icon: HomeIcon, items: [{ id: "dashboard", label: "Dashboard", href: "/" }, { id: "activity", label: "Activity", href: "/activity" }] },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: BarChartIcon, items: [{ id: "overview", label: "Overview", href: "/analytics/overview" }, { id: "revenue", label: "Revenue", href: "/analytics/revenue" }] },
  { id: "users", label: "Users", href: "/users", icon: UsersIcon },
  { id: "files", label: "Files", href: "/files", icon: FolderIcon },
];
const SLIM_FOOTER: WithIcon[] = [
  { id: "support", label: "Support", href: "/support", icon: LifebuoyIcon },
  { id: "settings", label: "Settings", href: "/settings", icon: SettingsIcon },
];

/* ─── Demo wrappers (fixed height containers) ────────────────────────────── */

function SidebarDemo({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-xl ring-1 ring-border">
      {children}
    </div>
  );
}

/* ─── Sections ───────────────────────────────────────────────────────────── */

const DOC_SECTIONS = [
  {
    id: "simple",
    title: "Simple",
    description: "Flat list of nav items with optional footer items, feature card, and account card.",
    preview: (
      <SidebarDemo>
        <SidebarNavSimple
          activeHref="/analytics"
          items={SIMPLE_ITEMS}
          footerItems={FOOTER_ITEMS}
          account={ACCOUNT}
        />
      </SidebarDemo>
    ),
    code: `<SidebarNavSimple
  activeHref="/analytics"
  items={[
    { id: "home", label: "Home", href: "/", icon: HomeIcon },
    { id: "analytics", label: "Analytics", href: "/analytics", icon: BarChartIcon, badge: "New" },
  ]}
  footerItems={[
    { id: "settings", label: "Settings", href: "/settings", icon: SettingsIcon },
  ]}
  account={{ name: "Olivia Rhye", email: "olivia@untitled.com" }}
/>`,
  },
  {
    id: "dual-tier",
    title: "Dual-tier",
    description: "Hover over a top-level item to reveal a secondary sidebar with its sub-items.",
    preview: (
      <SidebarDemo>
        <SidebarNavDualTier
          activeHref="/analytics/revenue"
          items={DUAL_TIER_ITEMS}
          footerItems={FOOTER_ITEMS}
          account={ACCOUNT}
        />
      </SidebarDemo>
    ),
    code: `const items = [
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: BarChartIcon,
    items: [
      { id: "overview", label: "Overview", href: "/analytics/overview" },
      { id: "revenue", label: "Revenue", href: "/analytics/revenue" },
    ],
  },
];

<SidebarNavDualTier
  activeHref="/analytics/revenue"
  items={items}
  account={{ name: "Olivia Rhye", email: "olivia@untitled.com" }}
/>`,
  },
  {
    id: "section-dividers",
    title: "Section Dividers",
    description: "Items grouped into sections separated by horizontal dividers.",
    preview: (
      <SidebarDemo>
        <SidebarNavSectionDividers
          activeHref="/"
          sections={SECTIONS}
          account={ACCOUNT}
        />
      </SidebarDemo>
    ),
    code: `<SidebarNavSectionDividers
  activeHref="/"
  sections={[
    {
      label: "Main",
      items: [
        { id: "home", label: "Home", href: "/", icon: HomeIcon },
        { id: "analytics", label: "Analytics", href: "/analytics", icon: BarChartIcon },
      ],
    },
    {
      label: "Admin",
      items: [
        { id: "users", label: "Users", href: "/users", icon: UsersIcon },
        { id: "settings", label: "Settings", href: "/settings", icon: SettingsIcon },
      ],
    },
  ]}
  account={{ name: "Olivia Rhye", email: "olivia@untitled.com" }}
/>`,
  },
  {
    id: "sections-subheadings",
    title: "Sections + Subheadings",
    description: "Groups with uppercase text labels instead of dividers.",
    preview: (
      <SidebarDemo>
        <SidebarNavSectionsSubheadings
          activeHref="/reports"
          sections={SECTIONS}
          account={ACCOUNT}
        />
      </SidebarDemo>
    ),
    code: `<SidebarNavSectionsSubheadings
  activeHref="/reports"
  sections={[
    {
      label: "Main",
      items: [
        { id: "home", label: "Home", href: "/", icon: HomeIcon },
      ],
    },
    {
      label: "Content",
      items: [
        { id: "reports", label: "Reports", href: "/reports", icon: FileTextIcon },
      ],
    },
  ]}
  account={{ name: "Olivia Rhye", email: "olivia@untitled.com" }}
/>`,
  },
  {
    id: "slim",
    title: "Slim (icon rail)",
    description: "68px icon-only rail. Hover to reveal secondary panel with sub-items.",
    preview: (
      <SidebarDemo>
        <SidebarNavSlim
          activeHref="/analytics/revenue"
          items={SLIM_ITEMS}
          footerItems={SLIM_FOOTER}
          account={ACCOUNT}
        />
      </SidebarDemo>
    ),
    code: `// Items must include icon as FC (not ReactNode) for the slim variant
const items = [
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: BarChartIcon,
    items: [
      { id: "overview", label: "Overview", href: "/analytics/overview" },
      { id: "revenue", label: "Revenue", href: "/analytics/revenue" },
    ],
  },
];

<SidebarNavSlim
  activeHref="/analytics/revenue"
  items={items}
  account={{ name: "Olivia Rhye", email: "olivia@untitled.com" }}
/>`,
  },
  {
    id: "collapsible",
    title: "Collapsible (folders)",
    description: "Items with sub-items expand/collapse inline. Click the parent row to toggle. Active sub-item auto-expands its parent.",
    preview: (
      <SidebarDemo>
        <SidebarNavCollapsible
          activeHref="/folders/recent"
          sections={COLLAPSIBLE_SECTIONS}
          account={ACCOUNT}
        />
      </SidebarDemo>
    ),
    code: `const sections = [
  {
    label: "Main",
    items: [
      { id: "home", label: "Home", href: "/", icon: HomeIcon },
    ],
  },
  {
    label: "Folders",
    items: [
      {
        id: "folders",
        label: "Folders",
        href: "/folders",
        icon: FolderIcon,
        items: [
          { id: "view-all", label: "View all", href: "/folders", badge: 18 },
          { id: "recent", label: "Recent", href: "/folders/recent", badge: 8 },
        ],
      },
    ],
  },
];

<SidebarNavCollapsible
  activeHref="/folders/recent"
  sections={sections}
  account={{ name: "Olivia Rhye", email: "olivia@untitled.com" }}
/>`,
  },
] satisfies DocExample[];

export default function Page() {
  return (
    <ComponentDocLayout
      name="Sidebar Nav"
      tagline="Application sidebar navigation. Six layout variants: simple, dual-tier, section dividers, section subheadings, slim icon rail, and collapsible folders."
      install={{
        usage: `import { SidebarNav, SidebarNavSimple, SidebarNavDualTier } from "@mvp-ui/ui";`,
      }}
      sections={DOC_SECTIONS}
      tokenReference={[
        { label: "Surface", value: "bg-bg · border-border" },
        { label: "Active item", value: "bg-bg-secondary · text-fg" },
        { label: "Hover item", value: "hover:bg-bg-secondary · hover:text-fg" },
        { label: "Active icon", value: "text-fg-brand" },
        { label: "Inactive icon", value: "text-fg-tertiary" },
        { label: "Badge (active)", value: "bg-primary · text-primary-fg" },
        { label: "Badge (inactive)", value: "bg-bg-tertiary · text-fg-secondary" },
        { label: "Section label", value: "text-fg-tertiary" },
      ]}
    />
  );
}
