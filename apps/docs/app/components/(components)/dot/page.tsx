/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { Dot } from "@mvp-ui/ui";

export default function DotPage() {
  return (
    <div className="space-y-10 p-8">
      <div>
        <h1 className="text-fg text-2xl font-semibold">Dot</h1>
        <p className="text-fg-secondary mt-1 text-sm">
          Minimal SVG circle indicator. Two sizes: <code className="text-fg-brand bg-bg-secondary rounded px-1 py-0.5 text-xs">sm</code> and <code className="text-fg-brand bg-bg-secondary rounded px-1 py-0.5 text-xs">md</code>. Inherits color from <code className="text-fg-brand bg-bg-secondary rounded px-1 py-0.5 text-xs">currentColor</code>.
        </p>
        <pre className="bg-bg-secondary text-fg-secondary mt-3 rounded-lg p-3 text-xs">
          {`import { Dot } from "@mvp-ui/ui";`}
        </pre>
      </div>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Sizes</h2>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Dot size="sm" className="text-fg-brand" />
            <span className="text-fg-tertiary text-xs">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Dot size="md" className="text-fg-brand" />
            <span className="text-fg-tertiary text-xs">md</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Colors</h2>
        <div className="flex items-center gap-4">
          <Dot className="text-success-fg" />
          <Dot className="text-error-fg" />
          <Dot className="text-warning-fg" />
          <Dot className="text-fg-brand" />
          <Dot className="text-fg-secondary" />
        </div>
      </section>
    </div>
  );
}
