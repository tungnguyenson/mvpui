/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5",
    "text-xs font-medium whitespace-nowrap",
    "transition-colors duration-250 ease-[cubic-bezier(0.2,0,0,1)]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-info-bg text-info-fg border-info-border",
        secondary: "bg-neutral-bg text-fg-secondary border-neutral-border",
        success: "bg-success-bg text-success-fg border-success-border",
        warning: "bg-warning-bg text-warning-fg border-warning-border",
        error: "bg-error-bg text-error-fg border-error-border",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";
