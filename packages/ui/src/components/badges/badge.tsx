/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/badges/badges.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { forwardRef, type HTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import { cn } from "../../lib/cn.js";
import {
  filledColors,
  PILL_SIZE,
  BADGE_SIZE,
  ICON_ONLY_PILL_SIZE,
  ICON_ONLY_BADGE_SIZE,
  rootClass,
  shapeClass,
  XIcon,
} from "./shared.js";
import type { BadgeColor, BadgeType, IconProp } from "./shared.js";

export type { BadgeColor, BadgeType };
export { filledColors };

export interface BadgeProps {
  color?: BadgeColor;
  type?: BadgeType;
  size?: "sm" | "md" | "lg";
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
  dismissLabel?: string;
  children: ReactNode;
  className?: string;
}

export const Badge = forwardRef<HTMLSpanElement, Omit<HTMLAttributes<HTMLSpanElement>, "color"> & BadgeProps>(
  ({ color = "gray", type = "pill-color", size = "md", onDismiss, dismissLabel = "Dismiss", children, className, ...props }, ref) => {
    const sizeClass = type === "pill-color" ? PILL_SIZE[size] : BADGE_SIZE[size];
    return (
      <span
        ref={ref}
        {...props}
        className={cn(
          "inline-flex items-center whitespace-nowrap ring-1 ring-inset",
          shapeClass(type),
          rootClass(type, color),
          sizeClass,
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
              "flex cursor-pointer items-center justify-center p-0.5 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1",
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

export interface BadgeIconProps {
  color?: BadgeColor;
  type?: BadgeType;
  size?: "sm" | "md" | "lg";
  icon: IconProp;
  className?: string;
}

export const BadgeIcon = forwardRef<HTMLSpanElement, BadgeIconProps>(
  ({ color = "gray", type = "pill-color", size = "md", icon: Icon, className }, ref) => {
    const sizeClass = type === "pill-color" ? ICON_ONLY_PILL_SIZE[size] : ICON_ONLY_BADGE_SIZE[size];
    const addonClass = type === "modern" ? "text-fg-tertiary" : filledColors[color].addon;
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center ring-1 ring-inset",
          shapeClass(type),
          rootClass(type, color),
          sizeClass,
          className,
        )}
      >
        <Icon className={cn("size-3 stroke-[3px]", addonClass)} />
      </span>
    );
  },
);
BadgeIcon.displayName = "BadgeIcon";

/** @deprecated Use Badge with color + type props instead. */
export function badgeVariants(_opts?: { color?: BadgeColor; type?: BadgeType; size?: "sm" | "md" | "lg" }): string {
  return cn(
    "inline-flex items-center whitespace-nowrap font-medium ring-1 ring-inset rounded-full",
    filledColors[_opts?.color ?? "gray"].root,
    PILL_SIZE[_opts?.size ?? "md"],
  );
}
