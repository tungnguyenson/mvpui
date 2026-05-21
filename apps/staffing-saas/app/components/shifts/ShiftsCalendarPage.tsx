"use client";

import { Button, EmptyState, Tab, TabList, Tabs } from "@mvp-ui/ui";
import Link from "next/link";
import { CalendarDays, Rows3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CustomerScopePicker } from "./calendar/CustomerScopePicker";
import { ShiftDetailModal } from "./calendar/ShiftDetailModal";
import { WeekNavigator } from "./calendar/WeekNavigator";
import { WeekView } from "./calendar/WeekView";
import {
  applyFilters,
  DEFAULT_FILTERS,
  extractCustomerOptions,
  extractOperatorOptions,
  extractRegionOptions,
  type CalendarView,
  type ShiftFilters,
} from "./calendar/lib/filter-state";
import {
  addDays,
  endOfWeekMonday,
  startOfWeekMonday,
} from "./calendar/lib/date-utils";
import { FilterChips } from "./filter/FilterChips";
import { FilterSidebar } from "./filter/FilterSidebar";
import { SHIFTS, type ShiftRecord } from "./shifts-data";

const VIEW_TABS: Array<{ id: CalendarView; label: string }> = [
  { id: "week", label: "Tuần" },
  { id: "day", label: "Ngày" },
  { id: "month", label: "Tháng" },
  { id: "customer", label: "Theo KH" },
];

const SCOPE_STORAGE_KEY = "shifts.calendar.customerId";
const COLLAPSE_STORAGE_KEY = "shifts.calendar.filterCollapsed";

export function ShiftsCalendarPage() {
  const customerOptions = useMemo(() => extractCustomerOptions(SHIFTS), []);
  const regionOptions = useMemo(() => extractRegionOptions(SHIFTS), []);
  const operatorOptions = useMemo(() => extractOperatorOptions(SHIFTS), []);

  const [anchor, setAnchor] = useState<Date>(() => new Date());
  const [view, setView] = useState<CalendarView>("week");
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [filters, setFilters] = useState<ShiftFilters>(DEFAULT_FILTERS);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [selectedShift, setSelectedShift] = useState<ShiftRecord | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(SCOPE_STORAGE_KEY);
    const exists =
      stored !== null && customerOptions.some((c) => c.id === stored);
    setCustomerId(exists ? stored : (customerOptions[0]?.id ?? null));

    const collapsed = window.localStorage.getItem(COLLAPSE_STORAGE_KEY);
    if (collapsed === "1") setSidebarCollapsed(true);
  }, [customerOptions]);

  useEffect(() => {
    if (typeof window === "undefined" || customerId === null) return;
    window.localStorage.setItem(SCOPE_STORAGE_KEY, customerId);
  }, [customerId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      COLLAPSE_STORAGE_KEY,
      sidebarCollapsed ? "1" : "0",
    );
  }, [sidebarCollapsed]);

  const weekStart = startOfWeekMonday(anchor);
  const weekEnd = endOfWeekMonday(anchor);
  const weekEndExclusive = addDays(weekEnd, 1).getTime();

  const weekShifts = useMemo(
    () =>
      SHIFTS.filter(
        (s) =>
          s.startAtMs >= weekStart.getTime() &&
          s.startAtMs < weekEndExclusive,
      ),
    [weekStart, weekEndExclusive],
  );

  const filteredShifts = useMemo(
    () => applyFilters(weekShifts, customerId, filters),
    [weekShifts, customerId, filters],
  );

  const totalInScope = useMemo(
    () => applyFilters(weekShifts, customerId, DEFAULT_FILTERS).length,
    [weekShifts, customerId],
  );

  const handleViewChange = (key: string | number) => {
    setView(key as CalendarView);
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-bg-secondary">
      {/* Header */}
      <header className="flex flex-col gap-3 border-b border-border-secondary bg-bg px-4 py-4 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <WeekNavigator anchor={anchor} onChange={setAnchor} />
            <CustomerScopePicker
              customerId={customerId}
              options={customerOptions}
              onChange={setCustomerId}
              disabled={view === "customer"}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button asChild color="secondary" size="sm">
              <Link href="/shifts/list">
                <Rows3 className="size-4" />
                Bảng
              </Link>
            </Button>
            {/* <Button size="sm">
              <Plus className="size-4" />
              Tạo ca
            </Button> */}
          </div>
        </div>
        <Tabs
          size="sm"
          variant="pill"
          selectedKey={view}
          onSelectionChange={handleViewChange}
        >
          <TabList aria-label="Chế độ xem">
            {VIEW_TABS.map((t) => (
              <Tab key={t.id} id={t.id}>
                {t.label}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </header>

      <FilterChips filters={filters} onChange={setFilters} />

      <div className="flex flex-1 min-h-0">
        <main className="flex-1 overflow-auto px-4 py-4 md:px-6">
          <div className="mb-3 flex items-center justify-between gap-2 text-sm text-fg-tertiary">
            <span>
              {filteredShifts.length} ca trong tuần
              {filteredShifts.length !== totalInScope && (
                <> · lọc từ {totalInScope} ca</>
              )}
            </span>
          </div>
          {view === "week" && (
            <WeekViewPanel
              anchor={anchor}
              filteredShifts={filteredShifts}
              totalInScope={totalInScope}
              selectedShift={selectedShift}
              onSelectShift={setSelectedShift}
            />
          )}
          {view !== "week" && <ComingSoonPanel view={view} />}
        </main>
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          regionOptions={regionOptions}
          operatorOptions={operatorOptions}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
      </div>

      <ShiftDetailModal
        shift={selectedShift}
        onClose={() => setSelectedShift(null)}
      />
    </div>
  );
}

interface WeekViewPanelProps {
  anchor: Date;
  filteredShifts: ShiftRecord[];
  totalInScope: number;
  selectedShift: ShiftRecord | null;
  onSelectShift: (shift: ShiftRecord) => void;
}

function WeekViewPanel({
  anchor,
  filteredShifts,
  totalInScope,
  selectedShift,
  onSelectShift,
}: WeekViewPanelProps) {
  if (totalInScope === 0) {
    return (
      <EmptyState
        title="Không có ca trong tuần này"
        description="Khách hàng đã chọn không có ca nào trong khoảng tuần đang xem. Thử đổi tuần hoặc chọn khách hàng khác."
        icon={<CalendarDays className="size-12 text-fg-tertiary" />}
      />
    );
  }
  return (
    <WeekView
      anchor={anchor}
      shifts={filteredShifts}
      selectedShiftId={selectedShift?.id ?? null}
      onSelectShift={onSelectShift}
    />
  );
}

function ComingSoonPanel({ view }: { view: CalendarView }) {
  const labels: Record<CalendarView, string> = {
    week: "Tuần",
    day: "Ngày",
    month: "Tháng",
    customer: "Theo Khách hàng",
    table: "Bảng",
  };
  return (
    <EmptyState
      title={`Chế độ "${labels[view]}" sắp ra mắt`}
      description="Phase 2 sẽ mở chế độ xem này. Hiện tại bạn có thể dùng tab Tuần."
      icon={<CalendarDays className="size-12 text-fg-tertiary" />}
    />
  );
}
