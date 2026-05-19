/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/badges/badges.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import type { ReactNode } from "react";
import { cn } from "../../lib/cn.js";
import {
  filledColors,
  PILL_DOT_SIZE,
  BADGE_DOT_SIZE,
  rootClass,
  shapeClass,
} from "./shared.js";
import type { BadgeColor, BadgeType } from "./shared.js";

export interface BadgeWithDotProps {
  color?: BadgeColor;
  type?: BadgeType;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

export const BadgeWithDot = ({ color = "gray", type = "pill-color", size = "md", children, className }: BadgeWithDotProps) => {
  const sizeClass = type === "pill-color" ? PILL_DOT_SIZE[size] : BADGE_DOT_SIZE[size];
  const dotClass = type === "modern" ? "text-fg-tertiary" : filledColors[color].addon;
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap ring-1 ring-inset",
        shapeClass(type),
        rootClass(type, color),
        sizeClass,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("inline-block size-1.5 shrink-0 rounded-full bg-current", dotClass)} />
      {children}
    </span>
  );
};
