"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/badges/badge-groups.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { type FC, type ReactNode, isValidElement } from "react";
import { cn } from "../../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type BadgeGroupColor = "brand" | "warning" | "error" | "gray" | "success";
export type BadgeGroupTheme = "light" | "modern";
export type BadgeGroupAlign = "leading" | "trailing";
export type BadgeGroupSize = "md" | "lg";

/* -------------------------------------------------------------------------- */
/*  Color maps                                                                 */
/* -------------------------------------------------------------------------- */

const LIGHT_COLORS: Record<BadgeGroupColor, { root: string; addon: string; icon: string }> = {
  brand: {
    root: "bg-purple-50 text-purple-700 ring-purple-200 hover:bg-purple-100", // dark-ok — decorative badge group
    addon: "bg-bg text-current ring-purple-200", // dark-ok — inset addon on colored surface
    icon: "text-purple-500", // dark-ok
  },
  gray: {
    root: "bg-gray-50 text-gray-700 ring-gray-200 hover:bg-gray-100", // dark-ok
    addon: "bg-bg text-current ring-gray-200", // dark-ok
    icon: "text-gray-500", // dark-ok
  },
  error: {
    root: "bg-red-50 text-red-700 ring-red-200 hover:bg-red-100", // dark-ok
    addon: "bg-bg text-current ring-red-200", // dark-ok
    icon: "text-red-500", // dark-ok
  },
  warning: {
    root: "bg-yellow-50 text-yellow-700 ring-yellow-200 hover:bg-yellow-100", // dark-ok
    addon: "bg-bg text-current ring-yellow-200", // dark-ok
    icon: "text-yellow-500", // dark-ok
  },
  success: {
    root: "bg-green-50 text-green-700 ring-green-200 hover:bg-green-100", // dark-ok
    addon: "bg-bg text-current ring-green-200", // dark-ok
    icon: "text-green-500", // dark-ok
  },
};

const MODERN_DOT: Record<BadgeGroupColor, string> = {
  brand: "bg-purple-500 outline-3 -outline-offset-1 outline-purple-100", // dark-ok
  gray: "bg-gray-500 outline-3 -outline-offset-1 outline-gray-100", // dark-ok
  error: "bg-red-500 outline-3 -outline-offset-1 outline-red-100", // dark-ok
  warning: "bg-yellow-500 outline-3 -outline-offset-1 outline-yellow-100", // dark-ok
  success: "bg-green-500 outline-3 -outline-offset-1 outline-green-100", // dark-ok
};

/* -------------------------------------------------------------------------- */
/*  Size maps                                                                  */
/* -------------------------------------------------------------------------- */

type SizeMap = {
  root: string;
  addon: string;
  icon: string;
  dot?: string;
};

const SIZES: Record<BadgeGroupAlign, Record<"light" | "modern", Record<BadgeGroupSize, SizeMap>>> = {
  leading: {
    light: {
      md: { root: "py-1 pr-2 pl-1 text-xs font-medium", addon: "px-2 py-0.5 mr-2", icon: "ml-1 size-4" },
      lg: { root: "py-1 pr-2 pl-1 text-sm font-medium", addon: "px-2.5 py-0.5 mr-2", icon: "ml-1 size-4" },
    },
    modern: {
      md: { root: "py-1 pr-2 pl-1 text-xs font-medium", addon: "gap-1 px-1.5 py-0.5 mr-2", icon: "ml-1 size-4" },
      lg: { root: "py-1 pr-2 pl-1 text-sm font-medium", addon: "gap-1.5 px-2 py-0.5 mr-2", icon: "ml-1 size-4" },
    },
  },
  trailing: {
    light: {
      md: { root: "py-1 pr-1 pl-3 text-xs font-medium", addon: "py-0.5 pr-1.5 pl-2 ml-2", icon: "ml-0.5 size-3 stroke-[3px]", dot: "mr-1.5" },
      lg: { root: "py-1 pr-1 pl-3 text-sm font-medium", addon: "py-0.5 pr-2 pl-2.5 ml-2", icon: "ml-1 size-3 stroke-[3px]", dot: "mr-2" },
    },
    modern: {
      md: { root: "py-1 pr-1 pl-3 text-xs font-medium", addon: "gap-1 py-0.5 pr-1.5 pl-2 ml-2", icon: "ml-0.5 size-3 stroke-[3px]", dot: "mr-1.5" },
      lg: { root: "py-1 pr-1 pl-3 text-sm font-medium", addon: "gap-1.5 py-0.5 pr-1.5 pl-2 ml-2", icon: "ml-1 size-3 stroke-[3px]", dot: "mr-2" },
    },
  },
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function renderIcon(
  IconTrailing: FC<{ className?: string }> | ReactNode | undefined,
  iconCn: string,
) {
  if (!IconTrailing) return null;
  if (isValidElement(IconTrailing)) return IconTrailing;
  if (typeof IconTrailing === "function") {
    const Icon = IconTrailing as FC<{ className?: string }>;
    return <Icon className={iconCn} />;
  }
  return null;
}

/* Default trailing icon — a simple right arrow */
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.33 8h9.34M8.67 4l4 4-4 4" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  BadgeGroup                                                                 */
/* -------------------------------------------------------------------------- */

export interface BadgeGroupProps {
  /** Text shown inside the addon pill/badge */
  addonText: string;
  /** Color palette */
  color?: BadgeGroupColor;
  /** "light" = colored pill; "modern" = neutral surface with dot */
  theme?: BadgeGroupTheme;
  /** Whether the badge addon comes before (leading) or after (trailing) the text */
  align?: BadgeGroupAlign;
  /** Size */
  size?: BadgeGroupSize;
  /** Trailing icon; defaults to ArrowRight. Pass null to remove. */
  iconTrailing?: FC<{ className?: string }> | ReactNode | null;
  children?: string | ReactNode;
  className?: string;
}

export const BadgeGroup = ({
  addonText,
  color = "brand",
  theme = "light",
  align = "leading",
  size = "md",
  iconTrailing = ArrowRightIcon,
  children,
  className,
}: BadgeGroupProps) => {
  const sz = SIZES[align][theme][size];
  const colors = theme === "light" ? LIGHT_COLORS[color] : null;
  const dotColor = MODERN_DOT[color];

  const rootCn = cn(
    "inline-flex w-max cursor-pointer items-center transition duration-100 ease-linear",
    theme === "light"
      ? cn("rounded-full ring-1 ring-inset", colors?.root)
      : "rounded-[10px] bg-bg text-fg-secondary shadow-xs ring-1 ring-inset ring-border hover:bg-bg-secondary",
    sz.root,
    className,
  );

  const addonCn = cn(
    "inline-flex items-center",
    theme === "light"
      ? cn("rounded-full ring-1 ring-inset", colors?.addon)
      : "rounded-md bg-bg shadow-xs ring-1 ring-inset ring-border",
    sz.addon,
  );

  const iconCn = cn(
    theme === "light" ? colors?.icon : "text-fg-tertiary",
    sz.icon,
  );

  const dotCn = cn("inline-block size-2 shrink-0 rounded-full", sz.dot, dotColor);

  if (align === "trailing") {
    return (
      <div className={rootCn}>
        {theme === "modern" && <span className={dotCn} />}
        {children}
        <span className={addonCn}>
          {addonText}
          {iconTrailing !== null && renderIcon(iconTrailing, iconCn)}
        </span>
      </div>
    );
  }

  return (
    <div className={rootCn}>
      <span className={addonCn}>
        {theme === "modern" && <span className={dotCn} />}
        {addonText}
      </span>
      {children}
      {iconTrailing !== null && renderIcon(iconTrailing, iconCn)}
    </div>
  );
};
