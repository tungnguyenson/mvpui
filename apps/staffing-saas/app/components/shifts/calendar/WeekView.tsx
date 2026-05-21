"use client";

import { useMemo } from "react";
import type { ShiftRecord } from "../shifts-data";
import { ShiftCard } from "./ShiftCard";
import { cn } from "./lib/cn";
import {
  WEEKDAY_LABELS_VI,
  WEEKDAY_LABELS_VI_SHORT,
  formatDayMonth,
  getWeekDays,
  isSameDay,
  startOfWeekMonday,
  type WeekDay,
} from "./lib/date-utils";
import {
  TIME_BUCKET_ORDER,
  getTimeBucket,
  type TimeBucket,
} from "./lib/filter-state";

interface WeekViewProps {
  anchor: Date;
  shifts: ShiftRecord[];
  selectedShiftId: string | null;
  onSelectShift: (shift: ShiftRecord) => void;
}

type DayBuckets = Record<TimeBucket, ShiftRecord[]>;

function emptyBuckets(): DayBuckets {
  return { morning: [], afternoon: [], evening: [], night: [] };
}

export function WeekView({
  anchor,
  shifts,
  selectedShiftId,
  onSelectShift,
}: WeekViewProps) {
  const weekStart = startOfWeekMonday(anchor);
  const days = getWeekDays(weekStart);

  const byDayBucket = useMemo(() => {
    const map: DayBuckets[] = days.map(() => emptyBuckets());
    for (const shift of shifts) {
      const date = new Date(shift.startAtMs);
      for (let i = 0; i < 7; i++) {
        const day = days[i]!;
        if (isSameDay(date, day)) {
          map[i]![getTimeBucket(shift)].push(shift);
          break;
        }
      }
    }
    for (const buckets of map) {
      for (const list of Object.values(buckets)) {
        list.sort((a, b) => a.startAtMs - b.startAtMs);
      }
    }
    return map;
  }, [days, shifts]);

  const dayStats = useMemo(
    () =>
      byDayBucket.map((b) => {
        let count = 0;
        let required = 0;
        let assigned = 0;
        for (const bucket of TIME_BUCKET_ORDER) {
          for (const shift of b[bucket]) {
            count += 1;
            required += shift.requiredCount;
            assigned += shift.assignedCount;
          }
        }
        return { count, required, assigned, missing: required - assigned };
      }),
    [byDayBucket],
  );

  const today = new Date();
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();

  const rowCount = TIME_BUCKET_ORDER.length + 2; // header + buckets + footer

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
        gridTemplateRows: `auto repeat(${TIME_BUCKET_ORDER.length}, auto) auto`,
        rowGap: "0.5rem",
      }}
    >
      {days.map((day, di) => {
        const isToday = isSameDay(day, today);
        const isPast = day.getTime() < todayMidnight;
        const idx = di as WeekDay;
        const buckets = byDayBucket[di]!;
        const stats = dayStats[di]!;
        return (
          <div
            key={day.toISOString()}
            className={cn(
              "grid min-w-0 grid-rows-subgrid gap-y-2 px-1.5",
              di < 6 && "border-r border-border-secondary",
              isPast && "opacity-65",
            )}
            style={{ gridRow: `span ${rowCount}` }}
          >
            <ColumnHeader
              dayIndex={idx}
              date={day}
              count={stats.count}
              isToday={isToday}
            />
            {TIME_BUCKET_ORDER.map((bucket) => (
              <div
                key={bucket}
                className="flex min-w-0 flex-col gap-2"
              >
                {buckets[bucket].map((shift) => (
                  <ShiftCard
                    key={shift.id}
                    shift={shift}
                    isSelected={selectedShiftId === shift.id}
                    onSelect={onSelectShift}
                  />
                ))}
              </div>
            ))}
            <ColumnFooter stats={stats} />
          </div>
        );
      })}
    </div>
  );
}

interface ColumnStats {
  count: number;
  required: number;
  assigned: number;
  missing: number;
}

function ColumnFooter({ stats }: { stats: ColumnStats }) {
  if (stats.count === 0) {
    return <div />;
  }
  const fillPct =
    stats.required === 0
      ? 100
      : Math.round((stats.assigned / stats.required) * 100);
  const isShort = stats.missing > 0;
  return (
    <div className="mt-2 flex flex-col gap-2 rounded-md border border-border-secondary bg-bg-secondary p-2.5 tabular-nums">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-tertiary">
          Thiếu
        </span>
        <span
          className={cn(
            "text-lg leading-none font-bold",
            isShort ? "text-fg-error" : "text-fg",
          )}
        >
          {stats.missing}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-border-secondary pt-1.5 text-[11px]">
        <span className="text-fg-tertiary">Đi làm / Cần</span>
        <span className="font-semibold text-fg">
          {stats.assigned}/{stats.required}
        </span>
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-fg-tertiary">Fill rate</span>
        <span className="font-semibold text-fg">{fillPct}%</span>
      </div>
    </div>
  );
}

interface ColumnHeaderProps {
  dayIndex: WeekDay;
  date: Date;
  count: number;
  isToday: boolean;
}

function ColumnHeader({ dayIndex, date, count, isToday }: ColumnHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 shadow-xs",
        isToday
          ? "bg-bg text-fg ring-2 ring-border-brand ring-inset"
          : "bg-linear-to-b from-brand-700 to-brand-900 text-bg", // dark-ok: brand identity gradient, same in both themes
      )}
    >
      <div className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            "truncate text-[11px] font-semibold uppercase tracking-wider",
            isToday ? "text-fg-tertiary" : "opacity-80",
          )}
        >
          <span className="hidden md:inline">{WEEKDAY_LABELS_VI[dayIndex]}</span>
          <span className="md:hidden">{WEEKDAY_LABELS_VI_SHORT[dayIndex]}</span>
        </span>
        <span
          className={cn(
            "text-sm font-semibold tabular-nums",
            isToday && "text-fg-brand",
          )}
        >
          {formatDayMonth(date)}
        </span>
      </div>
      <span
        className={cn(
          "inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-xs font-semibold tabular-nums",
          count === 0 && "opacity-50",
          !count
            ? ""
            : isToday
              ? "bg-info-bg text-fg-brand"
              : "bg-white/15 text-current", // dark-ok: alpha overlay on brand gradient
        )}
      >
        {count}
      </span>
    </div>
  );
}
