"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import type { Ref } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn.js";

/* ==========================================================================
   Pagination — prev/next + page number buttons with sibling range + ellipsis.
   ========================================================================== */

export interface PaginationProps {
  ref?: Ref<HTMLElement>;
  /** Total number of pages. */
  totalPages: number;
  /** Current active page (1-indexed). */
  currentPage: number;
  /** Callback when a page is requested. */
  onPageChange: (page: number) => void;
  /**
   * How many page buttons to show on each side of the current page.
   * @default 1
   */
  siblingCount?: number;
  /** Compact mode: hides page number buttons, shows only prev/next. */
  compact?: boolean;
  className?: string;
}

/** Build the page-range array with ellipsis entries ("..."). */
function buildRange(
  current: number,
  total: number,
  siblings: number,
): Array<number | "..."> {
  // e.g. siblings=1, window = [current-1, current, current+1]
  const windowStart = Math.max(2, current - siblings);
  const windowEnd = Math.min(total - 1, current + siblings);

  const showLeftEllipsis = windowStart > 2;
  const showRightEllipsis = windowEnd < total - 1;

  const pages: Array<number | "..."> = [1];

  if (showLeftEllipsis) {
    pages.push("...");
  } else {
    // fill 2..windowStart-1
    for (let p = 2; p < windowStart; p++) pages.push(p);
  }

  for (let p = windowStart; p <= windowEnd; p++) pages.push(p);

  if (showRightEllipsis) {
    pages.push("...");
  } else {
    for (let p = windowEnd + 1; p < total; p++) pages.push(p);
  }

  if (total > 1) pages.push(total);

  return pages;
}

// ─── Sub-components ────────────────────────────────────────────────────────

const BUTTON_BASE =
  "inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg px-2 text-sm font-medium outline-none transition-colors select-none focus-visible:ring-2 focus-visible:ring-brand-500/22 disabled:cursor-not-allowed disabled:opacity-40";

interface PageButtonProps {
  page: number;
  isActive: boolean;
  onClick: () => void;
}

const PageButton = ({ page, isActive, onClick }: PageButtonProps) => (
  <button
    type="button"
    aria-label={`Page ${page}`}
    aria-current={isActive ? "page" : undefined}
    onClick={onClick}
    className={cn(
      BUTTON_BASE,
      isActive
        ? "bg-bg-secondary font-semibold text-fg ring-1 ring-border"
        : "text-fg-tertiary hover:bg-bg-secondary hover:text-fg",
    )}
  >
    {page}
  </button>
);

const Ellipsis = () => (
  <span
    aria-hidden="true"
    className="inline-flex h-9 min-w-9 items-center justify-center text-sm text-fg-tertiary"
  >
    …
  </span>
);

// ─── Main export ───────────────────────────────────────────────────────────

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  compact = false,
  className,
  ref,
}: PaginationProps) => {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const pages = buildRange(currentPage, totalPages, siblingCount);

  return (
    <nav
      ref={ref}
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
    >
      {/* Previous */}
      <button
        type="button"
        aria-label="Previous page"
        disabled={!canPrev}
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        className={cn(
          BUTTON_BASE,
          "gap-1.5 px-3 text-fg-secondary",
          canPrev ? "hover:bg-bg-secondary hover:text-fg" : "opacity-40",
        )}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        {!compact && <span>Previous</span>}
      </button>

      {/* Page numbers */}
      {!compact &&
        pages.map((page, i) =>
          page === "..." ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis positions are stable
            <Ellipsis key={`ellipsis-${i}`} />
          ) : (
            <PageButton
              key={page}
              page={page}
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
            />
          ),
        )}

      {/* Next */}
      <button
        type="button"
        aria-label="Next page"
        disabled={!canNext}
        onClick={() => canNext && onPageChange(currentPage + 1)}
        className={cn(
          BUTTON_BASE,
          "gap-1.5 px-3 text-fg-secondary",
          canNext ? "hover:bg-bg-secondary hover:text-fg" : "opacity-40",
        )}
      >
        {!compact && <span>Next</span>}
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </nav>
  );
};
Pagination.displayName = "Pagination";
