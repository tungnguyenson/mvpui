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
  site: string;
  address: string;
  schedule: string;
  startAt: string;
  endAt: string;
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
  filling: { label: "Đang lấp đầy", color: "warning" },
  full: { label: "Đủ người", color: "success" },
  critical: { label: "Thiếu gấp", color: "error" },
  closed: { label: "Đã đóng", color: "gray" },
};

export const SHIFTS: ShiftRecord[] = [
  {
    id: "sh-801",
    code: "SH-801",
    name: "Ca bán hàng cuối tuần",
    customer: "GHN Sorting",
    customerId: "highlands-commerce",
    site: "Vincom Đồng Khởi",
    address: "72 Lê Thánh Tôn, Quận 1, TP.HCM",
    schedule: "Thứ 7, 08:00 - 17:00",
    startAt: "24/05/2026 08:00",
    endAt: "24/05/2026 17:00",
    requiredCount: 18,
    assignedCount: 14,
    status: "open",
    payRate: "₫55.000 / giờ",
    payRateNote: "Cộng phụ cấp ăn ca ₫45.000",
    requirements: [
      "CTV có chứng nhận xác thực CCCD",
      "Có kinh nghiệm bán hàng retail",
      "Đồng phục theo brand Highlands cung cấp",
    ],
    notes: "Cần thêm 4 worker để fill tối thiểu 18 ca. Ưu tiên worker từng làm ca cuối tuần.",
    assignments: [
      {
        workerId: "nguyen-van-an",
        workerName: "Nguyễn Văn An",
        role: "Trưởng nhóm",
        confirmedAt: "18/05/2026",
        status: "Đã xác nhận",
      },
      {
        workerId: "pham-thu-dung",
        workerName: "Phạm Thu Dung",
        role: "Bán hàng",
        confirmedAt: "17/05/2026",
        status: "Đã xác nhận",
      },
    ],
  },
  {
    id: "sh-815",
    code: "SH-815",
    name: "Ca activation sampling",
    customer: "GHN Sorting",
    customerId: "highlands-commerce",
    site: "Gigamall Thủ Đức",
    address: "240-242 Phạm Văn Đồng, TP. Thủ Đức",
    schedule: "Chủ nhật, 10:00 - 18:00",
    startAt: "25/05/2026 10:00",
    endAt: "25/05/2026 18:00",
    requiredCount: 8,
    assignedCount: 6,
    status: "critical",
    payRate: "₫60.000 / giờ",
    payRateNote: "Có hỗ trợ phụ cấp đi lại",
    requirements: [
      "Ngoại hình ưa nhìn",
      "Có kinh nghiệm sampling",
      "Sẵn sàng làm chủ nhật",
    ],
    notes: "Khu vực TTTM đông cuối tuần, cần worker chủ động giao tiếp.",
    assignments: [
      {
        workerId: "tran-thi-bich",
        workerName: "Trần Thị Bích",
        role: "Hostess",
        confirmedAt: "19/05/2026",
        status: "Đã xác nhận",
      },
    ],
  },
  {
    id: "sh-910",
    code: "SH-910",
    name: "Ca kho đêm A",
    customer: "Ninja Van",
    customerId: "gomart-distribution",
    site: "Kho GoMart DC1",
    address: "Lô C12 KCN VSIP1, Thuận An, Bình Dương",
    schedule: "Thứ 6, 22:00 - 06:00",
    startAt: "23/05/2026 22:00",
    endAt: "24/05/2026 06:00",
    requiredCount: 15,
    assignedCount: 11,
    status: "critical",
    payRate: "₫70.000 / giờ",
    payRateNote: "Phụ cấp ca đêm ₫120.000",
    requirements: [
      "Có chứng nhận an toàn lao động",
      "Sức khỏe đảm bảo cho ca đêm",
      "Mang đồng phục bảo hộ riêng",
    ],
    notes: "Ưu tiên worker đã từng làm kho. Cần điều phối viên có mặt trước 21:30.",
    assignments: [
      {
        workerId: "le-hoang-cuong",
        workerName: "Lê Hoàng Cường",
        role: "Vận hành kho",
        confirmedAt: "16/05/2026",
        status: "Đã xác nhận",
      },
    ],
  },
  {
    id: "sh-702",
    code: "SH-702",
    name: "Ca lễ tân chiều",
    customer: "Shopee Express Official",
    customerId: "medistar-clinic",
    site: "Medistar Cầu Giấy",
    address: "12 Trần Thái Tông, Cầu Giấy, Hà Nội",
    schedule: "Thứ 2 - Thứ 6, 13:00 - 18:00",
    startAt: "20/05/2026 13:00",
    endAt: "20/05/2026 18:00",
    requiredCount: 6,
    assignedCount: 6,
    status: "full",
    payRate: "₫65.000 / giờ",
    payRateNote: "Đã bao gồm phụ cấp đồng phục",
    requirements: [
      "Giao tiếp tốt, biết tiếng Anh cơ bản",
      "Đã hoàn tất xác thực",
      "Đồng phục lễ tân do clinic cung cấp",
    ],
    notes: "Ca đã đủ người, đội vận hành sẽ theo dõi tỉ lệ check-in đúng giờ.",
    assignments: [
      {
        workerId: "tran-thi-bich",
        workerName: "Trần Thị Bích",
        role: "Lễ tân",
        confirmedAt: "14/05/2026",
        status: "Đã xác nhận",
      },
    ],
  },
];

export function getShiftById(id: string): ShiftRecord | undefined {
  const normalized = id.toLowerCase();
  return SHIFTS.find(
    (shift) => shift.id === normalized || shift.code.toLowerCase() === normalized,
  );
}
