/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Example } from "./Example";
import { InstallBlock } from "./InstallBlock";
import { TableOfContents, type TocItem } from "./TableOfContents";
import { highlight } from "./highlight";

export interface DocExample {
  /** Anchor id, kebab-case, unique on the page. */
  id: string;
  title: string;
  description?: string;
  /** Rendered, interactive preview. */
  preview: React.ReactNode;
  /** Hand-authored source mirroring `preview`. */
  code: string;
}

export interface TokenRef {
  label: string;
  value: string;
}

interface ComponentDocLayoutProps {
  name: string;
  tagline: React.ReactNode;
  install: { add?: string; usage: string };
  sections: DocExample[];
  tokenReference?: TokenRef[];
}

const DEFAULT_ADD = "pnpm add @mvp-ui/ui @mvp-ui/tokens";

export function ComponentDocLayout({
  name,
  tagline,
  install,
  sections,
  tokenReference,
}: ComponentDocLayoutProps) {
  const addCode = install.add ?? DEFAULT_ADD;
  const usageCode = install.usage;

  const addHtml = highlight(addCode, "bash");
  const usageHtml = highlight(usageCode, "tsx");
  const renderedSections = sections.map((section) => ({
    section,
    codeHtml: highlight(section.code, "tsx"),
  }));

  const tocItems: TocItem[] = [
    { id: "installation", title: "Installation" },
    ...sections.map((s) => ({ id: s.id, title: s.title })),
  ];

  return (
    <div className="flex bg-bg">
      <article className="min-w-0 flex-1 px-8 py-16">
        <div className="mb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-fg-tertiary
              transition-colors hover:text-fg"
          >
            <ArrowLeft size={14} />
            Components
          </Link>
        </div>
        <h1 className="mb-1 text-4xl font-semibold tracking-tight text-fg">
          {name}
        </h1>
        <p className="mb-4 max-w-prose text-md text-fg-tertiary">{tagline}</p>

        <InstallBlock
          addCode={addCode}
          addHtml={addHtml}
          usageCode={usageCode}
          usageHtml={usageHtml}
        />

        {renderedSections.map(({ section, codeHtml }) => (
          <Example
            key={section.id}
            id={section.id}
            title={section.title}
            description={section.description}
            code={section.code}
            codeHtml={codeHtml}
          >
            {section.preview}
          </Example>
        ))}

        {tokenReference && tokenReference.length > 0 && (
          <div className="mt-10 rounded-xl border border-border bg-bg p-6">
            <h2 className="mb-3 text-sm font-semibold text-fg">
              Token reference
            </h2>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-fg-tertiary">
              {tokenReference.map((t) => (
                <div key={t.label} className="flex justify-between gap-4">
                  <dt>{t.label}</dt>
                  <dd className="font-mono text-fg-secondary">{t.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </article>

      <TableOfContents items={tocItems} />
    </div>
  );
}
