"use client";

import { Badge, Input, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { ChevronRight, Clock, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  TIMESHEETS,
  TIMESHEET_STATUS_LABELS,
  type TimesheetRecord,
} from "./timesheets-data";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "in-progress", label: "Đang diễn ra" },
  { id: "needs-review", label: "Cần duyệt" },
  { id: "exception", label: "Có bất thường" },
] as const;

const COLUMNS = [
  { id: "shift", name: "Ca chấm công", isRowHeader: true as const },
  { id: "customer", name: "Khách hàng" },
  { id: "date", name: "Ngày" },
  { id: "fill", name: "Check-in" },
  { id: "exceptions", name: "Bất thường" },
  { id: "status", name: "Trạng thái" },
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

function TimesheetRow({ record }: { record: TimesheetRecord }) {
  const status = TIMESHEET_STATUS_LABELS[record.status];

  return (
    <Table.Row id={record.id}>
      <Table.Cell>
        <Link href={`/timesheets/${record.id}`} className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg">
            <Clock className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{record.shiftName}</div>
            <div className="truncate text-sm text-fg-tertiary">
              {record.shiftCode} • {record.schedule}
            </div>
          </div>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.customer}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg-tertiary">{record.date}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">
          {record.checkedInCount}/{record.expectedCount}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.exceptions}</div>
      </Table.Cell>
      <Table.Cell>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/timesheets/${record.id}`}
          className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
          aria-label={`Mở chi tiết ${record.shiftName}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function TimesheetsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    return TIMESHEETS.filter((record) => {
      const matchesStatus =
        statusFilter === "all" ? true : record.status === statusFilter;
      const matchesSearch =
        search === "" ||
        record.shiftName.toLowerCase().includes(search.toLowerCase()) ||
        record.customer.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const inProgress = TIMESHEETS.filter((r) => r.status === "in-progress").length;
  const exceptions = TIMESHEETS.reduce((sum, r) => sum + r.exceptions, 0);
  const closed = TIMESHEETS.filter((r) => r.status === "closed").length;

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">Chấm công</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Theo dõi chấm công theo từng ca làm việc, tỷ lệ check-in và các bất thường
            cần điều phối duyệt trước khi tính lương.
          </p>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <SummaryCard
          label="Ca đang diễn ra"
          value={`${inProgress}`}
          description="Workers còn đang trong ca, chưa hoàn tất chấm công."
        />
        <SummaryCard
          label="Bất thường chờ xử lý"
          value={`${exceptions}`}
          description="Trường hợp đi trễ, vắng mặt hoặc thiếu check-out cần xem lại."
        />
        <SummaryCard
          label="Ca đã chốt"
          value={`${closed}`}
          description="Số ca đã chốt chấm công, sẵn sàng đẩy sang đối soát."
        />
      </div>

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên ca hoặc khách hàng"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm chấm công"
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
            {filtered.length} ca chấm công phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách chấm công theo ca">
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
              {(record) => <TimesheetRow record={record} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
