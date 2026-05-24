"use client";

import { cn } from "../../shifts/lib/cn";
import type { ShiftDate } from "./date-utils";

interface DateCellProps {
  shiftDate: ShiftDate;
  filled: number;
  needed: number;
  selected: boolean;
  onClick: () => void;
  variant?: "strip" | "grid";
  className?: string;
}

function fillColor(rate: number): string {
  if (rate >= 1) return "bg-success-fg";
  if (rate > 0) return "bg-warning-fg";
  return "bg-error-fg";
}

export function DateCell({
  shiftDate,
  filled,
  needed,
  selected,
  onClick,
  variant = "strip",
  className,
}: DateCellProps) {
  const { weekDayLabel, dayOfMonth, isWorkingDay } = shiftDate;

  if (variant === "grid") {
    const rate = needed > 0 && isWorkingDay ? filled / needed : 0;
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={!isWorkingDay}
        className={cn(
          "flex min-h-14 w-full flex-col items-center justify-center rounded-lg border py-2 transition-colors",
          isWorkingDay
            ? selected
              ? "border-border-brand bg-bg ring-1 ring-border-brand"
              : "border-border-secondary bg-bg hover:border-border-brand hover:bg-bg-secondary"
            : "cursor-default border-border-secondary bg-bg-secondary opacity-50",
          className,
        )}
      >
        <span
          className={cn(
            "text-sm font-semibold",
            selected ? "text-fg-brand" : isWorkingDay ? "text-fg" : "text-fg-disabled",
          )}
        >
          {dayOfMonth}
        </span>
        {isWorkingDay && (
          <div className={cn("mt-1 size-1.5 rounded-full", fillColor(rate))} />
        )}
      </button>
    );
  }

  if (!isWorkingDay) {
    return (
      <div
        className={cn(
          "flex min-w-13 flex-col items-center rounded-lg border border-border-secondary bg-bg-secondary px-2 py-2.5 ",
          className,
        )}
        title="Không có ca tuyển ngày này"
        aria-disabled="true"
      >
        <span className="text-[10px] font-medium uppercase tracking-wide text-fg-disabled">
          {weekDayLabel}
        </span>
        <span className="mt-0.5 text-sm font-semibold text-fg-disabled">{dayOfMonth}</span>
        <div className="mt-2 text-xs text-fg-disabled">—</div>
      </div>
    );
  }

  const rate = needed > 0 ? filled / needed : 0;
  const pct = Math.min(Math.round(rate * 100), 100);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-w-15 flex-col items-center rounded-lg border px-2 py-2.5 transition-colors",
        selected
          ? "border-border-brand bg-bg ring-1 ring-border-brand"
          : "border-border-secondary bg-bg hover:border-border-brand hover:bg-bg-secondary",
        className,
      )}
    >
      <span className="text-[10px] font-medium uppercase tracking-wide text-fg-tertiary">
        {weekDayLabel}
      </span>
      <span
        className={cn(
          "mt-0.5 text-sm font-semibold",
          selected ? "text-fg-brand" : "text-fg",
        )}
      >
        {dayOfMonth}
      </span>
      <div className="mt-2 w-full space-y-1">
        <div className="flex items-baseline justify-center gap-0.5">
          <span className="text-xs font-semibold text-fg">{filled}</span>
          <span className="text-[10px] text-fg-tertiary">/{needed}</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-bg-tertiary">
          <div
            className={cn("h-full rounded-full transition-all", fillColor(rate))}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div
          className={cn(
            "text-center text-[10px] font-medium",
            pct === 100
              ? "text-fg-success"
              : pct > 0
                ? "text-fg-warning"
                : "text-fg-error",
          )}
        >
          {pct}%
        </div>
      </div>
      {selected && (
        <div className="mt-1.5 h-1 w-1 rounded-full bg-fg-brand" aria-hidden />
      )}
    </button>
  );
}
