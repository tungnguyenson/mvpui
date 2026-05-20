"use client";

import { Badge, MetricCard, Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  CircleDashed,
  CircleDollarSign,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  ShieldCheck,
  Star,
  Target,
  UserCheck,
  UserPlus,
} from "lucide-react";
import {
  DOC_STATE_LABELS,
  type CandidateInteraction,
  type CandidateRecord,
  SOURCE_LABELS,
  STAGE_LABELS,
} from "./candidates-data";

interface CandidateDetailTabsProps {
  record: CandidateRecord;
}

function SectionCard({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
      <div className="flex items-start justify-between gap-3 border-b border-border-secondary px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-fg">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function ChannelIcon({ channel }: { channel: CandidateInteraction["channel"] }) {
  const cls = "size-4";
  switch (channel) {
    case "call":
      return <Phone className={cls} />;
    case "sms":
    case "zalo":
      return <MessageCircle className={cls} />;
    case "interview":
      return <UserCheck className={cls} />;
    case "note":
      return <MessageSquare className={cls} />;
    default:
      return <CircleDashed className={cls} />;
  }
}

function OverviewPanel({ record }: { record: CandidateRecord }) {
  const completed = record.documents.filter((d) => d.state === "verified").length;
  const total = record.documents.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          label="Match score"
          value={`${record.score}`}
          valueSize="md"
          iconChip={<Star className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor={record.score >= 85 ? "success" : "brand"}
          iconPlacement="inline"
        />
        <MetricCard
          label="Nguồn"
          value={SOURCE_LABELS[record.source]}
          valueSize="md"
          iconChip={<Target className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Hồ sơ giấy tờ"
          value={`${completed}/${total}`}
          valueSize="md"
          helpText="Số chứng từ đã xác thực trên tổng số yêu cầu."
          iconChip={<ShieldCheck className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor={completed === total ? "success" : "warning"}
          iconPlacement="inline"
        />
        <MetricCard
          label="Phụ trách"
          value={record.recruiter}
          valueSize="md"
          iconChip={<UserPlus className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Thông tin ứng viên"
          description="Liên hệ và khu vực hoạt động được khai báo lúc nộp đơn."
        >
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">{record.phone}</p>
            </div>
            {record.email ? (
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 text-fg-brand" />
                <p className="text-sm text-fg">{record.email}</p>
              </div>
            ) : null}
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">
                {record.district}, {record.city}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">Sinh {record.dob}</p>
            </div>
            {record.expectedPay ? (
              <div className="flex items-start gap-3">
                <CircleDollarSign className="mt-0.5 size-4 text-fg-brand" />
                <p className="text-sm text-fg">Mức mong muốn {record.expectedPay}</p>
              </div>
            ) : null}
          </div>
        </SectionCard>

        <SectionCard
          title="Vị trí ứng tuyển"
          description="Hiring request và kỹ năng phù hợp."
          action={
            record.hiringRequestId ? (
              <Link
                href={`/hiring-requests/${record.hiringRequestId}`}
                className="text-sm font-medium text-fg-brand hover:underline"
              >
                Mở hiring request
              </Link>
            ) : null
          }
        >
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium text-fg">{record.appliedPosition}</p>
              {record.hiringRequestCode ? (
                <p className="mt-1 text-sm text-fg-tertiary">
                  {record.hiringRequestCode}
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-sm text-fg-tertiary">Kinh nghiệm</p>
              <p className="mt-1 text-sm text-fg">{record.experience}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {record.skills.map((skill) => (
                <Badge key={skill} color="gray" type="pill-color" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {record.workerId ? (
        <SectionCard
          title="Đã chuyển thành CTV"
          description="Theo dõi tiếp ứng viên này qua hồ sơ worker chính thức."
          action={
            <Link
              href={`/workers/${record.workerId}`}
              className="text-sm font-medium text-fg-brand hover:underline"
            >
              Mở hồ sơ worker
            </Link>
          }
        >
          <div className="flex items-center gap-3 text-sm text-fg">
            <CheckCircle2 className="size-5 text-success" />
            Ứng viên đã ký hợp đồng và bắt đầu nhận ca làm.
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}

function DocumentsPanel({ record }: { record: CandidateRecord }) {
  return (
    <SectionCard
      title="Hồ sơ giấy tờ"
      description="Tình trạng các giấy tờ cần để onboarding CTV."
    >
      <ul className="flex flex-col gap-3">
        {record.documents.map((doc) => {
          const state = DOC_STATE_LABELS[doc.state];
          return (
            <li
              key={doc.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-border-secondary bg-bg-secondary px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-fg">{doc.label}</p>
                {doc.note ? (
                  <p className="mt-1 text-sm text-fg-tertiary">{doc.note}</p>
                ) : null}
              </div>
              <Badge color={state.color} type="pill-color" size="sm">
                {state.label}
              </Badge>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}

function InterviewsPanel({ record }: { record: CandidateRecord }) {
  if (record.interviews.length === 0) {
    return (
      <SectionCard
        title="Phỏng vấn & ca thử"
        description="Lịch phỏng vấn và kết quả ca thử."
      >
        <div className="rounded-xl border border-dashed border-border-secondary bg-bg-secondary p-6 text-center text-sm text-fg-tertiary">
          Chưa có buổi phỏng vấn nào được lên lịch.
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Phỏng vấn & ca thử"
      description="Lịch phỏng vấn và kết quả ca thử."
    >
      <ul className="flex flex-col gap-3">
        {record.interviews.map((interview) => {
          const color =
            interview.outcome === "Đạt"
              ? "success"
              : interview.outcome === "Không đạt"
                ? "error"
                : "warning";
          return (
            <li
              key={interview.id}
              className="rounded-xl border border-border-secondary bg-bg-secondary px-4 py-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-fg">
                    {interview.mode}
                    <span className="text-fg-tertiary">• {interview.at}</span>
                  </div>
                  <p className="mt-1 text-sm text-fg-tertiary">
                    Phỏng vấn bởi {interview.interviewer}
                  </p>
                </div>
                <Badge color={color} type="pill-color" size="sm">
                  {interview.outcome}
                </Badge>
              </div>
              {interview.note ? (
                <p className="mt-2 text-sm text-fg-tertiary">{interview.note}</p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}

function InteractionsPanel({ record }: { record: CandidateRecord }) {
  if (record.interactions.length === 0) {
    return (
      <SectionCard title="Lịch sử tương tác" description="Cuộc gọi, tin nhắn và hành động hệ thống.">
        <div className="rounded-xl border border-dashed border-border-secondary bg-bg-secondary p-6 text-center text-sm text-fg-tertiary">
          Chưa có tương tác.
        </div>
      </SectionCard>
    );
  }
  return (
    <SectionCard
      title="Lịch sử tương tác"
      description="Cuộc gọi, tin nhắn và hành động hệ thống."
    >
      <div className="flex flex-col">
        {record.interactions.map((entry, index) => {
          const isLast = index === record.interactions.length - 1;
          return (
            <div key={entry.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-fg-brand">
                  <ChannelIcon channel={entry.channel} />
                </div>
                {!isLast ? <div className="mt-1 w-px flex-1 bg-border-secondary" /> : null}
              </div>
              <div className="flex-1 pb-5">
                <p className="text-sm font-medium text-fg">{entry.summary}</p>
                <p className="mt-1 text-sm text-fg-tertiary">
                  {entry.at} • {entry.actor}
                </p>
                {entry.detail ? (
                  <p className="mt-2 text-sm text-fg-tertiary">{entry.detail}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

function NotesPanel({ record }: { record: CandidateRecord }) {
  if (record.notes.length === 0) {
    return (
      <SectionCard title="Ghi chú nội bộ" description="Ghi chú giữa các recruiter, không chia sẻ với ứng viên.">
        <div className="rounded-xl border border-dashed border-border-secondary bg-bg-secondary p-6 text-center text-sm text-fg-tertiary">
          Chưa có ghi chú nội bộ.
        </div>
      </SectionCard>
    );
  }
  return (
    <SectionCard
      title="Ghi chú nội bộ"
      description="Ghi chú giữa các recruiter, không chia sẻ với ứng viên."
    >
      <ul className="flex flex-col gap-3">
        {record.notes.map((note) => (
          <li
            key={note.id}
            className="rounded-xl border border-border-secondary bg-bg-secondary px-4 py-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-fg">{note.actor}</p>
              <p className="text-sm text-fg-tertiary">{note.at}</p>
            </div>
            <p className="mt-2 text-sm text-fg">{note.body}</p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export function CandidateDetailTabs({ record }: CandidateDetailTabsProps) {
  return (
    <Tabs variant="underline" size="md" defaultSelectedKey="overview">
      <TabList aria-label="Phần chi tiết ứng viên">
        <Tab id="overview">Tổng quan</Tab>
        <Tab id="documents" value={record.documents.length}>
          Hồ sơ
        </Tab>
        <Tab id="interviews" value={record.interviews.length}>
          Phỏng vấn
        </Tab>
        <Tab id="interactions" value={record.interactions.length}>
          Tương tác
        </Tab>
        <Tab id="notes" value={record.notes.length}>
          Ghi chú
        </Tab>
      </TabList>
      <TabPanel id="overview">
        <OverviewPanel record={record} />
      </TabPanel>
      <TabPanel id="documents">
        <DocumentsPanel record={record} />
      </TabPanel>
      <TabPanel id="interviews">
        <InterviewsPanel record={record} />
      </TabPanel>
      <TabPanel id="interactions">
        <InteractionsPanel record={record} />
      </TabPanel>
      <TabPanel id="notes">
        <NotesPanel record={record} />
      </TabPanel>
    </Tabs>
  );
}

export { STAGE_LABELS };
