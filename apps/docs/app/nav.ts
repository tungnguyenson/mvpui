/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

export interface NavItem {
  name: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const componentSections: NavSection[] = [
  {
    title: "Buttons",
    items: [
      { name: "Button", href: "/components/button" },
      { name: "Utility Buttons", href: "/components/utility-buttons" },
      { name: "Social Button", href: "/components/social-button" },
      { name: "App Store Buttons", href: "/components/app-store-buttons" },
      { name: "Button Group", href: "/components/button-group" },
    ],
  },
  {
    title: "Inputs",
    items: [
      { name: "Input", href: "/components/input" },
      { name: "Label", href: "/components/label" },
      { name: "Hint Text", href: "/components/hint-text" },
      { name: "Input Group", href: "/components/input-group" },
      { name: "Pin Input", href: "/components/pin-input" },
    ],
  },
  {
    title: "Form Controls",
    items: [
      { name: "Checkbox", href: "/components/checkbox" },
      { name: "Radio", href: "/components/radio" },
      { name: "Toggle", href: "/components/toggle" },
      { name: "Textarea", href: "/components/textarea" },
    ],
  },
  {
    title: "Components",
    items: [
      { name: "Avatar", href: "/components/avatar" },
      { name: "Progress", href: "/components/progress" },
      { name: "Featured Icon", href: "/components/featured-icon" },
      { name: "Tooltip", href: "/components/tooltip" },
      { name: "Tags", href: "/components/tags" },
      { name: "Card", href: "/components/card" },
      { name: "Badge", href: "/components/badge" },
      { name: "Alert", href: "/components/alert" },
      { name: "Section", href: "/components/section" },
      { name: "Select", href: "/components/select" },
      { name: "Slider", href: "/components/slider" },
      { name: "Tabs", href: "/components/tabs" },
      { name: "Pagination", href: "/components/pagination" },
      { name: "Empty State", href: "/components/empty-state" },
      { name: "Loading Indicator", href: "/components/loading-indicator" },
      { name: "Badge Group", href: "/components/badge-group" },
      { name: "Dropdown", href: "/components/dropdown" },
      { name: "File Upload Trigger", href: "/components/file-upload-trigger" },
      { name: "Drawer", href: "/components/drawer" },
      { name: "Date Picker", href: "/components/date-picker" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { name: "App Nav", href: "/components/app-nav" },
    ],
  },
  {
    title: "Icons",
    items: [
      { name: "Integration Icons", href: "/components/integration-icons" },
    ],
  },
  {
    title: "Shared Assets",
    items: [
      { name: "Section Divider", href: "/components/section-divider" },
      { name: "iPhone Mockup", href: "/components/iphone-mockup" },
      { name: "Background Pattern", href: "/components/background-pattern" },
      { name: "Illustration", href: "/components/illustration" },
      { name: "Credit Card", href: "/components/credit-card" },
      { name: "QR Code", href: "/components/qr-code" },
    ],
  },
];

export const examples: NavItem[] = [
  { name: "Auth form", href: "/examples/auth-form" },
  { name: "Settings", href: "/examples/settings" },
];

// Flat list for backwards-compat consumers (layout breadcrumbs etc.)
export const components: NavItem[] = componentSections.flatMap((s) => s.items);
