/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/progress-indicators/progress-indicators.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cn } from "../../lib/cn.js";
import type { ProgressBarProps } from "./shared.js";

export type { ProgressBarProps };

export const ProgressBarBase = ({
  value,
  min = 0,
  max = 100,
  className,
  progressClassName,
}: ProgressBarProps) => {
  const pct = Math.max(0, Math.min(100, ((value - min) * 100) / (max - min)));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      className={cn("h-2 w-full overflow-hidden rounded-md bg-bg-tertiary", className)}
    >
      <div
        style={{ transform: `translateX(-${100 - pct}%)` }}
        className={cn(
          "size-full rounded-md bg-fg-brand transition duration-75 ease-linear",
          progressClassName,
        )}
      />
    </div>
  );
};
