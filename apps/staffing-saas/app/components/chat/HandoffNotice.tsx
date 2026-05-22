interface HandoffNoticeProps {
  agentName: string;
}

export function HandoffNotice({ agentName }: HandoffNoticeProps) {
  return (
    <div className="my-2 flex items-center justify-center gap-2">
      <div className="h-px flex-1 bg-border-secondary" aria-hidden />
      <div className="text-xs text-fg-brand">
        Bạn đang chat với Nhân viên{" "}
        <span className="font-semibold">{agentName}</span>
      </div>
      <div className="h-px flex-1 bg-border-secondary" aria-hidden />
    </div>
  );
}
