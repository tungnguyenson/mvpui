/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { DocPage } from "../../_components/docs/DocPage";

const tocItems = [
  { id: "mechanism", title: "Mechanism" },
  { id: "toggling", title: "Toggling" },
  { id: "safe-raw-classes", title: "Safe raw classes" },
  { id: "adding-dark-values", title: "Adding new dark values" },
];

export default function DarkModePage() {
  return (
    <DocPage title="Dark mode" description="How dark mode works and how to toggle it." tocItems={tocItems}>
      <section>
        <h2 id="mechanism-heading" className="scroll-mt-8">Mechanism</h2>
        <p>
          Dark mode is driven by a <code>data-theme="dark"</code> attribute on the{" "}
          <code>&lt;html&gt;</code> element. All semantic tokens have a paired override rule
          scoped to <code>[data-theme="dark"]</code> in <code>packages/tokens</code>.
        </p>
      </section>

      <section>
        <h2 id="toggling-heading" className="scroll-mt-8">Toggling</h2>
        <pre><code>{`// Enable dark mode
document.documentElement.setAttribute("data-theme", "dark");

// Disable dark mode
document.documentElement.removeAttribute("data-theme");`}</code></pre>
      </section>

      <section>
        <h2 id="safe-raw-classes-heading" className="scroll-mt-8">Safe raw classes</h2>
        <p>
          Some classes are intentionally mode-independent (e.g. a solid destructive fill,
          an alpha focus ring). Mark these with a <code>dark-ok</code> comment on the same line
          to silence the lint check:
        </p>
        <pre><code>{`className="bg-error-600 dark-ok"`}</code></pre>
      </section>

      <section>
        <h2 id="adding-dark-values-heading" className="scroll-mt-8">Adding new dark values</h2>
        <p>
          If no existing semantic token fits your need, add a new flipping token in{" "}
          <code>packages/tokens</code> — both the <code>:root</code> light value and the{" "}
          <code>[data-theme="dark"]</code> override. Never reach for a raw scale to work around a
          missing token.
        </p>
      </section>
    </DocPage>
  );
}
