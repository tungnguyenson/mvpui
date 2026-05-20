export type WeekdayKey = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const WEEKDAYS: Array<{ key: WeekdayKey; label: string; isSunday: boolean }> = [
  { key: 1, label: "Hai", isSunday: false },
  { key: 2, label: "Ba", isSunday: false },
  { key: 3, label: "Tư", isSunday: false },
  { key: 4, label: "Năm", isSunday: false },
  { key: 5, label: "Sáu", isSunday: false },
  { key: 6, label: "Bảy", isSunday: false },
  { key: 7, label: "CN", isSunday: true },
];

export type AttendanceMode = "precise" | "simple";
export type OvertimeCalcMode = "afterScheduledEnd" | "dailyHourThreshold";
export type PayUnit = "shift" | "hour";
export type Visibility = "public" | "unlisted" | "private";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface OverridableField {
  isOverriding: boolean;
  value: string;
}

export const HEADCOUNT_APPROVAL_THRESHOLD_PCT = 20;

export interface HeadcountChangeEntry {
  id: string;
  changedAt: string;
  actor: string;
  fromValue: number;
  toValue: number;
  reason: string;
  approvalStatus: ApprovalStatus;
  changePct: number;
}

export interface HeadcountPendingChange {
  requestedValue: number;
  reason: string;
  requestedAt: string;
  actor: string;
}

export interface BasicInfoState {
  description: OverridableField;
  requirements: OverridableField;
  benefits: OverridableField;
  instructions: OverridableField;
  workLocationId: string;
  headcount: number;
  headcountHistory: HeadcountChangeEntry[];
  headcountPending: HeadcountPendingChange | null;
}

export interface ScheduleState {
  startDate: string;
  endDate: string;
  weekdays: WeekdayKey[];
  requireFullAttendance: boolean;
  startTime: string;
  endTime: string;
  breakMinutes: number | null;
  roundingMinutes: number;
  attendanceMode: AttendanceMode;
  allowsOvertime: boolean;
  overtimeCalcMode: OvertimeCalcMode;
  overtimeMinMinutesAfterShift: number;
  overtimeDailyHourLimit: number;
}

export interface PayState {
  pricingConfigId: string;
  hasAdhocBonus: boolean;
  adhocBonusAmount: number | null;
  adhocBonusUnit: PayUnit;
  adhocBonusReason: string;
  adhocBonusApprovalStatus: ApprovalStatus;
  payCycle: string;
}

export interface PostingState {
  postingTitle: string;
  displayedPayAmount: number | null;
  displayedPayUnit: PayUnit;
  visibility: Visibility;
}

export interface HiringRequestFormState {
  basic: BasicInfoState;
  schedule: ScheduleState;
  pay: PayState;
  posting: PostingState;
}

export type WizardStepId = "basic" | "schedule" | "pay" | "posting";

export const WIZARD_STEPS: Array<{ id: WizardStepId; label: string }> = [
  { id: "basic", label: "Thông tin cơ bản" },
  { id: "schedule", label: "Lịch làm việc" },
  { id: "pay", label: "Lương & quyền lợi" },
  { id: "posting", label: "Đăng tuyển" },
];
