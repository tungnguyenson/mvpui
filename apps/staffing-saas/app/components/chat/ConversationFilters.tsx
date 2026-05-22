"use client";

import { Button, Input, Select, SelectItem } from "@mvp-ui/ui";
import { Filter, Search } from "lucide-react";
import type { ChatChannel, ChatPeerType } from "./chat-data";

export type ChannelFilter = "all" | ChatChannel;
export type PeerFilter = "all" | ChatPeerType;

interface ConversationFiltersProps {
  search: string;
  onSearchChange: (next: string) => void;
  channel: ChannelFilter;
  onChannelChange: (next: ChannelFilter) => void;
  peerType: PeerFilter;
  onPeerTypeChange: (next: PeerFilter) => void;
}

const CHANNEL_OPTIONS = [
  { id: "all", label: "Tất cả kênh" },
  { id: "zalo_oa", label: "Zalo OA" },
  { id: "website", label: "Website" },
  { id: "in_app", label: "In-app" },
];

const PEER_OPTIONS = [
  { id: "all", label: "Tất cả loại" },
  { id: "candidate", label: "Ứng viên" },
  { id: "worker", label: "CTV" },
  { id: "customer", label: "Khách hàng" },
  { id: "group", label: "Nhóm" },
];

export function ConversationFilters({
  search,
  onSearchChange,
  channel,
  onChannelChange,
  peerType,
  onPeerTypeChange,
}: ConversationFiltersProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-border-secondary p-3">
      <Input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Tìm cuộc trò chuyện"
        iconLeading={<Search className="size-4" />}
        size="sm"
        aria-label="Tìm cuộc trò chuyện"
      />
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Select
            aria-label="Lọc theo kênh"
            items={CHANNEL_OPTIONS}
            selectedKey={channel}
            onSelectionChange={(key) => onChannelChange(key as ChannelFilter)}
            size="sm"
            placeholder="Kênh"
          >
            {(item) => (
              <SelectItem id={item.id} label={item.label}>
                {item.label}
              </SelectItem>
            )}
          </Select>
        </div>
        <div className="flex-1">
          <Select
            aria-label="Lọc theo loại"
            items={PEER_OPTIONS}
            selectedKey={peerType}
            onSelectionChange={(key) => onPeerTypeChange(key as PeerFilter)}
            size="sm"
            placeholder="Loại"
          >
            {(item) => (
              <SelectItem id={item.id} label={item.label}>
                {item.label}
              </SelectItem>
            )}
          </Select>
        </div>
        <Button
          size="sm"
          color="tertiary"
          iconLeading={<Filter className="size-4" />}
          aria-label="Bộ lọc nâng cao"
        />
      </div>
    </div>
  );
}
