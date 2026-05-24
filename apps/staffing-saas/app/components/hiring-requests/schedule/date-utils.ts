import {
  addDays,
  formatDateLongVi,
  getWeekDayIndex,
  startOfDay,
  WEEKDAY_LABELS_VI_SHORT,
  type WeekDay,
} from "../../shifts/lib/date-utils";

export interface ShiftDate {
  dateStr: string;
  dateObj: Date;
  weekDayIndex: WeekDay;
  weekDayLabel: string;
  dayOfMonth: number;
  isWorkingDay: boolean;
  isoWeek: number;
}

export function parseDDMMYYYY(str: string): Date {
  const [dd, mm, yyyy] = str.split("/");
  return startOfDay(new Date(Number(yyyy), Number(mm) - 1, Number(dd)));
}

function getISOWeek(date: Date): number {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
}

export function computeShiftDates(
  startDate: string,
  endDate: string,
  weekdays: WeekDay[],
): ShiftDate[] {
  const start = parseDDMMYYYY(startDate);
  const end = parseDDMMYYYY(endDate);
  const result: ShiftDate[] = [];
  let cur = new Date(start);
  while (cur.getTime() <= end.getTime()) {
    const weekDayIndex = getWeekDayIndex(cur);
    result.push({
      dateStr: formatDateLongVi(cur),
      dateObj: new Date(cur),
      weekDayIndex,
      weekDayLabel: WEEKDAY_LABELS_VI_SHORT[weekDayIndex],
      dayOfMonth: cur.getDate(),
      isWorkingDay: weekdays.includes(weekDayIndex),
      isoWeek: getISOWeek(cur),
    });
    cur = addDays(cur, 1);
  }
  return result;
}

export const LONG_JOB_THRESHOLD = 14;

export function isLongJob(shiftDates: ShiftDate[]): boolean {
  return shiftDates.filter((d) => d.isWorkingDay).length > LONG_JOB_THRESHOLD;
}
