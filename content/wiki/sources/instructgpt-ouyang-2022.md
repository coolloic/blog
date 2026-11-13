---
title: "Source: Training Language Models to Follow Instructions with Human Feedback (InstructGPT)"
summary: "OpenAI's 2022 paper establishing the SFT → reward model → PPO recipe for RLHF."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:2203.02155)
- **Author:** Long Ouyang, Jeff Wu, Xu Jiang, et al. (OpenAI)
- **Date:** 2022-03-04
- **Original:** [arXiv:2203.02155](https://arxiv.org/abs/2203.02155)

## Summary

Fine-tunes GPT-3 on labeller demonstrations, trains a reward model on labeller rankings, then optimises the policy against the reward model with PPO. The resulting InstructGPT models are preferred by humans over far larger base GPT-3.

## Key claims

- Three stages: SFT on ~13k prompts, a 6B reward model on ~33k prompts of rankings (4–9 responses each), PPO on ~31k API prompts.
- Around 40 contractors labelled data; inter-labeller agreement was roughly 73–77%.
- A per-token KL penalty to the SFT model limits over-optimisation of the reward model.
- A 1.3B InstructGPT was preferred to 175B GPT-3.
- RLHF caused regressions on some public NLP benchmarks (an 'alignment tax'); mixing pre-training gradients into PPO (PPO-ptx) reduced them.

## Feeds

[Preference optimization](../concepts/preference-optimization.md) · [Fine-tuning](../concepts/fine-tuning.md)
