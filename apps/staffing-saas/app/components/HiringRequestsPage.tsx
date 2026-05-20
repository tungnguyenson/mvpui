"use client";

import { Badge, Input, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { ChevronRight, Search, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "./PageScaffold";
import {
  HIRING_REQUESTS,
  HIRING_STATUS_LABELS,
  type HiringRequestRecord,
} from "./hiring-requests-data";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "open", label: "Đang tuyển" },
  { id: "fulfilling", label: "Sắp đủ" },
  { id: "fulfilled", label: "Đủ người" },
  { id: "overdue", label: "Quá hạn" },
] as const;

const COLUMNS = [
  { id: "request", name: "Hiring request", isRowHeader: true as const },
  { id: "customer", name: "Khách hàng" },
  { id: "headcount", name: "Headcount" },
  { id: "fill", name: "Tiến độ fill" },
  { id: "deadline", name: "Deadline" },
  { id: "status", name: "Trạng thái" },
  { id: "detail", name: "" },
];

function SummaryCard({
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

function HiringRow({ record }: { record: HiringRequestRecord }) {
  const status = HIRING_STATUS_LABELS[record.status];

  return (
    <Table.Row id={record.id}>
      <Table.Cell>
        <Link
          href={`/hiring-requests/${record.id}`}
          className="flex items-center gap-3"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg">
            <UserPlus className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{record.title}</div>
            <div className="truncate text-sm text-fg-tertiary">
              {record.code} • {record.area}
            </div>
          </div>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.customer}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.headcount} người</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">
          {record.filled}/{record.headcount}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg-tertiary">{record.deadline}</div>
      </Table.Cell>
      <Table.Cell>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/hiring-requests/${record.id}`}
          className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
          aria-label={`Mở chi tiết ${record.code}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function HiringRequestsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    return HIRING_REQUESTS.filter((record) => {
      const matchesStatus =
        statusFilter === "all" ? true : record.status === statusFilter;
      const matchesSearch =
        search === "" ||
        record.title.toLowerCase().includes(search.toLowerCase()) ||
        record.customer.toLowerCase().includes(search.toLowerCase()) ||
        record.code.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const openCount = HIRING_REQUESTS.filter(
    (r) => r.status === "open" || r.status === "fulfilling",
  ).length;
  const overdueCount = HIRING_REQUESTS.filter((r) => r.status === "overdue").length;
  const totalNeeded = HIRING_REQUESTS.reduce((s, r) => s + (r.headcount - r.filled), 0);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">Tuyển dụng</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Theo dõi các hiring requests từ khách hàng và mức độ lấp đầy nhu cầu nhân sự
            theo từng tài khoản và khu vực.
          </p>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <SummaryCard
          label="Request đang mở"
          value={`${openCount}`}
          description="Nhu cầu tuyển khách hàng đang gửi cho đội vận hành."
        />
        <SummaryCard
          label="Request quá hạn"
          value={`${overdueCount}`}
          description="Đã quá deadline, cần xử lý hoặc thương lượng lại với khách."
        />
        <SummaryCard
          label="CTV cần fill thêm"
          value={`${totalNeeded}`}
          description="Tổng số headcount còn thiếu trong toàn bộ request hiện hiển thị."
        />
      </div>

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo mã, vị trí hoặc khách hàng"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm hiring request"
            />
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const active = filter.id === statusFilter;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setStatusFilter(filter.id)}
                    className={`rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
                      active
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
            {filtered.length} request phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách hiring requests">
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
              {(record) => <HiringRow record={record} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
