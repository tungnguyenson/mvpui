"use client";

import {
  Badge,
  Button,
  Input,
  Tab,
  TabList,
  Table,
  TableCard,
  Tabs,
} from "@mvp-ui/ui";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  WORKERS,
  WORKER_STATUS_LABELS,
  type WorkerRecord,
  type WorkerStatus,
} from "./workers-data";
import { PageScaffold } from "../_shell/PageScaffold";
import { WorkerAvatar } from "../_shared";

type TabId = WorkerStatus | "all";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "active", label: "Đang hoạt động" },
  { id: "pending", label: "Chờ duyệt" },
  { id: "locked", label: "Tạm khóa" },
];

const COLUMNS = [
  { id: "worker", name: "CTV", isRowHeader: true as const },
  { id: "area", name: "Khu vực" },
  { id: "status", name: "Trạng thái" },
  { id: "skills", name: "Kỹ năng" },
  { id: "shifts", name: "Tổng số ca" },
  { id: "rating", name: "Đánh giá" },
];

function WorkerRow({ worker }: { worker: WorkerRecord }) {
  const status = WORKER_STATUS_LABELS[worker.status];

  return (
    <Table.Row id={worker.id}>
      <Table.Cell>
        <Link href={`/workers/${worker.id}`} className="flex items-center gap-3">
          <WorkerAvatar name={worker.name} id={worker.id} status={worker.status} />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{worker.name}</div>
            <div className="truncate text-sm text-fg-tertiary">{worker.phone}</div>
          </div>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">
          {worker.district}, {worker.city}
        </div>
      </Table.Cell>
      <Table.Cell>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-wrap gap-2">
          {worker.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} color="gray" type="pill-color" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{worker.totalShifts}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">★ {worker.rating}</div>
      </Table.Cell>
    </Table.Row>
  );
}

export function WorkersPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabId>("all");

  const filteredWorkers = useMemo(() => {
    return WORKERS.filter((worker) => {
      const matchesStatus = tab === "all" ? true : worker.status === tab;
      const matchesSearch =
        search === "" ||
        worker.name.toLowerCase().includes(search.toLowerCase()) ||
        worker.phone.includes(search) ||
        worker.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      return matchesStatus && matchesSearch;
    });
  }, [search, tab]);

  const counts = useMemo(() => {
    const base: Record<WorkerStatus, number> = { active: 0, pending: 0, locked: 0 };
    for (const w of WORKERS) base[w.status] += 1;
    return { ...base, all: WORKERS.length };
  }, []);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-fg">Danh sách CTV</h1>
            <p className="max-w-3xl text-base text-fg-tertiary">
              Theo dõi toàn bộ worker trong hệ thống, từ hồ sơ hoạt động đến hiệu suất,
              lịch sử ca và các tín hiệu xác thực, vi phạm, thanh toán.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
              Onboard CTV mới
            </Button>
          </div>
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
            <TabList aria-label="Lọc CTV theo trạng thái">
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
              placeholder="Tìm theo tên, số điện thoại hoặc kỹ năng"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm cộng tác viên"
            />
            <div className="flex items-center text-sm text-fg-tertiary">
              {filteredWorkers.length} CTV phù hợp.
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table key={tab} aria-label="Danh sách cộng tác viên">
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
            <Table.Body items={filteredWorkers}>
              {(worker) => <WorkerRow worker={worker} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
