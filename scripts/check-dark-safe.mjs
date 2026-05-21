#!/usr/bin/env node
/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * Dark-safe guard.
 *
 * Component variant classes must use the semantic flipping aliases
 * (bg-bg, bg-bg-secondary/tertiary, text-fg*, border-border*, primary*,
 * ring, and the status tokens *-bg / *-border / *-fg). Raw numbered color
 * scales (gray/brand/error/success/warning -25..-950) and bg-white /
 * bg-black / text-black do NOT flip under [data-theme="dark"] — they look
 * correct in light and wash out (or vanish) in dark.
 *
 * This catches them before merge. A genuinely mode-independent use
 * (solid destructive fill, alpha focus ring) is allowed by putting
 * `dark-ok` in a comment on the same line.
 *
 * `ring-*` is intentionally not banned: focus rings legitimately use an
 * alpha brand/error scale (e.g. ring-brand-500/22) and read in both modes.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const COMPONENT_DIR = "packages/ui/src/components";

const SCALE = "(?:25|50|100|200|300|400|500|600|700|800|900|950)";
const COLOR_NAMES =
  "gray|brand|error|success|warning|slate|sky|blue|indigo|purple|pink|orange|red|yellow|green";
const BANNED = [
  new RegExp(
    `\\b(?:bg|border|divide|from|via|to)-(?:${COLOR_NAMES})-${SCALE}\\b`,
    "g"
  ),
  new RegExp(`\\btext-(?:${COLOR_NAMES})-${SCALE}\\b`, "g"),
  /\bbg-(?:white|black)\b/g,
  /\btext-black\b/g,
];

/** Walk a directory tree and yield every `.tsx` file path. */
function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      yield* walk(full);
    } else if (full.endsWith(".tsx")) {
      yield full;
    }
  }
}

let violations = 0;

for (const path of walk(COMPONENT_DIR)) {
  const lines = readFileSync(path, "utf8").split("\n");

  lines.forEach((line, i) => {
    if (line.includes("dark-ok")) return;
    for (const re of BANNED) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line)) !== null) {
        violations++;
        console.error(
          `${path}:${i + 1}  dark-unsafe utility "${m[0]}" — use a semantic flipping token, or add a "dark-ok" comment if it is intentionally mode-independent.`
        );
      }
    }
  });
}

if (violations > 0) {
  console.error(
    `\n✗ ${violations} dark-unsafe utility usage(s). See CLAUDE.md › "Dark-safe styling".`
  );
  process.exit(1);
}
console.log("✓ dark-safe: no raw color scales in component variants");
