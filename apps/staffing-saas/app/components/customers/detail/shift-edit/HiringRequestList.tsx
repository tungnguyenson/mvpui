"use client";

import { Badge } from "@mvp-ui/ui";
import Link from "next/link";
import {
  CUSTOMER_SHIFT_HR_STATUS_LABELS,
  type CustomerShiftHiringRequestRef,
} from "../../customer-detail-data";

interface HiringRequestListProps {
  hiringRequests: CustomerShiftHiringRequestRef[];
}

export function HiringRequestList({ hiringRequests }: HiringRequestListProps) {
  if (hiringRequests.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border-secondary bg-bg-secondary px-4 py-3 text-sm text-fg-tertiary">
        Chưa có yêu cầu tuyển dụng nào dùng ca này.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border-secondary bg-bg">
      <div className="flex items-center justify-between border-b border-border-secondary px-4 py-3">
        <span className="text-sm font-medium text-fg">
          Yêu cầu tuyển dụng đang có ({hiringRequests.length})
        </span>
        <span className="text-xs text-fg-tertiary">
          Click mã để mở y/c trong tab khác.
        </span>
      </div>
      <ul className="divide-y divide-border-secondary">
        {hiringRequests.map((hr) => {
          const statusMeta = CUSTOMER_SHIFT_HR_STATUS_LABELS[hr.status];
          return (
            <li
              key={hr.id}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/hiring-requests/${hr.id}`}
                    target="_blank"
                    rel="noopener"
                    className="text-sm font-medium text-fg-brand hover:underline"
                  >
                    {hr.id}
                  </Link>
                  <Badge type="pill-color" color={statusMeta.color} size="sm">
                    {statusMeta.label}
                  </Badge>
                </div>
                <span className="truncate text-sm text-fg-secondary">
                  {hr.title}
                </span>
                <span className="text-xs text-fg-tertiary">
                  {hr.startDate} → {hr.endDate} · {hr.filled}/{hr.headcount}{" "}
                  CTV
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
