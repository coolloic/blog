---
title: "Source: Context Engineering for AI Agents: Lessons from Building Manus (Ji, 2025)"
summary: "Manus co-founder's lessons on production agent context: KV-cache hit rate, append-only context, the file system as restorable memory, recitation and keeping errors visible."
category: source
lastmod: 2026-11-14
tags: ["agents", "context"]
---

- **What:** company engineering blog post
- **Author:** Yichao "Peak" Ji (Manus)
- **Date:** 18 July 2025
- **Original:** [manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus)

## Summary

Lessons from rebuilding the Manus agent framework four times. The post treats context as the main design surface for an agent built on frontier models, with cache efficiency and reversible compression as central constraints.

## Key claims

- KV-cache hit rate is the most important production metric for agents; cached Claude Sonnet input was 10x cheaper than uncached ($0.30 vs $3 per million tokens at the time).
- One changed token invalidates the cache from that point on, so keep the prefix stable, make context append-only and serialise deterministically.
- Agent loops are input-heavy: about 100:1 input to output tokens in Manus; a typical task takes about 50 tool calls.
- Even 128K+ windows are not enough, and long inputs degrade performance and raise cost. Manus uses the file system as unlimited external memory.
- Compression should be restorable: drop a page's content but keep its URL, drop a document's body but keep its file path, so the agent can re-fetch.
- Rewriting a `todo.md` keeps the plan at the end of context, countering goal drift and lost-in-the-middle effects.
- Keep failed actions and error traces in context so the model avoids repeating them.

## Feeds

[Context compaction](../concepts/context-compaction.md)
