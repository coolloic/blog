# Loic's Blog + LLM Wiki

A Hugo (PaperMod) site with two kinds of content:

- **Blog posts** in `content/posts/`: dated essays written by the owner. Edit them only when asked.
- **The wiki** in `content/wiki/`: a knowledge base on cutting-edge AI that **you (the LLM) maintain** from sources the owner collects. This follows Karpathy's "LLM Wiki" pattern.

Preview with `hugo server -D` (served at `http://localhost:1313/blog/`). Pushing to `main` publishes the site. The owner has approved committing and pushing directly once `scripts/check-wiki.sh` passes; no need to ask first.

## Layout (three layers)

| Layer  | Path                         | Who edits it                                  |
|--------|------------------------------|-----------------------------------------------|
| Raw    | `raw/`                       | Owner only. **Read it, never edit it.** Gitignored except `raw/README.md` (the repo is public, and sources are often copyrighted). |
| Wiki   | `content/wiki/`              | You, through the workflows below.             |
| Schema | `CLAUDE.md` (this file)      | Owner, or you when the owner asks.            |

```
content/wiki/
├── _index.md      # the index: every wiki page, one line each
├── log.md         # append-only record of every ingest / query / lint
├── concepts/      # one page per concept
└── sources/       # one summary page per source
```

## Page conventions

Front matter on every wiki page:

```yaml
---
title: "Context Engineering"
summary: "One sentence, also used on the index."
category: concept        # concept | source | meta
sources:                 # concept pages only: source pages this page draws on
  - ../sources/anatomy-of-a-modern-ai-agent.md
lastmod: 2026-11-13      # update whenever you change the page
tags: ["agents"]
---
```

- **File names:** kebab-case slugs (`model-context-protocol.md`).
- **Links:** relative Markdown links to `.md` files only, e.g. `[MCP](model-context-protocol.md)` or `[source](../sources/x.md)`. No `[[wikilinks]]`. A custom render hook turns these into site URLs, and they also work in Obsidian. A broken link fails the build.
- **One concept per page.** Start with a one-paragraph definition, then the detail. Link related concepts inline where they're mentioned.
- **Every concept page ends with a `## Sources` section** linking the source pages it draws on. Every claim must trace to a source. If you add your own synthesis, say so ("Synthesis: …").
- **Source pages** contain: what the source is (title, author, date, link to the original, never a copy of it), a short summary, its key claims as bullets, and the concept pages it feeds.
- **Diagrams:** use fenced ```` ```mermaid ```` blocks (flowcharts work best). They render on the site via `layouts/_markup/render-codeblock-mermaid.html` and natively in Obsidian. Quote node labels (`A["Label"]`). Add a diagram when structure or flow is easier to see than to read. A diagram that goes beyond what a source shows must be labelled "Synthesis:".
- Write for a technical reader. Be concise and precise. Don't pad.

## Workflows

### Ingest

Triggered by "ingest <file in raw/ | URL | blog post>".

1. Read the source in full. Never modify files in `raw/`.
2. Create `content/wiki/sources/<slug>.md` per the conventions above.
3. For each concept the source covers, create the concept page or update the existing one. Merge new information; don't duplicate it. Where the source contradicts an existing page, keep both claims, attributed, and flag the contradiction in a `> **Contradiction:**` note.
4. Update `content/wiki/_index.md` by running `python3 scripts/gen-index.py content/wiki`. It rebuilds the Concepts (grouped by area, from each concept's first tag: fde, models, prompting, retrieval, training, inference, evaluation, agents, frameworks, protocols, security, platforms) and Sources sections from page front matter.
5. Append to `content/wiki/log.md`: `- YYYY-MM-DD · ingest · <source title> → N sources, M concepts (created X, updated Y)`.
6. Run `bash scripts/check-wiki.sh` and fix any failure.
7. Report to the owner: pages created or updated, and any contradictions found.

### Query

Triggered by a question about the wiki's subject matter.

1. Answer from the wiki pages, linking the pages you used. If the wiki doesn't cover the question, say so plainly before using outside knowledge, and label that part as such.
2. If the answer adds lasting value, offer to file it as a concept page (with sources). If the owner agrees, file it, then update the index and log (`· query ·`).

### Lint

Triggered by "lint the wiki".

Report, without fixing:

- contradictions between pages
- orphans: pages that no other wiki page links to (the index doesn't count)
- concepts mentioned on 2+ pages that don't have their own page
- claims with no source
- pages whose `lastmod` predates a newer source on the same topic
- index entries that are missing or stale

Append `- YYYY-MM-DD · lint · N issues` to the log. Fix issues only after the owner approves.

## Checks

`bash scripts/check-wiki.sh` builds the site and verifies: the build passes with no warnings (so no broken links), the wiki section renders, `raw/` is ignored, wiki pages stay off the home page and archive, every wiki page is in the index, wiki pages are searchable, and every concept page cites a source. Run it after every change to the wiki.
