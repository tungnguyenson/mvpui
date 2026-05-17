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
    "transition-colors duration-[250ms] ease-[cubic-bezier(0.2,0,0,1)]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-brand-50 text-brand-700 border-brand-200",
        secondary: "bg-gray-100 text-fg-secondary border-gray-200",
        success: "bg-success-50 text-success-700 border-success-200",
        warning: "bg-warning-50 text-warning-700 border-warning-200",
        error: "bg-error-50 text-error-700 border-error-200",
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
