"use client";

import { Badge, Button, Input, Table } from "@mvp-ui/ui";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CUSTOMER_PRICING_STATUS_LABELS,
  type CustomerPricingConfig,
} from "../customer-detail-data";

interface PricingTabProps {
  configs: CustomerPricingConfig[];
  customerId: string;
}

const COLUMNS = [
  { id: "id", name: "#" },
  { id: "name", name: "Tên cấu hình", isRowHeader: true as const },
  { id: "period", name: "Thời gian áp dụng" },
  { id: "province", name: "Tỉnh thành" },
  { id: "jobType", name: "Loại việc" },
  { id: "serviceClass", name: "Phân loại dịch vụ" },
  { id: "status", name: "Trạng thái" },
  { id: "actions", name: "" },
];

export function PricingTab({ configs, customerId }: PricingTabProps) {
  const [code, setCode] = useState("");
  const [nameQuery, setNameQuery] = useState("");

  const filtered = useMemo(() => {
    return configs.filter((config) => {
      const matchCode = code ? String(config.id).includes(code.trim()) : true;
      const matchName = nameQuery
        ? config.name.toLowerCase().includes(nameQuery.toLowerCase())
        : true;
      return matchCode && matchName;
    });
  }, [configs, code, nameQuery]);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs">
        <div className="flex flex-wrap items-end gap-3">
          <Input
            placeholder="Mã"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            iconLeading={<Search className="size-4" />}
            containerClassName="w-40"
          />
          <Input
            placeholder="Tên cấu hình"
            value={nameQuery}
            onChange={(event) => setNameQuery(event.target.value)}
            iconLeading={<Search className="size-4" />}
            containerClassName="w-64"
          />
          <FilterChip label="Tỉnh thành" />
          <FilterChip label="Danh mục" />
          <FilterChip label="Loại việc" />
          <FilterChip label="Phân loại dịch vụ" />
          <FilterChip label="Trạng thái" />
          <div className="ml-auto">
            <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
              Thêm cấu hình
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
        <Table aria-label="Cấu hình chi trả và phí">
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
            {(config) => (
              <Table.Row id={String(config.id)}>
                <Table.Cell>{config.id}</Table.Cell>
                <Table.Cell>
                  <span className="font-medium text-fg">{config.name}</span>
                </Table.Cell>
                <Table.Cell>
                  {config.appliedFrom} - {config.appliedTo}
                </Table.Cell>
                <Table.Cell>{config.province}</Table.Cell>
                <Table.Cell>{config.jobType}</Table.Cell>
                <Table.Cell>{config.serviceClass}</Table.Cell>
                <Table.Cell>
                  <Badge
                    color={CUSTOMER_PRICING_STATUS_LABELS[config.status].color}
                    type="pill-color"
                    size="sm"
                  >
                    {CUSTOMER_PRICING_STATUS_LABELS[config.status].label}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    href={`/customers/${customerId}/pricing/${config.id}`}
                    className="font-medium text-fg-brand hover:underline"
                  >
                    Chi tiết
                  </Link>
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

function FilterChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-lg border border-border-secondary bg-bg px-3 py-2 text-sm text-fg-tertiary hover:text-fg"
    >
      {label}
      <span aria-hidden className="text-fg-tertiary">▾</span>
    </button>
  );
}
