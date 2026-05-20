"use client";

import { Badge, Input, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { CalendarDays, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "./PageScaffold";
import {
  SHIFTS,
  SHIFT_STATUS_LABELS,
  type ShiftRecord,
} from "./shifts-data";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "critical", label: "Thiếu gấp" },
  { id: "open", label: "Đang mở" },
  { id: "full", label: "Đủ người" },
] as const;

const COLUMNS = [
  { id: "shift", name: "Ca làm việc", isRowHeader: true as const },
  { id: "customer", name: "Khách hàng" },
  { id: "schedule", name: "Lịch" },
  { id: "fill", name: "Tiến độ" },
  { id: "status", name: "Trạng thái" },
  { id: "pay", name: "Pay rate" },
  { id: "detail", name: "" },
];

function SummaryCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs">
      <p className="text-sm font-medium text-fg-tertiary">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-fg">{value}</p>
      <p className="mt-2 text-sm text-fg-tertiary">{description}</p>
    </div>
  );
}

function ShiftRow({ shift }: { shift: ShiftRecord }) {
  const status = SHIFT_STATUS_LABELS[shift.status];

  return (
    <Table.Row id={shift.id}>
      <Table.Cell>
        <Link href={`/shifts/${shift.id}`} className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg">
            <CalendarDays className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{shift.name}</div>
            <div className="truncate text-sm text-fg-tertiary">{shift.site}</div>
          </div>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{shift.customer}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg-tertiary">{shift.schedule}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">
          {shift.assignedCount}/{shift.requiredCount}
        </div>
      </Table.Cell>
      <Table.Cell>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{shift.payRate}</div>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/shifts/${shift.id}`}
          className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
          aria-label={`Mở chi tiết ${shift.name}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function ShiftsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    return SHIFTS.filter((shift) => {
      const matchesStatus =
        statusFilter === "all" ? true : shift.status === statusFilter;
      const matchesSearch =
        search === "" ||
        shift.name.toLowerCase().includes(search.toLowerCase()) ||
        shift.customer.toLowerCase().includes(search.toLowerCase()) ||
        shift.site.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const openCount = SHIFTS.filter(
    (s) => s.status === "open" || s.status === "filling",
  ).length;
  const criticalCount = SHIFTS.filter((s) => s.status === "critical").length;
  const totalAssigned = SHIFTS.reduce((sum, s) => sum + s.assignedCount, 0);
  const totalRequired = SHIFTS.reduce((sum, s) => sum + s.requiredCount, 0);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">Lịch làm việc</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Theo dõi các ca làm việc đã mở cho khách hàng, tiến độ fill workers và trạng
            thái vận hành theo từng ca.
          </p>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <SummaryCard
          label="Ca đang mở"
          value={`${openCount}`}
          description="Các ca cần đội vận hành tiếp tục bổ sung workers."
        />
        <SummaryCard
          label="Ca thiếu gấp"
          value={`${criticalCount}`}
          description="Ca có tỉ lệ fill thấp và cần phản ứng nhanh."
        />
        <SummaryCard
          label="Tiến độ fill"
          value={`${totalAssigned}/${totalRequired}`}
          description="Tổng số worker đã nhận ca so với headcount yêu cầu."
        />
      </div>

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên ca, khách hàng hoặc địa điểm"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm ca làm việc"
            />
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const active = filter.id === statusFilter;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setStatusFilter(filter.id)}
                    className={`rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "border-border-brand bg-bg-secondary text-fg"
                        : "border-border-secondary bg-bg text-fg-tertiary hover:text-fg"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="text-sm text-fg-tertiary">
            {filtered.length} ca phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách ca làm việc">
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
            <Table.Body items={filtered}>
              {(shift) => <ShiftRow shift={shift} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
