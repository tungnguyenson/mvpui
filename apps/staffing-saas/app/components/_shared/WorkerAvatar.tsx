import {
  Avatar,
  AvatarProfilePhoto,
  type AvatarProfilePhotoProps,
  type AvatarProps,
  type AvatarState,
} from "@mvp-ui/ui";
import { getAvatarFor, getInitials } from "./assets";

export type WorkerStatusLike =
  | "active"
  | "pending"
  | "locked"
  | "suspended"
  | "verified"
  | "in-review"
  | "missing-docs"
  | "rejected"
  | "normal"
  | "warning"
  | string
  | null
  | undefined;

export function workerAvatarState(status: WorkerStatusLike): AvatarState | null {
  if (status === "active" || status === "verified") return "verified";
  if (status === "locked" || status === "suspended" || status === "rejected") return "blocked";
  return null;
}

export interface WorkerAvatarProps {
  name: string;
  id?: string;
  status?: WorkerStatusLike;
  state?: AvatarState | null;
  size?: AvatarProps["size"];
  className?: string;
}

export function WorkerAvatar({
  name,
  id,
  status,
  state,
  size = "md",
  className,
}: WorkerAvatarProps) {
  const resolvedState = state !== undefined ? state : workerAvatarState(status);
  return (
    <Avatar
      size={size}
      src={getAvatarFor(name, id)}
      alt={name}
      initials={getInitials(name)}
      state={resolvedState}
      {...(className ? { className } : {})}
    />
  );
}

export interface WorkerProfilePhotoProps {
  name: string;
  id?: string;
  status?: WorkerStatusLike;
  state?: AvatarState | null;
  size?: AvatarProfilePhotoProps["size"];
  className?: string;
}

export function WorkerProfilePhoto({
  name,
  id,
  status,
  state,
  size = "sm",
  className,
}: WorkerProfilePhotoProps) {
  const resolvedState = state !== undefined ? state : workerAvatarState(status);
  return (
    <AvatarProfilePhoto
      size={size}
      src={getAvatarFor(name, id)}
      alt={name}
      initials={getInitials(name)}
      state={resolvedState}
      {...(className ? { className } : {})}
    />
  );
}
