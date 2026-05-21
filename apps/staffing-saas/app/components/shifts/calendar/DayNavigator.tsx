"use client";

import { Button, ButtonUtility } from "@mvp-ui/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addDays,
  formatDateLongVi,
  isSameDay,
  startOfDay,
  WEEKDAY_LABELS_VI,
  type WeekDay,
} from "./lib/date-utils";

interface DayNavigatorProps {
  anchor: Date;
  onChange: (next: Date) => void;
}

export function DayNavigator({ anchor, onChange }: DayNavigatorProps) {
  const day = startOfDay(anchor);
  const today = startOfDay(new Date());
  const isToday = day.getTime() === today.getTime();
  const dowIdx = ((day.getDay() === 0 ? 6 : day.getDay() - 1) as WeekDay);

  return (
    <div className="flex items-center gap-2">
      <ButtonUtility
        size="sm"
        color="tertiary"
        icon={<ChevronLeft />}
        aria-label="Ngày trước"
        onClick={() => onChange(addDays(anchor, -1))}
      />
      <div className="flex h-9 items-center rounded-md border border-border bg-bg px-3 text-sm font-medium text-fg">
        {WEEKDAY_LABELS_VI[dowIdx]}, {formatDateLongVi(day)}
      </div>
      <ButtonUtility
        size="sm"
        color="tertiary"
        icon={<ChevronRight />}
        aria-label="Ngày sau"
        onClick={() => onChange(addDays(anchor, 1))}
      />
      <Button
        size="sm"
        color="secondary"
        disabled={isToday}
        onClick={() => onChange(new Date())}
      >
        Hôm nay
      </Button>
    </div>
  );
}
