"use client";

import {
  Button,
  ButtonUtility,
  Checkbox,
  Input,
  MultiSelect,
  SelectItem,
} from "@mvp-ui/ui";
import {
  ChevronsLeft,
  ChevronsRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "../lib/cn";
import {
  DEFAULT_FILTERS,
  FILL_BUCKET_LABELS,
  TIME_BUCKET_LABELS,
  countActiveFilters,
  type FillBucket,
  type ShiftFilters,
  type TimeBucket,
} from "../lib/filter-state";
import { SHIFT_STATUS_LABELS, type ShiftStatus } from "../shifts-data";

interface FilterSidebarProps {
  filters: ShiftFilters;
  onChange: (next: ShiftFilters) => void;
  regionOptions: string[];
  operatorOptions: Array<{
    id: string;
    name: string;
    initials: string;
    avatarUrl?: string;
  }>;
  customerOptions: Array<{
    id: string;
    name: string;
    shiftCount: number;
    logoUrl?: string;
  }>;
  customerIds: string[];
  onCustomerIdsChange: (next: string[]) => void;
  showCustomerSection: boolean;
  collapsed: boolean;
  onCollapsedChange: (next: boolean) => void;
}

const STATUS_ORDER: ShiftStatus[] = [
  "critical",
  "open",
  "filling",
  "full",
  "closed",
];

const FILL_ORDER: FillBucket[] = ["low", "mid", "full"];
const TIME_ORDER: TimeBucket[] = ["morning", "afternoon", "evening", "night"];

export function FilterSidebar({
  filters,
  onChange,
  regionOptions,
  operatorOptions,
  customerOptions,
  customerIds,
  onCustomerIdsChange,
  showCustomerSection,
  collapsed,
  onCollapsedChange,
}: FilterSidebarProps) {
  const activeCount = countActiveFilters(filters);

  if (collapsed) {
    return (
      <aside className="flex w-14 shrink-0 flex-col items-center gap-3 border-l border-border-secondary bg-bg py-4">
        <ButtonUtility
          size="sm"
          color="tertiary"
          icon={<ChevronsLeft />}
          aria-label="Mở rộng bộ lọc"
          onClick={() => onCollapsedChange(false)}
        />
        <div className="relative">
          <ButtonUtility
            size="sm"
            color="tertiary"
            icon={<SlidersHorizontal />}
            aria-label={`Bộ lọc (${activeCount} đang dùng)`}
            onClick={() => onCollapsedChange(false)}
          />
          {activeCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-fg-brand px-1 text-[10px] font-semibold leading-none text-primary-fg"
            >
              {activeCount}
            </span>
          )}
        </div>
      </aside>
    );
  }

  const setSearch = (v: string) => onChange({ ...filters, search: v });

  const setRegions = (next: string[]) => onChange({ ...filters, regions: next });
  const setOperators = (next: string[]) =>
    onChange({ ...filters, operators: next });

  const toggleStatus = (status: ShiftStatus, on: boolean) => {
    const set = new Set(filters.statuses);
    if (on) set.add(status);
    else set.delete(status);
    onChange({ ...filters, statuses: Array.from(set) });
  };

  const toggleFill = (bucket: FillBucket) => {
    const set = new Set(filters.fillBuckets);
    if (set.has(bucket)) set.delete(bucket);
    else set.add(bucket);
    onChange({ ...filters, fillBuckets: Array.from(set) });
  };

  const toggleTime = (bucket: TimeBucket) => {
    const set = new Set(filters.timeBuckets);
    if (set.has(bucket)) set.delete(bucket);
    else set.add(bucket);
    onChange({ ...filters, timeBuckets: Array.from(set) });
  };

  return (
    <aside className="flex w-72 shrink-0 flex-col gap-6 border-l border-border-secondary bg-bg px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-fg-tertiary" />
          <h2 className="text-sm font-semibold text-fg">Bộ lọc</h2>
          {activeCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-info-bg px-1.5 text-xs font-semibold text-info-fg">
              {activeCount}
            </span>
          )}
        </div>
        <ButtonUtility
          size="sm"
          color="tertiary"
          icon={<ChevronsRight />}
          aria-label="Thu gọn bộ lọc"
          onClick={() => onCollapsedChange(true)}
        />
      </div>

      {showCustomerSection && (
        <Section title="Khách hàng">
          <MultiSelect
            items={customerOptions.map((c) =>
              c.logoUrl
                ? {
                    id: c.id,
                    label: c.name,
                    supportingText: `${c.shiftCount} ca`,
                    avatarUrl: c.logoUrl,
                  }
                : {
                    id: c.id,
                    label: c.name,
                    supportingText: `${c.shiftCount} ca`,
                  },
            )}
            selectedKeys={new Set(customerIds)}
            onSelectionChange={(keys) => {
              if (keys === "all") {
                onCustomerIdsChange(customerOptions.map((c) => c.id));
              } else {
                onCustomerIdsChange(Array.from(keys, String));
              }
            }}
            placeholder="Tất cả khách hàng"
            showFooter
            showSearch={false}
            onReset={() => onCustomerIdsChange([])}
            onSelectAll={() =>
              onCustomerIdsChange(customerOptions.map((c) => c.id))
            }
          >
            {(item) => (
              <SelectItem
                id={item.id}
                label={item.label}
                supportingText={item.supportingText}
                {...("avatarUrl" in item && item.avatarUrl
                  ? { avatarUrl: item.avatarUrl }
                  : {})}
              >
                {item.label}
              </SelectItem>
            )}
          </MultiSelect>
        </Section>
      )}

      <Section title="Tìm kiếm">
        <Input
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tên/code ca, site..."
          iconLeading={<Search className="size-4" />}
          aria-label="Tìm kiếm ca"
        />
      </Section>

      <Section title="Khu vực">
        <MultiSelect
          items={regionOptions.map((r) => ({ id: r, label: r }))}
          selectedKeys={new Set(filters.regions)}
          onSelectionChange={(keys) => {
            if (keys === "all") {
              setRegions(regionOptions);
            } else {
              setRegions(Array.from(keys, String));
            }
          }}
          placeholder="Tất cả khu vực"
          showFooter
          showSearch={false}
          onReset={() => setRegions([])}
          onSelectAll={() => setRegions(regionOptions)}
        >
          {(item) => (
            <SelectItem id={item.id} label={item.label}>
              {item.label}
            </SelectItem>
          )}
        </MultiSelect>
      </Section>

      <Section title="Người điều phối">
        <MultiSelect
          items={operatorOptions.map((o) =>
            o.avatarUrl
              ? { id: o.id, label: o.name, avatarUrl: o.avatarUrl }
              : { id: o.id, label: o.name },
          )}
          selectedKeys={new Set(filters.operators)}
          onSelectionChange={(keys) => {
            if (keys === "all") {
              setOperators(operatorOptions.map((o) => o.id));
            } else {
              setOperators(Array.from(keys, String));
            }
          }}
          placeholder="Tất cả người điều phối"
          showFooter
          showSearch={false}
          onReset={() => setOperators([])}
          onSelectAll={() => setOperators(operatorOptions.map((o) => o.id))}
        >
          {(item) => (
            <SelectItem
              id={item.id}
              label={item.label}
              {...(item.avatarUrl ? { avatarUrl: item.avatarUrl } : {})}
            >
              {item.label}
            </SelectItem>
          )}
        </MultiSelect>
      </Section>

      <Section title="Trạng thái">
        <div className="flex flex-col gap-2">
          {STATUS_ORDER.map((status) => {
            const meta = SHIFT_STATUS_LABELS[status];
            const checked = filters.statuses.includes(status);
            return (
              <Checkbox
                key={status}
                size="sm"
                isSelected={checked}
                onChange={(on) => toggleStatus(status, on)}
                label={meta.label}
              />
            );
          })}
        </div>
      </Section>

      <Section title="Tiến độ fill">
        <ChipGroup>
          {FILL_ORDER.map((bucket) => (
            <ChipButton
              key={bucket}
              active={filters.fillBuckets.includes(bucket)}
              onClick={() => toggleFill(bucket)}
            >
              {FILL_BUCKET_LABELS[bucket]}
            </ChipButton>
          ))}
        </ChipGroup>
      </Section>

      <Section title="Khung giờ">
        <ChipGroup>
          {TIME_ORDER.map((bucket) => (
            <ChipButton
              key={bucket}
              active={filters.timeBuckets.includes(bucket)}
              onClick={() => toggleTime(bucket)}
            >
              {TIME_BUCKET_LABELS[bucket]}
            </ChipButton>
          ))}
        </ChipGroup>
      </Section>

      <div className="mt-2 flex justify-end border-t border-border-secondary pt-3">
        <Button
          color="tertiary"
          size="sm"
          disabled={activeCount === 0}
          onClick={() => onChange(DEFAULT_FILTERS)}
        >
          Xóa lọc
        </Button>
      </div>
    </aside>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
        {title}
      </h3>
      {children}
    </section>
  );
}

function ChipGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-1.5">{children}</div>;
}

function ChipButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "border-border-brand bg-info-bg text-fg-brand"
          : "border-border-secondary bg-bg text-fg-secondary hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
