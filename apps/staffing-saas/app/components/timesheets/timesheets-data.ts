export type TimesheetStatus = "in-progress" | "closed" | "needs-review" | "exception";

export type AttendanceStatus =
  | "on-time"
  | "late"
  | "early-leave"
  | "absent"
  | "no-checkout";

export interface AttendanceRecord {
  id: string;
  workerId: string;
  workerName: string;
  role: string;
  checkInAt: string;
  checkOutAt: string;
  workedHours: string;
  payout: string;
  status: AttendanceStatus;
  note?: string;
}

export interface TimesheetRecord {
  id: string;
  shiftId: string;
  shiftCode: string;
  shiftName: string;
  customer: string;
  customerId: string;
  date: string;
  schedule: string;
  expectedCount: number;
  checkedInCount: number;
  status: TimesheetStatus;
  exceptions: number;
  notes: string;
  records: AttendanceRecord[];
}

export const TIMESHEET_STATUS_LABELS: Record<
  TimesheetStatus,
  { label: string; color: "success" | "warning" | "error" | "gray" }
> = {
  "in-progress": { label: "Đang diễn ra", color: "warning" },
  closed: { label: "Đã chốt", color: "success" },
  "needs-review": { label: "Cần duyệt", color: "warning" },
  exception: { label: "Có bất thường", color: "error" },
};

export const ATTENDANCE_LABELS: Record<
  AttendanceStatus,
  { label: string; color: "success" | "warning" | "error" }
> = {
  "on-time": { label: "Đúng giờ", color: "success" },
  late: { label: "Đi trễ", color: "warning" },
  "early-leave": { label: "Về sớm", color: "warning" },
  absent: { label: "Vắng mặt", color: "error" },
  "no-checkout": { label: "Thiếu checkout", color: "warning" },
};

export const TIMESHEETS: TimesheetRecord[] = [
  {
    id: "ts-sh-702-20",
    shiftId: "sh-702",
    shiftCode: "SH-702",
    shiftName: "Ca lễ tân chiều",
    customer: "Medistar Clinic",
    customerId: "medistar-clinic",
    date: "20/05/2026",
    schedule: "13:00 - 18:00",
    expectedCount: 6,
    checkedInCount: 6,
    status: "closed",
    exceptions: 0,
    notes: "Ca chốt đúng giờ, toàn bộ workers check-in chuẩn.",
    records: [
      {
        id: "att-1",
        workerId: "tran-thi-bich",
        workerName: "Trần Thị Bích",
        role: "Lễ tân",
        checkInAt: "12:55",
        checkOutAt: "18:02",
        workedHours: "5.1h",
        payout: "₫331.500",
        status: "on-time",
      },
      {
        id: "att-2",
        workerId: "le-thanh-mai",
        workerName: "Lê Thanh Mai",
        role: "CSKH",
        checkInAt: "13:00",
        checkOutAt: "17:58",
        workedHours: "5.0h",
        payout: "₫325.000",
        status: "on-time",
      },
    ],
  },
  {
    id: "ts-sh-815-19",
    shiftId: "sh-815",
    shiftCode: "SH-815",
    shiftName: "Ca activation sampling",
    customer: "Highlands Commerce",
    customerId: "highlands-commerce",
    date: "19/05/2026",
    schedule: "10:00 - 18:00",
    expectedCount: 8,
    checkedInCount: 7,
    status: "needs-review",
    exceptions: 2,
    notes: "Một worker vắng mặt và một worker check-out sớm, cần điều phối duyệt.",
    records: [
      {
        id: "att-1",
        workerId: "tran-thi-bich",
        workerName: "Trần Thị Bích",
        role: "Hostess",
        checkInAt: "10:02",
        checkOutAt: "18:05",
        workedHours: "8.0h",
        payout: "₫480.000",
        status: "on-time",
      },
      {
        id: "att-2",
        workerId: "pham-thu-dung",
        workerName: "Phạm Thu Dung",
        role: "Sampling",
        checkInAt: "10:15",
        checkOutAt: "16:30",
        workedHours: "6.25h",
        payout: "₫375.000",
        status: "early-leave",
        note: "Worker xin về sớm vì lý do gia đình.",
      },
      {
        id: "att-3",
        workerId: "nguyen-thi-hong",
        workerName: "Nguyễn Thị Hồng",
        role: "Sampling",
        checkInAt: "—",
        checkOutAt: "—",
        workedHours: "0h",
        payout: "₫0",
        status: "absent",
        note: "Worker không tới ca, đã liên hệ và sẽ ghi nhận vào hồ sơ vi phạm.",
      },
    ],
  },
  {
    id: "ts-sh-910-18",
    shiftId: "sh-910",
    shiftCode: "SH-910",
    shiftName: "Ca kho đêm A",
    customer: "GoMart Distribution",
    customerId: "gomart-distribution",
    date: "18/05/2026",
    schedule: "22:00 - 06:00",
    expectedCount: 15,
    checkedInCount: 12,
    status: "exception",
    exceptions: 3,
    notes: "Có 3 worker thiếu check-out, đang chờ điều phối viên xác nhận giờ rời ca.",
    records: [
      {
        id: "att-1",
        workerId: "le-hoang-cuong",
        workerName: "Lê Hoàng Cường",
        role: "Vận hành kho",
        checkInAt: "21:55",
        checkOutAt: "06:05",
        workedHours: "8.0h",
        payout: "₫580.000",
        status: "on-time",
      },
      {
        id: "att-2",
        workerId: "vu-minh-duc",
        workerName: "Vũ Minh Đức",
        role: "Bốc xếp",
        checkInAt: "22:18",
        checkOutAt: "—",
        workedHours: "—",
        payout: "—",
        status: "no-checkout",
        note: "Không có check-out, hệ thống đánh dấu cần xác nhận lại.",
      },
      {
        id: "att-3",
        workerId: "ngo-anh-quoc",
        workerName: "Ngô Anh Quốc",
        role: "Bốc xếp",
        checkInAt: "22:05",
        checkOutAt: "05:55",
        workedHours: "7.83h",
        payout: "₫548.000",
        status: "on-time",
      },
    ],
  },
  {
    id: "ts-sh-801-17",
    shiftId: "sh-801",
    shiftCode: "SH-801",
    shiftName: "Ca bán hàng cuối tuần",
    customer: "Highlands Commerce",
    customerId: "highlands-commerce",
    date: "17/05/2026",
    schedule: "08:00 - 17:00",
    expectedCount: 18,
    checkedInCount: 14,
    status: "in-progress",
    exceptions: 1,
    notes: "Ca vẫn đang diễn ra, đợi check-out cuối ca để chốt số liệu.",
    records: [
      {
        id: "att-1",
        workerId: "nguyen-van-an",
        workerName: "Nguyễn Văn An",
        role: "Trưởng nhóm",
        checkInAt: "07:50",
        checkOutAt: "—",
        workedHours: "—",
        payout: "—",
        status: "on-time",
        note: "Worker đang trong ca, sẽ checkout cuối giờ.",
      },
      {
        id: "att-2",
        workerId: "pham-thu-dung",
        workerName: "Phạm Thu Dung",
        role: "Bán hàng",
        checkInAt: "08:25",
        checkOutAt: "—",
        workedHours: "—",
        payout: "—",
        status: "late",
        note: "Trễ 25 phút, sẽ ghi nhận vào hồ sơ vi phạm.",
      },
    ],
  },
];

export function getTimesheetById(id: string): TimesheetRecord | undefined {
  return TIMESHEETS.find((record) => record.id === id);
}
