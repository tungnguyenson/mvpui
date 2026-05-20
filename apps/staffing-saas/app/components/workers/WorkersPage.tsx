"use client";

import { Badge, Input, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  WORKERS,
  WORKER_STATUS_LABELS,
  type WorkerRecord,
} from "./workers-data";
import { PageScaffold } from "../_shell/PageScaffold";
import { WorkerAvatar } from "../_shared";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "active", label: "Đang hoạt động" },
  { id: "pending", label: "Chờ duyệt" },
  { id: "locked", label: "Tạm khóa" },
] as const;

const COLUMNS = [
  { id: "worker", name: "CTV", isRowHeader: true as const },
  { id: "area", name: "Khu vực" },
  { id: "status", name: "Trạng thái" },
  { id: "skills", name: "Kỹ năng" },
  { id: "shifts", name: "Tổng số ca" },
  { id: "rating", name: "Đánh giá" },
];

function WorkerCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs">
      <p className="text-sm font-medium text-fg-tertiary">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-fg">{value}</p>
      <p className="mt-2 text-sm text-fg-tertiary">{description}</p>
    </div>
  );
}

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
  const [statusFilter, setStatusFilter] =
    useState<(typeof FILTERS)[number]["id"]>("all");

  const filteredWorkers = useMemo(() => {
    return WORKERS.filter((worker) => {
      const matchesStatus =
        statusFilter === "all" ? true : worker.status === statusFilter;
      const matchesSearch =
        search === "" ||
        worker.name.toLowerCase().includes(search.toLowerCase()) ||
        worker.phone.includes(search) ||
        worker.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const activeWorkers = WORKERS.filter((worker) => worker.status === "active").length;
  const pendingWorkers = WORKERS.filter((worker) => worker.status === "pending").length;
  const avgRating = (
    WORKERS.reduce((sum, worker) => sum + Number(worker.rating), 0) / WORKERS.length
  ).toFixed(1);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">Danh sách CTV</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Theo dõi toàn bộ worker trong hệ thống, từ hồ sơ hoạt động đến hiệu suất,
            lịch sử ca và các tín hiệu xác thực, vi phạm, thanh toán.
          </p>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <WorkerCard
          label="CTV đang hoạt động"
          value={`${activeWorkers}`}
          description="Sẵn sàng nhận ca và đang được khách hàng sử dụng thường xuyên."
        />
        <WorkerCard
          label="CTV chờ duyệt"
          value={`${pendingWorkers}`}
          description="Cần hoàn tất thêm bước xác thực hoặc rà soát hồ sơ trước khi mở ca."
        />
        <WorkerCard
          label="Điểm đánh giá trung bình"
          value={avgRating}
          description="Tổng hợp rating từ các ca gần nhất trên toàn bộ worker mẫu."
        />
      </div>

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên, số điện thoại hoặc kỹ năng"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm cộng tác viên"
            />
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const active = filter.id === statusFilter;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setStatusFilter(filter.id)}
                    className={`rounded-full border px-3 py-2 text-sm font-medium transition-colors ${active
                        ? "border-border-brand bg-bg-secondary text-fg"
                        : "border-border-secondary bg-bg text-fg-tertiary hover:text-fg"
                      }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="text-sm text-fg-tertiary">
            {filteredWorkers.length} CTV phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách cộng tác viên">
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
