"use client";

import { AvatarProfilePhoto, Badge, BadgeWithDot } from "@mvp-ui/ui";
import { getAvatarFor, getInitials } from "../_shared/assets";
import {
  type CandidateRecord,
  STAGE_LABELS,
  STAGE_ORDER,
  TERMINAL_STAGES,
  fmtSource,
} from "./candidates-data";

interface CandidatesKanbanProps {
  candidates: CandidateRecord[];
  onSelect: (candidate: CandidateRecord) => void;
}

function StageColumn({
  stageId,
  items,
  onSelect,
}: {
  stageId: (typeof STAGE_ORDER)[number] | (typeof TERMINAL_STAGES)[number];
  items: CandidateRecord[];
  onSelect: (candidate: CandidateRecord) => void;
}) {
  const stage = STAGE_LABELS[stageId];

  return (
    <div className="flex w-72 shrink-0 flex-col rounded-xl border border-border-secondary bg-bg-secondary">
      <div className="flex items-center justify-between border-b border-border-secondary px-3 py-2.5">
        <div className="flex items-center gap-2">
          <BadgeWithDot color={stage.color} type="pill-color" size="sm">
            {stage.label}
          </BadgeWithDot>
        </div>
        <span className="text-sm font-medium text-fg-tertiary">{items.length}</span>
      </div>
      <div className="flex max-h-[calc(100vh-10rem)] flex-col gap-2 overflow-y-auto p-3">
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border-secondary bg-bg p-4 text-center text-sm text-fg-tertiary">
            Trống
          </div>
        ) : (
          items.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              onClick={() => onSelect(candidate)}
              className="group rounded-lg border border-border-secondary bg-bg p-3 text-left shadow-xs transition-colors hover:border-border-brand"
            >
              <div className="flex items-start gap-2.5">
                <AvatarProfilePhoto
                  size="sm"
                  state={
                    candidate.stage === "hired"
                      ? "verified"
                      : candidate.stage === "blacklist"
                        ? "blocked"
                        : null
                  }
                  src={getAvatarFor(candidate.fullName, candidate.id)}
                  alt={candidate.fullName}
                  initials={getInitials(candidate.fullName)}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-fg group-hover:text-fg-brand">
                    {candidate.fullName}
                  </div>
                  <div className="truncate text-sm text-fg-tertiary">{candidate.code}</div>
                </div>
                <span className="text-sm font-semibold text-fg">{candidate.score}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-sm text-fg-tertiary">
                <Badge color="gray" type="pill-color" size="sm">
                  {fmtSource(candidate.source)}
                </Badge>
                {candidate.hiringRequestCode ? (
                  <span className="text-xs">{candidate.hiringRequestCode}</span>
                ) : null}
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-fg-tertiary">
                {candidate.notesShort ?? candidate.appliedPosition}
              </p>
              <div className="mt-2 flex items-center justify-between text-sm text-fg-tertiary">
                <span>{candidate.recruiter}</span>
                <span>{candidate.lastTouchAt}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export function CandidatesKanban({ candidates, onSelect }: CandidatesKanbanProps) {
  const allStages = [...STAGE_ORDER, ...TERMINAL_STAGES];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {allStages.map((stageId) => (
        <StageColumn
          key={stageId}
          stageId={stageId}
          items={candidates.filter((c) => c.stage === stageId)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
