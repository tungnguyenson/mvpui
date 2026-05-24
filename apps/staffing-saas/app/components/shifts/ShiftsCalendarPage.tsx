"use client";

import {
  ButtonUtility,
  Drawer,
  DrawerBody,
  EmptyState,
  Tab,
  TabList,
  Tabs,
} from "@mvp-ui/ui";
import { CalendarDays, SlidersHorizontal, Table2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CustomerScopePicker } from "./calendar/CustomerScopePicker";
import { CustomerView } from "./calendar/CustomerView";
import { DayNavigator } from "./calendar/DayNavigator";
import { DayView } from "./calendar/DayView";
import { ShiftDetailModal } from "./calendar/ShiftDetailModal";
import { ShiftsTableView } from "./ShiftsTableView";
import { WeekNavigator } from "./calendar/WeekNavigator";
import { WeekView } from "./calendar/WeekView";
import {
  applyFilters,
  countActiveFilters,
  DEFAULT_FILTERS,
  extractCustomerOptions,
  extractOperatorOptions,
  extractRegionOptions,
  type CalendarView,
  type DisplayMode,
  type ShiftFilters,
} from "./lib/filter-state";
import {
  addDays,
  endOfWeekMonday,
  startOfWeekMonday,
} from "./lib/date-utils";
import { FilterChips } from "./filter/FilterChips";
import { FilterContent } from "./filter/FilterSidebar";
import { FilterSidebar } from "./filter/FilterSidebar";
import { SHIFTS, type ShiftRecord } from "./shifts-data";

const DISPLAY_TABS: Array<{
  id: DisplayMode;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: "calendar", label: "Calendar", icon: <CalendarDays className="size-4" /> },
  { id: "table", label: "Bảng", icon: <Table2 className="size-4" /> },
];

const CALENDAR_VIEW_TABS: Array<{ id: CalendarView; label: string }> = [
  { id: "week", label: "Tuần" },
  { id: "day", label: "Ngày" },
  { id: "customer", label: "Theo KH" },
];

const GLOBAL_SCOPE_STORAGE_KEY = "shifts.calendar.customerIds";
const WEEK_SCOPE_STORAGE_KEY = "shifts.calendar.weekCustomerId";
const COLLAPSE_STORAGE_KEY = "shifts.calendar.filterCollapsed";
const DISPLAY_STORAGE_KEY = "shifts.calendar.displayMode";
const SUBVIEW_STORAGE_KEY = "shifts.calendar.subview";

export function ShiftsCalendarPage() {
  const customerOptions = useMemo(() => extractCustomerOptions(SHIFTS), []);
  const regionOptions = useMemo(() => extractRegionOptions(SHIFTS), []);
  const operatorOptions = useMemo(() => extractOperatorOptions(SHIFTS), []);

  const [anchor, setAnchor] = useState<Date>(() => new Date());
  const [displayMode, setDisplayMode] = useState<DisplayMode>("calendar");
  const [calendarView, setCalendarView] = useState<CalendarView>("week");
  const [weekCustomerId, setWeekCustomerId] = useState<string | null>(null);
  const [globalCustomerIds, setGlobalCustomerIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<ShiftFilters>(DEFAULT_FILTERS);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [selectedShift, setSelectedShift] = useState<ShiftRecord | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Hydrate from localStorage + detect mobile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobileNow = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobileNow);

    const storedDisplay = window.localStorage.getItem(DISPLAY_STORAGE_KEY);
    if (storedDisplay === "calendar" || storedDisplay === "table") {
      setDisplayMode(storedDisplay);
    }

    const storedSub = window.localStorage.getItem(SUBVIEW_STORAGE_KEY);
    if (mobileNow) {
      setCalendarView("day");
    } else if (
      storedSub === "week" ||
      storedSub === "day" ||
      storedSub === "customer"
    ) {
      setCalendarView(storedSub);
    }

    // Week-view single customer (mandatory)
    const storedWeek = window.localStorage.getItem(WEEK_SCOPE_STORAGE_KEY);
    const weekValid =
      storedWeek !== null &&
      customerOptions.some((c) => c.id === storedWeek);
    setWeekCustomerId(weekValid ? storedWeek : customerOptions[0]?.id ?? null);

    // Global multi-select customer (for Day / Theo KH / Bảng)
    const storedGlobal = window.localStorage.getItem(GLOBAL_SCOPE_STORAGE_KEY);
    let initialGlobal: string[] = [];
    if (storedGlobal) {
      try {
        const parsed = JSON.parse(storedGlobal) as string[];
        if (Array.isArray(parsed)) {
          initialGlobal = parsed.filter((id) =>
            customerOptions.some((c) => c.id === id),
          );
        }
      } catch {
        // ignore
      }
    }
    setGlobalCustomerIds(initialGlobal);

    const collapsed = window.localStorage.getItem(COLLAPSE_STORAGE_KEY);
    if (collapsed === "1") setSidebarCollapsed(true);
  }, [customerOptions]);

  // Track viewport changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (e.matches) setCalendarView("day");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(DISPLAY_STORAGE_KEY, displayMode);
  }, [displayMode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SUBVIEW_STORAGE_KEY, calendarView);
  }, [calendarView]);

  useEffect(() => {
    if (typeof window === "undefined" || weekCustomerId === null) return;
    window.localStorage.setItem(WEEK_SCOPE_STORAGE_KEY, weekCustomerId);
  }, [weekCustomerId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      GLOBAL_SCOPE_STORAGE_KEY,
      JSON.stringify(globalCustomerIds),
    );
  }, [globalCustomerIds]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      COLLAPSE_STORAGE_KEY,
      sidebarCollapsed ? "1" : "0",
    );
  }, [sidebarCollapsed]);

  const showsHeaderCustomerPicker =
    displayMode === "calendar" && calendarView === "week";

  const effectiveCustomerIds = useMemo<string[]>(() => {
    if (showsHeaderCustomerPicker) {
      return weekCustomerId ? [weekCustomerId] : [];
    }
    return globalCustomerIds;
  }, [showsHeaderCustomerPicker, weekCustomerId, globalCustomerIds]);

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
    () => applyFilters(weekShifts, effectiveCustomerIds, filters),
    [weekShifts, effectiveCustomerIds, filters],
  );

  const totalInScope = useMemo(
    () => applyFilters(weekShifts, effectiveCustomerIds, DEFAULT_FILTERS).length,
    [weekShifts, effectiveCustomerIds],
  );

  const showsDayNav =
    displayMode === "calendar" && calendarView === "day";

  const activeFilterCount = countActiveFilters(filters);

  const filterContentProps = {
    filters,
    onChange: setFilters,
    regionOptions,
    operatorOptions,
    customerOptions,
    customerIds: globalCustomerIds,
    onCustomerIdsChange: setGlobalCustomerIds,
    showCustomerSection: !showsHeaderCustomerPicker,
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-bg-secondary">
      <header className="flex flex-col gap-3 border-b border-border-secondary bg-bg px-4 py-4 md:px-6">
        {/* Display mode tabs + calendar sub-view tabs (sub-view hidden on mobile) + mobile filter button */}
        <div className="flex items-center gap-4">
          <Tabs
            size="sm"
            variant="pill"
            selectedKey={displayMode}
            onSelectionChange={(k) => setDisplayMode(k as DisplayMode)}
          >
            <TabList aria-label="Chế độ hiển thị">
              {DISPLAY_TABS.map((t) => (
                <Tab key={t.id} id={t.id} icon={t.icon}>
                  {t.label}
                </Tab>
              ))}
            </TabList>
          </Tabs>
          {displayMode === "calendar" && (
            <div className="hidden items-center gap-4 md:flex">
              <span aria-hidden="true" className="h-6 w-px bg-border-secondary" />
              <Tabs
                size="sm"
                variant="underline"
                selectedKey={calendarView}
                onSelectionChange={(k) => setCalendarView(k as CalendarView)}
              >
                <TabList aria-label="Chế độ xem lịch">
                  {CALENDAR_VIEW_TABS.map((t) => (
                    <Tab key={t.id} id={t.id}>
                      {t.label}
                    </Tab>
                  ))}
                </TabList>
              </Tabs>
            </div>
          )}
          <div className="relative ml-auto md:hidden">
            <ButtonUtility
              size="sm"
              color="tertiary"
              icon={<SlidersHorizontal />}
              aria-label={`Bộ lọc${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`}
              onClick={() => setFilterDrawerOpen(true)}
            />
            {activeFilterCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-fg-brand px-1 text-[10px] font-semibold leading-none text-primary-fg"
              >
                {activeFilterCount}
              </span>
            )}
          </div>
        </div>

        {/* Date nav + customer picker */}
        <div className="flex flex-wrap items-center gap-3">
          {showsDayNav ? (
            <DayNavigator anchor={anchor} onChange={setAnchor} />
          ) : (
            <WeekNavigator anchor={anchor} onChange={setAnchor} />
          )}
          {showsHeaderCustomerPicker && (
            <CustomerScopePicker
              customerId={weekCustomerId}
              options={customerOptions}
              onChange={(id) => setWeekCustomerId(id)}
            />
          )}
        </div>
      </header>

      <FilterChips filters={filters} onChange={setFilters} />

      <div className="flex flex-1 min-h-0">
        <main className="flex-1 overflow-auto px-4 py-4 md:px-6">
          <SummaryLine
            displayMode={displayMode}
            calendarView={calendarView}
            anchor={anchor}
            filteredShifts={filteredShifts}
            totalInScope={totalInScope}
          />
          {displayMode === "table" ? (
            <ShiftsTableView shifts={filteredShifts} />
          ) : calendarView === "week" ? (
            <WeekViewPanel
              anchor={anchor}
              filteredShifts={filteredShifts}
              totalInScope={totalInScope}
              selectedShift={selectedShift}
              onSelectShift={setSelectedShift}
              hasCustomerSelected={weekCustomerId !== null}
            />
          ) : calendarView === "day" ? (
            <DayView
              anchor={anchor}
              shifts={filteredShifts}
              selectedShiftId={selectedShift?.id ?? null}
              onSelectShift={setSelectedShift}
            />
          ) : (
            <CustomerView
              anchor={anchor}
              shifts={filteredShifts}
              selectedShiftId={selectedShift?.id ?? null}
              onSelectShift={setSelectedShift}
            />
          )}
        </main>
        {!isMobile && (
          <FilterSidebar
            {...filterContentProps}
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
          />
        )}
      </div>

      <ShiftDetailModal
        shift={selectedShift}
        onClose={() => setSelectedShift(null)}
      />

      {isMobile && (
        <Drawer
          isOpen={filterDrawerOpen}
          onOpenChange={setFilterDrawerOpen}
          title="Bộ lọc"
          side="right"
          size="sm"
          showCloseButton
        >
          <DrawerBody>
            <FilterContent {...filterContentProps} />
          </DrawerBody>
        </Drawer>
      )}
    </div>
  );
}

interface WeekViewPanelProps {
  anchor: Date;
  filteredShifts: ShiftRecord[];
  totalInScope: number;
  selectedShift: ShiftRecord | null;
  onSelectShift: (shift: ShiftRecord) => void;
  hasCustomerSelected: boolean;
}

function WeekViewPanel({
  anchor,
  filteredShifts,
  totalInScope,
  selectedShift,
  onSelectShift,
  hasCustomerSelected,
}: WeekViewPanelProps) {
  if (!hasCustomerSelected) {
    return (
      <EmptyState
        title="Chọn khách hàng để xem lịch tuần"
        description="View Tuần cần chọn 1 khách hàng để tránh hiển thị quá nhiều ca."
        icon={<CalendarDays className="size-12 text-fg-tertiary" />}
      />
    );
  }
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

interface SummaryLineProps {
  displayMode: DisplayMode;
  calendarView: CalendarView;
  anchor: Date;
  filteredShifts: ShiftRecord[];
  totalInScope: number;
}

function SummaryLine({
  displayMode,
  calendarView,
  anchor,
  filteredShifts,
  totalInScope,
}: SummaryLineProps) {
  const isDay = displayMode === "calendar" && calendarView === "day";

  const dayCount = isDay
    ? filteredShifts.filter((s) => {
        const d = new Date(s.startAtMs);
        return (
          d.getFullYear() === anchor.getFullYear() &&
          d.getMonth() === anchor.getMonth() &&
          d.getDate() === anchor.getDate()
        );
      }).length
    : filteredShifts.length;

  const noun =
    displayMode === "table"
      ? "ca khớp"
      : isDay
        ? "ca trong ngày"
        : "ca trong tuần";

  const filtered = isDay
    ? null
    : filteredShifts.length !== totalInScope
      ? ` · lọc từ ${totalInScope} ca`
      : "";

  return (
    <div className="mb-3 flex items-center justify-between gap-2 text-sm text-fg-tertiary">
      <span>
        {dayCount} {noun}
        {filtered}
      </span>
    </div>
  );
}
