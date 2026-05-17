/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-semibold whitespace-nowrap select-none",
    "transition-all duration-[250ms] ease-[cubic-bezier(0.2,0,0,1)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/22",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "cursor-pointer"
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary border border-primary text-primary-fg shadow-xs",
          "hover:enabled:bg-primary-hover hover:enabled:shadow-md",
          "active:enabled:bg-brand-800",
        ],
        secondary: [
          "bg-white border border-border text-fg-secondary shadow-xs",
          "hover:enabled:bg-gray-50",
          "active:enabled:bg-gray-100",
        ],
        ghost: [
          "text-fg-secondary",
          "hover:enabled:bg-gray-50",
          "active:enabled:bg-gray-100",
        ],
        destructive: [
          "bg-error-600 border border-error-600 text-white shadow-xs",
          "hover:enabled:bg-error-700",
          "active:enabled:bg-error-600",
        ],
      },
      size: {
        sm: "h-9 px-3.5 text-sm rounded-md",
        md: "h-11 px-[18px] text-sm rounded-md",
        lg: "h-12 px-5 text-md rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
