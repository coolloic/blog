---
title: "Source: Chinchilla Scaling: A Replication Attempt (Besiroglu et al., 2024)"
summary: "Epoch AI re-fit Chinchilla's parametric scaling law from the paper's plots and found the original Approach 3 estimates were an optimiser artefact; the corrected fit gives about 20 tokens per parameter."
category: source
lastmod: 2026-11-14
tags: ["training", "scaling-laws"]
---

- **What:** research paper (arXiv:2404.10102)
- **Authors:** Tamay Besiroglu, Ege Erdil, Matthew Barnett, Josh You (Epoch AI)
- **Date:** 2024-04-15 (v2 2024-05-15)
- **Original:** [arxiv.org/abs/2404.10102](https://arxiv.org/abs/2404.10102)

## Summary

The authors reconstructed the data behind Hoffmann et al.'s Approach 3 from the published figure and re-fitted L(N, D) = E + A/N^α + B/D^β. The original parameters fit the data poorly, contradict Approaches 1 and 2, and came with confidence intervals far too narrow for roughly 400 runs. Their re-fit agrees with Approaches 1 and 2 and with how Chinchilla itself was trained.

## Key claims

- Re-fitted values: E ≈ 1.82, A ≈ 482, B ≈ 2085, α ≈ 0.35, β ≈ 0.37 (versus 1.69 / 406.4 / 410.7 / 0.34 / 0.28 originally).
- Hoffmann et al.'s reported interval for the size exponent (0.454-0.455) would need on the order of 600,000 runs; the replication's 80% interval is about 50x wider.
- A Hoffmann author later attributed the error to averaging rather than summing Huber losses, which made L-BFGS stop early.
- The corrected law implies an optimal ratio of about 20 tokens per parameter, consistent with the Chinchilla model and the paper's other two approaches.

## Feeds

[Scaling laws](../concepts/scaling-laws.md)
