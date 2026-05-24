"use client";

import { Avatar, ProgressBarBase } from "@mvp-ui/ui";
import { cn } from "../lib/cn";
import { SHIFT_STATUS_LABELS, type ShiftRecord, type ShiftStatus } from "../shifts-data";
import { formatTimeRange } from "../lib/date-utils";

const STATUS_DOT_CLASS: Record<ShiftStatus, string> = {
  open: "bg-warning-fg",
  filling: "bg-warning-fg",
  full: "bg-success-fg",
  critical: "bg-error-fg",
  closed: "bg-bg-tertiary",
};

interface ShiftCardProps {
  shift: ShiftRecord;
  onSelect: (shift: ShiftRecord) => void;
  isSelected?: boolean;
}

export function ShiftCard({ shift, onSelect, isSelected }: ShiftCardProps) {
  const status = SHIFT_STATUS_LABELS[shift.status];
  const startDate = new Date(shift.startAtMs);
  const endDate = new Date(shift.endAtMs);
  const isPast = endDate.getTime() < Date.now();
  const isCritical = shift.status === "critical";

  const progressClass =
    shift.status === "critical"
      ? "bg-error-fg"
      : shift.status === "full"
        ? "bg-success-fg"
        : "bg-warning-fg";

  return (
    <button
      type="button"
      onClick={() => onSelect(shift)}
      aria-label={`Mở chi tiết ${shift.name}`}
      className={cn(
        "group flex w-full cursor-pointer flex-col gap-1.5 rounded-lg border bg-bg p-2.5 text-left",
        "shadow-xs transition-all",
        "hover:border-border-brand hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/22",
        isCritical && "border-l-4 border-l-border-error",
        !isCritical && "border-border-secondary",
        isSelected && "ring-2 ring-border-brand",
        isPast && "opacity-60",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold text-fg-secondary tabular-nums">
          {formatTimeRange(startDate, endDate)}
        </span>
        <div
          className="relative shrink-0"
          title={`${shift.operator.name} · ${status.label}`}
        >
          <Avatar
            size="xs"
            src={shift.operator.avatarUrl}
            alt={shift.operator.name}
            initials={shift.operator.initials}
          />
          <span
            aria-label={status.label}
            className={cn(
              "absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full ring-2 ring-bg",
              STATUS_DOT_CLASS[shift.status],
            )}
          />
        </div>
      </div>
      <div className="truncate text-sm font-semibold text-fg">{shift.name}</div>
      <div className="truncate text-xs text-fg-tertiary">{shift.site}</div>
      <div className="mt-1 flex items-center gap-2">
        <ProgressBarBase
          value={shift.assignedCount}
          min={0}
          max={shift.requiredCount}
          className="h-1.5 min-w-0 flex-1"
          progressClassName={progressClass}
        />
        <span className="shrink-0 text-xs font-medium text-fg-secondary tabular-nums">
          {shift.assignedCount}/{shift.requiredCount}
        </span>
      </div>
    </button>
  );
}
