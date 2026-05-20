export type HiringStatus = "draft" | "open" | "fulfilling" | "fulfilled" | "overdue" | "cancelled";

export type CandidateStatus =
  | "assigned"
  | "shortlisted"
  | "interviewing"
  | "rejected"
  | "withdrawn";

export interface HiringCandidate {
  id: string;
  workerId?: string;
  workerName: string;
  city: string;
  experience: string;
  status: CandidateStatus;
  matchScore: number;
  note?: string;
}

export interface HiringTimelineEntry {
  id: string;
  at: string;
  action: string;
  actor: string;
  note?: string;
}

export interface HiringRequestRecord {
  id: string;
  code: string;
  title: string;
  customer: string;
  customerId: string;
  area: string;
  headcount: number;
  filled: number;
  startDate: string;
  deadline: string;
  status: HiringStatus;
  payRate: string;
  workerProfile: string[];
  skills: string[];
  contact: string;
  notes: string;
  candidates: HiringCandidate[];
  timeline: HiringTimelineEntry[];
}

export const HIRING_STATUS_LABELS: Record<
  HiringStatus,
  { label: string; color: "success" | "warning" | "error" | "gray" }
> = {
  draft: { label: "Nháp", color: "gray" },
  open: { label: "Đang tuyển", color: "warning" },
  fulfilling: { label: "Sắp đủ người", color: "warning" },
  fulfilled: { label: "Đủ người", color: "success" },
  overdue: { label: "Quá hạn", color: "error" },
  cancelled: { label: "Đã huỷ", color: "gray" },
};

export const CANDIDATE_LABELS: Record<
  CandidateStatus,
  { label: string; color: "success" | "warning" | "error" | "gray" }
> = {
  assigned: { label: "Đã nhận ca", color: "success" },
  shortlisted: { label: "Shortlist", color: "warning" },
  interviewing: { label: "Đang phỏng vấn", color: "warning" },
  rejected: { label: "Bị loại", color: "error" },
  withdrawn: { label: "Rút hồ sơ", color: "gray" },
};

export const HIRING_REQUESTS: HiringRequestRecord[] = [
  {
    id: "hr-2401",
    code: "HR-2401",
    title: "CTV bán hàng cuối tuần",
    customer: "GHN Sorting",
    customerId: "highlands-commerce",
    area: "Quận 1, TP.HCM",
    headcount: 20,
    filled: 12,
    startDate: "24/05/2026",
    deadline: "24/05/2026",
    status: "open",
    payRate: "₫55.000 / giờ",
    workerProfile: [
      "Đã xác thực CCCD và hồ sơ thuế",
      "Có kinh nghiệm bán hàng retail",
      "Cam kết ca thứ 7 & chủ nhật",
    ],
    skills: ["Retail", "Activation", "Cuối tuần"],
    contact: "Nguyễn Hồng Nhung (HRBP)",
    notes:
      "Khách hàng cần fill nhanh trước thứ 7. Ưu tiên CTV từng làm tại Highlands hoặc Vincom.",
    candidates: [
      {
        id: "cand-1",
        workerId: "nguyen-van-an",
        workerName: "Nguyễn Văn An",
        city: "TP.HCM",
        experience: "86 ca retail",
        status: "assigned",
        matchScore: 96,
      },
      {
        id: "cand-2",
        workerId: "pham-thu-dung",
        workerName: "Phạm Thu Dung",
        city: "Cần Thơ",
        experience: "91 ca retail",
        status: "assigned",
        matchScore: 92,
      },
      {
        id: "cand-3",
        workerId: "tran-thi-bich",
        workerName: "Trần Thị Bích",
        city: "Hà Nội",
        experience: "72 ca CSKH",
        status: "shortlisted",
        matchScore: 78,
        note: "Cần xác nhận lịch chốt cuối tuần trước khi đẩy lên.",
      },
    ],
    timeline: [
      { id: "t-1", at: "12/05/2026", action: "Khách hàng tạo yêu cầu", actor: "GHN Sorting" },
      { id: "t-2", at: "14/05/2026", action: "Đẩy danh sách shortlist cho khách", actor: "Lê Thuỳ Trang" },
    ],
  },
  {
    id: "hr-2402",
    code: "HR-2402",
    title: "CTV kho ca đêm",
    customer: "Ninja Van",
    customerId: "gomart-distribution",
    area: "Thuận An, Bình Dương",
    headcount: 15,
    filled: 8,
    startDate: "23/05/2026",
    deadline: "25/05/2026",
    status: "fulfilling",
    payRate: "₫70.000 / giờ + phụ cấp",
    workerProfile: [
      "Có chứng nhận an toàn lao động",
      "Sức khỏe đảm bảo ca đêm",
      "Đã làm kho trong 6 tháng gần đây",
    ],
    skills: ["Kho vận", "Ca đêm", "Bốc xếp"],
    contact: "Lê Quang Thịnh (Warehouse Lead)",
    notes:
      "Worker cần có chứng nhận lao động và đồng phục bảo hộ. Đội điều phối có mặt trước 21:30.",
    candidates: [
      {
        id: "cand-1",
        workerId: "le-hoang-cuong",
        workerName: "Lê Hoàng Cường",
        city: "Đà Nẵng",
        experience: "40 ca kho",
        status: "assigned",
        matchScore: 88,
      },
      {
        id: "cand-2",
        workerName: "Đinh Văn Toàn",
        city: "Bình Dương",
        experience: "30 ca kho",
        status: "interviewing",
        matchScore: 81,
        note: "Đang chờ kết quả phỏng vấn nhanh.",
      },
    ],
    timeline: [
      { id: "t-1", at: "10/05/2026", action: "Tạo hiring request", actor: "Ninja Van" },
      { id: "t-2", at: "13/05/2026", action: "Gửi shortlist worker", actor: "Nguyễn Quốc Đạt" },
    ],
  },
  {
    id: "hr-2409",
    code: "HR-2409",
    title: "CTV chăm sóc khách hàng",
    customer: "Shopee Express Official",
    customerId: "medistar-clinic",
    area: "Ba Đình, Hà Nội",
    headcount: 4,
    filled: 1,
    startDate: "20/05/2026",
    deadline: "20/05/2026",
    status: "overdue",
    payRate: "₫60.000 / giờ",
    workerProfile: [
      "Giao tiếp tốt, biết tiếng Anh cơ bản",
      "Đã hoàn tất xác thực và khám sức khoẻ",
    ],
    skills: ["CSKH", "Front desk"],
    contact: "Trần Thanh Mai (Clinic Admin)",
    notes:
      "Yêu cầu đã quá hạn vì khó tìm worker phù hợp. Cần đẩy phụ cấp hoặc thương lượng lại với khách.",
    candidates: [
      {
        id: "cand-1",
        workerId: "tran-thi-bich",
        workerName: "Trần Thị Bích",
        city: "Hà Nội",
        experience: "72 ca CSKH",
        status: "assigned",
        matchScore: 94,
      },
    ],
    timeline: [
      { id: "t-1", at: "08/05/2026", action: "Tạo hiring request", actor: "Shopee Express Official" },
      { id: "t-2", at: "20/05/2026", action: "Đánh dấu quá hạn", actor: "Hệ thống" },
    ],
  },
  {
    id: "hr-2418",
    code: "HR-2418",
    title: "CTV đóng gói cuối tháng",
    customer: "Ninja Van",
    customerId: "gomart-distribution",
    area: "Dĩ An, Bình Dương",
    headcount: 10,
    filled: 10,
    startDate: "30/05/2026",
    deadline: "29/05/2026",
    status: "fulfilled",
    payRate: "₫55.000 / giờ",
    workerProfile: [
      "Đã từng làm đóng gói FMCG",
      "Có thể chạy ca tăng cường cuối tháng",
    ],
    skills: ["Kho vận", "Đóng gói", "Ca ngắn"],
    contact: "Lê Quang Thịnh (Warehouse Lead)",
    notes: "Đã đủ headcount, đợi worker xác nhận lịch ca cuối tháng.",
    candidates: [
      {
        id: "cand-1",
        workerId: "pham-thu-dung",
        workerName: "Phạm Thu Dung",
        city: "Cần Thơ",
        experience: "91 ca retail",
        status: "assigned",
        matchScore: 87,
      },
    ],
    timeline: [
      { id: "t-1", at: "05/05/2026", action: "Tạo hiring request", actor: "Ninja Van" },
      { id: "t-2", at: "15/05/2026", action: "Đạt đủ headcount", actor: "Lê Thuỳ Trang" },
    ],
  },
];

export function getHiringRequestById(
  id: string,
): HiringRequestRecord | undefined {
  return HIRING_REQUESTS.find((record) => record.id === id);
}
