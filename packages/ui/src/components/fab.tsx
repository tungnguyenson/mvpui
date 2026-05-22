"use client";

/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  forwardRef,
  isValidElement,
  type ComponentType,
  type FC,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";

export type FabIcon = FC<{ className?: string }> | ComponentType<{ className?: string }> | ReactNode;

export interface FabProps {
  /** Accessible label. Used as `aria-label`. Hidden visually — FAB shows icon only. */
  label: string;
  /** Icon component (lucide-style) or a ReactNode. */
  icon: FabIcon;
  /** Click handler. Ignored when `href` is provided. */
  onClick?: (() => void) | undefined;
  /** When set, renders as an anchor for navigation. */
  href?: string | undefined;
  disabled?: boolean | undefined;
  /** @default "primary" */
  color?: "primary" | "secondary" | undefined;
  /**
   * `fixed` pins it to the viewport bottom-right with safe-area inset.
   * `static` keeps it in normal flow (useful for stories/demos).
   * @default "fixed"
   */
  position?: "fixed" | "static" | undefined;
  /** Override anchor renderer to integrate with framework routers (Next.js Link, etc). */
  linkAs?: ComponentType<{
    href: string;
    className?: string;
    children: ReactNode;
    "aria-label"?: string;
  }> | undefined;
  className?: string | undefined;
}

const fabBase = [
  "inline-flex items-center justify-center",
  "size-14 rounded-full",
  "shadow-lg",
  "transition-colors duration-100 ease-linear",
  "outline-none focus-visible:ring-4",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:pointer-events-none",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-6",
  "touch-manipulation",
];

const fabColors = {
  primary: [
    "bg-primary text-primary-fg",
    "hover:enabled:bg-primary-hover",
    "active:enabled:bg-primary-active",
    "focus-visible:ring-brand-500/22",
  ],
  secondary: [
    "bg-bg text-fg ring-1 ring-border",
    "hover:enabled:bg-bg-secondary",
    "active:enabled:bg-bg-tertiary",
    "focus-visible:ring-brand-500/22",
  ],
} as const;

function renderIcon(icon: FabIcon): ReactNode {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;
  if (
    typeof icon === "function" ||
    (typeof icon === "object" &&
      icon !== null &&
      "render" in (icon as unknown as Record<string, unknown>))
  ) {
    const IconComp = icon as ComponentType<{ className?: string }>;
    return <IconComp className="size-6" />;
  }
  return icon as ReactNode;
}

export const FAB = forwardRef<HTMLButtonElement | HTMLAnchorElement, FabProps>(
  (
    {
      label,
      icon,
      onClick,
      href,
      disabled,
      color = "primary",
      position = "fixed",
      linkAs: LinkComp,
      className,
    },
    ref,
  ) => {
    const classes = cn(
      ...fabBase,
      ...fabColors[color],
      position === "fixed" &&
        "fixed right-4 z-40 bottom-[max(1rem,env(safe-area-inset-bottom))]",
      className,
    );

    const content = renderIcon(icon);

    if (href && !disabled) {
      if (LinkComp) {
        return (
          <LinkComp
            href={href}
            aria-label={label}
            className={classes}
          >
            {content}
          </LinkComp>
        );
      }
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          aria-label={label}
          className={classes}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
        className={classes}
      >
        {content}
      </button>
    );
  },
);

FAB.displayName = "FAB";
