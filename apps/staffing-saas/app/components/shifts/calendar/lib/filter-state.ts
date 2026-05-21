import type { ShiftRecord, ShiftStatus } from "../../shifts-data";

export type FillBucket = "low" | "mid" | "full";
export type TimeBucket = "morning" | "afternoon" | "evening" | "night";
export type CalendarView = "week" | "day" | "month" | "customer" | "table";

export interface ShiftFilters {
  search: string;
  regions: string[];
  statuses: ShiftStatus[];
  fillBuckets: FillBucket[];
  timeBuckets: TimeBucket[];
}

export const DEFAULT_FILTERS: ShiftFilters = {
  search: "",
  regions: [],
  statuses: [],
  fillBuckets: [],
  timeBuckets: [],
};

export const FILL_BUCKET_LABELS: Record<FillBucket, string> = {
  low: "Thiếu gấp <50%",
  mid: "Đang lấp 50–99%",
  full: "Đủ 100%",
};

export const TIME_BUCKET_LABELS: Record<TimeBucket, string> = {
  morning: "Sáng (06–12)",
  afternoon: "Chiều (12–18)",
  evening: "Tối (18–22)",
  night: "Đêm (22–06)",
};

export function countActiveFilters(filters: ShiftFilters): number {
  let n = 0;
  if (filters.search.trim().length > 0) n++;
  if (filters.regions.length > 0) n++;
  if (filters.statuses.length > 0) n++;
  if (filters.fillBuckets.length > 0) n++;
  if (filters.timeBuckets.length > 0) n++;
  return n;
}

function getFillBucket(shift: ShiftRecord): FillBucket {
  if (shift.requiredCount === 0) return "full";
  const ratio = shift.assignedCount / shift.requiredCount;
  if (ratio >= 1) return "full";
  if (ratio < 0.5) return "low";
  return "mid";
}

export function getTimeBucket(shift: ShiftRecord): TimeBucket {
  const hour = new Date(shift.startAtMs).getHours();
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 22) return "evening";
  return "night";
}

export const TIME_BUCKET_ORDER: TimeBucket[] = [
  "morning",
  "afternoon",
  "evening",
  "night",
];

export const TIME_BUCKET_SHORT_LABELS: Record<TimeBucket, string> = {
  morning: "Sáng",
  afternoon: "Chiều",
  evening: "Tối",
  night: "Đêm",
};

export const TIME_BUCKET_RANGES: Record<TimeBucket, string> = {
  morning: "06–12",
  afternoon: "12–18",
  evening: "18–22",
  night: "22–06",
};

export function applyFilters(
  shifts: ShiftRecord[],
  customerId: string | null,
  filters: ShiftFilters,
): ShiftRecord[] {
  const search = filters.search.trim().toLowerCase();
  return shifts.filter((shift) => {
    if (customerId && shift.customerId !== customerId) return false;
    if (filters.regions.length > 0 && !filters.regions.includes(shift.region))
      return false;
    if (filters.statuses.length > 0 && !filters.statuses.includes(shift.status))
      return false;
    if (
      filters.fillBuckets.length > 0 &&
      !filters.fillBuckets.includes(getFillBucket(shift))
    )
      return false;
    if (
      filters.timeBuckets.length > 0 &&
      !filters.timeBuckets.includes(getTimeBucket(shift))
    )
      return false;
    if (search.length > 0) {
      const hay =
        `${shift.name} ${shift.code} ${shift.site}`.toLowerCase();
      if (!hay.includes(search)) return false;
    }
    return true;
  });
}

export interface CustomerOption {
  id: string;
  name: string;
  shiftCount: number;
}

export function extractCustomerOptions(shifts: ShiftRecord[]): CustomerOption[] {
  const map = new Map<string, CustomerOption>();
  for (const shift of shifts) {
    const existing = map.get(shift.customerId);
    if (existing) {
      existing.shiftCount += 1;
    } else {
      map.set(shift.customerId, {
        id: shift.customerId,
        name: shift.customer,
        shiftCount: 1,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function extractRegionOptions(shifts: ShiftRecord[]): string[] {
  const set = new Set<string>();
  for (const shift of shifts) set.add(shift.region);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
