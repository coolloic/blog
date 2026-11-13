---
title: "Source: Benchmarking AI Agent Memory: Is a Filesystem All You Need? (Letta, 2025)"
summary: "Letta shows a GPT-4o-mini agent with only file-search tools scoring 74.0% on LoCoMo, above Mem0's best reported score, and argues LoCoMo says little about memory."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "benchmarks"]
---

- **What:** vendor research blog post
- **Publisher:** Letta (no individual author named)
- **Date:** 12 August 2025
- **Original:** [letta.com/blog/benchmarking-ai-agent-memory](https://www.letta.com/blog/benchmarking-ai-agent-memory)

## Summary

Letta put each LoCoMo conversation history into a single file attached to an agent and gave the agent only generic file tools (grep, `search_files`, open, close). The files were parsed and embedded, so `search_files` is semantic search, and tool rules forced the agent to start with `search_files`. The agent searched iteratively before calling an `answer_question` tool. With no specialised memory machinery it beat the numbers Mem0 had published, which Letta uses to argue that agent context management matters more than the retrieval mechanism.

## Key claims

- Filesystem agent on LoCoMo: 74.0% with GPT-4o mini and minimal prompt tuning; tool rules constrained the call order because the model is weak.
- Mem0's best (graph) variant was reported at 68.5%, below this baseline.
- Letta calls Mem0's MemGPT numbers puzzling: Letta's own team could not backfill LoCoMo into MemGPT without major refactoring, and Mem0 did not answer requests to explain how the numbers were produced.
- Agents use file tools well largely because of post-training for agentic coding; simpler tools are more likely to be used correctly.
- Conclusion: LoCoMo may not be a meaningful memory benchmark; Letta points to its own Letta Leaderboard and to Terminal-Bench instead.

## Feeds

[Mem0](../concepts/mem0.md) · [Letta](../concepts/letta.md)
