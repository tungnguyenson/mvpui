import { Avatar } from "@mvp-ui/ui";
import { Bot, Users } from "lucide-react";
import { getAvatarFor, getInitials } from "../_shared/assets";
import type { ChatPeer } from "./chat-data";

interface PeerAvatarProps {
  peer: ChatPeer;
  size?: "sm" | "md" | "lg";
}

export function PeerAvatar({ peer, size = "md" }: PeerAvatarProps) {
  if (peer.type === "group") {
    const sizeClass =
      size === "lg" ? "size-12" : size === "sm" ? "size-8" : "size-10";
    const iconClass =
      size === "lg" ? "size-6" : size === "sm" ? "size-4" : "size-5";
    return (
      <div
        className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-bg-secondary text-fg-tertiary`}
        aria-hidden
      >
        <Users className={iconClass} />
      </div>
    );
  }
  return (
    <Avatar
      size={size}
      src={getAvatarFor(peer.name, peer.id)}
      alt={peer.name}
      initials={getInitials(peer.name)}
    />
  );
}

interface BotAvatarProps {
  size?: "sm" | "md" | "lg";
}

export function BotAvatar({ size = "md" }: BotAvatarProps) {
  const sizeClass =
    size === "lg" ? "size-12" : size === "sm" ? "size-8" : "size-10";
  const iconClass =
    size === "lg" ? "size-6" : size === "sm" ? "size-4" : "size-5";
  return (
    <div
      role="img"
      aria-label="Trợ lý ảo"
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-fg text-bg`}
    >
      <Bot className={iconClass} />
    </div>
  );
}

interface AgentAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

export function AgentAvatar({ name, size = "md" }: AgentAvatarProps) {
  return (
    <Avatar
      size={size}
      src={getAvatarFor(name, name)}
      alt={name}
      initials={getInitials(name)}
    />
  );
}
