#!/usr/bin/env node
// Inserts (or updates) a deprecation banner at the top of every page-level .md
// file, just below the YAML frontmatter if present. Idempotent: re-running
// replaces the existing banner block in place. Run from the repo root:
//
//   node scripts/add-deprecation-banner.mjs
//
// Skips: README.md (which gets a larger banner separately), node_modules/,
// .git/, .gitbook/, and SUMMARY.md (GitBook sidebar — not user-facing prose).

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const BANNER_START = '<!-- DEPRECATION-BANNER:START -->';
const BANNER_END = '<!-- DEPRECATION-BANNER:END -->';

const BANNER_BLOCK = `${BANNER_START}
{% hint style="warning" %}
**⚠️ These docs are moving to a new home.** Preview the new site at [docs-preview.gokite.ai](https://docs-preview.gokite.ai). At cutover, this site will redirect there automatically. File issues against [gokite-ai/kite-docs](https://github.com/gokite-ai/kite-docs).
{% endhint %}
${BANNER_END}`;

const SKIP_DIRS = new Set(['node_modules', '.git', '.gitbook']);
const SKIP_FILES = new Set(['SUMMARY.md']);

async function walk(root, rel = '') {
  const out = [];
  for (const entry of await readdir(path.join(root, rel))) {
    const full = path.join(root, rel, entry);
    const s = await stat(full);
    if (s.isDirectory()) {
      if (entry.startsWith('.') || SKIP_DIRS.has(entry)) continue;
      out.push(...(await walk(root, path.join(rel, entry))));
    } else if (entry.endsWith('.md') && !SKIP_FILES.has(entry)) {
      out.push(path.join(rel, entry));
    }
  }
  return out;
}

function applyBanner(src) {
  // 1. If a banner is already present, replace it.
  if (src.includes(BANNER_START)) {
    return src.replace(
      new RegExp(`${BANNER_START}[\\s\\S]*?${BANNER_END}\\n*`),
      BANNER_BLOCK + '\n\n',
    );
  }

  // 2. Otherwise, insert AFTER the frontmatter (if any) or at the very top.
  const fmMatch = src.match(/^---\n[\s\S]*?\n---\n+/);
  if (fmMatch) {
    return fmMatch[0] + BANNER_BLOCK + '\n\n' + src.slice(fmMatch[0].length);
  }
  return BANNER_BLOCK + '\n\n' + src;
}

async function main() {
  const root = process.argv[2] ?? '.';
  const files = await walk(root);
  let updated = 0;
  for (const rel of files) {
    const full = path.join(root, rel);
    const src = await readFile(full, 'utf8');
    const next = applyBanner(src);
    if (next !== src) {
      await writeFile(full, next, 'utf8');
      updated += 1;
    }
  }
  console.log(`Updated ${updated}/${files.length} files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
