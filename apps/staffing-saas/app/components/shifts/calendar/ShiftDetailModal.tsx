"use client";

import {
  Avatar,
  BadgeWithDot,
  Button,
  Dialog,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ProgressBarBase,
} from "@mvp-ui/ui";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Wallet,
} from "lucide-react";
import { SHIFT_STATUS_LABELS, type ShiftRecord } from "../shifts-data";

interface ShiftDetailModalProps {
  shift: ShiftRecord | null;
  onClose: () => void;
}

export function ShiftDetailModal({ shift, onClose }: ShiftDetailModalProps) {
  const open = shift !== null;
  return (
    <ModalOverlay
      isOpen={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      isDismissable
    >
      <Modal size="lg">
        <Dialog>
          {shift && <ShiftDetailContent shift={shift} onClose={onClose} />}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

function ShiftDetailContent({
  shift,
  onClose,
}: {
  shift: ShiftRecord;
  onClose: () => void;
}) {
  const status = SHIFT_STATUS_LABELS[shift.status];

  return (
    <>
      <ModalHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <BadgeWithDot color={status.color} type="pill-color" size="sm">
                {status.label}
              </BadgeWithDot>
              <span className="text-xs font-medium text-fg-tertiary tabular-nums">
                {shift.code}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-fg">{shift.name}</h2>
            <p className="text-sm text-fg-tertiary">
              {shift.customer} · {shift.site}
            </p>
          </div>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="grid gap-5 md:grid-cols-2">
          <InfoRow icon={CalendarDays} label="Lịch" value={shift.schedule} />
          <InfoRow
            icon={Clock}
            label="Thời gian"
            value={`${shift.startAt} → ${shift.endAt}`}
          />
          <InfoRow
            icon={MapPin}
            label="Địa điểm"
            value={`${shift.region} — ${shift.address}`}
          />
          <InfoRow
            icon={Wallet}
            label="Thù lao"
            value={shift.payRate}
            {...(shift.payRateNote && { secondary: shift.payRateNote })}
          />
        </div>

        <section className="mt-6 flex flex-col gap-3 rounded-lg border border-border-secondary bg-bg-secondary p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-fg">Tiến độ fill</span>
            <span className="text-sm font-semibold tabular-nums text-fg">
              {shift.assignedCount}/{shift.requiredCount}
            </span>
          </div>
          <ProgressBarBase
            value={shift.assignedCount}
            min={0}
            max={shift.requiredCount}
          />
        </section>

        <section className="mt-6 flex items-center gap-3 rounded-lg border border-border-secondary p-3">
          <Avatar
            size="md"
            src={shift.operator.avatarUrl}
            alt={shift.operator.name}
            initials={shift.operator.initials}
          />
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wide text-fg-tertiary">
              Người điều phối
            </span>
            <span className="text-sm font-semibold text-fg">
              {shift.operator.name}
            </span>
          </div>
        </section>

        {shift.requirements.length > 0 && (
          <section className="mt-6 flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-fg">Yêu cầu</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-fg-secondary">
              {shift.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </section>
        )}

        {shift.notes && (
          <section className="mt-6 flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-fg">Ghi chú điều phối</h3>
            <p className="text-sm text-fg-secondary">{shift.notes}</p>
          </section>
        )}

        {shift.assignments.length > 0 && (
          <section className="mt-6 flex flex-col gap-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-fg">
              <Users className="size-4 text-fg-tertiary" />
              Worker đã nhận ca ({shift.assignments.length})
            </h3>
            <ul className="divide-y divide-border-secondary rounded-md border border-border-secondary">
              {shift.assignments.slice(0, 5).map((a) => (
                <li
                  key={a.workerId}
                  className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-fg">{a.workerName}</span>
                    <span className="text-xs text-fg-tertiary">{a.role}</span>
                  </div>
                  <span className="text-xs text-fg-tertiary">
                    Xác nhận {a.confirmedAt}
                  </span>
                </li>
              ))}
            </ul>
            {shift.assignments.length > 5 && (
              <span className="text-xs text-fg-tertiary">
                +{shift.assignments.length - 5} worker khác — xem trang chi tiết
              </span>
            )}
          </section>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button color="secondary" asChild>
          <Link href={`/shifts/${shift.id}/config`}>
            Cấu hình
            <ChevronRight className="size-4" />
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/shifts/${shift.id}`}>
            Chi tiết
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </ModalFooter>
    </>
  );
}

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  secondary?: string;
}

function InfoRow({ icon: Icon, label, value, secondary }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-bg-secondary text-fg-tertiary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium uppercase tracking-wide text-fg-tertiary">
          {label}
        </div>
        <div className="text-sm font-medium text-fg">{value}</div>
        {secondary && (
          <div className="mt-0.5 text-xs text-fg-tertiary">{secondary}</div>
        )}
      </div>
    </div>
  );
}
