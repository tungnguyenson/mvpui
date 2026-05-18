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
      { name: "Button Utility", href: "/components/button-utility" },
      { name: "Close Button", href: "/components/close-button" },
      { name: "Social Button", href: "/components/social-button" },
      { name: "App Store Buttons", href: "/components/app-store-buttons" },
    ],
  },
  {
    title: "Inputs",
    items: [
      { name: "Input", href: "/components/input" },
      { name: "Label", href: "/components/label" },
      { name: "Hint Text", href: "/components/hint-text" },
      { name: "Input Group", href: "/components/input-group" },
      { name: "Input File", href: "/components/input-file" },
      { name: "Input Payment", href: "/components/input-payment" },
      { name: "Input Number", href: "/components/input-number" },
      { name: "Input Date", href: "/components/input-date" },
      { name: "Input Tags", href: "/components/input-tags" },
      { name: "Pin Input", href: "/components/pin-input" },
    ],
  },
  {
    title: "Components",
    items: [
      { name: "Tooltip", href: "/components/tooltip" },
      { name: "Tags", href: "/components/tags" },
      { name: "Card", href: "/components/card" },
      { name: "Badge", href: "/components/badge" },
      { name: "Alert", href: "/components/alert" },
      { name: "Section", href: "/components/section" },
    ],
  },
];

export const examples: NavItem[] = [
  { name: "Auth form", href: "/examples/auth-form" },
  { name: "Settings", href: "/examples/settings" },
];

// Flat list for backwards-compat consumers (layout breadcrumbs etc.)
export const components: NavItem[] = componentSections.flatMap((s) => s.items);
