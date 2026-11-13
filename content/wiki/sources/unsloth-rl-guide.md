---
title: "Source: Unsloth Reinforcement Learning (GRPO) Guide"
summary: "Unsloth's guide to running GRPO/RLVR on a single GPU: reward-function design, VRAM numbers, step counts and vLLM-backed generation."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** library documentation / tutorial
- **Author:** Unsloth AI
- **Date:** updates dated 2025-11-26 (FP8 RL) and 2026-01-15 (ultra-long-context RL); read 2026-11-14
- **Original:** [Reinforcement Learning (RL) Guide](https://unsloth.ai/docs/basics/reinforcement-learning-rl-guide)

## Summary

A practitioner's guide to GRPO with Unsloth on top of TRL. It explains RLVR, how to turn verifiers into reward functions, how much data and how many steps to expect, and the memory savings of Unsloth's implementation.

## Key claims

- GRPO drops PPO's value model and learned reward model. It samples several responses per prompt and z-scores their rewards to get advantages.
- A verifier checks correctness. A reward function turns checks into a score and can add penalties, for example on length or readability. Prefer a rubric of several small verifiable rewards over one all-or-nothing score.
- Example rewards: +1/−1 for producing a number, +3/−3 for the correct answer, format and XML-tag rewards for GSM8K, and keyword or signature checks for an email task.
- Expect reward to rise only after about 300 steps. Runs can take 12+ hours or 1,000+ steps. Use 500+ rows if possible, though even 10 can work. Raising generations per prompt (8 to 16) is suggested. Use a model of at least 1.5B parameters.
- "If the probability is always 0, then RL will never work": start from a model that already sometimes succeeds, such as an instruct model.
- VRAM: about 5 GB for models of 1.5B or less, about 15 GB up to 17B with QLoRA. Llama 3.1 8B at 20K context with 8 generations uses 54.3 GB vs 510.8 GB for a standard FA2 implementation (Unsloth's claim).
- `fast_inference=True` uses vLLM for rollouts. `loss_type` selects GRPO, Dr. GRPO or GSPO. Options include `epsilon_high` and `mask_truncated_completions`.

## Feeds

[Reinforcement fine-tuning](../concepts/reinforcement-fine-tuning.md)
