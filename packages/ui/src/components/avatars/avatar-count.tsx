/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/avatar/base-components/avatar-count.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

export interface AvatarCountProps {
  count: number;
}

export const AvatarCount = ({ count }: AvatarCountProps) => (
  <div className="absolute right-0 bottom-0 p-px">
    <div className="flex size-3.5 items-center justify-center rounded-full bg-error-600 text-center text-[10px] leading-none font-bold text-white"> {/* dark-ok — solid notification count badge */}
      {count > 9 ? "9+" : count}
    </div>
  </div>
);
