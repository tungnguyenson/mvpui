import {
  WEEKDAY_LABELS_VI,
  addDays,
  addWeeks,
  buildDateAtHour,
  formatDateLongVi,
  formatTimeHHmm,
  startOfWeekMonday,
  type WeekDay,
} from "./lib/date-utils";
import {
  OPERATORS,
  type PlannedCheckIn,
  type ShiftAssignment,
  type ShiftRecord,
  type ShiftStatus,
} from "./shifts-data";
import { SHIFT_TEMPLATES, type ShiftTemplate } from "./shifts-templates";

const DEFAULT_WINDOW_WEEKS = 4;

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function buildShiftId(templateId: string, date: Date): string {
  const ymd = `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}`;
  return `${templateId}-${ymd}`;
}

function buildShiftCode(prefix: string, templateId: string, date: Date): string {
  let hash = 0;
  const seed = `${templateId}-${date.toISOString().slice(0, 10)}`;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  const slug = Math.abs(hash % 9000) + 1000;
  return `${prefix}-${slug}`;
}

function formatPayRate(vnd: number, unit: "giờ" | "ca"): string {
  const u = unit === "giờ" ? "h" : "ca";
  return `${vnd.toLocaleString("vi-VN")}đ/${u}`;
}

function buildScheduleLabel(template: ShiftTemplate, day: Date): string {
  const dayLabel = WEEKDAY_LABELS_VI[((day.getDay() === 0 ? 6 : day.getDay() - 1) as WeekDay)];
  const startStr = `${pad2(template.startHour)}:00`;
  const endStr = `${pad2(template.endHour)}:00`;
  const overnight = template.overnight ? " (qua đêm)" : "";
  return `${dayLabel}, ${startStr} – ${endStr}${overnight}`;
}

function buildAssignments(
  template: ShiftTemplate,
  assignedCount: number,
  baseDate: Date,
): ShiftAssignment[] {
  const pool = template.sampleWorkers;
  if (pool.length === 0) return [];
  const result: ShiftAssignment[] = [];
  for (let i = 0; i < assignedCount; i++) {
    const sample = pool[i % pool.length] ?? pool[0]!;
    const confirmedOffset = -(2 + ((i + template.templateId.length) % 6));
    const confirmedDate = addDays(baseDate, confirmedOffset);
    result.push({
      workerId: `${sample.name.toLowerCase().replace(/\s+/g, "-")}-${i}`,
      workerName: sample.name,
      role: sample.role,
      confirmedAt: formatDateLongVi(confirmedDate),
      status: "Đã xác nhận",
    });
  }
  return result;
}

function nameInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  const first = parts[0]!;
  const last = parts[parts.length - 1]!;
  return (first.charAt(0) + last.charAt(0)).toUpperCase();
}

function buildPlannedCheckIns(
  shiftId: string,
  assigned: ShiftAssignment[],
  startMs: number,
): PlannedCheckIn[] {
  const out: PlannedCheckIn[] = [];
  for (let i = 0; i < assigned.length; i++) {
    const a = assigned[i]!;
    let hash = 0;
    const seed = `${shiftId}-${a.workerId}-${i}`;
    for (let j = 0; j < seed.length; j++) {
      hash = (hash * 31 + seed.charCodeAt(j)) | 0;
    }
    const abs = Math.abs(hash);
    const noShow = abs % 25 === 0;
    let offsetMin: number;
    if (noShow) {
      offsetMin = 30;
    } else if (abs % 6 === 0) {
      offsetMin = (abs % 30) + 10;
    } else {
      offsetMin = -((abs % 15) + 1);
    }
    const scheduledAtMs = startMs + offsetMin * 60_000;
    out.push({
      workerId: a.workerId,
      workerName: a.workerName,
      initials: nameInitials(a.workerName),
      scheduledAtMs,
      late: offsetMin > 5,
      noShow,
    });
  }
  out.sort((a, b) => a.scheduledAtMs - b.scheduledAtMs);
  return out;
}

function pickOperator(template: ShiftTemplate, day: Date) {
  const seed = `${template.templateId}-${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(hash) % OPERATORS.length;
  return OPERATORS[idx]!;
}

function instantiate(template: ShiftTemplate, day: Date): ShiftRecord {
  const startAt = buildDateAtHour(day, template.startHour);
  const endDay = template.overnight ? addDays(day, 1) : day;
  const endAt = buildDateAtHour(endDay, template.endHour);
  const assignedCount = Math.min(
    template.required,
    Math.round(template.required * template.fillRatio),
  );

  const status = resolveStatus(template.status, assignedCount, template.required);
  const operator = pickOperator(template, day);
  const shiftId = buildShiftId(template.templateId, day);
  const assignments = buildAssignments(template, assignedCount, day);
  const plannedCheckIns = buildPlannedCheckIns(
    shiftId,
    assignments,
    startAt.getTime(),
  );

  return {
    id: shiftId,
    code: buildShiftCode(template.codePrefix, template.templateId, day),
    name: template.name,
    customer: template.customer,
    customerId: template.customerId,
    region: template.region,
    site: template.site,
    address: template.address,
    schedule: buildScheduleLabel(template, day),
    startAt: `${formatDateLongVi(startAt)} ${formatTimeHHmm(startAt)}`,
    endAt: `${formatDateLongVi(endAt)} ${formatTimeHHmm(endAt)}`,
    startAtMs: startAt.getTime(),
    endAtMs: endAt.getTime(),
    requiredCount: template.required,
    assignedCount,
    status,
    payRate: formatPayRate(template.payRateVnd, template.payRateUnit),
    payRateNote: template.payRateNote,
    requirements: template.requirements,
    notes: template.notes,
    assignments,
    operator,
    plannedCheckIns,
  };
}

function resolveStatus(
  hint: ShiftStatus,
  assigned: number,
  required: number,
): ShiftStatus {
  if (assigned >= required) return "full";
  const ratio = assigned / required;
  if (ratio < 0.5) return "critical";
  if (hint === "full") return "filling";
  return hint;
}

export interface GenerateOptions {
  windowWeeks?: number;
}

export function generateShifts(
  anchor: Date = new Date(),
  options: GenerateOptions = {},
): ShiftRecord[] {
  const window = options.windowWeeks ?? DEFAULT_WINDOW_WEEKS;
  const baseWeek = startOfWeekMonday(anchor);
  const out: ShiftRecord[] = [];

  for (let w = -window; w <= window; w++) {
    const weekStart = addWeeks(baseWeek, w);
    for (const template of SHIFT_TEMPLATES) {
      for (const offset of template.dayOffsets) {
        const day = addDays(weekStart, offset);
        out.push(instantiate(template, day));
      }
    }
  }

  out.sort((a, b) => a.startAtMs - b.startAtMs);
  return out;
}

export function generateShiftsInRange(
  anchor: Date,
  fromMs: number,
  toMs: number,
  options: GenerateOptions = {},
): ShiftRecord[] {
  return generateShifts(anchor, options).filter(
    (shift) => shift.startAtMs >= fromMs && shift.startAtMs <= toMs,
  );
}
