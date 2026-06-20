import { Bell, Search, Settings } from "lucide-react";
import { Avatar, ButtonUtility, HeaderNav, UntitledLogo } from "@mvp-ui/ui";

const ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "products", label: "Products", href: "/products" },
  { id: "customers", label: "Customers", href: "/customers", badge: "New" },
  { id: "docs", label: "Docs", href: "/docs" },
];

const SUBNAV_ITEMS = [
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

const Actions = () => (
  <>
    <ButtonUtility icon={<Search />} tooltip="Search" color="tertiary" size="sm" />
    <ButtonUtility icon={<Settings />} tooltip="Settings" color="tertiary" size="sm" />
    <ButtonUtility icon={<Bell />} tooltip="Notifications" color="tertiary" size="sm" />
    <Avatar size="sm" initials="OR" alt="Olivia Rhye" className="ml-1" />
  </>
);

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full overflow-hidden rounded-xl ring-1 ring-border">
    {children}
  </div>
);

export const Simple = () => (
  <Frame>
    <HeaderNav activeHref="/products" items={ITEMS} logo={Logo} actions={<Actions />} />
  </Frame>
);

export const Centered = () => (
  <Frame>
    <HeaderNav
      centered
      activeHref="/customers"
      items={ITEMS}
      logo={Logo}
      actions={<Actions />}
    />
  </Frame>
);

export const WithSubNavPills = () => (
  <Frame>
    <HeaderNav
      activeHref="/projects/active"
      items={SUBNAV_ITEMS}
      logo={Logo}
      actions={<Actions />}
    />
  </Frame>
);

export const WithSubNavTabs = () => (
  <Frame>
    <HeaderNav
      secondaryType="tabs"
      activeHref="/projects/active"
      items={SUBNAV_ITEMS}
      logo={Logo}
      actions={<Actions />}
    />
  </Frame>
);
