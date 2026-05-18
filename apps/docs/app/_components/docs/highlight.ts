/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("bash", bash);

export type CodeLang = "tsx" | "bash";

export function highlight(code: string, lang: CodeLang = "tsx"): string {
  const effectiveLang = lang === "tsx" ? "typescript" : lang;
  const html = hljs.highlight(code.trim(), { language: effectiveLang }).value;
  return `<pre class="hljs-pre"><code class="hljs">${html}</code></pre>`;
}
