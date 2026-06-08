export type VerificationState = "verified" | "pending" | "missing";

export interface BankInfo {
  bankCode: string;
  accountNumber: string;
  accountHolder: string;
}

export interface NextShift {
  customer: string;
  role: string;
  schedule: string;
  location: string;
  payout: string;
  status: "Sắp tới" | "Chờ xác nhận";
}

export interface WorkerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  bio: string;
  rating: string;
  weeklyShifts: number;
  totalShifts: number;
  monthlyEarnings: string;
  skills: string[];
  bank: BankInfo;
  nationalId: string;
  taxId: string;
  verification: VerificationState;
  avatar: string;
  nextShift: NextShift;
}

/** Single demo worker — stands in for the authenticated session. */
export const CURRENT_WORKER: WorkerProfile = {
  id: "CTV-2048",
  name: "Trần Minh Khôi",
  phone: "0907 882 145",
  email: "khoi.tran@email.vn",
  city: "TP. Hồ Chí Minh",
  district: "Quận Bình Thạnh",
  bio: "CTV bán lẻ & activation, 3 năm kinh nghiệm hội chợ và sự kiện FMCG. Ưu tiên ca cuối tuần khu vực nội thành.",
  rating: "4.9",
  weeklyShifts: 4,
  totalShifts: 213,
  monthlyEarnings: "₫9.450.000",
  skills: ["Bán lẻ", "Activation", "Sự kiện", "Kho vận"],
  bank: {
    bankCode: "vcb",
    accountNumber: "0071000812345",
    accountHolder: "TRAN MINH KHOI",
  },
  nationalId: "079200001234",
  taxId: "8412345678",
  verification: "verified",
  avatar: "/avatar.jpg",
  nextShift: {
    customer: "GS25 — Vinhomes Central Park",
    role: "Nhân viên bán hàng",
    schedule: "Thứ 7, 08/06 · 08:00 – 17:00",
    location: "208 Nguyễn Hữu Cảnh, Bình Thạnh",
    payout: "₫650.000",
    status: "Sắp tới",
  },
};

export const PROVINCE_OPTIONS = [
  { id: "hcm", label: "TP. Hồ Chí Minh" },
  { id: "hn", label: "Hà Nội" },
  { id: "dn", label: "Đà Nẵng" },
  { id: "bd", label: "Bình Dương" },
  { id: "ct", label: "Cần Thơ" },
];

export const BANK_OPTIONS = [
  { id: "vcb", label: "Vietcombank" },
  { id: "tcb", label: "Techcombank" },
  { id: "mb", label: "MB Bank" },
  { id: "acb", label: "ACB" },
  { id: "tpb", label: "TPBank" },
  { id: "vtb", label: "VietinBank" },
  { id: "bidv", label: "BIDV" },
];

export const SKILL_OPTIONS = [
  { id: "ban-le", label: "Bán lẻ" },
  { id: "activation", label: "Activation" },
  { id: "su-kien", label: "Sự kiện" },
  { id: "kho-van", label: "Kho vận" },
  { id: "fnb", label: "F&B / Phục vụ" },
  { id: "sampling", label: "Sampling" },
  { id: "le-tan", label: "Lễ tân" },
  { id: "giao-hang", label: "Giao hàng" },
];

export function skillLabelToId(label: string): string {
  return SKILL_OPTIONS.find((s) => s.label === label)?.id ?? label;
}
