"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { ReactNode, Ref } from "react";
import { cn } from "../lib/cn.js";

export interface EmptyStateProps {
  ref?: Ref<HTMLDivElement>;
  /** Optional icon or visual element, e.g. <FeaturedIcon … /> */
  icon?: ReactNode;
  /** Primary heading text. */
  title: string;
  /** Supporting description text. */
  description?: string;
  /** Action buttons or links (ReactNode). */
  actions?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  icon,
  title,
  description,
  actions,
  className,
  ref,
}: EmptyStateProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-bg-secondary px-6 py-12 text-center",
        className,
      )}
    >
      {icon && <div className="mb-1 flex items-center justify-center">{icon}</div>}

      <div className="flex flex-col gap-1">
        <p className="text-md font-semibold text-fg">{title}</p>
        {description && (
          <p className="max-w-xs text-sm text-fg-tertiary">{description}</p>
        )}
      </div>

      {actions && (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};
EmptyState.displayName = "EmptyState";
