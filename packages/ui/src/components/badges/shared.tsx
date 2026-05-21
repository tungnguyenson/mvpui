"use client";

import type { FC } from "react";

export type BadgeColor =
  | "gray"
  | "brand"
  | "error"
  | "warning"
  | "success"
  | "slate"
  | "sky"
  | "blue"
  | "indigo"
  | "purple"
  | "pink"
  | "orange";

export type BadgeType = "pill-color" | "color" | "modern";

export type IconProp = FC<{ className?: string }>;

/**
 * Tag/Badge color slots — all four resolve to semantic tokens that flip in
 * `[data-theme="dark"]`. Defined in `@mvp-ui/tokens` (tokens.css + theme.css):
 *
 *   root        = `bg-tag-{c}-bg text-tag-{c}-fg ring-tag-{c}-border`
 *   addon       = `text-tag-{c}-accent`         (dot, leading/trailing icon)
 *   addonButton = `text-tag-{c}-accent hover:text-tag-{c}-fg hover:bg-tag-{c}-border`
 *                  (close button — hover uses border token as a tinted backdrop)
 *
 * Naming note: original Untitled UI source used `brand=purple`, `error=red`,
 * `warning=yellow`, `success=green`. We collapse to the semantic name so the
 * brand badge tracks the project brand color, not a hardcoded purple ramp.
 */
export const filledColors: Record<BadgeColor, { root: string; addon: string; addonButton: string }> = {
  gray:    { root: "bg-tag-gray-bg text-tag-gray-fg ring-tag-gray-border",         addon: "text-tag-gray-accent",    addonButton: "hover:bg-tag-gray-border text-tag-gray-accent hover:text-tag-gray-fg" },
  brand:   { root: "bg-tag-brand-bg text-tag-brand-fg ring-tag-brand-border",      addon: "text-tag-brand-accent",   addonButton: "hover:bg-tag-brand-border text-tag-brand-accent hover:text-tag-brand-fg" },
  error:   { root: "bg-tag-error-bg text-tag-error-fg ring-tag-error-border",      addon: "text-tag-error-accent",   addonButton: "hover:bg-tag-error-border text-tag-error-accent hover:text-tag-error-fg" },
  warning: { root: "bg-tag-warning-bg text-tag-warning-fg ring-tag-warning-border",addon: "text-tag-warning-accent", addonButton: "hover:bg-tag-warning-border text-tag-warning-accent hover:text-tag-warning-fg" },
  success: { root: "bg-tag-success-bg text-tag-success-fg ring-tag-success-border",addon: "text-tag-success-accent", addonButton: "hover:bg-tag-success-border text-tag-success-accent hover:text-tag-success-fg" },
  slate:   { root: "bg-tag-slate-bg text-tag-slate-fg ring-tag-slate-border",      addon: "text-tag-slate-accent",   addonButton: "hover:bg-tag-slate-border text-tag-slate-accent hover:text-tag-slate-fg" },
  sky:     { root: "bg-tag-sky-bg text-tag-sky-fg ring-tag-sky-border",            addon: "text-tag-sky-accent",     addonButton: "hover:bg-tag-sky-border text-tag-sky-accent hover:text-tag-sky-fg" },
  blue:    { root: "bg-tag-blue-bg text-tag-blue-fg ring-tag-blue-border",         addon: "text-tag-blue-accent",    addonButton: "hover:bg-tag-blue-border text-tag-blue-accent hover:text-tag-blue-fg" },
  indigo:  { root: "bg-tag-indigo-bg text-tag-indigo-fg ring-tag-indigo-border",   addon: "text-tag-indigo-accent",  addonButton: "hover:bg-tag-indigo-border text-tag-indigo-accent hover:text-tag-indigo-fg" },
  purple:  { root: "bg-tag-purple-bg text-tag-purple-fg ring-tag-purple-border",   addon: "text-tag-purple-accent",  addonButton: "hover:bg-tag-purple-border text-tag-purple-accent hover:text-tag-purple-fg" },
  pink:    { root: "bg-tag-pink-bg text-tag-pink-fg ring-tag-pink-border",         addon: "text-tag-pink-accent",    addonButton: "hover:bg-tag-pink-border text-tag-pink-accent hover:text-tag-pink-fg" },
  orange:  { root: "bg-tag-orange-bg text-tag-orange-fg ring-tag-orange-border",   addon: "text-tag-orange-accent",  addonButton: "hover:bg-tag-orange-border text-tag-orange-accent hover:text-tag-orange-fg" },
};

export const PILL_SIZE = {
  sm: "py-0.5 px-2 text-xs font-medium",
  md: "py-0.5 px-2.5 text-sm font-medium",
  lg: "py-1 px-3 text-sm font-medium",
} as const;

export const BADGE_SIZE = {
  sm: "py-0.5 px-1.5 text-xs font-medium",
  md: "py-0.5 px-2 text-sm font-medium",
  lg: "py-1 px-2.5 text-sm font-medium rounded-lg",
} as const;

export const PILL_DOT_SIZE = {
  sm: "gap-1 py-0.5 pl-1.5 pr-2 text-xs font-medium",
  md: "gap-1.5 py-0.5 pl-2 pr-2.5 text-sm font-medium",
  lg: "gap-1.5 py-1 pl-2.5 pr-3 text-sm font-medium",
} as const;

export const BADGE_DOT_SIZE = {
  sm: "gap-1 py-0.5 px-1.5 text-xs font-medium",
  md: "gap-1.5 py-0.5 px-2 text-sm font-medium",
  lg: "gap-1.5 py-1 px-2.5 text-sm font-medium rounded-lg",
} as const;

export const PILL_ICON_SIZE = {
  sm: { leading: "gap-0.5 py-0.5 pr-2 pl-1.5 text-xs font-medium", trailing: "gap-0.5 py-0.5 pl-2 pr-1.5 text-xs font-medium" },
  md: { leading: "gap-1 py-0.5 pr-2.5 pl-2 text-sm font-medium",   trailing: "gap-1 py-0.5 pl-2.5 pr-2 text-sm font-medium" },
  lg: { leading: "gap-1 py-1 pr-3 pl-2.5 text-sm font-medium",     trailing: "gap-1 py-1 pl-3 pr-2.5 text-sm font-medium" },
} as const;

export const BADGE_ICON_SIZE = {
  sm: { leading: "gap-0.5 py-0.5 pr-2 pl-1.5 text-xs font-medium",             trailing: "gap-0.5 py-0.5 pl-2 pr-1.5 text-xs font-medium" },
  md: { leading: "gap-1 py-0.5 pr-2 pl-1.5 text-sm font-medium",               trailing: "gap-1 py-0.5 pl-2 pr-1.5 text-sm font-medium" },
  lg: { leading: "gap-1 py-1 pr-2.5 pl-2 text-sm font-medium rounded-lg",      trailing: "gap-1 py-1 pl-2.5 pr-2 text-sm font-medium rounded-lg" },
} as const;

export const PILL_FLAG_SIZE = {
  sm: "gap-1 py-0.5 pl-0.75 pr-2 text-xs font-medium",
  md: "gap-1.5 py-0.5 pl-1 pr-2.5 text-sm font-medium",
  lg: "gap-1.5 py-1 pl-1.5 pr-3 text-sm font-medium",
} as const;

export const BADGE_FLAG_SIZE = {
  sm: "gap-1 py-0.5 pl-1 pr-1.5 text-xs font-medium",
  md: "gap-1.5 py-0.5 pl-1.5 pr-2 text-sm font-medium",
  lg: "gap-1.5 py-1 pl-2 pr-2.5 text-sm font-medium rounded-lg",
} as const;

export const PILL_BTN_SIZE = {
  sm: "gap-0.5 py-0.5 pl-2 pr-0.75 text-xs font-medium",
  md: "gap-0.5 py-0.5 pl-2.5 pr-1 text-sm font-medium",
  lg: "gap-0.5 py-1 pl-3 pr-1.5 text-sm font-medium",
} as const;

export const BADGE_BTN_SIZE = {
  sm: "gap-0.5 py-0.5 pl-1.5 pr-0.75 text-xs font-medium",
  md: "gap-0.5 py-0.5 pl-2 pr-1 text-sm font-medium",
  lg: "gap-0.5 py-1 pl-2.5 pr-1.5 text-sm font-medium rounded-lg",
} as const;

export const ICON_ONLY_PILL_SIZE = { sm: "p-1.25", md: "p-1.5", lg: "p-2" } as const;
export const ICON_ONLY_BADGE_SIZE = { sm: "p-1.25", md: "p-1.5", lg: "p-2 rounded-lg" } as const;

export function rootClass(type: BadgeType, color: BadgeColor): string {
  if (type === "modern") return "bg-bg text-fg-secondary ring-border shadow-xs";
  return filledColors[color].root;
}

export function shapeClass(type: BadgeType): string {
  return type === "pill-color" ? "rounded-full" : "rounded-md";
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2 2l8 8M10 2l-8 8" />
    </svg>
  );
}
