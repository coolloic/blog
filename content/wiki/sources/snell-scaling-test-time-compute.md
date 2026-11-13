---
title: "Source: Scaling LLM Test-Time Compute Optimally (Snell et al., 2024)"
summary: "Paper showing that difficulty-adaptive test-time compute beats best-of-N by ~4x and can beat a 14x larger model on easy and medium problems."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning", "research"]
---

- **What:** research paper (arXiv 2408.03314)
- **Authors:** Charlie Snell, Jaehoon Lee, Kelvin Xu, Aviral Kumar (UC Berkeley / Google DeepMind)
- **Date:** 2024-08-06
- **Original:** [arXiv:2408.03314](https://arxiv.org/abs/2408.03314)

## Summary

Asks how much a fixed inference budget can improve a model on hard prompts, and how best to spend it. It studies two mechanisms: search against a process reward model (PRM) verifier, and sequential self-revision. It finds that the best strategy depends on question difficulty.

## Key claims

- Two levers: (1) search (best-of-N, beam search, lookahead) scored by a PRM; (2) changing the proposal distribution through sequential revisions.
- Sequential revision acts as local refinement and parallel sampling as global search. Easy questions do best purely sequentially; harder ones need a mix. With naive answer selection, about 38% of correct answers get revised back into incorrect ones, so a selection step is needed.
- Beam search beats best-of-N at low budgets and on medium-hard questions, but over-optimizes the PRM on easy ones. Nothing helps much on the hardest bin.
- "Compute-optimal" allocation by estimated difficulty matches best-of-N with up to ~4x less compute.
- FLOPs-matched against a ~14x larger model, extra test-time compute wins on easy/medium questions and when inference load is low relative to pretraining. Pretraining wins on the hardest questions and under heavy inference load. The two are not fully interchangeable.

## Feeds

[Test-time compute](../concepts/test-time-compute.md) · [Reasoning models](../concepts/reasoning-models.md)
