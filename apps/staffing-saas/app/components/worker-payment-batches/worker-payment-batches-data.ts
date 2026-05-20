export type BatchStatus = "draft" | "pending" | "approved" | "paid" | "rejected";

export interface BatchLineItem {
  workerId: string;
  workerName: string;
  totalShifts: number;
  grossAmount: string;
  deductions: string;
  netAmount: string;
  bank: string;
  bankAccount: string;
  status: "Đã chuyển" | "Chờ chuyển" | "Bị từ chối";
}

export interface PaymentBatchRecord {
  id: string;
  code: string;
  period: string;
  cutoffDate: string;
  payoutDate: string;
  status: BatchStatus;
  workerCount: number;
  totalAmount: string;
  totalDeductions: string;
  netAmount: string;
  createdBy: string;
  notes: string;
  items: BatchLineItem[];
}

export const BATCH_STATUS_LABELS: Record<
  BatchStatus,
  { label: string; color: "success" | "warning" | "error" | "gray" }
> = {
  draft: { label: "Nháp", color: "gray" },
  pending: { label: "Chờ duyệt", color: "warning" },
  approved: { label: "Đã duyệt", color: "success" },
  paid: { label: "Đã thanh toán", color: "success" },
  rejected: { label: "Bị từ chối", color: "error" },
};

export const PAYMENT_BATCHES: PaymentBatchRecord[] = [
  {
    id: "pay-0520-a",
    code: "PAY-0520-A",
    period: "01/05 - 15/05/2026",
    cutoffDate: "15/05/2026",
    payoutDate: "21/05/2026",
    status: "approved",
    workerCount: 38,
    totalAmount: "₫184.250.000",
    totalDeductions: "₫2.420.000",
    netAmount: "₫181.830.000",
    createdBy: "Lê Thuỳ Trang",
    notes: "Batch chu kỳ nửa đầu tháng 5, đã được CFO duyệt, chờ chạy chuyển khoản.",
    items: [
      {
        workerId: "nguyen-van-an",
        workerName: "Nguyễn Văn An",
        totalShifts: 12,
        grossAmount: "₫4.860.000",
        deductions: "₫10.000",
        netAmount: "₫4.850.000",
        bank: "Vietcombank",
        bankAccount: "0701 0009 12345",
        status: "Chờ chuyển",
      },
      {
        workerId: "tran-thi-bich",
        workerName: "Trần Thị Bích",
        totalShifts: 10,
        grossAmount: "₫4.040.000",
        deductions: "₫120.000",
        netAmount: "₫3.920.000",
        bank: "Techcombank",
        bankAccount: "1903 0009 87521",
        status: "Chờ chuyển",
      },
      {
        workerId: "pham-thu-dung",
        workerName: "Phạm Thu Dung",
        totalShifts: 13,
        grossAmount: "₫5.220.000",
        deductions: "₫10.000",
        netAmount: "₫5.210.000",
        bank: "MB Bank",
        bankAccount: "1004 0091 22148",
        status: "Chờ chuyển",
      },
    ],
  },
  {
    id: "pay-0513-b",
    code: "PAY-0513-B",
    period: "16/04 - 30/04/2026",
    cutoffDate: "30/04/2026",
    payoutDate: "06/05/2026",
    status: "paid",
    workerCount: 41,
    totalAmount: "₫172.600.000",
    totalDeductions: "₫4.180.000",
    netAmount: "₫168.420.000",
    createdBy: "Nguyễn Quốc Đạt",
    notes: "Batch cuối tháng 4 đã hoàn tất chuyển khoản.",
    items: [
      {
        workerId: "le-hoang-cuong",
        workerName: "Lê Hoàng Cường",
        totalShifts: 7,
        grossAmount: "₫2.620.000",
        deductions: "₫210.000",
        netAmount: "₫2.410.000",
        bank: "BIDV",
        bankAccount: "0501 0007 33180",
        status: "Đã chuyển",
      },
      {
        workerId: "vu-minh-duc",
        workerName: "Vũ Minh Đức",
        totalShifts: 4,
        grossAmount: "₫1.780.000",
        deductions: "₫800.000",
        netAmount: "₫980.000",
        bank: "Vietcombank",
        bankAccount: "0701 0001 88212",
        status: "Đã chuyển",
      },
    ],
  },
  {
    id: "pay-0506-c",
    code: "PAY-0506-C",
    period: "01/04 - 15/04/2026",
    cutoffDate: "15/04/2026",
    payoutDate: "22/04/2026",
    status: "paid",
    workerCount: 36,
    totalAmount: "₫158.900.000",
    totalDeductions: "₫1.700.000",
    netAmount: "₫157.200.000",
    createdBy: "Lê Thuỳ Trang",
    notes: "Hoàn tất chuyển khoản đúng hạn, không có khiếu nại.",
    items: [
      {
        workerId: "nguyen-van-an",
        workerName: "Nguyễn Văn An",
        totalShifts: 11,
        grossAmount: "₫4.380.000",
        deductions: "₫0",
        netAmount: "₫4.380.000",
        bank: "Vietcombank",
        bankAccount: "0701 0009 12345",
        status: "Đã chuyển",
      },
    ],
  },
  {
    id: "pay-0527-d",
    code: "PAY-0527-D",
    period: "16/05 - 27/05/2026",
    cutoffDate: "27/05/2026",
    payoutDate: "03/06/2026",
    status: "pending",
    workerCount: 22,
    totalAmount: "₫96.400.000",
    totalDeductions: "₫920.000",
    netAmount: "₫95.480.000",
    createdBy: "Lê Thuỳ Trang",
    notes: "Đang chờ kế toán đối soát các ca có vi phạm trước khi duyệt.",
    items: [
      {
        workerId: "tran-thi-bich",
        workerName: "Trần Thị Bích",
        totalShifts: 6,
        grossAmount: "₫2.500.000",
        deductions: "₫120.000",
        netAmount: "₫2.380.000",
        bank: "Techcombank",
        bankAccount: "1903 0009 87521",
        status: "Chờ chuyển",
      },
    ],
  },
];

export function getBatchById(id: string): PaymentBatchRecord | undefined {
  const normalized = id.toLowerCase();
  return PAYMENT_BATCHES.find(
    (batch) => batch.id === normalized || batch.code.toLowerCase() === normalized,
  );
}
