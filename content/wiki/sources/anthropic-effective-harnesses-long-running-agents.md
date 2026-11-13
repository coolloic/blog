---
title: "Source: Effective harnesses for long-running agents (Anthropic, 2025)"
summary: "Anthropic engineering post on an initializer-agent plus incremental coding-agent harness that carries multi-session app builds across context windows."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding"]
---

- **What:** engineering blog post
- **Publisher:** Anthropic
- **Date:** 2025-11-26
- **Original:** [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

## Summary

Compaction alone did not let a frontier model (Opus 4.5) build a production-quality web app from a high-level prompt over many sessions. The fix was a harness that externalises state into files and git, with two differently prompted agents.

## Key claims

- Failure modes: **one-shotting** (attempting too much, running out of context mid-feature, leaving undocumented half-work) and **premature victory** (a later session sees progress and declares the project done).
- An initializer agent writes `init.sh` (starts the dev server), a progress log, an initial commit, and a JSON feature list (200+ items for a claude.ai clone, all initially failing). JSON was chosen because models are less likely to rewrite it than Markdown; coding agents may only flip pass status.
- Each coding session: read progress notes and git log, review the feature list, run a basic end-to-end test, then implement one feature and commit with a descriptive message.
- Agents marked features done after unit tests or curl calls; prompting them to test as a user via browser automation (Puppeteer MCP) substantially improved results. Native alert modals remained invisible to the agent.
- Open question: one generalist agent versus specialised testing/QA/cleanup agents.

## Feeds

[Coding agents](../concepts/coding-agents.md)
