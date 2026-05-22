"use client";

import { Badge, BadgeWithDot, Input, MetricStrip, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { AlertOctagon, Briefcase, Building2, ChevronRight, Plus, Search, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "../_shell/PageScaffold";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { getCustomerLogo } from "../_shared/assets";
import {
  HIRING_REQUESTS,
  HIRING_STATUS_LABELS,
  type HiringRequestRecord,
} from "./hiring-requests-data";

function CustomerCell({
  customerId,
  customerName,
}: {
  customerId: string;
  customerName: string;
}) {
  const logo = getCustomerLogo(customerId);
  return (
    <div className="flex items-center gap-2.5">
      {logo ? (
        <div className="size-7 shrink-0 overflow-hidden rounded-md">
          <img
            src={logo.mark}
            alt={`Logo ${customerName}`}
            className="size-full object-cover"
          />
        </div>
      ) : (
        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-bg-secondary text-fg-tertiary">
          <Building2 className="size-4" />
        </div>
      )}
      <span className="truncate text-sm text-fg">{customerName}</span>
    </div>
  );
}

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
        <CustomerCell customerId={record.customerId} customerName={record.customer} />
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
        <BadgeWithDot color={status.color} type="pill-color" size="sm">
          {status.label}
        </BadgeWithDot>
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
        <AppPageHeader
          title="Yêu cầu Tuyển dụng"
          description="Theo dõi các hiring requests từ khách hàng và mức độ lấp đầy nhu cầu nhân sự theo từng tài khoản và khu vực."
          primaryAction={{
            label: "Tạo Y/c tuyển dụng mới",
            icon: Plus,
            href: "/hiring-requests/new",
          }}
        />
      }
    >
      <MetricStrip
        items={[
          {
            icon: <Briefcase className="size-4" />,
            color: "brand",
            value: openCount,
            label: "Request mở",
          },
          {
            icon: <AlertOctagon className="size-4" />,
            color: "error",
            value: overdueCount,
            label: "Quá hạn",
          },
          {
            icon: <UserPlus className="size-4" />,
            color: "warning",
            value: totalNeeded,
            label: "CTV cần fill",
          },
        ]}
      />

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
