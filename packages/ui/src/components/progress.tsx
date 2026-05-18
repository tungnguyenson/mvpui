/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/progress-indicators/progress-indicators.tsx
 *       components/base/progress-indicators/progress-circles.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cn } from "../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Shared types                                                               */
/* -------------------------------------------------------------------------- */

export interface ProgressBarProps {
  value: number;
  min?: number;
  max?: number;
  className?: string;
  progressClassName?: string;
  valueFormatter?: (value: number, percentage: number) => string | number;
}

export interface ProgressBarWithLabelProps extends ProgressBarProps {
  labelPosition?: "right" | "bottom" | "top-floating" | "bottom-floating";
}

/* -------------------------------------------------------------------------- */
/*  ProgressBarBase                                                            */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  ProgressBar (with optional label)                                         */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  ProgressBarCircle                                                          */
/* -------------------------------------------------------------------------- */

export interface ProgressCircleProps {
  value: number;
  min?: number;
  max?: number;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  label?: string;
  valueFormatter?: (value: number, percentage: number) => string | number;
}

const CIRCLE_SIZE = {
  xxs: { strokeWidth: 6,  radius: 29,  valueClass: "text-sm font-semibold text-fg",   labelClass: "text-xs font-medium text-fg-tertiary" },
  xs:  { strokeWidth: 16, radius: 72,  valueClass: "text-2xl font-semibold text-fg",   labelClass: "text-xs font-medium text-fg-tertiary" },
  sm:  { strokeWidth: 20, radius: 90,  valueClass: "text-3xl font-semibold text-fg",   labelClass: "text-xs font-medium text-fg-tertiary" },
  md:  { strokeWidth: 24, radius: 108, valueClass: "text-4xl font-semibold text-fg",   labelClass: "text-sm font-medium text-fg-tertiary" },
  lg:  { strokeWidth: 28, radius: 126, valueClass: "text-5xl font-semibold text-fg",   labelClass: "text-sm font-medium text-fg-tertiary" },
} as const;

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

/* -------------------------------------------------------------------------- */
/*  ProgressBarHalfCircle                                                      */
/* -------------------------------------------------------------------------- */

const HALF_SIZE = {
  xxs: { strokeWidth: 6,  radius: 29,  valueClass: "text-sm font-semibold text-fg",   labelClass: "text-xs font-medium text-fg-tertiary", bottomClass: "absolute bottom-0.5 text-center" },
  xs:  { strokeWidth: 16, radius: 72,  valueClass: "text-2xl font-semibold text-fg",   labelClass: "text-xs font-medium text-fg-tertiary", bottomClass: "absolute bottom-0.5 text-center" },
  sm:  { strokeWidth: 20, radius: 90,  valueClass: "text-3xl font-semibold text-fg",   labelClass: "text-xs font-medium text-fg-tertiary", bottomClass: "absolute bottom-2 text-center"   },
  md:  { strokeWidth: 24, radius: 108, valueClass: "text-4xl font-semibold text-fg",   labelClass: "text-sm font-medium text-fg-tertiary", bottomClass: "absolute bottom-1 text-center"   },
  lg:  { strokeWidth: 28, radius: 126, valueClass: "text-5xl font-semibold text-fg",   labelClass: "text-sm font-medium text-fg-tertiary", bottomClass: "absolute bottom-0 text-center"   },
} as const;

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
