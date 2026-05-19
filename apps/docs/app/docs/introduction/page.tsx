/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { DocPage } from "../../_components/docs/DocPage";

const tocItems = [
  { id: "what-is-mvp-ui", title: "What is MVP UI?" },
  { id: "whats-included", title: "What's included" },
  { id: "design-source", title: "Design source" },
  { id: "tech-stack", title: "Tech stack" },
];

export default function IntroductionPage() {
  return (
    <DocPage title="Introduction" description="What MVP UI is and how it fits into your stack." tocItems={tocItems}>
      <section>
        <h2 id="what-is-mvp-ui-heading" className="scroll-mt-8">What is MVP UI?</h2>
        <p>
          MVP UI is a personal design system built on the Untitled UI design language. It provides
          a set of React components, design tokens, and AI skill files for building product
          interfaces quickly and consistently.
        </p>
      </section>

      <section>
        <h2 id="whats-included-heading" className="scroll-mt-8">What&apos;s included</h2>
        <ul>
          <li><strong>packages/tokens</strong> — CSS custom properties and TypeScript constants for color, spacing, radius, and typography.</li>
          <li><strong>packages/ui</strong> — React component library. Depends on tokens.</li>
          <li><strong>packages/skill</strong> — AI agent context files for LLM-assisted development.</li>
          <li><strong>apps/docs</strong> — This workbench. Used to develop and demo components.</li>
        </ul>
      </section>

      <section>
        <h2 id="design-source-heading" className="scroll-mt-8">Design source</h2>
        <p>
          Components are adapted from Untitled UI React (MIT) and the Untitled UI Figma PRO library.
          Token mapping and adaptation decisions are documented in{" "}
          <code>packages/tokens/TOKEN_TRANSLATION.md</code>.
        </p>
      </section>

      <section>
        <h2 id="tech-stack-heading" className="scroll-mt-8">Tech stack</h2>
        <ul>
          <li>React 19 + TypeScript 5.6</li>
          <li>Tailwind CSS v4</li>
          <li>Radix Primitives for interactive components</li>
          <li>tsup for library bundling</li>
          <li>Next.js 16 for this docs app</li>
          <li>pnpm 9 workspaces</li>
        </ul>
      </section>
    </DocPage>
  );
}
