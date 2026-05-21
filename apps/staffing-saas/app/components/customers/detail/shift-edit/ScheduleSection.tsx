"use client";

import { Badge, Checkbox, HintText, Input } from "@mvp-ui/ui";
import { useMemo } from "react";
import {
  classifyShiftKind,
  CUSTOMER_SHIFT_KIND_LABELS,
  CUSTOMER_SHIFT_WEEKDAYS,
  type CustomerShiftWeekday,
} from "../../customer-detail-data";
import { SectionCard } from "../SectionCard";
import {
  ESTIMATED_FEE_RATE,
  ESTIMATED_PAY_HOLIDAY,
  ESTIMATED_PAY_REGULAR,
  formatVndPerShift,
  InfoTooltip,
  SHIFT_KIND_ICONS,
  SHIFT_KIND_TOOLTIP,
  SHIFT_TIME_TEMPLATES,
  TOTAL_HOURS_TOOLTIP,
} from "./constants";
import type { SectionProps } from "./types";

export function ScheduleSection({ form, update }: SectionProps) {
  const shiftKind = classifyShiftKind(form.startTime, form.endTime);
  const shiftKindMeta = CUSTOMER_SHIFT_KIND_LABELS[shiftKind];
  const KindIcon = SHIFT_KIND_ICONS[shiftKind];

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

  const tooLong = totalMinutes !== null && totalMinutes > 480;
  const tooShort = totalMinutes !== null && totalMinutes < 180;
  const isWarning = tooLong || tooShort;

  const estimatedRows = useMemo(() => {
    if (totalMinutes === null) return null;
    const hours = totalMinutes / 60;
    const build = (label: string, payPerHour: number) => {
      const pay = payPerHour * hours;
      const fee = pay * ESTIMATED_FEE_RATE;
      return { label, pay, fee, total: pay + fee };
    };
    return [
      build("Ngày thường", ESTIMATED_PAY_REGULAR),
      build("Ngày lễ", ESTIMATED_PAY_HOLIDAY),
    ];
  }, [totalMinutes]);

  return (
    <div className="flex flex-col gap-8">
      <SectionCard title="Ngày trong tuần *">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-6">
              {CUSTOMER_SHIFT_WEEKDAYS.map((day) => (
                <Checkbox
                  key={day.key}
                  size="sm"
                  label={
                    <span className={day.isSunday ? "text-warning-fg" : undefined}>
                      {day.label}
                    </span>
                  }
                  isSelected={form.weekdays.includes(day.key)}
                  onChange={() => toggleWeekday(day.key)}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-5 text-xs">
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
      </SectionCard>

      <SectionCard title="Thời gian làm việc">
        <div className="flex flex-col gap-5">
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

          <div className="flex flex-wrap gap-5 text-xs">
            {SHIFT_TIME_TEMPLATES.map((tpl) => (
              <button
                key={tpl.label}
                type="button"
                onClick={() => {
                  update("startTime", tpl.start);
                  update("endTime", tpl.end);
                  update("breakMinutes", tpl.breakMinutes);
                }}
                className="text-fg-brand hover:underline"
              >
                {tpl.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm text-fg">
            <div className="flex items-center gap-2 rounded-lg bg-bg-secondary p-3">
              <span className="flex items-center gap-1 text-fg-secondary">
                <InfoTooltip content={SHIFT_KIND_TOOLTIP} /> Loại ca
              </span>
              <Badge type="pill-color" color={shiftKindMeta.color} size="sm">
                <span className="inline-flex items-center gap-1">
                  <KindIcon className="size-3" />
                  {shiftKindMeta.label}
                </span>
              </Badge>
            </div>
            {totalMinutes !== null && (
              <div className="flex flex-row gap-4 rounded-lg bg-bg-secondary p-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-fg-secondary">
                    <InfoTooltip content={TOTAL_HOURS_TOOLTIP} /> Tổng giờ công / ca
                  </span>
                  <span
                    className={`font-semibold ${isWarning ? "text-warning-fg" : ""}`}
                  >
                    {Math.floor(totalMinutes / 60)} giờ {totalMinutes % 60} phút
                  </span>
                </div>
                {tooLong && (
                  <HintText>
                    <span className="text-warning-fg">
                      Ca quá dài (tổng giờ công &gt; 8h).
                    </span>
                  </HintText>
                )}
                {tooShort && (
                  <HintText>
                    <span className="text-warning-fg">
                      Ca quá ngắn (tổng giờ công &lt; 3h).
                    </span>
                  </HintText>
                )}
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Chi phí dự kiến"
        description="Chi phí ước lượng dựa trên Cấu hình giá. Thông tin chính xác khi có Ngày làm thực tế."
      >
        {estimatedRows === null ? (
          <p className="text-sm text-fg-tertiary">
            Nhập đủ giờ bắt đầu / kết thúc để xem chi phí dự kiến.
          </p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-border-secondary">
            <table className="w-full text-sm">
              <thead className="bg-bg-secondary text-xs uppercase text-fg-tertiary">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Loại ngày</th>
                  <th className="px-3 py-2 text-right font-medium">
                    Thù lao CTV
                  </th>
                  <th className="px-3 py-2 text-right font-medium">
                    Phí dịch vụ ({Math.round(ESTIMATED_FEE_RATE * 100)}%)
                  </th>
                  <th className="px-3 py-2 text-right font-medium">KH thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {estimatedRows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-t border-border-secondary"
                  >
                    <td className="px-3 py-2 text-fg">{row.label}</td>
                    <td className="px-3 py-2 text-right text-fg">
                      {formatVndPerShift(row.pay)}
                    </td>
                    <td className="px-3 py-2 text-right text-fg">
                      {formatVndPerShift(row.fee)}
                    </td>
                    <td className="px-3 py-2 text-right font-semibold text-fg">
                      {formatVndPerShift(row.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
