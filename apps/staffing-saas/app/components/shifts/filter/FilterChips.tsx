"use client";

import { BadgeWithButton, Button } from "@mvp-ui/ui";
import {
  DEFAULT_FILTERS,
  FILL_BUCKET_LABELS,
  TIME_BUCKET_LABELS,
  countActiveFilters,
  type FillBucket,
  type ShiftFilters,
  type TimeBucket,
} from "../calendar/lib/filter-state";
import { SHIFT_STATUS_LABELS, type ShiftStatus } from "../shifts-data";

interface FilterChipsProps {
  filters: ShiftFilters;
  onChange: (next: ShiftFilters) => void;
}

export function FilterChips({ filters, onChange }: FilterChipsProps) {
  const activeCount = countActiveFilters(filters);
  if (activeCount === 0) return null;

  const removeRegion = (r: string) =>
    onChange({ ...filters, regions: filters.regions.filter((x) => x !== r) });
  const removeStatus = (s: ShiftStatus) =>
    onChange({ ...filters, statuses: filters.statuses.filter((x) => x !== s) });
  const removeFill = (b: FillBucket) =>
    onChange({
      ...filters,
      fillBuckets: filters.fillBuckets.filter((x) => x !== b),
    });
  const removeTime = (b: TimeBucket) =>
    onChange({
      ...filters,
      timeBuckets: filters.timeBuckets.filter((x) => x !== b),
    });
  const clearSearch = () => onChange({ ...filters, search: "" });

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border-secondary px-4 py-3 md:px-6">
      <span className="text-xs font-medium text-fg-tertiary">Đang lọc:</span>
      {filters.search.trim().length > 0 && (
        <BadgeWithButton
          color="gray"
          type="pill-color"
          size="sm"
          onButtonClick={clearSearch}
        >
          Tìm: "{filters.search}"
        </BadgeWithButton>
      )}
      {filters.regions.map((r) => (
        <BadgeWithButton
          key={`region-${r}`}
          color="brand"
          type="pill-color"
          size="sm"
          onButtonClick={() => removeRegion(r)}
        >
          KV: {r}
        </BadgeWithButton>
      ))}
      {filters.statuses.map((s) => {
        const meta = SHIFT_STATUS_LABELS[s];
        return (
          <BadgeWithButton
            key={`status-${s}`}
            color={meta.color}
            type="pill-color"
            size="sm"
            onButtonClick={() => removeStatus(s)}
          >
            {meta.label}
          </BadgeWithButton>
        );
      })}
      {filters.fillBuckets.map((b) => (
        <BadgeWithButton
          key={`fill-${b}`}
          color="gray"
          type="pill-color"
          size="sm"
          onButtonClick={() => removeFill(b)}
        >
          {FILL_BUCKET_LABELS[b]}
        </BadgeWithButton>
      ))}
      {filters.timeBuckets.map((b) => (
        <BadgeWithButton
          key={`time-${b}`}
          color="gray"
          type="pill-color"
          size="sm"
          onButtonClick={() => removeTime(b)}
        >
          {TIME_BUCKET_LABELS[b]}
        </BadgeWithButton>
      ))}
      <Button
        color="link-gray"
        size="sm"
        onClick={() => onChange(DEFAULT_FILTERS)}
      >
        Xóa tất cả
      </Button>
    </div>
  );
}
