/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/badges/badges.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "../../lib/cn.js";
import {
  filledColors,
  PILL_BTN_SIZE,
  BADGE_BTN_SIZE,
  rootClass,
  shapeClass,
  XIcon,
} from "./shared.js";
import type { BadgeColor, BadgeType, IconProp } from "./shared.js";

export interface BadgeWithButtonProps {
  color?: BadgeColor;
  type?: BadgeType;
  size?: "sm" | "md" | "lg";
  icon?: IconProp;
  buttonLabel?: string;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}

export const BadgeWithButton = ({
  color = "gray",
  type = "pill-color",
  size = "md",
  icon: Icon = XIcon,
  buttonLabel,
  onButtonClick,
  children,
  className,
}: BadgeWithButtonProps) => {
  const sizeClass = type === "pill-color" ? PILL_BTN_SIZE[size] : BADGE_BTN_SIZE[size];
  const btnClass = type === "modern" ? "hover:bg-bg-secondary text-fg-tertiary hover:text-fg-secondary" : filledColors[color].addonButton;
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
      {children}
      <button
        type="button"
        aria-label={buttonLabel}
        onClick={onButtonClick}
        className={cn(
          "flex cursor-pointer items-center justify-center p-0.5 transition duration-100 ease-linear focus-visible:outline-2",
          type === "pill-color" ? "rounded-full" : "rounded-[3px]",
          btnClass,
        )}
      >
        <Icon className="size-3 stroke-[3px]" />
      </button>
    </span>
  );
};
