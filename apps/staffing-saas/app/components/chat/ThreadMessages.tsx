import { AnnouncementCard } from "./AnnouncementCard";
import { HandoffNotice } from "./HandoffNotice";
import { MessageBubble } from "./MessageBubble";
import type {
  ChatAnnouncement,
  ChatHandoff,
  ChatMessage,
  ChatPeer,
} from "./chat-data";

interface ThreadMessagesProps {
  messages: ChatMessage[];
  peer: ChatPeer;
  handoff?: ChatHandoff;
  pinnedAnnouncement?: ChatAnnouncement;
}

function findHandoffIndex(messages: ChatMessage[]): number {
  for (let i = 0; i < messages.length; i += 1) {
    if (messages[i]?.sender === "agent") return i;
  }
  return -1;
}

export function ThreadMessages({
  messages,
  peer,
  handoff,
  pinnedAnnouncement,
}: ThreadMessagesProps) {
  const handoffIndex = handoff ? findHandoffIndex(messages) : -1;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-bg-secondary">
      {pinnedAnnouncement ? (
        <AnnouncementCard announcement={pinnedAnnouncement} variant="pinned" />
      ) : null}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-6">
          {messages.map((message, index) => (
            <div key={message.id} className="flex flex-col gap-2">
              {index === handoffIndex && handoff ? (
                <HandoffNotice agentName={handoff.agentName} />
              ) : null}
              {message.kind === "announcement" && message.announcement ? (
                <AnnouncementCard
                  announcement={message.announcement}
                  variant="inline"
                />
              ) : (
                <MessageBubble message={message} peer={peer} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
