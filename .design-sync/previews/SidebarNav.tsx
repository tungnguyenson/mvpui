import {
  SidebarNavSimple,
  SidebarNavSectionDividers,
  SidebarNavCollapsible,
} from "@mvp-ui/ui";

/* Plain function-component icons — SidebarNav's icon slot expects an FC (isFC
   check matches `typeof === "function"`), so lucide forwardRef objects won't do. */
const HomeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const BarChartIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const UsersIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const FileTextIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const FolderIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);
const SettingsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
);
const LifebuoyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" /><line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
  </svg>
);

const ACCOUNT = { name: "Olivia Rhye", email: "olivia@untitled.com" };

const SIMPLE_ITEMS = [
  { id: "home", label: "Home", href: "/", icon: HomeIcon },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: BarChartIcon, badge: "New" },
  { id: "users", label: "Users", href: "/users", icon: UsersIcon },
  { id: "reports", label: "Reports", href: "/reports", icon: FileTextIcon },
];
const FOOTER_ITEMS = [
  { id: "support", label: "Support", href: "/support", icon: LifebuoyIcon },
  { id: "settings", label: "Settings", href: "/settings", icon: SettingsIcon },
];

const SECTIONS = [
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

const COLLAPSIBLE_SECTIONS = [
  {
    label: "Main",
    items: [
      { id: "home", label: "Home", href: "/", icon: HomeIcon },
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: BarChartIcon },
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
        ],
      },
    ],
  },
];

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full overflow-hidden rounded-xl ring-1 ring-border">
    {children}
  </div>
);

export const Simple = () => (
  <Frame>
    <SidebarNavSimple
      activeHref="/analytics"
      items={SIMPLE_ITEMS}
      footerItems={FOOTER_ITEMS}
      account={ACCOUNT}
    />
  </Frame>
);

export const SectionDividers = () => (
  <Frame>
    <SidebarNavSectionDividers
      activeHref="/"
      sections={SECTIONS}
      account={ACCOUNT}
    />
  </Frame>
);

export const Collapsible = () => (
  <Frame>
    <SidebarNavCollapsible
      activeHref="/folders/recent"
      sections={COLLAPSIBLE_SECTIONS}
      account={ACCOUNT}
    />
  </Frame>
);
