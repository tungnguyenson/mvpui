"use client";

import { BadgeWithDot, Button, Input, Select, SelectItem } from "@mvp-ui/ui";
import { Pencil } from "lucide-react";
import type { ReactNode } from "react";
import {
  BATCH_STATUS_LABELS,
  PAYMENT_BATCHES,
  getCustomerPool,
  type BatchStatus,
  type PaymentBatchRecord,
} from "../worker-payment-batches-data";
import { formatDateVi } from "./formatters";
import { BatchSectionCard } from "./BatchSectionCard";

const LOCK_MATRIX: Record<string, BatchStatus[]> = {
  code: ["locked", "running", "completed"],
  cycleName: ["running", "completed"],
  periodRange: ["running", "completed"],
  payoutDate: ["completed"],
  operatedBy: ["locked", "running", "completed"],
  jobCodeAllowlist: ["running", "completed"],
  carryOver: ["running", "completed"],
};

function isLocked(field: keyof typeof LOCK_MATRIX, status: BatchStatus): boolean {
  return (LOCK_MATRIX[field] ?? []).includes(status);
}

function FieldRow({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[240px_minmax(0,1fr)] sm:gap-6">
      <div className="text-sm text-fg-tertiary">
        {required && <span className="mr-1 text-fg-error">*</span>}
        {label}
      </div>
      <div className="flex flex-col gap-1.5 text-sm text-fg">
        {children}
        {hint && <p className="text-xs text-fg-tertiary">{hint}</p>}
      </div>
    </div>
  );
}

export function BatchConfigTab({ batch }: { batch: PaymentBatchRecord }) {
  const status = BATCH_STATUS_LABELS[batch.status];
  const customers = getCustomerPool();
  const carryOverOptions = PAYMENT_BATCHES.filter((b) => b.id !== batch.id).map(
    (b) => ({ id: b.id, label: `${b.code}: ${b.cycleName}` }),
  );

  return (
    <div className="flex flex-col gap-6">
      <BatchSectionCard>
        <div className="divide-y divide-border-secondary">
          <FieldRow
            label="Code"
            required
            hint="Ví dụ: 1_7_4_2022 là mã của kỳ thanh toán SKT tháng 7 lần 4"
          >
            <Input
              defaultValue={batch.config.code}
              readOnly={isLocked("code", batch.status)}
              aria-label="Code"
            />
          </FieldRow>

          <FieldRow
            label="Tên kỳ thanh toán"
            required
            hint="Ví dụ: Kỳ thanh toán 01/2022, lần 1"
          >
            <Input
              defaultValue={batch.config.cycleName}
              readOnly={isLocked("cycleName", batch.status)}
              aria-label="Tên kỳ thanh toán"
            />
          </FieldRow>

          <FieldRow label="Thời gian phát sinh thù lao từ ngày" required>
            <div className="grid grid-cols-2 gap-3">
              <Input
                defaultValue={formatDateVi(batch.config.periodFrom)}
                readOnly={isLocked("periodRange", batch.status)}
                aria-label="Từ ngày"
              />
              <Input
                defaultValue={formatDateVi(batch.config.periodTo)}
                readOnly={isLocked("periodRange", batch.status)}
                aria-label="Đến ngày"
              />
            </div>
          </FieldRow>

          <FieldRow label="Ngày thanh toán" required>
            <Input
              defaultValue={formatDateVi(batch.config.payoutDate)}
              readOnly={isLocked("payoutDate", batch.status)}
              aria-label="Ngày thanh toán"
            />
          </FieldRow>

          <FieldRow
            label="Công ty vận hành"
            hint="Ví dụ nếu Khách hàng là Shopee nhưng do SKT vận hành thì ở đây chọn công ty là SKT"
          >
            <Select
              aria-label="Công ty vận hành"
              placeholder="Chọn công ty vận hành"
              items={customers.map((c) => ({ id: c.id, label: c.name }))}
              selectedKey={batch.config.operatedByCustomerId ?? null}
              isDisabled={isLocked("operatedBy", batch.status)}
            >
              {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
            </Select>
          </FieldRow>

          <FieldRow
            label="Giới hạn mã công việc"
            hint="Danh sách công việc cách nhau bởi dấu phẩy, và không trùng nhau. Ví dụ: 85334, 72698, 28445, 96297"
          >
            <Input
              defaultValue={batch.config.jobCodeAllowlist.join(", ")}
              readOnly={isLocked("jobCodeAllowlist", batch.status)}
              aria-label="Giới hạn mã công việc"
            />
          </FieldRow>

          <FieldRow label="Dư nợ">
            <Select
              aria-label="Dư nợ"
              placeholder="Chọn kỳ trước để kết chuyển dư nợ"
              items={carryOverOptions}
              selectedKey={batch.config.carryOverBatchId ?? null}
              isDisabled={isLocked("carryOver", batch.status)}
            >
              {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
            </Select>
          </FieldRow>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border-secondary pt-5">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-fg-tertiary">Trạng thái:</span>
            <BadgeWithDot color={status.color} type="pill-color" size="sm">
              {status.label}
            </BadgeWithDot>
            <button
              type="button"
              className="inline-flex size-7 items-center justify-center rounded-md text-fg-tertiary hover:bg-bg-secondary hover:text-fg"
              aria-label="Chỉnh sửa trạng thái"
            >
              <Pencil className="size-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {batch.status === "new" && (
              <Button color="secondary" size="sm">
                Chốt kỳ
              </Button>
            )}
            <Button color="secondary" size="sm">
              Huỷ
            </Button>
            <Button color="primary" size="sm" disabled>
              Cập nhật
            </Button>
          </div>
        </div>
      </BatchSectionCard>
    </div>
  );
}
