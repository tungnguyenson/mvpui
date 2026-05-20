"use client";

import { Avatar, Badge, Input, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "./PageScaffold";
import {
  VERIFICATIONS,
  VERIFICATION_STATUS_LABELS,
  type VerificationRecord,
} from "./worker-verifications-data";
import { getAvatarFor, getInitials } from "./assets";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "verified", label: "Đã xác thực" },
  { id: "in-review", label: "Đang rà soát" },
  { id: "missing-docs", label: "Chờ bổ sung" },
] as const;

const COLUMNS = [
  { id: "worker", name: "CTV", isRowHeader: true as const },
  { id: "phone", name: "SĐT" },
  { id: "national", name: "CCCD/CMND" },
  { id: "tax", name: "MST" },
  { id: "status", name: "Trạng thái" },
  { id: "updated", name: "Cập nhật" },
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

function VerificationRow({ record }: { record: VerificationRecord }) {
  const status = VERIFICATION_STATUS_LABELS[record.status];

  return (
    <Table.Row id={record.id}>
      <Table.Cell>
        <Link
          href={`/worker-verifications/${record.id}`}
          className="flex items-center gap-3"
        >
          <Avatar
            size="md"
            src={getAvatarFor(record.workerName, record.id)}
            alt={record.workerName}
            initials={getInitials(record.workerName)}
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
  const [statusFilter, setStatusFilter] =
    useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    return VERIFICATIONS.filter((record) => {
      const matchesStatus =
        statusFilter === "all" ? true : record.status === statusFilter;
      const matchesSearch =
        search === "" ||
        record.workerName.toLowerCase().includes(search.toLowerCase()) ||
        record.phone.includes(search) ||
        record.nationalId.includes(search);
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const verifiedCount = VERIFICATIONS.filter((r) => r.status === "verified").length;
  const reviewCount = VERIFICATIONS.filter((r) => r.status === "in-review").length;
  const missingCount = VERIFICATIONS.filter((r) => r.status === "missing-docs").length;

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
      <div className="grid gap-4 lg:grid-cols-3">
        <SummaryCard
          label="Đã xác thực"
          value={`${verifiedCount}`}
          description="Workers đủ điều kiện nhận ca và được khách hàng yêu cầu."
        />
        <SummaryCard
          label="Đang rà soát"
          value={`${reviewCount}`}
          description="Hồ sơ cần đội vận hành kiểm tra trước khi cho phép vào ca."
        />
        <SummaryCard
          label="Chờ bổ sung"
          value={`${missingCount}`}
          description="Workers còn thiếu tài liệu hoặc thông tin pháp lý quan trọng."
        />
      </div>

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên CTV, SĐT hoặc CCCD"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm hồ sơ xác thực"
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
            {filtered.length} hồ sơ phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách hồ sơ xác thực">
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
