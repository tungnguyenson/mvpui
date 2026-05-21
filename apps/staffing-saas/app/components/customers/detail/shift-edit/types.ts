import type {
  CustomerShift,
  CustomerShiftAttendanceMode,
  CustomerShiftOvertimeCalcMode,
  CustomerShiftStatus,
  CustomerShiftWeekday,
} from "../../customer-detail-data";

export interface ShiftFormState {
  name: string;
  status: CustomerShiftStatus;
  positionId: string;
  locationId: string;
  weekdays: CustomerShiftWeekday[];
  startTime: string;
  endTime: string;
  breakMinutes: number | null;
  pricingConfigId: number | null;
  requireFullAttendance: boolean;
  roundingMinutes: number;
  attendanceMode: CustomerShiftAttendanceMode;
  allowsOvertime: boolean;
  overtimeCalcMode: CustomerShiftOvertimeCalcMode | null;
  overtimeMinMinutesAfterShift: number | null;
  overtimeDailyHourLimit: number | null;
}

export type ShiftFormUpdate = <K extends keyof ShiftFormState>(
  key: K,
  value: ShiftFormState[K]
) => void;

export interface SectionProps {
  form: ShiftFormState;
  update: ShiftFormUpdate;
}

export const EMPTY_FORM: ShiftFormState = {
  name: "",
  status: "active",
  positionId: "",
  locationId: "",
  weekdays: [],
  startTime: "08:00",
  endTime: "17:00",
  breakMinutes: 0,
  pricingConfigId: null,
  requireFullAttendance: false,
  roundingMinutes: 15,
  attendanceMode: "precise",
  allowsOvertime: false,
  overtimeCalcMode: null,
  overtimeMinMinutesAfterShift: null,
  overtimeDailyHourLimit: null,
};

export function toFormState(shift: CustomerShift): ShiftFormState {
  return {
    name: shift.name,
    status: shift.status,
    positionId: shift.positionId,
    locationId: shift.locationId,
    weekdays: shift.weekdays,
    startTime: shift.startTime,
    endTime: shift.endTime,
    breakMinutes: shift.breakMinutes,
    pricingConfigId: shift.pricingConfigId,
    requireFullAttendance: shift.requireFullAttendance,
    roundingMinutes: shift.roundingMinutes,
    attendanceMode: shift.attendanceMode,
    allowsOvertime: shift.allowsOvertime,
    overtimeCalcMode: shift.overtimeCalcMode,
    overtimeMinMinutesAfterShift: shift.overtimeMinMinutesAfterShift,
    overtimeDailyHourLimit: shift.overtimeDailyHourLimit,
  };
}
