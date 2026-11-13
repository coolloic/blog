---
title: "Source: Asai et al. 2023: Self-RAG"
summary: "Paper training an LLM to emit reflection tokens that decide when to retrieve and critique relevance and support."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper (ICLR 2024), arXiv:2310.11511
- **Author:** Akari Asai, Zeqiu Wu, Yizhong Wang, Avirup Sil, Hannaneh Hajishirzi
- **Date:** 2023-10-17
- **Original:** [Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection](https://arxiv.org/abs/2310.11511)

## Summary

Trains a single generator to output special reflection tokens alongside text, making retrieval on-demand and letting decoding favour well-supported segments.

## Key claims

- Reflection tokens: Retrieve (yes / no / continue), IsRel (relevant / irrelevant), IsSup (fully / partially / no support), IsUse (1-5).
- A Llama 2 7B critic, distilled from GPT-4 labels (4k-20k examples per token type, over 90% agreement), inserts reflection tokens into 150k training examples offline; the generator learns them with ordinary next-token loss.
- Inference: retrieve when P(Retrieve=yes) exceeds a threshold (default 0.2); segment-level beam search (width 2) scores segments by likelihood plus weighted IsRel, IsSup, IsUse (1.0, 1.0, 0.5).
- 7B and 13B Self-RAG models beat ChatGPT and retrieval-augmented Llama2-chat on open-domain QA, reasoning and fact verification, with better citation accuracy.

## Feeds

[Agentic RAG](../concepts/agentic-rag.md)
