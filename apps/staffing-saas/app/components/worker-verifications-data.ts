export type VerificationStatus = "verified" | "in-review" | "missing-docs" | "rejected";

export interface VerificationDocument {
  id: string;
  name: string;
  uploadedAt: string;
  status: "Đạt" | "Chờ duyệt" | "Cần bổ sung";
  reviewer?: string;
}

export interface VerificationTimelineEntry {
  id: string;
  at: string;
  action: string;
  actor: string;
  note?: string;
}

export interface VerificationRecord {
  id: string;
  workerName: string;
  workerId: string;
  city: string;
  district: string;
  phone: string;
  phoneStatus: "Đã xác minh" | "Chưa xác minh";
  nationalId: string;
  taxId: string;
  bankAccount: string;
  bankName: string;
  status: VerificationStatus;
  submittedAt: string;
  lastUpdated: string;
  reviewer: string;
  documents: VerificationDocument[];
  missingDocs: string[];
  riskFlags: string[];
  timeline: VerificationTimelineEntry[];
}

export const VERIFICATION_STATUS_LABELS: Record<
  VerificationStatus,
  { label: string; color: "success" | "warning" | "error" | "gray" }
> = {
  verified: { label: "Đã xác thực", color: "success" },
  "in-review": { label: "Đang rà soát", color: "warning" },
  "missing-docs": { label: "Chờ bổ sung", color: "warning" },
  rejected: { label: "Từ chối", color: "error" },
};

export const VERIFICATIONS: VerificationRecord[] = [
  {
    id: "nguyen-van-an",
    workerName: "Nguyễn Văn An",
    workerId: "WK-1001",
    city: "TP.HCM",
    district: "Quận 1",
    phone: "0901 234 567",
    phoneStatus: "Đã xác minh",
    nationalId: "079205009871",
    taxId: "8563201147",
    bankAccount: "0701 0009 12345",
    bankName: "Vietcombank",
    status: "verified",
    submittedAt: "07/2025",
    lastUpdated: "12/05/2026",
    reviewer: "Trần Mai Linh",
    documents: [
      { id: "doc-1", name: "CCCD mặt trước", uploadedAt: "07/2025", status: "Đạt", reviewer: "Trần Mai Linh" },
      { id: "doc-2", name: "CCCD mặt sau", uploadedAt: "07/2025", status: "Đạt", reviewer: "Trần Mai Linh" },
      { id: "doc-3", name: "Ảnh chân dung", uploadedAt: "07/2025", status: "Đạt", reviewer: "Trần Mai Linh" },
      { id: "doc-4", name: "Mã số thuế cá nhân", uploadedAt: "08/2025", status: "Đạt", reviewer: "Trần Mai Linh" },
    ],
    missingDocs: [],
    riskFlags: [],
    timeline: [
      { id: "t-1", at: "07/2025", action: "Worker nộp hồ sơ", actor: "Worker" },
      { id: "t-2", at: "08/2025", action: "Xác thực thành công", actor: "Trần Mai Linh" },
    ],
  },
  {
    id: "tran-thi-bich",
    workerName: "Trần Thị Bích",
    workerId: "WK-1002",
    city: "Hà Nội",
    district: "Cầu Giấy",
    phone: "0902 345 678",
    phoneStatus: "Đã xác minh",
    nationalId: "001305118745",
    taxId: "1093347812",
    bankAccount: "1903 0009 87521",
    bankName: "Techcombank",
    status: "verified",
    submittedAt: "09/2025",
    lastUpdated: "10/05/2026",
    reviewer: "Phạm Quốc Bảo",
    documents: [
      { id: "doc-1", name: "CCCD mặt trước", uploadedAt: "09/2025", status: "Đạt", reviewer: "Phạm Quốc Bảo" },
      { id: "doc-2", name: "CCCD mặt sau", uploadedAt: "09/2025", status: "Đạt", reviewer: "Phạm Quốc Bảo" },
      { id: "doc-3", name: "Ảnh chân dung", uploadedAt: "09/2025", status: "Đạt", reviewer: "Phạm Quốc Bảo" },
    ],
    missingDocs: [],
    riskFlags: [],
    timeline: [
      { id: "t-1", at: "09/2025", action: "Worker nộp hồ sơ", actor: "Worker" },
      { id: "t-2", at: "09/2025", action: "Duyệt xác thực", actor: "Phạm Quốc Bảo" },
    ],
  },
  {
    id: "le-hoang-cuong",
    workerName: "Lê Hoàng Cường",
    workerId: "WK-1003",
    city: "Đà Nẵng",
    district: "Hải Châu",
    phone: "0903 456 789",
    phoneStatus: "Đã xác minh",
    nationalId: "201304992118",
    taxId: "Chưa nộp",
    bankAccount: "0501 0007 33180",
    bankName: "BIDV",
    status: "missing-docs",
    submittedAt: "01/2026",
    lastUpdated: "18/05/2026",
    reviewer: "Trần Mai Linh",
    documents: [
      { id: "doc-1", name: "CCCD mặt trước", uploadedAt: "01/2026", status: "Đạt", reviewer: "Trần Mai Linh" },
      { id: "doc-2", name: "CCCD mặt sau", uploadedAt: "01/2026", status: "Đạt", reviewer: "Trần Mai Linh" },
      { id: "doc-3", name: "Ảnh chân dung", uploadedAt: "02/2026", status: "Đạt", reviewer: "Trần Mai Linh" },
      { id: "doc-4", name: "Mã số thuế cá nhân", uploadedAt: "—", status: "Cần bổ sung" },
    ],
    missingDocs: ["Mã số thuế cá nhân", "Giấy khám sức khoẻ ca đêm"],
    riskFlags: ["Chưa hoàn tất hồ sơ thuế"],
    timeline: [
      { id: "t-1", at: "01/2026", action: "Worker nộp hồ sơ", actor: "Worker" },
      { id: "t-2", at: "02/2026", action: "Yêu cầu bổ sung MST", actor: "Trần Mai Linh", note: "Worker chưa có MST cá nhân." },
    ],
  },
  {
    id: "pham-thu-dung",
    workerName: "Phạm Thu Dung",
    workerId: "WK-1004",
    city: "Cần Thơ",
    district: "Ninh Kiều",
    phone: "0904 567 890",
    phoneStatus: "Đã xác minh",
    nationalId: "366205772931",
    taxId: "4721984430",
    bankAccount: "1004 0091 22148",
    bankName: "MB Bank",
    status: "verified",
    submittedAt: "05/2025",
    lastUpdated: "01/05/2026",
    reviewer: "Phạm Quốc Bảo",
    documents: [
      { id: "doc-1", name: "CCCD mặt trước", uploadedAt: "05/2025", status: "Đạt", reviewer: "Phạm Quốc Bảo" },
      { id: "doc-2", name: "CCCD mặt sau", uploadedAt: "05/2025", status: "Đạt", reviewer: "Phạm Quốc Bảo" },
      { id: "doc-3", name: "Ảnh chân dung", uploadedAt: "05/2025", status: "Đạt", reviewer: "Phạm Quốc Bảo" },
      { id: "doc-4", name: "Mã số thuế cá nhân", uploadedAt: "06/2025", status: "Đạt", reviewer: "Phạm Quốc Bảo" },
    ],
    missingDocs: [],
    riskFlags: [],
    timeline: [
      { id: "t-1", at: "05/2025", action: "Worker nộp hồ sơ", actor: "Worker" },
      { id: "t-2", at: "06/2025", action: "Duyệt xác thực", actor: "Phạm Quốc Bảo" },
    ],
  },
  {
    id: "vu-minh-duc",
    workerName: "Vũ Minh Đức",
    workerId: "WK-1005",
    city: "TP.HCM",
    district: "Thủ Đức",
    phone: "0905 678 901",
    phoneStatus: "Đã xác minh",
    nationalId: "079105114662",
    taxId: "5412287731",
    bankAccount: "0701 0001 88212",
    bankName: "Vietcombank",
    status: "in-review",
    submittedAt: "12/2025",
    lastUpdated: "19/05/2026",
    reviewer: "Trần Mai Linh",
    documents: [
      { id: "doc-1", name: "CCCD mặt trước", uploadedAt: "12/2025", status: "Đạt", reviewer: "Trần Mai Linh" },
      { id: "doc-2", name: "CCCD mặt sau", uploadedAt: "12/2025", status: "Đạt", reviewer: "Trần Mai Linh" },
      { id: "doc-3", name: "Ảnh chân dung", uploadedAt: "12/2025", status: "Chờ duyệt" },
      { id: "doc-4", name: "Mã số thuế cá nhân", uploadedAt: "01/2026", status: "Chờ duyệt" },
    ],
    missingDocs: [],
    riskFlags: ["Có vi phạm vắng mặt liên tiếp", "Đang rà soát lại danh tính"],
    timeline: [
      { id: "t-1", at: "12/2025", action: "Worker nộp hồ sơ", actor: "Worker" },
      { id: "t-2", at: "05/2026", action: "Mở rà soát do vi phạm", actor: "Trần Mai Linh", note: "Phối hợp với team vận hành." },
    ],
  },
];

export function getVerificationById(id: string): VerificationRecord | undefined {
  return VERIFICATIONS.find((record) => record.id === id);
}
