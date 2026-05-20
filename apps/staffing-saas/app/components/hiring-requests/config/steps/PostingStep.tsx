"use client";

import { Badge, Input, RadioButton, RadioGroup } from "@mvp-ui/ui";
import {
  Award,
  Building2,
  Calendar,
  DollarSign,
  Gift,
  MapPin,
} from "lucide-react";
import { SectionCard } from "../SectionCard";
import { useWizard } from "../wizardContext";
import {
  PAY_CYCLE_OPTIONS,
  PAY_DISPLAY_OPTIONS,
} from "../sample-data";
import {
  WEEKDAYS,
  type PayUnit,
  type Visibility,
  type WeekdayKey,
} from "../types";

function formatPay(amount: number, unit: PayUnit): string {
  return `${amount.toLocaleString("vi-VN")}đ/${unit === "shift" ? "ca" : "h"}`;
}

function formatDateVi(iso: string): string {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function formatWeekdays(days: WeekdayKey[]): string {
  return days
    .map((d) => WEEKDAYS.find((w) => w.key === d)?.label)
    .filter(Boolean)
    .join(", ");
}

const VISIBILITY_OPTIONS: Array<{ id: Visibility; title: string; description: string }> = [
  {
    id: "public",
    title: "Công khai",
    description: "Hiển thị cho tất cả freelancer",
  },
  {
    id: "unlisted",
    title: "Hạn chế",
    description: "Chỉ hiển thị qua link trực tiếp",
  },
  {
    id: "private",
    title: "Ẩn",
    description: "Chỉ freelancer được mời mới thấy",
  },
];

export function PostingStep() {
  const { form, setPosting } = useWizard();
  const p = form.posting;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="flex flex-col gap-6">
        <SectionCard title="Nội dung tin đăng">
          <Input
            label="Tiêu đề tin đăng"
            isRequired
            value={p.postingTitle}
            onChange={(e) => setPosting({ postingTitle: e.target.value })}
          />

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-fg-secondary">
              Thù lao hiển thị <span className="text-fg-error">*</span>
            </span>
            <RadioGroup
              size="sm"
              value={
                PAY_DISPLAY_OPTIONS.find(
                  (o) =>
                    o.amount === p.displayedPayAmount &&
                    o.unit === p.displayedPayUnit
                )?.id ?? ""
              }
              onChange={(val) => {
                const opt = PAY_DISPLAY_OPTIONS.find((o) => o.id === val);
                if (opt) {
                  setPosting({
                    displayedPayAmount: opt.amount,
                    displayedPayUnit: opt.unit,
                  });
                }
              }}
            >
              {PAY_DISPLAY_OPTIONS.map((opt) => (
                <RadioButton
                  key={opt.id}
                  value={opt.id}
                  label={formatPay(opt.amount, opt.unit)}
                  hint={opt.hint}
                />
              ))}
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-fg-secondary">
              Chế độ hiển thị <span className="text-fg-error">*</span>
            </span>
            <RadioGroup
              size="sm"
              value={p.visibility}
              onChange={(val) => setPosting({ visibility: val as Visibility })}
            >
              {VISIBILITY_OPTIONS.map((opt) => (
                <RadioButton
                  key={opt.id}
                  value={opt.id}
                  label={opt.title}
                  hint={opt.description}
                />
              ))}
            </RadioGroup>
          </div>
        </SectionCard>
      </div>

      <aside className="lg:sticky lg:top-4 lg:self-start">
        <SectionCard title="Xem trước">
          <PreviewCard />
        </SectionCard>
      </aside>
    </div>
  );
}

function PreviewCard() {
  const { preStep, form } = useWizard();
  const p = form.posting;
  const schedule = form.schedule;
  const pay = form.pay;
  const basic = form.basic;
  const location = preStep.workLocations.find(
    (loc) => loc.id === basic.workLocationId
  );
  const cycle = PAY_CYCLE_OPTIONS.find((c) => c.id === pay.payCycle);
  const title = p.postingTitle || preStep.positionName;
  const dateRange =
    schedule.startDate && schedule.endDate
      ? `${formatDateVi(schedule.startDate)} - ${formatDateVi(schedule.endDate)}`
      : schedule.startDate
        ? formatDateVi(schedule.startDate)
        : "";
  const weekdayLabel = formatWeekdays(schedule.weekdays);
  const shiftLabel =
    schedule.startTime && schedule.endTime
      ? `${schedule.startTime} - ${schedule.endTime}`
      : "";

  return (
    <div className="flex flex-col divide-y divide-border-secondary text-sm">
      <div className="flex items-start gap-3 pb-4">
        {preStep.companyLogoUrl ? (
          <span className="inline-flex size-10 shrink-0 overflow-hidden rounded-md bg-bg-secondary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preStep.companyLogoUrl}
              alt={preStep.companyName}
              className="h-full w-full object-cover"
            />
          </span>
        ) : (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-base font-semibold text-primary-fg">
            {preStep.companyName.charAt(0) || "?"}
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-semibold text-fg leading-snug">
            {title}
          </span>
          <span className="text-sm text-fg-secondary">
            {preStep.companyName}
          </span>
          {location ? (
            <span className="text-xs text-fg-tertiary">
              {location.shortName}
            </span>
          ) : null}
        </div>
      </div>

      <PreviewSection icon={<DollarSign className="size-4" />} title="Thù lao">
        {p.displayedPayAmount !== null ? (
          <Badge color="warning" type="pill-color" size="md">
            {formatPay(p.displayedPayAmount, p.displayedPayUnit)}
          </Badge>
        ) : null}
        {cycle ? (
          <ul className="mt-2 list-disc space-y-1 rounded-md bg-bg-secondary px-5 py-3 text-xs text-fg-secondary">
            <li>Thu nhập thực lãnh (chưa tính thuế TNCN nếu có)</li>
            <li>{cycle.policy}</li>
          </ul>
        ) : null}
      </PreviewSection>

      {pay.hasAdhocBonus &&
      pay.adhocBonusAmount !== null &&
      pay.adhocBonusReason ? (
        <PreviewSection
          icon={<Gift className="size-4" />}
          title="Chính sách thưởng"
        >
          <div className="flex items-start gap-2">
            <Award className="mt-0.5 size-4 shrink-0 text-fg-tertiary" />
            <div className="flex flex-col">
              <span className="font-medium text-fg">
                +{formatPay(pay.adhocBonusAmount, pay.adhocBonusUnit)}
              </span>
              <span className="text-xs text-fg-tertiary">
                {pay.adhocBonusReason}
              </span>
            </div>
          </div>
        </PreviewSection>
      ) : null}

      <PreviewSection
        icon={<Calendar className="size-4" />}
        title="Lịch làm việc"
      >
        <dl className="grid grid-cols-[88px_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-xs">
          {dateRange ? (
            <>
              <dt className="text-fg-tertiary">Thời gian:</dt>
              <dd className="text-fg">{dateRange}</dd>
            </>
          ) : null}
          {weekdayLabel ? (
            <>
              <dt className="text-fg-tertiary">Lịch làm:</dt>
              <dd className="text-fg">{weekdayLabel}</dd>
            </>
          ) : null}
          {shiftLabel ? (
            <>
              <dt className="text-fg-tertiary">Ca làm:</dt>
              <dd className="text-fg">{shiftLabel}</dd>
            </>
          ) : null}
          {schedule.breakMinutes ? (
            <>
              <dt className="text-fg-tertiary">Giải lao:</dt>
              <dd className="text-fg">{schedule.breakMinutes} phút</dd>
            </>
          ) : null}
        </dl>
      </PreviewSection>

      {location ? (
        <PreviewSection
          icon={<Building2 className="size-4" />}
          title="Nơi làm việc"
        >
          <div className="flex items-start gap-2 text-xs text-fg-secondary">
            <MapPin className="mt-0.5 size-4 shrink-0 text-fg-tertiary" />
            <span>{location.address || location.shortName}</span>
          </div>
        </PreviewSection>
      ) : null}

      {basic.description.value ? (
        <PreviewTextSection title="Mô tả công việc" body={basic.description.value} />
      ) : null}
      {basic.benefits.value ? (
        <PreviewTextSection title="Quyền lợi" body={basic.benefits.value} />
      ) : null}
      {basic.requirements.value ? (
        <PreviewTextSection title="Yêu cầu" body={basic.requirements.value} />
      ) : null}
      {basic.instructions.value ? (
        <PreviewTextSection title="Hướng dẫn" body={basic.instructions.value} />
      ) : null}
    </div>
  );
}

function PreviewSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2 py-4">
      <div className="flex items-center gap-2 text-fg">
        <span className="text-fg-tertiary">{icon}</span>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}

function PreviewTextSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="flex flex-col gap-2 py-4">
      <span className="text-sm font-semibold text-fg">{title}</span>
      <p className="whitespace-pre-line text-xs text-fg-secondary">{body}</p>
    </section>
  );
}
