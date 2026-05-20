"use client";

import {
  Badge,
  Button,
  Checkbox,
  HintText,
  Input,
  RadioButton,
  RadioGroup,
  Select,
  SelectItem,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Toggle,
} from "@mvp-ui/ui";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CUSTOMER_SHIFT_HR_STATUS_LABELS,
  CUSTOMER_SHIFT_WEEKDAYS,
  type CustomerLocation,
  type CustomerPosition,
  type CustomerPricingConfig,
  type CustomerShift,
  type CustomerShiftAttendanceMode,
  type CustomerShiftHiringRequestRef,
  type CustomerShiftOvertimeCalcMode,
  type CustomerShiftStatus,
  type CustomerShiftWeekday,
} from "../customer-detail-data";
import { SectionCard } from "./SectionCard";

interface ShiftEditViewProps {
  shift?: CustomerShift;
  positions: CustomerPosition[];
  locations: CustomerLocation[];
  pricingConfigs: CustomerPricingConfig[];
  backHref: string;
}

interface ShiftFormState {
  name: string;
  status: CustomerShiftStatus;
  positionId: string;
  locationId: string;
  weekdays: CustomerShiftWeekday[];
  startTime: string;
  endTime: string;
  breakMinutes: number | null;
  pricingConfigId: number | null;
  requireFullAttendance: boolean;
  roundingMinutes: number;
  attendanceMode: CustomerShiftAttendanceMode;
  allowsOvertime: boolean;
  overtimeCalcMode: CustomerShiftOvertimeCalcMode | null;
  overtimeMinMinutesAfterShift: number | null;
  overtimeDailyHourLimit: number | null;
}

const EMPTY_FORM: ShiftFormState = {
  name: "",
  status: "active",
  positionId: "",
  locationId: "",
  weekdays: [],
  startTime: "08:00",
  endTime: "17:00",
  breakMinutes: 0,
  pricingConfigId: null,
  requireFullAttendance: false,
  roundingMinutes: 15,
  attendanceMode: "precise",
  allowsOvertime: false,
  overtimeCalcMode: null,
  overtimeMinMinutesAfterShift: null,
  overtimeDailyHourLimit: null,
};

function toFormState(shift: CustomerShift): ShiftFormState {
  return {
    name: shift.name,
    status: shift.status,
    positionId: shift.positionId,
    locationId: shift.locationId,
    weekdays: shift.weekdays,
    startTime: shift.startTime,
    endTime: shift.endTime,
    breakMinutes: shift.breakMinutes,
    pricingConfigId: shift.pricingConfigId,
    requireFullAttendance: shift.requireFullAttendance,
    roundingMinutes: shift.roundingMinutes,
    attendanceMode: shift.attendanceMode,
    allowsOvertime: shift.allowsOvertime,
    overtimeCalcMode: shift.overtimeCalcMode,
    overtimeMinMinutesAfterShift: shift.overtimeMinMinutesAfterShift,
    overtimeDailyHourLimit: shift.overtimeDailyHourLimit,
  };
}

const SUB_TABS = [
  { id: "general", label: "Thông tin chung" },
  { id: "schedule", label: "Lịch làm việc" },
  { id: "pricing", label: "Cấu hình giá" },
  { id: "policy", label: "Chính sách làm việc" },
] as const;

export function ShiftEditView({
  shift,
  positions,
  locations,
  pricingConfigs,
  backHref,
}: ShiftEditViewProps) {
  const isCreate = !shift;
  const [form, setForm] = useState<ShiftFormState>(
    shift ? toFormState(shift) : EMPTY_FORM
  );

  const update = <K extends keyof ShiftFormState>(
    key: K,
    value: ShiftFormState[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const title = isCreate
    ? "Tạo ca làm việc mới"
    : `${shift.id} · ${shift.name}`;
  const submitLabel = isCreate ? "Tạo ca" : "Lưu thay đổi";

  return (
    <div className="flex w-full max-w-5xl flex-col gap-6 pb-24">
      <div className="flex flex-col gap-2 border-b border-border-secondary pb-5">
        <Link
          href={backHref}
          scroll={false}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-fg-tertiary hover:text-fg"
        >
          <ArrowLeft className="size-4" /> Quay lại danh sách
        </Link>
        <h3 className="text-lg font-semibold text-fg">{title}</h3>
        {!isCreate && (
          <p className="text-sm text-fg-tertiary">
            Cập nhật ngày: {shift.updatedAt} · {shift.hiringRequestCount} y/c
            đang dùng
          </p>
        )}
      </div>

      <Tabs variant="underline" defaultSelectedKey="general">
        <TabList aria-label="Cấu hình ca làm việc">
          {SUB_TABS.map((tab) => (
            <Tab key={tab.id} id={tab.id}>
              {tab.label}
            </Tab>
          ))}
        </TabList>

        <TabPanel id="general">
          <GeneralSection
            form={form}
            update={update}
            positions={positions}
            locations={locations}
            hiringRequests={shift?.hiringRequests ?? []}
          />
        </TabPanel>
        <TabPanel id="schedule">
          <ScheduleSection form={form} update={update} />
        </TabPanel>
        <TabPanel id="pricing">
          <PricingSection
            form={form}
            update={update}
            pricingConfigs={pricingConfigs}
            locations={locations}
          />
        </TabPanel>
        <TabPanel id="policy">
          <PolicySection form={form} update={update} />
        </TabPanel>
      </Tabs>

      <div className="sticky bottom-0 -mx-5 mt-2 flex items-center justify-end gap-3 border-t border-border-secondary bg-bg/95 px-5 py-3 backdrop-blur">
        <Link href={backHref} scroll={false}>
          <Button color="secondary" size="md">
            Hủy
          </Button>
        </Link>
        <Link href={backHref} scroll={false}>
          <Button color="primary" size="md">
            {submitLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}

interface SectionProps {
  form: ShiftFormState;
  update: <K extends keyof ShiftFormState>(
    key: K,
    value: ShiftFormState[K]
  ) => void;
}

function GeneralSection({
  form,
  update,
  positions,
  locations,
  hiringRequests,
}: SectionProps & {
  positions: CustomerPosition[];
  locations: CustomerLocation[];
  hiringRequests: CustomerShiftHiringRequestRef[];
}) {
  const selectedPosition = positions.find((p) => p.id === form.positionId);
  const selectedLocation = locations.find((l) => l.id === form.locationId);

  const activeHRs = hiringRequests.filter(
    (hr) => hr.status === "publishing" || hr.status === "draft"
  );
  const lockedActive = activeHRs.length > 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <SectionCard title="Thông tin chung">
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4 rounded-lg border border-border-secondary bg-bg-secondary px-4 py-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-fg">
                Trạng thái hoạt động
              </span>
              <span className="text-xs text-fg-tertiary">
                {lockedActive
                  ? `Không thể ngừng — còn ${activeHRs.length} y/c tuyển dụng đang dùng ca này. Dừng các y/c trước.`
                  : form.status === "active"
                    ? "Ca đang được dùng để tạo y/c tuyển dụng"
                    : "Ca tạm ngưng — không cho tạo y/c mới"}
              </span>
            </div>
            <Toggle
              size="sm"
              isSelected={form.status === "active"}
              isDisabled={lockedActive}
              onChange={(isSelected) =>
                update("status", isSelected ? "active" : "inactive")
              }
              label={form.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"}
            />
          </div>

          <Input
            label="Tên ca"
            isRequired
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Ví dụ: Ca tối kho ECDC"
            hint="Tên ca thường bao gồm cả vị trí và địa điểm để dễ nhận diện."
          />

          <div className="flex flex-col gap-2">
            <Select
              label="Vị trí"
              isRequired
              placeholder="Chọn vị trí"
              selectedKey={form.positionId || null}
              onSelectionChange={(key) =>
                update("positionId", (key as string) ?? "")
              }
              items={positions.map((p) => ({ id: p.id, label: p.name }))}
            >
              {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
            </Select>
            {selectedPosition && (
              <div className="rounded-lg border border-border-secondary bg-bg-secondary p-3">
                <p className="text-sm font-semibold text-fg">
                  {selectedPosition.name}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-fg-tertiary">
                  {selectedPosition.description}
                </p>
                <Link
                  href={`?tab=positions&position=${selectedPosition.id}`}
                  scroll={false}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-fg-brand hover:underline"
                >
                  Xem chi tiết <ExternalLink className="size-3" />
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Select
              label="Địa điểm làm việc"
              isRequired
              placeholder="Chọn địa điểm"
              selectedKey={form.locationId || null}
              onSelectionChange={(key) =>
                update("locationId", (key as string) ?? "")
              }
              items={locations.map((l) => ({ id: l.id, label: l.shortName }))}
            >
              {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
            </Select>
            {selectedLocation && (
              <p className="text-sm text-fg-tertiary">
                Đ/c: {selectedLocation.address}
              </p>
            )}
          </div>
        </div>
      </SectionCard>

      <aside className="lg:sticky lg:top-4 lg:self-start">
        <HiringRequestList hiringRequests={hiringRequests} />
      </aside>
    </div>
  );
}

function ScheduleSection({ form, update }: SectionProps) {
  const overnight = form.endTime <= form.startTime;

  function toggleWeekday(key: CustomerShiftWeekday) {
    const next = form.weekdays.includes(key)
      ? form.weekdays.filter((k) => k !== key)
      : [...form.weekdays, key].sort((a, b) => a - b);
    update("weekdays", next as CustomerShiftWeekday[]);
  }

  function setWeekdays(keys: CustomerShiftWeekday[]) {
    update("weekdays", keys);
  }

  const totalMinutes = useMemo(() => {
    const toMin = (t: string) => {
      const parts = t.split(":").map(Number);
      const h = parts[0];
      const m = parts[1];
      if (h === undefined || m === undefined) return null;
      if (Number.isNaN(h) || Number.isNaN(m)) return null;
      return h * 60 + m;
    };
    const start = toMin(form.startTime);
    const end = toMin(form.endTime);
    if (start === null || end === null) return null;
    const span = end > start ? end - start : 24 * 60 - start + end;
    return Math.max(0, span - (form.breakMinutes ?? 0));
  }, [form.startTime, form.endTime, form.breakMinutes]);

  return (
    <SectionCard title="Lịch làm việc">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-fg-secondary">
              Lịch trong tuần <span className="text-fg-error">*</span>
            </span>
            <div className="flex gap-3 text-xs">
              <button
                type="button"
                onClick={() => setWeekdays([1, 2, 3, 4, 5, 6, 7])}
                className="text-fg-brand hover:underline"
              >
                Chọn cả tuần
              </button>
              <button
                type="button"
                onClick={() => setWeekdays([1, 2, 3, 4, 5])}
                className="text-fg-brand hover:underline"
              >
                T2 → T6
              </button>
              <button
                type="button"
                onClick={() => setWeekdays([6, 7])}
                className="text-fg-brand hover:underline"
              >
                T7 + CN
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {CUSTOMER_SHIFT_WEEKDAYS.map((day) => (
              <Checkbox
                key={day.key}
                size="sm"
                label={
                  <span className={day.isSunday ? "text-fg-warning" : undefined}>
                    {day.label}
                  </span>
                }
                isSelected={form.weekdays.includes(day.key)}
                onChange={() => toggleWeekday(day.key)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            label="Giờ bắt đầu"
            type="time"
            isRequired
            value={form.startTime}
            onChange={(event) => update("startTime", event.target.value)}
            containerClassName="w-40"
          />
          <Input
            label="Giờ kết thúc"
            type="time"
            isRequired
            value={form.endTime}
            onChange={(event) => update("endTime", event.target.value)}
            containerClassName="w-40"
          />
          <Input
            label="Nghỉ giải lao"
            type="number"
            min={0}
            value={
              form.breakMinutes === null ? "" : String(form.breakMinutes)
            }
            onChange={(event) =>
              update(
                "breakMinutes",
                event.target.value === "" ? null : Number(event.target.value)
              )
            }
            suffix="phút"
            containerClassName="w-40"
          />
        </div>

        {overnight && (
          <HintText>
            <span className="text-fg-warning">
              Ca qua đêm — sẽ tính sang ngày hôm sau.
            </span>
          </HintText>
        )}

        {totalMinutes !== null && (
          <div className="rounded-lg bg-bg-secondary p-3 text-sm text-fg">
            Tổng giờ công / ca:{" "}
            <span className="font-semibold">
              {Math.floor(totalMinutes / 60)} giờ {totalMinutes % 60} phút
            </span>
          </div>
        )}
      </div>
    </SectionCard>
  );
}

function PricingSection({
  form,
  update,
  pricingConfigs,
  locations,
}: SectionProps & {
  pricingConfigs: CustomerPricingConfig[];
  locations: CustomerLocation[];
}) {
  const location = locations.find((l) => l.id === form.locationId);
  const province = location?.province;

  const { suggested, others } = useMemo(() => {
    if (!province) return { suggested: [], others: pricingConfigs };
    return {
      suggested: pricingConfigs.filter((c) => c.province === province),
      others: pricingConfigs.filter((c) => c.province !== province),
    };
  }, [pricingConfigs, province]);

  const selected = pricingConfigs.find((c) => c.id === form.pricingConfigId);
  const selectItems = useMemo(() => {
    const items: { id: string; label: string }[] = [];
    suggested.forEach((c) =>
      items.push({
        id: String(c.id),
        label: `★ ${c.name} (áp dụng từ ${c.appliedFrom} đến ${c.appliedTo})`,
      })
    );
    others.forEach((c) =>
      items.push({
        id: String(c.id),
        label: `${c.name} · ${c.province} (áp dụng từ ${c.appliedFrom} đến ${c.appliedTo})`,
      })
    );
    return items;
  }, [suggested, others]);

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Cấu hình cước phí"
        description="Nguồn duy nhất để tính lương CTV, phí dịch vụ và biên lợi nhuận gộp."
      >
        <div className="flex flex-col gap-4">
          <Select
            label="Cấu hình cước phí"
            isRequired
            placeholder="Chọn cấu hình giá"
            selectedKey={
              form.pricingConfigId !== null ? String(form.pricingConfigId) : null
            }
            onSelectionChange={(key) =>
              update(
                "pricingConfigId",
                key === null ? null : Number(key as string)
              )
            }
            items={selectItems}
          >
            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
          </Select>
          {province && suggested.length === 0 && (
            <HintText>
              Chưa có cấu hình giá cho địa điểm này ({province}). Đang hiển thị
              toàn bộ cấu hình giá khả dụng.
            </HintText>
          )}

          {selected && (
            <div className="overflow-hidden rounded-lg border border-border-secondary">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-xs uppercase text-fg-tertiary">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Loại ca</th>
                    <th className="px-3 py-2 text-right font-medium">
                      Mức chi trả (VNĐ / giờ)
                    </th>
                    <th className="px-3 py-2 text-right font-medium">
                      Mức phí (VNĐ / giờ)
                    </th>
                    <th className="px-3 py-2 text-right font-medium">GM0</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.rates.map((rate) => (
                    <tr
                      key={rate.shiftType}
                      className="border-t border-border-secondary"
                    >
                      <td className="px-3 py-2 text-fg">
                        {SHIFT_TYPE_LABELS[rate.shiftType]}
                      </td>
                      <td className="px-3 py-2 text-right text-fg">
                        {rate.payAmount}
                      </td>
                      <td className="px-3 py-2 text-right text-fg">
                        {rate.feeAmount}
                      </td>
                      <td className="px-3 py-2 text-right text-fg">
                        {rate.gm0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-border-secondary bg-bg-secondary px-3 py-2">
                <Link
                  href={`?tab=pricing&config=${selected.id}`}
                  scroll={false}
                  className="inline-flex items-center gap-1 text-xs text-fg-brand hover:underline"
                >
                  Xem cấu hình giá đầy đủ <ExternalLink className="size-3" />
                </Link>
              </div>
            </div>
          )}

          <div className="rounded-lg border border-info-border bg-info-bg p-3 text-sm text-info-fg">
            Thu nhập dự tính / ca, % biên LN gộp, thưởng thêm, chu kỳ thanh toán
            sẽ được tính khi tạo y/c tuyển dụng từ ca này.
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function PolicySection({ form, update }: SectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Phạt nghỉ ca">
        <div className="flex flex-col gap-1">
          <Checkbox
            size="sm"
            label="Yêu cầu làm đủ ngày"
            isSelected={form.requireFullAttendance}
            onChange={(isSelected) =>
              update("requireFullAttendance", isSelected)
            }
          />
          <HintText>
            * Lưu ý: Sẽ có ít CTV ứng tuyển hơn vì nếu nghỉ sẽ bị phạt
          </HintText>
        </div>
      </SectionCard>

      <SectionCard title="Chấm công">
        <div className="flex flex-col gap-5">
          <Input
            label="Làm tròn giờ công mỗi"
            type="number"
            min={1}
            isRequired
            value={String(form.roundingMinutes)}
            onChange={(event) =>
              update("roundingMinutes", Number(event.target.value) || 1)
            }
            suffix="phút"
            hint="Cách làm tròn: Round-up. Ví dụ 0,5 = 1 và 0,4 = 0"
            containerClassName="w-44"
          />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-fg-secondary">
              Ghi nhận giờ công
            </span>
            <RadioGroup
              size="sm"
              value={form.attendanceMode}
              onChange={(val) =>
                update("attendanceMode", val as CustomerShiftAttendanceMode)
              }
            >
              <RadioButton
                value="precise"
                label="Chính xác, ghi nhận theo giờ vào/ra thực tế"
              />
              <RadioButton
                value="simple"
                label="Đơn giản, chỉ cần CTV có chấm công 1 lần thì sẽ được tính đủ giờ công"
              />
            </RadioGroup>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Tăng ca">
        <Checkbox
          size="sm"
          label="Có tăng ca"
          isSelected={form.allowsOvertime}
          onChange={(isSelected) => {
            update("allowsOvertime", isSelected);
            if (!isSelected) {
              update("overtimeCalcMode", null);
              update("overtimeMinMinutesAfterShift", null);
              update("overtimeDailyHourLimit", null);
            } else if (form.overtimeCalcMode === null) {
              update("overtimeCalcMode", "afterScheduledEnd");
              update("overtimeMinMinutesAfterShift", 0);
            }
          }}
        />
        {form.allowsOvertime && (
          <div className="mt-4 flex flex-col gap-4 rounded-lg border border-border-secondary bg-bg-secondary p-4">
            <span className="text-sm font-medium text-fg-secondary">
              Cách tính tăng ca <span className="text-fg-error">*</span>
            </span>
            <RadioGroup
              size="sm"
              value={form.overtimeCalcMode ?? "afterScheduledEnd"}
              onChange={(val) => {
                const mode = val as CustomerShiftOvertimeCalcMode;
                update("overtimeCalcMode", mode);
                if (mode === "afterScheduledEnd") {
                  update("overtimeMinMinutesAfterShift", 0);
                  update("overtimeDailyHourLimit", null);
                } else {
                  update("overtimeDailyHourLimit", 8);
                  update("overtimeMinMinutesAfterShift", null);
                }
              }}
            >
              <RadioButton
                value="afterScheduledEnd"
                label="Mặc định, quá giờ chính thức là tăng ca"
                hint="Ví dụ: Giờ làm chính thức từ 8:00 - 14:00 (6 tiếng). Công tăng ca bắt đầu tính sau mốc 14:00 hoặc cộng thêm cấu hình số phút tối thiểu dưới đây"
              />
              <RadioButton
                value="dailyHourThreshold"
                label="Quá số Giờ công chính thức quy định/ngày là tăng ca"
                hint="Ví dụ: Giờ công chính thức quy định mỗi ngày là 8h, thì không quan trọng giờ vào/ra bao nhiêu, ca bắt đầu/kết thúc giờ nào. Miễn là số giờ công thực thế được ghi nhận > 8h thì được tính tăng ca"
              />
            </RadioGroup>

            {form.overtimeCalcMode === "afterScheduledEnd" ? (
              <Input
                label="Số phút tối thiểu sau giờ chính thức để tính tăng ca"
                type="number"
                min={0}
                value={String(form.overtimeMinMinutesAfterShift ?? 0)}
                onChange={(event) =>
                  update(
                    "overtimeMinMinutesAfterShift",
                    Number(event.target.value) || 0
                  )
                }
                suffix="phút"
                containerClassName="w-44"
              />
            ) : (
              <Input
                label="Số giờ công chính thức / ngày"
                type="number"
                min={1}
                isRequired
                value={String(form.overtimeDailyHourLimit ?? 8)}
                onChange={(event) =>
                  update(
                    "overtimeDailyHourLimit",
                    Number(event.target.value) || 1
                  )
                }
                suffix="giờ"
                containerClassName="w-40"
              />
            )}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function HiringRequestList({
  hiringRequests,
}: {
  hiringRequests: CustomerShiftHiringRequestRef[];
}) {
  if (hiringRequests.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border-secondary bg-bg-secondary px-4 py-3 text-sm text-fg-tertiary">
        Chưa có yêu cầu tuyển dụng nào dùng ca này.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border-secondary bg-bg">
      <div className="flex items-center justify-between border-b border-border-secondary px-4 py-3">
        <span className="text-sm font-medium text-fg">
          Yêu cầu tuyển dụng đang có ({hiringRequests.length})
        </span>
        <span className="text-xs text-fg-tertiary">
          Click mã để mở y/c trong tab khác.
        </span>
      </div>
      <ul className="divide-y divide-border-secondary">
        {hiringRequests.map((hr) => {
          const statusMeta = CUSTOMER_SHIFT_HR_STATUS_LABELS[hr.status];
          return (
            <li
              key={hr.id}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/hiring-requests/${hr.id}`}
                    target="_blank"
                    rel="noopener"
                    className="text-sm font-medium text-fg-brand hover:underline"
                  >
                    {hr.id}
                  </Link>
                  <Badge type="pill-color" color={statusMeta.color} size="sm">
                    {statusMeta.label}
                  </Badge>
                </div>
                <span className="truncate text-sm text-fg-secondary">
                  {hr.title}
                </span>
                <span className="text-xs text-fg-tertiary">
                  {hr.startDate} → {hr.endDate} · {hr.filled}/{hr.headcount}{" "}
                  CTV
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
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

