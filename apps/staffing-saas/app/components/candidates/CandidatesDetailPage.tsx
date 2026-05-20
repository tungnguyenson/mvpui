import { AvatarProfilePhoto, Badge, Button } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageScaffold } from "../_shell/PageScaffold";
import { SetPageBreadcrumb } from "../_shell/BreadcrumbContext";
import { APP_ROUTES } from "../_shell/nav";
import { getAvatarFor, getInitials } from "../_shared/assets";
import {
  SOURCE_LABELS,
  STAGE_LABELS,
  getCandidateById,
} from "./candidates-data";
import { CandidateDetailTabs } from "./CandidateDetailTabs";

interface CandidatesDetailPageProps {
  id: string;
}

export function CandidatesDetailPage({ id }: CandidatesDetailPageProps) {
  const record = getCandidateById(id);
  if (!record) notFound();

  const stage = STAGE_LABELS[record.stage];
  const showConvertAction =
    record.stage !== "hired" &&
    record.stage !== "rejected" &&
    record.stage !== "blacklist" &&
    record.stage !== "ghosted";

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4">
          <SetPageBreadcrumb
            items={[
              { label: "Dashboard", href: APP_ROUTES.dashboard },
              { label: "Ứng viên", href: APP_ROUTES.candidates },
              { label: record.fullName },
            ]}
          />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <AvatarProfilePhoto
                size="lg"
                state={
                  record.stage === "hired"
                    ? "verified"
                    : record.stage === "blacklist"
                      ? "blocked"
                      : null
                }
                src={getAvatarFor(record.fullName, record.id)}
                alt={record.fullName}
                initials={getInitials(record.fullName)}
              />
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl font-semibold text-fg">{record.fullName}</h1>
                  <Badge color={stage.color} type="pill-color" size="sm">
                    {stage.label}
                  </Badge>
                  <Badge color="gray" type="pill-color" size="sm">
                    {SOURCE_LABELS[record.source]}
                  </Badge>
                </div>
                <p className="mt-1 text-base text-fg-tertiary">
                  {record.code} • {record.phone} • {record.district}, {record.city}
                </p>
                {record.notesShort ? (
                  <p className="mt-3 max-w-3xl text-sm text-fg-tertiary">
                    {record.notesShort}
                  </p>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-fg-tertiary">Ứng tuyển:</span>
                  <span className="text-sm font-medium text-fg">
                    {record.appliedPosition}
                  </span>
                  {record.hiringRequestCode ? (
                    <Link
                      href={`/hiring-requests/${record.hiringRequestId}`}
                      className="text-sm font-medium text-fg-brand hover:underline"
                    >
                      {record.hiringRequestCode}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/candidates">
                <Button color="secondary" size="sm">
                  Quay lại danh sách
                </Button>
              </Link>
              {showConvertAction ? (
                <Button color="primary" size="sm">
                  Chuyển thành CTV
                </Button>
              ) : null}
              {record.workerId ? (
                <Link href={`/workers/${record.workerId}`}>
                  <Button color="primary" size="sm">
                    Mở hồ sơ CTV
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      }
    >
      <CandidateDetailTabs record={record} />
    </PageScaffold>
  );
}
