"use client";

import { Avatar, Badge } from "@mvp-ui/ui";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { getAvatarFor, getInitials } from "../../_shared/assets";
import {
  ASSIGNMENT_STATUS_LABELS,
  type AssignmentStatus,
  type HiringAssignment,
} from "../hiring-requests-data";
import type { ShiftDate } from "./date-utils";

interface AssignmentPanelProps {
  shiftDate: ShiftDate | null;
  assignments: HiringAssignment[];
  headcount: number;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
}

function AssignmentRow({
  assignment,
  onConfirm,
  onCancel,
}: {
  assignment: HiringAssignment;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
}) {
  const meta = ASSIGNMENT_STATUS_LABELS[assignment.status];
  const isCancelled = assignment.status === "cancelled";

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${isCancelled
          ? "border-border-secondary bg-bg-secondary "
          : "border-border-secondary bg-bg"
        }`}
    >
      <Avatar
        size="sm"
        src={getAvatarFor(assignment.workerName, assignment.workerId)}
        alt={assignment.workerName}
        initials={getInitials(assignment.workerName)}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{assignment.workerName}</p>
        {assignment.note && (
          <p className="mt-0.5 truncate text-xs text-fg-tertiary">{assignment.note}</p>
        )}
      </div>
      <Badge type="pill-color" color={meta.color} size="sm">
        {meta.label}
      </Badge>
      {!isCancelled && (
        <div className="flex shrink-0 items-center gap-1.5">
          {assignment.status === "assigned" && (
            <button
              type="button"
              onClick={() => onConfirm(assignment.id)}
              className="flex items-center gap-1 rounded-md border border-border-brand bg-bg px-2 py-1 text-xs font-medium text-fg-brand hover:bg-bg-secondary"
            >
              <CheckCircle className="size-3.5" />
              Xác nhận
            </button>
          )}
          <button
            type="button"
            onClick={() => onCancel(assignment.id)}
            className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-fg-secondary hover:bg-bg-secondary"
          >
            <XCircle className="size-3.5" />
            Huỷ
          </button>
        </div>
      )}
    </div>
  );
}

export function AssignmentPanel({
  shiftDate,
  assignments,
  headcount,
  onConfirm,
  onCancel,
}: AssignmentPanelProps) {
  if (!shiftDate) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-sm text-fg-tertiary">
        Chọn một ngày ở trên để xem danh sách CTV
      </div>
    );
  }

  const active = assignments.filter(
    (a) =>
      a.date === shiftDate.dateStr &&
      (a.status === "assigned" || a.status === "confirmed"),
  );
  const cancelled = assignments.filter(
    (a) => a.date === shiftDate.dateStr && a.status === "cancelled",
  );
  const dayAssignments = assignments.filter((a) => a.date === shiftDate.dateStr);

  const filled = active.length;
  const missing = Math.max(headcount - filled, 0);
  const fillPct = headcount > 0 ? Math.round((filled / headcount) * 100) : 0;

  const dayLabel = `${shiftDate.weekDayLabel} ${shiftDate.dayOfMonth}/${String(shiftDate.dateObj.getMonth() + 1).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-4">
      {/* header stats */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border-secondary bg-bg px-5 py-3">
        <span className="text-sm font-semibold text-fg">{dayLabel}</span>
        <span className="h-4 w-px bg-border-secondary" />
        <span className="text-sm text-fg-secondary">
          Cần: <strong className="text-fg">{headcount}</strong>
        </span>
        <span className="h-4 w-px bg-border-secondary" />
        <span className="text-sm text-fg-secondary">
          Đã chốt: <strong className="text-fg">{filled}</strong>
          <span className="ml-1 text-xs text-fg-tertiary">({fillPct}%)</span>
        </span>
        {missing > 0 && (
          <>
            <span className="h-4 w-px bg-border-secondary" />
            <span className="flex items-center gap-1 text-sm font-medium text-fg-error">
              <AlertTriangle className="size-3.5" />
              Thiếu {missing} người
            </span>
          </>
        )}
        {missing === 0 && filled > 0 && (
          <>
            <span className="h-4 w-px bg-border-secondary" />
            <span className="flex items-center gap-1 text-sm font-medium text-fg-success">
              <CheckCircle className="size-3.5" />
              Đủ người
            </span>
          </>
        )}
      </div>

      {/* assignment list */}
      {dayAssignments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border-secondary bg-bg-secondary py-10 text-center text-sm text-fg-tertiary">
          Chưa có CTV nào được gán cho ngày này
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {active.map((a) => (
            <AssignmentRow
              key={a.id}
              assignment={a}
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
          ))}
          {cancelled.length > 0 && (
            <>
              <p className="mt-1 text-xs font-medium text-fg-tertiary">Đã huỷ</p>
              {cancelled.map((a) => (
                <AssignmentRow
                  key={a.id}
                  assignment={a}
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                />
              ))}
            </>
          )}
        </div>
      )}

    </div>
  );
}
