/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { DocPage } from "../../_components/docs/DocPage";

const tocItems = [
  { id: "type-scale", title: "Type scale" },
  { id: "font-family", title: "Font family" },
  { id: "weight-conventions", title: "Weight conventions" },
  { id: "color", title: "Color" },
  { id: "line-height", title: "Line height" },
  { id: "combinations", title: "Combinations" },
];

const typeScale = [
  { token: "--text-5xl", tw: "text-5xl", px: "48px", lh: "—", use: "Display hero" },
  { token: "--text-4xl", tw: "text-4xl", px: "36px", lh: "—", use: "Display heading" },
  { token: "--text-3xl", tw: "text-3xl", px: "30px", lh: "—", use: "Page heading" },
  { token: "--text-2xl", tw: "text-2xl", px: "24px", lh: "—", use: "Subheading" },
  { token: "--text-xl", tw: "text-xl", px: "20px", lh: "1.875rem", use: "Card heading" },
  { token: "--text-lg", tw: "text-lg", px: "18px", lh: "1.75rem", use: "Section lead" },
  { token: "--text-md", tw: "text-md", px: "16px", lh: "1.5rem", use: "Default prose" },
  { token: "--text-sm", tw: "text-sm", px: "14px", lh: "1.25rem", use: "UI labels, form fields" },
  { token: "--text-xs", tw: "text-xs", px: "12px", lh: "1.125rem", use: "Badges, captions" },
];

const weights = [
  { token: "--fw-regular", tw: "font-normal", value: "400", label: "Regular", use: "Body text, descriptions" },
  { token: "--fw-medium", tw: "font-medium", value: "500", label: "Medium", use: "UI labels, badge text" },
  { token: "--fw-semibold", tw: "font-semibold", value: "600", label: "Semibold", use: "Nav, buttons, headings" },
  { token: "--fw-bold", tw: "font-bold", value: "700", label: "Bold", use: "Strong emphasis" },
];

const fgTokens = [
  { token: "text-fg", label: "Primary", use: "Main content", example: "The quick brown fox jumps over the lazy dog." },
  { token: "text-fg-secondary", label: "Secondary", use: "Supporting text", example: "The quick brown fox jumps over the lazy dog." },
  { token: "text-fg-tertiary", label: "Tertiary", use: "Placeholders, captions, labels", example: "The quick brown fox jumps over the lazy dog." },
  { token: "text-fg-quaternary", label: "Quaternary", use: "Disabled-adjacent hints", example: "The quick brown fox jumps over the lazy dog." },
  { token: "text-fg-brand", label: "Brand", use: "Brand-colored text, active icons", example: "The quick brown fox jumps over the lazy dog." },
  { token: "text-fg-error", label: "Error", use: "Validation errors, destructive copy", example: "The quick brown fox jumps over the lazy dog." },
  { token: "text-fg-success", label: "Success", use: "Confirmation messages", example: "The quick brown fox jumps over the lazy dog." },
];

const leadings = [
  { token: "--leading-xs", value: "1.125rem / 18px", pair: "--text-xs" },
  { token: "--leading-sm", value: "1.25rem / 20px", pair: "--text-sm" },
  { token: "--leading-md", value: "1.5rem / 24px", pair: "--text-md" },
  { token: "--leading-lg", value: "1.75rem / 28px", pair: "--text-lg" },
  { token: "--leading-xl", value: "1.875rem / 30px", pair: "--text-xl" },
];

function TokenPill({ children }: { children: React.ReactNode }) {
  return (
    <code className="inline-block rounded bg-bg-tertiary px-1.5 py-0.5 text-xs font-mono text-fg-secondary border border-border">
      {children}
    </code>
  );
}

function ScaleRow({ token, tw, px, use }: { token: string; tw: string; px: string; use: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 items-start py-4 border-b border-border last:border-0">
      <div>
        <div className={`${tw} font-medium text-fg leading-snug`}>
          The quick brown fox
        </div>
        <div className="mt-1.5 flex flex-wrap gap-2 items-center">
          <TokenPill>{token}</TokenPill>
          <span className="text-xs text-fg-tertiary">{px}</span>
          <span className="text-xs text-fg-quaternary">·</span>
          <span className="text-xs text-fg-tertiary">{use}</span>
        </div>
      </div>
      <TokenPill>{tw}</TokenPill>
    </div>
  );
}

export default function TypographyPage() {
  return (
    <DocPage
      title="Typography"
      description="Token-driven font stack, type scale, weights, and color — every value pulled from design tokens."
      tocItems={tocItems}
    >
      {/* TYPE SCALE */}
      <section>
        <h2 id="type-scale" className="scroll-mt-20">Type scale</h2>
        <p>
          Nine steps from <TokenPill>--text-xs</TokenPill> (12 px) to{" "}
          <TokenPill>--text-5xl</TokenPill> (48 px). Each step maps a CSS custom
          property to a Tailwind utility of the same name.
        </p>
        <div className="rounded-xl border border-border bg-bg divide-y divide-border not-prose mt-4">
          {typeScale.map((s) => (
            <ScaleRow key={s.token} {...s} />
          ))}
        </div>
      </section>

      {/* FONT FAMILY */}
      <section>
        <h2 id="font-family" className="scroll-mt-20">Font family</h2>
        <p>
          Two families defined as tokens. Never hardcode font stack strings in
          component code — reference the token.
        </p>
        <div className="mt-4 grid gap-3 not-prose">
          {/* Sans */}
          <div className="rounded-xl border border-border bg-bg p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <TokenPill>--font-sans</TokenPill>
              <TokenPill>font-sans</TokenPill>
            </div>
            <p className="font-sans text-2xl font-semibold text-fg">
              Inter — the UI workhorse
            </p>
            <p className="font-sans text-sm text-fg-tertiary">
              Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto …
            </p>
          </div>
          {/* Mono */}
          <div className="rounded-xl border border-border bg-bg p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <TokenPill>--font-mono</TokenPill>
              <TokenPill>font-mono</TokenPill>
            </div>
            <p className="font-mono text-2xl font-semibold text-fg">
              JetBrains Mono — for code
            </p>
            <p className="font-mono text-sm text-fg-tertiary">
              "JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas …
            </p>
          </div>
        </div>
      </section>

      {/* WEIGHT CONVENTIONS */}
      <section>
        <h2 id="weight-conventions" className="scroll-mt-20">Weight conventions</h2>
        <p>
          Four weights — <TokenPill>--fw-regular</TokenPill> through{" "}
          <TokenPill>--fw-bold</TokenPill>. Match weight to hierarchy, not
          decoration.
        </p>
        <div className="mt-4 rounded-xl border border-border bg-bg divide-y divide-border not-prose">
          {weights.map((w) => (
            <div key={w.token} className="grid grid-cols-[1fr_auto] gap-4 items-center px-5 py-4">
              <div className="flex flex-col gap-1">
                <div className={`text-xl ${w.tw} text-fg`}>{w.label} · {w.value}</div>
                <div className="text-xs text-fg-tertiary">{w.use}</div>
              </div>
              <div className="flex gap-2">
                <TokenPill>{w.token}</TokenPill>
                <TokenPill>{w.tw}</TokenPill>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COLOR */}
      <section>
        <h2 id="color" className="scroll-mt-20">Color</h2>
        <p>
          Always use semantic foreground tokens. Raw scale values (
          <TokenPill>gray-900</TokenPill>, <TokenPill>brand-600</TokenPill>) do
          not flip in dark mode — semantic aliases do.
        </p>
        <div className="mt-4 rounded-xl border border-border bg-bg divide-y divide-border not-prose">
          {fgTokens.map((t) => (
            <div key={t.token} className="px-5 py-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <TokenPill>{t.token}</TokenPill>
                <span className="text-xs text-fg-quaternary">·</span>
                <span className="text-xs text-fg-tertiary font-medium">{t.label}</span>
                <span className="text-xs text-fg-quaternary">·</span>
                <span className="text-xs text-fg-tertiary">{t.use}</span>
              </div>
              <div className={`text-sm ${t.token}`}>{t.example}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LINE HEIGHT */}
      <section>
        <h2 id="line-height" className="scroll-mt-20">Line height</h2>
        <p>
          Leading tokens pair with size tokens of the same step. Use the matched
          pair — mixing sizes and leadings from different steps breaks vertical
          rhythm.
        </p>
        <div className="mt-4 rounded-xl border border-border bg-bg divide-y divide-border not-prose">
          {leadings.map((l) => (
            <div key={l.token} className="px-5 py-4 grid grid-cols-[1fr_auto] gap-4 items-center">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 flex-wrap">
                  <TokenPill>{l.token}</TokenPill>
                  <span className="text-xs text-fg-tertiary self-center">{l.value}</span>
                </div>
                <p className="text-xs text-fg-quaternary">Paired with {l.pair}</p>
              </div>
              <div
                className="w-8 border-r border-border-brand relative flex flex-col justify-between"
                style={{ height: l.value.split(" ")[0] }}
                aria-hidden
              >
                <span className="absolute -right-px top-0 w-2 h-px bg-fg-brand" />
                <span className="absolute -right-px bottom-0 w-2 h-px bg-fg-brand" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMBINATIONS */}
      <section>
        <h2 id="combinations" className="scroll-mt-20">Combinations</h2>
        <p>
          Common size + weight + color pairings used across the system. Copy the
          class string directly — no raw values needed.
        </p>
        <div className="mt-4 rounded-xl border border-border bg-bg divide-y divide-border not-prose">
          {[
            {
              label: "Page heading",
              classes: "text-3xl font-semibold text-fg",
              desc: "Top of every doc or settings page",
            },
            {
              label: "Section heading",
              classes: "text-xl font-semibold text-fg",
              desc: "h2 inside prose content",
            },
            {
              label: "Card heading",
              classes: "text-lg font-semibold text-fg",
              desc: "Card titles, panel headers",
            },
            {
              label: "Body",
              classes: "text-md font-normal text-fg-secondary",
              desc: "Default prose, descriptions",
            },
            {
              label: "UI label",
              classes: "text-sm font-medium text-fg",
              desc: "Form labels, nav items, table headers",
            },
            {
              label: "Caption / helper",
              classes: "text-xs font-normal text-fg-tertiary",
              desc: "Input hints, timestamps, metadata",
            },
            {
              label: "Badge text",
              classes: "text-xs font-medium text-fg-brand",
              desc: "Status chips, tag labels",
            },
          ].map((c) => (
            <div key={c.label} className="px-5 py-4 flex flex-col gap-1.5">
              <div className={c.classes}>{c.label}</div>
              <div className="flex gap-2 flex-wrap items-center">
                <TokenPill>{c.classes}</TokenPill>
                <span className="text-xs text-fg-quaternary">·</span>
                <span className="text-xs text-fg-tertiary">{c.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DocPage>
  );
}
