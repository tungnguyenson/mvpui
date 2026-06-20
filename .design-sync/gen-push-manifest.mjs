// Generate chunked write_files manifests for design-sync uploads.
// Usage: node .design-sync/gen-push-manifest.mjs <mode> [names]
//   mode "components <A,B,...>" — only those components' dirs + _preview files
//   mode "all"                  — every component dir + _preview + base files
//   mode "base"                 — only base files (bundle/css/fonts/vendor/readme)
// Writes .design-sync/.cache/push-chunk-<N>.json (<=220 entries each) and prints a summary.
import { readdirSync, existsSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'ds-bundle';
const args = process.argv.slice(2);
const mode = args[0];

const groupOf = {};
for (const g of readdirSync(`${OUT}/components`)) for (const n of readdirSync(`${OUT}/components/${g}`)) groupOf[n] = g;

function compFiles(name) {
  const g = groupOf[name];
  const out = [];
  if (!g) return out;
  for (const ext of ['d.ts', 'html', 'jsx', 'prompt.md']) {
    const p = `components/${g}/${name}/${name}.${ext}`;
    if (existsSync(`${OUT}/${p}`)) out.push(p);
  }
  const pv = `_preview/${name}.js`;
  if (existsSync(`${OUT}/${pv}`)) out.push(pv);
  return out;
}

const baseFiles = () => {
  const out = [];
  for (const f of ['_ds_bundle.js', '_ds_bundle.css', 'styles.css', 'README.md']) if (existsSync(`${OUT}/${f}`)) out.push(f);
  for (const d of ['_vendor', 'fonts', 'tokens', 'guidelines']) {
    if (!existsSync(`${OUT}/${d}`)) continue;
    const walk = (rel) => { for (const e of readdirSync(`${OUT}/${rel}`, { withFileTypes: true })) {
      if (e.isDirectory()) walk(`${rel}/${e.name}`); else out.push(`${rel}/${e.name}`);
    } };
    walk(d);
  }
  return out;
};

let files = [];
if (mode === 'all') {
  files.push(...baseFiles());
  for (const n of Object.keys(groupOf).sort()) files.push(...compFiles(n));
} else if (mode === 'base') {
  files = baseFiles();
} else if (mode === 'components') {
  const names = (args[1] || '').split(',').filter(Boolean);
  for (const n of names) files.push(...compFiles(n));
} else { console.error('unknown mode'); process.exit(1); }

const entries = files.map((p) => ({ path: p, localPath: p }));
// clear old chunks
for (const f of readdirSync('.design-sync/.cache')) if (/^push-chunk-\d+\.json$/.test(f)) rmSync(`.design-sync/.cache/${f}`);
const chunks = [];
for (let i = 0; i < entries.length; i += 220) chunks.push(entries.slice(i, i + 220));
chunks.forEach((c, i) => writeFileSync(`.design-sync/.cache/push-chunk-${i}.json`, JSON.stringify(c)));
console.log(JSON.stringify({ total: entries.length, chunks: chunks.length, sizes: chunks.map((c) => c.length) }));
