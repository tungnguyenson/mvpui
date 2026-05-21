"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useSyncExternalStore } from "react";

/**
 * Track a CSS media query. SSR-safe: returns `false` on the server and during
 * the first client render, then updates on mount. Use a static string for
 * `query` — changing it across renders re-subscribes each time.
 *
 * @example
 *   const isMobile = useMediaQuery("(max-width: 767px)");
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
