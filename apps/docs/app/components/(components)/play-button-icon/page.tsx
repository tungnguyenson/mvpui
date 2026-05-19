/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState } from "react";
import { PlayButtonIcon } from "@mvp-ui/ui";

export default function PlayButtonIconPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-10 p-8">
      <div>
        <h1 className="text-fg text-2xl font-semibold">Play Button Icon</h1>
        <p className="text-fg-secondary mt-1 text-sm">
          Frosted-glass play/pause button for video or audio thumbnails. Toggles between play and pause via{" "}
          <code className="text-fg-brand bg-bg-secondary rounded px-1 py-0.5 text-xs">isPlaying</code>.
        </p>
        <pre className="bg-bg-secondary text-fg-secondary mt-3 rounded-lg p-3 text-xs">
          {`import { PlayButtonIcon } from "@mvp-ui/ui";`}
        </pre>
      </div>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Interactive</h2>
        <div
          className="group relative flex h-48 w-80 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-900"
          onClick={() => setIsPlaying((p) => !p)}
        >
          <PlayButtonIcon isPlaying={isPlaying} />
        </div>
        <p className="text-fg-tertiary text-xs">Click to toggle play/pause</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">States</h2>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-32 w-48 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800">
              <PlayButtonIcon isPlaying={false} />
            </div>
            <span className="text-fg-tertiary text-xs">Play</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-32 w-48 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800">
              <PlayButtonIcon isPlaying={true} />
            </div>
            <span className="text-fg-tertiary text-xs">Pause</span>
          </div>
        </div>
      </section>
    </div>
  );
}
