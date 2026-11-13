---
title: "Source: LongMemEval (Wu et al., 2024)"
summary: "ICLR 2025 benchmark of long-term chat-assistant memory across five abilities, finding about a 30% accuracy drop and proposing indexing, retrieval and reading optimisations."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "benchmarks"]
---

- **What:** research paper and benchmark (arXiv:2410.10813), ICLR 2025
- **Authors:** Di Wu, Hongwei Wang, Wenhao Yu, Yuwei Zhang, Kai-Wei Chang, Dong Yu
- **Date:** 14 October 2024, revised 4 March 2025
- **Original:** [arxiv.org/abs/2410.10813](https://arxiv.org/abs/2410.10813)

## Summary

LongMemEval embeds 500 curated questions in long, scalable user-assistant chat histories and tests whether assistants can remember across sessions. It frames memory systems as three stages (indexing, retrieval, reading) and proposes improvements at each.

## Key claims

- Five abilities tested: information extraction, multi-session reasoning, temporal reasoning, knowledge updates, and abstention (knowing when the answer is not in memory).
- Commercial chat assistants and long-context LLMs lose about 30% accuracy when information must be remembered across sustained interactions.
- Proposed optimisations: session decomposition (choose the granularity of stored values), fact-augmented key expansion (index by extracted facts), time-aware query expansion (narrow search by time).
- The authors report these substantially improve recall and downstream QA.

## Feeds

[Agent memory](../concepts/agent-memory.md)
