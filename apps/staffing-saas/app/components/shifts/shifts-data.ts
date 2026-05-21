import { generateShifts } from "./shifts-generator";

export type ShiftStatus = "open" | "filling" | "full" | "critical" | "closed";

export interface ShiftAssignment {
  workerId: string;
  workerName: string;
  role: string;
  confirmedAt: string;
  status: "Đã xác nhận" | "Dự bị" | "Đã huỷ";
}

export interface ShiftOperator {
  id: string;
  name: string;
  initials: string;
  avatarUrl: string;
}

export interface PlannedCheckIn {
  workerId: string;
  workerName: string;
  initials: string;
  scheduledAtMs: number;
  late: boolean;
  noShow: boolean;
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
  operator: ShiftOperator;
  plannedCheckIns: PlannedCheckIn[];
}

export const OPERATORS: ShiftOperator[] = [
  {
    id: "op-binh-tran",
    name: "Trần Thanh Bình",
    initials: "TB",
    avatarUrl: "https://i.pravatar.cc/120?img=12",
  },
  {
    id: "op-mai-nguyen",
    name: "Nguyễn Hồng Mai",
    initials: "HM",
    avatarUrl: "https://i.pravatar.cc/120?img=45",
  },
  {
    id: "op-tung-do",
    name: "Đỗ Quang Tùng",
    initials: "QT",
    avatarUrl: "https://i.pravatar.cc/120?img=33",
  },
  {
    id: "op-linh-vu",
    name: "Vũ Hà Linh",
    initials: "HL",
    avatarUrl: "https://i.pravatar.cc/120?img=47",
  },
  {
    id: "op-khanh-le",
    name: "Lê Nam Khánh",
    initials: "NK",
    avatarUrl: "https://i.pravatar.cc/120?img=15",
  },
  {
    id: "op-hoa-pham",
    name: "Phạm Thị Hòa",
    initials: "TH",
    avatarUrl: "https://i.pravatar.cc/120?img=49",
  },
];

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

export { getCustomerLogo } from "../_shared/assets";

export const SHIFTS: ShiftRecord[] = generateShifts(new Date());

export function getShiftById(id: string): ShiftRecord | undefined {
  const normalized = id.toLowerCase();
  return SHIFTS.find(
    (shift) => shift.id === normalized || shift.code.toLowerCase() === normalized,
  );
}
