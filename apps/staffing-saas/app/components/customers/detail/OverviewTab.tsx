import { Button } from "@mvp-ui/ui";
import { ChevronRight, ExternalLink, FileText, Pencil } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type {
  CustomerDetailExtras,
  CustomerDocument,
} from "../customer-detail-data";
import { FieldRow, MissingValue, SectionCard } from "./SectionCard";

interface OverviewTabProps {
  extras: CustomerDetailExtras;
}

type Tone = "success" | "warning" | "neutral";

function statusTone(label: string): Tone {
  const lc = label.toLowerCase();
  if (lc.includes("đang hoạt động") || lc.includes("kích hoạt")) return "success";
  if (
    lc.includes("tạm dừng") ||
    lc.includes("ngừng") ||
    lc.includes("chưa xác thực")
  ) {
    return "warning";
  }
  return "neutral";
}

function StatusBadge({ label, tone }: { label: string; tone: Tone }) {
  const surface = {
    success: "bg-success-bg text-success-fg border-success-border",
    warning: "bg-warning-bg text-warning-fg border-warning-border",
    neutral: "bg-neutral-bg text-fg-secondary border-neutral-border",
  } as const;
  const dot = {
    success: "bg-success-fg",
    warning: "bg-warning-fg",
    neutral: "bg-fg-quaternary",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${surface[tone]}`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${dot[tone]}`} />
      {label}
    </span>
  );
}

function SummaryTile({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg p-4 shadow-xs">
      <div className="text-xs text-fg-tertiary">{label}</div>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
}

function EditButton({ label = "Chỉnh sửa" }: { label?: string } = {}) {
  return (
    <Button color="secondary" size="sm" iconLeading={<Pencil className="size-4" />}>
      {label}
    </Button>
  );
}

interface ContractsSummaryProps {
  documents: CustomerDocument[];
  latest: CustomerDocument | undefined;
}

function ContractsSummary({ documents, latest }: ContractsSummaryProps) {
  if (!latest) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-sm text-fg-tertiary">Chưa có hợp đồng nào.</p>
        <Link
          href="?tab=documents"
          className="inline-flex items-center gap-1 text-sm font-semibold text-fg-brand hover:underline"
        >
          Quản lý hợp đồng
          <ChevronRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-bg-secondary">
          <FileText className="size-5 text-fg-tertiary" />
        </div>
        <div>
          <div className="text-sm font-semibold text-fg">{latest.name}</div>
          <div className="mt-0.5 text-xs text-fg-tertiary">
            {latest.validFrom} → {latest.validTo} · {documents.length} tài liệu
          </div>
        </div>
      </div>
      <Link
        href="?tab=documents"
        className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-fg-brand hover:underline"
      >
        Quản lý hợp đồng
        <ChevronRight className="size-4" />
      </Link>
    </div>
  );
}

export function OverviewTab({ extras }: OverviewTabProps) {
  const { brand, legal, management, documents } = extras;
  const latestDoc = documents[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryTile label="Tình trạng hoạt động">
          <StatusBadge
            label={management.operationalStatusLabel}
            tone={statusTone(management.operationalStatusLabel)}
          />
        </SummaryTile>
        <SummaryTile label="Tình trạng xác thực">
          <StatusBadge
            label={management.verificationStatusLabel}
            tone={statusTone(management.verificationStatusLabel)}
          />
        </SummaryTile>
        <SummaryTile label="Phân loại khách hàng">
          {management.isKeyAccount ? (
            <StatusBadge label="Khách hàng trọng điểm" tone="success" />
          ) : (
            <span className="text-fg-secondary">Khách hàng thường</span>
          )}
        </SummaryTile>
        <SummaryTile label="Account Manager">
          <span className="font-semibold text-fg">{management.accountManager}</span>
        </SummaryTile>
      </div>

      <SectionCard title="Thông tin công ty" action={<EditButton />}>
        <div className="divide-y divide-border-secondary">
          <FieldRow label="Tên thương hiệu">
            <span className="font-semibold text-fg">{brand.brandName}</span>
          </FieldRow>
          <FieldRow label="Trang đăng tuyển">
            <a
              href={brand.urlSlug}
              target="_blank"
              rel="noreferrer"
              title="Mở trong tab mới"
              className="inline-flex items-center gap-1 font-semibold text-fg-brand hover:underline"
            >
              <ExternalLink className="size-3.5" />
              {brand.urlLabel}
            </a>
          </FieldRow>
        </div>
      </SectionCard>

      <SectionCard title="Thông tin xuất hoá đơn" action={<EditButton />}>
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

      <SectionCard title="Thông tin quản lý" action={<EditButton />}>
        <div className="divide-y divide-border-secondary">
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
          <FieldRow label="Hubspot Profile">
            {management.hubspotUrl ? (
              <a
                href={management.hubspotUrl}
                target="_blank"
                rel="noreferrer"
                title="Mở trong tab mới"
                className="inline-flex items-center gap-1 font-semibold text-fg-brand hover:underline"
              >
                <ExternalLink className="size-3.5" />
                Xem trên Hubspot
              </a>
            ) : (
              <MissingValue />
            )}
          </FieldRow>
        </div>
      </SectionCard>

      <SectionCard title="Hợp đồng & phụ lục">
        <ContractsSummary documents={documents} latest={latestDoc} />
      </SectionCard>

      <SectionCard title="Ghi chú">
        <div className="flex items-center gap-2">
          <MissingValue tone="bold" />
          <Button
            color="secondary"
            size="sm"
            iconLeading={<Pencil className="size-4" />}
          >
            Thêm ghi chú
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}
