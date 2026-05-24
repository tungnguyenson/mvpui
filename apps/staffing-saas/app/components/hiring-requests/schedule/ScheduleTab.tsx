"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, Plus } from "lucide-react";
import { cn } from "../../shifts/lib/cn";
import type { WeekDay } from "../../shifts/lib/date-utils";
import type { HiringAssignment, HiringRequestRecord } from "../hiring-requests-data";
import { AssignmentPanel } from "./AssignmentPanel";
import { DateStrip } from "./DateStrip";
import { CandidateFunnelPanel } from "../CandidateFunnelPanel";
import { computeShiftDates, parseDDMMYYYY, type ShiftDate } from "./date-utils";

const DEFAULT_WEEKDAYS: WeekDay[] = [0, 1, 2, 3, 4];
const SHOW_EMPTY_KEY = "hr.schedule.showEmpty";

interface ScheduleTabProps {
  record: HiringRequestRecord;
}

export function ScheduleTab({ record }: ScheduleTabProps) {
  const weekdays = record.weekdays ?? DEFAULT_WEEKDAYS;
  const initialAssignments = record.assignments ?? [];

  const shiftDates = useMemo<ShiftDate[]>(
    () => computeShiftDates(record.startDate, record.endDate, weekdays),
    [record.startDate, record.endDate, weekdays],
  );

  const firstWorkingDay = useMemo(
    () => shiftDates.find((d) => d.isWorkingDay)?.dateStr ?? null,
    [shiftDates],
  );

  // null = "Cả đợt" overview; string = specific date selected
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showEmpty, setShowEmpty] = useState(true);
  const [navAnchor, setNavAnchor] = useState<Date>(
    () => (firstWorkingDay ? parseDDMMYYYY(firstWorkingDay) : new Date()),
  );
  const [assignments, setAssignments] = useState<HiringAssignment[]>(initialAssignments);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(SHOW_EMPTY_KEY);
    if (stored === "0") setShowEmpty(false);
  }, []);

  function handleToggleShowEmpty() {
    setShowEmpty((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(SHOW_EMPTY_KEY, next ? "1" : "0");
      }
      return next;
    });
  }

  function handleGoToToday() {
    const today = new Date();
    setNavAnchor(today);
    const todayMs = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const todayShiftDate = shiftDates.find((d) => d.dateObj.getTime() === todayMs);
    if (todayShiftDate?.isWorkingDay) {
      setSelectedDate(todayShiftDate.dateStr);
    }
  }

  function handleConfirm(id: string) {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "confirmed" as const } : a)),
    );
  }

  function handleCancel(id: string) {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" as const } : a)),
    );
  }

  const selectedShiftDate = useMemo<ShiftDate | null>(
    () => (selectedDate ? (shiftDates.find((d) => d.dateStr === selectedDate) ?? null) : null),
    [shiftDates, selectedDate],
  );

  return (
    <div className="flex flex-col gap-4 py-4 md:flex-row md:items-start md:gap-6">
      {/* main content */}
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <DateStrip
          shiftDates={shiftDates}
          assignments={assignments}
          headcount={record.headcount}
          selectedDate={selectedDate}
          onSelectDate={(dateStr) => {
            setSelectedDate(dateStr);
            setNavAnchor(parseDDMMYYYY(dateStr));
          }}
          onSelectAll={() => setSelectedDate(null)}
          showEmpty={showEmpty}
          navAnchor={navAnchor}
          onNavAnchorChange={setNavAnchor}
          onGoToToday={handleGoToToday}
        />

        <div className="border-t border-border-secondary" />

        {selectedDate === null ? (
          <>
            {/* <AllWorkersPanel
              assignments={assignments}
              headcount={record.headcount}
              shiftDates={shiftDates}
            />
            <div className="border-t border-border-secondary" /> */}
            <CandidateFunnelPanel
              candidates={record.candidates}
              remaining={Math.max(
                record.headcount -
                assignments.filter((a) => a.status === "confirmed").length,
                0,
              )}
            />
          </>
        ) : (
          <AssignmentPanel
            shiftDate={selectedShiftDate}
            assignments={assignments}
            headcount={record.headcount}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>

      {/* sidebar */}
      <div className="w-full shrink-0 md:w-52">
        <div className="sticky top-4 flex flex-col gap-3 rounded-xl border border-border-secondary bg-bg p-4">
          <button
            type="button"
            onClick={handleToggleShowEmpty}
            className="flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-fg-secondary hover:bg-bg-secondary"
          >
            {showEmpty ? (
              <EyeOff className="size-3.5 shrink-0 text-fg-tertiary" />
            ) : (
              <Eye className="size-3.5 shrink-0 text-fg-tertiary" />
            )}
            <span className="text-left">
              {showEmpty ? "Ẩn ngày không tuyển" : "Hiện ngày không tuyển"}
            </span>
          </button>

          <div className="h-px bg-border-secondary" />

          <button
            type="button"
            disabled={!selectedShiftDate?.isWorkingDay}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors",
              selectedShiftDate?.isWorkingDay
                ? "border-border-brand bg-bg text-fg-brand hover:bg-bg-secondary"
                : "cursor-default border-border-secondary bg-bg-secondary text-fg-disabled",
            )}
          >
            <Plus className="size-3.5 shrink-0" />
            <span className="text-left">Thêm CTV cho ngày này</span>
          </button>
        </div>
      </div>
    </div>
  );
}
