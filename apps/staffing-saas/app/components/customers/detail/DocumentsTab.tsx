import { Button, Table } from "@mvp-ui/ui";
import { Upload } from "lucide-react";
import type { CustomerDocument } from "../customer-detail-data";
import { SectionCard } from "./SectionCard";

interface DocumentsTabProps {
  documents: CustomerDocument[];
}

const DOCUMENT_COLUMNS = [
  { id: "name", name: "Tên tài liệu", isRowHeader: true as const },
  { id: "type", name: "Loại" },
  { id: "period", name: "Thời gian áp dụng" },
  { id: "renewal", name: "Điều khoản gia hạn" },
  { id: "note", name: "Ghi chú" },
  { id: "createdAt", name: "Khởi tạo" },
];

export function DocumentsTab({ documents }: DocumentsTabProps) {
  return (
    <SectionCard
      title="Hợp đồng & phụ lục"
      action={
        <Button
          color="primary"
          size="sm"
          iconLeading={<Upload className="size-4" />}
        >
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
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-center text-fg-tertiary">
              <div className="flex size-12 items-center justify-center rounded-full bg-bg-secondary">
                <Upload className="size-5" />
              </div>
              <p className="text-sm">Chưa có hợp đồng nào.</p>
              <Button
                color="primary"
                size="sm"
                iconLeading={<Upload className="size-4" />}
              >
                Tải lên hợp đồng đầu tiên
              </Button>
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
  );
}
