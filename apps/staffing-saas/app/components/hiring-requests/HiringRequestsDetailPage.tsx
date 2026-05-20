import { Avatar, Badge, Button, MetricCard } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Building2,
  CalendarRange,
  CircleDollarSign,
  Clock,
  MapPin,
  Target,
  UserPlus,
  Users,
} from "lucide-react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  CANDIDATE_LABELS,
  HIRING_STATUS_LABELS,
  getHiringRequestById,
  type HiringCandidate,
  type HiringTimelineEntry,
} from "./hiring-requests-data";
import { getAvatarFor, getCustomerLogo, getInitials } from "../_shared/assets";

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

function CandidateItem({ candidate }: { candidate: HiringCandidate }) {
  const status = CANDIDATE_LABELS[candidate.status];

  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Avatar
            size="md"
            src={getAvatarFor(candidate.workerName, candidate.workerId)}
            alt={candidate.workerName}
            initials={getInitials(candidate.workerName)}
          />
          <div>
            {candidate.workerId ? (
              <Link
                href={`/workers/${candidate.workerId}`}
                className="text-sm font-semibold text-fg hover:text-fg-brand"
              >
                {candidate.workerName}
              </Link>
            ) : (
              <p className="text-sm font-semibold text-fg">{candidate.workerName}</p>
            )}
            <p className="mt-1 text-sm text-fg-tertiary">
              {candidate.city} • {candidate.experience}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge color={status.color} type="pill-color" size="sm">
            {status.label}
          </Badge>
          <p className="text-sm text-fg-tertiary">Match {candidate.matchScore}%</p>
        </div>
      </div>
      {candidate.note ? (
        <p className="mt-3 text-sm text-fg-tertiary">{candidate.note}</p>
      ) : null}
    </div>
  );
}

function TimelineItem({ entry }: { entry: HiringTimelineEntry }) {
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
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          label="Headcount"
          value={`${record.headcount} người`}
          valueSize="md"
          iconChip={<Users className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Tiến độ fill"
          value={`${record.filled}/${record.headcount} • ${fillRate}%`}
          valueSize="md"
          iconChip={<Target className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="success"
          iconPlacement="inline"
        />
        <MetricCard
          label="Còn cần"
          value={`${remaining} người`}
          valueSize="md"
          iconChip={<UserPlus className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="warning"
          iconPlacement="inline"
        />
        <MetricCard
          label="Deadline"
          value={record.deadline}
          valueSize="md"
          iconChip={<Clock className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Thông tin yêu cầu"
          description="Khách hàng, khu vực và liên hệ phụ trách hiring request."
        >
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              {(() => {
                const logo = getCustomerLogo(record.customerId);
                if (logo) {
                  return (
                    <div className="mt-0.5 size-6 shrink-0 overflow-hidden rounded-md">
                      <img
                        src={logo.mark}
                        alt={`Logo ${record.customer}`}
                        className="size-full object-cover"
                      />
                    </div>
                  );
                }
                return <Building2 className="mt-0.5 size-4 text-fg-brand" />;
              })()}
              <div>
                <p className="text-sm font-medium text-fg">{record.customer}</p>
                <Link
                  href={`/customers/${record.customerId}`}
                  className="text-sm text-fg-brand hover:underline"
                >
                  Mở hồ sơ khách hàng
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">{record.area}</p>
            </div>
            <div className="flex items-start gap-3">
              <CalendarRange className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm text-fg">Bắt đầu {record.startDate}</p>
                <p className="text-sm text-fg-tertiary">Deadline {record.deadline}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CircleDollarSign className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">{record.payRate}</p>
            </div>
            <div className="flex items-start gap-3">
              <Target className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">Liên hệ: {record.contact}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Tiêu chí worker"
          description="Hồ sơ worker khách hàng mong muốn cho request này."
        >
          <ul className="flex flex-col gap-3">
            {record.workerProfile.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-border-secondary bg-bg-secondary px-4 py-3 text-sm text-fg"
              >
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard
        title="Funnel ứng viên"
        description="Tổng quan tiến độ fulfill của request theo trạng thái ứng viên."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
            <p className="text-xs text-fg-tertiary">Đã nhận ca</p>
            <p className="mt-2 text-lg font-semibold text-fg">
              {record.candidates.filter((c) => c.status === "assigned").length}
            </p>
          </div>
          <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
            <p className="text-xs text-fg-tertiary">Shortlist / phỏng vấn</p>
            <p className="mt-2 text-lg font-semibold text-fg">
              {
                record.candidates.filter(
                  (c) => c.status === "shortlisted" || c.status === "interviewing",
                ).length
              }
            </p>
          </div>
          <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
            <p className="text-xs text-fg-tertiary">Còn cần</p>
            <p className="mt-2 text-lg font-semibold text-fg">{remaining}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Candidate / worker assignment"
        description="Workers đang được đẩy vào hiring request này."
      >
        <div className="flex flex-col gap-4">
          {record.candidates.map((candidate) => (
            <CandidateItem key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Timeline fulfill"
        description="Lịch sử các bước xử lý hiring request từ khi khách hàng tạo."
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
