import type { HiringRequestFormState, PayUnit } from "./types";

export interface WizardContextSnapshot {
  companyId: string;
  companyName: string;
  companyLogoUrl: string | null;
  positionId: string;
  positionName: string;
  positionDescription: string;
  positionRequirements: string;
  positionBenefits: string;
  positionInstructions: string;
  positionDocuments: Array<{ id: string; name: string; url: string }>;
  workLocations: Array<{ id: string; shortName: string; address: string }>;
  pricingConfigs: Array<{ id: string; name: string; appliedFrom: string; appliedTo: string }>;
}

export const SAMPLE_PRE_STEP: WizardContextSnapshot = {
  companyId: "ghn-sorting",
  companyName: "GHN Sorting",
  companyLogoUrl: "https://business.viec.co/storage/companies/1591/logo.png",
  positionId: "pos-sales-weekend",
  positionName: "CTV bán hàng cuối tuần",
  positionDescription:
    "Hỗ trợ chốt đơn, đóng gói và bàn giao hàng cho khách hàng tại quầy bán hàng vào cuối tuần.",
  positionRequirements:
    "- Nam/Nữ 18+, sức khỏe tốt\n- Có kinh nghiệm bán hàng/retail là một lợi thế\n- Trung thực, chăm chỉ, giao tiếp tốt",
  positionBenefits:
    "- Thưởng KPI theo doanh thu\n- Thưởng chuyên cần\n- Hỗ trợ ăn trưa khi ca > 6 tiếng",
  positionInstructions:
    "- Có mặt trước 15 phút để nhận đồng phục và brief\n- Mang theo CCCD bản gốc\n- Liên hệ quản lý ca tại quầy thông tin trước khi bắt đầu",
  positionDocuments: [
    { id: "doc-1", name: "Quy trình bán hàng.pdf", url: "#" },
    { id: "doc-2", name: "Mẫu báo cáo cuối ca.docx", url: "#" },
  ],
  workLocations: [
    {
      id: "loc-q1",
      shortName: "Quận 1, TP.HCM",
      address: "12 Nguyễn Huệ, Bến Nghé, Quận 1, TP.HCM",
    },
    {
      id: "loc-ecdc-q12",
      shortName: "Đóng gói kho ECDC - ViettelPost. Quận 12, Hồ Chí Minh",
      address: "Kho Guardian VTP-DC, Phường Trung Mỹ Tây, Quận 12, Hồ Chí Minh",
    },
  ],
  pricingConfigs: [
    {
      id: "pcfg-q12-ctv-warehouse",
      name: "CTV kho - Hồ Chí Minh",
      appliedFrom: "03/12/2025",
      appliedTo: "31/12/2026",
    },
  ],
};

export interface PayDisplayOption {
  id: string;
  amount: number;
  unit: PayUnit;
  hint?: string;
}

export const PAY_DISPLAY_OPTIONS: PayDisplayOption[] = [
  { id: "shift-base", amount: 162500, unit: "shift", hint: "Theo cấu hình cước phí" },
  { id: "hour-base", amount: 32500, unit: "hour", hint: "Theo cấu hình cước phí" },
];

export const PAY_CYCLE_OPTIONS: Array<{
  id: string;
  label: string;
  policy: string;
}> = [
    {
      id: "instant",
      label: "Tiền ngay",
      policy:
        "Lương sẽ được thanh toán sau 2 ngày làm việc kể từ ngày chốt công, không tính Thứ 7 và Chủ nhật.",
    },
    {
      id: "monthly",
      label: "Hàng tháng",
      policy: "Lương được trả 1 lần / tháng vào ngày 01 - 05 của tháng kế tiếp.",
    },
    {
      id: "biweekly",
      label: "2 lần / tháng",
      policy:
        "Lương được trả 2 lần / tháng: kỳ 1 vào ngày 15 - 20, kỳ 2 vào ngày 01 - 05 tháng kế tiếp.",
    },
  ];

export function createInitialFormState(
  ctx: WizardContextSnapshot
): HiringRequestFormState {
  return {
    basic: {
      description: { isOverriding: false, value: ctx.positionDescription },
      requirements: { isOverriding: false, value: ctx.positionRequirements },
      benefits: { isOverriding: false, value: ctx.positionBenefits },
      instructions: { isOverriding: false, value: ctx.positionInstructions },
      workLocationId: ctx.workLocations[0]?.id ?? "",
      headcount: 12,
      headcountHistory: [
        {
          id: "hc-1",
          changedAt: "2026-05-12 09:24",
          actor: "Mai Anh (Ops)",
          fromValue: 10,
          toValue: 12,
          reason: "Khách hàng GHN báo tăng nhu cầu peak cuối tuần thêm 2 vị trí.",
          approvalStatus: "approved",
          changePct: 20,
        },
        {
          id: "hc-2",
          changedAt: "2026-05-08 16:02",
          actor: "Tùng (Account)",
          fromValue: 8,
          toValue: 10,
          reason: "Mở rộng phạm vi sang khu vực Quận 12.",
          approvalStatus: "approved",
          changePct: 25,
        },
      ],
      headcountPending: null,
    },
    schedule: {
      startDate: "2026-05-15",
      endDate: "2026-12-31",
      weekdays: [1, 2, 3, 4, 5],
      requireFullAttendance: false,
      startTime: "16:00",
      endTime: "21:00",
      breakMinutes: 30,
      roundingMinutes: 15,
      attendanceMode: "precise",
      allowsOvertime: false,
      overtimeCalcMode: "afterScheduledEnd",
      overtimeMinMinutesAfterShift: 30,
      overtimeDailyHourLimit: 8,
    },
    pay: {
      pricingConfigId: ctx.pricingConfigs[0]?.id ?? "",
      hasAdhocBonus: false,
      adhocBonusAmount: null,
      adhocBonusUnit: "shift",
      adhocBonusReason: "",
      adhocBonusApprovalStatus: "pending",
      payCycle: PAY_CYCLE_OPTIONS[0]?.id ?? "",
    },
    posting: {
      postingTitle: ctx.positionName,
      displayedPayAmount: 165000,
      displayedPayUnit: "shift",
      visibility: "public",
    },
  };
}
