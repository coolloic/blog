---
title: "Source: Does RL Really Incentivize Reasoning Beyond the Base Model? (Yue et al., 2025)"
summary: "NeurIPS 2025 oral showing RLVR models win at pass@1 but lose to their base models at large pass@k, implying RLVR sharpens rather than expands reasoning."
category: source
lastmod: 2026-11-14
tags: ["training", "reasoning"]
---

- **What:** research paper (arXiv:2504.13837). arXiv lists it as a NeurIPS 2025 oral and as the ICML 2025 AI4MATH workshop best paper. The project page and secondary write-ups also report a NeurIPS 2025 Best Paper Runner-Up award
- **Author:** Yang Yue, Zhiqi Chen, Rui Lu, Andrew Zhao, Zhaokai Wang, Yang Yue, Shiji Song, Gao Huang (8 authors as listed on arXiv; Tsinghua LeapLab and Shanghai Jiao Tong University)
- **Date:** 2025-04-18 (v5 2025-11-24)
- **Original:** [arXiv:2504.13837](https://arxiv.org/abs/2504.13837)

## Summary

The paper measures the reasoning boundary of RLVR-trained models with pass@k at large k. The base model eventually overtakes the RL model, which suggests RL re-weights reasoning paths the base model can already produce rather than creating new ones.

## Key claims

- RLVR models beat their base models at small k (such as pass@1). Base models reach higher pass@k when k is large.
- Coverage and perplexity analysis suggests RLVR reasoning comes from, and is bounded by, the base model's distribution.
- Six popular RLVR algorithms perform similarly, and all fall well short of the base model's potential.
- Distillation from a stronger teacher can add genuinely new reasoning patterns.
- The authors call for better RL paradigms, such as continual scaling and multi-turn agent–environment interaction.

## Feeds

[Reinforcement fine-tuning](../concepts/reinforcement-fine-tuning.md) · [Synthetic data generation](../concepts/synthetic-data-generation.md)
