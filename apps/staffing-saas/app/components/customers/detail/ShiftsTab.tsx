"use client";

import {
  Badge,
  Button,
  Input,
  Select,
  SelectItem,
  Tab,
  TabList,
  Table,
  Tabs,
} from "@mvp-ui/ui";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Pencil, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CUSTOMER_SHIFT_WEEKDAYS,
  type CustomerLocation,
  type CustomerPosition,
  type CustomerPricingConfig,
  type CustomerShift,
  type CustomerShiftStatus,
  type CustomerShiftWeekday,
} from "../customer-detail-data";
import { ShiftEditView } from "./ShiftEditView";

interface ShiftsTabProps {
  shifts: CustomerShift[];
  positions: CustomerPosition[];
  locations: CustomerLocation[];
  pricingConfigs: CustomerPricingConfig[];
  customerId: string;
}

type StatusTabId = "all" | CustomerShiftStatus;

const STATUS_TABS: { id: StatusTabId; label: string; dot?: "success" | "gray" }[] = [
  { id: "active", label: "Đang hoạt động", dot: "success" },
  { id: "inactive", label: "Ngừng hoạt động", dot: "gray" },
  { id: "all", label: "Tất cả" },
];

const COLUMNS = [
  { id: "id", name: "Mã" },
  { id: "name", name: "Tên ca", isRowHeader: true as const },
  { id: "location", name: "Địa điểm" },
  { id: "schedule", name: "Lịch" },
  { id: "pricing", name: "Cấu hình giá" },
  { id: "usage", name: "Đang dùng" },
  { id: "actions", name: "" },
];

export function ShiftsTab({
  shifts,
  positions,
  locations,
  pricingConfigs,
  customerId,
}: ShiftsTabProps) {
  const searchParams = useSearchParams();
  const shiftParam = searchParams.get("shift");

  const selected = useMemo<
    { mode: "create" } | { mode: "edit"; shift: CustomerShift } | null
  >(() => {
    if (!shiftParam) return null;
    if (shiftParam === "new") return { mode: "create" };
    const shift = shifts.find((s) => s.id === shiftParam);
    return shift ? { mode: "edit", shift } : null;
  }, [shiftParam, shifts]);

  const buildHref = (shiftId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "shifts");
    if (shiftId === null) params.delete("shift");
    else params.set("shift", shiftId);
    return `?${params.toString()}`;
  };

  if (selected) {
    return (
      <ShiftEditView
        {...(selected.mode === "edit" ? { shift: selected.shift } : {})}
        positions={positions}
        locations={locations}
        pricingConfigs={pricingConfigs}
        backHref={buildHref(null)}
        customerId={customerId}
      />
    );
  }

  return (
    <ShiftsList
      shifts={shifts}
      positions={positions}
      locations={locations}
      pricingConfigs={pricingConfigs}
      buildHref={buildHref}
    />
  );
}

interface ShiftsListProps {
  shifts: CustomerShift[];
  positions: CustomerPosition[];
  locations: CustomerLocation[];
  pricingConfigs: CustomerPricingConfig[];
  buildHref: (shiftId: string | null) => string;
}

function ShiftsList({
  shifts,
  positions,
  locations,
  pricingConfigs,
  buildHref,
}: ShiftsListProps) {
  const [query, setQuery] = useState("");
  const [positionId, setPositionId] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");
  const [pricingId, setPricingId] = useState<string>("");
  const [statusTab, setStatusTab] = useState<StatusTabId>("active");

  const counts = useMemo(() => {
    const base = { active: 0, inactive: 0 };
    for (const s of shifts) base[s.status] += 1;
    return { ...base, all: shifts.length };
  }, [shifts]);

  const positionsById = useMemo(
    () => new Map(positions.map((p) => [p.id, p])),
    [positions]
  );
  const locationsById = useMemo(
    () => new Map(locations.map((l) => [l.id, l])),
    [locations]
  );
  const pricingById = useMemo(
    () => new Map(pricingConfigs.map((c) => [c.id, c])),
    [pricingConfigs]
  );

  const filtered = useMemo(() => {
    return shifts.filter((shift) => {
      const matchQuery = query
        ? shift.name.toLowerCase().includes(query.toLowerCase()) ||
        shift.id.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchPosition = positionId ? shift.positionId === positionId : true;
      const matchLocation = locationId ? shift.locationId === locationId : true;
      const matchPricing = pricingId
        ? String(shift.pricingConfigId) === pricingId
        : true;
      const matchStatus = statusTab === "all" ? true : shift.status === statusTab;
      return (
        matchQuery && matchPosition && matchLocation && matchPricing && matchStatus
      );
    });
  }, [shifts, query, positionId, locationId, pricingId, statusTab]);

  const reset = () => {
    setQuery("");
    setPositionId("");
    setLocationId("");
    setPricingId("");
  };

  return (
    <div className="flex flex-col gap-6">

      <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
        <div className="flex flex-col md:flex-row gap-1 border-b border-border-secondary px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-fg">Ca làm việc</h2>
            <p className="text-sm text-fg-tertiary">
              Mỗi ca = vị trí + địa điểm + lịch + cấu hình giá + chính sách. Khi tạo
              y/c tuyển dụng, chọn ca và thêm ngày làm.
            </p>
          </div>
          <div className="flex flex-1" />
          <div className="flex items-center">
            <Link href={buildHref("new")} scroll={false}>
              <Button
                color="primary"
                size="sm"
                iconLeading={<Plus className="size-4" />}
              >
                Thêm ca làm việc
              </Button>
            </Link>
          </div>
        </div>

        <div className="border-b border-border-secondary px-5 py-3">
          <Tabs
            variant="pill"
            size="sm"
            selectedKey={statusTab}
            onSelectionChange={(key) => setStatusTab(key as StatusTabId)}
          >
            <TabList aria-label="Lọc ca làm việc theo trạng thái">
              {STATUS_TABS.map((t) => (
                <Tab key={t.id} id={t.id} value={counts[t.id]}>
                  <span className="inline-flex items-center gap-2">
                    {t.dot && (
                      <span
                        aria-hidden
                        className={`size-2 rounded-full ${t.dot === "success" ? "bg-success-fg" : "bg-fg-quaternary"
                          }`}
                      />
                    )}
                    {t.label}
                  </span>
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </div>
        <Table aria-label="Danh sách ca làm việc">
          <Table.Header>
            {COLUMNS.map((column) => (
              <Table.Head
                key={column.id}
                id={column.id}
                label={column.name}
                {...(column.isRowHeader && { isRowHeader: true })}
              />
            ))}
          </Table.Header>
          <Table.Body
            items={filtered}
            renderEmptyState={() => (
              <p className="px-6 py-12 text-center text-sm text-fg-tertiary">
                Không có dữ liệu
              </p>
            )}
          >
            {(shift) => {
              const location = locationsById.get(shift.locationId);
              const pricing = pricingById.get(shift.pricingConfigId);
              const overnight = shift.endTime <= shift.startTime;
              return (
                <Table.Row
                  id={shift.id}
                  className={
                    shift.status === "inactive"
                      ? "opacity-60 [&_td]:text-fg-tertiary"
                      : ""
                  }
                >
                  <Table.Cell>
                    <Link
                      href={buildHref(shift.id)}
                      scroll={false}
                      className="font-medium text-fg-brand hover:underline"
                    >
                      {shift.id}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="font-medium text-fg">{shift.name}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span title={location?.address}>
                      {location?.shortName ?? "—"}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-col gap-1">
                      <WeekdayChips weekdays={shift.weekdays} />
                      <span className="text-sm text-fg-secondary">
                        {shift.startTime} → {shift.endTime}
                        {overnight ? (
                          <span className="ml-1.5 text-xs text-fg-tertiary">
                            (qua đêm)
                          </span>
                        ) : null}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {pricing ? (
                      <Link
                        href={`?tab=pricing&config=${pricing.id}`}
                        scroll={false}
                        className="text-fg-brand hover:underline"
                      >
                        {pricing.name}
                      </Link>
                    ) : (
                      <span className="text-fg-tertiary">—</span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {shift.hiringRequestCount > 0 ? (
                      <Badge type="pill-color" color="brand" size="sm">
                        {shift.hiringRequestCount} y/c
                      </Badge>
                    ) : (
                      <span className="text-fg-tertiary">0</span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={buildHref(shift.id)} scroll={false}>
                      <Button
                        color="secondary"
                        size="sm"
                        iconLeading={<Pencil className="size-4" />}
                      >
                        Sửa
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table>
        <div className="flex items-center justify-end gap-4 border-t border-border-secondary px-5 py-3 text-sm text-fg-tertiary">
          <span>
            1-{filtered.length} of {filtered.length} items
          </span>
          <span className="rounded-md border border-border-secondary px-2 py-1 text-xs text-fg">
            20 / trang
          </span>
        </div>
      </div>
    </div>
  );
}

function WeekdayChips({ weekdays }: { weekdays: CustomerShiftWeekday[] }) {
  const set = new Set(weekdays);
  return (
    <div className="flex gap-1 text-xs">
      {CUSTOMER_SHIFT_WEEKDAYS.map((day) => {
        const active = set.has(day.key);
        const baseColor = day.isSunday ? "text-fg-warning" : "text-fg";
        return (
          <span
            key={day.key}
            className={
              active
                ? `font-medium ${baseColor}`
                : "text-fg-quaternary line-through decoration-fg-quaternary"
            }
          >
            {day.label}
          </span>
        );
      })}
    </div>
  );
}

