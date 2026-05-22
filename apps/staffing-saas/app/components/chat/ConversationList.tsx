"use client";

import { useMemo, useState } from "react";
import {
  ConversationFilters,
  type ChannelFilter,
  type PeerFilter,
} from "./ConversationFilters";
import { ConversationItem } from "./ConversationItem";
import type { ChatConversation } from "./chat-data";

interface ConversationListProps {
  conversations: ChatConversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
}: ConversationListProps) {
  const [search, setSearch] = useState("");
  const [channel, setChannel] = useState<ChannelFilter>("all");
  const [peerType, setPeerType] = useState<PeerFilter>("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return conversations.filter((c) => {
      if (channel !== "all" && c.channel !== channel) return false;
      if (peerType !== "all" && c.peer.type !== peerType) return false;
      if (q === "") return true;
      return (
        c.peer.name.toLowerCase().includes(q) ||
        c.lastMessage.text.toLowerCase().includes(q)
      );
    });
  }, [conversations, search, channel, peerType]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-bg">
      <ConversationFilters
        search={search}
        onSearchChange={setSearch}
        channel={channel}
        onChannelChange={setChannel}
        peerType={peerType}
        onPeerTypeChange={setPeerType}
      />
      <div className="min-h-0 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-sm text-fg-tertiary">
            Không có cuộc trò chuyện phù hợp.
          </div>
        ) : (
          filtered.map((c) => (
            <ConversationItem
              key={c.id}
              conversation={c}
              active={c.id === activeId}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </div>
  );
}
