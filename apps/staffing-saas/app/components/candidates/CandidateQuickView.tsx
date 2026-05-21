"use client";

import {
  AvatarProfilePhoto,
  Badge,
  BadgeWithDot,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from "@mvp-ui/ui";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  CircleDollarSign,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Target,
  UserPlus,
  X,
} from "lucide-react";
import { getAvatarFor, getInitials } from "../_shared/assets";
import {
  type CandidateRecord,
  DOC_STATE_LABELS,
  SOURCE_LABELS,
  STAGE_LABELS,
} from "./candidates-data";

interface CandidateQuickViewProps {
  candidate: CandidateRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-fg-brand">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wide text-fg-tertiary">{label}</p>
        <div className="mt-0.5 text-sm text-fg">{children}</div>
      </div>
    </div>
  );
}

export function CandidateQuickView({
  candidate,
  isOpen,
  onClose,
}: CandidateQuickViewProps) {
  if (!candidate) {
    return (
      <Drawer
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        backdrop="dim"
        size="lg"
        aria-label="Quick view ứng viên"
      />
    );
  }

  const stage = STAGE_LABELS[candidate.stage];
  const verifiedDocs = candidate.documents.filter((d) => d.state === "verified").length;
  const totalDocs = candidate.documents.length;
  const latestInterview = candidate.interviews[candidate.interviews.length - 1];
  const latestInteraction =
    candidate.interactions[candidate.interactions.length - 1];

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      backdrop="dim"
      size="lg"
      aria-label={`Quick view ${candidate.fullName}`}
    >
      <DrawerHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <AvatarProfilePhoto
              size="md"
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
            <div>
              <h2 className="text-lg font-semibold text-fg">{candidate.fullName}</h2>
              <p className="mt-0.5 text-sm text-fg-tertiary">
                {candidate.code} • {candidate.district}, {candidate.city}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <BadgeWithDot color={stage.color} type="pill-color" size="sm">
                  {stage.label}
                </BadgeWithDot>
                <Badge color="gray" type="pill-color" size="sm">
                  {SOURCE_LABELS[candidate.source]}
                </Badge>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng quick view"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-fg-tertiary transition-colors hover:bg-bg-secondary hover:text-fg"
          >
            <X className="size-5" />
          </button>
        </div>
      </DrawerHeader>

      <DrawerBody className="flex flex-col gap-6">
        {candidate.notesShort ? (
          <p className="rounded-lg border border-border-secondary bg-bg-secondary px-3 py-2 text-sm text-fg">
            {candidate.notesShort}
          </p>
        ) : null}

        <section className="grid gap-4 sm:grid-cols-2">
          <Row icon={<Star className="size-4" />} label="Match score">
            <span className="font-semibold">{candidate.score}</span>
          </Row>
          <Row icon={<ShieldCheck className="size-4" />} label="Hồ sơ giấy tờ">
            <span className="font-medium">
              {verifiedDocs}/{totalDocs}
            </span>{" "}
            đã xác thực
          </Row>
          <Row icon={<Target className="size-4" />} label="Vị trí ứng tuyển">
            <p className="font-medium">{candidate.appliedPosition}</p>
            {candidate.hiringRequestCode ? (
              <Link
                href={`/hiring-requests/${candidate.hiringRequestId}`}
                className="text-sm text-fg-brand hover:underline"
              >
                {candidate.hiringRequestCode}
              </Link>
            ) : null}
          </Row>
          <Row icon={<UserPlus className="size-4" />} label="Phụ trách">
            {candidate.recruiter}
          </Row>
          <Row icon={<Phone className="size-4" />} label="Điện thoại">
            {candidate.phone}
          </Row>
          {candidate.email ? (
            <Row icon={<Mail className="size-4" />} label="Email">
              {candidate.email}
            </Row>
          ) : null}
          <Row icon={<MapPin className="size-4" />} label="Khu vực">
            {candidate.district}, {candidate.city}
          </Row>
          <Row icon={<Calendar className="size-4" />} label="Ngày sinh">
            {candidate.dob}
          </Row>
          {candidate.expectedPay ? (
            <Row icon={<CircleDollarSign className="size-4" />} label="Mong muốn">
              {candidate.expectedPay}
            </Row>
          ) : null}
        </section>

        <section>
          <h3 className="text-sm font-semibold text-fg">Kỹ năng</h3>
          {candidate.skills.length === 0 ? (
            <p className="mt-2 text-sm text-fg-tertiary">Chưa khai báo.</p>
          ) : (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {candidate.skills.map((skill) => (
                <Badge key={skill} color="gray" type="pill-color" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
          <p className="mt-3 text-sm text-fg-tertiary">{candidate.experience}</p>
        </section>

        {latestInterview ? (
          <section>
            <h3 className="text-sm font-semibold text-fg">Phỏng vấn gần nhất</h3>
            <div className="mt-2 rounded-lg border border-border-secondary bg-bg-secondary px-3 py-2.5 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-fg">{latestInterview.mode}</span>
                <Badge
                  color={
                    latestInterview.outcome === "Đạt"
                      ? "success"
                      : latestInterview.outcome === "Không đạt"
                        ? "error"
                        : "warning"
                  }
                  type="pill-color"
                  size="sm"
                >
                  {latestInterview.outcome}
                </Badge>
              </div>
              <p className="mt-1 text-fg-tertiary">
                {latestInterview.at} • {latestInterview.interviewer}
              </p>
            </div>
          </section>
        ) : null}

        {latestInteraction ? (
          <section>
            <h3 className="text-sm font-semibold text-fg">Hoạt động gần nhất</h3>
            <div className="mt-2 rounded-lg border border-border-secondary bg-bg-secondary px-3 py-2.5 text-sm">
              <p className="font-medium text-fg">{latestInteraction.summary}</p>
              <p className="mt-1 text-fg-tertiary">
                {latestInteraction.at} • {latestInteraction.actor}
              </p>
            </div>
          </section>
        ) : null}

        <section>
          <h3 className="text-sm font-semibold text-fg">Tình trạng giấy tờ</h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {candidate.documents.map((doc) => {
              const state = DOC_STATE_LABELS[doc.state];
              return (
                <li
                  key={doc.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-fg">{doc.label}</span>
                  <Badge color={state.color} type="pill-color" size="sm">
                    {state.label}
                  </Badge>
                </li>
              );
            })}
          </ul>
        </section>
      </DrawerBody>

      <DrawerFooter className="justify-between">
        <Button color="secondary" size="sm" onClick={onClose}>
          Đóng
        </Button>
        <Link href={`/candidates/${candidate.id}`}>
          <Button
            color="primary"
            size="sm"
            iconTrailing={<ArrowUpRight className="size-4" />}
          >
            Xem chi tiết
          </Button>
        </Link>
      </DrawerFooter>
    </Drawer>
  );
}
