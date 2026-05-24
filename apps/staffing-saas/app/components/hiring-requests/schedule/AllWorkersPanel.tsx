"use client";

import { Avatar } from "@mvp-ui/ui";
import { getAvatarFor, getInitials } from "../../_shared/assets";
import type { HiringAssignment } from "../hiring-requests-data";
import type { ShiftDate } from "./date-utils";

interface WorkerSummary {
  key: string;
  workerId: string | undefined;
  workerName: string;
  activeDays: string[];
  cancelledOnly: boolean;
  dominantStatus: "assigned" | "confirmed" | "cancelled";
}

function buildWorkerSummaries(
  assignments: HiringAssignment[],
  shiftDates: ShiftDate[],
): WorkerSummary[] {
  const dateOrder = new Map(shiftDates.map((sd, i): [string, number] => [sd.dateStr, i]));
  const map = new Map<string, WorkerSummary>();

  for (const a of assignments) {
    const key = a.workerId ?? `name:${a.workerName}`;
    if (!map.has(key)) {
      map.set(key, {
        key,
        workerId: a.workerId,
        workerName: a.workerName,
        activeDays: [],
        cancelledOnly: false,
        dominantStatus: "cancelled",
      });
    }
    const s = map.get(key)!;
    if (a.status !== "cancelled") {
      if (!s.activeDays.includes(a.date)) s.activeDays.push(a.date);
      if (a.status === "confirmed") s.dominantStatus = "confirmed";
      else if (s.dominantStatus !== "confirmed") s.dominantStatus = "assigned";
    }
  }

  for (const s of map.values()) {
    s.cancelledOnly = s.activeDays.length === 0;
    s.activeDays.sort((a, b) => (dateOrder.get(a) ?? 0) - (dateOrder.get(b) ?? 0));
  }

  return Array.from(map.values()).sort((a, b) => {
    const rank = { confirmed: 0, assigned: 1, cancelled: 2 };
    return rank[a.dominantStatus] - rank[b.dominantStatus];
  });
}

function daysLabel(activeDays: string[], shiftDates: ShiftDate[], totalWorkingDays: number): string {
  if (activeDays.length === 0) return "";
  if (activeDays.length === totalWorkingDays) return "Cả đợt";

  const labels = activeDays.map((dateStr) => {
    const sd = shiftDates.find((d) => d.dateStr === dateStr);
    if (!sd) return "";
    const m = String(sd.dateObj.getMonth() + 1).padStart(2, "0");
    return `${sd.dayOfMonth}/${m}`;
  });

  const shown = labels.slice(0, 4);
  const extra = activeDays.length - shown.length;
  return extra > 0 ? `${shown.join(", ")} +${extra}` : shown.join(", ");
}

interface AllWorkersPanelProps {
  assignments: HiringAssignment[];
  headcount: number;
  shiftDates: ShiftDate[];
}

export function AllWorkersPanel1({ assignments, headcount, shiftDates }: AllWorkersPanelProps) {
  const totalWorkingDays = shiftDates.filter((d) => d.isWorkingDay).length;
  const summaries = buildWorkerSummaries(assignments, shiftDates);
  const active = summaries.filter((s) => !s.cancelledOnly);
  const cancelled = summaries.filter((s) => s.cancelledOnly);

  if (summaries.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-secondary bg-bg-secondary py-10 text-center text-sm text-fg-tertiary">
        Chưa có CTV nào được gán cho đợt tuyển này
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border-secondary bg-bg px-5 py-3">
        <span className="text-sm font-semibold text-fg">Toàn bộ đợt tuyển</span>
        <span className="h-4 w-px bg-border-secondary" />
        <span className="text-sm text-fg-secondary">
          Cần: <strong className="text-fg">{headcount}</strong>
        </span>
        <span className="h-4 w-px bg-border-secondary" />
        <span className="text-sm text-fg-secondary">
          CTV tham gia: <strong className="text-fg">{active.length}</strong>
        </span>
      </div>

      {active.length > 0 && (
        <div className="flex flex-col gap-2">
          {active.map((s) => {
            const label = daysLabel(s.activeDays, shiftDates, totalWorkingDays);
            return (
              <div
                key={s.key}
                className="flex items-center gap-3 rounded-lg border border-border-secondary bg-bg px-4 py-3"
              >
                <Avatar
                  size="sm"
                  src={getAvatarFor(s.workerName, s.workerId)}
                  alt={s.workerName}
                  initials={getInitials(s.workerName)}
                />
                <p className="w-36 shrink-0 truncate text-sm font-medium text-fg">
                  {s.workerName}
                </p>
                <p className="min-w-0 flex-1 truncate text-xs text-fg-tertiary">{label}</p>
              </div>
            );
          })}
        </div>
      )}

      {cancelled.length > 0 && (
        <>
          <p className="text-xs font-medium text-fg-tertiary">Đã huỷ</p>
          <div className="flex flex-col gap-2">
            {cancelled.map((s) => (
              <div
                key={s.key}
                className="flex items-center gap-3 rounded-lg border border-border-secondary bg-bg-secondary px-4 py-3"
              >
                <Avatar
                  size="sm"
                  src={getAvatarFor(s.workerName, s.workerId)}
                  alt={s.workerName}
                  initials={getInitials(s.workerName)}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-fg">{s.workerName}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
