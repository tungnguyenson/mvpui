export type ReconciliationStatus = "open" | "pending-approval" | "approved" | "disputed";

export type DiscrepancyType =
  | "missing-checkout"
  | "rate-mismatch"
  | "extra-shift"
  | "missing-shift"
  | "penalty";

export interface DiscrepancyItem {
  id: string;
  type: DiscrepancyType;
  shiftId?: string;
  shiftName?: string;
  workerName?: string;
  expected: string;
  actual: string;
  delta: string;
  note: string;
}

export interface ApprovalEntry {
  id: string;
  at: string;
  actor: string;
  action: string;
  note?: string;
}

export interface ReconciliationRecord {
  id: string;
  code: string;
  period: string;
  customer: string;
  customerId: string;
  totalShifts: number;
  totalAmount: string;
  variance: string;
  variancePercent: string;
  status: ReconciliationStatus;
  owner: string;
  closedAt?: string;
  notes: string;
  discrepancies: DiscrepancyItem[];
  approvals: ApprovalEntry[];
}

export const RECON_STATUS_LABELS: Record<
  ReconciliationStatus,
  { label: string; color: "success" | "warning" | "error" | "gray" }
> = {
  open: { label: "Đang đối soát", color: "warning" },
  "pending-approval": { label: "Chờ duyệt", color: "warning" },
  approved: { label: "Đã chốt", color: "success" },
  disputed: { label: "Đang tranh chấp", color: "error" },
};

export const DISCREPANCY_LABELS: Record<DiscrepancyType, string> = {
  "missing-checkout": "Thiếu check-out",
  "rate-mismatch": "Sai pay rate",
  "extra-shift": "Ca thừa",
  "missing-shift": "Ca thiếu",
  penalty: "Áp dụng phạt",
};

export const RECONCILIATIONS: ReconciliationRecord[] = [
  {
    id: "rc-highlands-0515",
    code: "RC-HL-0515",
    period: "01/05 - 15/05/2026",
    customer: "GHN Sorting",
    customerId: "highlands-commerce",
    totalShifts: 42,
    totalAmount: "₫96.500.000",
    variance: "+₫1.450.000",
    variancePercent: "+1.5%",
    status: "pending-approval",
    owner: "Lê Thuỳ Trang",
    notes:
      "Có một số ca activation cuối tuần phát sinh phụ cấp đột xuất. Cần khách hàng duyệt phần chênh lệch trước khi chốt.",
    discrepancies: [
      {
        id: "dc-1",
        type: "extra-shift",
        shiftId: "sh-815",
        shiftName: "Ca activation sampling",
        expected: "8 worker",
        actual: "9 worker",
        delta: "+1 worker • ₫480.000",
        note: "Khách hàng yêu cầu tăng cường thêm 1 worker sát giờ ca.",
      },
      {
        id: "dc-2",
        type: "rate-mismatch",
        shiftId: "sh-784",
        shiftName: "Ca activation quầy sampling",
        expected: "₫55.000 / giờ",
        actual: "₫60.000 / giờ",
        delta: "+₫350.000",
        note: "Áp dụng pay rate cao hơn theo phụ lục mới chưa cập nhật vào quote.",
      },
    ],
    approvals: [
      {
        id: "ap-1",
        at: "16/05/2026 10:20",
        actor: "Lê Thuỳ Trang",
        action: "Đẩy phiếu lên duyệt",
        note: "Đã gửi khách hàng kiểm tra trước khi chốt.",
      },
    ],
  },
  {
    id: "rc-gomart-0430",
    code: "RC-GM-0430",
    period: "16/04 - 30/04/2026",
    customer: "Ninja Van",
    customerId: "gomart-distribution",
    totalShifts: 58,
    totalAmount: "₫138.200.000",
    variance: "-₫2.100.000",
    variancePercent: "-1.5%",
    status: "approved",
    owner: "Nguyễn Quốc Đạt",
    closedAt: "06/05/2026",
    notes: "Đã đối chiếu xong, khách hàng duyệt chênh lệch giảm vì 3 ca không đạt đủ giờ.",
    discrepancies: [
      {
        id: "dc-1",
        type: "missing-checkout",
        shiftId: "sh-822",
        shiftName: "Ca kho đêm B",
        expected: "8.0h",
        actual: "6.5h",
        delta: "-1.5h • ₫700.000",
        note: "Worker không có check-out, hệ thống chốt theo log điều phối.",
      },
      {
        id: "dc-2",
        type: "penalty",
        shiftId: "sh-844",
        shiftName: "Ca kho tăng cường",
        workerName: "Vũ Minh Đức",
        expected: "₫1.780.000",
        actual: "₫980.000",
        delta: "-₫800.000",
        note: "Áp dụng phạt vắng mặt, đã ghi nhận vào hồ sơ vi phạm.",
      },
    ],
    approvals: [
      {
        id: "ap-1",
        at: "01/05/2026 09:00",
        actor: "Nguyễn Quốc Đạt",
        action: "Gửi đối chiếu lên khách hàng",
      },
      {
        id: "ap-2",
        at: "06/05/2026 14:30",
        actor: "Khách hàng GoMart",
        action: "Duyệt đối soát",
        note: "Khách hàng đồng ý số liệu cuối cùng.",
      },
    ],
  },
  {
    id: "rc-medistar-0515",
    code: "RC-MD-0515",
    period: "01/05 - 15/05/2026",
    customer: "Shopee Express Official",
    customerId: "medistar-clinic",
    totalShifts: 14,
    totalAmount: "₫32.100.000",
    variance: "₫0",
    variancePercent: "0%",
    status: "open",
    owner: "Lê Thuỳ Trang",
    notes: "Mới bắt đầu đối chiếu, đợi báo cáo cuối kỳ và duyệt nội bộ trước khi gửi khách.",
    discrepancies: [],
    approvals: [],
  },
  {
    id: "rc-nova-0430",
    code: "RC-NV-0430",
    period: "01/04 - 30/04/2026",
    customer: "Kingfoodmart",
    customerId: "nova-event-partners",
    totalShifts: 12,
    totalAmount: "₫24.800.000",
    variance: "-₫3.200.000",
    variancePercent: "-12.9%",
    status: "disputed",
    owner: "Phạm Đức Lâm",
    notes:
      "Khách hàng phản hồi một số ca không có khách check-in, đang chờ team đối soát cung cấp ảnh điểm bán.",
    discrepancies: [
      {
        id: "dc-1",
        type: "missing-shift",
        shiftId: "sh-755",
        shiftName: "Ca activation Đà Nẵng",
        expected: "5 worker",
        actual: "0 worker",
        delta: "-5 worker • ₫1.800.000",
        note: "Khách hàng báo không có worker tới điểm bán, đang chờ điều tra.",
      },
      {
        id: "dc-2",
        type: "rate-mismatch",
        shiftId: "sh-760",
        shiftName: "Ca activation đêm sự kiện",
        expected: "₫75.000 / giờ",
        actual: "₫60.000 / giờ",
        delta: "-₫1.400.000",
        note: "Hợp đồng dùng pay rate cao hơn cho ca sự kiện đêm.",
      },
    ],
    approvals: [
      {
        id: "ap-1",
        at: "02/05/2026 16:10",
        actor: "Phạm Đức Lâm",
        action: "Đẩy hồ sơ tranh chấp",
        note: "Đang đợi feedback từ trưởng điểm bán Nova.",
      },
    ],
  },
];

export function getReconciliationById(
  id: string,
): ReconciliationRecord | undefined {
  return RECONCILIATIONS.find((record) => record.id === id);
}
