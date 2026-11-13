---
title: "Source: Welcome to ADK 2.0 (ADK docs)"
summary: "ADK 2.0 release notes: GA dates, the graph-based Workflow Runtime, breaking changes from 1.x and deprecations."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "google"]
---

- **What:** official documentation page (release overview and migration guide)
- **Author:** Google
- **Date:** read 2026-11-14; Python GA 2026-05-19, Go GA 2026-06-30, TypeScript GA 2026-08-21
- **Original:** [https://adk.dev/2.0/](https://adk.dev/2.0/)

## Summary

ADK 2.0 replaces the hierarchical agent executor with a graph-based Workflow Runtime in which agents, tools and functions run as nodes. It introduces graph, dynamic and collaborative workflows, lists breaking changes per language, and gives a migration checklist and instructions for staying on 1.x.

## Key claims

- GA dates: Python 2026-05-19, Go 2026-06-30, TypeScript 2026-08-21.
- `BaseAgent` now subclasses `BaseNode`; overrides of `_run_async_impl()` are bypassed, so logic must move to callbacks.
- Events gain new fields (`node_info`, `output`, ...), so rigid custom session stores need schema updates; update all reader applications before writing 2.0 sessions to a shared database.
- Code must yield events instead of appending to `context.session.events`.
- Broad exception handlers hide failures from automatic retries and can break human-in-the-loop pauses.
- TypeScript `SequentialAgent`, `ParallelAgent` and `LoopAgent` log deprecation warnings; graph workflows replace them.

## Feeds

- [Google ADK](../concepts/google-adk.md)
