"use client";

import {
  Badge,
  Checkbox,
  HintText,
  Input,
  Select,
  SelectItem,
  TextArea,
} from "@mvp-ui/ui";
import { ExternalLink } from "lucide-react";
import { SectionCard } from "../SectionCard";
import { useWizard } from "../wizardContext";
import { PAY_CYCLE_OPTIONS } from "../sample-data";
import type { PayUnit } from "../types";

const APPROVAL_LABELS: Record<
  "pending" | "approved" | "rejected",
  { label: string; color: "warning" | "success" | "error" }
> = {
  pending: { label: "Chờ duyệt", color: "warning" },
  approved: { label: "Đã duyệt", color: "success" },
  rejected: { label: "Từ chối", color: "error" },
};

export function PayStep() {
  const { preStep, form, setPay } = useWizard();
  const pay = form.pay;
  const cfg = preStep.pricingConfigs.find((c) => c.id === pay.pricingConfigId);
  const cycle = PAY_CYCLE_OPTIONS.find((c) => c.id === pay.payCycle);
  const approval = APPROVAL_LABELS[pay.adhocBonusApprovalStatus];

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Cấu hình cước phí"
        description="Nguồn duy nhất để tính lương CTV, phí dịch vụ và biên lợi nhuận gộp."
      >
        {preStep.pricingConfigs.length > 1 ? (
          <Select
            label="Cấu hình cước phí"
            isRequired
            selectedKey={pay.pricingConfigId || null}
            onSelectionChange={(key) =>
              setPay({ pricingConfigId: (key as string) ?? "" })
            }
            items={preStep.pricingConfigs.map((c) => ({
              id: c.id,
              label: `${c.name} (áp dụng từ ${c.appliedFrom} đến ${c.appliedTo})`,
            }))}
          >
            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
          </Select>
        ) : cfg ? (
          <a
            href={`/customers/${preStep.companyId}#pricing-${cfg.id}`}
            className="inline-flex items-center gap-1.5 text-sm text-fg-brand"
          >
            {cfg.name} (áp dụng từ {cfg.appliedFrom} đến {cfg.appliedTo})
            <ExternalLink className="size-3.5" />
          </a>
        ) : (
          <p className="text-sm text-fg-tertiary">Chưa có cấu hình phù hợp.</p>
        )}
      </SectionCard>

      <SectionCard title="Thu nhập" description="Tính từ cấu hình cước phí và lịch ở Bước 2.">
        <PreviewRow label="Thu nhập dự tính" value="162.500đ/ca" />
        <button
          type="button"
          className="self-start text-sm text-fg-brand"
        >
          Click để xem chi tiết
        </button>
        <div className="rounded-lg border border-dashed border-border-secondary bg-bg-secondary p-4 text-sm text-fg-tertiary">
          Phần chi tiết (đơn giá CTV, phí dịch vụ, tổng chi phí khách hàng) sẽ cập nhật khi có dữ liệu thật từ pricing config.
        </div>
        <PreviewRow label="% Biên LN gộp" value="5%" />
      </SectionCard>

      <SectionCard
        title="Thưởng thêm"
        description="Phần do công ty staffing tự chi (KHÔNG tính vào khách hàng). Cần duyệt trước khi đăng tin."
      >
        <Checkbox
          size="sm"
          label="Có thưởng thêm"
          isSelected={pay.hasAdhocBonus}
          onChange={(isSelected) => setPay({ hasAdhocBonus: isSelected })}
        />
        {pay.hasAdhocBonus ? (
          <div className="flex flex-col gap-4 rounded-lg border border-border-secondary bg-bg-secondary p-4">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <Input
                label="Số tiền thưởng"
                type="number"
                min={1000}
                isRequired
                value={
                  pay.adhocBonusAmount === null ? "" : String(pay.adhocBonusAmount)
                }
                onChange={(e) =>
                  setPay({
                    adhocBonusAmount:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
                hint={
                  pay.adhocBonusAmount
                    ? `Hiển thị: +${pay.adhocBonusAmount.toLocaleString("vi-VN")}đ/${pay.adhocBonusUnit === "shift" ? "ca" : "h"}`
                    : "Đơn vị: VNĐ"
                }
              />
              <UnitToggle
                value={pay.adhocBonusUnit}
                onChange={(unit) => setPay({ adhocBonusUnit: unit })}
              />
            </div>
            <TextArea
              label="Lý do"
              isRequired
              value={pay.adhocBonusReason}
              onChange={(value) => setPay({ adhocBonusReason: value })}
              rows={3}
              hint="Trình bày lý do để người duyệt đánh giá (tối thiểu 20 ký tự)."
            />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-fg-secondary">Trạng thái duyệt:</span>
              <Badge color={approval.color} type="pill-color" size="sm">
                {approval.label}
              </Badge>
            </div>
            <HintText>* Cần được duyệt trước khi tin đăng được công khai.</HintText>
          </div>
        ) : null}
      </SectionCard>

      <SectionCard title="Thanh toán">
        <Select
          label="Chu kỳ thanh toán"
          isRequired
          selectedKey={pay.payCycle}
          onSelectionChange={(key) => setPay({ payCycle: (key as string) ?? "" })}
          items={PAY_CYCLE_OPTIONS.map((c) => ({ id: c.id, label: c.label }))}
        >
          {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
        </Select>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg-secondary">
            Hình thức trả lương
          </span>
          <div className="rounded-lg bg-bg-secondary p-3 text-sm text-fg">
            {cycle?.policy ?? "—"}
          </div>
          <HintText>
            Ví dụ: Trả liền, tiền mặt hoặc Momo · Trả hàng tháng, ngày 01-05 · Trả 2 lần/ tháng, vào ngày 15 - 20 và 01 - 05
          </HintText>
        </div>
      </SectionCard>
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-fg-secondary">{label}</span>
      <span className="text-base font-semibold text-fg">{value}</span>
    </div>
  );
}

function UnitToggle({
  value,
  onChange,
}: {
  value: PayUnit;
  onChange: (unit: PayUnit) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-bg p-0.5">
      {(["shift", "hour"] as PayUnit[]).map((unit) => (
        <button
          key={unit}
          type="button"
          onClick={() => onChange(unit)}
          className={
            unit === value
              ? "rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-fg"
              : "rounded-md px-3 py-1.5 text-sm text-fg-secondary"
          }
        >
          {unit === "shift" ? "/ca" : "/h"}
        </button>
      ))}
    </div>
  );
}
