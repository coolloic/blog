---
title: "Source: Custom instructions with AGENTS.md (OpenAI Codex docs)"
summary: "How Codex discovers, orders and size-limits AGENTS.md files (global, root-to-cwd, override and fallback names, 32 KiB default cap)."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding"]
---

- **What:** official product documentation
- **Publisher:** OpenAI
- **Date:** living document, read 2026-11-14
- **Original:** [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md) (now served from learn.chatgpt.com)

## Summary

Documents the exact instruction-chain algorithm Codex uses to build its project guidance, and how to verify it.

## Key claims

- Global scope: `~/.codex` (or `CODEX_HOME`); `AGENTS.override.md` if present, else `AGENTS.md`; first non-empty file only.
- Project scope: walk from the project root (usually the git root) down to the working directory; in each directory include at most one of `AGENTS.override.md`, `AGENTS.md`, then names in `project_doc_fallback_filenames`.
- Files are concatenated root-down with blank lines; closer files appear later and so override earlier guidance. Empty files are skipped.
- `project_doc_max_bytes` defaults to 32 KiB; once the combined size reaches it, further files are not added. Remedy: raise the cap or split into nested files.
- The chain is rebuilt every run (no cache). Verify with `codex --ask-for-approval never "Summarize the current instructions."`, or `--cd subdir` to test nested overrides.

## Feeds

[Coding agents](../concepts/coding-agents.md)
