"use client";

import {
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  HintText,
  Input,
  TextArea,
} from "@mvp-ui/ui";
import { ChevronDown, ChevronUp, Lock, Pencil } from "lucide-react";
import { useMemo, useState } from "react";
import { useWizard } from "./wizardContext";
import {
  HEADCOUNT_APPROVAL_THRESHOLD_PCT,
  type ApprovalStatus,
  type HeadcountChangeEntry,
} from "./types";

const APPROVAL_LABELS: Record<
  ApprovalStatus,
  { label: string; color: "warning" | "success" | "error" }
> = {
  pending: { label: "Chờ duyệt", color: "warning" },
  approved: { label: "Đã duyệt", color: "success" },
  rejected: { label: "Từ chối", color: "error" },
};

export function HeadcountSection() {
  const { mode, form, setBasic } = useWizard();
  const basic = form.basic;
  const isCreate = mode === "create";

  // Create mode → simple input. Lifecycle starts after creation.
  if (isCreate) {
    return (
      <Input
        label="Số lượng"
        type="number"
        min={1}
        isRequired
        value={String(basic.headcount)}
        onChange={(e) => setBasic({ headcount: Number(e.target.value) || 0 })}
        hint="Lưu ý: định tuyển 10 nên chọn 12 hoặc 15 vì có CTV bận phút chót."
      />
    );
  }

  return <LockedHeadcount />;
}

function LockedHeadcount() {
  const { form, setBasic } = useWizard();
  const { headcount, headcountHistory, headcountPending } = form.basic;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  function applyChange({
    requestedValue,
    reason,
  }: {
    requestedValue: number;
    reason: string;
  }) {
    const changePct =
      headcount === 0 ? 100 : Math.abs((requestedValue - headcount) / headcount) * 100;
    const needsApproval = changePct >= HEADCOUNT_APPROVAL_THRESHOLD_PCT;
    const nowStr = new Date()
      .toLocaleString("vi-VN", { hour12: false })
      .replace(",", "");
    const actor = "Bạn (demo)";

    if (needsApproval) {
      setBasic({
        headcountPending: {
          requestedValue,
          reason,
          requestedAt: nowStr,
          actor,
        },
        headcountHistory: [
          {
            id: `hc-${Date.now()}`,
            changedAt: nowStr,
            actor,
            fromValue: headcount,
            toValue: requestedValue,
            reason,
            approvalStatus: "pending",
            changePct: Math.round(changePct),
          },
          ...headcountHistory,
        ],
      });
    } else {
      setBasic({
        headcount: requestedValue,
        headcountPending: null,
        headcountHistory: [
          {
            id: `hc-${Date.now()}`,
            changedAt: nowStr,
            actor,
            fromValue: headcount,
            toValue: requestedValue,
            reason,
            approvalStatus: "approved",
            changePct: Math.round(changePct),
          },
          ...headcountHistory,
        ],
      });
    }
    setDrawerOpen(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-fg-secondary">Số lượng</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-fg">{headcount}</span>
            <span className="text-sm text-fg-tertiary">người</span>
            <Lock className="size-3.5 text-fg-tertiary" />
          </div>
          {headcountPending ? (
            <div className="mt-1 flex items-center gap-2 text-xs">
              <Badge color="warning" type="pill-color" size="sm">
                Chờ duyệt: → {headcountPending.requestedValue}
              </Badge>
            </div>
          ) : null}
        </div>
        <Button
          size="sm"
          color="secondary"
          iconLeading={Pencil}
          onClick={() => setDrawerOpen(true)}
        >
          Thay đổi số lượng
        </Button>
      </div>

      <HintText>
        Thay đổi ảnh hưởng SLA nên cần lý do và sẽ ghi log. ≥{" "}
        {HEADCOUNT_APPROVAL_THRESHOLD_PCT}% phải qua duyệt.
      </HintText>

      <button
        type="button"
        onClick={() => setHistoryOpen((v) => !v)}
        className="flex items-center gap-1 self-start text-xs text-fg-brand"
      >
        {historyOpen ? (
          <ChevronUp className="size-3.5" />
        ) : (
          <ChevronDown className="size-3.5" />
        )}
        Lịch sử thay đổi ({headcountHistory.length})
      </button>

      {historyOpen ? (
        <ol className="flex flex-col gap-2 border-l-2 border-border-secondary pl-3">
          {headcountHistory.map((entry) => (
            <HistoryRow key={entry.id} entry={entry} />
          ))}
          {headcountHistory.length === 0 ? (
            <p className="text-xs text-fg-tertiary">Chưa có thay đổi nào.</p>
          ) : null}
        </ol>
      ) : null}

      <ChangeHeadcountDrawer
        isOpen={drawerOpen}
        onOpenChange={setDrawerOpen}
        currentValue={headcount}
        onSubmit={applyChange}
      />
    </div>
  );
}

function HistoryRow({ entry }: { entry: HeadcountChangeEntry }) {
  const approval = APPROVAL_LABELS[entry.approvalStatus];
  return (
    <li className="flex flex-col gap-0.5 text-xs">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium text-fg">
          {entry.fromValue} → {entry.toValue}
        </span>
        <span className="text-fg-tertiary">({entry.changePct}%)</span>
        <Badge color={approval.color} type="pill-color" size="sm">
          {approval.label}
        </Badge>
      </div>
      <span className="text-fg-tertiary">
        {entry.changedAt} · {entry.actor}
      </span>
      <span className="text-fg-secondary">{entry.reason}</span>
    </li>
  );
}

interface ChangeHeadcountDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentValue: number;
  onSubmit: (args: { requestedValue: number; reason: string }) => void;
}

function ChangeHeadcountDrawer({
  isOpen,
  onOpenChange,
  currentValue,
  onSubmit,
}: ChangeHeadcountDrawerProps) {
  const [nextValue, setNextValue] = useState<number>(currentValue);
  const [reason, setReason] = useState("");

  const changePct = useMemo(() => {
    if (currentValue === 0) return 100;
    return Math.abs((nextValue - currentValue) / currentValue) * 100;
  }, [nextValue, currentValue]);
  const needsApproval = changePct >= HEADCOUNT_APPROVAL_THRESHOLD_PCT;
  const reasonOk = reason.trim().length >= 20;
  const valueOk = Number.isFinite(nextValue) && nextValue >= 1 && nextValue !== currentValue;

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setNextValue(currentValue);
          setReason("");
        }
        onOpenChange(open);
      }}
      title="Thay đổi số lượng tuyển"
      description="Cập nhật số lượng. Thay đổi sẽ ghi log và có thể cần duyệt."
      size="md"
      showCloseButton
    >
      <DrawerBody className="flex flex-col gap-4">
        <Input
          label="Số lượng mới"
          type="number"
          min={1}
          isRequired
          value={String(nextValue)}
          onChange={(e) => setNextValue(Number(e.target.value) || 0)}
          hint={`Hiện tại: ${currentValue} · Thay đổi: ${nextValue >= currentValue ? "+" : "-"}${Math.abs(nextValue - currentValue)} (${Math.round(changePct)}%)`}
        />

        <TextArea
          label="Lý do"
          isRequired
          value={reason}
          onChange={(value) => setReason(value)}
          rows={4}
          hint="Bắt buộc, tối thiểu 20 ký tự. Hiển thị trong log + gửi cho người duyệt nếu cần."
        />

        {needsApproval ? (
          <div className="rounded-lg border border-warning-border bg-warning-bg p-3 text-sm text-warning-fg">
            Thay đổi {Math.round(changePct)}% (≥{" "}
            {HEADCOUNT_APPROVAL_THRESHOLD_PCT}%) — yêu cầu duyệt trước khi áp dụng.
          </div>
        ) : (
          <div className="rounded-lg border border-success-border bg-success-bg p-3 text-sm text-success-fg">
            Thay đổi nhỏ hơn ngưỡng — áp dụng ngay sau khi xác nhận.
          </div>
        )}
      </DrawerBody>

      <DrawerFooter>
        <Button
          color="secondary"
          size="md"
          onClick={() => onOpenChange(false)}
        >
          Hủy
        </Button>
        <Button
          color="primary"
          size="md"
          disabled={!reasonOk || !valueOk}
          onClick={() => onSubmit({ requestedValue: nextValue, reason })}
        >
          {needsApproval ? "Gửi yêu cầu duyệt" : "Xác nhận"}
        </Button>
      </DrawerFooter>
    </Drawer>
  );
}
