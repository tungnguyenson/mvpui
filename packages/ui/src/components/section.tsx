/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, title, description, actions, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("border-b border-border py-8 last:border-0", className)}
      {...props}
    >
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        <div className="md:w-[280px] md:shrink-0">
          <h3 className="text-sm font-semibold text-fg">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {children}
          {actions && (
            <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  )
);
Section.displayName = "Section";
