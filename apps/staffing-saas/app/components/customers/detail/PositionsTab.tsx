"use client";

import { Button, Table } from "@mvp-ui/ui";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Pencil, Plus } from "lucide-react";
import { useMemo } from "react";
import type { CustomerPosition } from "../customer-detail-data";
import { PositionEditView } from "./PositionEditView";

interface PositionsTabProps {
  positions: CustomerPosition[];
  customerId: string;
}

const COLUMNS = [
  { id: "name", name: "Tên vị trí", isRowHeader: true as const },
  { id: "description", name: "Mô tả công việc" },
  { id: "actions", name: "" },
];

export function PositionsTab({ positions }: PositionsTabProps) {
  const searchParams = useSearchParams();
  const positionParam = searchParams.get("position");

  const selected = useMemo<
    { mode: "create" } | { mode: "edit"; position: CustomerPosition } | null
  >(() => {
    if (!positionParam) return null;
    if (positionParam === "new") return { mode: "create" };
    const position = positions.find((p) => p.id === positionParam);
    return position ? { mode: "edit", position } : null;
  }, [positionParam, positions]);

  const buildHref = (positionId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "positions");
    if (positionId === null) params.delete("position");
    else params.set("position", positionId);
    return `?${params.toString()}`;
  };

  if (selected) {
    return (
      <PositionEditView
        {...(selected.mode === "edit" ? { position: selected.position } : {})}
        backHref={buildHref(null)}
      />
    );
  }

  return <PositionsList positions={positions} buildHref={buildHref} />;
}

interface PositionsListProps {
  positions: CustomerPosition[];
  buildHref: (positionId: string | null) => string;
}

function PositionsList({ positions, buildHref }: PositionsListProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
        <div className="flex items-center justify-between gap-4 border-b border-border-secondary px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-fg">Danh sách vị trí làm việc</h2>
            <p className="mt-1 text-sm text-fg-tertiary">
              Mỗi vị rí đi kèm: Mô tả công việc, Yêu cầu, Chế độ/quyền lợi, Hướng dẫn
            </p>
          </div>
          <Link href={buildHref("new")} scroll={false}>
            <Button
              color="primary"
              size="sm"
              iconLeading={<Plus className="size-4" />}
            >
              Thêm vị trí
            </Button>
          </Link>
        </div>
        <Table aria-label="Danh sách vị trí làm việc">
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
          <Table.Body
            items={positions}
            renderEmptyState={() => (
              <p className="px-6 py-12 text-center text-sm text-fg-tertiary">
                Không có dữ liệu
              </p>
            )}
          >
            {(position) => (
              <Table.Row id={position.id}>
                <Table.Cell>
                  <span className="font-medium text-fg">{position.name}</span>
                </Table.Cell>
                <Table.Cell>
                  <p className="max-w-xl text-sm text-fg-secondary">
                    {position.description}
                  </p>
                </Table.Cell>
                <Table.Cell>
                  <Link href={buildHref(position.id)} scroll={false}>
                    <Button
                      color="secondary"
                      size="sm"
                      iconLeading={<Pencil className="size-4" />}
                    >
                      Sửa
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <div className="flex items-center justify-end gap-4 border-t border-border-secondary px-5 py-3 text-sm text-fg-tertiary">
          <span>
            1-{positions.length} of {positions.length} items
          </span>
          <span className="rounded-md border border-border-secondary px-2 py-1 text-xs text-fg">
            20 / trang
          </span>
        </div>
      </div>
    </div>
  );
}
