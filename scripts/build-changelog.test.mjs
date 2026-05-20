import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  readFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildChangelog } from "./build-changelog.mjs";

let root;

const SAMPLE_CLI = `---
date: 2026-05-19
component: cli
version: v1.3.4
tag: v1.3.4
repo: gokite-ai/passport-cli
release_url: https://github.com/gokite-ai/passport-cli/releases/tag/v1.3.4
title: "Activity command filters"
summary: "kpass activity gains --since/--until/--merchant filters."
ai_generated: false
generated_at: 2026-05-19T18:00:00Z
corrected_at: null
---
Body.
`;

const SAMPLE_BACKEND = `---
date: 2026-05-19
component: backend
version: v1.1.0
tag: v1.1.0
repo: gokite-ai/passport
release_url: https://github.com/gokite-ai/passport/releases/tag/v1.1.0
title: "Preflight returns fee estimates"
summary: "estimated_fees field added to session preflight."
ai_generated: false
generated_at: 2026-05-19T18:00:00Z
corrected_at: null
---
Body.
`;

const STUB_README = `# Changelog

Public delivery timeline for Kite Passport.

<!-- changelog-index-start -->
_placeholder_
<!-- changelog-index-end -->

---

## Editing entries

Free text below the markers.
`;

const STUB_SUMMARY = `# Table of contents

## Introduction
* [Quickstart](README.md)

## 📜 Changelog
<!-- changelog-entries-start -->
<!-- changelog-entries-end -->

## Other section
* [Other page](other.md)
`;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "docs-build-"));
  mkdirSync(join(root, "changelog/2026"), { recursive: true });
  writeFileSync(
    join(root, "changelog/index.schema.json"),
    readFileSync(join(process.cwd(), "changelog/index.schema.json"), "utf8"),
  );
  writeFileSync(
    join(root, "changelog/2026/2026-05-19-cli-v1-3-4.md"),
    SAMPLE_CLI,
  );
  writeFileSync(
    join(root, "changelog/2026/2026-05-19-backend-v1-1-0.md"),
    SAMPLE_BACKEND,
  );
  writeFileSync(join(root, "changelog/README.md"), STUB_README);
  writeFileSync(join(root, "SUMMARY.md"), STUB_SUMMARY);
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

describe("buildChangelog", () => {
  it("writes index.json with entries sorted newest first", async () => {
    await buildChangelog({ root, outDir: join(root, "public") });
    const index = JSON.parse(
      readFileSync(join(root, "public/changelog/index.json"), "utf8"),
    );
    expect(index.entries).toHaveLength(2);
    expect(index.entries[0].slug).toBe("2026-05-19-backend-v1-1-0");
    // tie-break by slug when dates match: 'backend' < 'cli'
    expect(index.entries[1].slug).toBe("2026-05-19-cli-v1-3-4");
  });

  it("rewrites changelog/README.md between markers, preserving surrounding content", async () => {
    await buildChangelog({ root, outDir: join(root, "public") });
    const rendered = readFileSync(join(root, "changelog/README.md"), "utf8");
    expect(rendered).toContain("# Changelog");
    expect(rendered).toContain("Activity command filters");
    expect(rendered).toContain("Preflight returns fee estimates");
    expect(rendered).toContain("## Editing entries"); // preserved
    expect(rendered).not.toContain("_placeholder_"); // marker contents replaced
  });

  it("rewrites SUMMARY.md between markers, preserving the rest of the TOC", async () => {
    await buildChangelog({ root, outDir: join(root, "public") });
    const summary = readFileSync(join(root, "SUMMARY.md"), "utf8");
    expect(summary).toContain("[Quickstart](README.md)"); // preserved
    expect(summary).toContain("[Other page](other.md)"); // preserved
    expect(summary).toContain("changelog/2026/2026-05-19-cli-v1-3-4.md");
    expect(summary).toContain("changelog/2026/2026-05-19-backend-v1-1-0.md");
  });

  it("throws on invalid frontmatter", async () => {
    writeFileSync(
      join(root, "changelog/2026/bad.md"),
      `---\ndate: not-a-date\ncomponent: cli\n---\nx\n`,
    );
    await expect(
      buildChangelog({ root, outDir: join(root, "public") }),
    ).rejects.toThrow(/bad\.md/);
  });

  it("throws if SUMMARY.md is missing markers", async () => {
    writeFileSync(join(root, "SUMMARY.md"), "# TOC\n\n* [foo](foo.md)\n");
    await expect(
      buildChangelog({ root, outDir: join(root, "public") }),
    ).rejects.toThrow(/markers/);
  });
});
