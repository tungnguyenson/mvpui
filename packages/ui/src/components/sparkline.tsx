/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../lib/cn.js";

export type SparklinePoint = [number, number] | number;

export type SparklineTone = "brand" | "success" | "error" | "warning" | "neutral";

const TONE_VAR: Record<SparklineTone, string> = {
  brand: "var(--color-fg-brand)",
  success: "var(--color-fg-success)",
  error: "var(--color-fg-error)",
  warning: "var(--color-warning-fg)",
  neutral: "var(--color-fg-tertiary)",
};

export interface SparklineProps extends Omit<SVGAttributes<SVGSVGElement>, "points"> {
  /** Array of `[x, y]` tuples or bare `y` values (index used as x). */
  data: SparklinePoint[];
  /** Color tone. Defaults to `brand`. */
  tone?: SparklineTone;
  /** Override stroke + fill color directly (CSS color). Overrides `tone`. */
  color?: string;
  /** Pixel width of the SVG viewBox. */
  width?: number;
  /** Pixel height of the SVG viewBox. */
  height?: number;
  /** Inner padding inside the viewBox. */
  padding?: number;
  /** Stroke width. */
  strokeWidth?: number;
  /** Whether to render area fill under the line. */
  filled?: boolean;
  /** Area fill opacity. */
  fillOpacity?: number;
  /** Render smoothed (curved) line instead of straight segments. */
  smooth?: boolean;
}

function toTuple(point: SparklinePoint, index: number): [number, number] {
  return Array.isArray(point) ? point : [index, point];
}

export const Sparkline = forwardRef<SVGSVGElement, SparklineProps>(function Sparkline(
  {
    data,
    tone = "brand",
    color,
    width = 300,
    height = 56,
    padding = 4,
    strokeWidth = 1.5,
    filled = true,
    fillOpacity = 0.08,
    smooth = true,
    className,
    ...rest
  },
  ref,
) {
  if (data.length === 0) return null;

  const tuples = data.map(toTuple);
  const xs = tuples.map(([x]) => x);
  const ys = tuples.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const scaleX = (x: number) =>
    padding + ((x - minX) / (maxX - minX || 1)) * (width - padding * 2);
  const scaleY = (y: number) =>
    height - padding - ((y - minY) / (maxY - minY || 1)) * (height - padding * 2);

  const scaled = tuples.map(([x, y]) => [scaleX(x), scaleY(y)] as [number, number]);
  const first = scaled[0];
  const last = scaled.at(-1);
  if (!first || !last) return null;

  let curve = `M ${first[0]},${first[1]}`;
  for (let i = 1; i < scaled.length; i++) {
    const previous = scaled[i - 1];
    const current = scaled[i];
    if (!previous || !current) continue;
    if (smooth) {
      const centerX = (previous[0] + current[0]) / 2;
      curve += ` C ${centerX},${previous[1]} ${centerX},${current[1]} ${current[0]},${current[1]}`;
    } else {
      curve += ` L ${current[0]},${current[1]}`;
    }
  }

  const area = `${curve} L ${last[0]},${height} L ${first[0]},${height} Z`;
  const resolved = color ?? TONE_VAR[tone];

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-14 w-full", className)}
      aria-hidden="true"
      preserveAspectRatio="none"
      {...rest}
    >
      {filled ? <path d={area} fill={resolved} opacity={fillOpacity} /> : null}
      <path d={curve} fill="none" stroke={resolved} strokeWidth={strokeWidth} />
    </svg>
  );
});
Sparkline.displayName = "Sparkline";
