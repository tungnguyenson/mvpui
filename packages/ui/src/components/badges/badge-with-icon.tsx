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
  PILL_ICON_SIZE,
  BADGE_ICON_SIZE,
  rootClass,
  shapeClass,
} from "./shared.js";
import type { BadgeColor, BadgeType, IconProp } from "./shared.js";

export interface BadgeWithIconProps {
  color?: BadgeColor;
  type?: BadgeType;
  size?: "sm" | "md" | "lg";
  iconLeading?: IconProp;
  iconTrailing?: IconProp;
  children: ReactNode;
  className?: string;
}

export const BadgeWithIcon = ({
  color = "gray",
  type = "pill-color",
  size = "md",
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  children,
  className,
}: BadgeWithIconProps) => {
  const dir = IconLeading ? "leading" : "trailing";
  const sizeMap = type === "pill-color" ? PILL_ICON_SIZE : BADGE_ICON_SIZE;
  const addonClass = type === "modern" ? "text-fg-tertiary" : filledColors[color].addon;
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap ring-1 ring-inset",
        shapeClass(type),
        rootClass(type, color),
        sizeMap[size][dir],
        className,
      )}
    >
      {IconLeading && <IconLeading className={cn("size-3 stroke-[3px]", addonClass)} />}
      {children}
      {IconTrailing && <IconTrailing className={cn("size-3 stroke-[3px]", addonClass)} />}
    </span>
  );
};
