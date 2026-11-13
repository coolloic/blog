---
title: "Source: MemGPT: Towards LLMs as Operating Systems (Packer et al., 2023)"
summary: "Paper that treats the context window like RAM and lets the LLM page information to and from external recall and archival storage through function calls."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "papers"]
---

- **What:** research paper (arXiv:2310.08560)
- **Authors:** Charles Packer, Sarah Wooders, Kevin Lin, Vivian Fang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez (UC Berkeley)
- **Date:** 12 October 2023, revised 12 February 2024
- **Original:** [arxiv.org/abs/2310.08560](https://arxiv.org/abs/2310.08560)

## Summary

MemGPT borrows virtual memory from operating systems. The prompt is "main context" (fast, small) and databases are "external context" (slow, large). The LLM itself moves data between tiers with function calls, warned by the system when the window fills. The project later became the Letta framework.

## Key claims

- Main context has three parts: read-only system instructions; a fixed-size, read/write **working context** for key facts and persona; a **FIFO queue** of messages whose head is a recursive summary of evicted messages.
- External context has **recall storage** (the full message history, searchable) and **archival storage** (arbitrary text with vector search).
- A queue manager issues a memory-pressure warning at about 70% of the window so the model can save important facts; at the flush threshold (100% of the window) it evicts about half the queue into the recursive summary.
- A `request_heartbeat=true` flag lets the model chain function calls (multi-step retrieval) without returning control to the user; results are paginated to avoid overflowing the window.
- Deep Memory Retrieval on Multi-Session Chat: GPT-4 accuracy rose from 32.1% to 92.5%, GPT-4 Turbo from 35.3% to 93.4%, and GPT-3.5 Turbo from 38.7% to 66.9% with MemGPT.
- On nested key-value retrieval (140 UUID pairs, about 8k tokens), plain GPT-3.5 fell to 0% at one nesting level and GPT-4 / GPT-4 Turbo by three, while MemGPT with GPT-4 was unaffected by depth. MemGPT with GPT-3.5 or GPT-4 Turbo began degrading at two levels; the paper ties weaker results to less reliable function calling.
- The 70% warning and 100% flush (evicting about 50%) thresholds are given as example settings, not fixed constants.

## Feeds

[Agent memory](../concepts/agent-memory.md)
