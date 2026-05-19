/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { DocPage } from "../../_components/docs/DocPage";

const tocItems = [
  { id: "breakpoints", title: "Breakpoints" },
  { id: "mobile-first", title: "Mobile-first approach" },
  { id: "layout-pattern", title: "App layout pattern" },
  { id: "nav-drawer", title: "Mobile nav drawer" },
  { id: "grid", title: "Responsive grid" },
  { id: "typography", title: "Responsive typography" },
  { id: "testing", title: "Testing breakpoints" },
];

const breakpoints = [
  { name: "sm", px: "640px", prefix: "sm:", use: "Large phones, small tablets" },
  { name: "md", px: "768px", prefix: "md:", use: "Tablets — primary mobile/desktop split" },
  { name: "lg", px: "1024px", prefix: "lg:", use: "Small desktops, landscape tablets" },
  { name: "xl", px: "1280px", prefix: "xl:", use: "Standard desktop" },
  { name: "2xl", px: "1536px", prefix: "2xl:", use: "Wide desktop, data-dense layouts" },
];

function TokenPill({ children }: { children: React.ReactNode }) {
  return (
    <code className="inline-block rounded bg-bg-tertiary px-1.5 py-0.5 text-xs font-mono text-fg-secondary border border-border">
      {children}
    </code>
  );
}

export default function ResponsivePage() {
  return (
    <DocPage
      title="Responsive"
      description="Mobile-first layout patterns, breakpoints, and navigation strategies for MVP UI apps."
      tocItems={tocItems}
    >
      {/* BREAKPOINTS */}
      <section>
        <h2 id="breakpoints" className="scroll-mt-20">Breakpoints</h2>
        <p>
          MVP UI uses Tailwind v4 default breakpoints. All breakpoints are min-width — apply
          from the smallest applicable size upward.
        </p>
        <div className="mt-4 rounded-xl border border-border bg-bg divide-y divide-border not-prose">
          {breakpoints.map((bp) => (
            <div
              key={bp.name}
              className="grid grid-cols-[auto_auto_1fr] gap-x-4 items-center px-5 py-3.5"
            >
              <TokenPill>{bp.prefix}</TokenPill>
              <span className="text-sm font-mono text-fg-secondary">{bp.px}</span>
              <span className="text-sm text-fg-tertiary">{bp.use}</span>
            </div>
          ))}
        </div>
        <p className="mt-4">
          The <TokenPill>md:</TokenPill> breakpoint is the primary split between mobile and
          desktop layouts. Below <code>md</code> shows a top bar and drawer; at{" "}
          <code>md</code> and above shows the sidebar.
        </p>
      </section>

      {/* MOBILE-FIRST */}
      <section>
        <h2 id="mobile-first" className="scroll-mt-20">Mobile-first approach</h2>
        <p>
          Write the mobile layout first — no prefix. Add prefixed overrides for larger
          breakpoints. Never write desktop-first styles and try to undo them on mobile.
        </p>
        <pre><code>{`{/* WRONG — desktop-first, fighting mobile */}
<div className="flex-row md:flex-col">

{/* CORRECT — mobile-first, progressive enhancement */}
<div className="flex-col md:flex-row">`}</code></pre>
        <p>
          Avoid hiding content with <TokenPill>hidden</TokenPill> on mobile unless the
          element has a full mobile substitute. Prefer layout reflow over toggling visibility
          where possible.
        </p>
      </section>

      {/* APP LAYOUT PATTERN */}
      <section>
        <h2 id="layout-pattern" className="scroll-mt-20">App layout pattern</h2>
        <p>
          Example app shells use <TokenPill>h-screen overflow-hidden</TokenPill> on the root
          to constrain the viewport and prevent page scroll. Internal panels own their own
          scroll context with <TokenPill>overflow-y-auto</TokenPill>.
        </p>
        <pre><code>{`<div className="flex h-screen overflow-hidden bg-bg">
  {/* Sidebar — desktop only */}
  <div className="hidden md:block shrink-0">
    <AppSidebar />
  </div>

  {/* Main area */}
  <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
    {/* Mobile top bar */}
    <div className="flex shrink-0 items-center justify-between
                    border-b border-border-secondary bg-bg px-4 py-3 md:hidden">
      {/* logo + hamburger */}
    </div>

    {/* Scrollable content */}
    <main className="flex-1 overflow-y-auto">
      {children}
    </main>
  </div>
</div>`}</code></pre>
        <p>
          Key rules:
        </p>
        <ul>
          <li>Root uses <TokenPill>h-screen</TokenPill>, not <TokenPill>min-h-screen</TokenPill>.</li>
          <li>Sidebar hidden via <TokenPill>hidden md:block</TokenPill> — rendered in DOM, not conditional.</li>
          <li>Top bar visible via <TokenPill>md:hidden</TokenPill> — mirrors the sidebar toggle.</li>
          <li>Content area uses <TokenPill>flex-1 min-w-0</TokenPill> to prevent overflow bleed.</li>
        </ul>
      </section>

      {/* NAV DRAWER */}
      <section>
        <h2 id="nav-drawer" className="scroll-mt-20">Mobile nav drawer</h2>
        <p>
          Replace the desktop sidebar with a <code>Drawer</code> on mobile. Open it from the
          hamburger button in the top bar. The drawer renders the same{" "}
          <code>AppSidebar</code> component — pass <TokenPill>className="border-r-0 w-full"</TokenPill>{" "}
          to strip the sidebar's own border when it sits inside a drawer.
        </p>
        <pre><code>{`import { Drawer } from "@mvp-ui/ui";
import { Menu } from "lucide-react";

// In the mobile top bar:
<button onClick={() => setNavOpen(true)} aria-label="Open navigation">
  <Menu className="size-5" />
</button>

// Drawer placed adjacent to the layout root:
<Drawer
  side="left"
  size="sm"
  isOpen={navOpen}
  onOpenChange={setNavOpen}
  aria-label="Navigation menu"
  showCloseButton
>
  <AppSidebar className="border-r-0 w-full" />
</Drawer>`}</code></pre>
        <p>
          Use <TokenPill>aria-label="Navigation menu"</TokenPill> on the Drawer and{" "}
          <TokenPill>aria-label="Open navigation"</TokenPill> on the trigger button so
          screen readers announce both correctly.
        </p>
      </section>

      {/* RESPONSIVE GRID */}
      <section>
        <h2 id="grid" className="scroll-mt-20">Responsive grid</h2>
        <p>
          Prefer named grid patterns over arbitrary column counts. Common stacks:
        </p>
        <div className="mt-4 rounded-xl border border-border bg-bg divide-y divide-border not-prose">
          {[
            {
              label: "Single → two-column",
              classes: "grid-cols-1 md:grid-cols-2",
              use: "Card pairs, form + preview",
            },
            {
              label: "Single → three-column",
              classes: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
              use: "Feature cards, stat blocks",
            },
            {
              label: "Single → four-column",
              classes: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
              use: "Dashboard KPI tiles",
            },
            {
              label: "Sidebar + content",
              classes: "grid-cols-1 lg:grid-cols-[260px_1fr]",
              use: "Settings, detail pages",
            },
          ].map((g) => (
            <div key={g.label} className="px-5 py-4 flex flex-col gap-1.5">
              <span className="text-sm font-medium text-fg">{g.label}</span>
              <div className="flex gap-2 flex-wrap items-center">
                <TokenPill>{g.classes}</TokenPill>
                <span className="text-xs text-fg-quaternary">·</span>
                <span className="text-xs text-fg-tertiary">{g.use}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4">
          Always pair <TokenPill>gap-4</TokenPill> or <TokenPill>gap-6</TokenPill> with a grid.
          Never use margin hacks to space grid children.
        </p>
      </section>

      {/* RESPONSIVE TYPOGRAPHY */}
      <section>
        <h2 id="typography" className="scroll-mt-20">Responsive typography</h2>
        <p>
          Scale display and hero text across breakpoints. Body text stays fixed — scaling
          prose with the viewport introduces readability regressions.
        </p>
        <pre><code>{`{/* Hero heading — large on desktop, smaller on mobile */}
<h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-fg">
  Page heading
</h1>

{/* Section heading — stable */}
<h2 className="text-xl font-semibold text-fg">
  Section heading
</h2>

{/* Body — never scale */}
<p className="text-md text-fg-secondary">
  Description text
</p>`}</code></pre>
        <p>
          Keep text size changes to one or two breakpoint steps per heading level. Skipping
          sizes (e.g. <code>text-sm</code> to <code>text-4xl</code>) creates jarring jumps.
        </p>
      </section>

      {/* TESTING */}
      <section>
        <h2 id="testing" className="scroll-mt-20">Testing breakpoints</h2>
        <p>
          Test every meaningful page at the canonical widths. Use Chrome DevTools device
          toolbar or Playwright's <code>page.setViewportSize</code>.
        </p>
        <div className="mt-4 rounded-xl border border-border bg-bg divide-y divide-border not-prose">
          {[
            { px: "320px", label: "Smallest phone — overflow stress test" },
            { px: "375px", label: "iPhone SE — common budget device" },
            { px: "768px", label: "Tablet / md breakpoint trigger" },
            { px: "1024px", label: "Small desktop / lg breakpoint trigger" },
            { px: "1440px", label: "Standard desktop — primary design target" },
          ].map((t) => (
            <div key={t.px} className="px-5 py-3.5 grid grid-cols-[auto_1fr] gap-4 items-center">
              <TokenPill>{t.px}</TokenPill>
              <span className="text-sm text-fg-tertiary">{t.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-4">
          At each width, verify:
        </p>
        <ul>
          <li>No horizontal overflow (<TokenPill>overflow-x: hidden</TokenPill> on body masks real bugs — check without it).</li>
          <li>Sidebar ↔ top-bar toggle fires at <code>md</code> as expected.</li>
          <li>Touch targets are at least 44×44 px on mobile widths.</li>
          <li>No text truncation in critical labels or headings.</li>
        </ul>
      </section>
    </DocPage>
  );
}
