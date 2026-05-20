"use client";

import { Badge, Input, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { Building2, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CUSTOMERS,
  CUSTOMER_STATUS_LABELS,
  type CustomerRecord,
} from "./customers-data";
import { PageScaffold } from "./PageScaffold";
import { getCustomerLogo } from "./assets";

function CustomerLogo({
  customer,
  size,
}: {
  customer: CustomerRecord;
  size: "sm" | "lg";
}) {
  const logo = getCustomerLogo(customer.id);
  const sizeClass = size === "lg" ? "size-14 rounded-2xl" : "size-10 rounded-full";
  const iconClass = size === "lg" ? "size-7" : "size-5";

  if (logo) {
    return (
      <div
        className={`flex ${sizeClass} shrink-0 items-center justify-center border border-border-secondary bg-bg p-1.5`}
      >
        <img
          src={logo.mark}
          alt={`Logo ${customer.name}`}
          className="size-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex ${sizeClass} shrink-0 items-center justify-center bg-primary text-primary-fg`}
    >
      <Building2 className={iconClass} />
    </div>
  );
}

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "active", label: "Đang hợp tác" },
  { id: "pilot", label: "Pilot" },
  { id: "paused", label: "Tạm dừng" },
] as const;

const COLUMNS = [
  { id: "customer", name: "Khách hàng", isRowHeader: true as const },
  { id: "status", name: "Trạng thái" },
  { id: "requests", name: "Hiring requests" },
  { id: "shifts", name: "Ca đang mở" },
  { id: "spend", name: "Chi phí tháng này" },
  { id: "detail", name: "" },
];

function CustomerSummaryCard({
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

function CustomerRow({ customer }: { customer: CustomerRecord }) {
  const status = CUSTOMER_STATUS_LABELS[customer.status];

  return (
    <Table.Row id={customer.id}>
      <Table.Cell>
        <Link href={`/customers/${customer.id}`} className="flex items-center gap-3">
          <CustomerLogo customer={customer} size="sm" />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{customer.name}</div>
            <div className="truncate text-sm text-fg-tertiary">
              {customer.industry} • {customer.city}
            </div>
          </div>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{customer.activeRequests}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{customer.openShifts}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">{customer.monthlySpend}</div>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/customers/${customer.id}`}
          className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
          aria-label={`Mở chi tiết ${customer.name}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof FILTERS)[number]["id"]>("all");

  const filteredCustomers = useMemo(() => {
    return CUSTOMERS.filter((customer) => {
      const matchesStatus =
        statusFilter === "all" ? true : customer.status === statusFilter;
      const matchesSearch =
        search === "" ||
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.contact.name.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const activeCount = CUSTOMERS.filter((customer) => customer.status === "active").length;
  const requestCount = CUSTOMERS.reduce(
    (sum, customer) => sum + customer.activeRequests,
    0,
  );
  const shiftCount = CUSTOMERS.reduce((sum, customer) => sum + customer.openShifts, 0);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">Khách hàng</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Theo dõi doanh nghiệp đang gửi hiring requests, mức độ sử dụng ca và tình
            trạng hợp tác theo từng tài khoản khách hàng.
          </p>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <CustomerSummaryCard
          label="Khách hàng đang hợp tác"
          value={`${activeCount}`}
          description="Tài khoản đang có nhu cầu tuyển hoặc vận hành ca trong tháng."
        />
        <CustomerSummaryCard
          label="Hiring requests đang mở"
          value={`${requestCount}`}
          description="Tổng số yêu cầu tuyển đang được đội vận hành xử lý."
        />
        <CustomerSummaryCard
          label="Ca đang mở"
          value={`${shiftCount}`}
          description="Số ca làm việc của toàn bộ khách hàng cần theo dõi hằng ngày."
        />
      </div>

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên khách hàng hoặc người liên hệ"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm khách hàng"
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
            {filteredCustomers.length} khách hàng phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách khách hàng">
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
            <Table.Body items={filteredCustomers}>
              {(customer) => <CustomerRow customer={customer} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
