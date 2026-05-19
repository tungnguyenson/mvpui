/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { RatingBadge } from "@mvp-ui/ui";

export default function RatingBadgePage() {
  return (
    <div className="space-y-10 p-8">
      <div>
        <h1 className="text-fg text-2xl font-semibold">Rating Badge</h1>
        <p className="text-fg-secondary mt-1 text-sm">
          Award-style rating badge with decorative wreath, star rating, and review count. Light and dark themes.
        </p>
        <pre className="bg-bg-secondary text-fg-secondary mt-3 rounded-lg p-3 text-xs">
          {`import { RatingBadge } from "@mvp-ui/ui";`}
        </pre>
      </div>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Dark theme (default)</h2>
        <div className="border-border bg-bg rounded-2xl border p-8">
          <RatingBadge />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Light theme (on brand background)</h2>
        <div className="rounded-2xl bg-primary p-8">
          <RatingBadge theme="light" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Custom content</h2>
        <div className="border-border bg-bg flex flex-wrap gap-8 rounded-2xl border p-8">
          <RatingBadge rating={4.8} title="Top Rated" subtitle="12,000+ reviews" />
          <RatingBadge rating={3.5} title="Good" subtitle="500 reviews" />
        </div>
      </section>
    </div>
  );
}
