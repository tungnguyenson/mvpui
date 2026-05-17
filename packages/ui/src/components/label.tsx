/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium text-fg", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";
