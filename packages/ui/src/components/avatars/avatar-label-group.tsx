/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/avatar/avatar-label-group.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { type ReactNode } from "react";
import { cn } from "../../lib/cn.js";
import { Avatar, type AvatarProps } from "./avatar.js";

const LABEL_SIZE = {
  sm: { title: "text-sm", subtitle: "text-xs" },
  md: { title: "text-sm", subtitle: "text-sm" },
  lg: { title: "text-md", subtitle: "text-md" },
} as const;

export interface AvatarLabelGroupProps extends AvatarProps {
  size: "sm" | "md" | "lg";
  title: string | ReactNode;
  subtitle: string | ReactNode;
  avatarClassName?: string;
}

export const AvatarLabelGroup = ({
  title,
  subtitle,
  className,
  avatarClassName,
  ...props
}: AvatarLabelGroupProps) => {
  const ls = LABEL_SIZE[props.size as keyof typeof LABEL_SIZE];

  return (
    <figure className={cn("group flex min-w-0 flex-1 items-center gap-2", className)}>
      <Avatar border {...props} {...(avatarClassName != null && { className: avatarClassName })} />
      <figcaption className="min-w-0 flex-1">
        <p className={cn("font-semibold text-fg", ls.title)}>{title}</p>
        <p className={cn("truncate text-fg-tertiary", ls.subtitle)}>{subtitle}</p>
      </figcaption>
    </figure>
  );
};
