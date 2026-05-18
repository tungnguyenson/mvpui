/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/buttons/button-utility.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type FC,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";

/* ==========================================================================
   ButtonUtility — compact icon-only control (table row actions, toolbars).
   Divergences from Untitled UI source:
     1. Native <button> + Radix `Slot` (asChild) instead of react-aria
        Button/Link split — matches our Button, defers react-aria (plan A1).
     2. Tooltip: source wraps in the Untitled Tooltip component. Our Tooltip
        ships in Wave 1A. Interim: the `tooltip` prop maps to the native
        `title` attribute (and `aria-label` when no other label). The
        `tooltipPlacement` prop is dropped (no-op with native title) — wire
        the real Tooltip in Wave 1A. Tracked: TODO(tooltip-wave-1a).
   ========================================================================== */

const buttonUtilityVariants = cva(
  [
    "group relative inline-flex h-max shrink-0 cursor-pointer items-center justify-center",
    "rounded-md p-1.5 transition-all duration-100 ease-linear outline-none",
    "focus-visible:ring-4 focus-visible:ring-brand-500/22",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      color: {
        secondary: [
          "bg-bg text-muted-fg ring-1 ring-border ring-inset shadow-xs",
          "hover:enabled:bg-bg-tertiary hover:enabled:text-fg-tertiary",
        ],
        tertiary: [
          "text-muted-fg",
          "hover:enabled:bg-bg-tertiary hover:enabled:text-fg-tertiary",
        ],
      },
      size: {
        xs: "[&_svg]:size-4",
        sm: "[&_svg]:size-5",
      },
    },
    defaultVariants: {
      color: "secondary",
      size: "sm",
    },
  }
);

type IconProp = FC<{ className?: string }> | ReactNode;

export interface ButtonUtilityProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonUtilityVariants> {
  /** Render styles onto the child element via Radix Slot. */
  asChild?: boolean;
  /** Icon component or element. Required — this is an icon-only control. */
  icon: IconProp;
  /**
   * Hover hint. Interim: native `title`. Also used as `aria-label` when no
   * explicit `aria-label` is set. Real Tooltip wired in Wave 1A.
   */
  tooltip?: string;
}

function renderIcon(icon: IconProp): ReactNode {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;
  if (typeof icon === "function") {
    const Icon = icon as FC<{ className?: string; "data-icon"?: string }>;
    return <Icon data-icon="true" />;
  }
  return icon;
}

export const ButtonUtility = forwardRef<
  HTMLButtonElement,
  ButtonUtilityProps
>(
  (
    {
      className,
      color,
      size,
      asChild = false,
      icon,
      tooltip,
      type,
      disabled,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        title={tooltip}
        className={cn(buttonUtilityVariants({ color, size }), className)}
        aria-disabled={asChild && disabled ? true : undefined}
        {...(asChild
          ? {}
          : { type: type ?? "button", disabled })}
        {...props}
        aria-label={ariaLabel ?? tooltip}
      >
        {renderIcon(icon)}
      </Comp>
    );
  }
);

ButtonUtility.displayName = "ButtonUtility";
