"use client";

import { BadgeWithDot, Input, Tab, TabList, Table, TableCard, Tabs } from "@mvp-ui/ui";
import Link from "next/link";
import { Calculator, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  RECONCILIATIONS,
  RECON_STATUS_LABELS,
  type ReconciliationRecord,
  type ReconciliationStatus,
} from "./reconciliations-data";

type TabId = ReconciliationStatus | "all";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "open", label: "Đang đối soát" },
  { id: "pending-approval", label: "Chờ duyệt" },
  { id: "approved", label: "Đã chốt" },
  { id: "disputed", label: "Tranh chấp" },
];

const COLUMNS = [
  { id: "period", name: "Kỳ đối soát", isRowHeader: true as const },
  { id: "customer", name: "Khách hàng" },
  { id: "shifts", name: "Số ca" },
  { id: "amount", name: "Tổng tiền" },
  { id: "variance", name: "Chênh lệch" },
  { id: "status", name: "Trạng thái" },
  { id: "detail", name: "" },
];

function ReconRow({ record }: { record: ReconciliationRecord }) {
  const status = RECON_STATUS_LABELS[record.status];

  return (
    <Table.Row id={record.id}>
      <Table.Cell>
        <Link
          href={`/reconciliations/${record.id}`}
          className="flex items-center gap-3"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg">
            <Calculator className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{record.code}</div>
            <div className="truncate text-sm text-fg-tertiary">{record.period}</div>
          </div>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.customer}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.totalShifts}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">{record.totalAmount}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.variance}</div>
        <div className="text-sm text-fg-tertiary">{record.variancePercent}</div>
      </Table.Cell>
      <Table.Cell>
        <BadgeWithDot color={status.color} type="pill-color" size="sm">
          {status.label}
        </BadgeWithDot>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/reconciliations/${record.id}`}
          className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
          aria-label={`Mở chi tiết ${record.code}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function ReconciliationsPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabId>("all");

  const filtered = useMemo(() => {
    return RECONCILIATIONS.filter((record) => {
      const matchesStatus = tab === "all" ? true : record.status === tab;
      const matchesSearch =
        search === "" ||
        record.code.toLowerCase().includes(search.toLowerCase()) ||
        record.customer.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, tab]);

  const counts = useMemo(() => {
    const base: Record<ReconciliationStatus, number> = {
      open: 0,
      "pending-approval": 0,
      approved: 0,
      disputed: 0,
    };
    for (const r of RECONCILIATIONS) base[r.status] += 1;
    return { ...base, all: RECONCILIATIONS.length };
  }, []);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">Đối soát</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Đối soát số liệu ca làm việc, chấm công và thanh toán theo từng khách hàng,
            quản lý chênh lệch và phê duyệt nội bộ.
          </p>
        </div>
      }
    >
      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <Tabs
            variant="pill"
            size="md"
            selectedKey={tab}
            onSelectionChange={(key) => setTab(key as TabId)}
            className="-mx-4 -mb-4 px-4"
          >
            <TabList aria-label="Lọc phiếu đối soát theo trạng thái">
              {TABS.map((t) => (
                <Tab key={t.id} id={t.id} value={counts[t.id]}>
                  {t.label}
                </Tab>
              ))}
            </TabList>
          </Tabs>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] mt-4">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo mã đối soát hoặc khách hàng"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm đối soát"
            />
            <div className="flex items-center text-sm text-fg-tertiary">
              {filtered.length} phiếu phù hợp.
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table key={tab} aria-label="Danh sách phiếu đối soát">
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
            <Table.Body items={filtered}>
              {(record) => <ReconRow record={record} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
