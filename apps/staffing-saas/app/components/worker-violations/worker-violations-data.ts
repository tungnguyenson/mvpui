export type ViolationWorkerStatus = "normal" | "warning" | "suspended" | "locked";

export type ViolationSeverity = "minor" | "moderate" | "severe";

export interface ViolationCase {
  id: string;
  occurredAt: string;
  severity: ViolationSeverity;
  category: string;
  description: string;
  shiftId?: string;
  shiftName?: string;
  customer?: string;
  penalty: string;
  resolution: "Đã xử lý" | "Đang xử lý" | "Chờ phản hồi";
  reviewer: string;
}

export interface ViolationWorkerRecord {
  id: string;
  workerName: string;
  workerId: string;
  city: string;
  district: string;
  phone: string;
  totalCases: number;
  latestSeverity: ViolationSeverity;
  status: ViolationWorkerStatus;
  latestAt: string;
  totalPenalty: string;
  notes: string;
  cases: ViolationCase[];
}

export const SEVERITY_LABELS: Record<
  ViolationSeverity,
  { label: string; color: "success" | "warning" | "error" }
> = {
  minor: { label: "Nhẹ", color: "warning" },
  moderate: { label: "Trung bình", color: "warning" },
  severe: { label: "Nghiêm trọng", color: "error" },
};

export const VIOLATION_STATUS_LABELS: Record<
  ViolationWorkerStatus,
  { label: string; color: "success" | "warning" | "error" | "gray" }
> = {
  normal: { label: "Bình thường", color: "success" },
  warning: { label: "Đang cảnh cáo", color: "warning" },
  suspended: { label: "Tạm đình chỉ", color: "warning" },
  locked: { label: "Đã khóa", color: "error" },
};

export const VIOLATION_WORKERS: ViolationWorkerRecord[] = [
  {
    id: "tran-thi-bich",
    workerName: "Trần Thị Bích",
    workerId: "WK-1002",
    city: "Hà Nội",
    district: "Cầu Giấy",
    phone: "0902 345 678",
    totalCases: 1,
    latestSeverity: "minor",
    status: "warning",
    latestAt: "03/05/2026",
    totalPenalty: "₫120.000",
    notes: "Đi trễ nhẹ ở ca CSKH. Đã được nhắc nhở qua điều phối viên.",
    cases: [
      {
        id: "VL-3201",
        occurredAt: "03/05/2026",
        severity: "minor",
        category: "Đi trễ",
        description: "Worker check-in trễ 12 phút so với lịch ca lễ tân chiều.",
        shiftId: "SH-695",
        shiftName: "Ca hỗ trợ khách hàng sáng",
        customer: "Shopee Express Official",
        penalty: "₫120.000",
        resolution: "Đã xử lý",
        reviewer: "Lê Thuỳ Trang",
      },
    ],
  },
  {
    id: "vu-minh-duc",
    workerName: "Vũ Minh Đức",
    workerId: "WK-1005",
    city: "TP.HCM",
    district: "Thủ Đức",
    phone: "0905 678 901",
    totalCases: 3,
    latestSeverity: "severe",
    status: "locked",
    latestAt: "11/05/2026",
    totalPenalty: "₫1.800.000",
    notes: "Vắng mặt không báo trước ở 2 ca kho liên tiếp, đang bị tạm khóa nhận ca.",
    cases: [
      {
        id: "VL-3198",
        occurredAt: "11/05/2026",
        severity: "severe",
        category: "Vắng mặt không báo",
        description: "Worker không tới ca kho đêm, không liên lạc được trong 4 giờ.",
        shiftId: "SH-844",
        shiftName: "Ca kho tăng cường",
        customer: "Ninja Van",
        penalty: "₫800.000",
        resolution: "Đã xử lý",
        reviewer: "Nguyễn Quốc Đạt",
      },
      {
        id: "VL-3185",
        occurredAt: "07/05/2026",
        severity: "moderate",
        category: "Bỏ ca giữa chừng",
        description: "Worker rời ca sớm 2 giờ, không bàn giao cho điều phối viên.",
        shiftId: "SH-822",
        shiftName: "Ca kho đêm B",
        customer: "Ninja Van",
        penalty: "₫600.000",
        resolution: "Đã xử lý",
        reviewer: "Nguyễn Quốc Đạt",
      },
      {
        id: "VL-3172",
        occurredAt: "29/04/2026",
        severity: "moderate",
        category: "Đi trễ nhiều lần",
        description: "Trễ liên tiếp 3 ca trong tuần, đã được nhắc nhở chính thức.",
        penalty: "₫400.000",
        resolution: "Đã xử lý",
        reviewer: "Lê Thuỳ Trang",
      },
    ],
  },
  {
    id: "le-hoang-cuong",
    workerName: "Lê Hoàng Cường",
    workerId: "WK-1003",
    city: "Đà Nẵng",
    district: "Hải Châu",
    phone: "0903 456 789",
    totalCases: 1,
    latestSeverity: "moderate",
    status: "warning",
    latestAt: "12/05/2026",
    totalPenalty: "₫300.000",
    notes: "Không tuân thủ quy định trang phục ca kho. Đang theo dõi thêm 30 ngày.",
    cases: [
      {
        id: "VL-3210",
        occurredAt: "12/05/2026",
        severity: "moderate",
        category: "Vi phạm quy định",
        description:
          "Không mặc bảo hộ lao động khi vào kho hàng. Quản lý điểm bán đã ghi nhận.",
        shiftId: "SH-910",
        shiftName: "Ca kho đêm A",
        customer: "Ninja Van",
        penalty: "₫300.000",
        resolution: "Đang xử lý",
        reviewer: "Nguyễn Quốc Đạt",
      },
    ],
  },
  {
    id: "hoang-anh-tuan",
    workerName: "Hoàng Anh Tuấn",
    workerId: "WK-1009",
    city: "Hải Phòng",
    district: "Lê Chân",
    phone: "0906 712 998",
    totalCases: 2,
    latestSeverity: "moderate",
    status: "suspended",
    latestAt: "10/05/2026",
    totalPenalty: "₫700.000",
    notes: "Tạm đình chỉ 14 ngày vì tranh cãi với khách hàng tại điểm bán.",
    cases: [
      {
        id: "VL-3204",
        occurredAt: "10/05/2026",
        severity: "moderate",
        category: "Mâu thuẫn với khách",
        description: "Phản hồi gay gắt với khách tại quầy sampling.",
        shiftId: "SH-784",
        shiftName: "Ca activation quầy sampling",
        customer: "GHN Sorting",
        penalty: "₫500.000",
        resolution: "Đang xử lý",
        reviewer: "Lê Thuỳ Trang",
      },
      {
        id: "VL-3162",
        occurredAt: "21/04/2026",
        severity: "minor",
        category: "Nhập sai báo cáo",
        description: "Nhập sai số lượng đơn hàng vào báo cáo cuối ca.",
        penalty: "₫200.000",
        resolution: "Đã xử lý",
        reviewer: "Trần Mai Linh",
      },
    ],
  },
];

export function getViolationWorkerById(
  id: string,
): ViolationWorkerRecord | undefined {
  return VIOLATION_WORKERS.find((record) => record.id === id);
}
