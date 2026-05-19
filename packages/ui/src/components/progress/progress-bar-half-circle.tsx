/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/progress-indicators/progress-circles.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cn } from "../../lib/cn.js";
import { HALF_SIZE } from "./shared.js";
import type { ProgressCircleProps } from "./shared.js";

export const ProgressBarHalfCircle = ({
  value,
  min = 0,
  max = 100,
  size = "sm",
  label,
  valueFormatter,
}: ProgressCircleProps) => {
  const pct = Math.round(Math.max(0, Math.min(100, ((value - min) * 100) / (max - min))));
  const { strokeWidth, radius, valueClass, labelClass, bottomClass } = HALF_SIZE[size];

  const width = 2 * (radius + strokeWidth / 2);
  const height = radius + strokeWidth;
  const cy = radius + strokeWidth / 2;
  const dashOffset = -50 - (100 - pct) / 2;
  const displayed = valueFormatter ? valueFormatter(value, pct) : `${pct}%`;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        className="relative flex w-max items-center justify-center"
      >
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <circle
            className="stroke-bg-tertiary"
            cx="50%"
            cy={cy}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="-50"
            strokeLinecap="round"
          />
          <circle
            className="origin-center -scale-x-100 stroke-fg-brand transition-[stroke-dashoffset] duration-300 ease-out"
            cx="50%"
            cy={cy}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>

        {label && size !== "xxs" ? (
          <div className={bottomClass}>
            <div className={labelClass}>{label}</div>
            <div className={valueClass}>{displayed}</div>
          </div>
        ) : (
          <span className={cn(bottomClass, valueClass)}>{displayed}</span>
        )}
      </div>
      {label && size === "xxs" && <div className={labelClass}>{label}</div>}
    </div>
  );
};
