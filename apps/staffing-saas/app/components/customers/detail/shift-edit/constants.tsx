"use client";

import { Tooltip, TooltipTrigger } from "@mvp-ui/ui";
import { Info, type LucideIcon, Moon, Sun, SunMoon } from "lucide-react";

export const SHIFT_KIND_TOOLTIP =
  "TODO: Có thể sẽ cần cấu hình trong chính sách giá giờ tính ca đêm. Mặc định 22h-6h là ca đêm.";

export const TOTAL_HOURS_TOOLTIP =
  "TODO: Cần giới hạn giờ làm tối thiểu/tối đa.";

export function InfoTooltip({ content }: { content: string }) {
  return (
    <Tooltip title={content} placement="top">
      <TooltipTrigger className="inline-flex cursor-help items-center text-fg-quaternary">
        <Info className="size-3.5" />
      </TooltipTrigger>
    </Tooltip>
  );
}

export const SHIFT_KIND_ICONS: Record<"day" | "night" | "mixed", LucideIcon> = {
  day: Sun,
  night: Moon,
  mixed: SunMoon,
};

export const SHIFT_TIME_TEMPLATES: {
  label: string;
  start: string;
  end: string;
  breakMinutes: number;
}[] = [
  { label: "06h → 14h", start: "06:00", end: "14:00", breakMinutes: 30 },
  { label: "08h → 17h", start: "08:00", end: "17:00", breakMinutes: 60 },
  { label: "13h → 22h", start: "13:00", end: "22:00", breakMinutes: 60 },
  { label: "22h → 06h", start: "22:00", end: "06:00", breakMinutes: 30 },
];

export const ESTIMATED_PAY_REGULAR = 40000;
export const ESTIMATED_PAY_HOLIDAY = 45000;
export const ESTIMATED_FEE_RATE = 0.15;

const vndFormatter = new Intl.NumberFormat("vi-VN");

export function formatVndPerShift(value: number): string {
  return `${vndFormatter.format(Math.round(value))}đ/ca`;
}
