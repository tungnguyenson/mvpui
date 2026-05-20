"use client";

import { Badge, Input, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { Calculator, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "./PageScaffold";
import {
  RECONCILIATIONS,
  RECON_STATUS_LABELS,
  type ReconciliationRecord,
} from "./reconciliations-data";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "open", label: "Đang đối soát" },
  { id: "pending-approval", label: "Chờ duyệt" },
  { id: "approved", label: "Đã chốt" },
  { id: "disputed", label: "Tranh chấp" },
] as const;

const COLUMNS = [
  { id: "period", name: "Kỳ đối soát", isRowHeader: true as const },
  { id: "customer", name: "Khách hàng" },
  { id: "shifts", name: "Số ca" },
  { id: "amount", name: "Tổng tiền" },
  { id: "variance", name: "Chênh lệch" },
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

function ReconRow({ record }: { record: ReconciliationRecord }) {
  const status = RECON_STATUS_LABELS[record.status];

  return (
    <Table.Row id={record.id}>
      <Table.Cell>
        <Link
          href={`/reconciliations/${record.id}`}
          className="flex items-center gap-3"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg">
            <Calculator className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{record.code}</div>
            <div className="truncate text-sm text-fg-tertiary">{record.period}</div>
          </div>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.customer}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.totalShifts}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">{record.totalAmount}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.variance}</div>
        <div className="text-sm text-fg-tertiary">{record.variancePercent}</div>
      </Table.Cell>
      <Table.Cell>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/reconciliations/${record.id}`}
          className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
          aria-label={`Mở chi tiết ${record.code}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function ReconciliationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    return RECONCILIATIONS.filter((record) => {
      const matchesStatus =
        statusFilter === "all" ? true : record.status === statusFilter;
      const matchesSearch =
        search === "" ||
        record.code.toLowerCase().includes(search.toLowerCase()) ||
        record.customer.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const pendingCount = RECONCILIATIONS.filter(
    (r) => r.status === "pending-approval" || r.status === "open",
  ).length;
  const disputedCount = RECONCILIATIONS.filter((r) => r.status === "disputed").length;
  const approvedCount = RECONCILIATIONS.filter((r) => r.status === "approved").length;

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">Đối soát</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Đối soát số liệu ca làm việc, chấm công và thanh toán theo từng khách hàng,
            quản lý chênh lệch và phê duyệt nội bộ.
          </p>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <SummaryCard
          label="Phiếu đang xử lý"
          value={`${pendingCount}`}
          description="Đang đối chiếu hoặc đợi khách hàng duyệt chênh lệch."
        />
        <SummaryCard
          label="Phiếu tranh chấp"
          value={`${disputedCount}`}
          description="Cần đội vận hành và CSKH phối hợp xử lý ngay."
        />
        <SummaryCard
          label="Phiếu đã chốt"
          value={`${approvedCount}`}
          description="Số đối soát đã được khách hàng phê duyệt và đóng phiếu."
        />
      </div>

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo mã đối soát hoặc khách hàng"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm đối soát"
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
            {filtered.length} phiếu phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách phiếu đối soát">
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
              {(record) => <ReconRow record={record} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
