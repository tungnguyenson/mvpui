/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/foundations/featured-icon/featured-icon.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { type FC, isValidElement, type ReactNode, type Ref } from "react";
import { cn } from "../lib/cn.js";

type IconProp = FC<{ className?: string }> | ReactNode;

export interface FeaturedIconProps {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
  className?: string;
  icon?: IconProp;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "brand" | "gray" | "error" | "warning" | "success";
  theme?: "light" | "gradient" | "dark" | "outline" | "modern" | "modern-neue";
}

const ICON_SIZE: Record<string, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-7",
};

const LIGHT = {
  base: "rounded-full",
  size: { sm: "size-8", md: "size-10", lg: "size-12", xl: "size-14" },
  color: {
    brand: "bg-info-bg text-info-fg",
    gray: "bg-neutral-bg text-fg-secondary",
    error: "bg-error-bg text-error-fg",
    warning: "bg-warning-bg text-warning-fg",
    success: "bg-success-bg text-success-fg",
  },
} as const;

const DARK_SOLID = {
  base: "shadow-xs",
  size: {
    sm: "size-8 rounded-md",
    md: "size-10 rounded-lg",
    lg: "size-12 rounded-[10px]",
    xl: "size-14 rounded-xl",
  },
  color: {
    brand: "bg-primary text-primary-fg",
    gray: "bg-gray-600 text-white", // dark-ok — mode-independent solid gray fill
    error: "bg-error-600 text-white", // dark-ok — solid destructive fill
    warning: "bg-warning-600 text-white", // dark-ok — solid warning fill
    success: "bg-success-600 text-white", // dark-ok — solid success fill
  },
} as const;

const GRADIENT = {
  base: "rounded-full text-white before:absolute before:inset-0 before:size-full before:rounded-full before:border after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full",
  size: {
    sm: "size-8 after:size-6",
    md: "size-10 after:size-7",
    lg: "size-12 after:size-8",
    xl: "size-14 after:size-10",
  },
  color: {
    brand:   "before:bg-info-bg   before:border-fg-brand/20   after:bg-primary",   // dark-ok after: solid brand fill
    gray:    "before:bg-neutral-bg before:border-border        after:bg-gray-600",  // dark-ok after: solid gray fill
    error:   "before:bg-error-bg   before:border-error-fg/20  after:bg-error-600", // dark-ok after: solid error fill
    warning: "before:bg-warning-bg before:border-warning-fg/20 after:bg-warning-600", // dark-ok after: solid warning fill
    success: "before:bg-success-bg before:border-success-fg/20 after:bg-success-600", // dark-ok after: solid success fill
  },
} as const;

const MODERN = {
  base: "bg-bg shadow-xs ring-1 ring-inset ring-border",
  size: {
    sm: "size-8 rounded-md",
    md: "size-10 rounded-lg",
    lg: "size-12 rounded-[10px]",
    xl: "size-14 rounded-xl",
  },
  color: {
    brand: "text-fg-brand",
    gray: "text-fg-secondary",
    error: "text-error-fg",
    warning: "text-warning-fg",
    success: "text-success-fg",
  },
} as const;

const MODERN_NEUE = {
  base: "bg-bg ring-1 ring-inset ring-border before:absolute before:inset-1 before:bg-bg-secondary before:shadow-sm before:ring-1 before:ring-border-secondary",
  size: {
    sm: "size-8 rounded-[8px] before:rounded-[4px]",
    md: "size-10 rounded-[10px] before:rounded-[6px]",
    lg: "size-12 rounded-[12px] before:rounded-[8px]",
    xl: "size-14 rounded-[14px] before:rounded-[10px]",
  },
  color: {
    brand:   "text-fg-brand",
    gray:    "text-fg-secondary",
    error:   "text-error-fg",
    warning: "text-warning-fg",
    success: "text-success-fg",
  },
} as const;

const OUTLINE = {
  base: "before:absolute before:rounded-full before:border-2 after:absolute after:rounded-full after:border-2",
  size: {
    sm: "size-4 before:size-6 after:size-[34px]",
    md: "size-5 before:size-7 after:size-[38px]",
    lg: "size-6 before:size-8 after:size-[42px]",
    xl: "size-7 before:size-9 after:size-[46px]",
  },
  color: {
    brand: "text-fg-brand before:border-fg-brand/30 after:border-fg-brand/10",
    gray: "text-fg-tertiary before:border-fg-tertiary/30 after:border-fg-tertiary/10",
    error: "text-error-fg before:border-error-fg/30 after:border-error-fg/10",
    warning: "text-warning-fg before:border-warning-fg/30 after:border-warning-fg/10",
    success: "text-success-fg before:border-success-fg/30 after:border-success-fg/10",
  },
} as const;

const THEMES = {
  light: LIGHT,
  gradient: GRADIENT,
  dark: DARK_SOLID,
  modern: MODERN,
  "modern-neue": MODERN_NEUE,
  outline: OUTLINE,
} as const;

function renderIcon(icon: IconProp, className: string): ReactNode {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;
  if (typeof icon === "function") {
    const IconComp = icon as FC<{ className?: string }>;
    return <IconComp className={className} />;
  }
  return null;
}

export const FeaturedIcon = ({
  size = "sm",
  theme = "light",
  color = "brand",
  icon,
  className,
  children,
  ref,
  ...props
}: FeaturedIconProps) => {
  const t = THEMES[theme];

  return (
    <div
      {...props}
      ref={ref}
      data-featured-icon
      className={cn(
        "relative flex shrink-0 items-center justify-center",
        t.base,
        t.size[size],
        t.color[color],
        className,
      )}
    >
      {renderIcon(icon, cn("z-1", ICON_SIZE[size]))}
      {children}
    </div>
  );
};
