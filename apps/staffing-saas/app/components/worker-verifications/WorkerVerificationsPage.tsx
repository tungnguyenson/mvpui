"use client";

import { Badge, Input, Tab, TabList, Table, TableCard, Tabs } from "@mvp-ui/ui";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  VERIFICATIONS,
  VERIFICATION_STATUS_LABELS,
  type VerificationRecord,
  type VerificationStatus,
} from "./worker-verifications-data";
import { WorkerAvatar } from "../_shared";

type TabId = Exclude<VerificationStatus, "rejected"> | "all";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "verified", label: "Đã xác thực" },
  { id: "in-review", label: "Đang rà soát" },
  { id: "missing-docs", label: "Chờ bổ sung" },
];

const COLUMNS = [
  { id: "worker", name: "CTV", isRowHeader: true as const },
  { id: "phone", name: "SĐT" },
  { id: "national", name: "CCCD/CMND" },
  { id: "tax", name: "MST" },
  { id: "status", name: "Trạng thái" },
  { id: "updated", name: "Cập nhật" },
  { id: "detail", name: "" },
];


function VerificationRow({ record }: { record: VerificationRecord }) {
  const status = VERIFICATION_STATUS_LABELS[record.status];

  return (
    <Table.Row id={record.id}>
      <Table.Cell>
        <Link
          href={`/worker-verifications/${record.id}`}
          className="flex items-center gap-3"
        >
          <WorkerAvatar
            name={record.workerName}
            id={record.id}
            status={record.status}
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{record.workerName}</div>
            <div className="truncate text-sm text-fg-tertiary">
              {record.district}, {record.city}
            </div>
          </div>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.phone}</div>
        <div className="text-sm text-fg-tertiary">{record.phoneStatus}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.nationalId}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.taxId}</div>
      </Table.Cell>
      <Table.Cell>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg-tertiary">{record.lastUpdated}</div>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/worker-verifications/${record.id}`}
          className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
          aria-label={`Mở chi tiết ${record.workerName}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function WorkerVerificationsPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabId>("all");

  const filtered = useMemo(() => {
    return VERIFICATIONS.filter((record) => {
      const matchesStatus = tab === "all" ? true : record.status === tab;
      const matchesSearch =
        search === "" ||
        record.workerName.toLowerCase().includes(search.toLowerCase()) ||
        record.phone.includes(search) ||
        record.nationalId.includes(search);
      return matchesStatus && matchesSearch;
    });
  }, [search, tab]);

  const counts = useMemo(() => {
    const base = { verified: 0, "in-review": 0, "missing-docs": 0 };
    for (const r of VERIFICATIONS) {
      if (r.status in base) base[r.status as keyof typeof base] += 1;
    }
    return { ...base, all: VERIFICATIONS.length };
  }, []);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">Quản lý xác thực</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Theo dõi hồ sơ xác thực của từng worker, trạng thái tài liệu và các cảnh báo
            cần xử lý trước khi mở ca làm việc.
          </p>
        </div>
      }
    >
      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <Tabs
            variant="underline"
            selectedKey={tab}
            onSelectionChange={(key) => setTab(key as TabId)}
            className="-mx-4 -mb-4 px-4"
          >
            <TabList aria-label="Lọc hồ sơ xác thực theo trạng thái">
              {TABS.map((t) => {
                const active = t.id === tab;
                return (
                  <Tab key={t.id} id={t.id}>
                    <span>{t.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${active
                        ? "bg-primary text-primary-fg"
                        : "bg-bg-secondary text-fg-tertiary"
                        }`}
                    >
                      {counts[t.id]}
                    </span>
                  </Tab>
                );
              })}
            </TabList>
          </Tabs>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] mt-4">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên CTV, SĐT hoặc CCCD"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm hồ sơ xác thực"
            />
            <div className="flex items-center text-sm text-fg-tertiary">
              {filtered.length} hồ sơ phù hợp.
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table key={tab} aria-label="Danh sách hồ sơ xác thực">
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
              {(record) => <VerificationRow record={record} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
