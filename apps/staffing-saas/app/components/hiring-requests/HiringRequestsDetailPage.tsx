import { Badge, Button } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UserPlus } from "lucide-react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  HIRING_STATUS_LABELS,
  getHiringRequestById,
} from "./hiring-requests-data";
import { HiringRequestDetailTabs } from "./HiringRequestDetailTabs";

export function HiringRequestsDetailPage({ id }: { id: string }) {
  const record = getHiringRequestById(id);
  if (!record) notFound();

  const status = HIRING_STATUS_LABELS[record.status];
  const fillRate = Math.round((record.filled / record.headcount) * 100);
  const remaining = Math.max(record.headcount - record.filled, 0);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-fg">
              <UserPlus className="size-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-fg">{record.title}</h1>
                <Badge color={status.color} type="pill-color" size="sm">
                  {status.label}
                </Badge>
              </div>
              <p className="mt-1 text-base text-fg-tertiary">
                {record.code} • {record.customer} • {record.area}
              </p>
              <p className="mt-3 max-w-3xl text-sm text-fg-tertiary">{record.notes}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {record.skills.map((skill) => (
                  <Badge key={skill} color="gray" type="pill-color" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/hiring-requests">
              <Button color="secondary" size="sm">
                Quay lại danh sách
              </Button>
            </Link>
            <Button color="primary" size="sm">
              Đẩy CTV vào ca
            </Button>
          </div>
        </div>
      }
    >
      <HiringRequestDetailTabs
        record={record}
        fillRate={fillRate}
        remaining={remaining}
      />
    </PageScaffold>
  );
}
