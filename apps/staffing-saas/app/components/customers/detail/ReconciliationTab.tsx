import { Button, Table } from "@mvp-ui/ui";
import { Pencil, Plus } from "lucide-react";
import type { CustomerReconciliation } from "../customer-detail-data";
import { FieldRow, MissingValue, SectionCard } from "./SectionCard";

interface ReconciliationTabProps {
  data: CustomerReconciliation;
}

const CONTACT_COLUMNS = [
  { id: "role", name: "Chức năng", isRowHeader: true as const },
  { id: "fullName", name: "Họ Tên" },
  { id: "phone", name: "Số điện thoại" },
  { id: "email", name: "Email" },
  { id: "coverageArea", name: "Địa điểm phụ trách" },
  { id: "actions", name: "Hành động" },
];

function Value({ value }: { value: string | null }) {
  if (!value) {
    return <MissingValue tone="bold" />;
  }
  return <span className="font-semibold text-fg">{value}</span>;
}

export function ReconciliationTab({ data }: ReconciliationTabProps) {
  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Chu kỳ đối soát"
        action={
          <Button color="secondary" size="sm">
            Chỉnh sửa
          </Button>
        }
      >
        <div className="divide-y divide-border-secondary">
          <FieldRow label="Số lượng chu kỳ / tháng">
            <Value value={data.cycle.perMonth} />
          </FieldRow>
          <FieldRow label="Ngày bắt đầu">
            <Value value={data.cycle.startDay} />
          </FieldRow>
          <FieldRow label="Ngày kết thúc">
            <Value value={data.cycle.endDay} />
          </FieldRow>
        </div>
      </SectionCard>

      <SectionCard
        title="Hồ sơ thanh toán & Hóa đơn"
        action={
          <Button color="secondary" size="sm">
            Chỉnh sửa
          </Button>
        }
      >
        <div className="divide-y divide-border-secondary">
          <FieldRow label="Thời hạn ra sao kê">
            <Value value={data.invoiceProfile.statementDueRule} />
          </FieldRow>
          <FieldRow label="Thời hạn ra hóa đơn">
            <Value value={data.invoiceProfile.invoiceDueRule} />
          </FieldRow>
          <FieldRow label="Thời điểm tính công nợ">
            <Value value={data.invoiceProfile.debtCutoffRule} />
          </FieldRow>
          <FieldRow label="Thời hạn thanh toán (ngày)">
            <Value value={data.invoiceProfile.paymentTermDays} />
          </FieldRow>
          <FieldRow label="Cách thức xuất hóa đơn">
            <Value value={data.invoiceProfile.issuanceMethod} />
          </FieldRow>
          <FieldRow label="File mẫu, hướng dẫn">
            {data.invoiceProfile.templateFile ? (
              <Value value={data.invoiceProfile.templateFile} />
            ) : (
              <MissingValue />
            )}
          </FieldRow>
          <FieldRow label="Link file mẫu, hướng dẫn">
            <Value value={data.invoiceProfile.templateLinkUrl} />
          </FieldRow>
          <FieldRow label="Hồ sơ thanh toán gồm">
            {data.invoiceProfile.requiredDocs.length === 0 ? (
              <MissingValue tone="bold" />
            ) : (
              <ul className="list-disc space-y-1 pl-5 text-fg">
                {data.invoiceProfile.requiredDocs.map((doc) => (
                  <li key={doc}>{doc}</li>
                ))}
              </ul>
            )}
          </FieldRow>
        </div>
      </SectionCard>

      <SectionCard
        title="Đầu mối liên hệ"
        action={
          <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
            Thêm
          </Button>
        }
        bodyClassName="p-0"
      >
        <Table aria-label="Đầu mối liên hệ">
          <Table.Header>
            {CONTACT_COLUMNS.map((column) => (
              <Table.Head
                key={column.id}
                id={column.id}
                label={column.name}
                {...(column.isRowHeader && { isRowHeader: true })}
              />
            ))}
          </Table.Header>
          <Table.Body
            items={data.contacts}
            renderEmptyState={() => (
              <p className="px-6 py-12 text-center text-sm text-fg-tertiary">
                Không có dữ liệu
              </p>
            )}
          >
            {(contact) => (
              <Table.Row id={contact.id}>
                <Table.Cell>
                  <span className="font-medium text-fg">{contact.role}</span>
                </Table.Cell>
                <Table.Cell>{contact.fullName}</Table.Cell>
                <Table.Cell>{contact.phone}</Table.Cell>
                <Table.Cell>{contact.email}</Table.Cell>
                <Table.Cell>{contact.coverageArea}</Table.Cell>
                <Table.Cell>
                  <button
                    type="button"
                    aria-label="Chỉnh sửa"
                    className="inline-flex size-7 items-center justify-center rounded-md text-fg-tertiary hover:bg-bg-secondary hover:text-fg"
                  >
                    <Pencil className="size-4" />
                  </button>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </SectionCard>

      <SectionCard
        title="Kênh làm việc"
        action={
          <Button color="secondary" size="sm">
            Chỉnh sửa
          </Button>
        }
      >
        <div className="divide-y divide-border-secondary">
          <FieldRow label="Kênh làm việc">
            <Value value={data.channel.kind} />
          </FieldRow>
          <FieldRow label="Link tham gia nhóm booking">
            <Value value={data.channel.bookingGroupUrl} />
          </FieldRow>
          <FieldRow label="Link tham gia nhóm đối soát">
            <Value value={data.channel.reconciliationGroupUrl} />
          </FieldRow>
        </div>
      </SectionCard>

      <SectionCard
        title="Ghi chú"
        action={
          <Button color="secondary" size="sm">
            Chỉnh sửa
          </Button>
        }
      >
        <div className="divide-y divide-border-secondary">
          <FieldRow label="Ghi chú">
            <Value value={data.note} />
          </FieldRow>
        </div>
      </SectionCard>
    </div>
  );
}
