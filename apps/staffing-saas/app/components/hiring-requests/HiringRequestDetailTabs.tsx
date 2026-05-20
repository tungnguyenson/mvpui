"use client";

import { MetricCard, Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";
import Link from "next/link";
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
import type {
  HiringRequestRecord,
  HiringTimelineEntry,
} from "./hiring-requests-data";
import { getCustomerLogo } from "../_shared/assets";
import { CandidateFunnelPanel } from "./CandidateFunnelPanel";
import { HiringRequestConfigForm } from "./config";

interface HiringRequestDetailTabsProps {
  record: HiringRequestRecord;
  fillRate: number;
  remaining: number;
}

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

  return (
    <div className="flex flex-col gap-6">
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
    </div>
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
        <Tab id="config">Cấu hình</Tab>
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
      <TabPanel id="config">
        <HiringRequestConfigForm />
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
