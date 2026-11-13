---
title: "Source: 21 · Chain-of-Verification experiment (Notebook)"
summary: "The owner's runnable LangChain experiment implementing the four-call CoVe loop against Claude."
category: source
lastmod: 2026-11-14
tags: ["models", "hallucination", "experiments"]
---

- **What:** runnable experiment in the owner's Notebook repository (README plus `main.py`)
- **Author:** Loic (Notebook)
- **Date:** undated (read 2026-11-14)
- **Original:** [github.com/coolloic/Notebook/tree/main/experiments/21-chain-of-verification](https://github.com/coolloic/Notebook/tree/main/experiments/21-chain-of-verification)

## Summary

A minimal Chain-of-Verification implementation: four sequential model calls (draft, generate verification questions, answer them, revise) over a factual question ("name three countries that border Switzerland"), using LangChain with `ChatAnthropic` at temperature 0 and LangSmith tracing.

## Key claims

- Use CoVe for factual answers prone to hallucination (lists, entities, dates) where a self-check pass is worth the extra calls.
- The loop costs four sequential model calls per answer.
- The verification questions are answered in one prompt that does not include the draft, which corresponds to the paper's "2-step" variant rather than the fully factored one.

## Feeds

[Hallucination](../concepts/hallucination.md)
