---
title: "Source: Lost in the Middle: How Language Models Use Long Contexts (Liu et al.)"
summary: "Stanford/Berkeley paper showing a U-shaped accuracy curve: models use information at the start and end of long inputs far better than in the middle."
category: source
lastmod: 2026-11-14
tags: ["models", "long-context"]
---

- **What:** research paper (arXiv:2307.03172), Transactions of the ACL (2024)
- **Authors:** Nelson F. Liu, Kevin Lin, John Hewitt, Ashwin Paranjape, Michele Bevilacqua, Fabio Petroni, Percy Liang
- **Date:** 6 July 2023 (v3 20 November 2023)
- **Original:** [arxiv.org/abs/2307.03172](https://arxiv.org/abs/2307.03172)

## Summary

Controlled experiments on multi-document QA (10, 20, 30 retrieved Wikipedia passages, exactly one containing the answer) and a synthetic JSON key-value retrieval task, varying where the relevant item sits. Models tested: GPT-3.5-Turbo (4K and 16K), Claude-1.3 (8K and 100K), MPT-30B-Instruct, LongChat-13B-16K, plus Flan-T5/Flan-UL2. The result is the now-famous U-shaped curve: primacy and recency effects, with a trough in the middle.

## Key claims

- Accuracy is highest when relevant information is at the very start (primacy) or end (recency) and degrades significantly in the middle.
- GPT-3.5-Turbo's multi-document QA accuracy can drop by more than 20 points; in the worst case (20 and 30 documents, answer mid-context) it is below its closed-book accuracy with no documents at all (56.1%).
- Extended-context variants (GPT-3.5-Turbo-16K, Claude-1.3-100K) perform nearly identically to their shorter siblings when the input fits both: a bigger window is not better use of the window.
- Some models fail even at the synthetic key-value lookup when the key is mid-context; Claude-1.3 was near perfect on it.
- Encoder-decoder models are robust to position only within their training length.
- Query-aware contextualization (query before and after the documents) makes key-value retrieval near perfect but barely changes multi-document QA.
- Base models without instruction tuning also show the U-shape.
- Retriever-reader case study (NaturalQuestions-Open): reader accuracy saturates long before retriever recall; 50 documents instead of 20 adds only about 1.5 points (GPT-3.5-Turbo) and about 1 point (Claude-1.3).

## Feeds

[Long-context degradation](../concepts/long-context-degradation.md) · [LLM limitations](../concepts/llm-limitations.md)
