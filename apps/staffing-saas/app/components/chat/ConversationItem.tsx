"use client";

import { Badge } from "@mvp-ui/ui";
import { PeerAvatar } from "./PeerAvatar";
import { ChannelBadge } from "./ChannelBadge";
import type { ChatConversation } from "./chat-data";

interface ConversationItemProps {
  conversation: ChatConversation;
  active: boolean;
  onSelect: (id: string) => void;
}

export function ConversationItem({
  conversation,
  active,
  onSelect,
}: ConversationItemProps) {
  const { peer, channel, lastMessage, needsHuman, unreadCount } = conversation;
  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.id)}
      aria-current={active ? "true" : undefined}
      className={`flex w-full gap-3 px-4 py-3 text-left transition-colors border-b border-border-secondary cursor-pointer ${
        active ? "bg-bg-secondary" : "bg-bg hover:bg-bg-secondary"
      }`}
    >
      <div className="flex flex-col items-center gap-1">
        <PeerAvatar peer={peer} size="md" />
        <ChannelBadge channel={channel} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <div className="truncate text-sm font-semibold text-fg">
            {peer.name}
          </div>
          <div className="shrink-0 text-xs text-fg-tertiary">
            {lastMessage.at}
          </div>
        </div>

        <div className="mt-0.5 flex items-start justify-between gap-2">
          <div className="line-clamp-2 text-sm text-fg-tertiary">
            {lastMessage.sender === "bot" && "🤖 "}
            {lastMessage.sender === "agent" && "Bạn: "}
            {lastMessage.text}
          </div>
          {unreadCount > 0 ? (
            <div
              role="status"
              aria-label={`${unreadCount} tin chưa đọc`}
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-fg"
            >
              {unreadCount}
            </div>
          ) : null}
        </div>

        {needsHuman ? (
          <div className="mt-2">
            <Badge color="warning" type="pill-color" size="sm">
              Cần gặp nhân viên
            </Badge>
          </div>
        ) : null}
      </div>
    </button>
  );
}
