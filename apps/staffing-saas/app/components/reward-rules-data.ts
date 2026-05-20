export type RewardRuleStatus = "active" | "draft" | "paused" | "archived";

export type RewardKind = "bonus" | "multiplier" | "milestone" | "referral";

export interface RewardCondition {
  id: string;
  label: string;
  value: string;
}

export interface RewardEligibleGroup {
  id: string;
  name: string;
  description: string;
  size: number;
}

export interface RewardPayoutSample {
  id: string;
  workerId?: string;
  workerName: string;
  context: string;
  amount: string;
  paidAt: string;
}

export interface RewardRuleRecord {
  id: string;
  code: string;
  name: string;
  description: string;
  kind: RewardKind;
  status: RewardRuleStatus;
  amount: string;
  amountNote: string;
  effectiveFrom: string;
  effectiveTo: string;
  owner: string;
  conditions: RewardCondition[];
  eligibleGroups: RewardEligibleGroup[];
  recentPayouts: RewardPayoutSample[];
}

export const RULE_STATUS_LABELS: Record<
  RewardRuleStatus,
  { label: string; color: "success" | "warning" | "error" | "gray" }
> = {
  active: { label: "Đang áp dụng", color: "success" },
  draft: { label: "Nháp", color: "gray" },
  paused: { label: "Tạm dừng", color: "warning" },
  archived: { label: "Lưu trữ", color: "gray" },
};

export const RULE_KIND_LABELS: Record<RewardKind, string> = {
  bonus: "Thưởng định kỳ",
  multiplier: "Hệ số giờ công",
  milestone: "Cột mốc",
  referral: "Giới thiệu CTV",
};

export const REWARD_RULES: RewardRuleRecord[] = [
  {
    id: "rw-weekend-streak",
    code: "RW-WEEKEND",
    name: "Streak cuối tuần",
    description:
      "Thưởng cho worker hoàn thành đủ ca thứ 7 và chủ nhật liên tục trong 4 tuần.",
    kind: "milestone",
    status: "active",
    amount: "₫500.000 / chu kỳ",
    amountNote: "Cộng dồn vào batch thanh toán cuối kỳ.",
    effectiveFrom: "01/04/2026",
    effectiveTo: "30/06/2026",
    owner: "Lê Thuỳ Trang",
    conditions: [
      { id: "c-1", label: "Số tuần liên tiếp", value: "≥ 4 tuần" },
      { id: "c-2", label: "Hoàn thành ca thứ 7 + chủ nhật", value: "100%" },
      { id: "c-3", label: "Không có vi phạm mới", value: "Không có" },
    ],
    eligibleGroups: [
      {
        id: "g-1",
        name: "Worker retail TP.HCM",
        description: "CTV bán hàng cuối tuần tại Highlands & các điểm vincom.",
        size: 38,
      },
      {
        id: "g-2",
        name: "Worker activation cuối tuần",
        description: "Đội sampling/hostess tại trung tâm thương mại.",
        size: 24,
      },
    ],
    recentPayouts: [
      {
        id: "p-1",
        workerId: "nguyen-van-an",
        workerName: "Nguyễn Văn An",
        context: "Streak 04 tuần cuối tháng 4",
        amount: "₫500.000",
        paidAt: "06/05/2026",
      },
      {
        id: "p-2",
        workerId: "pham-thu-dung",
        workerName: "Phạm Thu Dung",
        context: "Streak 04 tuần cuối tháng 4",
        amount: "₫500.000",
        paidAt: "06/05/2026",
      },
    ],
  },
  {
    id: "rw-night-multiplier",
    code: "RW-NIGHT",
    name: "Hệ số ca đêm 1.3x",
    description:
      "Nâng pay rate cho worker làm ca kho ban đêm và ca sự kiện sau 22:00.",
    kind: "multiplier",
    status: "active",
    amount: "1.3x pay rate",
    amountNote: "Áp dụng cho từng giờ thực tế trong khung 22:00 - 06:00.",
    effectiveFrom: "15/03/2026",
    effectiveTo: "31/12/2026",
    owner: "Nguyễn Quốc Đạt",
    conditions: [
      { id: "c-1", label: "Khung giờ", value: "22:00 - 06:00" },
      { id: "c-2", label: "Loại ca", value: "Kho, sự kiện" },
      { id: "c-3", label: "Worker đã xác thực", value: "Bắt buộc" },
    ],
    eligibleGroups: [
      {
        id: "g-1",
        name: "Worker kho ca đêm",
        description: "CTV đang nhận ca tại GoMart DC1/DC2.",
        size: 26,
      },
    ],
    recentPayouts: [
      {
        id: "p-1",
        workerId: "le-hoang-cuong",
        workerName: "Lê Hoàng Cường",
        context: "Ca kho đêm 18/05",
        amount: "₫168.000",
        paidAt: "21/05/2026",
      },
    ],
  },
  {
    id: "rw-referral",
    code: "RW-REFER",
    name: "Thưởng giới thiệu CTV",
    description:
      "Thưởng tiền mặt cho worker giới thiệu thành công CTV mới hoàn thành ≥ 5 ca.",
    kind: "referral",
    status: "active",
    amount: "₫300.000 / CTV mới",
    amountNote: "Chi trả sau khi CTV mới hoàn tất 5 ca đầu tiên trong 30 ngày.",
    effectiveFrom: "01/01/2026",
    effectiveTo: "31/12/2026",
    owner: "Lê Thuỳ Trang",
    conditions: [
      { id: "c-1", label: "CTV mới hoàn thành", value: "≥ 5 ca trong 30 ngày" },
      { id: "c-2", label: "Mức rating CTV mới", value: "≥ 4.0" },
      { id: "c-3", label: "Mã giới thiệu hợp lệ", value: "Bắt buộc" },
    ],
    eligibleGroups: [
      {
        id: "g-1",
        name: "Toàn bộ worker đã xác thực",
        description: "Tất cả CTV active có ít nhất 10 ca trong 60 ngày gần nhất.",
        size: 142,
      },
    ],
    recentPayouts: [
      {
        id: "p-1",
        workerId: "tran-thi-bich",
        workerName: "Trần Thị Bích",
        context: "Giới thiệu CTV Lê Thanh Mai",
        amount: "₫300.000",
        paidAt: "29/04/2026",
      },
    ],
  },
  {
    id: "rw-onboarding",
    code: "RW-ONBOARD",
    name: "Thưởng onboarding",
    description:
      "Worker hoàn tất 3 ca đầu tiên trong tuần đầu nhận thưởng cố định để khuyến khích nhận ca sớm.",
    kind: "bonus",
    status: "paused",
    amount: "₫150.000",
    amountNote: "Tạm dừng do đang điều chỉnh ngân sách Q2.",
    effectiveFrom: "10/02/2026",
    effectiveTo: "30/04/2026",
    owner: "Lê Thuỳ Trang",
    conditions: [
      { id: "c-1", label: "Worker mới", value: "Đăng ký ≤ 7 ngày" },
      { id: "c-2", label: "Số ca hoàn thành", value: "≥ 3 ca trong 7 ngày" },
    ],
    eligibleGroups: [
      {
        id: "g-1",
        name: "CTV mới quý 2",
        description: "Worker đăng ký từ 01/04 đến 30/06/2026.",
        size: 18,
      },
    ],
    recentPayouts: [],
  },
];

export function getRewardRuleById(id: string): RewardRuleRecord | undefined {
  return REWARD_RULES.find((rule) => rule.id === id);
}
