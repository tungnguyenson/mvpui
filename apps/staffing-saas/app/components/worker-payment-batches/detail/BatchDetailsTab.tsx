"use client";

import { Badge, Button, Input, Select, SelectItem, Table } from "@mvp-ui/ui";
import Link from "next/link";
import { CheckCircle2, Download, Search, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import {
  PAYOUT_METHOD_LABELS,
  PAYOUT_STATUS_LABELS,
  type BatchLineItem,
  type PayoutMethod,
  type PayoutStatus,
  type PaymentBatchRecord,
} from "../worker-payment-batches-data";
import { formatHours, formatVnd } from "./formatters";

const METHOD_OPTIONS = [
  { id: "all", label: "Tất cả phương thức" },
  { id: "bank", label: PAYOUT_METHOD_LABELS.bank },
  { id: "ewallet", label: PAYOUT_METHOD_LABELS.ewallet },
  { id: "cash", label: PAYOUT_METHOD_LABELS.cash },
];

const STATUS_OPTIONS = [
  { id: "all", label: "Tất cả trạng thái" },
  { id: "processing", label: PAYOUT_STATUS_LABELS.processing.label },
  { id: "transferred", label: PAYOUT_STATUS_LABELS.transferred.label },
  { id: "rejected", label: PAYOUT_STATUS_LABELS.rejected.label },
  { id: "invalid_account", label: PAYOUT_STATUS_LABELS.invalid_account.label },
];

const COLUMNS = [
  { id: "worker", name: "Cộng tác viên", isRowHeader: true as const },
  { id: "method", name: "Phương thức nhận tiền" },
  { id: "hours", name: "Số giờ công" },
  { id: "net", name: "Thực nhận" },
  { id: "payslip", name: "Phiếu lương" },
  { id: "status", name: "Trạng thái" },
];

function LineRow({ item }: { item: BatchLineItem }) {
  const status = PAYOUT_STATUS_LABELS[item.payoutStatus];
  return (
    <Table.Row id={item.workerId}>
      <Table.Cell>
        <div className="flex flex-col">
          <Link
            href={`/workers/${item.workerId}`}
            className="text-sm font-medium text-fg hover:text-fg-brand"
          >
            {item.workerName}
          </Link>
          <span className="text-xs text-fg-tertiary">MS: {item.workerCode}</span>
          <span className="text-xs text-fg-tertiary">{item.workerPhoneMasked}</span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-fg">
              {PAYOUT_METHOD_LABELS[item.payoutMethod]}
            </span>
            {item.bankVerified && (
              <CheckCircle2 className="size-4 text-fg-success" aria-label="Đã xác thực" />
            )}
          </div>
          {item.bankAccountMasked && (
            <span className="text-xs text-fg-tertiary tabular-nums">
              {item.bankAccountMasked}
            </span>
          )}
          <span className="text-xs italic text-fg-tertiary">
            [Tên CTV trùng khớp]
          </span>
          {item.bankName && (
            <span className="text-xs text-fg-tertiary">{item.bankName}</span>
          )}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-right text-sm text-fg tabular-nums">
          {formatHours(item.totalHours)}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-right text-sm font-medium text-fg tabular-nums">
          {formatVnd(item.netAmount, { suffix: true })}
        </div>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/worker-payment-batches/payslip/${item.workerId}`}
          className="text-sm font-medium text-fg-brand hover:underline"
        >
          Chi tiết
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
    </Table.Row>
  );
}

export function BatchDetailsTab({ batch }: { batch: PaymentBatchRecord }) {
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState<PayoutMethod | "all">("all");
  const [status, setStatus] = useState<PayoutStatus | "all">("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return batch.items
      .filter((item) => {
        if (method !== "all" && item.payoutMethod !== method) return false;
        if (status !== "all" && item.payoutStatus !== status) return false;
        if (!q) return true;
        return (
          item.workerName.toLowerCase().includes(q) ||
          item.workerCode.toLowerCase().includes(q)
        );
      })
      .map((item) => ({ ...item, id: item.workerId }));
  }, [batch.items, search, method, status]);

  function handleReset() {
    setSearch("");
    setMethod("all");
    setStatus("all");
  }

  const invalidCount = batch.summary.invalidAccountCount;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span>
            <span className="text-fg-tertiary">Tổng thực nhận: </span>
            <span className="font-semibold text-fg tabular-nums">
              {formatVnd(batch.summary.totalNetAmount, { suffix: true })}
            </span>
          </span>
          <span>
            <span className="text-fg-tertiary">Số CTV: </span>
            <span className="font-medium text-fg tabular-nums">
              {batch.summary.workerCount.toLocaleString("vi-VN")}
            </span>
          </span>
          <span>
            <span className="text-fg-tertiary">Tổng giờ công: </span>
            <span className="font-medium text-fg tabular-nums">
              {formatHours(batch.summary.totalHours)}
            </span>
          </span>
          <span>
            <span className="text-fg-tertiary">TK nhận tiền không hợp lệ: </span>
            <span
              className={`tabular-nums ${
                invalidCount > 0
                  ? "font-semibold text-fg-error"
                  : "text-fg-tertiary"
              }`}
            >
              {invalidCount}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button color="secondary" size="sm" iconLeading={<Download className="size-4" />}>
            Export
          </Button>
          <Button color="secondary" size="sm" iconLeading={<Upload className="size-4" />}>
            Import
          </Button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Tìm tên, mã CTV"
          iconLeading={<Search className="size-4" />}
          aria-label="Tìm cộng tác viên"
        />
        <Select
          aria-label="Phương thức nhận tiền"
          placeholder="Phương thức nhận tiền"
          items={METHOD_OPTIONS}
          selectedKey={method}
          onSelectionChange={(key) => setMethod(key as PayoutMethod | "all")}
        >
          {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
        </Select>
        <Select
          aria-label="Trạng thái thanh toán"
          placeholder="Trạng thái thanh toán"
          items={STATUS_OPTIONS}
          selectedKey={status}
          onSelectionChange={(key) => setStatus(key as PayoutStatus | "all")}
        >
          {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
        </Select>
        <Button color="link-gray" size="sm" onClick={handleReset}>
          Huỷ lọc
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border-secondary bg-bg shadow-xs">
        <div className="overflow-x-auto">
          <Table aria-label="Danh sách thanh toán CTV">
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
                  Không có CTV phù hợp bộ lọc
                </p>
              )}
            >
              {(item) => <LineRow item={item} />}
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
