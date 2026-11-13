---
title: "Source: Press et al. 2022: Self-Ask (Measuring and Narrowing the Compositionality Gap)"
summary: "Findings of EMNLP 2023 paper showing models answer sub-questions they cannot compose, and that asking explicit follow-up questions (optionally answered by search) narrows the gap."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "prompting", "papers"]
---

- **What:** research paper (Findings of EMNLP 2023), arXiv:2210.03350
- **Author:** Ofir Press, Muru Zhang, Sewon Min, Ludwig Schmidt, Noah A. Smith, Mike Lewis
- **Date:** 2022-10-07 (v3 2023-10-17)
- **Original:** [Measuring and Narrowing the Compositionality Gap in Language Models](https://arxiv.org/abs/2210.03350)

## Summary

Defines the "compositionality gap": how often a model gets every sub-question of a multi-hop question right but the composed question wrong. Proposes self-ask, a prompt format in which the model explicitly writes follow-up questions and their answers before the final answer. Because the format is easy to parse, a search engine can answer the follow-ups, which is an early form of query decomposition for retrieval.

## Key claims

- In the GPT-3 family, single-hop accuracy grows faster with scale than multi-hop accuracy, so the gap does not shrink.
- Chain-of-thought narrows the gap; self-ask narrows it further.
- Plugging a search engine in to answer the follow-up questions improves accuracy again.

## Feeds

[Query transformation](../concepts/query-transformation.md)
