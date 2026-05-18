/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState } from "react";
import { Check, Code2, Copy, Eye, Moon, Sun } from "lucide-react";

interface ExampleProps {
  /** Anchor id — must match the TableOfContents entry. */
  id: string;
  title: string;
  description?: string | undefined;
  /**
   * Rendered, interactive component(s) for the Preview tab. Omit for a
   * code-only block (no preview/dark toggle — used for Installation).
   */
  children?: React.ReactNode;
  /** Raw source for the clipboard. */
  code: string;
  /** Pre-highlighted shiki HTML (dual-theme, server-rendered). */
  codeHtml: string;
}

type Tab = "preview" | "code";

function SegmentedTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium
        transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)]
        ${
          active
            ? "bg-bg text-fg shadow-xs"
            : "text-fg-tertiary hover:text-fg-secondary"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

function IconToggle({
  onClick,
  pressed,
  label,
  children,
}: {
  onClick: () => void;
  pressed?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      className="inline-flex size-7 items-center justify-center rounded-md
        text-fg-tertiary transition-colors duration-150
        hover:bg-bg-tertiary hover:text-fg-secondary
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      {children}
    </button>
  );
}

export function Example({
  id,
  title,
  description,
  children,
  code,
  codeHtml,
}: ExampleProps) {
  const hasPreview = Boolean(children);
  const [tab, setTab] = useState<Tab>(hasPreview ? "preview" : "code");
  const [dark, setDark] = useState(false);
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
    <section
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-8 py-10 border-b border-border last:border-0"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3
            id={`${id}-heading`}
            className="text-lg font-semibold text-fg scroll-mt-8"
          >
            {title}
          </h3>
          {description && (
            <p className="mt-1 max-w-prose text-sm text-fg-tertiary">
              {description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {hasPreview && (
            <IconToggle
              onClick={() => setDark((d) => !d)}
              pressed={dark}
              label={
                dark ? "Switch preview to light" : "Switch preview to dark"
              }
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </IconToggle>
          )}
          <IconToggle onClick={copy} label={copied ? "Copied" : "Copy code"}>
            {copied ? (
              <Check size={15} className="text-success" />
            ) : (
              <Copy size={15} />
            )}
          </IconToggle>
          {hasPreview && (
            <div
              role="tablist"
              aria-label={`${title} view`}
              className="ml-1 inline-flex items-center gap-0.5 rounded-lg
                border border-border bg-bg-tertiary p-0.5"
            >
              <SegmentedTab
                active={tab === "preview"}
                onClick={() => setTab("preview")}
                icon={<Eye size={13} />}
                label="Preview"
              />
              <SegmentedTab
                active={tab === "code"}
                onClick={() => setTab("code")}
                icon={<Code2 size={13} />}
                label="Code"
              />
            </div>
          )}
        </div>
      </div>

      {hasPreview && tab === "preview" ? (
        <div
          data-theme={dark ? "dark" : undefined}
          className="flex min-h-64 items-center justify-center rounded-xl
            border border-border bg-bg p-10 transition-colors duration-200"
        >
          <div className="flex w-full flex-wrap items-center justify-center gap-4">
            {children}
          </div>
        </div>
      ) : (
        <div
          data-theme={hasPreview && dark ? "dark" : undefined}
          className="code-panel overflow-x-auto rounded-xl border border-border
            text-sm"
          // shiki output from our own static snippets — trusted, no user input
          dangerouslySetInnerHTML={{ __html: codeHtml }}
        />
      )}
    </section>
  );
}
