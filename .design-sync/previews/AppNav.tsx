import {
  BarChart3,
  FileText,
  Home,
  LifeBuoy,
  Settings,
  Users,
} from "lucide-react";
import { AppNav } from "@mvp-ui/ui";

// Icons passed as rendered JSX elements (ReactNode branch) — AppNavItem's isFC
// check only matches plain function components, so lucide forwardRef objects must
// be pre-rendered, not passed as component refs.
const ITEMS = [
  { label: "Home", href: "/", icon: <Home className="size-5" />, active: true },
  {
    label: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="size-5" />,
    badge: "New",
  },
  { label: "Users", href: "/users", icon: <Users className="size-5" />, badge: 8 },
  { label: "Reports", href: "/reports", icon: <FileText className="size-5" /> },
];

const FOOTER_ITEMS = [
  { label: "Support", href: "/support", icon: <LifeBuoy className="size-5" /> },
  { label: "Settings", href: "/settings", icon: <Settings className="size-5" /> },
];

export const Default = () => (
  <div className="h-[420px] overflow-hidden rounded-xl ring-1 ring-border">
    <AppNav
      items={ITEMS}
      logo={<span className="text-base font-semibold text-fg">Acme Co</span>}
      footer={
        <div className="flex flex-col gap-0.5">
          {FOOTER_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-fg-secondary hover:bg-bg-secondary hover:text-fg"
            >
              <span className="flex shrink-0 items-center justify-center text-fg-tertiary">
                {item.icon}
              </span>
              <span className="flex-1 truncate">{item.label}</span>
            </a>
          ))}
        </div>
      }
    />
  </div>
);

export const NoFooter = () => (
  <div className="h-[420px] overflow-hidden rounded-xl ring-1 ring-border">
    <AppNav
      items={ITEMS}
      logo={<span className="text-base font-semibold text-fg">Acme Co</span>}
    />
  </div>
);
