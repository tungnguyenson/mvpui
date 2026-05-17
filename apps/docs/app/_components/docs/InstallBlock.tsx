/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/* Installation section: one TOC anchor ("installation"), two separate,
   individually-copyable code panels — a bash install and a tsx import.
   Shiki HTML is pre-rendered on the server (trusted, static). */

function CodePanel({
  label,
  code,
  codeHtml,
}: {
  label: string;
  code: string;
  codeHtml: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between border-b border-border bg-bg-tertiary px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-wide text-fg-tertiary">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy"}
          className="inline-flex size-6 items-center justify-center rounded-md
            text-fg-tertiary transition-colors hover:bg-bg hover:text-fg-secondary
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          {copied ? (
            <Check size={14} className="text-success" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>
      <div
        className="code-panel overflow-x-auto"
        // shiki output from our own static snippets — trusted, no user input
        dangerouslySetInnerHTML={{ __html: codeHtml }}
      />
    </div>
  );
}

export function InstallBlock({
  addCode,
  addHtml,
  usageCode,
  usageHtml,
}: {
  addCode: string;
  addHtml: string;
  usageCode: string;
  usageHtml: string;
}) {
  return (
    <section
      aria-labelledby="installation-heading"
      className="scroll-mt-8 py-10 border-b border-border"
    >
      <h3
        id="installation-heading"
        className="mb-1 text-lg font-semibold text-fg scroll-mt-8"
      >
        Installation
      </h3>
      <p className="mb-4 text-sm text-fg-tertiary">
        Add the package, then import the component.
      </p>
      <div className="flex flex-col gap-3">
        <CodePanel label="Install" code={addCode} codeHtml={addHtml} />
        <CodePanel label="Import" code={usageCode} codeHtml={usageHtml} />
      </div>
    </section>
  );
}
