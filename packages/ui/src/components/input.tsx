/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

const inputVariants = cva(
  [
    "flex h-11 w-full rounded-md border bg-bg px-3.5",
    "text-sm text-fg placeholder:text-fg-tertiary",
    "transition-all duration-250 ease-[cubic-bezier(0.2,0,0,1)]",
    "focus-visible:outline-none focus-visible:border-border-brand focus-visible:ring-4 focus-visible:ring-brand-500/22",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-secondary",
    "[&:not(:disabled)]:cursor-text",
  ],
  {
    variants: {
      variant: {
        default: "border-border shadow-xs",
        error:
          "border-error-500 focus-visible:border-error-500 focus-visible:ring-error-500/22", // dark-ok: vivid red error border, both modes
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, startIcon, endIcon, ...props }, ref) => {
    const inputEl = (
      <input
        ref={ref}
        className={cn(
          inputVariants({ variant }),
          startIcon && "pl-10",
          endIcon && "pr-10",
          className
        )}
        {...props}
      />
    );

    if (!startIcon && !endIcon) return inputEl;

    return (
      <div className="relative w-full">
        {startIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-fg-tertiary">
            {startIcon}
          </span>
        )}
        {inputEl}
        {endIcon && (
          <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-fg-tertiary">
            {endIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
