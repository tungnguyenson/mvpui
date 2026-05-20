"use client";

import { Avatar, Badge, Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";
import Link from "next/link";
import {
  CANDIDATE_LABELS,
  type CandidateStatus,
  type HiringCandidate,
} from "./hiring-requests-data";
import { getAvatarFor, getInitials } from "../_shared/assets";

interface CandidateFunnelPanelProps {
  candidates: HiringCandidate[];
  remaining: number;
}

const TAB_ORDER: CandidateStatus[] = [
  "assigned",
  "shortlisted",
  "interviewing",
  "rejected",
  "withdrawn",
];

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

function CandidateList({ items }: { items: HiringCandidate[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-secondary bg-bg-secondary p-6 text-center text-sm text-fg-tertiary">
        Chưa có ứng viên ở trạng thái này.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {items.map((candidate) => (
        <CandidateItem key={candidate.id} candidate={candidate} />
      ))}
    </div>
  );
}

export function CandidateFunnelPanel({
  candidates,
  remaining,
}: CandidateFunnelPanelProps) {
  const statusCounts = TAB_ORDER.reduce<Record<CandidateStatus, number>>(
    (acc, status) => {
      acc[status] = candidates.filter((c) => c.status === status).length;
      return acc;
    },
    {
      assigned: 0,
      shortlisted: 0,
      interviewing: 0,
      rejected: 0,
      withdrawn: 0,
    },
  );

  const visibleStatuses = TAB_ORDER.filter((status) => statusCounts[status] > 0);

  return (
    <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">

      <div className="p-5">
        <Tabs variant="pill" size="sm" defaultSelectedKey="all">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-4">
            <TabList aria-label="Lọc ứng viên theo trạng thái">
              <Tab id="all" value={candidates.length}>
                Tất cả
              </Tab>
              {visibleStatuses.map((status) => (
                <Tab
                  key={status}
                  id={status}
                  value={statusCounts[status]}
                >
                  {CANDIDATE_LABELS[status].label}
                </Tab>
              ))}
            </TabList>
            <div className="rounded-lg border border-border-secondary bg-bg-secondary px-3 py-2 text-sm">
              <span className="text-fg-tertiary">Còn cần </span>
              <span className="font-semibold text-fg">{remaining} người</span>
            </div>
          </div>
          <TabPanel id="all">
            <CandidateList items={candidates} />
          </TabPanel>
          {visibleStatuses.map((status) => (
            <TabPanel key={status} id={status}>
              <CandidateList
                items={candidates.filter((c) => c.status === status)}
              />
            </TabPanel>
          ))}
        </Tabs>

      </div>
    </div>
  );
}
