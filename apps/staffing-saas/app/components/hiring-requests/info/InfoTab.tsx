"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Checkbox,
  RadioButton,
  RadioGroup,
} from "@mvp-ui/ui";
import {
  Briefcase,
  Calendar,
  CircleDollarSign,
  MapPin,
  Moon,
  Shield,
  Sun,
  SunMoon,
} from "lucide-react";
import type { HiringRequestRecord } from "../hiring-requests-data";
import {
  CUSTOMER_PRICING_SHIFT_LABELS,
  CUSTOMER_SHIFT_KIND_LABELS,
  CUSTOMER_SHIFT_WEEKDAYS,
  classifyShiftKind,
  getCustomerDetailExtras,
  type CustomerLocation,
  type CustomerPosition,
  type CustomerPricingConfig,
  type CustomerShift,
} from "../../customers/customer-detail-data";
import { getCustomerById } from "../../customers/customers-data";
import { SectionCard } from "../../customers/detail/SectionCard";

interface ShiftDetail {
  shift: CustomerShift;
  position: CustomerPosition;
  location: CustomerLocation;
  pricingConfig: CustomerPricingConfig;
}

function getShiftDetail(
  shiftId: string | null,
  customerId: string,
): ShiftDetail | null {
  if (!shiftId) return null;
  const customer = getCustomerById(customerId);
  if (!customer) return null;
  const extras = getCustomerDetailExtras(customer);
  const shift = extras.shifts.find((s) => s.id === shiftId);
  if (!shift) return null;
  const position = extras.positions.find((p) => p.id === shift.positionId);
  const location = extras.locations.find((l) => l.id === shift.locationId);
  const pricingConfig = extras.pricingConfigs.find(
    (c) => c.id === shift.pricingConfigId,
  );
  if (!position || !location || !pricingConfig) return null;
  return { shift, position, location, pricingConfig };
}

type SectionId = "position" | "location" | "schedule" | "policy" | "pricing";

const SECTIONS: {
  id: SectionId;
  label: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { id: "position", label: "Vị trí", icon: Briefcase },
  { id: "location", label: "Địa điểm", icon: MapPin },
  { id: "schedule", label: "Lịch làm việc", icon: Calendar },
  { id: "policy", label: "Chính sách làm việc", icon: Shield },
  { id: "pricing", label: "Cấu hình giá", icon: CircleDollarSign },
];

interface InfoTabProps {
  record: HiringRequestRecord;
}

export function InfoTab({ record }: InfoTabProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("position");
  const detail = getShiftDetail(record.shiftId, record.customerId);

  if (!detail) {
    return (
      <div className="rounded-xl border border-dashed border-border-secondary bg-bg-secondary px-6 py-12 text-center text-sm text-fg-tertiary">
        Chưa có ca làm việc được liên kết với yêu cầu này.
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      <nav className="w-52 shrink-0">
        <ul className="flex flex-col gap-0.5">
          {SECTIONS.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setActiveSection(id)}
                  className={[
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/8 text-fg-brand ring-1 ring-inset ring-border-brand/30"
                      : "text-fg-secondary hover:bg-bg-secondary hover:text-fg",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "size-4 shrink-0",
                      isActive ? "text-fg-brand" : "text-fg-tertiary",
                    ].join(" ")}
                  />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="min-w-0 flex-1">
        {activeSection === "position" && (
          <PositionSection position={detail.position} />
        )}
        {activeSection === "location" && (
          <LocationSection location={detail.location} />
        )}
        {activeSection === "schedule" && (
          <ScheduleSection shift={detail.shift} />
        )}
        {activeSection === "policy" && <PolicySection shift={detail.shift} />}
        {activeSection === "pricing" && (
          <PricingSection config={detail.pricingConfig} />
        )}
      </div>
    </div>
  );
}

function PreformattedText({ value }: { value: string }) {
  return (
    <ul className="flex flex-col gap-1 text-sm text-fg">
      {value.split("\n").map((line, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static display lines
        <li key={i}>{line}</li>
      ))}
    </ul>
  );
}

function PositionSection({ position }: { position: CustomerPosition }) {
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Thông tin vị trí">
        <div className="flex flex-col divide-y divide-border-secondary">
          <ReadRow label="Tên vị trí">
            <span className="font-medium">{position.name}</span>
          </ReadRow>
          <ReadRow label="Mô tả công việc">
            <p className="text-sm leading-relaxed text-fg">
              {position.description}
            </p>
          </ReadRow>
          <ReadRow label="Yêu cầu">
            <PreformattedText value={position.requirements} />
          </ReadRow>
          <ReadRow label="Quyền lợi">
            <PreformattedText value={position.benefits} />
          </ReadRow>
          <ReadRow label="Hướng dẫn">
            <PreformattedText value={position.instructions} />
          </ReadRow>
        </div>
      </SectionCard>
    </div>
  );
}

function LocationSection({ location }: { location: CustomerLocation }) {
  const mapQuery = encodeURIComponent(
    `${location.address}, ${location.province}, Việt Nam`,
  );
  const mapsEmbedSrc = `https://maps.google.com/maps?q=${mapQuery}&output=embed&z=15`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Thông tin địa điểm">
        <div className="flex flex-col divide-y divide-border-secondary">
          <ReadRow label="Tên địa điểm">
            <span className="font-medium">{location.shortName}</span>
          </ReadRow>
          <ReadRow label="Địa chỉ">{location.address}</ReadRow>
          <ReadRow label="Tỉnh / Thành phố">{location.province}</ReadRow>
          <ReadRow label="Số công việc">
            <span className="tabular-nums">{location.jobCount}</span>
          </ReadRow>
        </div>
      </SectionCard>

      <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
        <div className="flex items-center justify-between border-b border-border-secondary px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-fg">Bản đồ</h2>
            <p className="mt-1 text-sm text-fg-tertiary">{location.address}</p>
          </div>
          <a
            href={mapsHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-border-secondary px-3 py-1.5 text-sm font-medium text-fg hover:bg-bg-secondary"
          >
            <MapPin className="size-3.5 text-fg-brand" />
            Mở Google Maps
          </a>
        </div>
        <div className="overflow-hidden rounded-b-xl">
          <iframe
            title={`Bản đồ ${location.shortName}`}
            src={mapsEmbedSrc}
            width="100%"
            height="360"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0"
          />
        </div>
      </div>
    </div>
  );
}

function ScheduleSection({ shift }: { shift: CustomerShift }) {
  const shiftKind = classifyShiftKind(shift.startTime, shift.endTime);
  const shiftKindMeta = CUSTOMER_SHIFT_KIND_LABELS[shiftKind];
  const KindIcon =
    shiftKind === "day" ? Sun : shiftKind === "night" ? Moon : SunMoon;

  const totalMinutes = useMemo(() => {
    const toMin = (t: string) => {
      const parts = t.split(":").map(Number);
      const h = parts[0];
      const m = parts[1];
      if (h === undefined || m === undefined) return null;
      if (Number.isNaN(h) || Number.isNaN(m)) return null;
      return h * 60 + m;
    };
    const start = toMin(shift.startTime);
    const end = toMin(shift.endTime);
    if (start === null || end === null) return null;
    const span = end > start ? end - start : 24 * 60 - start + end;
    return Math.max(0, span - (shift.breakMinutes ?? 0));
  }, [shift.startTime, shift.endTime, shift.breakMinutes]);

  const tooLong = totalMinutes !== null && totalMinutes > 480;
  const tooShort = totalMinutes !== null && totalMinutes < 180;

  return (
    <div className="flex flex-col gap-8">
      <SectionCard title="Ngày trong tuần">
        <div className="flex flex-wrap gap-6">
          {CUSTOMER_SHIFT_WEEKDAYS.map((day) => (
            <Checkbox
              key={day.key}
              size="sm"
              isReadOnly
              label={
                <span className={day.isSunday ? "text-warning-fg" : undefined}>
                  {day.label}
                </span>
              }
              isSelected={shift.weekdays.includes(day.key)}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Thời gian làm việc">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-4 text-sm">
            <ReadField label="Giờ bắt đầu">
              <span className="tabular-nums font-medium">{shift.startTime}</span>
            </ReadField>
            <ReadField label="Giờ kết thúc">
              <span className="tabular-nums font-medium">{shift.endTime}</span>
            </ReadField>
            <ReadField label="Nghỉ giải lao">
              <span className="tabular-nums font-medium">
                {shift.breakMinutes ?? 0} phút
              </span>
            </ReadField>
          </div>

          <div className="flex flex-col gap-2 text-sm text-fg">
            <div className="flex items-center gap-2 rounded-lg bg-bg-secondary p-3">
              <span className="text-fg-secondary">Loại ca</span>
              <Badge type="pill-color" color={shiftKindMeta.color} size="sm">
                <span className="inline-flex items-center gap-1">
                  <KindIcon className="size-3" />
                  {shiftKindMeta.label}
                </span>
              </Badge>
            </div>
            {totalMinutes !== null && (
              <div className="flex flex-row flex-wrap items-center gap-4 rounded-lg bg-bg-secondary p-3">
                <div className="flex items-center gap-2">
                  <span className="text-fg-secondary">Tổng giờ công / ca</span>
                  <span
                    className={`font-semibold ${tooLong || tooShort ? "text-warning-fg" : ""}`}
                  >
                    {Math.floor(totalMinutes / 60)} giờ {totalMinutes % 60} phút
                  </span>
                </div>
                {tooLong && (
                  <span className="text-xs text-warning-fg">
                    Ca quá dài (tổng giờ công &gt; 8h)
                  </span>
                )}
                {tooShort && (
                  <span className="text-xs text-warning-fg">
                    Ca quá ngắn (tổng giờ công &lt; 3h)
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function PolicySection({ shift }: { shift: CustomerShift }) {
  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Phạt nghỉ ca">
        <div className="flex flex-col gap-1">
          <Checkbox
            size="sm"
            isReadOnly
            label="Yêu cầu làm đủ ngày"
            isSelected={shift.requireFullAttendance}
          />
          <p className="text-sm text-fg-tertiary">
            * Lưu ý: Sẽ có ít CTV ứng tuyển hơn vì nếu nghỉ sẽ bị phạt
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Chấm công">
        <div className="flex flex-col gap-5">
          <ReadField label="Làm tròn giờ công mỗi">
            <span className="tabular-nums font-medium">
              {shift.roundingMinutes} phút
            </span>
            <span className="ml-2 text-xs text-fg-tertiary">
              Round-up. Ví dụ 0,5 = 1 và 0,4 = 0
            </span>
          </ReadField>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-fg-secondary">
              Ghi nhận giờ công
            </span>
            <RadioGroup size="sm" value={shift.attendanceMode} isReadOnly>
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
          isReadOnly
          label="Có tăng ca"
          isSelected={shift.allowsOvertime}
        />
        {shift.allowsOvertime && shift.overtimeCalcMode && (
          <div className="mt-4 flex flex-col gap-4 rounded-lg border border-border-secondary bg-bg-secondary p-4">
            <span className="text-sm font-medium text-fg-secondary">
              Cách tính tăng ca
            </span>
            <RadioGroup size="sm" value={shift.overtimeCalcMode} isReadOnly>
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
            {shift.overtimeCalcMode === "afterScheduledEnd" ? (
              <ReadField label="Số phút tối thiểu sau giờ chính thức để tính tăng ca">
                <span className="tabular-nums font-medium">
                  {shift.overtimeMinMinutesAfterShift ?? 0} phút
                </span>
              </ReadField>
            ) : (
              <ReadField label="Số giờ công chính thức / ngày">
                <span className="tabular-nums font-medium">
                  {shift.overtimeDailyHourLimit ?? 8} giờ
                </span>
              </ReadField>
            )}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function PricingSection({ config }: { config: CustomerPricingConfig }) {
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Thông tin cấu hình giá">
        <div className="flex flex-col divide-y divide-border-secondary">
          <ReadRow label="Tên cấu hình">
            <span className="font-medium">{config.name}</span>
          </ReadRow>
          <ReadRow label="Phân loại dịch vụ">{config.serviceClass}</ReadRow>
          <ReadRow label="Tỉnh / Thành phố">{config.province}</ReadRow>
          <ReadRow label="Danh mục">{config.category}</ReadRow>
          <ReadRow label="Loại việc">{config.jobType}</ReadRow>
          <ReadRow label="Thời gian áp dụng">
            <span className="tabular-nums">
              {config.appliedFrom} → {config.appliedTo}
            </span>
          </ReadRow>
        </div>
      </SectionCard>

      <SectionCard
        title="Chi trả & mức phí"
        description="Mức chi trả cho CTV và phí thu khách hàng theo loại ca."
        bodyClassName="overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-120 border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-secondary bg-bg-secondary/40 text-left text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
                <th className="px-5 py-3">Loại ca</th>
                <th className="px-5 py-3 text-right">
                  Chi trả CTV
                  <br />
                  <span className="font-normal normal-case">VNĐ / giờ</span>
                </th>
                <th className="px-5 py-3 text-right">
                  Phí KH
                  <br />
                  <span className="font-normal normal-case">VNĐ / giờ</span>
                </th>
                <th className="px-5 py-3 text-center">GM0</th>
              </tr>
            </thead>
            <tbody>
              {config.rates.map((rate, idx) => (
                <tr
                  key={rate.shiftType}
                  className={
                    idx < config.rates.length - 1
                      ? "border-b border-border-secondary"
                      : ""
                  }
                >
                  <td className="px-5 py-3 font-medium text-fg">
                    {CUSTOMER_PRICING_SHIFT_LABELS[rate.shiftType]}
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-fg">
                    {rate.payAmount}đ/h
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-fg">
                    {rate.feeAmount}đ/h
                  </td>
                  <td className="px-5 py-3 text-center font-medium text-fg-brand">
                    {rate.gm0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

function ReadRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-4 py-4">
      <span className="text-sm text-fg-tertiary">{label}</span>
      <div className="text-sm text-fg">{children}</div>
    </div>
  );
}

function ReadField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-fg-tertiary">{label}</span>
      <div className="flex h-9 items-center text-sm text-fg">{children}</div>
    </div>
  );
}
