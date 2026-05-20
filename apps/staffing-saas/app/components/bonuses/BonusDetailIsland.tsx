"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  Badge,
  Button,
  Input,
  Pagination,
  Table,
} from "@mvp-ui/ui";
import { Pencil, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getAvatarFor, getInitials } from "../_shared/assets";
import {
  BONUS_PAYOUT_KIND_LABELS,
  type BonusRecord,
  formatVnd,
} from "./bonuses-data";

const WORKERS_PAGE_SIZE = 5;

const WORKER_COLUMNS = [
  { id: "id", name: "Mã CTV", isRowHeader: true as const },
  { id: "name", name: "Cộng tác viên" },
  { id: "confirmed", name: "Đã xác nhận" },
  { id: "paid", name: "Đã thanh toán" },
];

interface BonusDetailIslandProps {
  bonus: BonusRecord;
}

export function BonusDetailIsland({ bonus }: BonusDetailIslandProps) {
  const [workerSearch, setWorkerSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredWorkers = useMemo(() => {
    if (!workerSearch) return bonus.workers;
    const q = workerSearch.toLowerCase();
    return bonus.workers.filter(
      (worker) =>
        worker.id.toLowerCase().includes(q) ||
        worker.name.toLowerCase().includes(q),
    );
  }, [bonus.workers, workerSearch]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredWorkers.length / WORKERS_PAGE_SIZE),
  );
  const pageItems = useMemo(
    () =>
      filteredWorkers.slice(
        (page - 1) * WORKERS_PAGE_SIZE,
        page * WORKERS_PAGE_SIZE,
      ),
    [filteredWorkers, page],
  );

  const canEdit = bonus.status === "running" || bonus.status === "draft";

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      {/* Left — applied workers ledger */}
      <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
        <div className="flex flex-col gap-3 border-b border-border-secondary px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-fg">
              Danh sách CTV được thưởng
            </h2>
            <p className="mt-1 text-sm text-fg-tertiary">
              CTV đã thoả mãn điều kiện rule trong kỳ này.
            </p>
          </div>
          <div className="w-full sm:w-72">
            <Input
              value={workerSearch}
              onChange={(event) => {
                setWorkerSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Tìm theo tên hoặc mã CTV"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm CTV được thưởng"
            />
          </div>
        </div>

        {bonus.workers.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-fg-tertiary">
            Chương trình chưa phát sinh payout nào.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table aria-label="Danh sách CTV được thưởng">
                <Table.Header>
                  {WORKER_COLUMNS.map((column) => (
                    <Table.Head
                      key={column.id}
                      id={column.id}
                      label={column.name}
                      {...(column.isRowHeader && { isRowHeader: true })}
                    />
                  ))}
                </Table.Header>
                <Table.Body items={pageItems}>
                  {(worker) => (
                    <Table.Row id={worker.id}>
                      <Table.Cell>
                        <Link
                          href={`/workers/${worker.id}`}
                          className="text-sm font-medium text-fg-brand hover:underline"
                        >
                          {worker.id}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            size="sm"
                            src={getAvatarFor(worker.name, worker.id) ?? null}
                            alt={worker.name}
                            initials={getInitials(worker.name)}
                          />
                          <Link
                            href={`/workers/${worker.id}`}
                            className="text-sm font-medium text-fg hover:text-fg-brand"
                          >
                            {worker.name}
                          </Link>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-sm text-fg">
                          {formatVnd(worker.confirmedAmount)}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className={
                            worker.paidAmount === 0
                              ? "text-sm text-fg-tertiary"
                              : "text-sm font-medium text-fg"
                          }
                        >
                          {formatVnd(worker.paidAmount)}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="border-t border-border-secondary px-4 py-3">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Right — accordion config */}
      <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
        <div className="flex items-center justify-between border-b border-border-secondary px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-fg">Cấu hình</h2>
            <p className="mt-1 text-sm text-fg-tertiary">
              Thông tin chương trình, phạm vi áp dụng và điều kiện thưởng.
            </p>
          </div>
          {canEdit && (
            <Button
              color="tertiary"
              size="sm"
              iconLeading={<Pencil className="size-4" />}
            >
              Chỉnh sửa
            </Button>
          )}
        </div>

        <div className="px-5">
          <Accordion
            type="multiple"
            defaultValue={["info", "scope", "conditions", "payout"]}
          >
            <AccordionItem value="info">
              <AccordionTrigger>Thông tin chung</AccordionTrigger>
              <AccordionContent>
                <ConfigGrid
                  items={[
                    { label: "ID chương trình", value: bonus.id },
                    { label: "Tiêu đề", value: bonus.title },
                    { label: "Mô tả", value: bonus.description },
                    { label: "Quản lý", value: bonus.manager },
                  ]}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="scope">
              <AccordionTrigger
                trailing={
                  <Badge color="gray" type="pill-color" size="sm">
                    {bonus.jobScope.length} mã CV
                  </Badge>
                }
              >
                Áp dụng cho
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2">
                  {bonus.jobScope.map((scope) => (
                    <li
                      key={scope.code}
                      className="flex items-start gap-3 rounded-md border border-border-secondary bg-bg-secondary px-3 py-2"
                    >
                      <span className="rounded bg-bg px-2 py-0.5 text-xs font-medium text-fg-brand ring-1 ring-border-secondary">
                        {scope.code}
                      </span>
                      <span className="text-sm text-fg">{scope.label}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="time">
              <AccordionTrigger>Thời gian</AccordionTrigger>
              <AccordionContent>
                <ConfigGrid
                  items={[
                    { label: "Bắt đầu", value: bonus.periodFrom },
                    { label: "Kết thúc", value: bonus.periodTo },
                  ]}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="conditions">
              <AccordionTrigger>Điều kiện</AccordionTrigger>
              <AccordionContent>
                <ConfigGrid
                  items={[
                    {
                      label: "Số ca tối thiểu",
                      value: `≥ ${bonus.conditions.minShifts} ca`,
                    },
                    {
                      label: "Số giờ tối thiểu",
                      value: `≥ ${bonus.conditions.minHoursPerShift} giờ/mỗi ca`,
                    },
                    ...(bonus.conditions.notes
                      ? [{ label: "Ghi chú", value: bonus.conditions.notes }]
                      : []),
                  ]}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payout">
              <AccordionTrigger>Chi tiết thưởng</AccordionTrigger>
              <AccordionContent>
                <ConfigGrid
                  items={[
                    {
                      label: "Hình thức",
                      value: BONUS_PAYOUT_KIND_LABELS[bonus.payout.kind],
                    },
                    {
                      label: "Số tiền",
                      value: `${formatVnd(bonus.payout.amount)}${
                        bonus.payout.kind === "per_shift"
                          ? " / ca"
                          : bonus.payout.kind === "per_hour"
                            ? " / giờ"
                            : ""
                      }`,
                    },
                    { label: "Thời gian chi thưởng", value: bonus.payout.cadence },
                    ...(bonus.payout.note
                      ? [{ label: "Ghi chú", value: bonus.payout.note }]
                      : []),
                  ]}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="changelog">
              <AccordionTrigger
                trailing={
                  <Badge color="gray" type="pill-color" size="sm">
                    {bonus.changelog.length} mục
                  </Badge>
                }
              >
                Lịch sử thay đổi
              </AccordionTrigger>
              <AccordionContent>
                <ol className="flex flex-col gap-3">
                  {bonus.changelog.map((entry) => (
                    <li
                      key={`${entry.at}-${entry.by}-${entry.note}`}
                      className="rounded-md border border-border-secondary bg-bg-secondary px-3 py-2"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-fg">
                          {entry.at}
                        </span>
                        <span className="text-xs text-fg-tertiary">
                          {entry.by}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-fg-secondary">
                        {entry.note}
                      </p>
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

function ConfigGrid({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_minmax(0,1fr)]">
      {items.map((item) => (
        <div key={item.label} className="contents">
          <dt className="text-sm text-fg-tertiary">{item.label}</dt>
          <dd className="text-sm text-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
