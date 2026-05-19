/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { UntitledLogo, UntitledLogoMinimal } from "@mvp-ui/ui";

export default function LogoPage() {
  return (
    <div className="space-y-10 p-8">
      <div>
        <h1 className="text-fg text-2xl font-semibold">Logo</h1>
        <p className="text-fg-secondary mt-1 text-sm">
          Untitled UI brand logo components. The minimal mark and the full wordmark lockup.
        </p>
        <pre className="bg-bg-secondary text-fg-secondary mt-3 rounded-lg p-3 text-xs">
          {`import { UntitledLogo, UntitledLogoMinimal } from "@mvp-ui/ui";`}
        </pre>
      </div>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Full logo</h2>
        <div className="border-border bg-bg rounded-2xl border p-8">
          <UntitledLogo />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Minimal mark</h2>
        <div className="border-border bg-bg rounded-2xl border p-8">
          <UntitledLogoMinimal />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-fg text-base font-medium">Sizes</h2>
        <div className="border-border bg-bg flex flex-wrap items-end gap-6 rounded-2xl border p-8">
          <UntitledLogo className="h-6" />
          <UntitledLogo className="h-8" />
          <UntitledLogo className="h-12" />
        </div>
      </section>
    </div>
  );
}
