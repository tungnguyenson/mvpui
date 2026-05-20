export type WorkerStatus = "active" | "pending" | "locked";

export interface WorkerVerificationSnapshot {
  status: "Đã xác thực" | "Chờ bổ sung" | "Đang rà soát";
  phone: string;
  nationalId: string;
  taxId: string;
}

export interface WorkerViolationSnapshot {
  totalCases: number;
  latestLevel: "Không có" | "Nhẹ" | "Nghiêm trọng";
  latestNote: string;
}

export interface WorkerPaymentSnapshot {
  batchId: string;
  amount: string;
  status: "Đã chốt" | "Chờ duyệt" | "Chờ chuyển khoản";
}

export interface WorkerShiftHistory {
  id: string;
  shiftName: string;
  customer: string;
  schedule: string;
  checkInStatus: "Đúng giờ" | "Đi trễ" | "Vắng mặt";
  payout: string;
}

export interface WorkerRecord {
  id: string;
  name: string;
  city: string;
  district: string;
  phone: string;
  status: WorkerStatus;
  rating: string;
  weeklyShifts: number;
  totalShifts: number;
  joinedAt: string;
  tags: string[];
  bio: string;
  verification: WorkerVerificationSnapshot;
  violations: WorkerViolationSnapshot;
  payment: WorkerPaymentSnapshot;
  recentShifts: WorkerShiftHistory[];
}

export const WORKER_STATUS_LABELS: Record<
  WorkerStatus,
  { label: string; color: "success" | "warning" | "error" }
> = {
  active: { label: "Đang hoạt động", color: "success" },
  pending: { label: "Chờ duyệt", color: "warning" },
  locked: { label: "Tạm khóa", color: "error" },
};

export const WORKERS: WorkerRecord[] = [
  {
    id: "nguyen-van-an",
    name: "Nguyễn Văn An",
    city: "TP.HCM",
    district: "Quận 1",
    phone: "0901 234 567",
    status: "active",
    rating: "4.9",
    weeklyShifts: 6,
    totalShifts: 86,
    joinedAt: "07/2025",
    tags: ["Bán lẻ", "Activation", "Ca cuối tuần"],
    bio: "Worker chuyên bán hàng cuối tuần, tỉ lệ đúng giờ cao và thường được khách hàng yêu cầu quay lại.",
    verification: {
      status: "Đã xác thực",
      phone: "Đã xác minh",
      nationalId: "079205009871",
      taxId: "8563201147",
    },
    violations: {
      totalCases: 0,
      latestLevel: "Không có",
      latestNote: "Không ghi nhận vi phạm trong 90 ngày gần nhất.",
    },
    payment: {
      batchId: "PAY-0520-A",
      amount: "₫4.850.000",
      status: "Chờ chuyển khoản",
    },
    recentShifts: [
      {
        id: "SH-801",
        shiftName: "Ca bán hàng cuối tuần",
        customer: "GHN Sorting",
        schedule: "18/05, 08:00 - 17:00",
        checkInStatus: "Đúng giờ",
        payout: "₫650.000",
      },
      {
        id: "SH-784",
        shiftName: "Ca activation quầy sampling",
        customer: "GHN Sorting",
        schedule: "17/05, 10:00 - 18:00",
        checkInStatus: "Đúng giờ",
        payout: "₫720.000",
      },
    ],
  },
  {
    id: "tran-thi-bich",
    name: "Trần Thị Bích",
    city: "Hà Nội",
    district: "Cầu Giấy",
    phone: "0902 345 678",
    status: "active",
    rating: "4.8",
    weeklyShifts: 5,
    totalShifts: 72,
    joinedAt: "09/2025",
    tags: ["Lễ tân", "CSKH", "Front desk"],
    bio: "Phù hợp các vị trí front desk và hỗ trợ khách hàng tại điểm bán hoặc phòng khám.",
    verification: {
      status: "Đã xác thực",
      phone: "Đã xác minh",
      nationalId: "001305118745",
      taxId: "1093347812",
    },
    violations: {
      totalCases: 1,
      latestLevel: "Nhẹ",
      latestNote: "Đi trễ 12 phút ở ca ngày 03/05, đã nhắc nhở.",
    },
    payment: {
      batchId: "PAY-0520-A",
      amount: "₫3.920.000",
      status: "Chờ duyệt",
    },
    recentShifts: [
      {
        id: "SH-702",
        shiftName: "Ca lễ tân chiều",
        customer: "Shopee Express Official",
        schedule: "19/05, 13:00 - 18:00",
        checkInStatus: "Đúng giờ",
        payout: "₫480.000",
      },
      {
        id: "SH-695",
        shiftName: "Ca hỗ trợ khách hàng sáng",
        customer: "Shopee Express Official",
        schedule: "17/05, 08:00 - 12:00",
        checkInStatus: "Đi trễ",
        payout: "₫360.000",
      },
    ],
  },
  {
    id: "le-hoang-cuong",
    name: "Lê Hoàng Cường",
    city: "Đà Nẵng",
    district: "Hải Châu",
    phone: "0903 456 789",
    status: "pending",
    rating: "4.5",
    weeklyShifts: 3,
    totalShifts: 40,
    joinedAt: "01/2026",
    tags: ["Kho vận", "Ca đêm"],
    bio: "Đã có kinh nghiệm kho nhưng hồ sơ xác thực vẫn cần bổ sung thêm tài liệu thuế.",
    verification: {
      status: "Chờ bổ sung",
      phone: "Đã xác minh",
      nationalId: "201304992118",
      taxId: "Chưa nộp",
    },
    violations: {
      totalCases: 0,
      latestLevel: "Không có",
      latestNote: "Chưa ghi nhận vi phạm.",
    },
    payment: {
      batchId: "PAY-0513-B",
      amount: "₫2.410.000",
      status: "Đã chốt",
    },
    recentShifts: [
      {
        id: "SH-910",
        shiftName: "Ca kho đêm A",
        customer: "Ninja Van",
        schedule: "18/05, 22:00 - 06:00",
        checkInStatus: "Đúng giờ",
        payout: "₫580.000",
      },
      {
        id: "SH-901",
        shiftName: "Ca đóng gói sáng",
        customer: "Ninja Van",
        schedule: "16/05, 07:00 - 15:00",
        checkInStatus: "Đúng giờ",
        payout: "₫470.000",
      },
    ],
  },
  {
    id: "pham-thu-dung",
    name: "Phạm Thu Dung",
    city: "Cần Thơ",
    district: "Ninh Kiều",
    phone: "0904 567 890",
    status: "active",
    rating: "5.0",
    weeklyShifts: 7,
    totalShifts: 91,
    joinedAt: "05/2025",
    tags: ["Bán lẻ", "Siêu thị", "Chăm sóc quầy"],
    bio: "Worker chủ lực cho các ca retail dài ngày, phản hồi tốt từ quản lý điểm bán.",
    verification: {
      status: "Đã xác thực",
      phone: "Đã xác minh",
      nationalId: "366205772931",
      taxId: "4721984430",
    },
    violations: {
      totalCases: 0,
      latestLevel: "Không có",
      latestNote: "Không có vi phạm.",
    },
    payment: {
      batchId: "PAY-0520-A",
      amount: "₫5.210.000",
      status: "Chờ chuyển khoản",
    },
    recentShifts: [
      {
        id: "SH-612",
        shiftName: "Ca chăm sóc quầy FMCG",
        customer: "GHN Sorting",
        schedule: "19/05, 09:00 - 18:00",
        checkInStatus: "Đúng giờ",
        payout: "₫690.000",
      },
    ],
  },
  {
    id: "vu-minh-duc",
    name: "Vũ Minh Đức",
    city: "TP.HCM",
    district: "Thủ Đức",
    phone: "0905 678 901",
    status: "locked",
    rating: "3.9",
    weeklyShifts: 1,
    totalShifts: 18,
    joinedAt: "12/2025",
    tags: ["Kho vận", "Bốc xếp"],
    bio: "Đang bị tạm khóa để rà soát lại lịch sử vắng mặt và hồ sơ thanh toán.",
    verification: {
      status: "Đang rà soát",
      phone: "Đã xác minh",
      nationalId: "079105114662",
      taxId: "5412287731",
    },
    violations: {
      totalCases: 3,
      latestLevel: "Nghiêm trọng",
      latestNote: "Vắng mặt không báo trước ở 2 ca kho liên tiếp.",
    },
    payment: {
      batchId: "PAY-0513-B",
      amount: "₫980.000",
      status: "Đã chốt",
    },
    recentShifts: [
      {
        id: "SH-844",
        shiftName: "Ca kho tăng cường",
        customer: "Ninja Van",
        schedule: "11/05, 22:00 - 06:00",
        checkInStatus: "Vắng mặt",
        payout: "₫0",
      },
    ],
  },
];

export function getWorkerById(id: string): WorkerRecord | undefined {
  return WORKERS.find((worker) => worker.id === id);
}
