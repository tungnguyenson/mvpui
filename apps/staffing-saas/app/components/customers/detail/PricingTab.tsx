"use client";

import { Button, Input, Tab, TabList, Table, Tabs } from "@mvp-ui/ui";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  type CustomerPricingConfig,
  type CustomerPricingStatus,
} from "../customer-detail-data";
import { PricingDetailView } from "./PricingDetailView";

interface PricingTabProps {
  configs: CustomerPricingConfig[];
  customerId: string;
  customerName: string;
}

type StatusTabId = "all" | CustomerPricingStatus;

const STATUS_TABS: { id: StatusTabId; label: string; dot?: "success" | "error" }[] = [
  { id: "active", label: "Đang hoạt động", dot: "success" },
  { id: "inactive", label: "Ngừng hoạt động", dot: "error" },
  { id: "all", label: "Tất cả" },
];

const COLUMNS = [
  { id: "id", name: "#" },
  { id: "name", name: "Tên cấu hình", isRowHeader: true as const },
  { id: "period", name: "Thời gian áp dụng" },
  { id: "serviceClass", name: "Phân loại dịch vụ" },
  { id: "actions", name: "" },
];

export function PricingTab({ configs, customerId, customerName }: PricingTabProps) {
  const searchParams = useSearchParams();
  const configParam = searchParams.get("config");
  const selectedConfig = useMemo(() => {
    if (!configParam) return null;
    const id = Number(configParam);
    if (!Number.isFinite(id)) return null;
    return configs.find((c) => c.id === id) ?? null;
  }, [configParam, configs]);

  const buildHref = (configId: number | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "pricing");
    if (configId === null) params.delete("config");
    else params.set("config", String(configId));
    return `?${params.toString()}`;
  };

  if (selectedConfig) {
    return (
      <PricingDetailView
        config={selectedConfig}
        customerName={customerName}
        backHref={buildHref(null)}
      />
    );
  }

  return (
    <PricingList
      configs={configs}
      customerId={customerId}
      buildHref={buildHref}
    />
  );
}

interface PricingListProps {
  configs: CustomerPricingConfig[];
  customerId: string;
  buildHref: (configId: number | null) => string;
}

function PricingList({ configs, buildHref }: PricingListProps) {
  const [code, setCode] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [statusTab, setStatusTab] = useState<StatusTabId>("active");

  const counts = useMemo(() => {
    const base = { active: 0, inactive: 0 };
    for (const c of configs) base[c.status] += 1;
    return { ...base, all: configs.length };
  }, [configs]);

  const filtered = useMemo(() => {
    return configs.filter((config) => {
      const matchCode = code ? String(config.id).includes(code.trim()) : true;
      const matchName = nameQuery
        ? config.name.toLowerCase().includes(nameQuery.toLowerCase())
        : true;
      const matchStatus = statusTab === "all" ? true : config.status === statusTab;
      return matchCode && matchName && matchStatus;
    });
  }, [configs, code, nameQuery, statusTab]);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs">
        <div className="flex flex-col gap-4">

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
            <div className="ml-auto">
              <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
                Thêm cấu hình
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
        <div className="border-b border-border-secondary px-5 py-4">
          <Tabs
            variant="pill"
            size="sm"
            selectedKey={statusTab}
            onSelectionChange={(key) => setStatusTab(key as StatusTabId)}
          >
            <TabList aria-label="Lọc cấu hình theo trạng thái">
              {STATUS_TABS.map((t) => (
                <Tab key={t.id} id={t.id} value={counts[t.id]}>
                  <span className="inline-flex items-center gap-2">
                    {t.dot && (
                      <span
                        aria-hidden
                        className={`size-2 rounded-full ${t.dot === "success" ? "bg-success-fg" : "bg-error-fg"
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
              <Table.Row
                id={String(config.id)}
                className={config.status === "inactive" ? "opacity-60 [&_td]:text-fg-tertiary" : ""}
              >
                <Table.Cell>{config.id}</Table.Cell>
                <Table.Cell>
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className={`size-2 rounded-full ${config.status === "active" ? "bg-success-fg" : "bg-error-fg"
                        }`}
                    />
                    <span
                      className={
                        config.status === "active"
                          ? "font-medium text-fg"
                          : "font-medium text-fg-tertiary line-through decoration-fg-quaternary"
                      }
                    >
                      {config.name}
                    </span>
                  </span>
                </Table.Cell>
                <Table.Cell>
                  {config.appliedFrom} - {config.appliedTo}
                </Table.Cell>
                <Table.Cell>{config.serviceClass}</Table.Cell>
                <Table.Cell>
                  <Link
                    href={buildHref(config.id)}
                    scroll={false}
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
