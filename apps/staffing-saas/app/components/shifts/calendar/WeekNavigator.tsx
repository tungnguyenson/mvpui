"use client";

import { Button, ButtonUtility } from "@mvp-ui/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addWeeks,
  endOfWeekMonday,
  formatDateRangeVi,
  startOfWeekMonday,
} from "./lib/date-utils";

interface WeekNavigatorProps {
  anchor: Date;
  onChange: (next: Date) => void;
}

export function WeekNavigator({ anchor, onChange }: WeekNavigatorProps) {
  const weekStart = startOfWeekMonday(anchor);
  const weekEnd = endOfWeekMonday(anchor);
  const isCurrentWeek =
    startOfWeekMonday(new Date()).getTime() === weekStart.getTime();

  return (
    <div className="flex items-center gap-2">
      <ButtonUtility
        size="sm"
        color="tertiary"
        icon={<ChevronLeft />}
        aria-label="Tuần trước"
        onClick={() => onChange(addWeeks(anchor, -1))}
      />
      <div className="flex h-9 items-center rounded-md border border-border bg-bg px-3 text-sm font-medium text-fg">
        {formatDateRangeVi(weekStart, weekEnd)}
      </div>
      <ButtonUtility
        size="sm"
        color="tertiary"
        icon={<ChevronRight />}
        aria-label="Tuần sau"
        onClick={() => onChange(addWeeks(anchor, 1))}
      />
      <Button
        size="sm"
        color="secondary"
        disabled={isCurrentWeek}
        onClick={() => onChange(new Date())}
      >
        Tuần này
      </Button>
    </div>
  );
}
