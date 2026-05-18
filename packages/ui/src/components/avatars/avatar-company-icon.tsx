/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/avatar/base-components/avatar-company-icon.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cn } from "../../lib/cn.js";
import type { AvatarSize } from "./avatar.js";

const SIZES: Record<AvatarSize, string> = {
  xs:    "size-3   rounded-[3px]",
  sm:    "size-4   rounded-[4px]",
  md:    "size-4.5 rounded-[4px]",
  lg:    "size-5   rounded-[5px]",
  xl:    "size-6   rounded-md",
  "2xl": "size-7   rounded-md",
};

export interface AvatarCompanyIconProps {
  src: string;
  alt: string;
  size?: AvatarSize;
  className?: string;
}

export const AvatarCompanyIcon = ({
  src,
  alt,
  size = "md",
  className,
}: AvatarCompanyIconProps) => (
  <img
    src={src}
    alt={alt}
    className={cn(
      "absolute -right-0.5 -bottom-0.5 object-cover ring-[1.5px] ring-bg",
      SIZES[size],
      className,
    )}
  />
);
