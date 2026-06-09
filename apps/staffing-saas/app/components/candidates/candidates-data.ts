import { assignAvatars } from "../_shared/assets";

export type CandidateStage =
  | "new"
  | "contact"
  | "onboarding"
  | "hired"
  | "rejected"
  | "ghosted"
  | "blacklist";

export type CandidateSource =
  | "facebook"
  | "zalo"
  | "tiktok"
  | "referral"
  | "direct";

export type DocumentState = "missing" | "submitted" | "verified" | "rejected";

export interface CandidateDocumentRow {
  id: string;
  label: string;
  state: DocumentState;
  note?: string;
}

export interface CandidateInteraction {
  id: string;
  at: string;
  channel: "call" | "sms" | "zalo" | "system" | "note" | "interview";
  actor: string;
  summary: string;
  detail?: string;
}

export interface CandidateInterview {
  id: string;
  at: string;
  mode: "Online" | "Trực tiếp" | "Ca thử";
  interviewer: string;
  outcome: "Đạt" | "Không đạt" | "Chờ kết quả" | "Đã hẹn";
  note?: string;
}

export interface CandidateNote {
  id: string;
  at: string;
  actor: string;
  body: string;
}

export interface CandidateRecord {
  id: string;
  code: string;
  fullName: string;
  phone: string;
  email?: string;
  dob: string;
  gender: "male" | "female";
  city: string;
  district: string;
  appliedPosition: string;
  hiringRequestId?: string;
  hiringRequestCode?: string;
  workerId?: string;
  stage: CandidateStage;
  source: CandidateSource;
  recruiter: string;
  score: number;
  appliedAt: string;
  lastTouchAt: string;
  experience: string;
  skills: string[];
  expectedPay?: string;
  notesShort?: string;
  documents: CandidateDocumentRow[];
  interactions: CandidateInteraction[];
  interviews: CandidateInterview[];
  notes: CandidateNote[];
}

export const STAGE_LABELS: Record<
  CandidateStage,
  { label: string; color: "success" | "warning" | "error" | "gray" | "brand" }
> = {
  new: { label: "Mới nhận", color: "gray" },
  contact: { label: "Liên hệ", color: "warning" },
  onboarding: { label: "Onboarding", color: "brand" },
  hired: { label: "Đã nhận việc", color: "success" },
  rejected: { label: "Từ chối", color: "error" },
  ghosted: { label: "Mất liên lạc", color: "gray" },
  blacklist: { label: "Blacklist", color: "error" },
};

export const STAGE_ORDER: CandidateStage[] = [
  "new",
  "contact",
  "onboarding",
  "hired",
];

export const TERMINAL_STAGES: CandidateStage[] = [
  "rejected",
  "ghosted",
  "blacklist",
];

export const SOURCE_LABELS: Record<CandidateSource, string> = {
  facebook: "Facebook",
  zalo: "Zalo",
  tiktok: "TikTok",
  referral: "Giới thiệu",
  direct: "Trực tiếp",
};

export const DOC_STATE_LABELS: Record<
  DocumentState,
  { label: string; color: "success" | "warning" | "error" | "gray" }
> = {
  missing: { label: "Thiếu", color: "gray" },
  submitted: { label: "Đã gửi", color: "warning" },
  verified: { label: "Đã xác thực", color: "success" },
  rejected: { label: "Bị loại", color: "error" },
};

const baseDocs: CandidateDocumentRow[] = [
  { id: "cccd", label: "CMND/CCCD", state: "missing" },
  { id: "selfie", label: "Selfie giữ CCCD", state: "missing" },
  { id: "bank", label: "Tài khoản ngân hàng", state: "missing" },
  { id: "health", label: "Giấy khám sức khỏe", state: "missing" },
  { id: "contract", label: "Hợp đồng CTV", state: "missing" },
];

function docs(
  overrides: Partial<Record<string, { state: DocumentState; note?: string }>>,
): CandidateDocumentRow[] {
  return baseDocs.map((doc) => {
    const o = overrides[doc.id];
    if (!o) return doc;
    return o.note === undefined
      ? { ...doc, state: o.state }
      : { ...doc, state: o.state, note: o.note };
  });
}

export const CANDIDATES: CandidateRecord[] = [
  {
    id: "cand-001",
    code: "C-2401",
    fullName: "Đỗ Quang Minh",
    phone: "0901 882 451",
    email: "minh.do@gmail.com",
    dob: "12/04/1999",
    gender: "male",
    city: "TP.HCM",
    district: "Quận 7",
    appliedPosition: "CTV bán hàng cuối tuần",
    hiringRequestId: "hr-2401",
    hiringRequestCode: "HR-2401",
    stage: "new",
    source: "facebook",
    recruiter: "Lê Thuỳ Trang",
    score: 72,
    appliedAt: "18/05/2026",
    lastTouchAt: "18/05/2026",
    experience: "1 năm bán hàng FMCG",
    skills: ["Retail", "Giao tiếp tốt"],
    expectedPay: "₫55.000 / giờ",
    notesShort: "Đã nộp qua form Facebook Lead Ads.",
    documents: docs({ cccd: { state: "submitted" } }),
    interactions: [
      {
        id: "i-1",
        at: "18/05/2026 09:12",
        channel: "system",
        actor: "Hệ thống",
        summary: "Ứng viên nộp đơn",
        detail: "Nguồn Facebook Lead Ads, vị trí HR-2401",
      },
    ],
    interviews: [],
    notes: [],
  },
  {
    id: "cand-002",
    code: "C-2402",
    fullName: "Phạm Hồng Nhung",
    phone: "0938 220 117",
    email: "nhungph@gmail.com",
    dob: "23/09/2001",
    gender: "female",
    city: "TP.HCM",
    district: "Quận 3",
    appliedPosition: "CTV bán hàng cuối tuần",
    hiringRequestId: "hr-2401",
    hiringRequestCode: "HR-2401",
    stage: "contact",
    source: "zalo",
    recruiter: "Lê Thuỳ Trang",
    score: 81,
    appliedAt: "17/05/2026",
    lastTouchAt: "19/05/2026",
    experience: "8 tháng activation tại Highlands",
    skills: ["Retail", "Activation", "Tiếng Anh cơ bản"],
    expectedPay: "₫55.000 / giờ",
    notesShort: "Đã qua sàng lọc điện thoại, đang xếp lịch phỏng vấn.",
    documents: docs({
      cccd: { state: "verified" },
      selfie: { state: "submitted" },
    }),
    interactions: [
      {
        id: "i-1",
        at: "17/05/2026 18:42",
        channel: "system",
        actor: "Hệ thống",
        summary: "Ứng viên nộp đơn qua Zalo OA",
      },
      {
        id: "i-2",
        at: "18/05/2026 10:05",
        channel: "call",
        actor: "Lê Thuỳ Trang",
        summary: "Gọi sàng lọc 6 phút",
        detail: "Xác nhận lịch cuối tuần, sẵn sàng nhận ca từ 23/05.",
      },
    ],
    interviews: [],
    notes: [
      {
        id: "n-1",
        at: "18/05/2026",
        actor: "Lê Thuỳ Trang",
        body: "Giao tiếp tốt, hỏi rõ về thưởng cuối tuần. Push lên phỏng vấn.",
      },
    ],
  },
  {
    id: "cand-003",
    code: "C-2403",
    fullName: "Trần Quốc Bảo",
    phone: "0912 553 880",
    dob: "07/11/2000",
    gender: "male",
    city: "Bình Dương",
    district: "Thuận An",
    appliedPosition: "CTV kho ca đêm",
    hiringRequestId: "hr-2402",
    hiringRequestCode: "HR-2402",
    stage: "contact",
    source: "referral",
    recruiter: "Nguyễn Quốc Đạt",
    score: 88,
    appliedAt: "15/05/2026",
    lastTouchAt: "19/05/2026",
    experience: "2 năm kho FMCG",
    skills: ["Kho vận", "Ca đêm", "Bốc xếp"],
    expectedPay: "₫70.000 / giờ",
    notesShort: "Đang chờ phỏng vấn nhanh với Warehouse Lead.",
    documents: docs({
      cccd: { state: "verified" },
      selfie: { state: "verified" },
      bank: { state: "submitted" },
      health: { state: "submitted" },
    }),
    interactions: [
      {
        id: "i-1",
        at: "15/05/2026 14:11",
        channel: "system",
        actor: "Hệ thống",
        summary: "Nhận đơn qua giới thiệu (CTV Đinh Văn Toàn)",
      },
      {
        id: "i-2",
        at: "16/05/2026 09:00",
        channel: "zalo",
        actor: "Nguyễn Quốc Đạt",
        summary: "Gửi link xác thực hồ sơ",
      },
      {
        id: "i-3",
        at: "19/05/2026 16:30",
        channel: "interview",
        actor: "Lê Quang Thịnh",
        summary: "Đã hẹn phỏng vấn online 20/05 19:30",
      },
    ],
    interviews: [
      {
        id: "iv-1",
        at: "20/05/2026 19:30",
        mode: "Online",
        interviewer: "Lê Quang Thịnh",
        outcome: "Đã hẹn",
      },
    ],
    notes: [],
  },
  {
    id: "cand-004",
    code: "C-2404",
    fullName: "Nguyễn Thu Hằng",
    phone: "0967 442 309",
    email: "hangnt@gmail.com",
    dob: "04/02/1998",
    gender: "female",
    city: "Hà Nội",
    district: "Ba Đình",
    appliedPosition: "CTV chăm sóc khách hàng",
    hiringRequestId: "hr-2409",
    hiringRequestCode: "HR-2409",
    stage: "contact",
    source: "tiktok",
    recruiter: "Trần Thanh Mai",
    score: 84,
    appliedAt: "12/05/2026",
    lastTouchAt: "19/05/2026",
    experience: "3 năm CSKH ngân hàng",
    skills: ["CSKH", "Front desk", "Tiếng Anh"],
    expectedPay: "₫60.000 / giờ",
    notesShort: "Đang chạy ca thử 19/05 - 21/05.",
    documents: docs({
      cccd: { state: "verified" },
      selfie: { state: "verified" },
      bank: { state: "verified" },
      health: { state: "submitted" },
    }),
    interactions: [
      {
        id: "i-1",
        at: "12/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Ứng viên nộp đơn qua TikTok bio link",
      },
      {
        id: "i-2",
        at: "14/05/2026",
        channel: "interview",
        actor: "Trần Thanh Mai",
        summary: "Phỏng vấn trực tiếp - Đạt",
      },
      {
        id: "i-3",
        at: "19/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Bắt đầu ca thử 19/05 09:00",
      },
    ],
    interviews: [
      {
        id: "iv-1",
        at: "14/05/2026 10:00",
        mode: "Trực tiếp",
        interviewer: "Trần Thanh Mai",
        outcome: "Đạt",
        note: "Giao tiếp chuyên nghiệp, biết tiếng Anh ổn.",
      },
      {
        id: "iv-2",
        at: "19/05/2026 09:00",
        mode: "Ca thử",
        interviewer: "Trần Thanh Mai",
        outcome: "Chờ kết quả",
      },
    ],
    notes: [
      {
        id: "n-1",
        at: "14/05/2026",
        actor: "Trần Thanh Mai",
        body: "Phù hợp clinic front desk, đẩy ca thử 3 ngày.",
      },
    ],
  },
  {
    id: "cand-005",
    code: "C-2405",
    fullName: "Lê Hoàng Phúc",
    phone: "0908 776 221",
    dob: "29/06/1997",
    gender: "male",
    city: "TP.HCM",
    district: "Bình Thạnh",
    appliedPosition: "CTV bán hàng cuối tuần",
    hiringRequestId: "hr-2401",
    hiringRequestCode: "HR-2401",
    stage: "onboarding",
    source: "referral",
    recruiter: "Lê Thuỳ Trang",
    score: 91,
    appliedAt: "10/05/2026",
    lastTouchAt: "19/05/2026",
    experience: "120 ca retail Vincom",
    skills: ["Retail", "Activation"],
    expectedPay: "₫55.000 / giờ",
    notesShort: "Đã ký hợp đồng số HD-2598, chờ kích hoạt CTV.",
    documents: docs({
      cccd: { state: "verified" },
      selfie: { state: "verified" },
      bank: { state: "verified" },
      health: { state: "verified" },
      contract: { state: "submitted" },
    }),
    interactions: [
      {
        id: "i-1",
        at: "10/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Ứng viên nộp đơn qua giới thiệu",
      },
      {
        id: "i-2",
        at: "13/05/2026",
        channel: "interview",
        actor: "Lê Thuỳ Trang",
        summary: "Phỏng vấn online - Đạt",
      },
      {
        id: "i-3",
        at: "18/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Hoàn tất ký hợp đồng HD-2598",
      },
    ],
    interviews: [
      {
        id: "iv-1",
        at: "13/05/2026 19:00",
        mode: "Online",
        interviewer: "Lê Thuỳ Trang",
        outcome: "Đạt",
      },
    ],
    notes: [],
  },
  {
    id: "cand-006",
    code: "C-2406",
    fullName: "Phạm Thu Dung",
    phone: "0934 112 008",
    email: "dungpt@gmail.com",
    dob: "15/03/1996",
    gender: "female",
    city: "Cần Thơ",
    district: "Ninh Kiều",
    appliedPosition: "CTV bán hàng cuối tuần",
    hiringRequestId: "hr-2401",
    hiringRequestCode: "HR-2401",
    workerId: "pham-thu-dung",
    stage: "hired",
    source: "direct",
    recruiter: "Lê Thuỳ Trang",
    score: 96,
    appliedAt: "02/05/2026",
    lastTouchAt: "15/05/2026",
    experience: "91 ca retail",
    skills: ["Retail", "Activation", "Cuối tuần"],
    expectedPay: "₫55.000 / giờ",
    notesShort: "Đã trở thành CTV chính thức, theo dõi qua hồ sơ worker.",
    documents: docs({
      cccd: { state: "verified" },
      selfie: { state: "verified" },
      bank: { state: "verified" },
      health: { state: "verified" },
      contract: { state: "verified" },
    }),
    interactions: [
      {
        id: "i-1",
        at: "02/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Nhận đơn trực tiếp",
      },
      {
        id: "i-2",
        at: "15/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Chuyển trạng thái thành CTV (worker)",
      },
    ],
    interviews: [
      {
        id: "iv-1",
        at: "06/05/2026 18:00",
        mode: "Online",
        interviewer: "Lê Thuỳ Trang",
        outcome: "Đạt",
      },
    ],
    notes: [],
  },
  {
    id: "cand-007",
    code: "C-2407",
    fullName: "Vũ Nhật Tân",
    phone: "0976 008 312",
    dob: "08/12/2002",
    gender: "male",
    city: "Đồng Nai",
    district: "Biên Hoà",
    appliedPosition: "CTV kho ca đêm",
    hiringRequestId: "hr-2402",
    hiringRequestCode: "HR-2402",
    stage: "rejected",
    source: "facebook",
    recruiter: "Nguyễn Quốc Đạt",
    score: 42,
    appliedAt: "13/05/2026",
    lastTouchAt: "16/05/2026",
    experience: "Chưa có kinh nghiệm kho",
    skills: ["Cơ bản"],
    notesShort: "Không đủ điều kiện sức khoẻ ca đêm.",
    documents: docs({
      cccd: { state: "verified" },
      health: { state: "rejected", note: "Khám sức khoẻ không đạt." },
    }),
    interactions: [
      {
        id: "i-1",
        at: "13/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Nộp đơn qua Facebook",
      },
      {
        id: "i-2",
        at: "16/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Từ chối do giấy khám sức khoẻ không đạt",
      },
    ],
    interviews: [],
    notes: [
      {
        id: "n-1",
        at: "16/05/2026",
        actor: "Nguyễn Quốc Đạt",
        body: "Khuyên ứng viên cải thiện sức khoẻ và quay lại sau 3 tháng.",
      },
    ],
  },
  {
    id: "cand-008",
    code: "C-2408",
    fullName: "Bùi Khánh Linh",
    phone: "0945 309 660",
    dob: "21/07/2003",
    gender: "female",
    city: "TP.HCM",
    district: "Tân Phú",
    appliedPosition: "CTV bán hàng cuối tuần",
    hiringRequestId: "hr-2401",
    hiringRequestCode: "HR-2401",
    stage: "ghosted",
    source: "facebook",
    recruiter: "Lê Thuỳ Trang",
    score: 60,
    appliedAt: "11/05/2026",
    lastTouchAt: "17/05/2026",
    experience: "Sinh viên năm cuối, làm parttime",
    skills: ["Retail", "Giao tiếp ổn"],
    notesShort: "Không phản hồi sau 3 lần liên hệ.",
    documents: docs({ cccd: { state: "submitted" } }),
    interactions: [
      {
        id: "i-1",
        at: "11/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Ứng viên nộp đơn",
      },
      {
        id: "i-2",
        at: "12/05/2026",
        channel: "call",
        actor: "Lê Thuỳ Trang",
        summary: "Gọi lần 1 - không nghe máy",
      },
      {
        id: "i-3",
        at: "14/05/2026",
        channel: "zalo",
        actor: "Lê Thuỳ Trang",
        summary: "Nhắn tin Zalo - chưa xem",
      },
      {
        id: "i-4",
        at: "17/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Tự động chuyển sang Mất liên lạc",
      },
    ],
    interviews: [],
    notes: [],
  },
  {
    id: "cand-009",
    code: "C-2409",
    fullName: "Hoàng Minh Tuấn",
    phone: "0903 552 718",
    dob: "30/10/1995",
    gender: "male",
    city: "TP.HCM",
    district: "Quận 10",
    appliedPosition: "CTV bán hàng cuối tuần",
    hiringRequestId: "hr-2401",
    hiringRequestCode: "HR-2401",
    stage: "blacklist",
    source: "direct",
    recruiter: "Lê Thuỳ Trang",
    score: 30,
    appliedAt: "09/05/2026",
    lastTouchAt: "10/05/2026",
    experience: "Đã từng vi phạm nội quy ca trước",
    skills: [],
    notesShort: "Trùng số điện thoại với CTV đã bị blacklist.",
    documents: docs({}),
    interactions: [
      {
        id: "i-1",
        at: "09/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Nộp đơn trực tiếp",
      },
      {
        id: "i-2",
        at: "10/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Đánh dấu Blacklist do trùng SĐT vi phạm",
      },
    ],
    interviews: [],
    notes: [
      {
        id: "n-1",
        at: "10/05/2026",
        actor: "Hệ thống",
        body: "Phát hiện SĐT trùng với worker đã blacklist HRP-118.",
      },
    ],
  },
  {
    id: "cand-010",
    code: "C-2410",
    fullName: "Lý Thị Mai",
    phone: "0982 014 555",
    dob: "19/05/2000",
    gender: "female",
    city: "Bình Dương",
    district: "Dĩ An",
    appliedPosition: "CTV đóng gói cuối tháng",
    hiringRequestId: "hr-2418",
    hiringRequestCode: "HR-2418",
    stage: "contact",
    source: "tiktok",
    recruiter: "Lê Quang Thịnh",
    score: 76,
    appliedAt: "16/05/2026",
    lastTouchAt: "19/05/2026",
    experience: "40 ca đóng gói FMCG",
    skills: ["Kho vận", "Đóng gói"],
    expectedPay: "₫55.000 / giờ",
    notesShort: "Đang chờ xác thực ngân hàng.",
    documents: docs({
      cccd: { state: "verified" },
      selfie: { state: "verified" },
      bank: { state: "submitted" },
    }),
    interactions: [
      {
        id: "i-1",
        at: "16/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Nộp đơn qua TikTok",
      },
      {
        id: "i-2",
        at: "18/05/2026",
        channel: "call",
        actor: "Lê Quang Thịnh",
        summary: "Sàng lọc - Đạt",
      },
    ],
    interviews: [],
    notes: [],
  },
  {
    id: "cand-011",
    code: "C-2411",
    fullName: "Đinh Văn Toàn",
    phone: "0918 442 003",
    dob: "11/01/1993",
    gender: "male",
    city: "Bình Dương",
    district: "Thuận An",
    appliedPosition: "CTV kho ca đêm",
    hiringRequestId: "hr-2402",
    hiringRequestCode: "HR-2402",
    stage: "contact",
    source: "direct",
    recruiter: "Nguyễn Quốc Đạt",
    score: 81,
    appliedAt: "14/05/2026",
    lastTouchAt: "19/05/2026",
    experience: "30 ca kho ban đêm",
    skills: ["Kho vận", "Ca đêm"],
    expectedPay: "₫70.000 / giờ",
    notesShort: "Đang chờ kết quả phỏng vấn nhanh.",
    documents: docs({
      cccd: { state: "verified" },
      selfie: { state: "verified" },
      bank: { state: "verified" },
      health: { state: "submitted" },
    }),
    interactions: [
      {
        id: "i-1",
        at: "14/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Ứng tuyển trực tiếp tại văn phòng",
      },
      {
        id: "i-2",
        at: "19/05/2026",
        channel: "interview",
        actor: "Lê Quang Thịnh",
        summary: "Phỏng vấn nhanh tại site",
      },
    ],
    interviews: [
      {
        id: "iv-1",
        at: "19/05/2026 20:00",
        mode: "Trực tiếp",
        interviewer: "Lê Quang Thịnh",
        outcome: "Chờ kết quả",
      },
    ],
    notes: [],
  },
  {
    id: "cand-012",
    code: "C-2412",
    fullName: "Trịnh Hải Nam",
    phone: "0964 087 211",
    dob: "02/08/2001",
    gender: "male",
    city: "TP.HCM",
    district: "Gò Vấp",
    appliedPosition: "CTV bán hàng cuối tuần",
    hiringRequestId: "hr-2401",
    hiringRequestCode: "HR-2401",
    stage: "new",
    source: "zalo",
    recruiter: "Lê Thuỳ Trang",
    score: 68,
    appliedAt: "19/05/2026",
    lastTouchAt: "19/05/2026",
    experience: "Mới ra trường, 6 tháng activation",
    skills: ["Retail", "Activation"],
    expectedPay: "₫55.000 / giờ",
    notesShort: "Vừa nộp đơn sáng nay qua Zalo OA.",
    documents: docs({}),
    interactions: [
      {
        id: "i-1",
        at: "19/05/2026 08:51",
        channel: "system",
        actor: "Hệ thống",
        summary: "Ứng viên nộp đơn qua Zalo",
      },
    ],
    interviews: [],
    notes: [],
  },
  {
    id: "cand-013",
    code: "C-2413",
    fullName: "Nguyễn Văn Hậu",
    phone: "0905 117 332",
    email: "haunv@gmail.com",
    dob: "03/06/2000",
    gender: "male",
    city: "TP.HCM",
    district: "Thủ Đức",
    appliedPosition: "CTV bán hàng cuối tuần",
    hiringRequestId: "hr-2401",
    hiringRequestCode: "HR-2401",
    stage: "contact",
    source: "tiktok",
    recruiter: "Lê Thuỳ Trang",
    score: 74,
    appliedAt: "20/05/2026",
    lastTouchAt: "21/05/2026",
    experience: "1 năm bán hàng siêu thị",
    skills: ["Retail", "Giao tiếp tốt"],
    expectedPay: "₫55.000 / giờ",
    notesShort: "Đã qua sàng lọc, chờ xếp ca cuối tuần.",
    documents: docs({ cccd: { state: "submitted" } }),
    interactions: [
      {
        id: "i-1",
        at: "20/05/2026 10:22",
        channel: "system",
        actor: "Hệ thống",
        summary: "Ứng viên nộp đơn qua TikTok",
      },
    ],
    interviews: [],
    notes: [],
  },
  {
    id: "cand-014",
    code: "C-2414",
    fullName: "Trần Thị Kim Anh",
    phone: "0938 551 904",
    dob: "27/12/2002",
    gender: "female",
    city: "TP.HCM",
    district: "Quận 2",
    appliedPosition: "CTV chăm sóc khách hàng",
    hiringRequestId: "hr-2409",
    hiringRequestCode: "HR-2409",
    stage: "new",
    source: "facebook",
    recruiter: "Trần Thanh Mai",
    score: 66,
    appliedAt: "21/05/2026",
    lastTouchAt: "21/05/2026",
    experience: "6 tháng CSKH tổng đài",
    skills: ["CSKH", "Tin học văn phòng"],
    expectedPay: "₫58.000 / giờ",
    notesShort: "Vừa nộp đơn, chưa liên hệ.",
    documents: docs({}),
    interactions: [
      {
        id: "i-1",
        at: "21/05/2026 09:03",
        channel: "system",
        actor: "Hệ thống",
        summary: "Ứng viên nộp đơn qua Facebook Lead Ads",
      },
    ],
    interviews: [],
    notes: [],
  },
  {
    id: "cand-015",
    code: "C-2415",
    fullName: "Phan Đức Long",
    phone: "0917 008 254",
    email: "longpd@gmail.com",
    dob: "14/08/1998",
    gender: "male",
    city: "Bình Dương",
    district: "Dĩ An",
    appliedPosition: "CTV kho ca đêm",
    hiringRequestId: "hr-2402",
    hiringRequestCode: "HR-2402",
    stage: "contact",
    source: "zalo",
    recruiter: "Nguyễn Quốc Đạt",
    score: 85,
    appliedAt: "18/05/2026",
    lastTouchAt: "21/05/2026",
    experience: "2 năm kho vận, có chứng chỉ xe nâng",
    skills: ["Kho vận", "Xe nâng", "Ca đêm"],
    expectedPay: "₫70.000 / giờ",
    notesShort: "Đã chốt lịch phỏng vấn trực tiếp 22/05.",
    documents: docs({
      cccd: { state: "verified" },
      selfie: { state: "verified" },
      bank: { state: "submitted" },
    }),
    interactions: [
      {
        id: "i-1",
        at: "18/05/2026 16:40",
        channel: "system",
        actor: "Hệ thống",
        summary: "Ứng viên nộp đơn qua Zalo OA",
      },
      {
        id: "i-2",
        at: "21/05/2026 11:15",
        channel: "interview",
        actor: "Nguyễn Quốc Đạt",
        summary: "Đã hẹn phỏng vấn trực tiếp 22/05 19:00",
      },
    ],
    interviews: [
      {
        id: "iv-1",
        at: "22/05/2026 19:00",
        mode: "Trực tiếp",
        interviewer: "Nguyễn Quốc Đạt",
        outcome: "Đã hẹn",
      },
    ],
    notes: [],
  },
  {
    id: "cand-016",
    code: "C-2416",
    fullName: "Võ Thị Ngọc",
    phone: "0903 442 781",
    dob: "09/03/2001",
    gender: "female",
    city: "TP.HCM",
    district: "Quận 12",
    appliedPosition: "CTV bán hàng cuối tuần",
    hiringRequestId: "hr-2401",
    hiringRequestCode: "HR-2401",
    stage: "onboarding",
    source: "referral",
    recruiter: "Lê Thuỳ Trang",
    score: 89,
    appliedAt: "16/05/2026",
    lastTouchAt: "21/05/2026",
    experience: "80 ca activation FMCG",
    skills: ["Retail", "Activation", "Cuối tuần"],
    expectedPay: "₫55.000 / giờ",
    notesShort: "Đã chốt ca, chờ đi làm Day-1 tại Kho Q12.",
    documents: docs({
      cccd: { state: "verified" },
      selfie: { state: "verified" },
      bank: { state: "verified" },
      health: { state: "verified" },
    }),
    interactions: [
      {
        id: "i-1",
        at: "16/05/2026 14:00",
        channel: "system",
        actor: "Hệ thống",
        summary: "Nhận đơn qua giới thiệu (CTV Lê Hoàng Phúc)",
      },
      {
        id: "i-2",
        at: "20/05/2026 10:30",
        channel: "system",
        actor: "Hệ thống",
        summary: "Chốt ca làm Day-1 26/05 tại Kho Q12",
      },
    ],
    interviews: [],
    notes: [],
  },
  {
    id: "cand-017",
    code: "C-2417",
    fullName: "Đặng Minh Khoa",
    phone: "0976 220 415",
    email: "khoadm@gmail.com",
    dob: "21/11/1996",
    gender: "male",
    city: "TP.HCM",
    district: "Bình Tân",
    appliedPosition: "CTV đóng gói cuối tháng",
    hiringRequestId: "hr-2418",
    hiringRequestCode: "HR-2418",
    workerId: "dang-minh-khoa",
    stage: "hired",
    source: "direct",
    recruiter: "Lê Quang Thịnh",
    score: 93,
    appliedAt: "08/05/2026",
    lastTouchAt: "20/05/2026",
    experience: "150 ca kho và đóng gói",
    skills: ["Kho vận", "Đóng gói", "Bốc xếp"],
    expectedPay: "₫60.000 / giờ",
    notesShort: "Đã đi làm Day-1 tại Kho Tân Tạo, theo dõi qua hồ sơ worker.",
    documents: docs({
      cccd: { state: "verified" },
      selfie: { state: "verified" },
      bank: { state: "verified" },
      health: { state: "verified" },
      contract: { state: "verified" },
    }),
    interactions: [
      {
        id: "i-1",
        at: "08/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Ứng tuyển trực tiếp tại văn phòng",
      },
      {
        id: "i-2",
        at: "18/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Đã đi làm Day-1 tại Kho Tân Tạo",
      },
    ],
    interviews: [
      {
        id: "iv-1",
        at: "12/05/2026 09:00",
        mode: "Trực tiếp",
        interviewer: "Lê Quang Thịnh",
        outcome: "Đạt",
      },
    ],
    notes: [],
  },
  {
    id: "cand-018",
    code: "C-2418",
    fullName: "Bùi Thị Hồng",
    phone: "0945 770 118",
    dob: "30/07/2003",
    gender: "female",
    city: "Bình Dương",
    district: "Thuận An",
    appliedPosition: "CTV đóng gói cuối tháng",
    hiringRequestId: "hr-2418",
    hiringRequestCode: "HR-2418",
    stage: "contact",
    source: "tiktok",
    recruiter: "Lê Quang Thịnh",
    score: 71,
    appliedAt: "17/05/2026",
    lastTouchAt: "21/05/2026",
    experience: "Sinh viên, 20 ca đóng gói",
    skills: ["Đóng gói", "Chăm chỉ"],
    expectedPay: "₫55.000 / giờ",
    notesShort: "Đã chốt ca nhưng vắng Day-1 tại Kho VSIP, đang xác minh.",
    documents: docs({
      cccd: { state: "verified" },
      selfie: { state: "submitted" },
    }),
    interactions: [
      {
        id: "i-1",
        at: "17/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Nộp đơn qua TikTok",
      },
      {
        id: "i-2",
        at: "21/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Không có mặt Day-1 tại Kho VSIP",
      },
    ],
    interviews: [],
    notes: [],
  },
  {
    id: "cand-019",
    code: "C-2419",
    fullName: "Hoàng Văn Nam",
    phone: "0908 331 207",
    dob: "05/02/1999",
    gender: "male",
    city: "Đồng Nai",
    district: "Biên Hoà",
    appliedPosition: "CTV kho ca đêm",
    hiringRequestId: "hr-2402",
    hiringRequestCode: "HR-2402",
    stage: "rejected",
    source: "facebook",
    recruiter: "Nguyễn Quốc Đạt",
    score: 38,
    appliedAt: "14/05/2026",
    lastTouchAt: "17/05/2026",
    experience: "Chưa có kinh nghiệm phù hợp",
    skills: ["Cơ bản"],
    notesShort: "Đã có việc / không còn nhu cầu.",
    documents: docs({ cccd: { state: "submitted" } }),
    interactions: [
      {
        id: "i-1",
        at: "14/05/2026",
        channel: "system",
        actor: "Hệ thống",
        summary: "Nộp đơn qua Facebook",
      },
      {
        id: "i-2",
        at: "17/05/2026",
        channel: "call",
        actor: "Nguyễn Quốc Đạt",
        summary: "Gọi xác nhận - ứng viên đã có việc khác",
      },
    ],
    interviews: [],
    notes: [],
  },
  {
    id: "cand-020",
    code: "C-2420",
    fullName: "Lý Thị Thu",
    phone: "0964 552 803",
    dob: "12/10/2001",
    gender: "female",
    city: "TP.HCM",
    district: "Gò Vấp",
    appliedPosition: "CTV bán hàng cuối tuần",
    hiringRequestId: "hr-2401",
    hiringRequestCode: "HR-2401",
    stage: "new",
    source: "zalo",
    recruiter: "Lê Thuỳ Trang",
    score: 70,
    appliedAt: "22/05/2026",
    lastTouchAt: "22/05/2026",
    experience: "8 tháng bán hàng thời trang",
    skills: ["Retail", "Tư vấn"],
    expectedPay: "₫55.000 / giờ",
    notesShort: "Lead mới qua Zalo OA, chưa có người phụ trách.",
    documents: docs({}),
    interactions: [
      {
        id: "i-1",
        at: "22/05/2026 08:30",
        channel: "system",
        actor: "Hệ thống",
        summary: "Ứng viên nộp đơn qua Zalo OA",
      },
    ],
    interviews: [],
    notes: [],
  },
];

/**
 * Stable, collision-free avatar per candidate. Built once over the full
 * CANDIDATES list (unfiltered) so each id keeps its avatar across tabs/filters
 * and no two candidates share a photo until a gender pool is exhausted.
 */
const CANDIDATE_AVATARS = assignAvatars(CANDIDATES, (c) => ({
  id: c.id,
  name: c.fullName,
  gender: c.gender,
}));

export function getCandidateAvatar(id: string): string | undefined {
  return CANDIDATE_AVATARS.get(id);
}

export function getCandidateById(id: string): CandidateRecord | undefined {
  return CANDIDATES.find((c) => c.id === id);
}

export function fmtSource(source: CandidateSource): string {
  return SOURCE_LABELS[source];
}
