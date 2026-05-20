"use client";

import {
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  Input,
  Pagination,
  Table,
  TableCard,
  Tooltip,
  TooltipTrigger,
} from "@mvp-ui/ui";
import { Info, Pencil } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CUSTOMER_RECONCILIATION_CONFIGS,
  PAYMENT_DOC_LABELS,
  type CustomerReconciliationConfig,
  type ReconciliationContact,
} from "./customer-reconciliation-configs-data";
import { PageScaffold } from "../_shell/PageScaffold";

const PAGE_SIZE = 8;

const COLUMN_TOOLTIPS: Record<string, string> = {
  company: "Tên công ty đăng ký kinh doanh trên hợp đồng.",
  statementDue: "Hạn ra sao kê hàng tháng tính theo chu kỳ M (tháng phát sinh).",
  invoiceDue: "Hạn xuất hóa đơn cho khách hàng tính theo chu kỳ M.",
  paymentTerm: "Hạn thanh toán tính theo số ngày kể từ ngày xuất hóa đơn.",
};

function HeaderWithInfo({ label, tooltipKey }: { label: string; tooltipKey: keyof typeof COLUMN_TOOLTIPS }) {
  return (
    <span className="flex items-center gap-1 text-xs font-semibold whitespace-nowrap text-fg-tertiary">
      {label}
      <Tooltip title={COLUMN_TOOLTIPS[tooltipKey]} placement="top">
        <TooltipTrigger className="inline-flex cursor-help items-center text-fg-quaternary">
          <Info className="size-3.5" />
        </TooltipTrigger>
      </Tooltip>
    </span>
  );
}

function CompanyLogo({ src, size = "sm" }: { src: string; size?: "sm" | "lg" }) {
  const dim = size === "lg" ? "size-10" : "size-8";
  return (
    <span
      className={`inline-flex ${dim} shrink-0 overflow-hidden rounded-md`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden className="h-full w-full object-cover" />
    </span>
  );
}

function ContactChip({ contact }: { contact: ReconciliationContact }) {
  return (
    <div className="rounded-md bg-info-bg px-2 py-1.5 text-xs leading-tight">
      <div className="font-medium text-fg">
        {contact.name} - {contact.phone}
      </div>
      {(contact.email || contact.role) && (
        <div className="mt-0.5 text-fg-tertiary">
          {contact.email}
          {contact.email && contact.role ? " - " : ""}
          {contact.role}
        </div>
      )}
    </div>
  );
}

interface ColumnDef {
  id: string;
  label: string;
  withInfo?: boolean;
  isRowHeader?: boolean;
}

const COLUMNS: ColumnDef[] = [
  { id: "company", label: "Tên công ty", withInfo: true, isRowHeader: true },
  { id: "taxId", label: "Mã số thuế" },
  { id: "statementDue", label: "TH ra sao kê", withInfo: true },
  { id: "invoiceDue", label: "TH ra hóa đơn", withInfo: true },
  { id: "paymentTerm", label: "TH thanh toán (ngày)", withInfo: true },
];

function ConfigRow({ config }: { config: CustomerReconciliationConfig }) {
  return (
    <Table.Row id={config.id}>
      <Table.Cell>
        <div className="flex items-center gap-3 min-w-60">
          <CompanyLogo src={config.logoUrl} />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-fg-brand leading-snug">
              {config.companyName}
            </span>
            {config.brandName && (
              <span className="text-xs text-fg-tertiary leading-snug">
                {config.brandName}
              </span>
            )}
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg whitespace-nowrap font-mono">{config.taxId}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg whitespace-nowrap">{config.statementDueRule}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg whitespace-nowrap">{config.invoiceDueRule}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{config.paymentTermDays}</div>
      </Table.Cell>
    </Table.Row>
  );
}

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xs font-medium uppercase tracking-wide text-fg-tertiary">
        {label}
      </div>
      <div className="text-sm text-fg">{children}</div>
    </div>
  );
}

function ConfigDetail({ config }: { config: CustomerReconciliationConfig }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <CompanyLogo src={config.logoUrl} size="lg" />
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-semibold text-fg leading-snug">
            {config.companyName}
          </span>
          {config.brandName && (
            <span className="text-xs text-fg-tertiary leading-snug">
              {config.brandName}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DetailField label="Mã số thuế">
          <span className="font-mono">{config.taxId}</span>
        </DetailField>
        <DetailField label="TH thanh toán (ngày)">
          {config.paymentTermDays}
        </DetailField>
        <DetailField label="TH ra sao kê">{config.statementDueRule}</DetailField>
        <DetailField label="TH ra hóa đơn">{config.invoiceDueRule}</DetailField>
      </div>

      <DetailField label="Xuất hóa đơn">
        <p className="leading-snug">{config.invoiceIssuanceMethod}</p>
      </DetailField>

      <DetailField label="Hồ sơ thanh toán">
        <div className="mt-1 flex flex-wrap gap-1.5">
          {config.paymentDocs.map((key) => (
            <Badge key={key} color="warning" type="pill-color" size="sm">
              {PAYMENT_DOC_LABELS[key] ?? key}
            </Badge>
          ))}
        </div>
      </DetailField>

      <DetailField label="Đầu mối liên hệ KH">
        <div className="mt-1 flex flex-col gap-1.5">
          {config.contacts.map((contact, index) => (
            <ContactChip key={`${contact.phone}-${index}`} contact={contact} />
          ))}
        </div>
      </DetailField>

      {config.note && <DetailField label="Ghi chú">{config.note}</DetailField>}
    </div>
  );
}

export function CustomerReconciliationConfigsPage() {
  const [companyQuery, setCompanyQuery] = useState("");
  const [taxIdQuery, setTaxIdQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const company = companyQuery.trim().toLowerCase();
    const taxId = taxIdQuery.trim().toLowerCase();
    return CUSTOMER_RECONCILIATION_CONFIGS.filter((config) => {
      const matchesCompany =
        company === "" ||
        config.companyName.toLowerCase().includes(company) ||
        (config.brandName ?? "").toLowerCase().includes(company);
      const matchesTax =
        taxId === "" || config.taxId.toLowerCase().includes(taxId);
      return matchesCompany && matchesTax;
    });
  }, [companyQuery, taxIdQuery]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const rangeStart = total === 0 ? 0 : startIndex + 1;
  const rangeEnd = Math.min(startIndex + PAGE_SIZE, total);

  const selectedConfig = useMemo(
    () =>
      selectedId
        ? CUSTOMER_RECONCILIATION_CONFIGS.find((c) => c.id === selectedId) ?? null
        : null,
    [selectedId],
  );

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">Tổng hợp cấu hình đối soát</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Quản lý quy tắc đối soát của từng công ty khách hàng: chu kỳ ra sao
            kê, hóa đơn, hồ sơ thanh toán, và đầu mối liên hệ.
          </p>
        </div>
      }
    >
      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
            <Input
              value={companyQuery}
              onChange={(event) => {
                setCompanyQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Tên công ty"
              aria-label="Tìm theo tên công ty"
            />
            <Input
              value={taxIdQuery}
              onChange={(event) => {
                setTaxIdQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Mã số thuế"
              aria-label="Tìm theo mã số thuế"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table
            aria-label="Tổng hợp cấu hình đối soát"
            onRowAction={(key) => setSelectedId(String(key))}
          >
            <Table.Header>
              {COLUMNS.map((column) => (
                <Table.Head
                  key={column.id}
                  id={column.id}
                  {...(column.isRowHeader && { isRowHeader: true })}
                >
                  {column.withInfo ? (
                    <HeaderWithInfo
                      label={column.label}
                      tooltipKey={column.id as keyof typeof COLUMN_TOOLTIPS}
                    />
                  ) : (
                    <span className="text-xs font-semibold whitespace-nowrap text-fg-tertiary">
                      {column.label}
                    </span>
                  )}
                </Table.Head>
              ))}
            </Table.Header>
            <Table.Body items={visible}>
              {(config) => <ConfigRow config={config} />}
            </Table.Body>
          </Table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border-secondary px-4 py-3 sm:flex-row">
          <div className="text-sm text-fg-tertiary">
            {total === 0
              ? "0 of 0 items"
              : `${rangeStart}-${rangeEnd} of ${total} items`}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setPage}
          />
        </div>
      </TableCard.Root>

      <Drawer
        size="lg"
        backdrop="dim"
        isOpen={selectedConfig !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
        title="Chi tiết cấu hình đối soát"
        {...(selectedConfig?.companyName && {
          description: selectedConfig.companyName,
        })}
      >
        <DrawerBody>
          {selectedConfig && <ConfigDetail config={selectedConfig} />}
        </DrawerBody>
        <DrawerFooter>
          <Button color="secondary" onClick={() => setSelectedId(null)}>
            Đóng
          </Button>
          <Button asChild iconLeading={Pencil}>
            <Link href="/customers/highlands-commerce?tab=reconciliation">
              Chỉnh sửa
            </Link>
          </Button>
        </DrawerFooter>
      </Drawer>
    </PageScaffold>
  );
}
