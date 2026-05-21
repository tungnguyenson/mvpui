"use client";

import {
  Badge,
  Button,
  MetricCard,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@mvp-ui/ui";
import Link from "next/link";
import {
  Building2,
  CalendarRange,
  CircleDollarSign,
  Clock,
  MapPin,
  Plus,
  Target,
  UserPlus,
  Users,
} from "lucide-react";
import type {
  HiringRequestRecord,
  HiringTimelineEntry,
  JobPost,
} from "./hiring-requests-data";
import {
  JOB_POST_STATUS_LABELS,
  JOB_POST_VISIBILITY_LABELS,
} from "./hiring-requests-data";
import { getCustomerLogo } from "../_shared/assets";
import { CandidateFunnelPanel } from "./CandidateFunnelPanel";

interface HiringRequestDetailTabsProps {
  record: HiringRequestRecord;
  fillRate: number;
  remaining: number;
}

function SectionCard({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
      <div className="flex items-start justify-between gap-4 border-b border-border-secondary px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-fg">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="p-5">{children}</div>
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

function OverviewPanel({
  record,
  fillRate,
  remaining,
}: HiringRequestDetailTabsProps) {
  const logo = getCustomerLogo(record.customerId);
  const slotFillRate =
    record.totalSlots > 0
      ? Math.round((record.filledSlots / record.totalSlots) * 100)
      : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          label="CTV đã nhận"
          value={`${record.committedWorkers}/${record.headcount}`}
          valueSize="md"
          helpText={`${fillRate}% headcount · còn ${remaining} người`}
          iconChip={<Users className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Slot đã đi"
          value={`${record.filledSlots}/${record.totalSlots}`}
          valueSize="md"
          helpText={`${slotFillRate}% · ${record.headcount} người × ngày làm việc`}
          iconChip={<Target className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="success"
          iconPlacement="inline"
        />
        <MetricCard
          label="Khoảng tuyển"
          value={`${record.startDate} → ${record.endDate}`}
          valueSize="md"
          iconChip={<CalendarRange className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Hạn fill"
          value={record.targetDeadline}
          valueSize="md"
          helpText={`Deadline khách: ${record.deadline}`}
          iconChip={<Clock className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="warning"
          iconPlacement="inline"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Thông tin yêu cầu"
          description="Khách hàng, ca làm việc và liên hệ phụ trách."
        >
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              {logo ? (
                <div className="mt-0.5 size-6 shrink-0 overflow-hidden rounded-md">
                  <img
                    src={logo.mark}
                    alt={`Logo ${record.customer}`}
                    className="size-full object-cover"
                  />
                </div>
              ) : (
                <Building2 className="mt-0.5 size-4 text-fg-brand" />
              )}
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
            {record.shiftId && (
              <div className="flex items-start gap-3">
                <Target className="mt-0.5 size-4 text-fg-brand" />
                <div>
                  <p className="text-sm text-fg">Ca làm việc</p>
                  <Link
                    href={`/customers/${record.customerId}?tab=shifts&shift=${record.shiftId}`}
                    className="text-sm text-fg-brand hover:underline"
                  >
                    {record.shiftId}
                  </Link>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">{record.area}</p>
            </div>
            <div className="flex items-start gap-3">
              <CalendarRange className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm text-fg">
                  {record.startDate} → {record.endDate}
                </p>
                <p className="text-sm text-fg-tertiary">
                  Hạn fill {record.targetDeadline}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CircleDollarSign className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">{record.payRate}</p>
            </div>
            <div className="flex items-start gap-3">
              <UserPlus className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">Liên hệ: {record.contact}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Ghi chú khách hàng"
          description="Brief từ khách hàng và lưu ý khi fulfill."
        >
          <p className="text-sm text-fg">{record.notes}</p>
          {record.workerProfile.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-medium text-fg-secondary">
                Hồ sơ worker mong muốn
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {record.workerProfile.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border-secondary bg-bg-secondary px-3 py-2 text-sm text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

function JobPostListPanel({ record }: { record: HiringRequestRecord }) {
  return (
    <SectionCard
      title="Tin tuyển dụng"
      description="Tin do staffing đăng để fulfill y/c này. 1 y/c có thể có nhiều tin (re-post, multi-channel, public + private)."
      action={
        <Button
          color="primary"
          size="sm"
          iconLeading={<Plus className="size-4" />}
        >
          Đăng tin mới
        </Button>
      }
    >
      {record.jobPosts.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border-secondary bg-bg-secondary px-4 py-6 text-center text-sm text-fg-tertiary">
          Chưa có tin tuyển dụng nào. Bấm "Đăng tin mới" để bắt đầu nhận CTV.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {record.jobPosts.map((post) => (
            <JobPostRow key={post.id} post={post} />
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

function JobPostRow({ post }: { post: JobPost }) {
  const statusMeta = JOB_POST_STATUS_LABELS[post.status];
  const payLabel = `${post.displayedPay.amount.toLocaleString("vi-VN")}đ/${
    post.displayedPay.unit === "shift" ? "ca" : "h"
  }`;
  const bonus = post.adhocBonus;

  return (
    <li className="rounded-lg border border-border-secondary bg-bg p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-fg-brand">{post.id}</span>
            <Badge type="pill-color" color={statusMeta.color} size="sm">
              {statusMeta.label}
            </Badge>
            <span className="text-xs text-fg-tertiary">
              {JOB_POST_VISIBILITY_LABELS[post.visibility]}
            </span>
          </div>
          <p className="text-sm font-medium text-fg">{post.title}</p>
          <div className="flex flex-wrap gap-4 text-xs text-fg-tertiary">
            <span>Thù lao: {payLabel}</span>
            <span>{post.payCycle}</span>
            {post.publishedAt && <span>Đăng: {post.publishedAt}</span>}
            {post.closedAt && <span>Đóng: {post.closedAt}</span>}
            <span>{post.applicationCount} ứng viên</span>
          </div>
          {bonus && (
            <div className="mt-1 flex flex-wrap items-center gap-2 rounded-md bg-bg-secondary px-3 py-2 text-xs">
              <span className="font-medium text-fg">
                +{bonus.amount.toLocaleString("vi-VN")}đ/
                {bonus.unit === "shift" ? "ca" : "h"} thưởng thêm
              </span>
              <Badge
                type="pill-color"
                color={
                  bonus.approvalStatus === "approved"
                    ? "success"
                    : bonus.approvalStatus === "rejected"
                      ? "error"
                      : "warning"
                }
                size="sm"
              >
                {bonus.approvalStatus === "approved"
                  ? "Đã duyệt"
                  : bonus.approvalStatus === "rejected"
                    ? "Từ chối"
                    : "Chờ duyệt"}
              </Badge>
              <span className="text-fg-tertiary">— {bonus.reason}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button color="secondary" size="sm">
            Xem
          </Button>
        </div>
      </div>
    </li>
  );
}

function TimelinePanel({ record }: { record: HiringRequestRecord }) {
  return (
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
  );
}

export function HiringRequestDetailTabs({
  record,
  fillRate,
  remaining,
}: HiringRequestDetailTabsProps) {
  return (
    <Tabs variant="underline" size="md" defaultSelectedKey="overview">
      <TabList aria-label="Phần chi tiết hiring request">
        <Tab id="overview">Tổng quan</Tab>
        <Tab id="job-posts" value={record.jobPosts.length}>
          Tin tuyển dụng
        </Tab>
        <Tab id="funnel" value={record.candidates.length}>
          Ứng viên
        </Tab>
        <Tab id="timeline">Timeline</Tab>
      </TabList>
      <TabPanel id="overview">
        <OverviewPanel
          record={record}
          fillRate={fillRate}
          remaining={remaining}
        />
      </TabPanel>
      <TabPanel id="job-posts">
        <JobPostListPanel record={record} />
      </TabPanel>
      <TabPanel id="funnel">
        <CandidateFunnelPanel
          candidates={record.candidates}
          remaining={remaining}
        />
      </TabPanel>
      <TabPanel id="timeline">
        <TimelinePanel record={record} />
      </TabPanel>
    </Tabs>
  );
}
