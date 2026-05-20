"use client";

import { Badge, Input, MetricCard, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { AlertTriangle, ChevronRight, Lock, PauseCircle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  SEVERITY_LABELS,
  VIOLATION_STATUS_LABELS,
  VIOLATION_WORKERS,
  type ViolationWorkerRecord,
} from "./worker-violations-data";
import { WorkerAvatar } from "../_shared";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "warning", label: "Đang cảnh cáo" },
  { id: "suspended", label: "Tạm đình chỉ" },
  { id: "locked", label: "Đã khóa" },
] as const;

const COLUMNS = [
  { id: "worker", name: "CTV", isRowHeader: true as const },
  { id: "cases", name: "Số vi phạm" },
  { id: "latest", name: "Mức gần nhất" },
  { id: "status", name: "Trạng thái xử lý" },
  { id: "penalty", name: "Tổng phạt" },
  { id: "detail", name: "" },
];


function ViolationRow({ record }: { record: ViolationWorkerRecord }) {
  const status = VIOLATION_STATUS_LABELS[record.status];
  const severity = SEVERITY_LABELS[record.latestSeverity];

  return (
    <Table.Row id={record.id}>
      <Table.Cell>
        <Link
          href={`/worker-violations/${record.id}`}
          className="flex items-center gap-3"
        >
          <WorkerAvatar
            name={record.workerName}
            id={record.id}
            status={record.status}
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{record.workerName}</div>
            <div className="truncate text-sm text-fg-tertiary">
              {record.district}, {record.city}
            </div>
          </div>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.totalCases} case</div>
        <div className="text-sm text-fg-tertiary">{record.latestAt}</div>
      </Table.Cell>
      <Table.Cell>
        <Badge color={severity.color} type="pill-color" size="sm">
          {severity.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">{record.totalPenalty}</div>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/worker-violations/${record.id}`}
          className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
          aria-label={`Mở chi tiết ${record.workerName}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function WorkerViolationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    return VIOLATION_WORKERS.filter((record) => {
      const matchesStatus =
        statusFilter === "all" ? true : record.status === statusFilter;
      const matchesSearch =
        search === "" ||
        record.workerName.toLowerCase().includes(search.toLowerCase()) ||
        record.phone.includes(search);
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const lockedCount = VIOLATION_WORKERS.filter((r) => r.status === "locked").length;
  const suspendedCount = VIOLATION_WORKERS.filter(
    (r) => r.status === "suspended",
  ).length;
  const severeCount = VIOLATION_WORKERS.filter(
    (r) => r.latestSeverity === "severe",
  ).length;

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">Quản lý vi phạm</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Theo dõi danh sách worker từng có vi phạm trong vận hành ca, kèm số lần,
            mức độ và trạng thái xử lý từ đội vận hành.
          </p>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label="Workers đang bị khóa"
          value={`${lockedCount}`}
          helpText="Tài khoản hiện không nhận ca được do vi phạm nghiêm trọng."
          iconChip={<Lock className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="error"
          iconPlacement="inline"
        />
        <MetricCard
          label="Workers tạm đình chỉ"
          value={`${suspendedCount}`}
          helpText="Đang trong thời gian xem xét hoặc kỷ luật ngắn hạn."
          iconChip={<PauseCircle className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="warning"
          iconPlacement="inline"
        />
        <MetricCard
          label="Vi phạm nghiêm trọng gần đây"
          value={`${severeCount}`}
          helpText="Case gần nhất ở mức nghiêm trọng cần đội vận hành theo sát."
          iconChip={<AlertTriangle className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="error"
          iconPlacement="inline"
        />
      </div>

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên CTV hoặc SĐT"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm worker vi phạm"
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
            {filtered.length} worker phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách worker vi phạm">
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
              {(record) => <ViolationRow record={record} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
