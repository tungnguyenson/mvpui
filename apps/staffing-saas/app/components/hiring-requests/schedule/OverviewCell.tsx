"use client";

import { Users } from "lucide-react";
import { cn } from "../../shifts/lib/cn";

interface OverviewCellProps {
  selected: boolean;
  onClick: () => void;
  totalWorkers: number;
  headcount: number;
}

function fillColor(rate: number): string {
  if (rate >= 1) return "bg-success-fg";
  if (rate > 0) return "bg-warning-fg";
  return "bg-error-fg";
}

export function OverviewCell({ selected, onClick, totalWorkers, headcount }: OverviewCellProps) {
  const rate = headcount > 0 ? totalWorkers / headcount : 0;
  const pct = Math.min(Math.round(rate * 100), 100);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full min-w-15 flex-col items-center rounded-lg border px-2 py-2.5 transition-colors",
        selected
          ? "border-border-brand bg-bg ring-1 ring-border-brand"
          : "border-border-secondary bg-bg hover:border-border-brand hover:bg-bg-secondary",
      )}
    >
      <span className="text-[10px] font-medium uppercase tracking-wide text-fg-tertiary">
        Cả đợt
      </span>
      <Users
        className={cn("mt-0.5 size-4", selected ? "text-fg-brand" : "text-fg-secondary")}
      />
      <div className="mt-2 w-full space-y-1">
        <div className="flex items-baseline justify-center gap-0.5">
          <span className="text-xs font-semibold text-fg">{totalWorkers}</span>
          <span className="text-[10px] text-fg-tertiary">/{headcount}</span>
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
            pct === 100 ? "text-fg-success" : pct > 0 ? "text-fg-warning" : "text-fg-error",
          )}
        >
          {pct}%
        </div>
      </div>
      {selected && <div className="mt-1.5 h-1 w-1 rounded-full bg-fg-brand" aria-hidden />}
    </button>
  );
}
