"use client";

/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Fragment, forwardRef, type HTMLAttributes } from "react";
import { Home, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn.js";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** @default "chevron" */
  divider?: "chevron" | "slash";
  /** @default "text" */
  variant?: "text" | "text-with-line" | "button";
  /** Renders the first item as a home icon instead of its label. @default true */
  showHomeIcon?: boolean;
}

function SlashIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M10 2.5L6 13.5"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      divider = "chevron",
      variant = "text",
      showHomeIcon = true,
      className,
      ...props
    },
    ref,
  ) => {
    const isButton = variant === "button";
    const isTextWithLine = variant === "text-with-line";

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(
          "flex items-center",
          isTextWithLine && "border-y border-border-secondary py-2",
          className,
        )}
        {...props}
      >
        <ol
          className={cn(
            "flex items-center",
            isButton ? "gap-1" : "gap-2",
            isTextWithLine && "px-2",
          )}
        >
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;
            const showHome = isFirst && showHomeIcon;

            const itemEl = showHome ? (
              item.href && !isLast ? (
                <a
                  href={item.href}
                  aria-label={item.label || "Home"}
                  className={cn(
                    "flex items-center text-fg-quaternary transition-colors hover:text-fg",
                    isButton && "rounded-md p-1 hover:bg-bg-secondary",
                  )}
                >
                  <Home className="size-5" aria-hidden="true" />
                </a>
              ) : (
                <span
                  aria-label={item.label || "Home"}
                  className={cn(
                    "flex items-center",
                    isLast ? "text-fg-brand" : "text-fg-quaternary",
                    isButton && "rounded-md p-1",
                  )}
                >
                  <Home className="size-5" aria-hidden="true" />
                </span>
              )
            ) : isLast ? (
              <span
                className={cn(
                  "whitespace-nowrap text-sm font-semibold",
                  isButton
                    ? "rounded-md bg-bg-secondary px-2 py-1 text-fg"
                    : "text-fg-brand",
                )}
              >
                {item.label}
              </span>
            ) : item.href ? (
              <a
                href={item.href}
                className={cn(
                  "whitespace-nowrap text-sm font-semibold text-fg-quaternary transition-colors hover:text-fg",
                  isButton && "rounded-md px-2 py-1 hover:bg-bg-secondary",
                )}
              >
                {item.label}
              </a>
            ) : (
              <span
                className={cn(
                  "whitespace-nowrap text-sm font-semibold text-fg-quaternary",
                  isButton && "px-2 py-1",
                )}
              >
                {item.label}
              </span>
            );

            return (
              <Fragment key={index}>
                {!isFirst && (
                  <li
                    aria-hidden="true"
                    className="flex items-center text-fg-quaternary"
                  >
                    {divider === "chevron" ? (
                      <ChevronRight className="size-4 shrink-0" />
                    ) : (
                      <SlashIcon />
                    )}
                  </li>
                )}
                <li
                  aria-current={isLast ? "page" : undefined}
                  className="flex items-center"
                >
                  {itemEl}
                </li>
              </Fragment>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumbs.displayName = "Breadcrumbs";
