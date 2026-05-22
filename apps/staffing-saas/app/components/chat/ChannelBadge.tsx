import { CHANNEL_META, type ChatChannel } from "./chat-data";

interface ChannelBadgeProps {
  channel: ChatChannel;
}

const TONE_CLASS: Record<ChatChannel, string> = {
  zalo_oa: "text-fg-brand",
  website: "text-info-fg",
  in_app: "text-warning-fg",
};

export function ChannelBadge({ channel }: ChannelBadgeProps) {
  const meta = CHANNEL_META[channel];
  return (
    <span className={`text-xs font-medium ${TONE_CLASS[channel]}`}>
      {meta.label}
    </span>
  );
}
