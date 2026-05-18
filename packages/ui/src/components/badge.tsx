/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/badges/badges.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { type FC, forwardRef, type HTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
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

type IconProp = FC<{ className?: string }>;

/* -------------------------------------------------------------------------- */
/*  Color maps                                                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Size maps                                                                  */
/* -------------------------------------------------------------------------- */

const PILL_SIZE = {
  sm: "py-0.5 px-2 text-xs font-medium",
  md: "py-0.5 px-2.5 text-sm font-medium",
  lg: "py-1 px-3 text-sm font-medium",
} as const;

const BADGE_SIZE = {
  sm: "py-0.5 px-1.5 text-xs font-medium",
  md: "py-0.5 px-2 text-sm font-medium",
  lg: "py-1 px-2.5 text-sm font-medium rounded-lg",
} as const;

const PILL_DOT_SIZE = {
  sm: "gap-1 py-0.5 pl-1.5 pr-2 text-xs font-medium",
  md: "gap-1.5 py-0.5 pl-2 pr-2.5 text-sm font-medium",
  lg: "gap-1.5 py-1 pl-2.5 pr-3 text-sm font-medium",
} as const;

const BADGE_DOT_SIZE = {
  sm: "gap-1 py-0.5 px-1.5 text-xs font-medium",
  md: "gap-1.5 py-0.5 px-2 text-sm font-medium",
  lg: "gap-1.5 py-1 px-2.5 text-sm font-medium rounded-lg",
} as const;

const PILL_ICON_SIZE = {
  sm: { leading: "gap-0.5 py-0.5 pr-2 pl-1.5 text-xs font-medium", trailing: "gap-0.5 py-0.5 pl-2 pr-1.5 text-xs font-medium" },
  md: { leading: "gap-1 py-0.5 pr-2.5 pl-2 text-sm font-medium",   trailing: "gap-1 py-0.5 pl-2.5 pr-2 text-sm font-medium" },
  lg: { leading: "gap-1 py-1 pr-3 pl-2.5 text-sm font-medium",     trailing: "gap-1 py-1 pl-3 pr-2.5 text-sm font-medium" },
} as const;

const BADGE_ICON_SIZE = {
  sm: { leading: "gap-0.5 py-0.5 pr-2 pl-1.5 text-xs font-medium",             trailing: "gap-0.5 py-0.5 pl-2 pr-1.5 text-xs font-medium" },
  md: { leading: "gap-1 py-0.5 pr-2 pl-1.5 text-sm font-medium",               trailing: "gap-1 py-0.5 pl-2 pr-1.5 text-sm font-medium" },
  lg: { leading: "gap-1 py-1 pr-2.5 pl-2 text-sm font-medium rounded-lg",      trailing: "gap-1 py-1 pl-2.5 pr-2 text-sm font-medium rounded-lg" },
} as const;

const PILL_FLAG_SIZE = {
  sm: "gap-1 py-0.5 pl-0.75 pr-2 text-xs font-medium",
  md: "gap-1.5 py-0.5 pl-1 pr-2.5 text-sm font-medium",
  lg: "gap-1.5 py-1 pl-1.5 pr-3 text-sm font-medium",
} as const;

const BADGE_FLAG_SIZE = {
  sm: "gap-1 py-0.5 pl-1 pr-1.5 text-xs font-medium",
  md: "gap-1.5 py-0.5 pl-1.5 pr-2 text-sm font-medium",
  lg: "gap-1.5 py-1 pl-2 pr-2.5 text-sm font-medium rounded-lg",
} as const;

const PILL_BTN_SIZE = {
  sm: "gap-0.5 py-0.5 pl-2 pr-0.75 text-xs font-medium",
  md: "gap-0.5 py-0.5 pl-2.5 pr-1 text-sm font-medium",
  lg: "gap-0.5 py-1 pl-3 pr-1.5 text-sm font-medium",
} as const;

const BADGE_BTN_SIZE = {
  sm: "gap-0.5 py-0.5 pl-1.5 pr-0.75 text-xs font-medium",
  md: "gap-0.5 py-0.5 pl-2 pr-1 text-sm font-medium",
  lg: "gap-0.5 py-1 pl-2.5 pr-1.5 text-sm font-medium rounded-lg",
} as const;

const ICON_ONLY_PILL_SIZE = { sm: "p-1.25", md: "p-1.5", lg: "p-2" } as const;
const ICON_ONLY_BADGE_SIZE = { sm: "p-1.25", md: "p-1.5", lg: "p-2 rounded-lg" } as const;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function rootClass(type: BadgeType, color: BadgeColor): string {
  if (type === "modern") return "bg-bg text-fg-secondary ring-border shadow-xs";
  return filledColors[color].root;
}

function shapeClass(type: BadgeType): string {
  return type === "pill-color" ? "rounded-full" : "rounded-md";
}

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

/* -------------------------------------------------------------------------- */
/*  BadgeIcon (icon-only)                                                      */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  BadgeWithDot                                                               */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  BadgeWithIcon                                                              */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  BadgeWithFlag                                                              */
/* -------------------------------------------------------------------------- */

export interface BadgeWithFlagProps {
  color?: BadgeColor;
  type?: BadgeType;
  size?: "sm" | "md" | "lg";
  flag: string;
  children: ReactNode;
  className?: string;
}

export const BadgeWithFlag = ({
  color = "gray",
  type = "pill-color",
  size = "md",
  flag,
  children,
  className,
}: BadgeWithFlagProps) => {
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
      <img
        src={`https://www.untitledui.com/images/flags/${flag}.svg`}
        className="size-4 max-w-none rounded-full"
        alt={`${flag} flag`}
      />
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*  BadgeWithImage                                                             */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  BadgeWithButton                                                            */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Backwards-compat stub                                                      */
/* -------------------------------------------------------------------------- */

/** @deprecated Use Badge with color + type props instead. */
export function badgeVariants(_opts?: { color?: BadgeColor; type?: BadgeType; size?: "sm" | "md" | "lg" }): string {
  return cn(
    "inline-flex items-center whitespace-nowrap font-medium ring-1 ring-inset rounded-full",
    filledColors[_opts?.color ?? "gray"].root,
    PILL_SIZE[_opts?.size ?? "md"],
  );
}
