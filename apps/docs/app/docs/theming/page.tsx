/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { DocPage } from "../../_components/docs/DocPage";

// ─── Palette data (hardcoded hex — source of truth is tokens.css) ────────────

const brandScale = [
  { step: "25", hex: "#fdf4ff" },
  { step: "50", hex: "#f9f5ff" },
  { step: "100", hex: "#f4ebff" },
  { step: "200", hex: "#e9d7fe" },
  { step: "300", hex: "#d6bbfb" },
  { step: "400", hex: "#b692f6" },
  { step: "500", hex: "#9e77ed" },
  { step: "600", hex: "#7f56d9" },
  { step: "700", hex: "#6941c6" },
  { step: "800", hex: "#53389e" },
  { step: "900", hex: "#42307d" },
  { step: "950", hex: "#2c1c5f" },
];

const grayScale = [
  { step: "25", hex: "#fafafa" },
  { step: "50", hex: "#f5f5f5" },
  { step: "100", hex: "#f0f0f0" },
  { step: "200", hex: "#e5e5e5" },
  { step: "300", hex: "#d4d4d4" },
  { step: "400", hex: "#a3a3a3" },
  { step: "500", hex: "#737373" },
  { step: "600", hex: "#525252" },
  { step: "700", hex: "#404040" },
  { step: "800", hex: "#262626" },
  { step: "900", hex: "#171717" },
  { step: "950", hex: "#0a0a0a" },
];

const successScale = [
  { step: "50", hex: "#f0fdf4" },
  { step: "100", hex: "#dcfce7" },
  { step: "200", hex: "#bbf7d0" },
  { step: "300", hex: "#86efac" },
  { step: "400", hex: "#4ade80" },
  { step: "500", hex: "#22c55e" },
  { step: "600", hex: "#16a34a" },
  { step: "700", hex: "#15803d" },
];

const warningScale = [
  { step: "50", hex: "#fffbeb" },
  { step: "100", hex: "#fef3c7" },
  { step: "200", hex: "#fde68a" },
  { step: "300", hex: "#fcd34d" },
  { step: "500", hex: "#f59e0b" },
  { step: "600", hex: "#d97706" },
  { step: "700", hex: "#b45309" },
];

const errorScale = [
  { step: "50", hex: "#fef2f2" },
  { step: "100", hex: "#fee2e2" },
  { step: "200", hex: "#fecaca" },
  { step: "300", hex: "#fca5a5" },
  { step: "500", hex: "#ef4444" },
  { step: "600", hex: "#dc2626" },
  { step: "700", hex: "#b91c1c" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ColorScale({
  name,
  colors,
}: {
  name: string;
  colors: { step: string; hex: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-fg-tertiary uppercase tracking-widest">{name}</span>
      <div className="flex gap-1">
        {colors.map(({ step, hex }) => (
          <div key={step} className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
            <div
              className="w-full h-9 rounded-md ring-1 ring-border-secondary ring-inset"
              style={{ backgroundColor: hex }}
              title={`--${name}-${step}: ${hex}`}
            />
            <span className="text-[10px] leading-none text-fg-tertiary">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SemanticSwatch({
  cssVar,
  label,
  desc,
  ring = true,
}: {
  cssVar: string;
  label: string;
  desc: string;
  ring?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-md shrink-0 ${ring ? "ring-1 ring-border-secondary ring-inset" : ""}`}
        style={{ backgroundColor: `var(${cssVar})` }}
        title={cssVar}
      />
      <div className="flex flex-col min-w-0">
        <code className="text-xs text-fg font-mono">{cssVar}</code>
        <span className="text-xs text-fg-tertiary truncate">{desc}</span>
      </div>
    </div>
  );
}

function StatusChip({
  bg,
  border,
  fg,
  label,
}: {
  bg: string;
  border: string;
  fg: string;
  label: string;
}) {
  return (
    <div
      className="px-3 py-1.5 rounded-md text-sm font-medium border"
      style={{
        backgroundColor: `var(${bg})`,
        borderColor: `var(${border})`,
        color: `var(${fg})`,
      }}
    >
      {label}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const tocItems = [
  { id: "token-system", title: "Token system" },
  { id: "brand-palette", title: "Brand palette" },
  { id: "gray-palette", title: "Gray palette" },
  { id: "state-palettes", title: "State palettes" },
  { id: "semantic-surfaces", title: "Semantic tokens — surfaces" },
  { id: "semantic-text", title: "Semantic tokens — text" },
  { id: "semantic-borders", title: "Semantic tokens — borders" },
  { id: "semantic-action", title: "Semantic tokens — action" },
  { id: "semantic-status", title: "Semantic tokens — status" },
  { id: "forbidden-patterns", title: "Forbidden patterns" },
];

export default function ThemingPage() {
  return (
    <DocPage
      title="Theming"
      description="Design tokens, color palette, and semantic aliases — how appearance is defined and overridden."
      tocItems={tocItems}
    >
      {/* Token system */}
      <section>
        <h2 id="token-system-heading" className="scroll-mt-8">Token system</h2>
        <p>
          All visual decisions are CSS custom properties defined in{" "}
          <code>packages/tokens</code>. Components reference semantic aliases —
          never raw palette values — so swapping a theme only requires
          reassigning root variables.
        </p>
      </section>

      {/* Brand palette */}
      <section>
        <h2 id="brand-palette-heading" className="scroll-mt-8">Brand palette</h2>
        <p>
          Untitled UI purple. <code>brand-600</code> is the default action
          color. Raw scale classes (<code>bg-brand-*</code>) are allowed in
          components only for mode-independent fills annotated with{" "}
          <code>// dark-ok</code>.
        </p>
        <ColorScale name="brand" colors={brandScale} />
      </section>

      {/* Gray palette */}
      <section>
        <h2 id="gray-palette-heading" className="scroll-mt-8">Gray palette</h2>
        <p>
          Warm-tinted neutral (zinc-based). Semantic aliases map to this scale
          and flip between light and dark automatically.
        </p>
        <ColorScale name="gray" colors={grayScale} />
      </section>

      {/* State palettes */}
      <section>
        <h2 id="state-palettes-heading" className="scroll-mt-8">State palettes</h2>
        <div className="flex flex-col gap-4 mt-1">
          <ColorScale name="success" colors={successScale} />
          <ColorScale name="warning" colors={warningScale} />
          <ColorScale name="error" colors={errorScale} />
        </div>
      </section>

      {/* Semantic tokens — surfaces */}
      <section>
        <h2 id="semantic-surfaces-heading" className="scroll-mt-8">Semantic tokens — surfaces</h2>
        <p>
          Use these for <code>bg-*</code>. They flip automatically in dark mode
          — the swatches below reflect the current theme.
        </p>
        <div className="flex flex-col gap-3 mt-1">
          <SemanticSwatch cssVar="--color-bg" label="bg" desc="Page / panel surface" />
          <SemanticSwatch cssVar="--color-bg-secondary" label="bg-secondary" desc="Secondary surface" />
          <SemanticSwatch cssVar="--color-bg-tertiary" label="bg-tertiary" desc="Tertiary / hover surface" />
        </div>
      </section>

      {/* Semantic tokens — text */}
      <section>
        <h2 id="semantic-text-heading" className="scroll-mt-8">Semantic tokens — text</h2>
        <p>
          Use these for <code>text-*</code>. Live samples below show each
          foreground color on the current surface.
        </p>
        <div className="flex flex-col gap-3 mt-1">
          {[
            { cssVar: "--color-fg", desc: "Primary text" },
            { cssVar: "--color-fg-secondary", desc: "Secondary text" },
            { cssVar: "--color-fg-tertiary", desc: "Tertiary / hint text" },
            { cssVar: "--color-fg-brand", desc: "Brand text / icon fill" },
            { cssVar: "--color-fg-error", desc: "Error text / icon fill" },
            { cssVar: "--color-fg-success", desc: "Success text / icon fill" },
          ].map(({ cssVar, desc }) => (
            <div key={cssVar} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-md shrink-0 ring-1 ring-border-secondary ring-inset"
                style={{ backgroundColor: `var(${cssVar})` }}
                title={cssVar}
              />
              <div className="flex flex-col min-w-0">
                <code className="text-xs font-mono" style={{ color: `var(${cssVar})` }}>
                  {cssVar}
                </code>
                <span className="text-xs text-fg-tertiary">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic tokens — borders */}
      <section>
        <h2 id="semantic-borders-heading" className="scroll-mt-8">Semantic tokens — borders</h2>
        <div className="flex flex-col gap-3 mt-1">
          {[
            { cssVar: "--color-border", desc: "Default border" },
            { cssVar: "--color-border-secondary", desc: "Subtle separator" },
            { cssVar: "--color-border-brand", desc: "Brand focus ring" },
            { cssVar: "--color-border-error", desc: "Error state border" },
            { cssVar: "--color-border-success", desc: "Success state border" },
          ].map(({ cssVar, desc }) => (
            <div key={cssVar} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-md shrink-0 bg-bg-tertiary"
                style={{ border: `2px solid var(${cssVar})` }}
                title={cssVar}
              />
              <div className="flex flex-col min-w-0">
                <code className="text-xs font-mono text-fg">{cssVar}</code>
                <span className="text-xs text-fg-tertiary">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic tokens — action */}
      <section>
        <h2 id="semantic-action-heading" className="scroll-mt-8">Semantic tokens — action</h2>
        <p>
          Primary fill colors for interactive elements. Use{" "}
          <code>bg-primary</code>, <code>bg-primary-hover</code>, and{" "}
          <code>text-primary-fg</code> on buttons and focus indicators.
        </p>
        <div className="flex items-center gap-3 mt-1">
          <div
            className="px-4 py-2 rounded-lg text-sm font-semibold shrink-0"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-fg)",
            }}
          >
            Primary
          </div>
          <div
            className="px-4 py-2 rounded-lg text-sm font-semibold shrink-0"
            style={{
              backgroundColor: "var(--color-primary-hover)",
              color: "var(--color-primary-fg)",
            }}
          >
            Hover
          </div>
          <div
            className="px-4 py-2 rounded-lg text-sm font-semibold shrink-0"
            style={{
              backgroundColor: "var(--color-primary-active)",
              color: "var(--color-primary-fg)",
            }}
          >
            Active
          </div>
        </div>
      </section>

      {/* Semantic tokens — status */}
      <section>
        <h2 id="semantic-status-heading" className="scroll-mt-8">Semantic tokens — status</h2>
        <p>
          Subtle surface triads for badges and alerts. Each set — bg, border,
          fg — flips in dark mode (e.g. <code>brand-50</code> →{" "}
          <code>brand-950</code>).
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {[
            {
              bg: "--color-info-bg",
              border: "--color-info-border",
              fg: "--color-info-fg",
              label: "Info",
            },
            {
              bg: "--color-success-bg",
              border: "--color-success-border",
              fg: "--color-success-fg",
              label: "Success",
            },
            {
              bg: "--color-warning-bg",
              border: "--color-warning-border",
              fg: "--color-warning-fg",
              label: "Warning",
            },
            {
              bg: "--color-error-bg",
              border: "--color-error-border",
              fg: "--color-error-fg",
              label: "Error",
            },
            {
              bg: "--color-neutral-bg",
              border: "--color-neutral-border",
              fg: "--color-fg-secondary",
              label: "Neutral",
            },
          ].map(({ bg, border, fg, label }) => (
            <StatusChip key={label} bg={bg} border={border} fg={fg} label={label} />
          ))}
        </div>
      </section>

      {/* Forbidden patterns */}
      <section>
        <h2 id="forbidden-patterns-heading" className="scroll-mt-8">Forbidden patterns</h2>
        <p>
          Never use raw numbered scale values (<code>gray-900</code>,{" "}
          <code>brand-600</code>) on component <code>bg</code>,{" "}
          <code>text</code>, or <code>border</code> utilities. These do not
          flip under <code>[data-theme="dark"]</code>. Use the semantic aliases
          above. The <code>pnpm lint:dark</code> check enforces this at CI.
        </p>
      </section>
    </DocPage>
  );
}
