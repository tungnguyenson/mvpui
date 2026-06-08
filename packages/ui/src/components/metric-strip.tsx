/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type MetricStripColor =
  | "brand"
  | "success"
  | "error"
  | "warning"
  | "gray";

export interface MetricStripItem {
  /** Optional 16-20px icon rendered inside a 32px tinted chip. */
  icon?: ReactNode;
  /** Color tone of the icon chip. Defaults to `gray`. */
  color?: MetricStripColor;
  /** Primary metric value. */
  value: ReactNode;
  /** Short label rendered under the value. */
  label: string;
  /** When set, the entire item becomes a link. */
  href?: string;
  /** Stable key for React lists. Defaults to `label`. */
  key?: string;
}

export interface MetricStripProps extends HTMLAttributes<HTMLDivElement> {
  /** Items to render across the strip. */
  items: MetricStripItem[];
  /**
   * Layout direction when the strip's own container is narrow (`< @lg`, 32rem).
   * Uses container queries, not viewport — so it lays out correctly inside a
   * fixed-width shell (e.g. a 448px phone frame) regardless of viewport size.
   * `stack` (default) stacks items vertically when narrow, row when wide.
   * `scroll` horizontally scrolls when narrow (items have natural width), row when wide.
   */
  mobileLayout?: "stack" | "scroll";
}

/* -------------------------------------------------------------------------- */
/*  Token tables                                                               */
/* -------------------------------------------------------------------------- */

const ICON_BG: Record<MetricStripColor, string> = {
  brand: "bg-info-bg text-fg-brand",
  success: "bg-success-bg text-fg-success",
  error: "bg-error-bg text-fg-error",
  warning: "bg-warning-bg text-warning-fg",
  gray: "bg-neutral-bg text-fg-tertiary",
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export const MetricStrip = forwardRef<HTMLDivElement, MetricStripProps>(
  function MetricStrip(
    { items, mobileLayout = "stack", className, ...rest },
    ref,
  ) {
    const isScroll = mobileLayout === "scroll";

    const strip = (
      <div
        ref={ref}
        className={cn(
          "flex divide-border-secondary rounded-xl border border-border-secondary bg-bg shadow-xs",
          isScroll
            ? "w-max divide-x overflow-visible @lg:w-full @lg:overflow-hidden"
            : "overflow-hidden flex-col divide-y @lg:flex-row @lg:divide-x @lg:divide-y-0",
          className,
        )}
        {...rest}
      >
        {items.map((item) => {
          const key = item.key ?? item.label;
          const content = (
            <>
              {item.icon ? (
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-md",
                    ICON_BG[item.color ?? "gray"],
                  )}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
              ) : null}
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-lg font-semibold leading-6 text-fg @lg:text-xl @lg:leading-7">
                  {item.value}
                </span>
                <span className={cn("text-xs font-medium text-fg-tertiary @lg:text-sm", isScroll ? "whitespace-nowrap" : "truncate")}>
                  {item.label}
                </span>
              </div>
            </>
          );

          const sharedClass = cn(
            "flex items-center gap-3 p-3 @lg:p-4",
            isScroll ? "shrink-0 @lg:flex-1 @lg:min-w-0" : "min-w-0 flex-1",
            item.href &&
              "cursor-pointer transition-colors hover:bg-bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-border-brand",
          );

          if (item.href) {
            return (
              <a key={key} href={item.href} className={sharedClass}>
                {content}
              </a>
            );
          }

          return (
            <div key={key} className={sharedClass}>
              {content}
            </div>
          );
        })}
      </div>
    );

    if (isScroll) {
      return (
        <div className="@container">
          <div className="-mx-4 overflow-x-auto px-4 scrollbar-none @lg:mx-0 @lg:overflow-visible @lg:px-0">
            {strip}
          </div>
        </div>
      );
    }

    return <div className="@container">{strip}</div>;
  },
);
MetricStrip.displayName = "MetricStrip";
