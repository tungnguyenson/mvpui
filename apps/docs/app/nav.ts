/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

export interface NavItem {
  name: string;
  href: string;
}

export const components: NavItem[] = [
  { name: "Button", href: "/components/button" },
  { name: "Button Utility", href: "/components/button-utility" },
  { name: "Close Button", href: "/components/close-button" },
  { name: "Social Button", href: "/components/social-button" },
  { name: "Input", href: "/components/input" },
  { name: "Label", href: "/components/label" },
  { name: "Card", href: "/components/card" },
  { name: "Badge", href: "/components/badge" },
  { name: "Alert", href: "/components/alert" },
  { name: "Section", href: "/components/section" },
];

export const examples: NavItem[] = [
  { name: "Auth form", href: "/examples/auth-form" },
  { name: "Settings", href: "/examples/settings" },
];
