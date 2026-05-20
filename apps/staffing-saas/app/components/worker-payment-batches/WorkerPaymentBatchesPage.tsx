"use client";

import { Badge, Button, Input, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  BATCH_STATUS_LABELS,
  PAYMENT_BATCHES,
  type BatchStatus,
  type PaymentBatchRecord,
} from "./worker-payment-batches-data";
import { formatRelativeVi, formatVnd } from "./detail/formatters";

type QuickFilterId = "all" | "running" | "locked" | "completed" | "cancelled";

const QUICK_FILTERS: ReadonlyArray<{ id: QuickFilterId; label: string }> = [
  { id: "all", label: "Tất cả" },
  { id: "running", label: "Đang chạy" },
  { id: "locked", label: "Đã chốt" },
  { id: "completed", label: "Hoàn thành" },
  { id: "cancelled", label: "Đã huỷ" },
];

function matchesQuickFilter(status: BatchStatus, filter: QuickFilterId): boolean {
  if (filter === "all") return true;
  if (filter === "running") return status === "new" || status === "running";
  return status === filter;
}

const COLUMNS = [
  { id: "cycle", name: "Kỳ thanh toán", isRowHeader: true as const },
  { id: "stats", name: "Thống kê" },
  { id: "due", name: "Hạn thanh toán" },
  { id: "amount", name: "Tổng tiền" },
  { id: "status", name: "Trạng thái" },
  { id: "action", name: "" },
];

function BatchRow({ batch }: { batch: PaymentBatchRecord }) {
  const status = BATCH_STATUS_LABELS[batch.status];
  const overdue =
    batch.daysRemaining !== undefined &&
    batch.daysRemaining < 0 &&
    batch.status !== "completed" &&
    batch.status !== "cancelled";

  return (
    <Table.Row id={batch.id}>
      <Table.Cell>
        <Link
          href={`/worker-payment-batches/${batch.id}`}
          className="flex flex-col"
        >
          <span className="text-sm font-medium text-fg hover:text-fg-brand">
            {batch.cycleName}
          </span>
          <span className="text-xs text-fg-tertiary">{batch.periodRange}</span>
          <span className="font-mono text-xs text-fg-tertiary">{batch.code}</span>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <div className="grid grid-cols-[80px_auto] gap-x-2 gap-y-0.5 text-xs text-fg-tertiary">
          <span>Số CTV</span>
          <span className="font-medium text-fg tabular-nums">
            {batch.summary.workerCount.toLocaleString("vi-VN")}
          </span>
          <span>Số công ty</span>
          <span className="font-medium text-fg tabular-nums">
            {batch.summary.companyCount}
          </span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col">
          <span className="text-sm text-fg tabular-nums">{batch.dueDate}</span>
          {batch.daysRemaining !== undefined && batch.daysRemaining > 0 && (
            <span className="text-xs text-fg-error">
              (Còn {batch.daysRemaining} ngày)
            </span>
          )}
          {overdue && (
            <span className="text-xs text-fg-error">
              (Quá hạn {Math.abs(batch.daysRemaining ?? 0)} ngày)
            </span>
          )}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-right text-sm font-medium text-fg tabular-nums">
          {formatVnd(batch.summary.totalAmount, { suffix: true })}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col items-start gap-1">
          <Badge color={status.color} type="pill-color" size="sm">
            {status.label}
          </Badge>
          <span className="text-xs text-fg-tertiary">
            {formatRelativeVi(batch.timeline.updatedAt)}
          </span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/worker-payment-batches/${batch.id}`}
          className="text-sm font-medium text-fg-brand hover:underline"
        >
          Xem chi tiết
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function WorkerPaymentBatchesPage() {
  const [search, setSearch] = useState("");
  const [quickFilter, setQuickFilter] = useState<QuickFilterId>("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PAYMENT_BATCHES.filter((batch) => {
      if (!matchesQuickFilter(batch.status, quickFilter)) return false;
      if (!q) return true;
      return (
        batch.code.toLowerCase().includes(q) ||
        batch.cycleName.toLowerCase().includes(q) ||
        batch.periodRange.toLowerCase().includes(q)
      );
    });
  }, [search, quickFilter]);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-fg">Kỳ thanh toán</h1>
            <p className="max-w-3xl text-base text-fg-tertiary">
              Theo dõi mọi kỳ thù lao đã chốt và đang chạy thanh toán cho CTV.
            </p>
          </div>
          <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
            Tạo kỳ mới
          </Button>
        </div>
      }
    >
      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {QUICK_FILTERS.map((filter) => {
              const active = filter.id === quickFilter;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setQuickFilter(filter.id)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${active
                      ? "border-border-brand bg-bg-secondary text-fg"
                      : "border-border-secondary bg-bg text-fg-tertiary hover:text-fg"
                    }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo code hoặc tên kỳ"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm kỳ thanh toán"
            />
            <div className="self-center text-sm text-fg-tertiary">
              {filtered.length} kỳ phù hợp
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách kỳ thanh toán">
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
            <Table.Body
              items={filtered}
              renderEmptyState={() => (
                <div className="flex flex-col items-center gap-2 px-6 py-12 text-fg-tertiary">
                  <p className="text-sm">Chưa có kỳ thanh toán phù hợp</p>
                </div>
              )}
            >
              {(batch) => <BatchRow batch={batch} />}
            </Table.Body>
          </Table>
        </div>

        <div className="flex items-center justify-end gap-4 border-t border-border-secondary px-5 py-3 text-sm text-fg-tertiary">
          <span>
            1-{filtered.length} of {filtered.length} items
          </span>
          <span className="rounded-md border border-border-secondary px-2 py-1 text-xs text-fg">
            20 / trang
          </span>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
