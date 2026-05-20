/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduino/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/avatar/avatar-profile-photo.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { type FC, type ReactNode, useState } from "react";
import { cn } from "../../lib/cn.js";
import { type AvatarState, BlockedXIcon, OnlineIndicator, VerifiedTickIcon } from "./avatar.js";

const PROFILE_DATA = {
  sm: {
    root: "size-[72px] p-[3px]",
    placeholderPad: "p-1",
    contentBase: "outline-[0.5px] -outline-offset-[0.5px] before:border",
    icon: "size-9",
    initials: "text-2xl font-semibold",
    badgePos: "bottom-0.5 right-0.5",
    tick: "size-6",
    indicator: "size-4",
  },
  md: {
    root: "size-24 p-1",
    placeholderPad: "p-[5px]",
    contentBase: "shadow-xl outline-[0.75px] -outline-offset-[0.75px] before:border-[1.5px]",
    icon: "size-12",
    initials: "text-4xl font-semibold",
    badgePos: "bottom-1 right-1",
    tick: "size-9",
    indicator: "size-6",
  },
  lg: {
    root: "size-40 p-1.5",
    placeholderPad: "p-[7px]",
    contentBase: "shadow-2xl outline-[0.75px] -outline-offset-[0.75px] before:border-[1.5px]",
    icon: "size-20",
    initials: "text-6xl font-semibold",
    badgePos: "bottom-2 right-2",
    tick: "size-14",
    indicator: "size-8",
  },
} as const;

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0"
      />
    </svg>
  );
}

export interface AvatarProfilePhotoProps {
  size?: "sm" | "md" | "lg";
  src?: string | null | undefined;
  alt?: string;
  initials?: string;
  placeholderIcon?: FC<{ className?: string }>;
  placeholder?: ReactNode;
  state?: AvatarState | null;
  badge?: ReactNode;
  status?: "online" | "offline";
  className?: string;
}

export const AvatarProfilePhoto = ({
  size = "md",
  src,
  alt,
  initials,
  placeholder,
  placeholderIcon: PlaceholderIcon,
  state,
  badge,
  status,
  className,
}: AvatarProfilePhotoProps) => {
  const [failed, setFailed] = useState(false);
  const p = PROFILE_DATA[size];
  const showImage = !!src && !failed;

  const content = (() => {
    if (showImage) {
      return (
        <div
          className={cn(
            "relative size-full overflow-hidden rounded-full outline-black/16 before:absolute before:inset-0 before:rounded-full before:border-white/32 before:mask-[linear-gradient(to_bottom,black_0%,transparent_25%,transparent_75%,black_100%)]", /* dark-ok — glass rim on photo */
            p.contentBase,
          )}
        >
          <img src={src} alt={alt} onError={() => setFailed(true)} className="size-full object-cover" />
        </div>
      );
    }
    if (initials) {
      return (
        <div className={cn("flex size-full items-center justify-center rounded-full bg-bg-tertiary ring-1 ring-border", p.contentBase)}>
          <span className={cn("text-fg-tertiary", p.initials)}>{initials}</span>
        </div>
      );
    }
    if (PlaceholderIcon) {
      return (
        <div className={cn("flex size-full items-center justify-center rounded-full bg-bg-tertiary ring-1 ring-border", p.contentBase)}>
          <PlaceholderIcon className={cn("text-fg-tertiary", p.icon)} />
        </div>
      );
    }
    return (
      <div className={cn("flex size-full items-center justify-center rounded-full bg-bg-tertiary ring-1 ring-border", p.contentBase)}>
        {placeholder ?? <UserIcon className={cn("text-fg-tertiary", p.icon)} />}
      </div>
    );
  })();

  const decoration = (() => {
    if (status) {
      return (
        <OnlineIndicator
          size="2xl"
          status={status}
          className={cn(p.indicator, p.badgePos)}
        />
      );
    }
    if (state === "verified") {
      return <VerifiedTickIcon size="2xl" className={cn("absolute", p.tick, p.badgePos)} />;
    }
    if (state === "blocked") {
      return <BlockedXIcon size="2xl" className={cn("absolute", p.tick, p.badgePos)} />;
    }
    return badge ?? null;
  })();

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full bg-bg ring-1 ring-border",
        p.root,
        !showImage && p.placeholderPad,
        className,
      )}
    >
      {content}
      {decoration}
    </div>
  );
};
