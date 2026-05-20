import { Button, Table } from "@mvp-ui/ui";
import { Check, ExternalLink, Pencil, Upload } from "lucide-react";
import type {
  CustomerDetailExtras,
} from "../customer-detail-data";
import { FieldRow, MissingValue, SectionCard } from "./SectionCard";

interface OverviewTabProps {
  extras: CustomerDetailExtras;
}

const DOCUMENT_COLUMNS = [
  { id: "name", name: "Tên tài liệu", isRowHeader: true as const },
  { id: "type", name: "Loại" },
  { id: "period", name: "Thời gian áp dụng" },
  { id: "renewal", name: "Điều khoản gia hạn" },
  { id: "note", name: "Ghi chú" },
  { id: "createdAt", name: "Khởi tạo" },
];

export function OverviewTab({ extras }: OverviewTabProps) {
  const { brand, legal, management, documents } = extras;

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Thông tin công ty"
        action={
          <Button color="primary" size="sm">
            Chỉnh sửa
          </Button>
        }
      >
        <div className="divide-y divide-border-secondary">
          <FieldRow label="Tên thương hiệu">
            <span className="font-semibold text-fg">{brand.brandName}</span>
          </FieldRow>
          <FieldRow label="URL key">
            <a
              href={brand.urlSlug}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-fg-brand hover:underline"
            >
              <ExternalLink className="size-3.5" />
              {brand.urlLabel}
            </a>
          </FieldRow>
        </div>
      </SectionCard>

      <SectionCard title="Thông tin xuất hoá đơn">
        <div className="divide-y divide-border-secondary">
          <FieldRow label="Tên đăng kí kinh doanh">
            <span className="font-semibold text-fg">{legal.legalName}</span>
          </FieldRow>
          <FieldRow label="Mã số thuế">
            <span className="font-semibold text-fg">{legal.taxId}</span>
          </FieldRow>
          <FieldRow label="Địa chỉ đăng kí kinh doanh">
            <span className="font-semibold text-fg">{legal.legalAddress}</span>
          </FieldRow>
          <FieldRow label="Email nhận HĐĐT">
            <span className="font-semibold text-fg">{legal.invoiceEmail}</span>
          </FieldRow>
        </div>
      </SectionCard>

      <SectionCard title="Thông tin quản lý">
        <div className="divide-y divide-border-secondary">
          <FieldRow label="Tình trạng hoạt động">
            <span className="font-semibold text-fg">{management.operationalStatusLabel}</span>
          </FieldRow>
          <FieldRow label="Tình trạng xác thực">
            <span className="font-semibold text-fg">{management.verificationStatusLabel}</span>
          </FieldRow>
          <FieldRow label="Loại công ty">
            <span className="font-semibold text-fg">{management.companyType}</span>
          </FieldRow>
          <FieldRow label="Quy mô">
            <span className="font-semibold text-fg">{management.companySize}</span>
          </FieldRow>
          <FieldRow label="Lĩnh vực">
            {management.industry ? (
              <span className="font-semibold text-fg">{management.industry}</span>
            ) : (
              <MissingValue />
            )}
          </FieldRow>
          <FieldRow label="Công ty Quan trọng">
            {management.isKeyAccount ? (
              <span className="inline-flex size-5 items-center justify-center rounded-md bg-primary text-primary-fg">
                <Check className="size-3.5" />
              </span>
            ) : (
              <span className="inline-block size-5 rounded-md border border-border-secondary" />
            )}
          </FieldRow>
          <FieldRow label="Account Manager">
            <span className="font-semibold text-fg">{management.accountManager}</span>
          </FieldRow>
          <FieldRow label="Hubspot Profile">
            {management.hubspotUrl ? (
              <a
                href={management.hubspotUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-fg-brand hover:underline"
              >
                {management.hubspotUrl}
              </a>
            ) : (
              <MissingValue />
            )}
          </FieldRow>
        </div>
      </SectionCard>

      <SectionCard
        title="Thông tin hợp đồng & phụ lục"
        action={
          <Button color="primary" size="sm" iconLeading={<Upload className="size-4" />}>
            Tải lên
          </Button>
        }
        bodyClassName="p-0"
      >
        <Table aria-label="Hợp đồng và phụ lục">
            <Table.Header>
              {DOCUMENT_COLUMNS.map((column) => (
                <Table.Head
                  key={column.id}
                  id={column.id}
                  label={column.name}
                  {...(column.isRowHeader && { isRowHeader: true })}
                />
              ))}
            </Table.Header>
            <Table.Body
              items={documents}
              renderEmptyState={() => (
                <div className="flex flex-col items-center gap-2 px-6 py-12 text-fg-tertiary">
                  <div className="flex size-12 items-center justify-center rounded-full bg-bg-secondary">
                    <Upload className="size-5" />
                  </div>
                  <p className="text-sm">No Data</p>
                </div>
              )}
            >
              {(doc) => (
                <Table.Row id={doc.id}>
                  <Table.Cell>
                    <span className="font-medium text-fg">{doc.name}</span>
                  </Table.Cell>
                  <Table.Cell>{doc.type}</Table.Cell>
                  <Table.Cell>
                    {doc.validFrom} → {doc.validTo}
                  </Table.Cell>
                  <Table.Cell>{doc.renewalTerm}</Table.Cell>
                  <Table.Cell>{doc.note}</Table.Cell>
                  <Table.Cell>{doc.createdAt}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
      </SectionCard>

      <SectionCard title="Ghi chú">
        <div className="flex items-center gap-2">
          <MissingValue tone="bold" />
          <button
            type="button"
            className="inline-flex size-7 items-center justify-center rounded-md text-fg-tertiary hover:bg-bg-secondary hover:text-fg"
            aria-label="Chỉnh sửa ghi chú"
          >
            <Pencil className="size-4" />
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
