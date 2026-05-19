/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState } from "react";
import { Maximize2, Moon, Sun } from "lucide-react";
import { ButtonUtility } from "@mvp-ui/ui";
import { SettingsApp } from "./_app";

export default function SettingsExamplePage() {
  const [dark, setDark] = useState(false);

  return (
    <div className="px-8 py-10">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-fg tracking-tight">
          Settings pages
        </h1>
        <p className="mt-2 max-w-2xl text-base text-fg-secondary">
          Powerful and customizable React settings page examples built for
          modern products and web apps. These settings pages are built using
          React Aria and styled with Tailwind CSS.
        </p>
      </header>

      {/* Preview bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-semibold text-fg">
          Settings page example
        </span>
        <div className="flex items-center gap-1">
          <ButtonUtility
            size="xs"
            color="tertiary"
            icon={dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDark((d) => !d)}
          />
          <ButtonUtility
            size="xs"
            color="tertiary"
            icon={<Maximize2 className="size-4" />}
            aria-label="Open in new tab"
            onClick={() => window.open("/standalone/settings-01", "_blank")}
          />
        </div>
      </div>

      {/* Settings app preview */}
      <div
        data-theme={dark ? "dark" : undefined}
        className="overflow-hidden bg-bg rounded-2xl border border-border shadow-lg"
      >
        <SettingsApp />
      </div>
    </div>
  );
}
