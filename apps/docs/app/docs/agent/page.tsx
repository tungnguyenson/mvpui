/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { DocPage } from "../../_components/docs/DocPage";

const tocItems = [
  { id: "what-is-skill", title: "What is packages/skill?" },
  { id: "file-index", title: "File index" },
  { id: "claude-code", title: "Claude Code" },
  { id: "cursor", title: "Cursor" },
  { id: "windsurf", title: "Windsurf" },
  { id: "github-copilot", title: "GitHub Copilot" },
  { id: "keeping-current", title: "Keeping skill files current" },
];

export default function AgentPage() {
  return (
    <DocPage
      title="Agent context"
      description="How packages/skill is auto-loaded by AI coding frameworks."
      tocItems={tocItems}
    >
      <section>
        <h2 id="what-is-skill-heading" className="scroll-mt-8">What is packages/skill?</h2>
        <p>
          <code>packages/skill</code> is machine-readable context for AI coding agents. It
          describes design tokens, component APIs, patterns, and constraints so agents generate
          code that fits this codebase — not generic Tailwind output.
        </p>
        <p>
          These files are not pasted manually. Each framework has its own auto-load mechanism
          (see below). Once wired, agents pick up the context automatically on every task.
        </p>
      </section>

      <section>
        <h2 id="file-index-heading" className="scroll-mt-8">File index</h2>
        <ul>
          <li><code>system.md</code> — Monorepo layout, RSC safety, build commands, dark-mode rules, Tailwind v4 constraints.</li>
          <li><code>components.md</code> — Every component: named exports, when to use, gotchas.</li>
          <li><code>tokens.md</code> — Semantic alias groups. Never raw scale tokens.</li>
          <li><code>patterns.md</code> — Modal/Drawer controlled state, react-hook-form, icon prop, compound components.</li>
          <li><code>responsive.md</code> — Breakpoints, mobile-first, per-component mobile behavior, <code>dvh</code> vs <code>vh</code>.</li>
        </ul>
      </section>

      <section>
        <h2 id="claude-code-heading" className="scroll-mt-8">Claude Code (CLAUDE.md)</h2>
        <p>
          Claude Code reads <code>CLAUDE.md</code> at session start. This repo&apos;s{" "}
          <code>CLAUDE.md</code> already references the skill files — no setup needed when
          working inside the monorepo.
        </p>
        <p>
          In consumer projects, create a <code>CLAUDE.md</code> at the repo root and reference
          the installed skill files:
        </p>
        <pre><code>{`## Design system
Read node_modules/@mvp-ui/skill/system.md before any component work.
Read node_modules/@mvp-ui/skill/tokens.md before writing className strings.
Read node_modules/@mvp-ui/skill/components.md before importing components.`}</code></pre>
      </section>

      <section>
        <h2 id="cursor-heading" className="scroll-mt-8">Cursor</h2>
        <p>
          Cursor auto-loads rules from <code>.cursor/rules/</code>. Create one rule file per
          skill file so Cursor can attach them selectively by glob:
        </p>
        <pre><code>{`# .cursor/rules/mvp-ui-tokens.mdc
---
globs: ["**/*.tsx", "**/*.ts"]
---
{contents of packages/skill/tokens.md}`}</code></pre>
        <p>
          Or reference the file path directly if using Cursor&apos;s{" "}
          <code>@file</code> mention in chat — Cursor reads the file on demand.
        </p>
      </section>

      <section>
        <h2 id="windsurf-heading" className="scroll-mt-8">Windsurf</h2>
        <p>
          Windsurf reads <code>.windsurfrules</code> at the repo root. Concatenate the relevant
          skill files or symlink them:
        </p>
        <pre><code>{`# .windsurfrules
{contents of packages/skill/system.md}
{contents of packages/skill/tokens.md}`}</code></pre>
      </section>

      <section>
        <h2 id="github-copilot-heading" className="scroll-mt-8">GitHub Copilot</h2>
        <p>
          Copilot reads <code>.github/copilot-instructions.md</code>. Paste the skill content
          or keep a short pointer to the most critical rules:
        </p>
        <pre><code>{`# Component library
Import all components from @mvp-ui/ui.
Use semantic token aliases only (bg-bg, text-fg, border-border).
Never use raw scale tokens (gray-900, brand-600) — they break dark mode.
See packages/skill/ for full reference.`}</code></pre>
      </section>

      <section>
        <h2 id="keeping-current-heading" className="scroll-mt-8">Keeping skill files current</h2>
        <p>
          Stale skill files produce the same errors as no skill files. Update on every
          meaningful change:
        </p>
        <ul>
          <li>New component → add row to <code>components.md</code></li>
          <li>New token → add to <code>tokens.md</code></li>
          <li>Architecture change → update <code>system.md</code></li>
          <li>New pattern → add to <code>patterns.md</code></li>
        </ul>
      </section>
    </DocPage>
  );
}
