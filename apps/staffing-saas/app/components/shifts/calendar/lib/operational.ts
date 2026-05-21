import type { PlannedCheckIn, ShiftRecord } from "../../shifts-data";

const ENDING_THRESHOLD_MS = 60 * 60 * 1000; // <1h to end
const GRACE_PERIOD_MS = 15 * 60 * 1000; // 15 min grace after start

export type OperationalState =
  | "upcoming"
  | "ongoing"
  | "ending-soon"
  | "done";

export function getOperationalState(
  shift: ShiftRecord,
  nowMs: number,
): OperationalState {
  if (nowMs < shift.startAtMs) return "upcoming";
  if (nowMs >= shift.endAtMs) return "done";
  if (shift.endAtMs - nowMs <= ENDING_THRESHOLD_MS) return "ending-soon";
  return "ongoing";
}

export function getCheckIns(
  shift: ShiftRecord,
  nowMs: number,
): PlannedCheckIn[] {
  return shift.plannedCheckIns
    .filter((c) => !c.noShow && c.scheduledAtMs <= nowMs)
    .sort((a, b) => b.scheduledAtMs - a.scheduledAtMs);
}

export function getAttendedCount(shift: ShiftRecord, nowMs: number): number {
  return getCheckIns(shift, nowMs).length;
}

export function getLateCount(shift: ShiftRecord, nowMs: number): number {
  return shift.plannedCheckIns.filter(
    (c) => !c.noShow && c.late && c.scheduledAtMs <= nowMs,
  ).length;
}

export function getNoShowCount(shift: ShiftRecord, nowMs: number): number {
  const grace = shift.startAtMs + GRACE_PERIOD_MS;
  if (nowMs < grace) return 0;
  return shift.plannedCheckIns.filter((c) => c.noShow).length;
}

export function getLastCheckIn(
  shift: ShiftRecord,
  nowMs: number,
): PlannedCheckIn | null {
  const list = getCheckIns(shift, nowMs);
  return list[0] ?? null;
}

export interface DayStats {
  totalShifts: number;
  required: number;
  registered: number;
  attended: number;
  fillRatePct: number;
  noShow: number;
  late: number;
  criticalCount: number;
}

export function getDayStats(
  shifts: ShiftRecord[],
  nowMs: number,
): DayStats {
  let required = 0;
  let registered = 0;
  let attended = 0;
  let noShow = 0;
  let late = 0;
  let criticalCount = 0;
  for (const shift of shifts) {
    required += shift.requiredCount;
    registered += shift.assignedCount;
    attended += getAttendedCount(shift, nowMs);
    noShow += getNoShowCount(shift, nowMs);
    late += getLateCount(shift, nowMs);
    if (shift.status === "critical") criticalCount += 1;
  }
  return {
    totalShifts: shifts.length,
    required,
    registered,
    attended,
    fillRatePct: required === 0 ? 0 : Math.round((registered / required) * 100),
    noShow,
    late,
    criticalCount,
  };
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "vừa xong";
  const totalMin = Math.round(ms / 60_000);
  if (totalMin < 60) return `${totalMin}p`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m === 0 ? `${h}h` : `${h}h${pad(m)}p`;
}

export function formatTimeHHmm(ms: number): string {
  const d = new Date(ms);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export interface OperationalContext {
  state: OperationalState;
  label: string;
  urgent: boolean;
}

export function getOperationalContext(
  shift: ShiftRecord,
  nowMs: number,
): OperationalContext {
  const state = getOperationalState(shift, nowMs);
  if (state === "upcoming") {
    const ms = shift.startAtMs - nowMs;
    const urgent = ms < 30 * 60 * 1000;
    return { state, label: `▶ ${formatCountdown(ms)}`, urgent };
  }
  if (state === "done") {
    return {
      state,
      label: `✓ ${formatTimeHHmm(shift.endAtMs)} hoàn tất`,
      urgent: false,
    };
  }
  if (state === "ending-soon") {
    const ms = shift.endAtMs - nowMs;
    return { state, label: `⏹ còn ${formatCountdown(ms)}`, urgent: false };
  }
  const ms = shift.endAtMs - nowMs;
  return { state, label: `⏱ còn ${formatCountdown(ms)}`, urgent: false };
}
