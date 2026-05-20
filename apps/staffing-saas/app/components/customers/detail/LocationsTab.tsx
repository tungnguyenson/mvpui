"use client";

import { Button, Input, Select, SelectItem, Table } from "@mvp-ui/ui";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { CustomerLocation } from "../customer-detail-data";

interface LocationsTabProps {
  locations: CustomerLocation[];
}

const COLUMNS = [
  { id: "shortName", name: "Tên gọi tắt", isRowHeader: true as const },
  { id: "address", name: "Địa chỉ" },
  { id: "province", name: "Tỉnh/Thành" },
  { id: "jobCount", name: "Số công việc" },
  { id: "workerCount", name: "Số CTV" },
  { id: "actions", name: "Action" },
];

const ALL_PROVINCES = "all";

export function LocationsTab({ locations }: LocationsTabProps) {
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState<string>(ALL_PROVINCES);

  const provinceOptions = useMemo(() => {
    const provinces = Array.from(new Set(locations.map((l) => l.province))).sort();
    return [
      { id: ALL_PROVINCES, label: "Tất cả" },
      ...provinces.map((p) => ({ id: p, label: p })),
    ];
  }, [locations]);

  const filtered = useMemo(() => {
    return locations.filter((location) => {
      const matchQuery = query
        ? `${location.shortName} ${location.address}`
            .toLowerCase()
            .includes(query.toLowerCase())
        : true;
      const matchProvince =
        province === ALL_PROVINCES ? true : location.province === province;
      return matchQuery && matchProvince;
    });
  }, [locations, query, province]);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs">
        <div className="flex flex-wrap items-end gap-3">
          <Input
            placeholder="Tìm theo địa chỉ hoặc tên gọi tắt"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            iconLeading={<Search className="size-4" />}
            containerClassName="w-full md:w-96"
          />
          <Select
            aria-label="Tỉnh/Thành"
            placeholder="Tất cả"
            items={provinceOptions}
            selectedKey={province}
            onSelectionChange={(key) => setProvince(String(key))}
          >
            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
          </Select>
          <div className="ml-auto">
            <Button
              color="primary"
              size="sm"
              iconLeading={<Plus className="size-4" />}
            >
              Thêm địa điểm
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
        <Table aria-label="Danh sách địa điểm">
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
            {(location) => (
              <Table.Row id={location.id}>
                <Table.Cell>
                  <span className="font-medium text-fg">{location.shortName}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-fg-secondary">{location.address}</span>
                </Table.Cell>
                <Table.Cell>{location.province}</Table.Cell>
                <Table.Cell>
                  <span className="tabular-nums text-fg">{location.jobCount}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="tabular-nums text-fg">{location.workerCount}</span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Button
                      color="secondary"
                      size="sm"
                      iconLeading={<Pencil className="size-4" />}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      color="tertiary-destructive"
                      size="sm"
                      iconLeading={<Trash2 className="size-4" />}
                    >
                      Xoá
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
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
