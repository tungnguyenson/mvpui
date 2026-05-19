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

export const filledColors: Record<BadgeColor, { root: string; addon: string; addonButton: string }> = {
  gray:    { root: "bg-gray-50 text-gray-700 ring-gray-200",         addon: "text-gray-500",    addonButton: "hover:bg-gray-100 text-gray-400 hover:text-gray-500" },         // dark-ok — decorative badge
  brand:   { root: "bg-purple-50 text-purple-700 ring-purple-200",   addon: "text-purple-500",  addonButton: "hover:bg-purple-100 text-purple-400 hover:text-purple-500" },
  error:   { root: "bg-red-50 text-red-700 ring-red-200",            addon: "text-red-500",     addonButton: "hover:bg-red-100 text-red-400 hover:text-red-500" },
  warning: { root: "bg-yellow-50 text-yellow-700 ring-yellow-200",   addon: "text-yellow-500",  addonButton: "hover:bg-yellow-100 text-yellow-400 hover:text-yellow-500" },
  success: { root: "bg-green-50 text-green-700 ring-green-200",      addon: "text-green-500",   addonButton: "hover:bg-green-100 text-green-400 hover:text-green-500" },
  slate:   { root: "bg-slate-50 text-slate-700 ring-slate-200",      addon: "text-slate-500",   addonButton: "hover:bg-slate-100 text-slate-400 hover:text-slate-500" },
  sky:     { root: "bg-sky-50 text-sky-700 ring-sky-200",            addon: "text-sky-500",     addonButton: "hover:bg-sky-100 text-sky-400 hover:text-sky-500" },
  blue:    { root: "bg-blue-50 text-blue-700 ring-blue-200",         addon: "text-blue-500",    addonButton: "hover:bg-blue-100 text-blue-400 hover:text-blue-500" },
  indigo:  { root: "bg-indigo-50 text-indigo-700 ring-indigo-200",   addon: "text-indigo-500",  addonButton: "hover:bg-indigo-100 text-indigo-400 hover:text-indigo-500" },
  purple:  { root: "bg-purple-50 text-purple-700 ring-purple-200",   addon: "text-purple-500",  addonButton: "hover:bg-purple-100 text-purple-400 hover:text-purple-500" },
  pink:    { root: "bg-pink-50 text-pink-700 ring-pink-200",         addon: "text-pink-500",    addonButton: "hover:bg-pink-100 text-pink-400 hover:text-pink-500" },
  orange:  { root: "bg-orange-50 text-orange-700 ring-orange-200",   addon: "text-orange-500",  addonButton: "hover:bg-orange-100 text-orange-400 hover:text-orange-500" },
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
