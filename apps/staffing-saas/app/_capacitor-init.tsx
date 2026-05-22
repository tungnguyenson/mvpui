"use client";

import { useEffect } from "react";

export function CapacitorInit() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { Capacitor } = await import("@capacitor/core");
        if (!Capacitor.isNativePlatform()) return;
        const { StatusBar, Style } = await import("@capacitor/status-bar");
        if (cancelled) return;
        await StatusBar.setOverlaysWebView({ overlay: true });
        const isDark =
          document.documentElement.getAttribute("data-theme") === "dark";
        await StatusBar.setStyle({ style: isDark ? Style.Light : Style.Dark });
      } catch {
        // not running under Capacitor or plugin missing — ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
