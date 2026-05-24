"use client";

import { Avatar } from "@mvp-ui/ui";
import { ChevronRight } from "lucide-react";
import { getCustomerLogo, type PlannedCheckIn, type ShiftRecord, type ShiftStatus } from "../shifts-data";
import { workerAvatarUrl } from "../lib/avatars";
import { cn } from "../lib/cn";
import { formatTimeRangeCompact } from "../lib/date-utils";
import {
  getAttendedCount,
  getCheckIns,
  getLateCount,
  getNoShowCount,
  getOperationalContext,
} from "../lib/operational";

const STATUS_DOT: Record<ShiftStatus, string> = {
  open: "bg-warning-fg",
  filling: "bg-warning-fg",
  full: "bg-success-fg",
  critical: "bg-error-fg",
  closed: "bg-fg-tertiary",
};

const CTX_STYLES: Record<string, string> = {
  upcoming: "bg-warning-bg text-warning-fg",
  "upcoming-urgent": "bg-error-bg text-error-fg",
  ongoing: "bg-success-bg text-success-fg",
  "ending-soon": "bg-info-bg text-fg-brand",
  done: "bg-bg-tertiary text-fg-tertiary",
};

const MAX_AVATARS = 5;

interface DayShiftRowProps {
  shift: ShiftRecord;
  nowMs: number;
  isSelected: boolean;
  onSelect: (shift: ShiftRecord) => void;
}

export function DayShiftRow({
  shift,
  nowMs,
  isSelected,
  onSelect,
}: DayShiftRowProps) {
  const ctx = getOperationalContext(shift, nowMs);
  const attended = getAttendedCount(shift, nowMs);
  const noShow = getNoShowCount(shift, nowMs);
  const late = getLateCount(shift, nowMs);

  const previewAvatars = pickPreviewAvatars(shift, ctx.state, nowMs);
  const previewMore = Math.max(
    0,
    (ctx.state === "upcoming" ? shift.assignedCount : attended) -
    previewAvatars.length,
  );

  const issue = buildIssueLabel(ctx.state, shift, attended, noShow, late);

  const start = new Date(shift.startAtMs);
  const end = new Date(shift.endAtMs);

  const ctxKey = ctx.urgent ? "upcoming-urgent" : ctx.state;
  const customerLogo = getCustomerLogo(shift.customerId)?.mark;
  const ratioColor =
    ctx.state === "done" || ctx.state === "ongoing" || ctx.state === "ending-soon"
      ? attended >= shift.requiredCount
        ? "text-fg-success"
        : attended < shift.requiredCount * 0.5
          ? "text-fg-error"
          : "text-fg"
      : shift.assignedCount >= shift.requiredCount
        ? "text-fg"
        : shift.assignedCount < shift.requiredCount * 0.5
          ? "text-fg-error"
          : "text-fg";

  return (
    <button
      type="button"
      onClick={() => onSelect(shift)}
      className={cn(
        "grid w-full cursor-pointer items-center gap-3 border-b border-border-secondary px-4 py-3 text-left transition-colors",
        "hover:bg-bg-secondary",
        isSelected && "bg-info-bg/40 border-l-[3px] border-l-border-brand pl-3.25",
      )}
      style={{
        gridTemplateColumns:
          "12px 80px 110px minmax(220px, 1fr) 110px 160px 130px 20px",
      }}
    >
      <span className={cn("size-2 rounded-full", STATUS_DOT[shift.status])} />
      <span className="text-sm font-semibold tabular-nums text-fg-secondary">
        {formatTimeRangeCompact(start, end)}
      </span>
      <span
        className={cn(
          "inline-flex h-6 items-center justify-center whitespace-nowrap rounded-full px-2 text-xs font-semibold tabular-nums",
          CTX_STYLES[ctxKey],
        )}
      >
        {ctx.label}
      </span>
      <div className="flex min-w-0 items-center gap-2.5">
        <Avatar
          size="sm"
          rounded={false}
          src={customerLogo ?? null}
          alt={shift.customer}
          initials={shift.customer.slice(0, 2).toUpperCase()}
          className="shrink-0"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold text-fg">
              {shift.name}
            </span>
            {issue && (
              <span className="inline-flex shrink-0 items-center rounded-md bg-error-bg px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-fg-error">
                {issue}
              </span>
            )}
          </div>
          <div className="truncate text-xs text-fg-tertiary">
            {shift.customer} · {shift.site}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end leading-tight">
        <span className="text-sm font-bold tabular-nums">
          <span className={ratioColor}>{attended}</span>
          <span className="text-fg-tertiary"> / {shift.assignedCount} / {shift.requiredCount}</span>
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-fg-tertiary">
          Tới / ĐK / YC
        </span>
      </div>
      <AvatarStack avatars={previewAvatars} more={previewMore} />
      <div className="flex min-w-0 items-center gap-2">
        <Avatar
          size="xs"
          src={shift.operator.avatarUrl}
          alt={shift.operator.name}
          initials={shift.operator.initials}
        />
        <span className="truncate text-xs font-medium text-fg-tertiary">
          {shift.operator.name}
        </span>
      </div>
      <ChevronRight className="size-4 text-fg-tertiary" />
    </button>
  );
}

interface AvatarStackProps {
  avatars: PreviewAvatar[];
  more: number;
}

function AvatarStack({ avatars, more }: AvatarStackProps) {
  if (avatars.length === 0) {
    return (
      <span className="inline-flex h-6 items-center rounded-md border border-dashed border-border-secondary px-2 text-[11px] italic text-fg-tertiary">
        chưa ai
      </span>
    );
  }
  return (
    <div className="flex items-center">
      {avatars.map((a, i) => (
        <span
          key={`${a.workerId}-${i}`}
          title={a.tooltip}
          className={cn(
            "relative -ml-1.5 inline-block overflow-hidden rounded-full border-2 border-bg first:ml-0",
          )}
        >
          <img
            src={a.avatarUrl}
            alt={a.tooltip}
            className="size-6 object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </span>
      ))}
      {more > 0 && (
        <span className="-ml-1.5 inline-flex size-6 items-center justify-center rounded-full border-2 border-bg bg-bg-secondary text-[10px] font-semibold text-fg-tertiary">
          +{more}
        </span>
      )}
    </div>
  );
}

interface PreviewAvatar {
  workerId: string;
  initials: string;
  avatarUrl: string;
  tooltip: string;
}

function pickPreviewAvatars(
  shift: ShiftRecord,
  state: string,
  nowMs: number,
): PreviewAvatar[] {
  if (state === "upcoming") {
    return shift.assignments.slice(0, MAX_AVATARS).map((a) => ({
      workerId: a.workerId,
      initials: makeInitials(a.workerName),
      avatarUrl: workerAvatarUrl(a.workerId),
      tooltip: `${a.workerName} — đã đăng ký`,
    }));
  }
  const checkIns = getCheckIns(shift, nowMs).slice(0, MAX_AVATARS);
  return checkIns.map((c: PlannedCheckIn) => ({
    workerId: c.workerId,
    initials: c.initials,
    avatarUrl: workerAvatarUrl(c.workerId),
    tooltip: `${c.workerName} · ${fmt(c.scheduledAtMs)}${c.late ? " · trễ" : ""}`,
  }));
}

function makeInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  const first = parts[0]!;
  const last = parts[parts.length - 1]!;
  return (first.charAt(0) + last.charAt(0)).toUpperCase();
}

function fmt(ms: number): string {
  const d = new Date(ms);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function buildIssueLabel(
  state: string,
  shift: ShiftRecord,
  attended: number,
  noShow: number,
  late: number,
): string | null {
  if (state === "upcoming") {
    const missing = shift.requiredCount - shift.assignedCount;
    if (missing > 0) return `${missing} trống`;
    return null;
  }
  if (state === "done") {
    if (noShow > 0 || late > 0) {
      const parts: string[] = [];
      if (noShow > 0) parts.push(`${noShow} vắng`);
      if (late > 0) parts.push(`${late} trễ`);
      return parts.join(" · ");
    }
    return null;
  }
  const parts: string[] = [];
  const stillMissing = shift.requiredCount - attended;
  if (stillMissing > 0 && stillMissing >= shift.requiredCount * 0.3)
    parts.push(`${stillMissing} trống`);
  if (noShow > 0) parts.push(`${noShow} vắng`);
  if (late > 0) parts.push(`${late} trễ`);
  return parts.length > 0 ? parts.join(" · ") : null;
}
