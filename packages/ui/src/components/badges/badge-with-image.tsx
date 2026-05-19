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
  PILL_FLAG_SIZE,
  BADGE_FLAG_SIZE,
  rootClass,
  shapeClass,
} from "./shared.js";
import type { BadgeColor, BadgeType } from "./shared.js";

export interface BadgeWithImageProps {
  color?: BadgeColor;
  type?: BadgeType;
  size?: "sm" | "md" | "lg";
  imgSrc: string;
  imgAlt?: string;
  children: ReactNode;
  className?: string;
}

export const BadgeWithImage = ({
  color = "gray",
  type = "pill-color",
  size = "md",
  imgSrc,
  imgAlt = "Badge image",
  children,
  className,
}: BadgeWithImageProps) => {
  const sizeClass = type === "pill-color" ? PILL_FLAG_SIZE[size] : BADGE_FLAG_SIZE[size];
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
      <img src={imgSrc} className="size-4 max-w-none rounded-full" alt={imgAlt} />
      {children}
    </span>
  );
};
