/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { RatingStars } from "@mvp-ui/ui";

export default function RatingStarsPage() {
  return (
    <div className="space-y-10 p-8">
      <div>
        <h1 className="text-fg text-2xl font-semibold">Rating Stars</h1>
        <p className="text-fg-secondary mt-1 text-sm">
          Partial-fill star rating display. Supports fractional ratings via SVG clip paths.
        </p>
        <pre className="bg-bg-secondary text-fg-secondary mt-3 rounded-lg p-3 text-xs">
          {`import { RatingStars } from "@mvp-ui/ui";`}
        </pre>
      </div>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Ratings</h2>
        <div className="space-y-3">
          {[5, 4.5, 4, 3.5, 3, 2, 1, 0].map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <RatingStars rating={rating} />
              <span className="text-fg-secondary text-sm">{rating}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Sizes</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <RatingStars rating={4.5} starClassName="size-3" />
            <span className="text-fg-tertiary text-xs">size-3</span>
          </div>
          <div className="flex items-center gap-3">
            <RatingStars rating={4.5} starClassName="size-5" />
            <span className="text-fg-tertiary text-xs">size-5 (default)</span>
          </div>
          <div className="flex items-center gap-3">
            <RatingStars rating={4.5} starClassName="size-7" />
            <span className="text-fg-tertiary text-xs">size-7</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Custom star count</h2>
        <RatingStars rating={7} stars={10} />
        <p className="text-fg-tertiary text-xs">rating=7, stars=10</p>
      </section>
    </div>
  );
}
