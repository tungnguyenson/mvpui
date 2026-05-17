/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

const alertVariants = cva(
  "flex gap-3 rounded-xl border p-4 text-sm",
  {
    variants: {
      variant: {
        info: "bg-brand-50 border-brand-200 text-brand-700",
        success: "bg-success-50 border-success-200 text-success-700",
        warning: "bg-warning-50 border-warning-200 text-warning-700",
        error: "bg-error-50 border-error-200 text-error-700",
      },
    },
    defaultVariants: { variant: "info" },
  }
);

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon && (
        <span className="mt-0.5 shrink-0 [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
      )}
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
);
Alert.displayName = "Alert";

export const AlertTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("font-semibold leading-5", className)} {...props} />
));
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("leading-5 opacity-90", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";
