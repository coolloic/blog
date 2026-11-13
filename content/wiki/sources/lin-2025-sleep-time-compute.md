---
title: "Source: Sleep-time Compute: Beyond Inference Scaling at Test-time (Lin et al., 2025)"
summary: "Paper proposing that models pre-process a context offline, before queries arrive, cutting test-time compute about 5x at equal accuracy when queries are predictable."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "papers"]
---

- **What:** research paper (arXiv:2504.13171), from Letta and UC Berkeley authors
- **Authors:** Kevin Lin, Charlie Snell, Yu Wang, Charles Packer, Sarah Wooders, Ion Stoica, Joseph E. Gonzalez
- **Date:** 17 April 2025
- **Original:** [arxiv.org/abs/2504.13171](https://arxiv.org/abs/2504.13171)

## Summary

Stateful applications usually have a context (a codebase, a document, a conversation) that exists before the user's question. Sleep-time compute spends model time on that context while idle, anticipating likely questions and writing down useful inferences, so less reasoning is needed when the query arrives. It is the theoretical basis for Letta's sleep-time agents.

## Key claims

- Evaluated on Stateful GSM-Symbolic and Stateful AIME (reasoning tasks split into context and query), plus a new Multi-Query GSM-Symbolic with several related queries per context, and a case study on an agentic software-engineering task.
- About 5x less test-time compute reaches the same accuracy on the two stateful benchmarks.
- Scaling sleep-time compute raises accuracy by up to 13% (Stateful GSM-Symbolic) and 18% (Stateful AIME).
- Amortising sleep-time work across related queries on one context cuts average cost per query by 2.5x.
- Benefit correlates strongly with how predictable the query is from the context.

## Feeds

[Letta](../concepts/letta.md)
