#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, renameSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

const TOGGLES = [
  {
    src: resolve(root, "middleware.ts"),
    bak: resolve(root, "middleware.ts.disabled"),
  },
  {
    src: resolve(root, "app/(workspace)/[...slug]"),
    bak: resolve(root, "app/(workspace)/__slug__.disabled"),
  },
];

const moved = [];
for (const { src, bak } of TOGGLES) {
  if (existsSync(src)) {
    renameSync(src, bak);
    moved.push({ src, bak });
  }
}

function restore() {
  for (const { src, bak } of moved) {
    if (existsSync(bak)) {
      renameSync(bak, src);
    }
  }
}

process.on("SIGINT", () => {
  restore();
  process.exit(130);
});

try {
  const result = spawnSync("next", ["build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, BUILD_TARGET: "mobile" },
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    process.exitCode = result.status ?? 1;
  }
} finally {
  restore();
}
