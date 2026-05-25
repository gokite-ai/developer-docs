<!-- DEPRECATION-BANNER:START -->
{% hint style="warning" %}
**⚠️ These docs are moving to a new home.** Preview the new site at [docs-preview.gokite.ai](https://docs-preview.gokite.ai). At cutover, this site will redirect there automatically. File issues against [gokite-ai/kite-docs](https://github.com/gokite-ai/kite-docs).
{% endhint %}
<!-- DEPRECATION-BANNER:END -->

# Changelog

Public delivery timeline for Kite Passport — see each component's recent releases below. Please be noticed this Changelog feature is still being processed and may change.

<!-- changelog-index-start -->
## May 19, 2026

### Backend · v1.1.0
**Session preflight now returns merchant fee estimates**

The preflight endpoint includes an estimated_fees field so agents can show users a realistic total spend cap before they approve a session.

[Read full notes →](2026/2026-05-19-backend-v1-1-0.md)

### CLI · v1.3.4
**Activity command now filters by date range and merchant**

kpass activity supports --since, --until, and --merchant flags so agents can answer 'what did I spend on X last week?' without fetching the full history.

[Read full notes →](2026/2026-05-19-cli-v1-3-4.md)

### Skills · v0.9.1
**request-session skill now retries preflight on transient catalog errors**

Sessions targeting catalog services no longer fail immediately when the catalog returns a 503 — the skill retries with backoff before surfacing the error.

[Read full notes →](2026/2026-05-19-skills-v0-9-1.md)

### Web · v1.2.0
**Session approval page shows estimated fees alongside budget cap**

Users approving a new session see an itemized 'up to ~$X' estimate next to the raw budget cap, matching the new backend preflight data.

[Read full notes →](2026/2026-05-19-web-v1-2-0.md)
<!-- changelog-index-end -->

---

## Editing entries

The changelog action opens a PR for each component release tag. The `<details><summary>Included changes</summary>` block is auto-extracted from commit subjects and should not be hand-edited; the narrative above it is free to edit.

For corrections after publish, set `corrected_at: YYYY-MM-DD` in frontmatter and add an `> **Update YYYY-MM-DD:** ...` admonition at the top of the narrative.
