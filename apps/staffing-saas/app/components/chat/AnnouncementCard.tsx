import { CheckCheck, Megaphone, Pin } from "lucide-react";
import type { ChatAnnouncement } from "./chat-data";

interface AnnouncementCardProps {
  announcement: ChatAnnouncement;
  variant: "pinned" | "inline";
}

export function AnnouncementCard({
  announcement,
  variant,
}: AnnouncementCardProps) {
  if (variant === "pinned") {
    return (
      <div className="border-b border-warning-border bg-warning-bg/80 px-4 py-2.5">
        <div className="mx-auto flex max-w-3xl items-start gap-2.5">
          <Pin className="mt-0.5 size-4 shrink-0 text-warning-fg" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-warning-fg">
                Thông báo vận hành · đã ghim
              </span>
              {announcement.acknowledgedCount !== undefined &&
                announcement.totalRecipients !== undefined ? (
                <span className="text-xs text-fg-tertiary">
                  · {announcement.acknowledgedCount}/
                  {announcement.totalRecipients} đã xác nhận
                </span>
              ) : null}
            </div>
            <div className="mt-0.5 truncate text-sm font-medium text-fg">
              {announcement.title}
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-md border border-border-secondary bg-bg px-2.5 py-1 text-xs font-medium text-fg hover:bg-bg-secondary"
          >
            Xem
          </button>
        </div>
      </div>
    );
  }

  const ackCount = announcement.acknowledgedCount;
  const total = announcement.totalRecipients;

  return (
    <div className="rounded-2xl border border-warning-border bg-warning-bg/70 p-4">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-warning-bg text-warning-fg">
          <Megaphone className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold uppercase tracking-wide text-warning-fg">
            Thông báo vận hành
          </div>
          <div className="mt-1 text-sm font-semibold text-fg">
            {announcement.title}
          </div>
          <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-fg-secondary">
            {announcement.body}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border-secondary pt-2.5">
            <div className="text-xs text-fg-tertiary">
              Đăng bởi{" "}
              <span className="font-medium text-fg-secondary">
                {announcement.postedBy}
              </span>{" "}
              · {announcement.postedAt}
              {ackCount !== undefined && total !== undefined ? (
                <>
                  {" "}
                  · {ackCount}/{total} đã xác nhận
                </>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md border border-border-secondary bg-bg px-2.5 py-1 text-xs font-medium text-fg hover:bg-bg-secondary"
              >
                <CheckCheck className="size-3.5" />
                Đã đọc
              </button>
              <button
                type="button"
                className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-fg hover:bg-primary-hover"
              >
                Phản hồi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
