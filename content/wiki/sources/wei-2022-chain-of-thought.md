---
title: "Source: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
summary: "Wei et al. (2022): few-shot exemplars with intermediate reasoning steps sharply improve large models on arithmetic, commonsense and symbolic reasoning."
category: source
lastmod: 2026-11-14
tags: ["prompting", "reasoning", "paper"]
---

- **What:** research paper (NeurIPS 2022), arXiv:2201.11903
- **Authors:** Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Brian Ichter, Fei Xia, Ed Chi, Quoc Le, Denny Zhou (Google)
- **Date:** v1 2022-01-28, v6 2023-01-10
- **Original:** [arXiv:2201.11903](https://arxiv.org/abs/2201.11903)

## Summary

Introduces chain-of-thought (CoT) prompting: instead of few-shot exemplars of question → answer, give exemplars of question → reasoning steps → answer. The model then writes its own intermediate steps before answering, which substantially improves accuracy on multi-step problems for sufficiently large models.

## Key claims

- Generating a series of intermediate reasoning steps improves complex reasoning in LLMs.
- The ability emerges with scale: it shows up in sufficiently large models given a few CoT exemplars.
- Gains across arithmetic, commonsense and symbolic reasoning on three model families.
- PaLM 540B with eight CoT exemplars reached state of the art on GSM8K at the time, beating fine-tuned GPT-3 with a verifier.

## Feeds

[Chain-of-thought](../concepts/chain-of-thought.md) · [Few-shot prompting](../concepts/few-shot-prompting.md)
