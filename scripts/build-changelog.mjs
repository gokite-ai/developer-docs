import {
  readdirSync,
  readFileSync,
  mkdirSync,
  writeFileSync,
  existsSync,
  statSync,
} from "node:fs";
import { join, basename, extname } from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import Ajv from "ajv";
import addFormats from "ajv-formats";

// gray-matter's default YAML engine parses `date: 2026-05-19` as a
// JS Date object. AJV then rejects it because the schema expects
// type:"string". CORE_SCHEMA keeps date-like strings as strings.
const YAML_ENGINE = {
  parse: (s) => yaml.load(s, { schema: yaml.CORE_SCHEMA }),
  stringify: (o) => yaml.dump(o, { schema: yaml.CORE_SCHEMA }),
};

const README_START = "<!-- changelog-index-start -->";
const README_END = "<!-- changelog-index-end -->";
const SUMMARY_START = "<!-- changelog-entries-start -->";
const SUMMARY_END = "<!-- changelog-entries-end -->";

const COMPONENT_LABEL = {
  backend: "Backend",
  web: "Web",
  cli: "CLI",
  skills: "Skills",
};

function loadEntries(root) {
  const schema = JSON.parse(
    readFileSync(join(root, "changelog/index.schema.json"), "utf8"),
  );
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  const changelogDir = join(root, "changelog");
  const entries = [];
  for (const yearName of readdirSync(changelogDir)) {
    const yearPath = join(changelogDir, yearName);
    if (!statSync(yearPath).isDirectory()) continue;
    if (!/^\d{4}$/.test(yearName)) continue;
    for (const file of readdirSync(yearPath)) {
      if (extname(file) !== ".md") continue;
      const raw = readFileSync(join(yearPath, file), "utf8");
      const parsed = matter(raw, { engines: { yaml: YAML_ENGINE } });
      if (!validate(parsed.data)) {
        const msg = ajv.errorsText(validate.errors, { separator: "; " });
        throw new Error(`Invalid frontmatter in ${file}: ${msg}`);
      }
      const slug = basename(file, ".md");
      entries.push({
        date: parsed.data.date,
        component: parsed.data.component,
        version: parsed.data.version,
        slug,
        title: parsed.data.title,
        summary: parsed.data.summary,
        corrected_at: parsed.data.corrected_at ?? null,
        year: yearName,
      });
    }
  }
  // Newest first; deterministic tie-break by slug.
  entries.sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug),
  );
  return entries;
}

function formatDate(iso) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function renderReadmeSection(entries) {
  if (entries.length === 0) return "_No entries yet._";
  const byDate = new Map();
  for (const e of entries) {
    if (!byDate.has(e.date)) byDate.set(e.date, []);
    byDate.get(e.date).push(e);
  }
  const lines = [];
  for (const [date, group] of byDate) {
    lines.push(`## ${formatDate(date)}`);
    lines.push("");
    for (const e of group) {
      const label = COMPONENT_LABEL[e.component] ?? e.component;
      const corrected = e.corrected_at ? ` _(updated ${e.corrected_at})_` : "";
      lines.push(`### ${label} · ${e.version}${corrected}`);
      lines.push(`**${e.title}**`);
      lines.push("");
      lines.push(e.summary);
      lines.push("");
      lines.push(`[Read full notes →](${e.year}/${e.slug}.md)`);
      lines.push("");
    }
  }
  return lines.join("\n").trimEnd();
}

function renderSummarySection(entries) {
  if (entries.length === 0) return "";
  return entries
    .map((e) => {
      const label = COMPONENT_LABEL[e.component] ?? e.component;
      return `* [${label} ${e.version} — ${e.title}](changelog/${e.year}/${e.slug}.md)`;
    })
    .join("\n");
}

function rewriteBetweenMarkers(content, startMarker, endMarker, replacement, file) {
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  if (startIdx < 0 || endIdx < 0 || endIdx < startIdx) {
    throw new Error(
      `${file} is missing markers '${startMarker}' / '${endMarker}'. Add them once before running the script.`,
    );
  }
  const before = content.slice(0, startIdx + startMarker.length);
  const after = content.slice(endIdx);
  return `${before}\n${replacement}\n${after}`;
}

export async function buildChangelog({ root, outDir }) {
  const entries = loadEntries(root);

  // 1. index.json — strip the year field that's only useful internally.
  mkdirSync(join(outDir, "changelog"), { recursive: true });
  writeFileSync(
    join(outDir, "changelog/index.json"),
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        entries: entries.map(({ year: _y, ...rest }) => rest),
      },
      null,
      2,
    ),
  );

  // 2. changelog/README.md (between markers)
  const readmePath = join(root, "changelog/README.md");
  if (existsSync(readmePath)) {
    const readmeRaw = readFileSync(readmePath, "utf8");
    const rendered = rewriteBetweenMarkers(
      readmeRaw,
      README_START,
      README_END,
      renderReadmeSection(entries),
      "changelog/README.md",
    );
    writeFileSync(readmePath, rendered);
  }

  // 3. SUMMARY.md (between markers)
  const summaryPath = join(root, "SUMMARY.md");
  if (existsSync(summaryPath)) {
    const summaryRaw = readFileSync(summaryPath, "utf8");
    const rendered = rewriteBetweenMarkers(
      summaryRaw,
      SUMMARY_START,
      SUMMARY_END,
      renderSummarySection(entries),
      "SUMMARY.md",
    );
    writeFileSync(summaryPath, rendered);
  }

  return { entries };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const root = process.cwd();
  const outDir = join(root, "public");
  buildChangelog({ root, outDir }).then(
    (out) => console.log(`Built changelog with ${out.entries.length} entries.`),
    (err) => {
      console.error(err.message);
      process.exit(1);
    },
  );
}
