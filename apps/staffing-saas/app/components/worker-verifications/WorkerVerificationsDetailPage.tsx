import { Badge, BadgeWithDot, Button, MetricCard } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  CreditCard,
  FileCheck2,
  FileWarning,
  Hash,
  Phone,
  UserSquare2,
} from "lucide-react";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { PageScaffold } from "../_shell/PageScaffold";
import { APP_ROUTES } from "../_shell/nav";
import {
  VERIFICATION_STATUS_LABELS,
  getVerificationById,
  type VerificationDocument,
  type VerificationTimelineEntry,
} from "./worker-verifications-data";
import { WorkerProfilePhoto } from "../_shared";

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
      <div className="border-b border-border-secondary px-5 py-4">
        <h2 className="text-base font-semibold text-fg">{title}</h2>
        <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function DocumentItem({ doc }: { doc: VerificationDocument }) {
  const tone =
    doc.status === "Cần bổ sung"
      ? "error"
      : doc.status === "Chờ duyệt"
        ? "warning"
        : "success";

  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-fg">{doc.name}</p>
          <p className="mt-1 text-sm text-fg-tertiary">
            Nộp: {doc.uploadedAt}
            {doc.reviewer ? ` • Reviewer: ${doc.reviewer}` : ""}
          </p>
        </div>
        <Badge color={tone} type="pill-color" size="sm">
          {doc.status}
        </Badge>
      </div>
    </div>
  );
}

function TimelineItem({ entry }: { entry: VerificationTimelineEntry }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="size-2.5 rounded-full bg-primary" />
        <div className="mt-1 w-px flex-1 bg-border-secondary" />
      </div>
      <div className="flex-1 pb-4">
        <p className="text-sm font-medium text-fg">{entry.action}</p>
        <p className="mt-1 text-sm text-fg-tertiary">
          {entry.at} • {entry.actor}
        </p>
        {entry.note ? (
          <p className="mt-2 text-sm text-fg-tertiary">{entry.note}</p>
        ) : null}
      </div>
    </div>
  );
}

export function WorkerVerificationsDetailPage({ id }: { id: string }) {
  const record = getVerificationById(id);
  if (!record) notFound();

  const status = VERIFICATION_STATUS_LABELS[record.status];

  return (
    <PageScaffold
      header={
        <AppPageHeader
          breadcrumbs={[
            { label: "Dashboard", href: APP_ROUTES.dashboard },
            { label: "Quản lý xác thực", href: APP_ROUTES.workerVerifications },
            { label: record.workerName },
          ]}
          actions={
            <>
              <Link href="/worker-verifications">
                <Button color="secondary" size="sm">
                  Quay lại danh sách
                </Button>
              </Link>
              <Button color="primary" size="sm">
                Duyệt xác thực
              </Button>
            </>
          }
        >
          <div className="flex items-start gap-4">
            <WorkerProfilePhoto
              name={record.workerName}
              id={record.id}
              status={record.status}
              size="sm"
            />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-fg">{record.workerName}</h1>
                <BadgeWithDot color={status.color} type="pill-color" size="sm">
                  {status.label}
                </BadgeWithDot>
              </div>
              <p className="mt-1 text-base text-fg-tertiary">
                Mã CTV {record.workerId} • {record.district}, {record.city} • Nộp hồ sơ{" "}
                {record.submittedAt}
              </p>
              <p className="mt-3 max-w-3xl text-sm text-fg-tertiary">
                Reviewer phụ trách: {record.reviewer} • Cập nhật gần nhất {record.lastUpdated}
              </p>
            </div>
          </div>
        </AppPageHeader>
      }
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          label="SĐT"
          value={record.phone}
          valueSize="md"
          iconChip={<Phone className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="CCCD/CMND"
          value={record.nationalId}
          valueSize="md"
          iconChip={<UserSquare2 className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="MST"
          value={record.taxId}
          valueSize="md"
          iconChip={<Hash className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Tài liệu thiếu"
          value={`${record.missingDocs.length}`}
          valueSize="md"
          iconChip={<FileWarning className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="error"
          iconPlacement="inline"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Verification profile"
          description="Thông tin pháp lý và liên lạc gắn với hồ sơ xác thực của worker."
        >
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm text-fg">{record.phone}</p>
                <p className="text-sm text-fg-tertiary">{record.phoneStatus}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <UserSquare2 className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm text-fg">CCCD/CMND: {record.nationalId}</p>
                <p className="text-sm text-fg-tertiary">Mã số thuế: {record.taxId}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm text-fg">
                  {record.bankName} • {record.bankAccount}
                </p>
                <p className="text-sm text-fg-tertiary">
                  Số tài khoản nhận lương dùng cho batch thanh toán.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileCheck2 className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">
                {record.documents.filter((doc) => doc.status === "Đạt").length}/
                {record.documents.length} tài liệu đã được duyệt.
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Checklist thiếu hồ sơ"
          description="Các tài liệu hoặc thông tin cần worker bổ sung trước khi duyệt."
        >
          <div className="grid gap-3">
            {record.missingDocs.length > 0 ? (
              record.missingDocs.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-warning-border bg-warning-bg p-3"
                >
                  <AlertTriangle className="mt-0.5 size-4 text-warning-fg" />
                  <p className="text-sm text-warning-fg">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-fg-tertiary">
                Hồ sơ đã đủ tài liệu cần thiết, không có hạng mục bổ sung.
              </p>
            )}
            {record.riskFlags.length > 0 ? (
              <div className="mt-2">
                <p className="text-sm font-semibold text-fg">Risk flags</p>
                <ul className="mt-2 flex flex-col gap-2">
                  {record.riskFlags.map((flag) => (
                    <li
                      key={flag}
                      className="rounded-xl border border-error-border bg-error-bg px-3 py-2 text-sm text-error-fg"
                    >
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Tài liệu đã nộp"
        description="Danh sách tài liệu worker đã cung cấp và trạng thái review."
      >
        <div className="flex flex-col gap-4">
          {record.documents.map((doc) => (
            <DocumentItem key={doc.id} doc={doc} />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Timeline review"
        description="Lịch sử các bước xử lý hồ sơ xác thực của worker."
      >
        <div className="flex flex-col">
          {record.timeline.map((entry) => (
            <TimelineItem key={entry.id} entry={entry} />
          ))}
        </div>
      </SectionCard>
    </PageScaffold>
  );
}
