"use client";

import {
  Button,
  ComboBox,
  Input,
  SelectItem,
  TextArea

} from "@mvp-ui/ui";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, MapPin, UserPlus } from "lucide-react";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { PageScaffold } from "../_shell/PageScaffold";
import { APP_ROUTES } from "../_shell/nav";
import { CUSTOMERS } from "../customers/customers-data";
import { getCustomerLogo } from "../_shared/assets";
import {
  CUSTOMER_SHIFT_WEEKDAYS,
  getCustomerDetailExtras,
  type CustomerShift,
} from "../customers/customer-detail-data";

interface HiringRequestCreatePageProps {
  initialCustomerId?: string;
  initialShiftId?: string;
}

export function HiringRequestCreatePage({
  initialCustomerId,
  initialShiftId,
}: HiringRequestCreatePageProps = {}) {
  const [customerId, setCustomerId] = useState<string>(initialCustomerId ?? "");
  const [shiftId, setShiftId] = useState<string>(initialShiftId ?? "");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [headcount, setHeadcount] = useState<string>("");
  const [targetDeadline, setTargetDeadline] = useState<string>("");
  const [customerNote, setCustomerNote] = useState<string>("");

  const customer = useMemo(
    () => CUSTOMERS.find((c) => c.id === customerId) ?? null,
    [customerId]
  );

  const extras = useMemo(
    () => (customer ? getCustomerDetailExtras(customer) : null),
    [customer]
  );

  const activeShifts = useMemo(
    () => extras?.shifts.filter((s) => s.status === "active") ?? [],
    [extras]
  );

  const selectedShift = useMemo(
    () => activeShifts.find((s) => s.id === shiftId) ?? null,
    [activeShifts, shiftId]
  );

  const shiftPosition = useMemo(
    () =>
      selectedShift && extras
        ? extras.positions.find((p) => p.id === selectedShift.positionId)
        : null,
    [selectedShift, extras]
  );

  const shiftLocation = useMemo(
    () =>
      selectedShift && extras
        ? extras.locations.find((l) => l.id === selectedShift.locationId)
        : null,
    [selectedShift, extras]
  );

  const shiftPricing = useMemo(
    () =>
      selectedShift && extras
        ? extras.pricingConfigs.find(
          (c) => c.id === selectedShift.pricingConfigId
        )
        : null,
    [selectedShift, extras]
  );

  return (
    <PageScaffold
      header={
        <AppPageHeader
          breadcrumbs={[
            { label: "Dashboard", href: APP_ROUTES.dashboard },
            { label: "Y/c tuyển dụng", href: APP_ROUTES.hiringRequests },
            { label: "Tạo mới" },
          ]}
        >
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-fg">
              <UserPlus className="size-7" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-fg">
                Tạo Y/c tuyển dụng mới
              </h1>
              <p className="mt-1 max-w-3xl text-sm text-fg-tertiary">
                Chọn khách hàng và ca làm việc đã chốt, sau đó nhập khoảng ngày
                và số lượng cần tuyển. Cấu hình tin đăng (tiêu đề, thưởng thêm,
                visibility) sẽ làm sau khi y/c được chấp nhận.
              </p>
            </div>
          </div>
        </AppPageHeader>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-6">
          <FormCard title="Khách hàng & ca làm việc">
            <div className="flex flex-col divide-y divide-border-secondary">
              <FieldRow
                label="Khách hàng"
                required
                description="Khách hàng chủ quản cho y/c tuyển dụng này."
              >
                <ComboBox
                  isRequired
                  hideRequiredIndicator
                  placeholder="Tìm khách hàng..."
                  selectedKey={customerId || null}
                  onSelectionChange={(key) => {
                    setCustomerId(key === null ? "" : (key as string));
                    setShiftId("");
                  }}
                  items={CUSTOMERS.map((c) => {
                    const logo = getCustomerLogo(c.id);
                    return {
                      id: c.id,
                      label: c.name,
                      ...(logo ? { avatarUrl: logo.mark } : {}),
                    };
                  })}
                >
                  {(item) => (
                    <SelectItem
                      id={item.id}
                      {...(item.avatarUrl ? { avatarUrl: item.avatarUrl } : {})}
                    >
                      {item.label}
                    </SelectItem>
                  )}
                </ComboBox>
              </FieldRow>

              {customer && activeShifts.length === 0 && (
                <FieldRow
                  label="Ca làm việc"
                  required
                  description="Cần ít nhất 1 ca đang hoạt động."
                >
                  <div className="rounded-lg border border-dashed border-border-secondary bg-bg-secondary p-4 text-sm">
                    <p className="text-fg-secondary">
                      Khách hàng này chưa có ca làm việc nào đang hoạt động.
                    </p>
                    <Link
                      href={`/customers/${customer.id}?tab=shifts&shift=new`}
                      className="mt-2 inline-block text-fg-brand hover:underline"
                    >
                      Tạo ca làm việc mới cho khách →
                    </Link>
                  </div>
                </FieldRow>
              )}

              {customer && activeShifts.length > 0 && extras && (
                <FieldRow
                  label="Ca làm việc"
                  required
                  description="Chọn 1 ca đã chốt. Bấm để xem chi tiết ở cột phải."
                >
                  <div className="flex flex-col gap-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {activeShifts.map((shift) => {
                        const position = extras.positions.find(
                          (p) => p.id === shift.positionId
                        );
                        const location = extras.locations.find(
                          (l) => l.id === shift.locationId
                        );
                        return (
                          <ShiftCard
                            key={shift.id}
                            shift={shift}
                            positionName={position?.name ?? "—"}
                            locationName={location?.shortName ?? "—"}
                            isSelected={shift.id === shiftId}
                            onSelect={() => setShiftId(shift.id)}
                          />
                        );
                      })}
                    </div>
                    <Link
                      href={`/customers/${customer.id}?tab=shifts`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sm text-fg-brand hover:underline"
                    >
                      Quản lý Ca làm việc của khách hàng →
                    </Link>
                  </div>
                </FieldRow>
              )}
            </div>
          </FormCard>

          {customer && (
            <FormCard title="Ngày làm & số lượng">
              <div className="flex flex-col divide-y divide-border-secondary">
                <FieldRow
                  label="Ngày làm"
                  required
                  description="Ngày đầu CTV bắt đầu đi làm đến ngày cuối."
                >
                  <div className="flex flex-wrap gap-3">
                    <Input
                      type="date"
                      isRequired
                      hideRequiredIndicator
                      value={startDate}
                      onChange={(event) => setStartDate(event.target.value)}
                      containerClassName="w-48"
                    />
                    <Input
                      type="date"
                      isRequired
                      hideRequiredIndicator
                      value={endDate}
                      onChange={(event) => setEndDate(event.target.value)}
                      containerClassName="w-48"
                    />
                  </div>
                </FieldRow>

                <FieldRow
                  label="Số lượng cần tuyển"
                  required
                  description="Tăng buffer 10-20% nếu khả năng no-show cao."
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <Input
                      size="lg"
                      type="number"
                      min={1}
                      isRequired
                      hideRequiredIndicator
                      value={headcount}
                      onChange={(event) => setHeadcount(event.target.value)}
                      suffix="người"
                      containerClassName="w-44"
                    />
                    <div className="flex flex-wrap gap-2">
                      {[5, 10, 20, 50, 100].map((preset) => (
                        <Button
                          key={preset}
                          type="button"
                          color="tertiary"
                          size="sm"
                          onClick={() => setHeadcount(String(preset))}
                        >
                          {preset}
                        </Button>
                      ))}
                    </div>
                  </div>
                </FieldRow>

                <FieldRow
                  label="Ghi chú khách hàng"
                  description="Brief từ khách (yêu cầu đặc biệt, lưu ý onboarding)."
                >
                  <TextArea
                    rows={3}
                    value={customerNote}
                    onChange={(value) => setCustomerNote(value)}
                    placeholder="Nhập ghi chú nếu có..."
                  />
                </FieldRow>
              </div>
            </FormCard>
          )}
        </div>

        {customer && (
          <aside className="lg:sticky lg:top-4 lg:self-start">
            <FormCard title="Tóm tắt ca đã chọn">
              {selectedShift ? (
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wide text-fg-tertiary">
                      Mã ca
                    </span>
                    <Link
                      href={`/customers/${customer?.id}?tab=shifts&shift=${selectedShift.id}`}
                      className="font-medium text-fg-brand hover:underline"
                    >
                      {selectedShift.id} · {selectedShift.name}
                    </Link>
                  </div>
                  <SummaryRow label="Vị trí" value={shiftPosition?.name ?? "—"} />
                  <SummaryRow
                    label="Địa điểm"
                    value={shiftLocation?.shortName ?? "—"}
                    {...(shiftLocation?.address
                      ? { hint: shiftLocation.address }
                      : {})}
                  />
                  <SummaryRow
                    label="Lịch"
                    value={
                      <div className="flex flex-col gap-1">
                        <WeekdayInline weekdays={selectedShift.weekdays} />
                        <span>
                          {selectedShift.startTime} → {selectedShift.endTime}
                        </span>
                      </div>
                    }
                  />
                  <SummaryRow
                    label="Cấu hình giá"
                    value={
                      shiftPricing ? (
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/customers/${customer?.id}?tab=pricing&config=${shiftPricing.id}`}
                            className="text-fg-brand hover:underline"
                          >
                            {shiftPricing.name}
                          </Link>
                          <span className="text-xs text-fg-tertiary">
                            Áp dụng {shiftPricing.appliedFrom} →{" "}
                            {shiftPricing.appliedTo}
                          </span>
                          <div className="mt-1 overflow-hidden rounded-md border border-border-secondary">
                            <table className="w-full text-xs">
                              <thead className="bg-bg-secondary uppercase text-fg-tertiary">
                                <tr>
                                  <th className="px-2 py-1.5 text-left font-medium">
                                    Loại ca
                                  </th>
                                  <th className="px-2 py-1.5 text-right font-medium">
                                    Trả CTV
                                  </th>
                                  <th className="px-2 py-1.5 text-right font-medium">
                                    Phí KH
                                  </th>
                                  <th className="px-2 py-1.5 text-right font-medium">
                                    GM0
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {shiftPricing.rates.map((rate) => (
                                  <tr
                                    key={rate.shiftType}
                                    className="border-t border-border-secondary"
                                  >
                                    <td className="px-2 py-1.5 text-fg">
                                      {SHIFT_TYPE_LABELS[rate.shiftType]}
                                    </td>
                                    <td className="px-2 py-1.5 text-right text-fg">
                                      {rate.payAmount}
                                    </td>
                                    <td className="px-2 py-1.5 text-right text-fg">
                                      {rate.feeAmount}
                                    </td>
                                    <td className="px-2 py-1.5 text-right text-fg">
                                      {rate.gm0}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        "—"
                      )
                    }
                  />
                  <div className="rounded-lg border border-info-border bg-info-bg p-3 text-xs text-info-fg">
                    Khi tạo y/c, hệ thống sẽ snapshot giá và chính sách của ca tại
                    thời điểm này (production behavior). Demo skip snapshot.
                  </div>
                </div>
              ) : (
                <p className="text-sm text-fg-tertiary">
                  Chọn khách hàng và ca làm việc để xem tóm tắt.
                </p>
              )}
            </FormCard>
          </aside>
        )}
      </div>

      <div className="sticky bottom-0 -mx-5 mt-6 flex items-center justify-end gap-3 border-t border-border-secondary bg-bg/95 px-5 py-3 backdrop-blur">
        <Link href={APP_ROUTES.hiringRequests}>
          <Button color="secondary" size="md">
            Huỷ
          </Button>
        </Link>
        <Button color="primary" size="md">
          Tạo y/c tuyển dụng
        </Button>
      </div>
    </PageScaffold>
  );
}

function FormCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
      <div className="border-b border-border-secondary px-5 py-4">
        <h2 className="text-base font-semibold text-fg">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 border-t border-border-secondary pt-3 first:border-t-0 first:pt-0">
      <span className="text-xs uppercase tracking-wide text-fg-tertiary">
        {label}
      </span>
      <div className="text-fg">{value}</div>
      {hint && <span className="text-xs text-fg-tertiary">{hint}</span>}
    </div>
  );
}

interface FieldRowProps {
  label: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
}

function FieldRow({ label, required, description, children }: FieldRowProps) {
  return (
    <div className="grid gap-3 py-5 first:pt-0 last:pb-0 md:grid-cols-[280px_minmax(0,1fr)] md:gap-6">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-fg">
          {label}
          {required && <span className="ml-0.5 text-fg-error">*</span>}
        </span>
        {description && (
          <p className="text-sm text-fg-tertiary">{description}</p>
        )}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

interface ShiftCardProps {
  shift: CustomerShift;
  positionName: string;
  locationName: string;
  isSelected: boolean;
  onSelect: () => void;
}

function ShiftCard({
  shift,
  positionName,
  locationName,
  isSelected,
  onSelect,
}: ShiftCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={
        isSelected
          ? "relative flex flex-col gap-2 rounded-lg border border-border-brand bg-bg-secondary p-4 text-left shadow-xs ring-2 ring-border-brand"
          : "relative flex flex-col gap-2 rounded-lg border border-border-secondary bg-bg p-4 text-left shadow-xs hover:border-border-brand hover:bg-bg-secondary"
      }
    >
      {isSelected && (
        <span className="absolute right-3 top-3 inline-flex size-5 items-center justify-center rounded-full bg-primary text-primary-fg">
          <Check className="size-3.5" />
        </span>
      )}
      <div className="flex items-center gap-2 pr-7">
        <span className="text-xs font-medium text-fg-brand">{shift.id}</span>
        <span className="text-xs text-fg-tertiary">·</span>
        <span className="truncate text-xs text-fg-tertiary">
          {positionName}
        </span>
      </div>
      <p className="text-sm font-medium text-fg">{shift.name}</p>
      <div className="flex items-center gap-1.5 text-xs text-fg-secondary">
        <MapPin className="size-3.5 shrink-0" />
        <span className="truncate">{locationName}</span>
      </div>
      <div className="flex items-center justify-between gap-2 pt-1">
        <WeekdayInline weekdays={shift.weekdays} />
        <span className="text-xs font-medium text-fg-secondary">
          {shift.startTime} → {shift.endTime}
        </span>
      </div>
    </button>
  );
}

const SHIFT_TYPE_LABELS: Record<string, string> = {
  day_regular: "Ca ngày thường",
  day_overtime: "Tăng ca ngày thường",
  night_regular: "Ca đêm - ngày thường",
  night_overtime: "Tăng ca đêm - ngày thường",
  day_holiday: "Ca ngày lễ",
  night_holiday: "Ca đêm ngày lễ",
};

function WeekdayInline({ weekdays }: { weekdays: number[] }) {
  const set = new Set(weekdays);
  return (
    <div className="flex gap-1 text-xs">
      {CUSTOMER_SHIFT_WEEKDAYS.map((day) => {
        const active = set.has(day.key);
        const baseColor = day.isSunday ? "text-fg-warning" : "text-fg";
        return (
          <span
            key={day.key}
            className={
              active
                ? `font-medium ${baseColor}`
                : "text-fg-quaternary line-through decoration-fg-quaternary"
            }
          >
            {day.label}
          </span>
        );
      })}
    </div>
  );
}

