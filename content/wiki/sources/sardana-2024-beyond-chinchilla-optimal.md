---
title: "Source: Beyond Chinchilla-Optimal: Accounting for Inference in Scaling Laws (Sardana et al., 2024)"
summary: "ICML 2024 paper (MosaicML/Databricks) extending Chinchilla to include inference cost, showing high-demand models should be smaller and trained on far more tokens."
category: source
lastmod: 2026-11-14
tags: ["training", "scaling-laws", "inference"]
---

- **What:** research paper (arXiv:2401.00448), ICML 2024
- **Authors:** Nikhil Sardana, Jacob Portes, Sasha Doubov, Jonathan Frankle
- **Date:** 2023-12-31 (v3 2025-04-14)
- **Original:** [arxiv.org/abs/2401.00448](https://arxiv.org/abs/2401.00448)

## Summary

Chinchilla minimises training FLOPs only. This paper minimises training plus lifetime inference cost for a target quality, in FLOPs and in dollars (accounting for lower hardware utilisation in decoding). With large expected demand the optimum moves to smaller models trained "smaller and longer" than Chinchilla. It also trains 47 models at up to 10,000 tokens per parameter to check whether the laws hold there.

## Key claims

- FLOP-optimal examples: a 30B-Chinchilla-quality model serving 5T inference tokens is best built as 16.4B parameters on 3.27T tokens (16% fewer total FLOPs); a 70B-quality model at 10T inference tokens as 41.6B on 7.92T tokens (12% fewer FLOPs).
- Cost-optimal savings are larger because output generation runs at low utilisation: up to 58% cheaper for a 30B-quality model at 17.5B requests; a Chinchilla-70B serving 2T inference tokens costs 36% more than the cost-optimal alternative.
- 47 MPT-style models (150M-6B) at 10 to 10,000 tokens per parameter; only the 150M model reached 10,000 (larger models went to 500-1,000). Loss and downstream accuracy keep improving, and loss does not plateau even at 10,000 for the 150M model.
- Fitting the Chinchilla form only on typical ratios (up to about 100) overestimates the gain from extra tokens at extreme ratios; including all runs gives α ≈ 0.18, β ≈ 0.24.
- The paper cites training-token counts for LLaMA 7B (1T), Llama 2 7B (2T) and Llama 3 8B (15T). The ratios these imply (about 143, 286 and 1,875 tokens per parameter) are this wiki's arithmetic, not figures stated in the paper.

## Feeds

[Scaling laws](../concepts/scaling-laws.md)
