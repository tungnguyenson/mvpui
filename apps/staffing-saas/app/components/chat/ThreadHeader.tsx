import { Button } from "@mvp-ui/ui";
import { ArrowLeft, MoreHorizontal, Phone, Video } from "lucide-react";
import { ChannelBadge } from "./ChannelBadge";
import { PeerAvatar } from "./PeerAvatar";
import type { ChatChannel, ChatPeer } from "./chat-data";

interface ThreadHeaderProps {
  peer: ChatPeer;
  channel: ChatChannel;
  onBack?: () => void;
}

export function ThreadHeader({ peer, channel, onBack }: ThreadHeaderProps) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-border-secondary bg-bg px-4 py-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Quay lại danh sách"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-fg-secondary transition-colors hover:bg-bg-secondary hover:text-fg md:hidden"
        >
          <ArrowLeft className="size-5" />
        </button>
      ) : null}
      <PeerAvatar peer={peer} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="truncate text-sm font-semibold text-fg">
            {peer.name}
          </div>
          <ChannelBadge channel={channel} />
        </div>
        {peer.subtitle ? (
          <div className="truncate text-xs text-fg-tertiary">
            {peer.subtitle}
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          color="tertiary"
          iconLeading={<Phone className="size-4" />}
          aria-label="Gọi điện"
        />
        <Button
          size="sm"
          color="tertiary"
          iconLeading={<Video className="size-4" />}
          aria-label="Gọi video"
        />
        <Button
          size="sm"
          color="tertiary"
          iconLeading={<MoreHorizontal className="size-4" />}
          aria-label="Tùy chọn khác"
        />
      </div>
    </div>
  );
}
