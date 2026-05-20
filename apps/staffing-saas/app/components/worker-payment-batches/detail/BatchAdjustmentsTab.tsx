"use client";

import { Button, Input, Select, SelectItem, Table } from "@mvp-ui/ui";
import Link from "next/link";
import { CheckCircle2, Clock, Download, MoreHorizontal, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ADJUSTMENT_KIND_LABELS,
  type AdjustmentKind,
  type BatchAdjustment,
  type PaymentBatchRecord,
} from "../worker-payment-batches-data";
import { formatTimeDateVi, formatVnd } from "./formatters";

const KIND_OPTIONS = [
  { id: "all", label: "Tất cả loại" },
  { id: "debt", label: ADJUSTMENT_KIND_LABELS.debt },
  { id: "offset", label: ADJUSTMENT_KIND_LABELS.offset },
  { id: "adhoc_other", label: ADJUSTMENT_KIND_LABELS.adhoc_other },
];

const COLUMNS = [
  { id: "worker", name: "Cộng tác viên", isRowHeader: true as const },
  { id: "job", name: "Mã việc" },
  { id: "date", name: "Ngày" },
  { id: "kind", name: "Loại thanh toán" },
  { id: "amount", name: "Số tiền" },
  { id: "description", name: "Nội dung" },
  { id: "pic", name: "PIC" },
  { id: "status", name: "" },
];

function AdjustmentRow({ adj }: { adj: BatchAdjustment }) {
  const isCredit = adj.amount > 0;
  return (
    <Table.Row id={adj.id}>
      <Table.Cell>
        <div className="flex flex-col">
          <Link
            href={`/workers/${adj.workerId}`}
            className="text-sm font-medium text-fg hover:text-fg-brand"
          >
            {adj.workerName}
          </Link>
          <span className="text-xs text-fg-tertiary">MS: {adj.workerCode}</span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <span className="font-mono text-sm text-fg">{adj.jobCode ?? ""}</span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-fg tabular-nums">{adj.transactionDate}</span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-fg">{ADJUSTMENT_KIND_LABELS[adj.kind]}</span>
      </Table.Cell>
      <Table.Cell>
        <div
          className={`text-right font-mono text-sm font-medium tabular-nums ${
            isCredit ? "text-fg-success" : "text-fg-error"
          }`}
        >
          {formatVnd(adj.amount, { suffix: true, sign: isCredit })}
        </div>
      </Table.Cell>
      <Table.Cell>
        <span className="line-clamp-1 text-sm text-fg" title={adj.description}>
          {adj.description}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-fg-tertiary">{adj.picHandle}</span>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center justify-end gap-1">
          {adj.confirmed ? (
            <CheckCircle2 className="size-4 text-fg-success" aria-label="Đã xác nhận" />
          ) : (
            <Clock className="size-4 text-fg-warning" aria-label="Chờ xác nhận" />
          )}
          <button
            type="button"
            className="inline-flex size-7 items-center justify-center rounded-md text-fg-tertiary hover:bg-bg-secondary hover:text-fg"
            aria-label="Tuỳ chọn"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

export function BatchAdjustmentsTab({ batch }: { batch: PaymentBatchRecord }) {
  const [search, setSearch] = useState("");
  const [jobCode, setJobCode] = useState("");
  const [kind, setKind] = useState<AdjustmentKind | "all">("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const j = jobCode.trim().toLowerCase();
    return batch.adjustments.filter((adj) => {
      if (kind !== "all" && adj.kind !== kind) return false;
      if (j && !(adj.jobCode ?? "").toLowerCase().includes(j)) return false;
      if (!q) return true;
      return (
        adj.workerName.toLowerCase().includes(q) ||
        adj.workerCode.toLowerCase().includes(q)
      );
    });
  }, [batch.adjustments, search, jobCode, kind]);

  const total = batch.adjustments.reduce((s, a) => s + a.amount, 0);

  function handleReset() {
    setSearch("");
    setJobCode("");
    setKind("all");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-sm">
          {batch.adjustmentsConfirmedAt && batch.adjustmentsConfirmedBy ? (
            <span className="text-fg-tertiary">
              Đã xác nhận lúc {formatTimeDateVi(batch.adjustmentsConfirmedAt)} bởi{" "}
              <Link
                href={`/users/${batch.adjustmentsConfirmedBy}`}
                className="font-medium text-fg-brand hover:underline"
              >
                {batch.adjustmentsConfirmedBy}
              </Link>
            </span>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-fg-error">Chưa xác nhận</span>
              <Button color="primary" size="sm">
                Xác nhận khoản điều chỉnh
              </Button>
            </div>
          )}
        </div>
        <Button color="secondary" size="sm" iconLeading={<Download className="size-4" />}>
          Export
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span>
          <span className="text-fg-tertiary">Tổng tiền: </span>
          <span className="font-semibold text-fg tabular-nums">
            {formatVnd(total, { suffix: true })}
          </span>
        </span>
        <span>
          <span className="text-fg-tertiary">Số giao dịch: </span>
          <span className="font-medium text-fg tabular-nums">
            {batch.adjustments.length}
          </span>
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Tìm tên, mã CTV"
          iconLeading={<Search className="size-4" />}
          aria-label="Tìm cộng tác viên"
        />
        <Input
          value={jobCode}
          onChange={(event) => setJobCode(event.target.value)}
          placeholder="Mã việc"
          aria-label="Mã việc"
        />
        <Select
          aria-label="Loại giao dịch"
          placeholder="Loại giao dịch"
          items={KIND_OPTIONS}
          selectedKey={kind}
          onSelectionChange={(key) => setKind(key as AdjustmentKind | "all")}
        >
          {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
        </Select>
        <Button color="link-gray" size="sm" onClick={handleReset}>
          Huỷ lọc
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border-secondary bg-bg shadow-xs">
        <div className="overflow-x-auto">
          <Table aria-label="Các khoản điều chỉnh">
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
                <p className="px-6 py-12 text-center text-sm text-fg-tertiary">
                  Không có khoản điều chỉnh phù hợp
                </p>
              )}
            >
              {(adj) => <AdjustmentRow adj={adj} />}
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
      </div>
    </div>
  );
}

