"use client";

import { Avatar, ProgressBarBase, Tab, TabList, Table, TableCard, Tabs } from "@mvp-ui/ui";
import { useMemo, useState } from "react";
import {
  getCustomerLogo,
  SHIFT_STATUS_LABELS,
  type ShiftRecord,
  type ShiftStatus,
} from "../shifts-data";
import { cn } from "./lib/cn";
import {
  WEEKDAY_LABELS_VI,
  formatTimeRange,
  type WeekDay,
} from "./lib/date-utils";

const COLUMNS = [
  { id: "customer", name: "Khách hàng / Site" },
  { id: "shift", name: "Ca làm việc", isRowHeader: true as const },
  { id: "schedule", name: "Lịch" },
  { id: "fill", name: "Tiến độ" },
  { id: "operator", name: "Người ĐP" },
  { id: "pay", name: "Thù lao" },
];

type StatusTabId = "all" | ShiftStatus;

const STATUS_TAB_DEFS: Array<{ id: StatusTabId; label: string }> = [
  { id: "all", label: "Tất cả" },
  { id: "critical", label: "Thiếu gấp" },
  { id: "open", label: "Đang mở" },
  { id: "filling", label: "Đang tuyển" },
  { id: "full", label: "Đủ người" },
  { id: "closed", label: "Đã đóng" },
];

interface ShiftsTableViewProps {
  shifts: ShiftRecord[];
  selectedShiftId: string | null;
  onSelectShift: (shift: ShiftRecord) => void;
}

export function ShiftsTableView({
  shifts,
  selectedShiftId,
  onSelectShift,
}: ShiftsTableViewProps) {
  const [statusTab, setStatusTab] = useState<StatusTabId>("all");

  const counts = useMemo(() => {
    const map: Record<StatusTabId, number> = {
      all: shifts.length,
      critical: 0,
      open: 0,
      filling: 0,
      full: 0,
      closed: 0,
    };
    for (const s of shifts) map[s.status] += 1;
    return map;
  }, [shifts]);

  const visible = useMemo(
    () =>
      statusTab === "all"
        ? shifts
        : shifts.filter((s) => s.status === statusTab),
    [shifts, statusTab],
  );

  return (
    <TableCard.Root>
      <div className="flex flex-wrap items-center gap-2 border-b border-border-secondary px-4 py-2">
        <Tabs
          size="sm"
          variant="pill"
          selectedKey={statusTab}
          onSelectionChange={(k) => setStatusTab(k as StatusTabId)}
        >
          <TabList aria-label="Lọc theo trạng thái">
            {STATUS_TAB_DEFS.map((t) => (
              <Tab key={t.id} id={t.id}>
                {t.label}
                <span className="ml-2 text-xs font-semibold tabular-nums opacity-75">
                  {counts[t.id]}
                </span>
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </div>

      {visible.length === 0 ? (
        <div className="flex items-center justify-center px-6 py-12 text-sm text-fg-tertiary">
          Không có ca nào khớp.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-250">
            <Table
              aria-label="Danh sách ca làm việc"
              onRowAction={(key) => {
                const id = String(key);
                const target = visible.find((s) => s.id === id);
                if (target) onSelectShift(target);
              }}
            >
              <Table.Header>
                {COLUMNS.map((column) => (
                  <Table.Head
                    key={column.id}
                    id={column.id}
                    label={column.name}
                    {...(column.isRowHeader && { isRowHeader: true })}
                  />
                ))}
              </Table.Header>
              <Table.Body items={visible}>
                {(shift) => (
                  <ShiftTableRow
                    shift={shift}
                    isSelected={selectedShiftId === shift.id}
                    onSelect={onSelectShift}
                  />
                )}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </TableCard.Root>
  );
}

interface RowProps {
  shift: ShiftRecord;
  isSelected: boolean;
  onSelect: (shift: ShiftRecord) => void;
}

function ShiftTableRow({ shift, isSelected, onSelect }: RowProps) {
  const status = SHIFT_STATUS_LABELS[shift.status];
  const start = new Date(shift.startAtMs);
  const end = new Date(shift.endAtMs);
  const dayIdx = (start.getDay() === 0 ? 6 : start.getDay() - 1) as WeekDay;
  const weekday = WEEKDAY_LABELS_VI[dayIdx];

  const fillPct =
    shift.requiredCount === 0
      ? 100
      : Math.round((shift.assignedCount / shift.requiredCount) * 100);
  const progressClass =
    shift.status === "critical"
      ? "bg-error-fg"
      : shift.status === "full"
        ? "bg-success-fg"
        : "bg-warning-fg";

  return (
    <Table.Row
      id={shift.id}
      className={cn(
        "cursor-pointer",
        isSelected && "bg-info-bg/40",
      )}
    >

      <Table.Cell>
        <div className="flex min-w-0 items-center gap-2">
          <Avatar
            size="sm"
            rounded={false}
            src={getCustomerLogo(shift.customerId)?.mark ?? null}
            alt={shift.customer}
            initials={shift.customer.slice(0, 2).toUpperCase()}
            className="shrink-0"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-fg">
              {shift.customer}
            </span>
            <span className="truncate text-xs text-fg-tertiary">
              {shift.site} · {shift.region}
            </span>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold text-fg">
            {shift.name}
          </span>
          <span
            className="truncate text-xs text-fg-tertiary tabular-nums"
            title={status.label}
          >
            {shift.code}
          </span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col whitespace-nowrap">
          <span className="text-sm font-medium text-fg">{weekday}</span>
          <span className="text-xs text-fg-tertiary tabular-nums">
            {formatTimeRange(start, end)}
          </span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex w-28 flex-col gap-1">
          <div className="flex items-center justify-between text-xs tabular-nums whitespace-nowrap">
            <span className="font-semibold text-fg">
              {shift.assignedCount}/{shift.requiredCount}
            </span>
            <span className="text-fg-tertiary">{fillPct}%</span>
          </div>
          <ProgressBarBase
            value={shift.assignedCount}
            min={0}
            max={shift.requiredCount}
            className="h-1.5"
            progressClassName={progressClass}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-2 min-w-0">
          <Avatar
            size="xs"
            src={shift.operator.avatarUrl}
            alt={shift.operator.name}
            initials={shift.operator.initials}
          />
          <span className="truncate text-xs text-fg-secondary">
            {shift.operator.name}
          </span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm font-medium text-fg whitespace-nowrap tabular-nums">
          {shift.payRate}
        </span>
      </Table.Cell>
    </Table.Row>
  );
}
