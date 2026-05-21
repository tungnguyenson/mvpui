"use client";

import {
  BadgeWithDot,
  Button,
  Input,
  InputFile,
  Select,
  SelectItem,
  TextArea,
  Toggle,
} from "@mvp-ui/ui";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { type ReactNode, useState } from "react";
import {
  CUSTOMER_PRICING_SHIFT_LABELS,
  CUSTOMER_PRICING_STATUS_LABELS,
  type CustomerPricingConfig,
  type CustomerPricingRate,
  type CustomerPricingShiftType,
  type CustomerPricingStatus,
} from "../customer-detail-data";
import { SectionCard } from "./SectionCard";

interface PricingDetailViewProps {
  config: CustomerPricingConfig;
  customerName: string;
  backHref: string;
}

interface PricingFormState {
  name: string;
  serviceClass: string;
  shortShift: string;
  contract: string;
  nightStart: string;
  nightEnd: string;
  appliedFrom: string;
  appliedTo: string;
  quoteLink: string;
  ctvNote: string;
  jobDescription: string;
  internalNote: string;
  cancelViolation: boolean;
  status: CustomerPricingStatus;
  rates: CustomerPricingRate[];
}

const SERVICE_CLASS_OPTIONS = [
  { id: "Linh hoạt", label: "Linh hoạt" },
  { id: "Cố định", label: "Cố định" },
  { id: "Trọn gói", label: "Trọn gói" },
];

const SHORT_SHIFT_OPTIONS = [
  { id: "none", label: "Không áp dụng" },
  { id: "4h", label: "Ca 4 giờ" },
  { id: "6h", label: "Ca 6 giờ" },
];

const STATUS_OPTIONS: { id: CustomerPricingStatus; label: string }[] = [
  { id: "active", label: "Đang hoạt động" },
  { id: "inactive", label: "Ngừng hoạt động" },
];

function toFormState(config: CustomerPricingConfig): PricingFormState {
  return {
    name: config.name,
    serviceClass: config.serviceClass,
    shortShift: "none",
    contract: "",
    nightStart: "22:00",
    nightEnd: "06:00",
    appliedFrom: config.appliedFrom,
    appliedTo: config.appliedTo,
    quoteLink: `https://ops.viec.co/companies/${config.id}/pricing-configs/${config.id}`,
    ctvNote: "",
    jobDescription: "",
    internalNote: "",
    cancelViolation: true,
    status: config.status,
    rates: config.rates.map((r) => ({ ...r })),
  };
}

export function PricingDetailView({ config, customerName, backHref }: PricingDetailViewProps) {
  const [form, setForm] = useState<PricingFormState>(() => toFormState(config));

  const update = <K extends keyof PricingFormState>(key: K, value: PricingFormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const updateRate = (shiftType: CustomerPricingShiftType, patch: Partial<CustomerPricingRate>) =>
    setForm((prev) => ({
      ...prev,
      rates: prev.rates.map((r) => (r.shiftType === shiftType ? { ...r, ...patch } : r)),
    }));

  return (
    <div className="flex w-full flex-col gap-6 pb-24">
      <div className="flex flex-col gap-2 border-b border-border-secondary pb-5">
        <Link
          href={backHref}
          scroll={false}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-fg-tertiary hover:text-fg"
        >
          <ArrowLeft className="size-4" /> Quay lại danh sách cấu hình
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-semibold text-fg">Cấu hình giá: {config.name}</h3>
          <BadgeWithDot
            color={
              CUSTOMER_PRICING_STATUS_LABELS[config.status].color === "success"
                ? "success"
                : "error"
            }
            type="pill-color"
            size="md"
          >
            {CUSTOMER_PRICING_STATUS_LABELS[config.status].label}
          </BadgeWithDot>
        </div>
        {/* <p className="text-sm text-fg-tertiary">
          Cấu hình #{config.id} · {customerName} · {config.province}
        </p> */}
      </div>

      <SectionCard title="Thông tin cấu hình" bodyClassName="px-5 divide-y divide-border-secondary">
        <FormRow
          label="Tên cấu hình"
          required
          description="Hiển thị nội bộ trên danh sách cấu hình giá & phí."
        >
          <Input
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </FormRow>
        <FormRow label="Phân loại dịch vụ" required>
          <Select
            aria-label="Phân loại dịch vụ"
            items={SERVICE_CLASS_OPTIONS}
            selectedKey={form.serviceClass}
            onSelectionChange={(key) => update("serviceClass", String(key))}
          >
            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
          </Select>
        </FormRow>
        <FormRow label="Tỉnh / Thành phố" description="Cố định khi tạo cấu hình.">
          <ReadOnlyValue>{config.province}</ReadOnlyValue>
        </FormRow>
        <FormRow label="Danh mục" description="Cố định khi tạo cấu hình.">
          <ReadOnlyValue>{config.category}</ReadOnlyValue>
        </FormRow>
        <FormRow label="Loại việc" description="Cố định khi tạo cấu hình.">
          <ReadOnlyValue>{config.jobType}</ReadOnlyValue>
        </FormRow>
      </SectionCard>

      <SectionCard
        title="Cấu hình chi trả & mức phí"
        description="Mức chi trả cho cộng tác viên và mức phí thu khách hàng theo từng loại ca."
        bodyClassName="overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-180 border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-secondary bg-bg-secondary/40 text-left text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
                <th className="px-4 py-3 w-76">Loại ca</th>
                <th className="px-4 py-3 text-right w-30">
                  Mức chi trả
                  <br />
                  <span className="font-normal normal-case text-fg-tertiary">VNĐ / giờ</span>
                </th>
                <th className="px-4 py-3 text-right w-30">
                  Mức phí
                  <br />
                  <span className="font-normal normal-case text-fg-tertiary">VNĐ / giờ</span>
                </th>
                <th className="px-4 py-3 text-center w-30">GM0</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {form.rates.map((rate, idx) => (
                <tr
                  key={rate.shiftType}
                  className={
                    idx === form.rates.length - 1
                      ? ""
                      : "border-b border-border-secondary"
                  }
                >
                  <td className="px-4 py-3 align-middle">
                    <span className="font-medium text-fg">
                      {CUSTOMER_PRICING_SHIFT_LABELS[rate.shiftType]}
                    </span>
                  </td>
                  <td className="px-2 py-2 align-middle">
                    <Input
                      aria-label={`Mức chi trả ${CUSTOMER_PRICING_SHIFT_LABELS[rate.shiftType]}`}
                      value={rate.payAmount}
                      onChange={(event) =>
                        updateRate(rate.shiftType, { payAmount: event.target.value })
                      }
                      className="text-right w-30"
                    />
                  </td>
                  <td className="px-2 py-2 align-middle">
                    <Input
                      aria-label={`Mức phí ${CUSTOMER_PRICING_SHIFT_LABELS[rate.shiftType]}`}
                      value={rate.feeAmount}
                      onChange={(event) =>
                        updateRate(rate.shiftType, { feeAmount: event.target.value })
                      }
                      className="text-right w-30"
                    />
                  </td>
                  <td className="px-4 py-3 text-center align-middle font-medium text-fg-brand">
                    {rate.gm0}
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Cấu hình thời gian" bodyClassName="px-5 divide-y divide-border-secondary">
        <FormRow
          label="Cấu hình ca đêm"
          required
          description="Khoảng giờ tính là ca đêm."
        >
          <TimeRange
            startValue={form.nightStart}
            endValue={form.nightEnd}
            onStartChange={(v) => update("nightStart", v)}
            onEndChange={(v) => update("nightEnd", v)}
          />
        </FormRow>
        <FormRow
          label="Thời gian áp dụng"
          required
          description="Khoảng thời gian cấu hình có hiệu lực."
        >
          <DateRange
            startValue={form.appliedFrom}
            endValue={form.appliedTo}
            onStartChange={(v) => update("appliedFrom", v)}
            onEndChange={(v) => update("appliedTo", v)}
          />
        </FormRow>
        <FormRow
          label="Cấu hình ca ngắn"
          description="Cho phép tách ca dài thành ca ngắn linh hoạt."
        >
          <Select
            aria-label="Cấu hình ca ngắn"
            placeholder="Chọn"
            items={SHORT_SHIFT_OPTIONS}
            selectedKey={form.shortShift}
            onSelectionChange={(key) => update("shortShift", String(key))}
          >
            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
          </Select>
        </FormRow>
      </SectionCard>

      <SectionCard title="Hợp đồng & tài liệu" bodyClassName="px-5 divide-y divide-border-secondary">
        <FormRow
          label="Hợp đồng / Phụ lục HĐ"
          description="Liên kết tới hợp đồng hoặc phụ lục đang áp dụng."
        >
          <Input
            placeholder="Chọn hợp đồng / phụ lục"
            value={form.contract}
            onChange={(event) => update("contract", event.target.value)}
          />
        </FormRow>
        <FormRow
          label="Link báo giá / mô hình phí"
          required
          description="URL tới tài liệu mô hình giá nội bộ."
        >
          <Input
            type="url"
            placeholder="https://"
            value={form.quoteLink}
            onChange={(event) => update("quoteLink", event.target.value)}
            iconTrailing={
              form.quoteLink ? (
                <a
                  href={form.quoteLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg-tertiary hover:text-fg-brand"
                  aria-label="Mở link báo giá"
                >
                  <ExternalLink className="size-4" />
                </a>
              ) : undefined
            }
          />
        </FormRow>
        <FormRow
          label="Ảnh bảng giá từ hợp đồng"
          description="PNG, JPG. Tối đa 5MB mỗi ảnh."
        >
          <InputFile acceptedFileTypes={["image/png", "image/jpeg"]} />
        </FormRow>
      </SectionCard>

      <SectionCard title="Mô tả & ghi chú" bodyClassName="px-5 divide-y divide-border-secondary">
        <FormRow
          label="Ghi chú yêu cầu về CTV / LĐ"
          description="Hiển thị khi CTV xem chi tiết ca."
          align="start"
        >
          <TextArea
            aria-label="Ghi chú yêu cầu về CTV / LĐ"
            rows={3}
            value={form.ctvNote}
            onChange={(value) => update("ctvNote", value)}
            placeholder="Yêu cầu năng lực, ngoại hình, kinh nghiệm…"
          />
        </FormRow>
        <FormRow
          label="Mô tả công việc"
          description="Hiển thị cho CTV trên trang nhận ca."
          align="start"
        >
          <TextArea
            aria-label="Mô tả công việc"
            rows={4}
            value={form.jobDescription}
            onChange={(value) => update("jobDescription", value)}
            placeholder="Mô tả công việc hiển thị cho CTV khi nhận ca."
          />
        </FormRow>
        <FormRow
          label="Ghi chú nội bộ"
          description="Chỉ đội Vận hành nhìn thấy."
          align="start"
        >
          <TextArea
            aria-label="Ghi chú nội bộ"
            rows={3}
            value={form.internalNote}
            onChange={(value) => update("internalNote", value)}
            placeholder="Chỉ Vận hành nhìn thấy."
          />
        </FormRow>
      </SectionCard>

      <SectionCard title="Chính sách & trạng thái" bodyClassName="px-5 divide-y divide-border-secondary">
        <FormRow
          label="Áp dụng chính sách Vi phạm huỷ ca"
          description="CTV huỷ ca sát giờ sẽ bị áp dụng mức phạt theo chính sách chung."
        >
          <div className="flex h-9 items-center">
            <Toggle
              isSelected={form.cancelViolation}
              onChange={(value) => update("cancelViolation", value)}
            />
          </div>
        </FormRow>
        <FormRow label="Trạng thái" description="Tạm dừng nếu không muốn cấu hình tự áp dụng.">
          <Select
            aria-label="Trạng thái"
            items={STATUS_OPTIONS}
            selectedKey={form.status}
            onSelectionChange={(key) => update("status", key as CustomerPricingStatus)}
          >
            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
          </Select>
        </FormRow>
      </SectionCard>

      <div className="sticky bottom-0 -mx-5 mt-2 flex items-center justify-end gap-3 border-t border-border-secondary bg-bg/95 px-5 py-3 backdrop-blur">
        <Link href={backHref} scroll={false}>
          <Button color="secondary" size="md">
            Huỷ
          </Button>
        </Link>
        <Button color="primary" size="md">
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}

interface FormRowProps {
  label: string;
  description?: string;
  required?: boolean;
  align?: "center" | "start";
  children: ReactNode;
}

function FormRow({ label, description, required, align = "center", children }: FormRowProps) {
  const alignClass = align === "start" ? "lg:items-start" : "lg:items-center";
  return (
    <div className={`grid grid-cols-1 gap-3 py-5 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8 ${alignClass}`}>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-fg">
          {label}
          {required && <span className="ml-0.5 text-fg-error">*</span>}
        </span>
        {description && (
          <span className="text-sm text-fg-tertiary">{description}</span>
        )}
      </div>
      <div className="w-full max-w-lg">{children}</div>
    </div>
  );
}

function ReadOnlyValue({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-9 items-center text-sm text-fg-secondary">{children}</div>
  );
}

interface TimeRangeProps {
  startValue: string;
  endValue: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
}

function TimeRange({ startValue, endValue, onStartChange, onEndChange }: TimeRangeProps) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <input
        type="time"
        aria-label="Bắt đầu"
        value={startValue}
        onChange={(event) => onStartChange(event.target.value)}
        className="h-9 rounded-lg border border-border bg-bg px-3 text-sm text-fg shadow-xs outline-none focus:ring-2 focus:ring-border-brand"
      />
      <span aria-hidden className="text-fg-tertiary">→</span>
      <input
        type="time"
        aria-label="Kết thúc"
        value={endValue}
        onChange={(event) => onEndChange(event.target.value)}
        className="h-9 rounded-lg border border-border bg-bg px-3 text-sm text-fg shadow-xs outline-none focus:ring-2 focus:ring-border-brand"
      />
    </div>
  );
}

interface DateRangeProps {
  startValue: string;
  endValue: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
}

function DateRange({ startValue, endValue, onStartChange, onEndChange }: DateRangeProps) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <input
        type="text"
        aria-label="Bắt đầu"
        value={startValue}
        onChange={(event) => onStartChange(event.target.value)}
        placeholder="DD/MM/YYYY"
        className="h-9 rounded-lg border border-border bg-bg px-3 text-sm text-fg shadow-xs outline-none focus:ring-2 focus:ring-border-brand"
      />
      <span aria-hidden className="text-fg-tertiary">→</span>
      <input
        type="text"
        aria-label="Kết thúc"
        value={endValue}
        onChange={(event) => onEndChange(event.target.value)}
        placeholder="DD/MM/YYYY"
        className="h-9 rounded-lg border border-border bg-bg px-3 text-sm text-fg shadow-xs outline-none focus:ring-2 focus:ring-border-brand"
      />
    </div>
  );
}
