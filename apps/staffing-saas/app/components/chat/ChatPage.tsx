"use client";

import { useState } from "react";
import { SetPageBreadcrumb } from "../_shell/BreadcrumbContext";
import { APP_ROUTES } from "../_shell/nav";
import {
  CHAT_CONVERSATIONS,
  CHAT_HANDOFF,
  CHAT_MESSAGES,
  CHAT_PINNED_ANNOUNCEMENTS,
} from "./chat-data";
import { Composer } from "./Composer";
import { ConversationList } from "./ConversationList";
import { EmptyThread } from "./EmptyThread";
import { ThreadHeader } from "./ThreadHeader";
import { ThreadMessages } from "./ThreadMessages";

export function ChatPage() {
  const [activeId, setActiveId] = useState<string | null>(
    CHAT_CONVERSATIONS[0]?.id ?? null,
  );

  const active = CHAT_CONVERSATIONS.find((c) => c.id === activeId) ?? null;
  const messages = activeId ? (CHAT_MESSAGES[activeId] ?? []) : [];
  const handoff = activeId ? CHAT_HANDOFF[activeId] : undefined;
  const pinnedAnnouncement = activeId
    ? CHAT_PINNED_ANNOUNCEMENTS[activeId]
    : undefined;

  return (
    <>
      <SetPageBreadcrumb
        items={[
          { label: "Dashboard", href: APP_ROUTES.dashboard },
          { label: "Tin nhắn" },
        ]}
      />
      <div className="flex h-[calc(100svh-7rem)] min-h-0 bg-bg md:h-[calc(100svh-4rem)]">
        <aside className="hidden w-[360px] shrink-0 border-r border-border-secondary md:flex md:flex-col">
          <ConversationList
            conversations={CHAT_CONVERSATIONS}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          {active ? (
            <>
              <ThreadHeader peer={active.peer} channel={active.channel} />
              <ThreadMessages
                messages={messages}
                peer={active.peer}
                {...(handoff ? { handoff } : {})}
                {...(pinnedAnnouncement ? { pinnedAnnouncement } : {})}
              />
              <Composer />
            </>
          ) : (
            <EmptyThread />
          )}
        </section>
      </div>
    </>
  );
}
