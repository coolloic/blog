---
title: "Source: Shao et al. 2024: STORM"
summary: "Stanford paper on writing Wikipedia-like articles from scratch by discovering perspectives, simulating grounded expert conversations, and outlining before writing."
category: source
lastmod: 2026-11-14
tags: ["agents", "research"]
---

- **What:** research paper, arXiv:2402.14207 (NAACL 2024)
- **Author:** Yijia Shao, Yucheng Jiang, Theodore A. Kanell, Peter Xu, Omar Khattab, Monica S. Lam
- **Date:** 2024-02-22 (v2 2024-04-08)
- **Original:** [arXiv:2402.14207](https://arxiv.org/abs/2402.14207)

## Summary

STORM treats long-form report writing as a pre-writing research problem: before drafting, it gathers material by asking questions from many perspectives and organises it into an outline.

## Key claims

- Pipeline: discover diverse perspectives on the topic; simulate conversations in which perspective-specific writers question a topic expert grounded in internet sources; curate the material into an outline; write the article from it.
- Evaluated on FreshWiki, recent high-quality Wikipedia articles, to avoid leakage from pre-training.
- Versus an outline-driven RAG baseline, more STORM articles were judged organised (+25% absolute) and broad in coverage (+10%).
- Open problems: bias in sources transfers into the article, and the model over-associates unrelated facts.

## Feeds

[Deep research agents](../concepts/deep-research-agents.md)
