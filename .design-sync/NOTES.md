# design-sync NOTES — @mvp-ui/ui → "MVP UI Design System"

Repo-specific gotchas for future re-syncs. Read this first.

## Build / converter invocation
- **Install first**: repo ships no committed `node_modules`. Run `pnpm i --frozen-lockfile` (set `COREPACK_ENABLE_STRICT=0` — pnpm@10.33.4 is pinned via `packageManager`). The `sharp` source-build failure during install is irrelevant (docs-only dep).
- **buildCmd**: `pnpm build:packages` (builds tokens + ui + charts). `pnpm build:ui` alone misses charts.
- **`--node-modules` → `./packages/ui/node_modules`** (NOT repo root). pnpm hoists deps into each package's own `node_modules`; repo-root `node_modules/react` does not exist. charts' own deps (recharts) resolve via esbuild's relative walk into `packages/charts/node_modules`.
- **`--entry` is cwd-relative**, so pass `./packages/ui/dist/index.js` (not `./dist/index.js`).
- Converter command:
  ```
  node .ds-sync/package-build.mjs --config .design-sync/config.json \
    --node-modules ./packages/ui/node_modules --entry ./packages/ui/dist/index.js --out ./ds-bundle
  node .ds-sync/package-validate.mjs ./ds-bundle
  ```

## Repo change required (committed)
- **`packages/ui/package.json` had no top-level `types`/`main`/`module`** — only the modern `exports` map. The converter's dts extractor (`projectFor` in lib/dts.mjs) resolves the types entry from `pkgJson.types`/`typings`/`publishConfig.types` and falls back to a nonexistent `index.d.ts`, so it discovered **0** ui components (only charts via componentSrcMap). Fix: added `"main": "./dist/index.cjs"`, `"module": "./dist/index.js"`, `"types": "./dist/index.d.ts"` (mirrors `exports["."]`, fully standard, non-breaking). **Re-sync risk: if this is reverted, the ui exports vanish again.**

## Charts (@mvp-ui/charts folded in via user choice)
- Bundle merge: `extraEntries: ["../charts/dist/index.js"]` (path form, workspace-bounded).
- Cards: charts are NOT in ui's `.d.ts`, so the 4 chart components are added via `componentSrcMap` pointing at `../charts/src/components/*.tsx`. Without those pins they'd be on `window.MvpUI` but get no card.

## Fonts (resolved — bundled, do not revert to system)
- DS references `Inter` + `JetBrains Mono` via tokens but ships no `@font-face` → `[FONT_MISSING]`.
- Fix: committed `.design-sync/fonts/` with variable woff2 from `@fontsource-variable` (OFL), **family renamed to `Inter`/`JetBrains Mono`** (the @fontsource default name is `Inter Variable`, which would NOT match the `--font-sans: Inter` token). Subsets: Inter latin + latin-ext + vietnamese (Vietnamese-facing apps consume this DS); JetBrains Mono latin + latin-ext.
- Wired via `cfg.extraFonts: ["../../.design-sync/fonts/fonts.css"]`. Build copies them to `ds-bundle/fonts/` and `styles.css` `@import`s `./fonts/fonts.css` (in the design-facing closure).

## Card scope (user decision: "core rich + icons, drop sub-parts")
- ~234 raw exports → pruned ~44 compound sub-parts/`*Base` internals via `componentSrcMap: null` (they stay importable on `window.MvpUI`, compose into their parent's card). Result: **191 cards**.
- Authoring scope: rich previews for the ~75 real components (port from `apps/docs/app/components/**/page.tsx` `SECTIONS: DocExample[]`), simple styled cards for ~100 icons/logos, Illustration via its `type` axis.

## Render check
- Playwright 1.61.0 pins chromium build 1228, which is already cached at `~/Library/Caches/ms-playwright/` (macOS path). `playwright` npm installed in `.ds-sync/` (PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1). `launch()` finds the cached browser — no download, no `DS_CHROMIUM_PATH`.

## Providers
- No global `cfg.provider` needed. Floor-card render errors for RadioButton/Tag/Select/Table/charts/Illustration/Carousel/FileUploadTrigger are NOT provider issues — they need real props/children/parent composition, supplied by the authored preview. Toaster/Tooltip/Form render without a wrapper.

## Preview authoring gotchas (folded from the fan-out — reusable on re-sync)
- **Icon-prop slot type varies.** Most components take a rendered element (`iconLeading={<Mail/>}`) — lucide works. But `ButtonGroupItem` renders an FC slot via `typeof === "function"`; lucide icons are `forwardRef` **objects** → render invisible there. Pass a plain function component to those slots. Always zoom/crop the capture to confirm small icons actually painted (downscaled sheets hide missing icons).
- **Overlays render via `cfg.overrides` (cardMode:single + viewport) + open state.** Modal/Dialog: `<ModalOverlay isOpen><Modal><Dialog>…ModalHeader/Body/Footer</Dialog></Modal></ModalOverlay>`. Drawer: `<Drawer isOpen title description>…</Drawer>`. Dropdown: `<Dropdown.Root defaultOpen>`. Tooltip: `<Tooltip defaultOpen placement="bottom">`. These portal to the iframe body; the override viewport sizes the card around the portaled panel. All render great.
- **CommandMenu static-render limit:** react-aria's ComboBox filter excludes all items until the input is interacted with, so the static capture shows an empty palette (items never paint). Worked around with a helpful `emptyMessage`; the card shows the real open palette chrome. Items are documented in `.d.ts`/`.prompt.md`. Not fixable from the preview API.
- **Compound statics survive the bundle**: `PinInput.Group/.Slot`, `FileUpload.Root/.DropZone`, `Dropdown.Root/.Item`, `Select.Item`, `MultiSelect.Item` all work as `import { X }` + `X.Sub`. **ComboBox uses `SelectItem` (NOT `ComboBox.Item`).**
- **react-aria closed-trigger components** (Select/ComboBox/MultiSelect/DatePicker/DateRangePicker/TagSelect) render their closed trigger statically — no overrides needed. DatePicker/InputDate render WITHOUT a value (placeholder) to avoid `@internationalized/date`.
- **Segmented**: uncontrolled via `defaultSelectedKeys={["…"]}`, item is `SegmentedItem`, `variant="brand"`.
- **Form** = react-aria `<Form>` (NOT react-hook-form/useForm) — compose Form+Label+Input+HintText+Button statically.
- **Carousel**: author ONE slide per view (`basis-full`); multi-per-view (`basis-1/N`) collapses in static capture (embla isn't measured).
- **CreditCard** `type` accepts 13 string literals despite `.d.ts` typing it `unknown`. **IPhoneMockup** `image` is required (use an inline `data:image/svg+xml,` URI). **Store badge buttons** support `href` (extend AnchorHTMLAttributes) despite the `.d.ts` omitting it.
- **Charts** (BarChart/LineChart/PieChart/Sparkline/ProgressCircle): import from `'@mvp-ui/ui'`, hardcode deterministic data (the docs use Math.random — replace). They render in the brand purple scale.

## Re-sync risks (what can silently go stale — watch these)
- **Two repo source fixes must stay in place** or the sync regresses: `packages/ui/package.json` top-level `types`/`main`/`module` (without it, 0 ui components discovered) and `packages/ui/src/styles.css` brand-scale `:root` block (without it, charts render black). Both are committed; a revert breaks the next sync.
- **Bundled fonts** (`.design-sync/fonts/`) are committed woff2 — if the brand font changes, regenerate from `@fontsource-variable` and re-rename the family to match the token (`Inter`/`JetBrains Mono`).
- **Upload mechanism caveat:** DesignSync `write_files` is only reliably available in the **main loop**, NOT in subagents (subagents returned "tool unavailable" mid-run). Do uploads inline; `.design-sync/gen-push-manifest.mjs` generates chunked manifests. (resync.mjs's own diff/upload path is the normal route — this only matters for manual fallback pushes.)
- **CommandMenu** card shows an empty palette (interaction-only items) — re-syncs will see the same; it's expected, not a regression.
- **Overlay `cfg.overrides`** (Modal/Drawer/Dropdown/Tooltip/Dialog/CommandMenu/DrawerEdgeTrigger cardMode:single + viewport) are load-bearing — without them those cards collapse/escape.
- Charts data in previews is hardcoded-deterministic; if a chart's API changes, the preview won't auto-update.

## Known render warns (triaged legitimate)
- **`[RENDER_THIN]` on all ~88 icon/logo atoms** is EXPECTED, not a failure. Icons are small text-less SVGs (rendered at height 32) — exactly what the thin heuristic trips on. Confirmed rendering visually via contact sheets 1/4/6/11 + all pngBytes >6KB + white-fill audit (only backgrounds/internal shapes use white). Graded `good`. A re-sync that re-flags these is fine.
- BackgroundPattern is intentionally subtle (light Untitled UI motifs that fade) — its card reads faint by design; graded good.

## DS gap fixed in source (committed)
- `packages/ui/src/styles.css`: added an explicit `:root { --color-brand-25..950: var(--brand-*) }` block. Tailwind v4 tree-shook the brand scale out of the compiled CSS (components use semantic aliases, never raw `brand-*`), so `@mvp-ui/charts` CHART_COLORS (var(--color-brand-600/400/...)) resolved to nothing → chart bars rendered BLACK. The explicit block ships the full scale (author CSS passes through untouched). **Re-sync risk: revert = charts render black again.**

## .d.ts cosmetic note (non-blocking)
- ~237 emitted `.d.ts` use bare `CSSProperties` / lowercase `react.CSSProperties` for `style?` (from the tsup-generated dist `.d.ts`). emit.mjs hardcodes `import * as React`. These parse cleanly (validate: "all .d.ts parse cleanly") and the design agent understands them; not worth a dts.mjs fork. `Illustration` lost its `type` prop in extraction → fixed via `cfg.dtsPropsFor.Illustration`.
