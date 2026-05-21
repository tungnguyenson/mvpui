"use client";

import {
  Badge,
  BadgeWithDot,
  Button,
  Input,
  MetricCard,
  Tab,
  TabList,
  Table,
  TableCard,
  Tabs,
} from "@mvp-ui/ui";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  ChevronRight,
  Plus,
  Rocket,
  Search,
  Target,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useMemo, useState } from "react";
import {
  CUSTOMERS,
  CUSTOMER_STATUS_LABELS,
  CUSTOMER_VERIFICATION_LABELS,
  type CustomerRecord,
  type CustomerStatus,
} from "./customers-data";
import { PageScaffold } from "../_shell/PageScaffold";
import { getAvatarFor, getCustomerLogo } from "../_shared/assets";

function CustomerLogo({
  customer,
  size,
}: {
  customer: CustomerRecord;
  size: "sm" | "lg";
}) {
  const logo = getCustomerLogo(customer.id);
  const sizeClass = size === "lg" ? "size-14 rounded-2xl" : "size-10 rounded-xl";
  const iconClass = size === "lg" ? "size-7" : "size-5";

  if (logo) {
    return (
      <div className={`${sizeClass} shrink-0 overflow-hidden`}>
        <img
          src={logo.mark}
          alt={`Logo ${customer.name}`}
          className="size-full object-cover"
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

type TabId = CustomerStatus | "all";

const TABS: { id: TabId; label: string }[] = [
  { id: "hiring", label: "Đang tuyển" },
  { id: "lead", label: "Leads" },
  { id: "onboarding", label: "Onboarding" },
  { id: "paused", label: "Tạm ngưng" },
  { id: "all", label: "Tất cả" },
];

const LEAD_STAGE_COLOR: Record<string, "warning" | "brand" | "success" | "gray"> = {
  "Khám phá nhu cầu": "gray",
  "Đang đàm phán": "warning",
  "Đã gửi proposal": "brand",
  "Chờ ký hợp đồng": "success",
};

const ONBOARDING_STAGE_COLOR: Record<string, "warning" | "brand" | "success" | "gray"> = {
  "Ký hợp đồng": "gray",
  "Setup hệ thống": "warning",
  "Đào tạo vận hành": "brand",
  "Pilot job đầu tiên": "success",
};

const NUMBER_FORMATTER = new Intl.NumberFormat("vi-VN");

function CustomerSummaryCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  return (
    <MetricCard
      label={label}
      value={value}
      helpText={description}
      iconChip={<Icon className="size-5" />}
      iconChipStyle="tint"
      featuredIconColor="brand"
      iconPlacement="inline"
    />
  );
}

function CustomerNameCell({ customer }: { customer: CustomerRecord }) {
  return (
    <Link href={`/customers/${customer.id}`} className="flex items-center gap-3">
      <CustomerLogo customer={customer} size="sm" />
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-fg">{customer.name}</div>
        <div className="truncate text-sm text-fg-tertiary">
          {customer.industry} • {customer.city}
        </div>
      </div>
    </Link>
  );
}

function DetailLink({ customer }: { customer: CustomerRecord }) {
  return (
    <Link
      href={`/customers/${customer.id}`}
      className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
      aria-label={`Mở chi tiết ${customer.name}`}
    >
      <ChevronRight className="size-4" />
    </Link>
  );
}

function AccountManagerCell({
  name,
  title,
  seedId,
}: {
  name: string;
  title: string;
  seedId: string;
}) {
  const avatar = getAvatarFor(name, seedId);
  return (
    <div className="flex items-center gap-2.5">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="size-8 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-xs font-medium text-fg-tertiary">
          {name.charAt(0)}
        </div>
      )}
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-fg">{name}</div>
        <div className="truncate text-xs text-fg-tertiary">{title}</div>
      </div>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-bg-secondary">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="text-xs font-medium text-fg-tertiary">{clamped}%</span>
    </div>
  );
}

interface ColumnDef {
  id: string;
  name: string;
  isRowHeader?: boolean;
}

const HIRING_COLUMNS: ColumnDef[] = [
  { id: "customer", name: "Khách hàng", isRowHeader: true },
  { id: "requests", name: "HR đang mở" },
  { id: "hired", name: "Đã tuyển" },
  { id: "shifts", name: "Ca đang mở" },
  { id: "outstanding", name: "Công nợ" },
  { id: "verification", name: "Xác thực" },
  { id: "detail", name: "" },
];

const LEAD_COLUMNS: ColumnDef[] = [
  { id: "customer", name: "Khách hàng", isRowHeader: true },
  { id: "contact", name: "Liên hệ" },
  { id: "source", name: "Nguồn" },
  { id: "stage", name: "Giai đoạn" },
  { id: "notes", name: "Ghi chú" },
  { id: "last-contact", name: "Cập nhật" },
  { id: "detail", name: "" },
];

const ONBOARDING_COLUMNS: ColumnDef[] = [
  { id: "customer", name: "Khách hàng", isRowHeader: true },
  { id: "am", name: "Account Manager" },
  { id: "stage", name: "Giai đoạn" },
  { id: "progress", name: "Tiến độ" },
  { id: "golive", name: "Go-live" },
  { id: "detail", name: "" },
];

const PAUSED_COLUMNS: ColumnDef[] = [
  { id: "customer", name: "Khách hàng", isRowHeader: true },
  { id: "contact", name: "Liên hệ" },
  { id: "since", name: "Tạm ngưng từ" },
  { id: "reason", name: "Lý do" },
  { id: "outstanding", name: "Công nợ tồn" },
  { id: "detail", name: "" },
];

const ALL_COLUMNS: ColumnDef[] = [
  { id: "customer", name: "Khách hàng", isRowHeader: true },
  { id: "status", name: "Trạng thái" },
  { id: "requests", name: "HR" },
  { id: "shifts", name: "Ca" },
  { id: "outstanding", name: "Công nợ" },
  { id: "detail", name: "" },
];

const COLUMNS_BY_TAB: Record<TabId, ColumnDef[]> = {
  hiring: HIRING_COLUMNS,
  lead: LEAD_COLUMNS,
  onboarding: ONBOARDING_COLUMNS,
  paused: PAUSED_COLUMNS,
  all: ALL_COLUMNS,
};

function HiringRow({ customer }: { customer: CustomerRecord }) {
  const verification = CUSTOMER_VERIFICATION_LABELS[customer.verificationStatus];
  const stats = customer.hiringStats;
  return (
    <Table.Row id={customer.id}>
      <Table.Cell>
        <CustomerNameCell customer={customer} />
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">{customer.activeRequests}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">
          {stats ? `${NUMBER_FORMATTER.format(stats.hired)}/${NUMBER_FORMATTER.format(stats.target)}` : "—"}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{customer.openShifts}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">{customer.billing.outstanding}</div>
      </Table.Cell>
      <Table.Cell>
        <BadgeWithDot color={verification.color} type="pill-color" size="sm">
          {verification.label}
        </BadgeWithDot>
      </Table.Cell>
      <Table.Cell>
        <DetailLink customer={customer} />
      </Table.Cell>
    </Table.Row>
  );
}

function LeadRow({ customer }: { customer: CustomerRecord }) {
  const lead = customer.lead;
  return (
    <Table.Row id={customer.id}>
      <Table.Cell>
        <CustomerNameCell customer={customer} />
      </Table.Cell>
      <Table.Cell>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-fg">{customer.contact.name}</div>
          <div className="truncate text-xs text-fg-tertiary">{customer.contact.title}</div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg-tertiary">{lead?.source ?? "—"}</div>
      </Table.Cell>
      <Table.Cell>
        {lead ? (
          <Badge
            color={LEAD_STAGE_COLOR[lead.stage] ?? "gray"}
            type="pill-color"
            size="sm"
          >
            {lead.stage}
          </Badge>
        ) : (
          <span className="text-sm text-fg-tertiary">—</span>
        )}
      </Table.Cell>
      <Table.Cell>
        <div className="max-w-70 truncate text-sm text-fg-tertiary" title={lead?.notes}>
          {lead?.notes ?? "—"}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg-tertiary">{lead?.lastContactAt ?? "—"}</div>
      </Table.Cell>
      <Table.Cell>
        <DetailLink customer={customer} />
      </Table.Cell>
    </Table.Row>
  );
}

function OnboardingRow({ customer }: { customer: CustomerRecord }) {
  const ob = customer.onboarding;
  return (
    <Table.Row id={customer.id}>
      <Table.Cell>
        <CustomerNameCell customer={customer} />
      </Table.Cell>
      <Table.Cell>
        {ob ? (
          <AccountManagerCell
            name={ob.accountManager.name}
            title={ob.accountManager.title}
            seedId={customer.id}
          />
        ) : (
          <span className="text-sm text-fg-tertiary">—</span>
        )}
      </Table.Cell>
      <Table.Cell>
        {ob ? (
          <Badge
            color={ONBOARDING_STAGE_COLOR[ob.stage] ?? "gray"}
            type="pill-color"
            size="sm"
          >
            {ob.stage}
          </Badge>
        ) : (
          <span className="text-sm text-fg-tertiary">—</span>
        )}
      </Table.Cell>
      <Table.Cell>
        {ob ? <ProgressBar value={ob.progress} /> : <span className="text-sm text-fg-tertiary">—</span>}
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">{ob?.goLiveDate ?? "—"}</div>
      </Table.Cell>
      <Table.Cell>
        <DetailLink customer={customer} />
      </Table.Cell>
    </Table.Row>
  );
}

function PausedRow({ customer }: { customer: CustomerRecord }) {
  const p = customer.pausedInfo;
  return (
    <Table.Row id={customer.id}>
      <Table.Cell>
        <CustomerNameCell customer={customer} />
      </Table.Cell>
      <Table.Cell>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-fg">{customer.contact.name}</div>
          <div className="truncate text-xs text-fg-tertiary">{customer.contact.title}</div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{p?.since ?? "—"}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="max-w-65 truncate text-sm text-fg-tertiary" title={p?.reason}>
          {p?.reason ?? "—"}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">{customer.billing.outstanding}</div>
      </Table.Cell>
      <Table.Cell>
        <DetailLink customer={customer} />
      </Table.Cell>
    </Table.Row>
  );
}

function AllRow({ customer }: { customer: CustomerRecord }) {
  const status = CUSTOMER_STATUS_LABELS[customer.status];
  return (
    <Table.Row id={customer.id}>
      <Table.Cell>
        <CustomerNameCell customer={customer} />
      </Table.Cell>
      <Table.Cell>
        <BadgeWithDot color={status.color} type="pill-color" size="sm">
          {status.label}
        </BadgeWithDot>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{customer.activeRequests}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{customer.openShifts}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">{customer.billing.outstanding}</div>
      </Table.Cell>
      <Table.Cell>
        <DetailLink customer={customer} />
      </Table.Cell>
    </Table.Row>
  );
}

function renderRow(tab: TabId, customer: CustomerRecord) {
  switch (tab) {
    case "hiring":
      return <HiringRow customer={customer} />;
    case "lead":
      return <LeadRow customer={customer} />;
    case "onboarding":
      return <OnboardingRow customer={customer} />;
    case "paused":
      return <PausedRow customer={customer} />;
    case "all":
      return <AllRow customer={customer} />;
  }
}

export function CustomersPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabId>("hiring");

  const filteredCustomers = useMemo(() => {
    return CUSTOMERS.filter((customer) => {
      const matchesTab = tab === "all" ? true : customer.status === tab;
      const matchesSearch =
        search === "" ||
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.contact.name.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [search, tab]);

  const counts = useMemo(() => {
    const base = { hiring: 0, lead: 0, onboarding: 0, paused: 0 };
    for (const c of CUSTOMERS) base[c.status] += 1;
    return { ...base, all: CUSTOMERS.length };
  }, []);

  const hiringCustomers = CUSTOMERS.filter((c) => c.status === "hiring");
  const totalActiveRequests = hiringCustomers.reduce(
    (sum, c) => sum + c.activeRequests,
    0,
  );
  const totalOpenShifts = hiringCustomers.reduce(
    (sum, c) => sum + c.openShifts,
    0,
  );

  const columns = COLUMNS_BY_TAB[tab];

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-fg">Khách hàng</h1>
            <p className="max-w-3xl text-base text-fg-tertiary">
              Quản lý pipeline khách hàng từ Lead → Onboarding → Đang tuyển. Mỗi
              trạng thái có dữ liệu vận hành phù hợp với giai đoạn.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/customers/new">
              <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
                Tạo Khách hàng mới
              </Button>
            </Link>
          </div>
        </div>
      }
    >
      {/* <div className="grid gap-4 lg:grid-cols-3">
        <CustomerSummaryCard
          label="Khách hàng đang tuyển"
          value={`${counts.hiring}`}
          description={`${totalActiveRequests} hiring requests và ${totalOpenShifts} ca đang mở.`}
          icon={Briefcase}
        />
        <CustomerSummaryCard
          label="Pipeline Leads"
          value={`${counts.lead}`}
          description="Khách tiềm năng đang được sale theo đuổi."
          icon={Target}
        />
        <CustomerSummaryCard
          label="Đang Onboarding"
          value={`${counts.onboarding}`}
          description="Khách đã ký, chờ go-live trong 30-60 ngày."
          icon={Rocket}
        />
      </div> */}

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <Tabs
            variant="pill"
            size="md"
            selectedKey={tab}
            onSelectionChange={(key) => setTab(key as TabId)}
            className="-mx-4 -mb-4 px-4"
          >
            <TabList aria-label="Lọc khách hàng theo trạng thái">
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
              placeholder="Tìm theo tên khách hàng hoặc người liên hệ"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm khách hàng"
            />
            <div className="flex items-center text-sm text-fg-tertiary">
              {filteredCustomers.length} khách hàng phù hợp.
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table key={tab} aria-label="Danh sách khách hàng">
            <Table.Header>
              {columns.map((column) => (
                <Table.Head
                  key={column.id}
                  id={column.id}
                  label={column.name}
                  {...(column.isRowHeader && { isRowHeader: true })}
                />
              ))}
            </Table.Header>
            <Table.Body items={filteredCustomers}>
              {(customer) => renderRow(tab, customer)}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
