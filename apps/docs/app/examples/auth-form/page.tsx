/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState } from "react";
import { Maximize2, Moon, Sun } from "lucide-react";
import { ButtonUtility } from "@mvp-ui/ui";
import { AuthFormApp } from "./_app";

export default function AuthFormExamplePage() {
  const [dark, setDark] = useState(false);

  return (
    <div className="px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-fg tracking-tight">
          Auth forms
        </h1>
        <p className="mt-2 max-w-2xl text-base text-fg-secondary">
          Production-ready authentication form examples built with React Aria
          and styled with Tailwind CSS.
        </p>
      </header>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-semibold text-fg">Auth form example</span>
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
            onClick={() => window.open("/standalone/auth-form", "_blank")}
          />
        </div>
      </div>

      <div
        data-theme={dark ? "dark" : undefined}
        className="overflow-hidden bg-bg rounded-2xl border border-border shadow-lg h-160"
      >
        <AuthFormApp />
      </div>
    </div>
  );
}
