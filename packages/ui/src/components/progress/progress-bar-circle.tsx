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
import { CIRCLE_SIZE } from "./shared.js";
import type { ProgressCircleProps } from "./shared.js";

export type { ProgressCircleProps };

export const ProgressBarCircle = ({
  value,
  min = 0,
  max = 100,
  size = "sm",
  label,
  valueFormatter,
}: ProgressCircleProps) => {
  const pct = Math.round(Math.max(0, Math.min(100, ((value - min) * 100) / (max - min))));
  const { strokeWidth, radius, valueClass, labelClass } = CIRCLE_SIZE[size];

  const diameter = 2 * (radius + strokeWidth / 2);
  const cxy = diameter / 2;
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
        <svg
          className="-rotate-90"
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
        >
          <circle
            className="stroke-bg-tertiary"
            cx={cxy}
            cy={cxy}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            pathLength="100"
            strokeDasharray="100"
            strokeLinecap="round"
          />
          <circle
            className="stroke-fg-brand transition-[stroke-dashoffset] duration-300 ease-out"
            cx={cxy}
            cy={cxy}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            pathLength="100"
            strokeDasharray="100"
            strokeLinecap="round"
            strokeDashoffset={100 - pct}
          />
        </svg>

        {label && size !== "xxs" ? (
          <div className="absolute text-center">
            <div className={labelClass}>{label}</div>
            <div className={valueClass}>{displayed}</div>
          </div>
        ) : (
          <span className={cn("absolute text-center", valueClass)}>{displayed}</span>
        )}
      </div>
      {label && size === "xxs" && <div className={labelClass}>{label}</div>}
    </div>
  );
};
