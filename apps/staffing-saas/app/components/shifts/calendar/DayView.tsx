"use client";

import { Tab, TabList, Tabs } from "@mvp-ui/ui";
import { useEffect, useMemo, useState } from "react";
import type { ShiftRecord } from "../shifts-data";
import { DayShiftRow } from "./DayShiftRow";
import { cn } from "../lib/cn";
import { isSameDay, startOfDay } from "../lib/date-utils";
import {
  getDayStats,
  getOperationalState,
  type OperationalState,
} from "../lib/operational";

type DayTabId = OperationalState | "all";

const TAB_DEFS: Array<{ id: DayTabId; label: string }> = [
  { id: "upcoming", label: "Sắp tới" },
  { id: "ongoing", label: "Đang diễn ra" },
  { id: "ending-soon", label: "Sắp kết thúc" },
  { id: "done", label: "Đã kết thúc" },
];

interface DayViewProps {
  anchor: Date;
  shifts: ShiftRecord[];
  selectedShiftId: string | null;
  onSelectShift: (shift: ShiftRecord) => void;
}

export function DayView({
  anchor,
  shifts,
  selectedShiftId,
  onSelectShift,
}: DayViewProps) {
  const nowMs = useNowTick(60_000);
  const dayStart = startOfDay(anchor);

  const dayShifts = useMemo(
    () => shifts.filter((s) => isSameDay(new Date(s.startAtMs), dayStart)),
    [shifts, dayStart],
  );

  const stats = useMemo(() => getDayStats(dayShifts, nowMs), [dayShifts, nowMs]);

  const grouped = useMemo(() => {
    const map: Record<OperationalState, ShiftRecord[]> = {
      upcoming: [],
      ongoing: [],
      "ending-soon": [],
      done: [],
    };
    for (const shift of dayShifts) {
      const state = getOperationalState(shift, nowMs);
      map[state].push(shift);
    }
    map.upcoming.sort((a, b) => a.startAtMs - b.startAtMs);
    map.ongoing.sort((a, b) => a.startAtMs - b.startAtMs);
    map["ending-soon"].sort((a, b) => a.endAtMs - b.endAtMs);
    map.done.sort((a, b) => b.endAtMs - a.endAtMs);
    return map;
  }, [dayShifts, nowMs]);

  const defaultTab: DayTabId = useMemo(() => {
    if (grouped.ongoing.length > 0) return "ongoing";
    if (grouped.upcoming.length > 0) return "upcoming";
    if (grouped["ending-soon"].length > 0) return "ending-soon";
    return "done";
  }, [grouped]);

  const [tab, setTab] = useState<DayTabId>(defaultTab);
  useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab]);

  const visible: ShiftRecord[] =
    tab === "all"
      ? dayShifts
      : grouped[tab];

  return (
    <div className="flex flex-col gap-4">
      <KpiStrip stats={stats} />

      <div className="overflow-hidden rounded-lg border border-border-secondary bg-bg">
        <div className="border-b border-border-secondary px-3 py-2">
          <Tabs
            size="sm"
            variant="pill"
            selectedKey={tab}
            onSelectionChange={(k) => setTab(k as DayTabId)}
          >
            <TabList aria-label="Trạng thái ca">
              {TAB_DEFS.map((t) => (
                <Tab key={t.id} id={t.id}>
                  {t.label}
                  <span className="ml-2 text-xs font-semibold tabular-nums opacity-75">
                    {t.id === "all" ? dayShifts.length : grouped[t.id].length}
                  </span>
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </div>

        {visible.length === 0 ? (
          <div className="flex items-center justify-center px-6 py-16 text-sm text-fg-tertiary">
            Không có ca nào trong nhóm này.
          </div>
        ) : (
          <div>
            {visible.map((shift) => (
              <DayShiftRow
                key={shift.id}
                shift={shift}
                nowMs={nowMs}
                isSelected={selectedShiftId === shift.id}
                onSelect={onSelectShift}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface KpiStripProps {
  stats: ReturnType<typeof getDayStats>;
}

function KpiStrip({ stats }: KpiStripProps) {
  const tiles: Array<{
    label: string;
    value: string;
    valueClass?: string;
    sub: string;
  }> = [
    {
      label: "Yêu cầu",
      value: String(stats.required),
      sub: `${stats.totalShifts} ca`,
    },
    {
      label: "Đăng ký",
      value: String(stats.registered),
      sub:
        stats.required === 0
          ? "—"
          : `${Math.round((stats.registered / stats.required) * 100)}% YC`,
    },
    {
      label: "Đã tới",
      value: String(stats.attended),
      valueClass: stats.attended > 0 ? "text-fg-success" : "text-fg-tertiary",
      sub:
        stats.registered === 0
          ? "—"
          : `${Math.round((stats.attended / stats.registered) * 100)}% ĐK`,
    },
    {
      label: "Fill rate",
      value: `${stats.fillRatePct}%`,
      valueClass:
        stats.fillRatePct >= 80
          ? "text-fg-success"
          : stats.fillRatePct >= 50
            ? "text-fg-warning"
            : "text-fg-error",
      sub: stats.fillRatePct >= 80 ? "ổn định" : "cần fill thêm",
    },
    {
      label: "Vắng / Trễ",
      value: `${stats.noShow} / ${stats.late}`,
      valueClass:
        stats.noShow + stats.late === 0
          ? "text-fg"
          : "text-fg-error",
      sub: stats.noShow + stats.late === 0 ? "không có" : "cần xử lý",
    },
    {
      label: "Cảnh báo",
      value: String(stats.criticalCount),
      valueClass:
        stats.criticalCount > 0 ? "text-fg-error" : "text-fg",
      sub: stats.criticalCount > 0 ? "ca thiếu >50%" : "ổn",
    },
  ];
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border-secondary bg-border-secondary lg:grid-cols-6">
      {tiles.map((t) => (
        <div key={t.label} className="flex flex-col gap-1 bg-bg p-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary">
            {t.label}
          </span>
          <span
            className={cn(
              "text-xl font-bold tabular-nums leading-none",
              t.valueClass,
            )}
          >
            {t.value}
          </span>
          <span className="text-[11px] text-fg-tertiary">{t.sub}</span>
        </div>
      ))}
    </div>
  );
}

function useNowTick(intervalMs: number): number {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}
