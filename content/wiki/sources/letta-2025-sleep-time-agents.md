---
title: "Source: Sleep-time Compute (Letta blog, 2025)"
summary: "Letta 0.7.0 announcement of sleep-time agents: a background agent owns memory editing and rewrites the primary agent's memory blocks asynchronously."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory"]
---

- **What:** vendor engineering blog post / release announcement (Letta 0.7.0)
- **Publisher:** Letta
- **Date:** 21 April 2025
- **Original:** [letta.com/blog/sleep-time-compute](https://www.letta.com/blog/sleep-time-compute)

## Summary

Productises the [sleep-time compute paper](lin-2025-sleep-time-compute.md). Creating a sleep-time-enabled agent creates two agents that share memory blocks: a user-facing primary agent and a background agent that maintains memory.

## Key claims

- The primary agent talks to the user, calls user tools and searches recall/archival memory, but has no tools to edit its own core memory.
- The sleep-time agent holds the memory-editing tools and edits both the primary agent's in-context blocks and its own; the primary reads the latest block state at any time.
- Goal: keep memory clean and concise over time, instead of the accretion seen in the original MemGPT design.
- Run frequency is configurable: higher frequency costs more tokens but gives more revision time.
- The two agents can use different models; the example pairs a fast primary (gpt-4o-mini) with a stronger, slower sleep-time model (gpt-4.1 or Claude Sonnet 3.7).
- Benefits: faster primary responses, fewer memory tool calls in the hot path (also more reliable), and background document ingestion.

## Feeds

[Letta](../concepts/letta.md)
