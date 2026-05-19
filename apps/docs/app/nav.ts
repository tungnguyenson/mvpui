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

export interface ExampleGroup {
  name: string;
  href?: string;
  items?: NavItem[];
}

export const componentSections: NavSection[] = [
  {
    title: "Actions",
    items: [
      { name: "Button", href: "/components/button" },
      { name: "Button Group", href: "/components/button-group" },
      { name: "Utility Buttons", href: "/components/utility-buttons" },
      { name: "Social Button", href: "/components/social-button" },
      { name: "App Store Buttons", href: "/components/app-store-buttons" },
    ],
  },
  {
    title: "Form",
    items: [
      { name: "Input", href: "/components/input" },
      { name: "Textarea", href: "/components/textarea" },
      { name: "Pin Input", href: "/components/pin-input" },
      { name: "Label", href: "/components/label" },
      { name: "Hint Text", href: "/components/hint-text" },
      { name: "Checkbox", href: "/components/checkbox" },
      { name: "Radio", href: "/components/radio" },
      { name: "Toggle", href: "/components/toggle" },
      { name: "Slider", href: "/components/slider" },
      { name: "Select", href: "/components/select" },
      { name: "Combobox", href: "/components/combobox" },
      { name: "Multi Select", href: "/components/multi-select" },
      { name: "Tag Select", href: "/components/tag-select" },
      { name: "Date Picker", href: "/components/date-picker" },
      { name: "Date Range Picker", href: "/components/date-range-picker" },
      { name: "File Upload", href: "/components/file-upload" },
      { name: "File Upload Trigger", href: "/components/file-upload-trigger" },
      { name: "Form", href: "/components/form" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { name: "Modal", href: "/components/modal" },
      { name: "Drawer", href: "/components/drawer" },
      { name: "Dropdown", href: "/components/dropdown" },
      { name: "Command Menu", href: "/components/command-menu" },
      { name: "Tooltip", href: "/components/tooltip" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { name: "Alert", href: "/components/alert" },
      { name: "Toast", href: "/components/toast" },
      { name: "Loading Indicator", href: "/components/loading-indicator" },
      { name: "Empty State", href: "/components/empty-state" },
    ],
  },
  {
    title: "Content",
    items: [
      { name: "Avatar", href: "/components/avatar" },
      { name: "Badge", href: "/components/badge" },
      { name: "Badge Group", href: "/components/badge-group" },
      { name: "Card", href: "/components/card" },
      { name: "Tags", href: "/components/tags" },
      { name: "Featured Icon", href: "/components/featured-icon" },
      { name: "Progress", href: "/components/progress" },
      { name: "Rating Stars", href: "/components/rating-stars" },
      { name: "Rating Badge", href: "/components/rating-badge" },
      { name: "Section", href: "/components/section" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { name: "Breadcrumbs", href: "/components/breadcrumbs" },
      { name: "Sidebar Nav", href: "/components/sidebar-nav" },
      { name: "Tabs", href: "/components/tabs" },
      { name: "Pagination", href: "/components/pagination" },
      { name: "Carousel", href: "/components/carousel" },
    ],
  },
  {
    title: "Data",
    items: [
      { name: "Table", href: "/components/table" },
      { name: "Bar Chart", href: "/components/bar-chart" },
      { name: "Line Chart", href: "/components/line-chart" },
      { name: "Pie Chart", href: "/components/pie-chart" },
      { name: "Progress Circle", href: "/components/progress-circle" },
    ],
  },
  {
    title: "Icons",
    items: [
      { name: "Integration Icons", href: "/components/integration-icons" },
      { name: "Social Icons", href: "/components/social-icons" },
      { name: "Payment Icons", href: "/components/payment-icons" },
      { name: "Dot", href: "/components/dot" },
      { name: "Play Button Icon", href: "/components/play-button-icon" },
      { name: "Logo", href: "/components/logo" },
    ],
  },
  {
    title: "Decorative",
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

export const examples: ExampleGroup[] = [
  { name: "Auth form", href: "/examples/auth-form" },
  {
    name: "Settings",
    items: [
      { name: "Settings 01", href: "/examples/settings-01" },
    ],
  },
  {
    name: "Dashboard",
    items: [
      { name: "Dashboard Lite", href: "/examples/dashboard-lite" },
      { name: "Dashboard Dark Nav", href: "/examples/dashboard-dark" },
    ],
  },
];

// Flat list for consumers (breadcrumbs, search, etc.)
export const components: NavItem[] = componentSections.flatMap((s) => s.items);
