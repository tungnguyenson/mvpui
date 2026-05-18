"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { Ref } from "react";
import { cn } from "../lib/cn.js";

export interface LoadingIndicatorProps {
  ref?: Ref<HTMLDivElement>;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots";
  color?: "primary" | "secondary";
  className?: string;
}

const SPINNER_SIZE = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
} as const;

const STROKE_SIZE = {
  sm: 2,
  md: 2,
  lg: 2.5,
} as const;

const DOT_SIZE = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
} as const;

const DOT_GAP = {
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2",
} as const;

export const LoadingIndicator = ({
  size = "md",
  variant = "spinner",
  color = "primary",
  className,
  ref,
}: LoadingIndicatorProps) => {
  const colorClass =
    color === "primary" ? "text-fg-brand" : "text-fg-tertiary";

  if (variant === "dots") {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          "flex items-center",
          DOT_GAP[size],
          colorClass,
          className,
        )}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "animate-pulse rounded-full bg-current",
              DOT_SIZE[size],
            )}
            style={{ animationDelay: `${i * 160}ms` }}
          />
        ))}
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn(colorClass, className)}
    >
      <svg
        className={cn("animate-spin", SPINNER_SIZE[size])}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={STROKE_SIZE[size]}
          opacity={0.25}
        />
        {/* Moving arc */}
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth={STROKE_SIZE[size]}
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">Loading…</span>
    </div>
  );
};
LoadingIndicator.displayName = "LoadingIndicator";
