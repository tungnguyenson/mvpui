"use client";

import { ButtonUtility } from "@mvp-ui/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import {
  addDays,
  formatDateLongVi,
  formatDayMonth,
  startOfDay,
  WEEKDAY_LABELS_VI,
  WEEKDAY_LABELS_VI_SHORT,
  type WeekDay,
} from "../lib/date-utils";

interface DayNavigatorProps {
  anchor: Date;
  onChange: (next: Date) => void;
}

export function DayNavigator({ anchor, onChange }: DayNavigatorProps) {
  const today = startOfDay(new Date());
  const days = [-1, 0, 1].map((offset) => startOfDay(addDays(anchor, offset)));

  return (
    <div className="flex w-full items-center gap-1.5">
      <ButtonUtility
        size="sm"
        color="tertiary"
        icon={<ChevronLeft />}
        aria-label="Ngày trước"
        onClick={() => onChange(addDays(anchor, -1))}
      />

      <div className="flex flex-1 gap-1">
        {days.map((day, i) => {
          const isActive = i === 1;
          const isToday = day.getTime() === today.getTime();
          const dowIdx = (day.getDay() === 0 ? 6 : day.getDay() - 1) as WeekDay;

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onChange(day)}
              aria-label={`${WEEKDAY_LABELS_VI[dowIdx]}, ${formatDateLongVi(day)}`}
              aria-current={isActive ? "date" : undefined}
              className={cn(
                "flex h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg text-center transition-colors",
                isActive
                  ? isToday
                    ? "bg-bg text-fg ring-2 ring-border-brand ring-inset"
                    : "bg-linear-to-b from-brand-700 to-brand-900 text-white shadow-sm dark:from-brand-500 dark:to-brand-700" // dark-ok: brand gradient on active non-today pill
                  : "border border-border-secondary bg-bg text-fg hover:bg-bg-secondary",
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider leading-none",
                  isActive && !isToday ? "text-white/80" : "text-fg-tertiary",
                  isActive && isToday && "text-fg-brand",
                )}
              >
                {WEEKDAY_LABELS_VI_SHORT[dowIdx]}
              </span>
              <span
                className={cn(
                  "text-sm font-semibold tabular-nums leading-none",
                  isActive && !isToday && "text-white",
                  isActive && isToday && "text-fg-brand",
                )}
              >
                {formatDayMonth(day)}
              </span>
              {isToday && !isActive && (
                <span className="size-1 rounded-full bg-fg-brand" />
              )}
            </button>
          );
        })}
      </div>

      <ButtonUtility
        size="sm"
        color="tertiary"
        icon={<ChevronRight />}
        aria-label="Ngày sau"
        onClick={() => onChange(addDays(anchor, 1))}
      />
    </div>
  );
}
