# LLM Wiki — Design

**Date:** 2026-11-13 · **Status:** Approved

## Intent

Add a Karpathy-style "LLM Wiki" to the blog: a knowledge base about cutting-edge AI that an LLM agent maintains from raw sources the owner collects. Blog posts stay dated essays; the wiki is living, interlinked knowledge that compounds as sources are added.

## Goals

- Agent-maintained wiki of concept pages and source summaries, published at `/wiki/`.
- Three repeatable workflows (ingest, query, lint) defined in a schema file the agent follows.
- Links that work both on the Hugo site and when the folder is opened in Obsidian.
- Wiki pages included in site search; "Wiki" in the main menu.

## Non-goals

- No separate site or repo. No database, no custom backend.
- No automated/scheduled ingestion; the owner triggers workflows.

## Anti-goals

- Publishing copyrighted raw sources (papers, articles) in the public repo.
- Wiki pages that make claims without tracing back to a source.

## Approaches considered

- **A. Wiki inside the blog under `/wiki/` (chosen):** one repo, one deploy, posts and wiki cross-link.
- B. Separate wiki repo/site: two deploys and cross-site links for no real gain.
- C. Private Obsidian vault only: closest to Karpathy's setup but not public. The chosen layout still opens in Obsidian.

## Design

```
blog/
├── CLAUDE.md          # schema: conventions + ingest/query/lint workflows
├── raw/               # owner's sources; gitignored; agent never edits
└── content/wiki/
    ├── _index.md      # index: every page, one line each, by category
    ├── log.md         # append-only dated log of ingests/queries/lints
    ├── concepts/      # one page per concept
    └── sources/       # one summary page per source, linking to the original
```

- **Ingest:** read a file in `raw/` → write `sources/<slug>.md` → create/update affected concept pages → update index → append log.
- **Query:** answer from wiki pages (citing them); optionally file a good answer as a new page.
- **Lint:** report contradictions, orphan pages, missing concept pages, stale claims, broken links; log it.
- **Links:** standard relative Markdown links to `.md` files (`[MCP](../concepts/mcp.md)`), resolved by a Hugo `render-link` hook via `GetPage`, so the same files work in Obsidian.
- **Seed:** ingest the existing post "The Anatomy of a Modern AI Agent" as the first source.

## Builder's calls

- Front matter fields for wiki pages (type, sources, updated date) and how the index is generated vs. hand-maintained.
- Exact menu weight and wiki section layout within PaperMod.
