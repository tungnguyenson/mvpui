const DAY_MS = 24 * 60 * 60 * 1000;

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const WEEKDAY_LABELS_VI: Record<WeekDay, string> = {
  0: "Thứ Hai",
  1: "Thứ Ba",
  2: "Thứ Tư",
  3: "Thứ Năm",
  4: "Thứ Sáu",
  5: "Thứ Bảy",
  6: "Chủ Nhật",
};

export const WEEKDAY_LABELS_VI_SHORT: Record<WeekDay, string> = {
  0: "T2",
  1: "T3",
  2: "T4",
  3: "T5",
  4: "T6",
  5: "T7",
  6: "CN",
};

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function startOfWeekMonday(date: Date): Date {
  const d = startOfDay(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

export function endOfWeekMonday(date: Date): Date {
  const start = startOfWeekMonday(date);
  return addDays(start, 6);
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function diffInDays(later: Date, earlier: Date): number {
  return Math.round(
    (startOfDay(later).getTime() - startOfDay(earlier).getTime()) / DAY_MS,
  );
}

export function getWeekDayIndex(date: Date): WeekDay {
  const js = date.getDay();
  return (js === 0 ? 6 : js - 1) as WeekDay;
}

export function formatDayMonth(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

export function formatDateLongVi(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDateRangeVi(start: Date, end: Date): string {
  return `${formatDayMonth(start)} – ${formatDayMonth(end)}/${end.getFullYear()}`;
}

export function formatTimeHHmm(date: Date): string {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

export function formatTimeRange(start: Date, end: Date): string {
  return `${formatTimeHHmm(start)} – ${formatTimeHHmm(end)}`;
}

export function formatTimeRangeCompact(start: Date, end: Date): string {
  const h1 = String(start.getHours()).padStart(2, "0");
  const h2 = String(end.getHours()).padStart(2, "0");
  return `${h1}–${h2}h`;
}

export function buildDateAtHour(day: Date, hour: number, minute = 0): Date {
  const d = startOfDay(day);
  d.setHours(hour, minute, 0, 0);
  return d;
}

export function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}
