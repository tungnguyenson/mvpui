import { generateShifts } from "./shifts-generator";

export type ShiftStatus = "open" | "filling" | "full" | "critical" | "closed";

export interface ShiftAssignment {
  workerId: string;
  workerName: string;
  role: string;
  confirmedAt: string;
  status: "Đã xác nhận" | "Dự bị" | "Đã huỷ";
}

export interface ShiftRecord {
  id: string;
  code: string;
  name: string;
  customer: string;
  customerId: string;
  region: string;
  site: string;
  address: string;
  schedule: string;
  startAt: string;
  endAt: string;
  startAtMs: number;
  endAtMs: number;
  requiredCount: number;
  assignedCount: number;
  status: ShiftStatus;
  payRate: string;
  payRateNote: string;
  requirements: string[];
  notes: string;
  assignments: ShiftAssignment[];
}

export const SHIFT_STATUS_LABELS: Record<
  ShiftStatus,
  { label: string; color: "success" | "warning" | "error" | "gray" }
> = {
  open: { label: "Đang mở", color: "warning" },
  filling: { label: "Đang tuyển", color: "warning" },
  full: { label: "Đủ người", color: "success" },
  critical: { label: "Thiếu gấp", color: "error" },
  closed: { label: "Đã đóng", color: "gray" },
};

export const REGION_OPTIONS = [
  "TP. HCM",
  "Hà Nội",
  "Bình Dương",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
] as const;

export type Region = (typeof REGION_OPTIONS)[number];

export const SHIFTS: ShiftRecord[] = generateShifts(new Date());

export function getShiftById(id: string): ShiftRecord | undefined {
  const normalized = id.toLowerCase();
  return SHIFTS.find(
    (shift) => shift.id === normalized || shift.code.toLowerCase() === normalized,
  );
}
