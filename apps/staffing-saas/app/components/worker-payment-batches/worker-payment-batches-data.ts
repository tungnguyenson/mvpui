export type BatchStatus =
  | "new"
  | "locked"
  | "running"
  | "completed"
  | "cancelled";

export type PayoutMethod = "bank" | "ewallet" | "cash";
export type PayoutStatus =
  | "processing"
  | "transferred"
  | "rejected"
  | "invalid_account";

export type AdjustmentKind = "debt" | "offset" | "adhoc_other";

export interface BatchKPISummary {
  totalAmount: number;
  totalNetAmount: number;
  workerCount: number;
  companyCount: number;
  totalHours: number;
  invalidAccountCount: number;
}

export interface BatchTransactionType {
  id: string;
  label: string;
  amount: number;
  share: number;
}

export interface BatchCompanyBreakdown {
  customerId: string;
  customerName: string;
  amount: number;
}

export interface BatchLineItem {
  workerId: string;
  workerCode: string;
  workerName: string;
  workerPhoneMasked: string;
  payoutMethod: PayoutMethod;
  bankName?: string | undefined;
  bankAccountMasked?: string | undefined;
  bankVerified: boolean;
  totalHours: number;
  netAmount: number;
  payoutStatus: PayoutStatus;
}

export interface BatchAdjustment {
  id: string;
  workerId: string;
  workerCode: string;
  workerName: string;
  jobCode?: string | undefined;
  transactionDate: string;
  kind: AdjustmentKind;
  amount: number;
  description: string;
  picHandle: string;
  confirmed: boolean;
}

export interface BatchConfig {
  code: string;
  cycleName: string;
  periodFrom: string;
  periodTo: string;
  payoutDate: string;
  operatedByCustomerId?: string | undefined;
  jobCodeAllowlist: string[];
  carryOverBatchId?: string | undefined;
}

export interface BatchTimeline {
  createdAt: string;
  lockedAt?: string | undefined;
  completedAt?: string | undefined;
  updatedAt: string;
  updatedByPicHandle: string;
}

export interface PaymentBatchRecord {
  id: string;
  code: string;
  cycleName: string;
  periodRange: string;
  dueDate: string;
  daysRemaining?: number | undefined;
  status: BatchStatus;
  timeline: BatchTimeline;
  summary: BatchKPISummary;
  transactionTypes: BatchTransactionType[];
  companyBreakdown: BatchCompanyBreakdown[];
  items: BatchLineItem[];
  adjustments: BatchAdjustment[];
  adjustmentsConfirmedAt?: string | undefined;
  adjustmentsConfirmedBy?: string | undefined;
  config: BatchConfig;
}

export const BATCH_STATUS_LABELS: Record<
  BatchStatus,
  { label: string; color: "warning" | "brand" | "success" | "error" | "gray" }
> = {
  new: { label: "Mới", color: "warning" },
  locked: { label: "Đã chốt, chờ thực hiện thanh toán", color: "warning" },
  running: { label: "Đang thanh toán", color: "brand" },
  completed: { label: "Hoàn thành", color: "success" },
  cancelled: { label: "Đã huỷ", color: "gray" },
};

export const ADJUSTMENT_KIND_LABELS: Record<AdjustmentKind, string> = {
  debt: "Dư nợ",
  offset: "Cấn trừ",
  adhoc_other: "Adhoc Khác",
};

export const PAYOUT_METHOD_LABELS: Record<PayoutMethod, string> = {
  bank: "Ngân hàng",
  ewallet: "Ví điện tử",
  cash: "Tiền mặt",
};

export const PAYOUT_STATUS_LABELS: Record<
  PayoutStatus,
  { label: string; color: "warning" | "success" | "error" }
> = {
  processing: { label: "Đang xử lý", color: "warning" },
  transferred: { label: "Đã chuyển", color: "success" },
  rejected: { label: "Bị từ chối", color: "error" },
  invalid_account: { label: "TK không hợp lệ", color: "error" },
};

const CUSTOMER_POOL: ReadonlyArray<{ id: string; name: string }> = [
  { id: "highlands-commerce", name: "GHN Sorting" },
  { id: "gomart-distribution", name: "Ninja Van" },
  { id: "medistar-clinic", name: "Shopee Express Official" },
  { id: "nova-event-partners", name: "Kingfoodmart" },
  { id: "atlas-warehouse", name: "Atlas Warehouse" },
  { id: "blueline-logistics", name: "Blueline Logistics" },
  { id: "citimart-retail", name: "Citimart Retail" },
  { id: "pacific-pharma", name: "Pacific Pharma" },
  { id: "skyfood-catering", name: "Skyfood Catering" },
  { id: "urban-cleanco", name: "Urban CleanCo" },
];

const BANKS = [
  "NH TMCP Á Châu (ACB Bank)",
  "NH TMCP Quân Đội (MB Bank)",
  "NH TMCP Ngoại Thương Việt Nam (Vietcombank)",
  "NH TMCP Công thương Việt Nam (Vietinbank)",
  "NH TMCP Đầu Tư và Phát triển Việt Nam (BIDV)",
  "NH TMCP Kỹ Thương Việt Nam (Techcombank)",
];

function makeWorkerCode(seed: number): string {
  return String(220000 + seed);
}

function makeWorkerName(index: number): string {
  const letter = String.fromCharCode(65 + (index % 26));
  const suffix = Math.floor(index / 26);
  return suffix === 0 ? `Cộng tác viên ${letter}` : `Cộng tác viên ${letter}${suffix}`;
}

function maskBankAccount(seed: number): string {
  const front = String(100 + (seed % 900));
  const back = String(seed % 100).padStart(2, "0");
  return `${front}•••••${back}`;
}

function buildLineItems(
  startSeed: number,
  count: number,
  options?: { invalidEvery?: number; rejectedEvery?: number; allTransferred?: boolean },
): BatchLineItem[] {
  const items: BatchLineItem[] = [];
  for (let index = 0; index < count; index += 1) {
    const seed = startSeed + index;
    const bank = BANKS[index % BANKS.length] ?? "NH TMCP Á Châu (ACB Bank)";
    const method: PayoutMethod = index % 13 === 0 ? "ewallet" : "bank";
    let status: PayoutStatus = "processing";
    if (options?.allTransferred) status = "transferred";
    if (options?.invalidEvery && index > 0 && index % options.invalidEvery === 0) {
      status = "invalid_account";
    } else if (
      options?.rejectedEvery &&
      index > 0 &&
      index % options.rejectedEvery === 0
    ) {
      status = "rejected";
    }
    const hours = Number(((seed % 60) + (seed % 7) * 0.25).toFixed(2));
    const net = 50_000 + (seed % 31) * 47_000 + (seed % 7) * 18_500;
    const item: BatchLineItem = {
      workerId: `ctv-${String(seed).padStart(3, "0")}`,
      workerCode: makeWorkerCode(seed),
      workerName: makeWorkerName(index),
      workerPhoneMasked: "09•• ••• •••",
      payoutMethod: method,
      bankVerified: method === "bank" && index % 11 !== 0,
      totalHours: hours,
      netAmount: net,
      payoutStatus: status,
    };
    if (method === "bank") {
      item.bankName = bank;
      item.bankAccountMasked = maskBankAccount(seed);
    }
    items.push(item);
  }
  return items;
}

type AdjustmentTemplate = {
  kind: AdjustmentKind;
  description: string;
  amount: number;
};

const FALLBACK_ADJUSTMENT: AdjustmentTemplate = {
  kind: "adhoc_other",
  description: "Khoản điều chỉnh khác",
  amount: 0,
};

const ADJUSTMENT_TEMPLATES: ReadonlyArray<AdjustmentTemplate> = [
  { kind: "debt", description: "SPR thưởng hiệu suất Tháng 3", amount: 1_222_868 },
  { kind: "debt", description: "SPR thưởng hiệu suất Tháng 3", amount: 1_407_070 },
  { kind: "debt", description: "SPR thưởng hiệu suất Tháng 3", amount: 347_124 },
  { kind: "offset", description: "Truy thu do thao tác sai thất lạc hàng hóa", amount: -900_000 },
  { kind: "debt", description: "Bù lương do web chấm công lỗi chấm tay", amount: 372_000 },
  { kind: "debt", description: "Bù lương do web chấm công lỗi chấm tay", amount: 372_000 },
  { kind: "debt", description: "Bù lương do web chấm công lỗi chấm tay", amount: 372_000 },
  { kind: "debt", description: "Bù lương do web chấm công lỗi chấm tay", amount: 372_000 },
  { kind: "debt", description: "đi lại tiền cho bạn do kho xác nhận công muộn", amount: 290_000 },
  { kind: "debt", description: "đi lại tiền cho bạn do kho xác nhận công muộn", amount: 380_000 },
  { kind: "debt", description: "ctv bị khoá app và bị miss lương kỳ 1 tháng 4", amount: 300_000 },
  { kind: "adhoc_other", description: "Thưởng chuyên cần Sps 20-04-24.04", amount: 70_000 },
  { kind: "adhoc_other", description: "Thưởng chuyên cần Sps 20-04-24.04", amount: 100_000 },
  { kind: "adhoc_other", description: "Thưởng chuyên cần Sps 20-04-24.04", amount: 50_000 },
  { kind: "adhoc_other", description: "Thưởng chuyên cần Sps 20-04-24.04", amount: 100_000 },
  { kind: "adhoc_other", description: "Thưởng chuyên cần Sps 20-04-24.04", amount: 50_000 },
  { kind: "adhoc_other", description: "Thưởng chuyên cần Sps 20-04-24.04", amount: 50_000 },
  { kind: "adhoc_other", description: "Thưởng chuyên cần Sps 20-04-24.04", amount: 100_000 },
  { kind: "adhoc_other", description: "Thưởng chuyên cần Sps 20-04-24.04", amount: 50_000 },
];

const PIC_HANDLES = ["pic-ops-01", "pic-ops-02", "pic-ops-03", "pic-ops-04"];

function buildAdjustments(
  startSeed: number,
  count: number,
  confirmed: boolean,
): BatchAdjustment[] {
  const adjustments: BatchAdjustment[] = [];
  for (let index = 0; index < count; index += 1) {
    const template =
      ADJUSTMENT_TEMPLATES[index % ADJUSTMENT_TEMPLATES.length] ??
      ADJUSTMENT_TEMPLATES[0] ??
      FALLBACK_ADJUSTMENT;
    const seed = startSeed + index;
    const day = ((index % 28) + 1).toString().padStart(2, "0");
    const month = (((index % 4) + 3) % 12 || 12).toString().padStart(2, "0");
    const adj: BatchAdjustment = {
      id: `adj-${seed}`,
      workerId: `ctv-${String(seed).padStart(3, "0")}`,
      workerCode: makeWorkerCode(seed),
      workerName: makeWorkerName(index),
      transactionDate: `${day}/${month}/2026`,
      kind: template.kind,
      amount: template.amount + (index % 5) * 1_000,
      description: template.description,
      picHandle: PIC_HANDLES[index % PIC_HANDLES.length] ?? "pic-ops-01",
      confirmed: confirmed && index % 7 !== 0,
    };
    if (index % 3 !== 0) {
      adj.jobCode = String(700_000 + seed * 13);
    }
    adjustments.push(adj);
  }
  return adjustments;
}

function buildCompanyBreakdown(total: number, count: number): BatchCompanyBreakdown[] {
  const slice = CUSTOMER_POOL.slice(0, count);
  const weights = slice.map((_, i) => Math.max(1, count - i));
  const sum = weights.reduce((s, w) => s + w, 0);
  return slice.map((c, i) => ({
    customerId: c.id,
    customerName: c.name,
    amount: Math.round((total * (weights[i] ?? 1)) / sum / 1000) * 1000,
  }));
}

function buildTransactionTypes(total: number): BatchTransactionType[] {
  const raw = [
    { id: "fee", label: "Thù lao", share: 0.9302 },
    { id: "bonus-adhoc", label: "Thưởng Ad-hoc khuyến khích FL đi làm", share: 0.0278 },
    { id: "bonus-attendance", label: "Thưởng chuyên cần", share: 0.0171 },
    { id: "bonus-recruit", label: "Thưởng tuyển dụng", share: 0.0169 },
    { id: "refund-tax", label: "Hoàn thuế TNCN", share: 0.0027 },
    { id: "spr-performance", label: "SPR thưởng hiệu suất", share: 0.0021 },
    { id: "debt-performance-fee", label: "Dư nợ Phí hiệu suất", share: 0.002 },
    { id: "bonus-top5", label: "Thưởng TOP 5", share: 0.0013 },
    { id: "comp-clockfix", label: "Bù lương do lỗi chấm tay", share: 0.0011 },
    { id: "paid-leave", label: "Nghỉ phép hưởng lương", share: 0.0007 },
    { id: "onboarding", label: "Onboarding kỳ mới", share: 0.0003 },
    { id: "transport-support", label: "Hỗ trợ chi phí di chuyển", share: 0.0001 },
    { id: "claw-mis-ops", label: "Truy thu sai thao tác", share: -0.0006 },
    { id: "pit", label: "Thuế thu nhập cá nhân", share: -0.0039 },
  ];
  return raw.map((row) => ({
    ...row,
    amount: Math.round((total * row.share) / 1000) * 1000,
  }));
}

interface BatchSeed {
  id: string;
  code: string;
  cycleName: string;
  periodFrom: string;
  periodTo: string;
  periodRange: string;
  dueDate: string;
  daysRemaining?: number;
  status: BatchStatus;
  payoutDate: string;
  totalAmount: number;
  totalNetAmount: number;
  workerCount: number;
  companyCount: number;
  totalHours: number;
  invalidAccountCount: number;
  timeline: BatchTimeline;
  itemsCount: number;
  adjustmentsCount: number;
  adjustmentsConfirmed: boolean;
  itemSeed: number;
  adjustmentSeed: number;
  itemOptions?: Parameters<typeof buildLineItems>[2];
  operatedByCustomerId?: string;
  jobCodeAllowlist: string[];
  carryOverBatchId?: string;
  adjustmentsConfirmedAt?: string;
  adjustmentsConfirmedBy?: string;
}

const BATCH_SEEDS: BatchSeed[] = [
  {
    id: "2_5_2026",
    code: "2_5_2026",
    cycleName: "Kỳ 2 tháng 5 năm 2026",
    periodFrom: "2026-05-16",
    periodTo: "2026-05-31",
    periodRange: "16/05 - 31/05/2026",
    dueDate: "05/06/2026",
    daysRemaining: 16,
    status: "new",
    payoutDate: "2026-06-05",
    totalAmount: 212_691_060,
    totalNetAmount: 211_500_000,
    workerCount: 424,
    companyCount: 10,
    totalHours: 9_412.5,
    invalidAccountCount: 3,
    timeline: {
      createdAt: "2026-05-20T10:46:00+07:00",
      updatedAt: "2026-05-20T10:46:00+07:00",
      updatedByPicHandle: "pic-ops-02",
    },
    itemsCount: 18,
    adjustmentsCount: 12,
    adjustmentsConfirmed: false,
    itemSeed: 1,
    adjustmentSeed: 1,
    itemOptions: { invalidEvery: 7 },
    jobCodeAllowlist: ["886345", "785553", "673939", "739566", "468937"],
    carryOverBatchId: "1_5_2026",
  },
  {
    id: "1_5_2026",
    code: "1_5_2026",
    cycleName: "Kỳ 1 tháng 5 năm 2026",
    periodFrom: "2026-05-01",
    periodTo: "2026-05-15",
    periodRange: "01/05 - 15/05/2026",
    dueDate: "20/05/2026",
    status: "locked",
    payoutDate: "2026-05-20",
    totalAmount: 1_587_758_412,
    totalNetAmount: 1_581_600_000,
    workerCount: 1_321,
    companyCount: 14,
    totalHours: 32_410.5,
    invalidAccountCount: 5,
    timeline: {
      createdAt: "2026-05-15T15:00:00+07:00",
      lockedAt: "2026-05-19T11:20:00+07:00",
      updatedAt: "2026-05-19T11:20:00+07:00",
      updatedByPicHandle: "pic-ops-01",
    },
    itemsCount: 22,
    adjustmentsCount: 18,
    adjustmentsConfirmed: true,
    adjustmentsConfirmedAt: "2026-05-19T11:20:00+07:00",
    adjustmentsConfirmedBy: "pic-ops-01",
    itemSeed: 200,
    adjustmentSeed: 100,
    itemOptions: { invalidEvery: 9, rejectedEvery: 13 },
    jobCodeAllowlist: ["886345", "785553", "673939"],
    carryOverBatchId: "2_4_2026",
  },
  {
    id: "2_4_2026",
    code: "2_4_2026",
    cycleName: "Kỳ 2 tháng 4 năm 2026",
    periodFrom: "2026-04-16",
    periodTo: "2026-04-30",
    periodRange: "16/04 - 30/04/2026",
    dueDate: "05/05/2026",
    status: "completed",
    payoutDate: "2026-05-05",
    totalAmount: 1_413_984_445,
    totalNetAmount: 1_405_200_000,
    workerCount: 1_157,
    companyCount: 14,
    totalHours: 30_391.62,
    invalidAccountCount: 0,
    timeline: {
      createdAt: "2026-04-30T13:00:00+07:00",
      lockedAt: "2026-05-04T14:43:00+07:00",
      completedAt: "2026-05-06T09:52:00+07:00",
      updatedAt: "2026-05-06T09:52:00+07:00",
      updatedByPicHandle: "pic-ops-02",
    },
    itemsCount: 24,
    adjustmentsCount: 24,
    adjustmentsConfirmed: true,
    adjustmentsConfirmedAt: "2026-05-04T13:20:00+07:00",
    adjustmentsConfirmedBy: "pic-ops-02",
    itemSeed: 400,
    adjustmentSeed: 300,
    itemOptions: { allTransferred: true },
    jobCodeAllowlist: ["886345", "785553", "673939", "739566", "468937", "747963"],
    carryOverBatchId: "1_4_2026",
  },
  {
    id: "1_4_2026",
    code: "1_4_2026",
    cycleName: "Kỳ 1 tháng 4 năm 2026",
    periodFrom: "2026-04-01",
    periodTo: "2026-04-15",
    periodRange: "01/04 - 15/04/2026",
    dueDate: "20/04/2026",
    status: "completed",
    payoutDate: "2026-04-20",
    totalAmount: 1_306_304_302,
    totalNetAmount: 1_298_500_000,
    workerCount: 1_293,
    companyCount: 15,
    totalHours: 28_500.12,
    invalidAccountCount: 0,
    timeline: {
      createdAt: "2026-04-15T14:00:00+07:00",
      lockedAt: "2026-04-19T16:00:00+07:00",
      completedAt: "2026-04-20T13:03:00+07:00",
      updatedAt: "2026-04-20T13:03:00+07:00",
      updatedByPicHandle: "pic-ops-03",
    },
    itemsCount: 14,
    adjustmentsCount: 14,
    adjustmentsConfirmed: true,
    adjustmentsConfirmedAt: "2026-04-19T16:00:00+07:00",
    adjustmentsConfirmedBy: "pic-ops-03",
    itemSeed: 600,
    adjustmentSeed: 500,
    itemOptions: { allTransferred: true },
    jobCodeAllowlist: ["886345", "785553", "673939", "739566"],
    carryOverBatchId: "2_3_2026",
  },
  {
    id: "2_3_2026",
    code: "2_3_2026",
    cycleName: "Kỳ 2 tháng 3 năm 2026",
    periodFrom: "2026-03-16",
    periodTo: "2026-03-31",
    periodRange: "16/03 - 31/03/2026",
    dueDate: "05/04/2026",
    status: "completed",
    payoutDate: "2026-04-05",
    totalAmount: 1_199_850_790,
    totalNetAmount: 1_191_200_000,
    workerCount: 1_004,
    companyCount: 13,
    totalHours: 25_104.45,
    invalidAccountCount: 0,
    timeline: {
      createdAt: "2026-03-31T13:00:00+07:00",
      lockedAt: "2026-04-04T15:00:00+07:00",
      completedAt: "2026-04-06T16:16:00+07:00",
      updatedAt: "2026-04-06T16:16:00+07:00",
      updatedByPicHandle: "pic-ops-04",
    },
    itemsCount: 12,
    adjustmentsCount: 11,
    adjustmentsConfirmed: true,
    adjustmentsConfirmedAt: "2026-04-04T15:00:00+07:00",
    adjustmentsConfirmedBy: "pic-ops-04",
    itemSeed: 800,
    adjustmentSeed: 700,
    itemOptions: { allTransferred: true },
    jobCodeAllowlist: ["886345", "785553", "673939", "739566", "468937"],
  },
  {
    id: "1_3_2026",
    code: "1_3_2026",
    cycleName: "Kỳ 1 tháng 3 năm 2026",
    periodFrom: "2026-03-01",
    periodTo: "2026-03-15",
    periodRange: "01/03 - 15/03/2026",
    dueDate: "20/03/2026",
    status: "completed",
    payoutDate: "2026-03-20",
    totalAmount: 1_536_281_137,
    totalNetAmount: 1_525_900_000,
    workerCount: 1_457,
    companyCount: 16,
    totalHours: 34_122.18,
    invalidAccountCount: 0,
    timeline: {
      createdAt: "2026-03-15T13:00:00+07:00",
      lockedAt: "2026-03-19T15:00:00+07:00",
      completedAt: "2026-03-23T11:41:00+07:00",
      updatedAt: "2026-03-23T11:41:00+07:00",
      updatedByPicHandle: "pic-ops-01",
    },
    itemsCount: 10,
    adjustmentsCount: 10,
    adjustmentsConfirmed: true,
    adjustmentsConfirmedAt: "2026-03-19T15:00:00+07:00",
    adjustmentsConfirmedBy: "pic-ops-01",
    itemSeed: 1000,
    adjustmentSeed: 900,
    itemOptions: { allTransferred: true },
    jobCodeAllowlist: ["886345", "785553", "673939"],
  },
  {
    id: "2_2_2026",
    code: "2_2_2026",
    cycleName: "Kỳ 2 tháng 2 năm 2026",
    periodFrom: "2026-02-16",
    periodTo: "2026-02-28",
    periodRange: "16/02 - 28/02/2026",
    dueDate: "05/03/2026",
    status: "cancelled",
    payoutDate: "2026-03-05",
    totalAmount: 883_371_850,
    totalNetAmount: 879_200_000,
    workerCount: 671,
    companyCount: 11,
    totalHours: 17_488.4,
    invalidAccountCount: 0,
    timeline: {
      createdAt: "2026-02-28T13:00:00+07:00",
      updatedAt: "2026-03-05T12:25:00+07:00",
      updatedByPicHandle: "pic-ops-02",
    },
    itemsCount: 8,
    adjustmentsCount: 6,
    adjustmentsConfirmed: false,
    itemSeed: 1200,
    adjustmentSeed: 1100,
    jobCodeAllowlist: ["886345"],
  },
];

function fromSeed(seed: BatchSeed): PaymentBatchRecord {
  return {
    id: seed.id,
    code: seed.code,
    cycleName: seed.cycleName,
    periodRange: seed.periodRange,
    dueDate: seed.dueDate,
    daysRemaining: seed.daysRemaining,
    status: seed.status,
    timeline: seed.timeline,
    summary: {
      totalAmount: seed.totalAmount,
      totalNetAmount: seed.totalNetAmount,
      workerCount: seed.workerCount,
      companyCount: seed.companyCount,
      totalHours: seed.totalHours,
      invalidAccountCount: seed.invalidAccountCount,
    },
    transactionTypes: buildTransactionTypes(seed.totalAmount),
    companyBreakdown: buildCompanyBreakdown(seed.totalAmount, seed.companyCount).slice(
      0,
      Math.min(seed.companyCount, CUSTOMER_POOL.length),
    ),
    items: buildLineItems(seed.itemSeed, seed.itemsCount, seed.itemOptions),
    adjustments: buildAdjustments(
      seed.adjustmentSeed,
      seed.adjustmentsCount,
      seed.adjustmentsConfirmed,
    ),
    adjustmentsConfirmedAt: seed.adjustmentsConfirmedAt,
    adjustmentsConfirmedBy: seed.adjustmentsConfirmedBy,
    config: {
      code: seed.code,
      cycleName: seed.cycleName,
      periodFrom: seed.periodFrom,
      periodTo: seed.periodTo,
      payoutDate: seed.payoutDate,
      jobCodeAllowlist: seed.jobCodeAllowlist,
      ...(seed.operatedByCustomerId
        ? { operatedByCustomerId: seed.operatedByCustomerId }
        : {}),
      ...(seed.carryOverBatchId ? { carryOverBatchId: seed.carryOverBatchId } : {}),
    },
  };
}

export const PAYMENT_BATCHES: PaymentBatchRecord[] = BATCH_SEEDS.map(fromSeed);

export function getBatchById(id: string): PaymentBatchRecord | undefined {
  const normalized = id.toLowerCase();
  return PAYMENT_BATCHES.find(
    (batch) => batch.id.toLowerCase() === normalized || batch.code.toLowerCase() === normalized,
  );
}

export function getCustomerPool(): ReadonlyArray<{ id: string; name: string }> {
  return CUSTOMER_POOL;
}
