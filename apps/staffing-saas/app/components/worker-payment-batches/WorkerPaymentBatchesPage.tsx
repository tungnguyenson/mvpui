"use client";

import { Badge, Input, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { ChevronRight, CreditCard, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  BATCH_STATUS_LABELS,
  PAYMENT_BATCHES,
  type PaymentBatchRecord,
} from "./worker-payment-batches-data";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "pending", label: "Chờ duyệt" },
  { id: "approved", label: "Đã duyệt" },
  { id: "paid", label: "Đã thanh toán" },
] as const;

const COLUMNS = [
  { id: "batch", name: "Mã batch", isRowHeader: true as const },
  { id: "period", name: "Kỳ thanh toán" },
  { id: "workers", name: "Số CTV" },
  { id: "amount", name: "Tổng tiền" },
  { id: "status", name: "Trạng thái" },
  { id: "payout", name: "Ngày chi trả" },
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

function BatchRow({ batch }: { batch: PaymentBatchRecord }) {
  const status = BATCH_STATUS_LABELS[batch.status];

  return (
    <Table.Row id={batch.id}>
      <Table.Cell>
        <Link
          href={`/worker-payment-batches/${batch.id}`}
          className="flex items-center gap-3"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg">
            <CreditCard className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{batch.code}</div>
            <div className="truncate text-sm text-fg-tertiary">{batch.createdBy}</div>
          </div>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{batch.period}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{batch.workerCount}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">{batch.netAmount}</div>
      </Table.Cell>
      <Table.Cell>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg-tertiary">{batch.payoutDate}</div>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/worker-payment-batches/${batch.id}`}
          className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
          aria-label={`Mở chi tiết ${batch.code}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function WorkerPaymentBatchesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    return PAYMENT_BATCHES.filter((batch) => {
      const matchesStatus =
        statusFilter === "all" ? true : batch.status === statusFilter;
      const matchesSearch =
        search === "" ||
        batch.code.toLowerCase().includes(search.toLowerCase()) ||
        batch.period.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const pendingCount = PAYMENT_BATCHES.filter((b) => b.status === "pending").length;
  const paidCount = PAYMENT_BATCHES.filter((b) => b.status === "paid").length;
  const totalWorkers = PAYMENT_BATCHES.reduce((s, b) => s + b.workerCount, 0);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">Thanh toán CTV</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Quản lý các batch thanh toán cho cộng tác viên theo từng chu kỳ, từ giai đoạn
            duyệt nội bộ đến khi hoàn tất chuyển khoản.
          </p>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <SummaryCard
          label="Batch chờ duyệt"
          value={`${pendingCount}`}
          description="Các batch cần kế toán hoặc CFO xem trước khi chạy chi trả."
        />
        <SummaryCard
          label="Batch đã thanh toán"
          value={`${paidCount}`}
          description="Đã hoàn tất chuyển khoản trong các chu kỳ gần đây."
        />
        <SummaryCard
          label="Tổng lượt CTV"
          value={`${totalWorkers}`}
          description="Số lượt worker được tính lương trong các batch hiển thị."
        />
      </div>

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo mã batch hoặc kỳ thanh toán"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm batch thanh toán"
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
            {filtered.length} batch phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách batch thanh toán">
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
              {(batch) => <BatchRow batch={batch} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
