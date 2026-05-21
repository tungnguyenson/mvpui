"use client";

import { Avatar } from "@mvp-ui/ui";
import { useMemo } from "react";
import { getCustomerLogo, type ShiftRecord, type ShiftStatus } from "../shifts-data";
import { cn } from "./lib/cn";
import {
  WEEKDAY_LABELS_VI,
  WEEKDAY_LABELS_VI_SHORT,
  formatDayMonth,
  formatTimeRangeCompact,
  getWeekDays,
  isSameDay,
  startOfWeekMonday,
  type WeekDay,
} from "./lib/date-utils";

interface CustomerViewProps {
  anchor: Date;
  shifts: ShiftRecord[];
  selectedShiftId: string | null;
  onSelectShift: (shift: ShiftRecord) => void;
}

interface CustomerRow {
  id: string;
  name: string;
  initials: string;
  totalShifts: number;
  totalRequired: number;
  totalAssigned: number;
  byDay: ShiftRecord[][];
}

const STATUS_BORDER: Record<ShiftStatus, string> = {
  open: "border-l-warning-fg",
  filling: "border-l-warning-fg",
  full: "border-l-success-fg",
  critical: "border-l-error-fg",
  closed: "border-l-border-secondary",
};

const STATUS_DOT: Record<ShiftStatus, string> = {
  open: "bg-warning-fg",
  filling: "bg-warning-fg",
  full: "bg-success-fg",
  critical: "bg-error-fg",
  closed: "bg-bg-tertiary",
};

function makeInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  const first = parts[0]!;
  const last = parts[parts.length - 1]!;
  return (first.charAt(0) + last.charAt(0)).toUpperCase();
}

export function CustomerView({
  anchor,
  shifts,
  selectedShiftId,
  onSelectShift,
}: CustomerViewProps) {
  const weekStart = startOfWeekMonday(anchor);
  const days = getWeekDays(weekStart);

  const rows: CustomerRow[] = useMemo(() => {
    const map = new Map<string, CustomerRow>();
    for (const shift of shifts) {
      let row = map.get(shift.customerId);
      if (!row) {
        row = {
          id: shift.customerId,
          name: shift.customer,
          initials: makeInitials(shift.customer),
          totalShifts: 0,
          totalRequired: 0,
          totalAssigned: 0,
          byDay: days.map(() => [] as ShiftRecord[]),
        };
        map.set(shift.customerId, row);
      }
      const shiftDate = new Date(shift.startAtMs);
      const dayIdx = days.findIndex((d) => isSameDay(d, shiftDate));
      if (dayIdx >= 0) {
        row.byDay[dayIdx]!.push(shift);
        row.totalShifts += 1;
        row.totalRequired += shift.requiredCount;
        row.totalAssigned += shift.assignedCount;
      }
    }
    for (const row of map.values()) {
      for (const list of row.byDay) {
        list.sort((a, b) => a.startAtMs - b.startAtMs);
      }
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [days, shifts]);

  const dayTotals = useMemo(
    () =>
      days.map((_, i) =>
        rows.reduce((sum, r) => sum + r.byDay[i]!.length, 0),
      ),
    [days, rows],
  );

  const today = new Date();
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();

  if (rows.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed border-border-secondary bg-bg-secondary px-6 py-12 text-sm text-fg-tertiary">
        Không có khách hàng nào có ca trong tuần này.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border-secondary bg-bg">
      <div
        className="grid min-w-225"
        style={{
          gridTemplateColumns: "220px repeat(7, minmax(140px, 1fr))",
        }}
      >
        {/* Corner */}
        <div className="sticky left-0 z-20 border-r border-b border-border-secondary bg-bg-secondary px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary">
          Khách hàng
        </div>
        {/* Day headers */}
        {days.map((day, di) => {
          const isToday = isSameDay(day, today);
          const idx = di as WeekDay;
          return (
            <div
              key={`hdr-${day.toISOString()}`}
              className={cn(
                "flex items-center justify-between gap-2 border-r border-b border-border-secondary px-3 py-2.5",
                isToday
                  ? "bg-bg text-fg ring-2 ring-border-brand ring-inset"
                  : "bg-linear-to-b from-brand-700 to-brand-900 text-white dark:from-brand-500 dark:to-brand-700", // dark-ok: brand gradient
              )}
            >
              <div className="flex flex-col leading-tight">
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-wider",
                    isToday ? "text-fg-tertiary" : "opacity-80",
                  )}
                >
                  <span className="hidden md:inline">
                    {WEEKDAY_LABELS_VI[idx]}
                  </span>
                  <span className="md:hidden">
                    {WEEKDAY_LABELS_VI_SHORT[idx]}
                  </span>
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold tabular-nums",
                    isToday && "text-fg-brand",
                  )}
                >
                  {formatDayMonth(day)}
                </span>
              </div>
              <span
                className={cn(
                  "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold tabular-nums",
                  dayTotals[di] === 0 && "opacity-50",
                  isToday
                    ? "bg-info-bg text-fg-brand"
                    : "bg-white/15 text-current", // dark-ok: alpha overlay on brand gradient
                )}
              >
                {dayTotals[di]}
              </span>
            </div>
          );
        })}

        {/* Customer rows */}
        {rows.map((row, ri) => {
          const altBg = ri % 2 === 1 ? "bg-bg-secondary/50" : "bg-bg";
          const missing = row.totalRequired - row.totalAssigned;
          return (
            <CustomerRowGroup
              key={row.id}
              row={row}
              days={days}
              todayMidnight={todayMidnight}
              altBg={altBg}
              missing={missing}
              selectedShiftId={selectedShiftId}
              onSelectShift={onSelectShift}
            />
          );
        })}
      </div>
    </div>
  );
}

interface CustomerRowGroupProps {
  row: CustomerRow;
  days: Date[];
  todayMidnight: number;
  altBg: string;
  missing: number;
  selectedShiftId: string | null;
  onSelectShift: (shift: ShiftRecord) => void;
}

function CustomerRowGroup({
  row,
  days,
  todayMidnight,
  altBg,
  missing,
  selectedShiftId,
  onSelectShift,
}: CustomerRowGroupProps) {
  return (
    <>
      <div
        className={cn(
          "sticky left-0 z-10 flex items-center gap-3 border-r border-b border-border-secondary px-3 py-2.5",
          altBg,
        )}
      >
        <Avatar
          size="sm"
          rounded={false}
          src={getCustomerLogo(row.id) ?? null}
          alt={row.name}
          initials={row.initials}
          className="shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-fg">
            {row.name}
          </div>
          <div className="truncate text-[11px] tabular-nums text-fg-tertiary">
            {row.totalShifts} ca · {row.totalAssigned}/{row.totalRequired}
            {missing > 0 && (
              <span className="ml-1 font-semibold text-fg-error">
                · thiếu {missing}
              </span>
            )}
          </div>
        </div>
      </div>
      {days.map((day, di) => {
        const items = row.byDay[di]!;
        const isToday = isSameDay(day, new Date());
        const isPast = day.getTime() < todayMidnight;
        return (
          <div
            key={`${row.id}-${day.toISOString()}`}
            className={cn(
              "flex min-h-17 flex-col gap-1.5 border-r border-b border-border-secondary px-2 py-2",
              altBg,
              isToday && "bg-info-bg/30",
              isPast && "opacity-65",
              items.length === 0 && "items-center justify-center text-xs text-fg-tertiary",
            )}
          >
            {items.length === 0 ? (
              <span>—</span>
            ) : (
              items.map((shift) => (
                <MiniShiftRow
                  key={shift.id}
                  shift={shift}
                  isSelected={selectedShiftId === shift.id}
                  onSelect={onSelectShift}
                />
              ))
            )}
          </div>
        );
      })}
    </>
  );
}

interface MiniShiftRowProps {
  shift: ShiftRecord;
  isSelected: boolean;
  onSelect: (shift: ShiftRecord) => void;
}

function MiniShiftRow({ shift, isSelected, onSelect }: MiniShiftRowProps) {
  const start = new Date(shift.startAtMs);
  const end = new Date(shift.endAtMs);
  return (
    <button
      type="button"
      onClick={() => onSelect(shift)}
      title={`${shift.name} · ${shift.site}`}
      className={cn(
        "flex w-full cursor-pointer items-center gap-1.5 rounded-md border border-border-secondary border-l-[3px] bg-bg px-2 py-1 text-left text-[11px] tabular-nums shadow-xs transition-colors",
        "hover:border-border-brand",
        STATUS_BORDER[shift.status],
        isSelected && "ring-2 ring-border-brand",
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 shrink-0 rounded-full", STATUS_DOT[shift.status])}
      />
      <span className="font-semibold text-fg-secondary">
        {formatTimeRangeCompact(start, end)}
      </span>
      <span className="ml-auto text-fg-tertiary">
        {shift.assignedCount}/{shift.requiredCount}
      </span>
    </button>
  );
}
