/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { DocPage } from "../../_components/docs/DocPage";

const tocItems = [
  { id: "what-is-skill", title: "What is packages/skill?" },
  { id: "file-reference", title: "File reference" },
  { id: "usage-with-claude", title: "Usage with Claude" },
  { id: "usage-with-cursor", title: "Usage with Cursor / Copilot" },
  { id: "key-rules", title: "Key rules" },
  { id: "keeping-up-to-date", title: "Keeping skill files up to date" },
];

export default function AgentPage() {
  return (
    <DocPage
      title="Agent context"
      description="How to use packages/skill to give AI agents accurate knowledge of this design system."
      tocItems={tocItems}
    >
      <section>
        <h2 id="what-is-skill-heading" className="scroll-mt-8">What is packages/skill?</h2>
        <p>
          <code>packages/skill</code> is a set of plain Markdown files that describe the MVP UI
          design system for AI coding agents (Claude, Cursor, Copilot, etc.). It is not a build
          target — nothing is compiled or published. The files are read directly by the agent at
          the start of a task.
        </p>
        <p>
          Without this context an agent invents token names, uses raw scale values that break
          dark mode, or guesses at prop shapes. With it, the agent generates code that follows
          the same rules as the rest of the codebase.
        </p>
      </section>

      <section>
        <h2 id="file-reference-heading" className="scroll-mt-8">File reference</h2>
        <ul>
          <li>
            <code>system.md</code> — Monorepo layout, package roles, RSC safety rules, build
            commands, dark-mode activation, Tailwind v4 constraints, and the full tech stack.
            Read this first when starting any task.
          </li>
          <li>
            <code>components.md</code> — Complete component index. One row per component with
            named exports, when to use, and common gotchas (HTML vs React Aria props,
            controlled-state requirements, compound namespace access).
          </li>
          <li>
            <code>tokens.md</code> — Semantic alias reference with the golden rule: always use
            aliases, never raw scale tokens. Includes surface, text, border, status, and focus
            ring groups, plus the four-step workflow for adding new tokens.
          </li>
          <li>
            <code>patterns.md</code> — Recurring patterns: controlled Modal/Drawer, react-hook-form
            integration, the icon prop type, compound component usage, and React Aria vs HTML prop
            differences.
          </li>
          <li>
            <code>responsive.md</code> — Breakpoints, mobile-first rule, common layout patterns,
            per-component mobile behavior, and safe viewport units (<code>dvh</code> vs{" "}
            <code>vh</code>).
          </li>
        </ul>
      </section>

      <section>
        <h2 id="usage-with-claude-heading" className="scroll-mt-8">Usage with Claude</h2>
        <p>Paste the relevant files at the top of a new conversation or use a project context:</p>
        <pre><code>{`# Relevant context for this task
<file path="packages/skill/system.md">
  {contents of system.md}
</file>
<file path="packages/skill/components.md">
  {contents of components.md}
</file>`}</code></pre>
        <p>
          For CLAUDE.md projects, the workspace already loads these via{" "}
          <code>docs/agent/memory/</code> references. No manual paste needed when working inside
          this monorepo.
        </p>
      </section>

      <section>
        <h2 id="usage-with-cursor-heading" className="scroll-mt-8">Usage with Cursor / Copilot</h2>
        <p>
          Add the skill files to <code>.cursorrules</code> or the Copilot context via{" "}
          <code>.github/copilot-instructions.md</code>:
        </p>
        <pre><code>{`# .cursorrules (excerpt)
Read packages/skill/system.md for architecture context.
Read packages/skill/tokens.md before writing any className string.
Read packages/skill/components.md before importing any component.`}</code></pre>
      </section>

      <section>
        <h2 id="key-rules-heading" className="scroll-mt-8">Key rules enforced by the skill files</h2>
        <ul>
          <li>
            <strong>Dark-safe tokens only.</strong> Raw scale tokens (<code>gray-900</code>,{" "}
            <code>brand-600</code>) do not flip under <code>[data-theme="dark"]</code>. Use
            semantic aliases like <code>text-fg</code>, <code>bg-bg</code>,{" "}
            <code>border-border</code>. Enforced by <code>pnpm lint:dark</code>.
          </li>
          <li>
            <strong>Tailwind v4 data variants.</strong> Boolean attributes use{" "}
            <code>data-disabled:</code> not <code>data-[disabled]:</code>. Value attributes keep
            brackets: <code>data-[state=open]:</code>.
          </li>
          <li>
            <strong>Controlled state for Modal and Drawer.</strong> <code>DialogTrigger</code>{" "}
            is incompatible with the HTML-based Button. Use <code>useState</code> and pass{" "}
            <code>isOpen</code> / <code>onOpenChange</code> directly.
          </li>
          <li>
            <strong>RSC compound statics.</strong> Access <code>PinInput.Slot</code>,{" "}
            <code>Carousel.Content</code>, and similar namespace statics only inside a{" "}
            <code>"use client"</code> island — never in a server <code>page.tsx</code>.
          </li>
          <li>
            <strong>Icon prop type.</strong> All icon slots accept{" "}
            <code>{"FC<{ className?: string }> | ReactNode"}</code>. Pass a component reference
            (preferred) or a pre-configured element.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="keeping-up-to-date-heading" className="scroll-mt-8">Keeping skill files up to date</h2>
        <p>
          When you add a component, update <code>components.md</code> with its exports, usage
          guidance, and gotchas. When you add a token, update <code>tokens.md</code>. When you
          change architecture (tsup config, RSC rules, dark-mode strategy), update{" "}
          <code>system.md</code>. Stale skill files produce the same errors as no skill files.
        </p>
      </section>
    </DocPage>
  );
}
