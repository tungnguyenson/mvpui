/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { TableOfContents, type TocItem } from "./TableOfContents";

interface DocPageProps {
  title: string;
  description?: string;
  tocItems?: TocItem[];
  children: React.ReactNode;
}

export function DocPage({ title, description, tocItems, children }: DocPageProps) {
  const header = (
    <header className="mb-10 pb-8 border-b border-border">
      <h1 className="text-3xl font-semibold text-fg tracking-tight">{title}</h1>
      {description && (
        <p className="mt-2 text-base text-fg-tertiary">{description}</p>
      )}
    </header>
  );

  const body = (
    <div className="prose-docs flex flex-col gap-8 text-md text-fg-secondary leading-relaxed [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-fg [&_h2]:mb-3 [&_p]:text-fg-secondary [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-fg-secondary [&_code]:rounded [&_code]:bg-bg-tertiary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono [&_code]:text-fg [&_pre]:rounded-xl [&_pre]:bg-bg-tertiary [&_pre]:p-4 [&_pre]:text-sm [&_pre]:font-mono [&_pre]:text-fg [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold [&_strong]:text-fg [&_section]:flex [&_section]:flex-col [&_section]:gap-3">
      {children}
    </div>
  );

  if (tocItems && tocItems.length > 0) {
    return (
      <div className="flex bg-bg">
        <article className="min-w-0 flex-1 max-w-2xl px-10 py-12">
          {header}
          {body}
        </article>
        <TableOfContents items={tocItems} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl px-10 py-12">
      {header}
      {body}
    </div>
  );
}
