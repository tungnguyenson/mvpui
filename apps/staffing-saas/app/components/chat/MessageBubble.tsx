import { Paperclip } from "lucide-react";
import { AgentAvatar, BotAvatar, PeerAvatar } from "./PeerAvatar";
import type { ChatAttachment, ChatMessage, ChatPeer } from "./chat-data";

interface MessageBubbleProps {
  message: ChatMessage;
  peer: ChatPeer;
}

function Attachment({ attachment }: { attachment: ChatAttachment }) {
  return (
    <div className="mt-2 flex items-center gap-2 rounded-lg border border-border-secondary bg-bg px-3 py-2 text-fg">
      <Paperclip className="size-4 shrink-0 text-fg-tertiary" />
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{attachment.name}</div>
        <div className="text-xs text-fg-tertiary">{attachment.size}</div>
      </div>
    </div>
  );
}

export function MessageBubble({ message, peer }: MessageBubbleProps) {
  if (message.sender === "system") {
    return null;
  }

  const isOutgoing = message.sender === "agent";
  const isBot = message.sender === "bot";

  const avatar = isBot ? (
    <BotAvatar size="sm" />
  ) : isOutgoing ? (
    <AgentAvatar name={message.senderName ?? "Bạn"} size="sm" />
  ) : (
    <PeerAvatar peer={peer} size="sm" />
  );

  const bubbleClass = isOutgoing
    ? "bg-primary text-primary-fg"
    : isBot
      ? "bg-fg text-bg"
      : "bg-bg border border-border-secondary text-fg";

  const containerClass = isOutgoing
    ? "flex-row-reverse"
    : "flex-row";

  const labelClass = isOutgoing
    ? "text-right text-fg-brand"
    : isBot
      ? "text-fg-secondary"
      : "text-fg-secondary";

  return (
    <div className={`flex items-end gap-2 ${containerClass}`}>
      <div className="shrink-0">{avatar}</div>
      <div className={`max-w-[78%] ${isOutgoing ? "items-end" : "items-start"} flex flex-col`}>
        {message.senderName && peer.type === "group" && !isOutgoing ? (
          <div className={`mb-1 text-xs font-medium ${labelClass}`}>
            {message.senderName}
          </div>
        ) : null}
        {isBot ? (
          <div className={`mb-1 text-xs font-medium ${labelClass}`}>chatbot</div>
        ) : null}
        {isOutgoing && message.senderName ? (
          <div className={`mb-1 text-xs font-medium ${labelClass}`}>
            {message.senderName}
          </div>
        ) : null}
        <div
          className={`whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${bubbleClass}`}
        >
          {message.text}
        </div>
        {message.attachments?.map((att) => (
          <Attachment key={att.name} attachment={att} />
        ))}
        <div className="mt-1 text-[11px] text-fg-tertiary">{message.at}</div>
      </div>
    </div>
  );
}
