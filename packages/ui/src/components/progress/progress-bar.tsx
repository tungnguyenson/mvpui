/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/progress-indicators/progress-indicators.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import type { ProgressBarWithLabelProps } from "./shared.js";
import { ProgressBarBase } from "./progress-bar-base.js";

export type { ProgressBarWithLabelProps };

export const ProgressBar = ({
  value,
  min = 0,
  max = 100,
  valueFormatter,
  labelPosition,
  className,
  progressClassName,
}: ProgressBarWithLabelProps) => {
  const pct = Math.max(0, Math.min(100, ((value - min) * 100) / (max - min)));
  const label = valueFormatter
    ? String(valueFormatter(value, pct))
    : `${Math.round(pct)}%`;

  const bar = (
    <ProgressBarBase
      value={value}
      min={min}
      max={max}
      {...(className != null && { className })}
      {...(progressClassName != null && { progressClassName })}
    />
  );

  if (labelPosition === "right") {
    return (
      <div className="flex items-center gap-3">
        {bar}
        <span className="shrink-0 text-sm font-medium text-fg-secondary tabular-nums">
          {label}
        </span>
      </div>
    );
  }

  if (labelPosition === "bottom") {
    return (
      <div className="flex flex-col items-end gap-2">
        {bar}
        <span className="text-sm font-medium text-fg-secondary tabular-nums">
          {label}
        </span>
      </div>
    );
  }

  if (labelPosition === "top-floating") {
    return (
      <div className="relative flex flex-col gap-2">
        {bar}
        <div
          style={{ left: `${pct}%` }}
          className="absolute -top-2 -translate-x-1/2 -translate-y-full rounded-lg bg-bg-secondary px-3 py-2 shadow-lg ring-1 ring-border"
        >
          <div className="text-xs font-semibold text-fg-secondary tabular-nums">
            {label}
          </div>
        </div>
      </div>
    );
  }

  if (labelPosition === "bottom-floating") {
    return (
      <div className="relative flex flex-col gap-2">
        {bar}
        <div
          style={{ left: `${pct}%` }}
          className="absolute -bottom-2 -translate-x-1/2 translate-y-full rounded-lg bg-bg-secondary px-3 py-2 shadow-lg ring-1 ring-border"
        >
          <div className="text-xs font-semibold text-fg-secondary tabular-nums">
            {label}
          </div>
        </div>
      </div>
    );
  }

  return bar;
};
