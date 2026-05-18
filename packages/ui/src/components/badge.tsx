/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/badges/badges.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { forwardRef, type HTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Color maps                                                                 */
/* -------------------------------------------------------------------------- */

/* Root styles for pill-color / color types (not used by modern) */
const ROOT_COLORS: Record<BadgeColor, string> = {
  gray:    "bg-neutral-bg text-fg-secondary ring-neutral-border",
  brand:   "bg-info-bg text-info-fg ring-info-border",
  error:   "bg-error-bg text-error-fg ring-error-border",
  warning: "bg-warning-bg text-warning-fg ring-warning-border",
  success: "bg-success-bg text-success-fg ring-success-border",
  /* Decorative — not in the banned color categories, no dark-ok needed */
  slate:   "bg-slate-50 text-slate-700 ring-slate-200",
  sky:     "bg-sky-50 text-sky-700 ring-sky-200",
  blue:    "bg-blue-50 text-blue-700 ring-blue-200",
  indigo:  "bg-indigo-50 text-indigo-700 ring-indigo-200",
  purple:  "bg-purple-50 text-purple-700 ring-purple-200",
  pink:    "bg-pink-50 text-pink-700 ring-pink-200",
  orange:  "bg-orange-50 text-orange-700 ring-orange-200",
};

/* -------------------------------------------------------------------------- */
/*  Size map                                                                   */
/* -------------------------------------------------------------------------- */

const SIZE = {
  sm: "gap-1 px-2 py-0.5 text-xs",
  md: "gap-1.5 px-2.5 py-0.5 text-sm",
} as const;

/* -------------------------------------------------------------------------- */
/*  Close button icon (inline — no external dep)                              */
/* -------------------------------------------------------------------------- */

function XIcon({ className }: { className?: string }) {
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

/* -------------------------------------------------------------------------- */
/*  Badge                                                                      */
/* -------------------------------------------------------------------------- */

export interface BadgeProps {
  color?: BadgeColor;
  type?: BadgeType;
  size?: "sm" | "md";
  /** Renders a close button and calls this handler on click. */
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
  /** aria-label for the close button. */
  dismissLabel?: string;
  children: ReactNode;
  className?: string;
}

export const Badge = forwardRef<HTMLSpanElement, Omit<HTMLAttributes<HTMLSpanElement>, "color"> & BadgeProps>(
  (
    {
      color = "gray",
      type = "pill-color",
      size = "md",
      onDismiss,
      dismissLabel = "Dismiss",
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isModern = type === "modern";
    const rootClass = isModern
      ? "bg-bg text-fg-secondary ring-border shadow-xs"
      : ROOT_COLORS[color];
    const shapeClass = type === "pill-color" ? "rounded-full" : "rounded-md";

    return (
      <span
        ref={ref}
        {...props}
        className={cn(
          "inline-flex items-center whitespace-nowrap font-medium ring-1 ring-inset",
          shapeClass,
          rootClass,
          SIZE[size],
          className,
        )}
      >
        {children}
        {onDismiss && (
          <button
            type="button"
            aria-label={dismissLabel}
            onClick={onDismiss}
            className={cn(
              "flex cursor-pointer items-center justify-center p-0.5",
              "opacity-60 transition-opacity hover:opacity-100",
              "focus-visible:outline-2 focus-visible:outline-offset-1",
              type === "pill-color" ? "rounded-full" : "rounded-[3px]",
            )}
          >
            <XIcon className="size-3" />
          </button>
        )}
      </span>
    );
  },
);
Badge.displayName = "Badge";

/* -------------------------------------------------------------------------- */
/*  BadgeIcon (icon-only badge)                                                */
/* -------------------------------------------------------------------------- */

export interface BadgeIconProps {
  color?: BadgeColor;
  type?: BadgeType;
  size?: "sm" | "md";
  icon: ReactNode;
  className?: string;
}

export const BadgeIcon = forwardRef<HTMLSpanElement, BadgeIconProps>(
  ({ color = "gray", type = "pill-color", size = "md", icon, className }, ref) => {
    const isModern = type === "modern";
    const rootClass = isModern
      ? "bg-bg text-fg-secondary ring-border shadow-xs"
      : ROOT_COLORS[color];
    const shapeClass = type === "pill-color" ? "rounded-full" : "rounded-md";
    const padClass = size === "sm" ? "p-1.5" : "p-2";

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center ring-1 ring-inset",
          shapeClass,
          rootClass,
          padClass,
          className,
        )}
      >
        <span className="size-3 [&_svg]:size-full">{icon}</span>
      </span>
    );
  },
);
BadgeIcon.displayName = "BadgeIcon";

/* -------------------------------------------------------------------------- */
/*  Backwards-compat badgeVariants (stub — use Badge directly)               */
/* -------------------------------------------------------------------------- */

/** @deprecated Use Badge with color + type props instead. */
export function badgeVariants(_opts?: {
  color?: BadgeColor;
  type?: BadgeType;
  size?: "sm" | "md";
}): string {
  return cn(
    "inline-flex items-center whitespace-nowrap font-medium ring-1 ring-inset rounded-full",
    ROOT_COLORS[_opts?.color ?? "gray"],
    SIZE[_opts?.size ?? "md"],
  );
}
