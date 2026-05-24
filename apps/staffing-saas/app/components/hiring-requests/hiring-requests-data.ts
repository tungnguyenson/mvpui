import type { WeekDay } from "../shifts/lib/date-utils";

export type HiringStatus = "draft" | "open" | "fulfilling" | "fulfilled" | "overdue" | "cancelled";

export type AssignmentStatus = "assigned" | "confirmed" | "cancelled";

export const ASSIGNMENT_STATUS_LABELS: Record<
  AssignmentStatus,
  { label: string; color: "success" | "warning" | "gray" }
> = {
  assigned: { label: "Đã gán", color: "warning" },
  confirmed: { label: "Đã xác nhận", color: "success" },
  cancelled: { label: "Đã huỷ", color: "gray" },
};

export interface HiringAssignment {
  id: string;
  hiringRequestId: string;
  candidateId: string;
  workerName: string;
  workerId?: string;
  date: string; // "DD/MM/YYYY"
  status: AssignmentStatus;
  note?: string;
}

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

export type JobPostStatus = "draft" | "published" | "paused" | "closed";

export const JOB_POST_STATUS_LABELS: Record<
  JobPostStatus,
  { label: string; color: "gray" | "warning" | "success" | "error" }
> = {
  draft: { label: "Nháp", color: "gray" },
  published: { label: "Đang đăng", color: "warning" },
  paused: { label: "Tạm dừng", color: "gray" },
  closed: { label: "Đã đóng", color: "gray" },
};

export type JobPostVisibility = "public" | "unlisted" | "private";

export const JOB_POST_VISIBILITY_LABELS: Record<JobPostVisibility, string> = {
  public: "Công khai",
  unlisted: "Hạn chế",
  private: "Riêng tư",
};

export interface JobPost {
  id: string;
  hiringRequestId: string;
  title: string;
  displayedPay: { amount: number; unit: "shift" | "hour" };
  payCycle: string;
  visibility: JobPostVisibility;
  status: JobPostStatus;
  adhocBonus: {
    amount: number;
    unit: "shift" | "hour";
    reason: string;
    approvalStatus: "pending" | "approved" | "rejected";
  } | null;
  publishedAt: string | null;
  closedAt: string | null;
  applicationCount: number;
}

export interface HiringRequestRecord {
  id: string;
  code: string;
  title: string;
  customer: string;
  customerId: string;
  shiftId: string | null;
  area: string;
  headcount: number;
  filled: number;
  committedWorkers: number;
  filledSlots: number;
  totalSlots: number;
  startDate: string;
  endDate: string;
  deadline: string;
  targetDeadline: string;
  parentRequestId: string | null;
  status: HiringStatus;
  payRate: string;
  workerProfile: string[];
  skills: string[];
  contact: string;
  notes: string;
  candidates: HiringCandidate[];
  timeline: HiringTimelineEntry[];
  jobPosts: JobPost[];
  weekdays?: WeekDay[]; // 0=Mon…6=Sun; defaults to Mon–Fri if absent
  assignments?: HiringAssignment[];
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

// HR-2401: CTV bán hàng cuối tuần — weekdays [5,6] (Sat+Sun)
// Range 24/05–30/05/2026 → working days: 24/05 (Sun), 30/05 (Sat)
const HR2401_ASSIGNMENTS: HiringAssignment[] = [
  { id: "ha-2401-01", hiringRequestId: "hr-2401", candidateId: "cand-1", workerName: "Nguyễn Văn An", workerId: "nguyen-van-an", date: "24/05/2026", status: "confirmed" },
  { id: "ha-2401-02", hiringRequestId: "hr-2401", candidateId: "cand-2", workerName: "Phạm Thu Dung", workerId: "pham-thu-dung", date: "24/05/2026", status: "confirmed" },
  { id: "ha-2401-03", hiringRequestId: "hr-2401", candidateId: "cand-4", workerName: "Hồ Văn Tú", date: "24/05/2026", status: "assigned" },
  { id: "ha-2401-04", hiringRequestId: "hr-2401", candidateId: "cand-5", workerName: "Lê Thị Lan", date: "24/05/2026", status: "assigned" },
  { id: "ha-2401-05", hiringRequestId: "hr-2401", candidateId: "cand-1", workerName: "Nguyễn Văn An", workerId: "nguyen-van-an", date: "30/05/2026", status: "confirmed" },
  { id: "ha-2401-06", hiringRequestId: "hr-2401", candidateId: "cand-2", workerName: "Phạm Thu Dung", workerId: "pham-thu-dung", date: "30/05/2026", status: "confirmed" },
  { id: "ha-2401-07", hiringRequestId: "hr-2401", candidateId: "cand-4", workerName: "Hồ Văn Tú", date: "30/05/2026", status: "confirmed" },
  { id: "ha-2401-08", hiringRequestId: "hr-2401", candidateId: "cand-5", workerName: "Lê Thị Lan", date: "30/05/2026", status: "assigned" },
  { id: "ha-2401-09", hiringRequestId: "hr-2401", candidateId: "cand-6", workerName: "Nguyễn Minh Khoa", date: "30/05/2026", status: "assigned" },
  { id: "ha-2401-10", hiringRequestId: "hr-2401", candidateId: "cand-7", workerName: "Đặng Thị Hoa", date: "30/05/2026", status: "assigned" },
  { id: "ha-2401-11", hiringRequestId: "hr-2401", candidateId: "cand-8", workerName: "Bùi Văn Nam", date: "30/05/2026", status: "assigned" },
  { id: "ha-2401-12", hiringRequestId: "hr-2401", candidateId: "cand-9", workerName: "Vũ Thị Thu", date: "30/05/2026", status: "assigned" },
  { id: "ha-2401-13", hiringRequestId: "hr-2401", candidateId: "cand-10", workerName: "Trần Văn Đức", date: "30/05/2026", status: "cancelled", note: "CTV báo có việc đột xuất" },
  { id: "ha-2401-14", hiringRequestId: "hr-2401", candidateId: "cand-11", workerName: "Lý Thị Ngọc", date: "30/05/2026", status: "assigned" },
  { id: "ha-2401-15", hiringRequestId: "hr-2401", candidateId: "cand-12", workerName: "Ngô Quang Huy", date: "30/05/2026", status: "assigned" },
];

// HR-2402: CTV kho ca đêm — weekdays [0,1,2,3,4] (Mon–Fri)
// Range 23/05–29/05/2026 → working days: 25(Mon),26(Tue),27(Wed),28(Thu),29(Fri)
const HR2402_ASSIGNMENTS: HiringAssignment[] = [
  { id: "ha-2402-01", hiringRequestId: "hr-2402", candidateId: "cand-1", workerName: "Lê Hoàng Cường", workerId: "le-hoang-cuong", date: "25/05/2026", status: "confirmed" },
  { id: "ha-2402-02", hiringRequestId: "hr-2402", candidateId: "cand-2", workerName: "Đinh Văn Toàn", date: "25/05/2026", status: "assigned" },
  { id: "ha-2402-03", hiringRequestId: "hr-2402", candidateId: "cand-3", workerName: "Hồ Văn Tú", date: "25/05/2026", status: "assigned" },
  { id: "ha-2402-04", hiringRequestId: "hr-2402", candidateId: "cand-1", workerName: "Lê Hoàng Cường", workerId: "le-hoang-cuong", date: "26/05/2026", status: "confirmed" },
  { id: "ha-2402-05", hiringRequestId: "hr-2402", candidateId: "cand-2", workerName: "Đinh Văn Toàn", date: "26/05/2026", status: "confirmed" },
  { id: "ha-2402-06", hiringRequestId: "hr-2402", candidateId: "cand-3", workerName: "Hồ Văn Tú", date: "26/05/2026", status: "assigned" },
  { id: "ha-2402-07", hiringRequestId: "hr-2402", candidateId: "cand-4", workerName: "Lê Thị Lan", date: "26/05/2026", status: "assigned" },
  { id: "ha-2402-08", hiringRequestId: "hr-2402", candidateId: "cand-1", workerName: "Lê Hoàng Cường", workerId: "le-hoang-cuong", date: "27/05/2026", status: "confirmed" },
  { id: "ha-2402-09", hiringRequestId: "hr-2402", candidateId: "cand-2", workerName: "Đinh Văn Toàn", date: "27/05/2026", status: "assigned" },
  { id: "ha-2402-10", hiringRequestId: "hr-2402", candidateId: "cand-3", workerName: "Hồ Văn Tú", date: "27/05/2026", status: "cancelled", note: "Xin nghỉ phép" },
  { id: "ha-2402-11", hiringRequestId: "hr-2402", candidateId: "cand-1", workerName: "Lê Hoàng Cường", workerId: "le-hoang-cuong", date: "28/05/2026", status: "confirmed" },
  { id: "ha-2402-12", hiringRequestId: "hr-2402", candidateId: "cand-2", workerName: "Đinh Văn Toàn", date: "28/05/2026", status: "assigned" },
  { id: "ha-2402-13", hiringRequestId: "hr-2402", candidateId: "cand-4", workerName: "Lê Thị Lan", date: "28/05/2026", status: "assigned" },
  { id: "ha-2402-14", hiringRequestId: "hr-2402", candidateId: "cand-1", workerName: "Lê Hoàng Cường", workerId: "le-hoang-cuong", date: "29/05/2026", status: "assigned" },
  { id: "ha-2402-15", hiringRequestId: "hr-2402", candidateId: "cand-2", workerName: "Đinh Văn Toàn", date: "29/05/2026", status: "assigned" },
];

export const HIRING_REQUESTS: HiringRequestRecord[] = [
  {
    id: "hr-2401",
    code: "HR-2401",
    title: "CTV bán hàng cuối tuần",
    customer: "GHN Sorting",
    customerId: "highlands-commerce",
    shiftId: "SC1002",
    area: "Quận 1, TP.HCM",
    headcount: 20,
    filled: 12,
    committedWorkers: 12,
    filledSlots: 18,
    totalSlots: 40,
    startDate: "24/05/2026",
    endDate: "30/05/2026",
    deadline: "24/05/2026",
    targetDeadline: "23/05/2026",
    parentRequestId: null,
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
      { id: "t-1", at: "12/05/2026", action: "Khách hàng tạo yêu cầu (0/15 người)", actor: "GHN Sorting" },
      { id: "t-2", at: "13/05/2026", action: "Tăng headcount: 15 → 20 người", actor: "Trần Minh Quân (AE)", note: "Khách mở thêm điểm bán tại Vincom Đồng Khởi." },
      { id: "t-3", at: "14/05/2026", action: "Đẩy danh sách shortlist cho khách", actor: "Lê Thuỳ Trang" },
      { id: "t-4", at: "16/05/2026", action: "Nhận thêm 5 worker (5/20 người)", actor: "Lê Thuỳ Trang" },
      { id: "t-5", at: "19/05/2026", action: "Nhận thêm 7 worker (12/20 người)", actor: "Lê Thuỳ Trang" },
    ],
    weekdays: [5, 6],
    assignments: HR2401_ASSIGNMENTS,
    jobPosts: [
      {
        id: "JP-8821",
        hiringRequestId: "hr-2401",
        title: "Tuyển gấp CTV bán hàng cuối tuần - Q1, HCM",
        displayedPay: { amount: 170000, unit: "shift" },
        payCycle: "Trả liền sau ca",
        visibility: "public",
        status: "published",
        adhocBonus: null,
        publishedAt: "14/05/2026",
        closedAt: null,
        applicationCount: 28,
      },
      {
        id: "JP-8839",
        hiringRequestId: "hr-2401",
        title: "[VIP Network] CTV retail cuối tuần thưởng cao",
        displayedPay: { amount: 185000, unit: "shift" },
        payCycle: "Trả liền sau ca",
        visibility: "private",
        status: "published",
        adhocBonus: {
          amount: 20000,
          unit: "shift",
          reason: "Đẩy nhanh fill rate trước thứ 7, ưu tiên CTV có rating ≥ 4.5",
          approvalStatus: "approved",
        },
        publishedAt: "17/05/2026",
        closedAt: null,
        applicationCount: 9,
      },
    ],
  },
  {
    id: "hr-2402",
    code: "HR-2402",
    title: "CTV kho ca đêm",
    customer: "Ninja Van",
    customerId: "gomart-distribution",
    shiftId: "SC1004",
    area: "Thuận An, Bình Dương",
    headcount: 15,
    filled: 8,
    committedWorkers: 8,
    filledSlots: 32,
    totalSlots: 105,
    startDate: "23/05/2026",
    endDate: "29/05/2026",
    deadline: "25/05/2026",
    targetDeadline: "22/05/2026",
    parentRequestId: null,
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
      { id: "t-1", at: "10/05/2026", action: "Tạo hiring request (0/10 người)", actor: "Ninja Van" },
      { id: "t-2", at: "12/05/2026", action: "Tăng headcount: 10 → 15 người", actor: "Phạm Hoàng Long (Ops)", note: "Khách bổ sung ca đêm cuối tuần." },
      { id: "t-3", at: "13/05/2026", action: "Gửi shortlist worker", actor: "Nguyễn Quốc Đạt" },
      { id: "t-4", at: "17/05/2026", action: "Nhận thêm 5 worker (5/15 người)", actor: "Nguyễn Quốc Đạt" },
      { id: "t-5", at: "20/05/2026", action: "Nhận thêm 3 worker (8/15 người)", actor: "Nguyễn Quốc Đạt" },
    ],
    weekdays: [0, 1, 2, 3, 4],
    assignments: HR2402_ASSIGNMENTS,
    jobPosts: [
      {
        id: "JP-8825",
        hiringRequestId: "hr-2402",
        title: "CTV kho ca đêm - Thuận An, có phụ cấp",
        displayedPay: { amount: 75000, unit: "hour" },
        payCycle: "Trả 2 lần/tháng (15-20 và 01-05)",
        visibility: "public",
        status: "published",
        adhocBonus: {
          amount: 50000,
          unit: "shift",
          reason: "Khó tuyển ca đêm; bù thêm để hấp dẫn CTV có chứng nhận an toàn LĐ",
          approvalStatus: "approved",
        },
        publishedAt: "13/05/2026",
        closedAt: null,
        applicationCount: 14,
      },
    ],
  },
  {
    id: "hr-2409",
    code: "HR-2409",
    title: "CTV chăm sóc khách hàng",
    customer: "Shopee Express Official",
    customerId: "medistar-clinic",
    shiftId: "SC1001",
    area: "Ba Đình, Hà Nội",
    headcount: 4,
    filled: 1,
    committedWorkers: 1,
    filledSlots: 3,
    totalSlots: 20,
    startDate: "20/05/2026",
    endDate: "24/05/2026",
    deadline: "20/05/2026",
    targetDeadline: "19/05/2026",
    parentRequestId: null,
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
      { id: "t-1", at: "08/05/2026", action: "Tạo hiring request (0/6 người)", actor: "Shopee Express Official" },
      { id: "t-2", at: "12/05/2026", action: "Giảm headcount: 6 → 4 người", actor: "Đỗ Khánh Vy (AM)", note: "Khách điều chỉnh ngân sách, cắt 2 slot." },
      { id: "t-3", at: "15/05/2026", action: "Nhận 1 worker (1/4 người)", actor: "Đỗ Khánh Vy (AM)" },
      { id: "t-4", at: "20/05/2026", action: "Đánh dấu quá hạn", actor: "Hệ thống" },
    ],
    jobPosts: [
      {
        id: "JP-8801",
        hiringRequestId: "hr-2409",
        title: "Tuyển CTV CSKH Ba Đình - phụ cấp ăn trưa",
        displayedPay: { amount: 65000, unit: "hour" },
        payCycle: "Hàng tháng (01-05)",
        visibility: "public",
        status: "closed",
        adhocBonus: null,
        publishedAt: "10/05/2026",
        closedAt: "18/05/2026",
        applicationCount: 6,
      },
      {
        id: "JP-8842",
        hiringRequestId: "hr-2409",
        title: "[Urgent] Tuyển gấp CTV CSKH - thưởng nóng 100k/ca",
        displayedPay: { amount: 65000, unit: "hour" },
        payCycle: "Hàng tháng (01-05)",
        visibility: "public",
        status: "published",
        adhocBonus: {
          amount: 100000,
          unit: "shift",
          reason: "Đã quá hạn deadline, cần phụ cấp đột xuất để vớt fill rate cuối",
          approvalStatus: "pending",
        },
        publishedAt: "20/05/2026",
        closedAt: null,
        applicationCount: 2,
      },
    ],
  },
  {
    id: "hr-2418",
    code: "HR-2418",
    title: "CTV đóng gói cuối tháng",
    customer: "Ninja Van",
    customerId: "gomart-distribution",
    shiftId: "SC1002",
    area: "Dĩ An, Bình Dương",
    headcount: 10,
    filled: 10,
    committedWorkers: 10,
    filledSlots: 60,
    totalSlots: 60,
    startDate: "30/05/2026",
    endDate: "05/06/2026",
    deadline: "29/05/2026",
    targetDeadline: "28/05/2026",
    parentRequestId: null,
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
      { id: "t-1", at: "05/05/2026", action: "Tạo hiring request (0/8 người)", actor: "Ninja Van" },
      { id: "t-2", at: "07/05/2026", action: "Tăng headcount: 8 → 10 người", actor: "Lê Quang Thịnh (Warehouse Lead)", note: "Đơn hàng cuối tháng tăng 20%." },
      { id: "t-3", at: "10/05/2026", action: "Nhận thêm 4 worker (4/10 người)", actor: "Lê Thuỳ Trang" },
      { id: "t-4", at: "13/05/2026", action: "Nhận thêm 4 worker (8/10 người)", actor: "Lê Thuỳ Trang" },
      { id: "t-5", at: "15/05/2026", action: "Đạt đủ headcount (10/10 người)", actor: "Lê Thuỳ Trang" },
    ],
    jobPosts: [
      {
        id: "JP-8755",
        hiringRequestId: "hr-2418",
        title: "CTV đóng gói FMCG - ca ngắn cuối tháng",
        displayedPay: { amount: 55000, unit: "hour" },
        payCycle: "Trả 2 lần/tháng (15-20 và 01-05)",
        visibility: "public",
        status: "closed",
        adhocBonus: null,
        publishedAt: "06/05/2026",
        closedAt: "15/05/2026",
        applicationCount: 22,
      },
    ],
  },
  {
    id: "hr-2420",
    code: "HR-2420",
    title: "CTV kho ổn định tháng 5–6",
    customer: "Ninja Van",
    customerId: "gomart-distribution",
    shiftId: "SC1004",
    area: "Thuận An, Bình Dương",
    headcount: 8,
    filled: 5,
    committedWorkers: 5,
    filledSlots: 55,
    totalSlots: 184,
    startDate: "05/05/2026",
    endDate: "05/06/2026",
    deadline: "08/05/2026",
    targetDeadline: "06/05/2026",
    parentRequestId: null,
    status: "open",
    payRate: "₫68.000 / giờ",
    workerProfile: [
      "Có chứng nhận an toàn lao động",
      "Cam kết làm đủ tháng",
    ],
    skills: ["Kho vận", "Bốc xếp", "Dài hạn"],
    contact: "Lê Quang Thịnh (Warehouse Lead)",
    notes: "Job dài hạn ổn định. Ưu tiên CTV đã từng làm tại Ninja Van.",
    candidates: [
      { id: "cand-1", workerId: "le-hoang-cuong", workerName: "Lê Hoàng Cường", city: "Đà Nẵng", experience: "40 ca kho", status: "assigned", matchScore: 88 },
      { id: "cand-2", workerName: "Đinh Văn Toàn", city: "Bình Dương", experience: "30 ca kho", status: "assigned", matchScore: 81 },
      { id: "cand-3", workerName: "Hồ Văn Tú", city: "TP.HCM", experience: "18 ca kho", status: "shortlisted", matchScore: 74 },
    ],
    timeline: [
      { id: "t-1", at: "28/04/2026", action: "Tạo hiring request (0/8 người)", actor: "Ninja Van" },
      { id: "t-2", at: "02/05/2026", action: "Nhận 5 worker (5/8 người)", actor: "Nguyễn Quốc Đạt" },
    ],
    weekdays: [0, 1, 2, 3, 4],
    assignments: [
      { id: "ha-2420-01", hiringRequestId: "hr-2420", candidateId: "cand-1", workerName: "Lê Hoàng Cường", workerId: "le-hoang-cuong", date: "05/05/2026", status: "confirmed" },
      { id: "ha-2420-02", hiringRequestId: "hr-2420", candidateId: "cand-2", workerName: "Đinh Văn Toàn", date: "05/05/2026", status: "confirmed" },
      { id: "ha-2420-03", hiringRequestId: "hr-2420", candidateId: "cand-1", workerName: "Lê Hoàng Cường", workerId: "le-hoang-cuong", date: "06/05/2026", status: "confirmed" },
      { id: "ha-2420-04", hiringRequestId: "hr-2420", candidateId: "cand-2", workerName: "Đinh Văn Toàn", date: "06/05/2026", status: "assigned" },
      { id: "ha-2420-05", hiringRequestId: "hr-2420", candidateId: "cand-1", workerName: "Lê Hoàng Cường", workerId: "le-hoang-cuong", date: "25/05/2026", status: "confirmed" },
      { id: "ha-2420-06", hiringRequestId: "hr-2420", candidateId: "cand-2", workerName: "Đinh Văn Toàn", date: "25/05/2026", status: "assigned" },
      { id: "ha-2420-07", hiringRequestId: "hr-2420", candidateId: "cand-1", workerName: "Lê Hoàng Cường", workerId: "le-hoang-cuong", date: "26/05/2026", status: "confirmed" },
      { id: "ha-2420-08", hiringRequestId: "hr-2420", candidateId: "cand-2", workerName: "Đinh Văn Toàn", date: "26/05/2026", status: "cancelled", note: "Xin nghỉ phép đột xuất" },
    ],
    jobPosts: [],
  },
];

export function getHiringRequestById(
  id: string,
): HiringRequestRecord | undefined {
  return HIRING_REQUESTS.find((record) => record.id === id);
}
