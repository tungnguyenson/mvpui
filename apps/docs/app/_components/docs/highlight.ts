/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { createHighlighter, type Highlighter } from "shiki";

/* ==========================================================================
   Server-only syntax highlighting.

   One cached Highlighter for the whole process (creating one per snippet
   pulls the WASM + grammars repeatedly). Dual-theme output with
   `defaultColor: false` emits only `--shiki-light` / `--shiki-dark` CSS
   vars per token — no inline color. globals.css picks light by default and
   swaps to dark inside any `[data-theme="dark"]` subtree, so a code panel
   re-themes with the same per-example toggle the preview uses.
   ========================================================================== */

const THEMES = { light: "github-light", dark: "github-dark" } as const;
const LANGS = ["tsx", "bash"] as const;

export type CodeLang = (typeof LANGS)[number];

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: Object.values(THEMES),
      langs: [...LANGS],
    });
  }
  return highlighterPromise;
}

export async function highlight(
  code: string,
  lang: CodeLang = "tsx"
): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code.trim(), {
    lang,
    themes: THEMES,
    defaultColor: false,
  });
}
