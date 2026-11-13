---
title: "Source: Dated Data: Tracing Knowledge Cutoffs in Large Language Models"
summary: "Johns Hopkins paper showing a model's effective knowledge cutoff often differs from its reported cutoff, and why."
category: source
lastmod: 2026-11-14
tags: ["models", "knowledge-cutoff"]
---

- **What:** research paper (arXiv:2403.12958), COLM 2024
- **Authors:** Jeffrey Cheng, Marc Marone, Orion Weller, Dawn Lawrie, Daniel Khashabi, Benjamin Van Durme
- **Date:** 19 March 2024 (v2 17 September 2024)
- **Original:** [arxiv.org/abs/2403.12958](https://arxiv.org/abs/2403.12958)

## Summary

Vendors publish a single "knowledge cutoff" date. The paper defines an **effective cutoff** per resource or topic and estimates it by probing a model against many time-stamped versions of the same documents (e.g. Wikipedia revisions) and finding which version it fits best. Effective cutoffs often lag the reported date.

## Key claims

- Effective cutoffs frequently differ from reported cutoffs, and vary by source.
- New CommonCrawl dumps contain a large share of old content, so "recent" crawls skew the model toward older facts.
- Deduplication misses semantic and near-lexical duplicates, over-weighting older versions of documents.
- Users should not assume uniform knowledge up to the stated date.

## Feeds

[LLM limitations](../concepts/llm-limitations.md) · [Hallucination](../concepts/hallucination.md)
