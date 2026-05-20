/**
 * Seed data for the "Thưởng Adhoc" (bonuses) demo.
 *
 * Sanitized — synthetic IDs, fake worker names from the shared avatar pool,
 * placeholder job codes (no real warehouse / partner identifiers), rounded
 * money amounts. Do not seed from production exports.
 */

export type BonusStatus = "running" | "ended" | "cancelled" | "draft";

export type BonusPayoutKind = "fixed" | "per_shift" | "per_hour" | "tiered";

export interface BonusJobScope {
  code: string;
  label: string;
}

export interface BonusConditions {
  minShifts: number;
  minHoursPerShift: number;
  notes?: string;
}

export interface BonusPayout {
  kind: BonusPayoutKind;
  amount: number;
  cadence: string;
  note?: string;
}

export interface BonusChangelogEntry {
  at: string;
  by: string;
  note: string;
}

export interface BonusAppliedWorker {
  id: string;
  name: string;
  confirmedAmount: number;
  paidAmount: number;
}

export interface BonusRecord {
  id: string;
  title: string;
  description: string;
  periodFrom: string;
  periodTo: string;
  status: BonusStatus;
  manager: string;
  requested: number;
  approved: number;
  qualified: number;
  appliedCount: number;
  appliedAmount: number;
  budgetMax: number;
  paidAmount: number;
  jobScope: BonusJobScope[];
  conditions: BonusConditions;
  payout: BonusPayout;
  workers: BonusAppliedWorker[];
  changelog: BonusChangelogEntry[];
}

export const BONUS_STATUS_LABELS: Record<
  BonusStatus,
  { label: string; color: "success" | "gray" | "error" | "warning" }
> = {
  running: { label: "Đang chạy", color: "success" },
  ended: { label: "Đã kết thúc", color: "gray" },
  cancelled: { label: "Đã hủy", color: "error" },
  draft: { label: "Nháp", color: "warning" },
};

export const BONUS_PAYOUT_KIND_LABELS: Record<BonusPayoutKind, string> = {
  fixed: "Khoán cố định",
  per_shift: "Theo từng ca",
  per_hour: "Theo giờ công",
  tiered: "Phân bậc",
};

const VND = new Intl.NumberFormat("vi-VN");

export function formatVnd(amount: number): string {
  return `${VND.format(amount)} ₫`;
}

export const BONUSES: BonusRecord[] = [
  {
    id: "BNS-1042",
    title: "Thưởng tuần đủ ca — Khu vực A",
    description:
      "CTV làm đủ 5 ca/tuần tại các điểm khu vực A được thưởng cộng dồn vào batch payout cuối tuần.",
    periodFrom: "01/05/2026",
    periodTo: "31/05/2026",
    status: "running",
    manager: "Quản lý vận hành A",
    requested: 12,
    approved: 38,
    qualified: 5,
    appliedCount: 5,
    appliedAmount: 1_110_000,
    budgetMax: 1_485_000,
    paidAmount: 0,
    jobScope: [
      { code: "JOB-1001", label: "Kho A · Q12 · ca 8h–17h" },
      { code: "JOB-1002", label: "Kho A · Q12 · ca 14h–22h" },
    ],
    conditions: {
      minShifts: 5,
      minHoursPerShift: 6,
      notes: "Ca cố định 5 ngày/tuần, không tính ca pending.",
    },
    payout: {
      kind: "fixed",
      amount: 15_000,
      cadence: "Theo kỳ thù lao của công việc",
      note: "Cộng dồn vào batch thanh toán cuối tuần.",
    },
    workers: [
      { id: "W-22001", name: "Phạm Thị Bích", confirmedAmount: 195_000, paidAmount: 0 },
      { id: "W-22002", name: "Lê Hoàng Long", confirmedAmount: 195_000, paidAmount: 0 },
      { id: "W-22003", name: "Trần Quang Huy", confirmedAmount: 75_000, paidAmount: 0 },
      { id: "W-22004", name: "Nguyễn Thuỳ Mai", confirmedAmount: 255_000, paidAmount: 0 },
      { id: "W-22005", name: "Đỗ Minh Khoa", confirmedAmount: 390_000, paidAmount: 0 },
    ],
    changelog: [
      { at: "01/05/2026", by: "Tự động", note: "Khởi tạo chương trình theo template tháng 5." },
      { at: "03/05/2026", by: "Quản lý vận hành A", note: "Mở rộng phạm vi sang JOB-1002." },
    ],
  },
  {
    id: "BNS-1041",
    title: "Bonus chuyên cần ≥ 7 ca/tuần",
    description:
      "Thưởng thêm 4.000 ₫/ca cho CTV làm từ 7 ca/tuần, mỗi ca ≥ 8 giờ.",
    periodFrom: "22/10/2025",
    periodTo: "30/11/2025",
    status: "ended",
    manager: "Quản lý vận hành B",
    requested: 80,
    approved: 64,
    qualified: 50,
    appliedCount: 50,
    appliedAmount: 1_568_000,
    budgetMax: 1_800_000,
    paidAmount: 1_568_000,
    jobScope: [{ code: "JOB-2003", label: "Kho B · ca dài 10h" }],
    conditions: { minShifts: 7, minHoursPerShift: 8 },
    payout: { kind: "per_shift", amount: 4_000, cadence: "Theo từng ca đạt điều kiện" },
    workers: [
      { id: "W-22011", name: "Phan Thị Hồng", confirmedAmount: 32_000, paidAmount: 32_000 },
      { id: "W-22012", name: "Lê Văn Đạt", confirmedAmount: 28_000, paidAmount: 28_000 },
      { id: "W-22013", name: "Nguyễn Quốc Việt", confirmedAmount: 36_000, paidAmount: 36_000 },
    ],
    changelog: [
      { at: "22/10/2025", by: "Tự động", note: "Khởi tạo chương trình." },
      { at: "30/11/2025", by: "Tự động", note: "Đóng chương trình theo thời gian áp dụng." },
    ],
  },
  {
    id: "BNS-1040",
    title: "Hệ số ca đêm 1.3x — Tháng 11",
    description:
      "Nâng pay rate cho CTV nhận ca kho ban đêm và ca sự kiện sau 22:00.",
    periodFrom: "01/11/2025",
    periodTo: "30/11/2025",
    status: "ended",
    manager: "Quản lý vận hành C",
    requested: 180,
    approved: 142,
    qualified: 120,
    appliedCount: 120,
    appliedAmount: 8_152_000,
    budgetMax: 9_000_000,
    paidAmount: 8_152_000,
    jobScope: [
      { code: "JOB-3004", label: "Ca đêm kho C · 22h–06h" },
      { code: "JOB-3005", label: "Sự kiện đêm · sau 22h" },
    ],
    conditions: { minShifts: 1, minHoursPerShift: 6, notes: "Áp dụng từng giờ thực tế 22:00–06:00." },
    payout: { kind: "per_hour", amount: 13_000, cadence: "Cộng dồn theo giờ thực tế" },
    workers: [
      { id: "W-22020", name: "Lê Hoàng Cường", confirmedAmount: 168_000, paidAmount: 168_000 },
      { id: "W-22021", name: "Nguyễn Văn Sơn", confirmedAmount: 156_000, paidAmount: 156_000 },
    ],
    changelog: [
      { at: "01/11/2025", by: "Tự động", note: "Khởi tạo chương trình." },
      { at: "30/11/2025", by: "Tự động", note: "Đóng chương trình theo thời gian áp dụng." },
    ],
  },
  {
    id: "BNS-1039",
    title: "Thưởng giới thiệu CTV mới",
    description:
      "Thưởng 300.000 ₫ cho CTV giới thiệu thành công người mới hoàn tất 5 ca đầu trong 30 ngày.",
    periodFrom: "01/04/2026",
    periodTo: "30/06/2026",
    status: "running",
    manager: "Quản lý tuyển dụng",
    requested: 6,
    approved: 6,
    qualified: 6,
    appliedCount: 6,
    appliedAmount: 1_800_000,
    budgetMax: 4_500_000,
    paidAmount: 900_000,
    jobScope: [{ code: "JOB-REF", label: "Toàn bộ CTV active đã xác thực" }],
    conditions: {
      minShifts: 5,
      minHoursPerShift: 4,
      notes: "Tính số ca hoàn thành của CTV mới trong 30 ngày kể từ ngày đăng ký.",
    },
    payout: {
      kind: "fixed",
      amount: 300_000,
      cadence: "Theo từng CTV mới đủ điều kiện",
    },
    workers: [
      { id: "W-22030", name: "Trần Thanh Trúc", confirmedAmount: 300_000, paidAmount: 300_000 },
      { id: "W-22031", name: "Nguyễn Minh An", confirmedAmount: 300_000, paidAmount: 300_000 },
      { id: "W-22032", name: "Vũ Thị Linh", confirmedAmount: 300_000, paidAmount: 300_000 },
      { id: "W-22033", name: "Phạm Văn Đức", confirmedAmount: 300_000, paidAmount: 0 },
      { id: "W-22034", name: "Bùi Thị Hương", confirmedAmount: 300_000, paidAmount: 0 },
      { id: "W-22035", name: "Hoàng Minh Tuấn", confirmedAmount: 300_000, paidAmount: 0 },
    ],
    changelog: [
      { at: "01/04/2026", by: "Tự động", note: "Khởi tạo chương trình quý 2." },
    ],
  },
  {
    id: "BNS-1038",
    title: "Thưởng onboarding 3 ca đầu",
    description:
      "CTV mới hoàn tất 3 ca đầu trong tuần đầu nhận 150.000 ₫.",
    periodFrom: "10/02/2026",
    periodTo: "30/04/2026",
    status: "cancelled",
    manager: "Quản lý onboarding",
    requested: 22,
    approved: 18,
    qualified: 0,
    appliedCount: 0,
    appliedAmount: 0,
    budgetMax: 2_700_000,
    paidAmount: 0,
    jobScope: [{ code: "JOB-ONB", label: "Onboarding CTV mới" }],
    conditions: { minShifts: 3, minHoursPerShift: 4 },
    payout: { kind: "fixed", amount: 150_000, cadence: "Theo từng CTV mới hoàn tất 3 ca" },
    workers: [],
    changelog: [
      { at: "10/02/2026", by: "Tự động", note: "Khởi tạo chương trình." },
      { at: "12/03/2026", by: "Quản lý onboarding", note: "Tạm dừng để điều chỉnh ngân sách Q2." },
      { at: "30/04/2026", by: "Quản lý onboarding", note: "Hủy chương trình, chuyển hướng sang BNS-1039." },
    ],
  },
  {
    id: "BNS-1037",
    title: "Bonus event flash sale 11.11",
    description:
      "Thưởng 20.000 ₫/ca cho CTV nhận đủ 5 ca trong khoảng 11–13/11.",
    periodFrom: "11/11/2025",
    periodTo: "13/11/2025",
    status: "ended",
    manager: "Quản lý sự kiện",
    requested: 24,
    approved: 22,
    qualified: 10,
    appliedCount: 10,
    appliedAmount: 1_000_000,
    budgetMax: 1_200_000,
    paidAmount: 1_000_000,
    jobScope: [{ code: "JOB-EVT-1111", label: "Sự kiện flash sale 11.11" }],
    conditions: { minShifts: 5, minHoursPerShift: 6 },
    payout: { kind: "per_shift", amount: 20_000, cadence: "Theo từng ca trong khung sự kiện" },
    workers: [
      { id: "W-22040", name: "Đỗ Thị Trang", confirmedAmount: 100_000, paidAmount: 100_000 },
    ],
    changelog: [
      { at: "11/11/2025", by: "Tự động", note: "Khởi tạo chương trình sự kiện." },
      { at: "13/11/2025", by: "Tự động", note: "Đóng chương trình theo thời gian áp dụng." },
    ],
  },
  {
    id: "BNS-1036",
    title: "Bonus chuyên cần cuối tuần",
    description:
      "Thưởng 200.000 ₫ cho CTV hoàn tất 4 ca cuối tuần liên tiếp.",
    periodFrom: "01/06/2026",
    periodTo: "31/07/2026",
    status: "draft",
    manager: "Quản lý vận hành A",
    requested: 0,
    approved: 0,
    qualified: 0,
    appliedCount: 0,
    appliedAmount: 0,
    budgetMax: 3_000_000,
    paidAmount: 0,
    jobScope: [{ code: "JOB-1010", label: "Ca cuối tuần khu vực A" }],
    conditions: { minShifts: 4, minHoursPerShift: 6 },
    payout: { kind: "fixed", amount: 200_000, cadence: "Theo kỳ thù lao của công việc" },
    workers: [],
    changelog: [
      { at: "12/05/2026", by: "Quản lý vận hành A", note: "Tạo bản nháp, chờ phê duyệt ngân sách." },
    ],
  },
];

export function getBonusById(id: string): BonusRecord | undefined {
  return BONUSES.find((bonus) => bonus.id === id);
}

export const MANAGERS = Array.from(
  new Set(BONUSES.map((bonus) => bonus.manager)),
).sort();

export const JOB_CODES = Array.from(
  new Set(BONUSES.flatMap((bonus) => bonus.jobScope.map((job) => job.code))),
).sort();
