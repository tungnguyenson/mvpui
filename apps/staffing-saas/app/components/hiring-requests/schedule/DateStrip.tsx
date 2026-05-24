"use client";

import { ButtonUtility } from "@mvp-ui/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useRef } from "react";
import { addDays, formatDateRangeVi, startOfWeekMonday } from "../../shifts/lib/date-utils";
import { DateCell } from "./DateCell";
import { OverviewCell } from "./OverviewCell";
import { isLongJob, type ShiftDate } from "./date-utils";
import type { HiringAssignment } from "../hiring-requests-data";

interface DateStripProps {
  shiftDates: ShiftDate[];
  assignments: HiringAssignment[];
  headcount: number;
  selectedDate: string | null;
  onSelectDate: (dateStr: string) => void;
  onSelectAll: () => void;
  showEmpty: boolean;
  navAnchor: Date;
  onNavAnchorChange: (next: Date) => void;
  onGoToToday: () => void;
}

function filledForDate(assignments: HiringAssignment[], dateStr: string): number {
  return assignments.filter(
    (a) => a.date === dateStr && (a.status === "assigned" || a.status === "confirmed"),
  ).length;
}

export function DateStrip({
  shiftDates,
  assignments,
  headcount,
  selectedDate,
  onSelectDate,
  onSelectAll,
  showEmpty,
  navAnchor,
  onNavAnchorChange,
  onGoToToday,
}: DateStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const longJob = isLongJob(shiftDates);

  const weekStart = startOfWeekMonday(navAnchor);
  const weekEnd = addDays(weekStart, 6);

  const visibleDates = useMemo<ShiftDate[]>(() => {
    if (!longJob) {
      return showEmpty ? shiftDates : shiftDates.filter((d) => d.isWorkingDay);
    }
    const wStart = weekStart.getTime();
    const wEnd = weekEnd.getTime();
    const inWeek = shiftDates.filter(
      (d) => d.dateObj.getTime() >= wStart && d.dateObj.getTime() <= wEnd,
    );
    return showEmpty ? inWeek : inWeek.filter((d) => d.isWorkingDay);
  }, [shiftDates, longJob, showEmpty, weekStart, weekEnd]);

  const totalUniqueWorkers = useMemo(() => {
    const ids = new Set(
      assignments
        .filter((a) => a.status === "assigned" || a.status === "confirmed")
        .map((a) => a.workerId),
    );
    return ids.size;
  }, [assignments]);

  return (
    <div className="flex flex-col gap-2">
      {/* toolbar — long jobs only */}
      {longJob && (
        <div className="flex items-center gap-2">
          <ButtonUtility
            size="sm"
            color="tertiary"
            icon={<ChevronLeft />}
            aria-label="Tuần trước"
            onClick={() => onNavAnchorChange(addDays(navAnchor, -7))}
          />
          <div className="flex h-8 items-center rounded-md border border-border bg-bg px-3 text-sm font-medium text-fg">
            {formatDateRangeVi(weekStart, weekEnd)}
          </div>
          <ButtonUtility
            size="sm"
            color="tertiary"
            icon={<ChevronRight />}
            aria-label="Tuần sau"
            onClick={() => onNavAnchorChange(addDays(navAnchor, 7))}
          />
          <button
            type="button"
            onClick={onGoToToday}
            className="rounded-md border border-border bg-bg px-2.5 py-1 text-xs font-medium text-fg hover:bg-bg-secondary"
          >
            Hôm nay
          </button>
        </div>
      )}

      {/* cells */}
      <div
        ref={scrollRef}
        className="flex gap-1.5 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex flex-1 items-start">
          <OverviewCell
            selected={selectedDate === null}
            onClick={onSelectAll}
            totalWorkers={totalUniqueWorkers}
            headcount={headcount}
          />
        </div>

        {visibleDates.length === 0 ? (
            <p className="flex items-center py-3 text-sm text-fg-tertiary">
              Không có ngày nào trong tuần này có ca tuyển.
            </p>
          ) : (
            visibleDates.map((sd, idx) => {
              const showWeekSep =
                !showEmpty &&
                longJob &&
                idx > 0 &&
                sd.isoWeek !== visibleDates[idx - 1]!.isoWeek;
              return (
                <div key={sd.dateStr} className="flex flex-1 items-start gap-1.5">
                  {showWeekSep && (
                    <div className="flex h-full items-start pt-3">
                      <div className="h-full w-px bg-border-secondary" />
                      <span className="ml-1 text-[10px] text-fg-disabled">W{sd.isoWeek}</span>
                    </div>
                  )}
                  <DateCell
                    shiftDate={sd}
                    filled={filledForDate(assignments, sd.dateStr)}
                    needed={headcount}
                    selected={selectedDate === sd.dateStr}
                    onClick={() => sd.isWorkingDay && onSelectDate(sd.dateStr)}
                    className="flex-1"
                  />
                </div>
              );
            })
          )}
      </div>
    </div>
  );
}
