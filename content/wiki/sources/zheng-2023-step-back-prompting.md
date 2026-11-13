---
title: "Source: Zheng et al. 2023: Step-Back Prompting"
summary: "ICLR 2024 paper (Google DeepMind) that has the model first ask a more abstract 'step-back' question, then reason or retrieve from the principles it surfaces."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "prompting", "papers"]
---

- **What:** research paper (ICLR 2024), arXiv:2310.06117
- **Author:** Huaixiu Steven Zheng, Swaroop Mishra, Xinyun Chen, Heng-Tze Cheng, Ed H. Chi, Quoc V. Le, Denny Zhou (Google DeepMind)
- **Date:** 2023-10-09 (v2 2024-03-12)
- **Original:** [Take a Step Back: Evoking Reasoning via Abstraction in Large Language Models](https://arxiv.org/abs/2310.06117)

## Summary

Proposes a two-step prompt: first ask the model to abstract the specific question into a higher-level concept or principle (the "step-back question"), then answer the original question grounded in that abstraction. In the knowledge-QA setting, the step-back question is also used for retrieval, so the retriever fetches background facts that the literal question would not match.

## Key claims

- Two stages: abstraction (derive high-level concepts or first principles) and reasoning (solve the original question guided by them).
- Evaluated on PaLM-2L, GPT-4 and Llama2-70B across STEM, knowledge QA and multi-hop reasoning.
- Reported PaLM-2L gains: MMLU Physics +7%, MMLU Chemistry +11%, TimeQA +27%, MuSiQue +7%.

## Feeds

[Query transformation](../concepts/query-transformation.md)
