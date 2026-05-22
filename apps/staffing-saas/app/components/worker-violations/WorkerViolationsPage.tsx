"use client";

import { Badge, BadgeWithDot, Input, Tab, TabList, Table, TableCard, Tabs } from "@mvp-ui/ui";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  SEVERITY_LABELS,
  VIOLATION_STATUS_LABELS,
  VIOLATION_WORKERS,
  type ViolationWorkerRecord,
  type ViolationWorkerStatus,
} from "./worker-violations-data";
import { WorkerAvatar } from "../_shared";

type TabId = Exclude<ViolationWorkerStatus, "normal"> | "all";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "warning", label: "Đang cảnh cáo" },
  { id: "suspended", label: "Tạm đình chỉ" },
  { id: "locked", label: "Đã khóa" },
];

const COLUMNS = [
  { id: "worker", name: "CTV", isRowHeader: true as const },
  { id: "cases", name: "Số vi phạm" },
  { id: "latest", name: "Mức gần nhất" },
  { id: "status", name: "Trạng thái xử lý" },
  { id: "penalty", name: "Tổng phạt" },
  { id: "detail", name: "" },
];


function ViolationRow({ record }: { record: ViolationWorkerRecord }) {
  const status = VIOLATION_STATUS_LABELS[record.status];
  const severity = SEVERITY_LABELS[record.latestSeverity];

  return (
    <Table.Row id={record.id}>
      <Table.Cell>
        <Link
          href={`/worker-violations/${record.id}`}
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
        <div className="text-sm text-fg">{record.totalCases} case</div>
        <div className="text-sm text-fg-tertiary">{record.latestAt}</div>
      </Table.Cell>
      <Table.Cell>
        <Badge color={severity.color} type="pill-color" size="sm">
          {severity.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <BadgeWithDot color={status.color} type="pill-color" size="sm">
          {status.label}
        </BadgeWithDot>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">{record.totalPenalty}</div>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/worker-violations/${record.id}`}
          className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
          aria-label={`Mở chi tiết ${record.workerName}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function WorkerViolationsPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabId>("all");

  const filtered = useMemo(() => {
    return VIOLATION_WORKERS.filter((record) => {
      const matchesStatus = tab === "all" ? true : record.status === tab;
      const matchesSearch =
        search === "" ||
        record.workerName.toLowerCase().includes(search.toLowerCase()) ||
        record.phone.includes(search);
      return matchesStatus && matchesSearch;
    });
  }, [search, tab]);

  const counts = useMemo(() => {
    const base = { warning: 0, suspended: 0, locked: 0 };
    for (const r of VIOLATION_WORKERS) {
      if (r.status in base) base[r.status as keyof typeof base] += 1;
    }
    return { ...base, all: VIOLATION_WORKERS.length };
  }, []);

  return (
    <PageScaffold
      header={
        <AppPageHeader
          title="Quản lý vi phạm"
          description="Theo dõi danh sách worker từng có vi phạm trong vận hành ca, kèm số lần, mức độ và trạng thái xử lý từ đội vận hành."
        />
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
            <TabList aria-label="Lọc worker vi phạm theo trạng thái">
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
              placeholder="Tìm theo tên CTV hoặc SĐT"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm worker vi phạm"
            />
            <div className="flex items-center text-sm text-fg-tertiary">
              {filtered.length} worker phù hợp.
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table key={tab} aria-label="Danh sách worker vi phạm">
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
              {(record) => <ViolationRow record={record} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
